import nodemailer from 'nodemailer';
import { site } from '@/lib/site';

// Email over SMTP (Zoho, Google Workspace, Fastmail, …). Activates only when
// SMTP_HOST, SMTP_USER and SMTP_PASS are set — see README for the full list.

type MailInput = {
  to?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  fromName?: string;
};
type Detail = { label: string; value: string };

// Email clients are far behind the web on CSS, so these are literal hex values
// used inline rather than the Tailwind tokens the site itself uses.
const BRAND = '#7c3aed';
const BRAND_DARK = '#5b21b6';
const ACCENT = '#f4b740';
const TINT = '#f5f3ff';
const TINT_BORDER = '#ddd6fe';

export function isEmailConfigured() {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

// Strip characters that could break an email header (header-injection safe).
function safeHeader(v: string | undefined) {
  return (v || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 120);
}

function escapeHtml(v: string) {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

let cached: nodemailer.Transporter | undefined;
function getTransporter() {
  if (cached) return cached;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return cached;
}

// Low-level send — never throws, so a mail failure cannot break a form submit.
async function send({ to, subject, text, html, replyTo, fromName }: MailInput) {
  if (!isEmailConfigured()) return { sent: false as const, reason: 'not_configured' as const };
  try {
    const fromEmail = process.env.MAIL_FROM || process.env.SMTP_USER!;
    const displayName =
      safeHeader(fromName) || process.env.MAIL_FROM_NAME || `${site.name} Website`;
    const recipient = to || process.env.MAIL_TO || process.env.SMTP_USER!;
    const info = await getTransporter().sendMail({
      from: { name: displayName, address: fromEmail },
      to: recipient,
      subject,
      text,
      html,
      replyTo,
    });
    return { sent: true as const, id: info.messageId };
  } catch (err: any) {
    console.error('[email] send failed:', err?.message);
    return { sent: false as const, reason: 'error' as const, error: err?.message };
  }
}

/** Notify the team (goes to MAIL_TO, falling back to the SMTP mailbox). */
export async function sendNotificationEmail(input: Omit<MailInput, 'to'>) {
  return send(input);
}

// ---- Branded email building blocks ----

function pEmail(text: string) {
  return `<p style="margin:0 0 14px;color:#374151;font-size:15px;line-height:1.65">${text}</p>`;
}

function detailsBox(details: Detail[]) {
  if (!details.length) return '';
  const rows = details
    .map(
      (d) =>
        `<tr><td style="padding:5px 0;color:#6b7280;font-size:13px;width:120px">${escapeHtml(d.label)}</td><td style="padding:5px 0;color:#111827;font-size:13px;font-weight:600">${escapeHtml(d.value)}</td></tr>`
    )
    .join('');
  return `<div style="border:1px solid #e5e7eb;border-radius:12px;padding:14px 16px;margin:2px 0 18px">
    <p style="margin:0 0 8px;font-size:11px;color:#6b7280;letter-spacing:.6px;text-transform:uppercase">Your enquiry</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rows}</table>
  </div>`;
}

function stepsBox(steps: string[]) {
  const rows = steps
    .map(
      (s, i) =>
        `<tr>
          <td valign="top" style="width:32px;padding:5px 10px 5px 0">
            <div style="width:22px;height:22px;border-radius:50%;background:${TINT_BORDER};color:${BRAND_DARK};font-size:12px;font-weight:700;text-align:center;line-height:22px">${i + 1}</div>
          </td>
          <td style="padding:5px 0;color:#374151;font-size:14px;line-height:1.55">${s}</td>
        </tr>`
    )
    .join('');
  return `<div style="background:${TINT};border:1px solid ${TINT_BORDER};border-radius:12px;padding:16px 18px;margin:2px 0 20px">
    <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:${BRAND_DARK};letter-spacing:.6px;text-transform:uppercase">What happens next</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rows}</table>
  </div>`;
}

function ctaButton(label: string, url: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:2px 0 22px"><tr>
    <td style="border-radius:999px;background:${BRAND}">
      <a href="${url}" style="display:inline-block;padding:12px 26px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:999px">${label}</a>
    </td></tr></table>`;
}

function brandedHtml(heading: string, bodyHtml: string) {
  return `<!doctype html><html><body style="margin:0;background:#f3f4f6;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb">
    <tr><td style="background:linear-gradient(135deg,${BRAND_DARK},${BRAND} 62%,${ACCENT});padding:22px 28px">
      <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:.3px">${site.name}</span>
    </td></tr>
    <tr><td style="padding:28px 28px 8px">
      <h1 style="margin:0 0 18px;font-size:22px;color:#111827">${heading}</h1>
      ${bodyHtml}
    </td></tr>
    <tr><td style="padding:18px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;line-height:1.7">
      ${site.name} · ${site.address.locality}, ${site.address.country}<br/>
      <a href="mailto:${site.email}" style="color:${BRAND};text-decoration:none">${site.email}</a>
      &nbsp;·&nbsp; ${site.phone}
      &nbsp;·&nbsp; <a href="${site.url}" style="color:${BRAND};text-decoration:none">${site.domain}</a>
    </td></tr>
  </table>
  </td></tr></table>
  </body></html>`;
}

/** Auto-acknowledgement to the person who submitted the enquiry. */
export async function sendAcknowledgementEmail({
  to,
  name,
  details = [],
}: {
  to: string;
  name?: string;
  details?: Detail[];
}) {
  const recipient = (to || '').trim();
  if (!EMAIL_RE.test(recipient)) return { sent: false as const, reason: 'invalid_recipient' as const };
  const firstName = escapeHtml(safeHeader(name).split(' ')[0] || 'there');

  const heading = 'Thanks for getting in touch';
  const subject = `We've received your enquiry — ${site.name}`;
  const steps = [
    'We read your requirements and come back with anything that is unclear.',
    'You receive a fixed-price, itemised quote with a realistic timeline.',
    'If it works for you, we sign an NDA and agree the first milestone.',
  ];
  const intro = `Thank you for contacting <strong>${site.name}</strong>. Your enquiry has landed with our team, and a real person will reply — usually within one business day.`;
  const closingLine = `In the meantime you can reply straight to this email, or call <a href="tel:${site.phoneRaw}" style="color:${BRAND};text-decoration:none">${site.phone}</a>.`;
  const signoff = `Talk soon,<br/>The ${site.name} team`;

  const bodyHtml =
    pEmail(`Hi ${firstName},`) +
    pEmail(intro) +
    detailsBox(details) +
    stepsBox(steps) +
    ctaButton('See our recent work', `${site.url}/portfolio`) +
    pEmail(closingLine) +
    pEmail(signoff);

  const text =
    `Hi ${firstName},\n\n` +
    intro.replace(/<[^>]+>/g, '') +
    `\n\n` +
    (details.length ? details.map((d) => `${d.label}: ${d.value}`).join('\n') + `\n\n` : '') +
    `What happens next:\n` +
    steps.map((s, i) => `${i + 1}. ${s}`).join('\n') +
    `\n\nSee our work: ${site.url}/portfolio\n\n` +
    closingLine.replace(/<[^>]+>/g, '') +
    `\n\n${signoff.replace(/<br\s*\/?>/g, '\n')}`;

  return send({
    to: recipient,
    subject,
    text,
    html: brandedHtml(heading, bodyHtml),
    fromName: site.name,
    replyTo: site.email, // replies from the enquirer reach the team mailbox
  });
}
