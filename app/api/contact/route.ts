import { NextRequest, NextResponse } from 'next/server';
import { saveContactSubmission } from '@/lib/contactStore';
import { sendNotificationEmail, sendAcknowledgementEmail } from '@/lib/email';
import { checkSpam, type SpamCode } from '@/lib/spam';

export const runtime = 'nodejs';

// Enquiry-specific wording for the checks a real sender could plausibly trip.
const MESSAGES: Record<SpamCode, string> = {
  noletters: 'Please tell us a little about your project so we can quote accurately.',
  short: 'Please tell us a little more about what you need.',
  links: 'Your message contains too many links. Please describe the project in plain text.',
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Trim and cap a field so a huge paste cannot bloat storage or the notification. */
function clean(v: unknown, max = 300) {
  return String(v ?? '').trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate the raw message the person typed, before the service, budget and
    // timeline lines are appended — those always contain letters and would mask
    // a "message" that is nothing but a phone number.
    const rawMessage = clean(data.message, 8000);
    const verdict = checkSpam({
      honeypot: data.website,
      elapsedMs: data.elapsedMs,
      message: rawMessage,
    });

    if (verdict.spam) {
      console.warn(`[contact] blocked submission — ${verdict.reason}`);
      // Silent checks report success so bots cannot tell they were filtered.
      if (verdict.silent) {
        return NextResponse.json({ ok: true, id: null, source: 'filtered' });
      }
      return NextResponse.json({ error: MESSAGES[verdict.code] }, { status: 400 });
    }

    const name = clean(data.name, 120);
    const email = clean(data.email, 200);
    if (!name || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid name and email address.' }, { status: 400 });
    }

    const service = clean(data.service, 120);
    const budget = clean(data.budget, 60);
    const timeline = clean(data.timeline, 60);

    const payload = {
      name,
      email,
      company: clean(data.company, 160) || undefined,
      phone: clean(data.phone, 40) || undefined,
      country: clean(data.country, 80) || undefined,
      // One composed message column keeps storage, notification mail, and the
      // admin dashboard reading the same shape.
      message: [
        rawMessage,
        service ? `\n\nService: ${service}` : '',
        budget ? `\nBudget: ${budget}` : '',
        timeline ? `\nTimeline: ${timeline}` : '',
      ].join(''),
    };

    // Persist to Postgres in production, local JSON in development.
    const result = await saveContactSubmission(payload, { requireDbInProd: true });

    // Notify the team. A mail failure never throws, so it cannot lose the lead
    // that has already been stored above.
    await sendNotificationEmail({
      subject: `New enquiry from ${payload.name}${payload.company ? ` (${payload.company})` : ''}`,
      fromName: `${payload.name} (via website)`,
      replyTo: payload.email,
      text:
        `New enquiry from the website contact form:\n\n` +
        `Name: ${payload.name}\n` +
        `Email: ${payload.email}\n` +
        (payload.company ? `Company: ${payload.company}\n` : '') +
        (payload.country ? `Country: ${payload.country}\n` : '') +
        (payload.phone ? `Phone: ${payload.phone}\n` : '') +
        `\nMessage:\n${payload.message}\n`,
    });

    // Auto-acknowledgement to the sender, echoing what they selected.
    const details = [
      service ? { label: 'Service', value: service } : null,
      budget ? { label: 'Budget', value: budget } : null,
      timeline ? { label: 'Timeline', value: timeline } : null,
    ].filter(Boolean) as { label: string; value: string }[];

    await sendAcknowledgementEmail({ to: payload.email, name: payload.name, details });

    return NextResponse.json({ ok: true, id: result.id, source: result.source });
  } catch (e: any) {
    console.error('[contact] submission failed:', e?.message);
    return NextResponse.json(
      { error: 'We could not record your enquiry. Please email us directly and we will pick it up.' },
      { status: 500 }
    );
  }
}
