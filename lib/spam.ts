// Spam heuristics for public forms.
//
// Two classes of check, deliberately handled differently:
//
//   Silent  — honeypot and submit timing. A human cannot trip these: the field
//             is hidden from view and from assistive tech, and the delay is far
//             shorter than anyone takes to fill a form. These report success
//             and quietly discard, so bots get no signal to adapt against.
//
//   Visible — message content. These could catch a terse but genuine
//             submission, so they return something the sender can act on.
//             Silently losing a real lead is far worse than a bot learning
//             the rules.
//
// Content checks must run against the RAW text the person typed, never a
// string the route composes for storage — the contact route appends
// "Service: …", whose letters would otherwise defeat the no-letters check.

export type SpamCode = 'noletters' | 'short' | 'links';

export type SpamVerdict =
  | { spam: false }
  | { spam: true; silent: true; reason: string }
  | { spam: true; silent: false; reason: string; code: SpamCode; userMessage: string };

export type SpamOptions = {
  /** Minimum plausible fill time. */
  minSubmitMs?: number;
  /** Shortest message treated as genuine. */
  minMessageLength?: number;
  /** Links tolerated before it reads as a link dump. */
  maxUrls?: number;
};

const DEFAULTS: Required<SpamOptions> = {
  minSubmitMs: 3000,
  minMessageLength: 12,
  maxUrls: 3,
};

export function checkSpam(
  input: { honeypot?: unknown; elapsedMs?: unknown; message?: string },
  options: SpamOptions = {}
): SpamVerdict {
  const { minSubmitMs, minMessageLength, maxUrls } = { ...DEFAULTS, ...options };

  // Hidden field. Anything at all in it means an automated fill.
  const honeypot = typeof input.honeypot === 'string' ? input.honeypot.trim() : '';
  if (honeypot) {
    return { spam: true, silent: true, reason: 'honeypot filled' };
  }

  // Time from form mount to submit. Missing counts as failed: our own forms
  // always supply it, so its absence means the POST did not come from one.
  const elapsed = Number(input.elapsedMs);
  if (!Number.isFinite(elapsed) || elapsed < minSubmitMs) {
    return { spam: true, silent: true, reason: `submitted in ${input.elapsedMs}ms` };
  }

  const message = (input.message || '').trim();

  // No letters at all is not a real enquiry — this is the bare-phone-number
  // spam that public contact forms attract.
  if (!/\p{L}/u.test(message)) {
    return {
      spam: true,
      silent: false,
      reason: 'message contains no letters',
      code: 'noletters',
      userMessage: 'Please write a little about what you need.',
    };
  }

  if (message.length < minMessageLength) {
    return {
      spam: true,
      silent: false,
      reason: `message too short (${message.length} chars)`,
      code: 'short',
      userMessage: 'Please tell us a little more.',
    };
  }

  const urls = message.match(/https?:\/\/|www\./gi)?.length ?? 0;
  if (urls > maxUrls) {
    return {
      spam: true,
      silent: false,
      reason: `${urls} links in message`,
      code: 'links',
      userMessage: 'Your message contains too many links. Please write in plain text.',
    };
  }

  return { spam: false };
}
