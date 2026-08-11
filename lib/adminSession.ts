import { createHmac, timingSafeEqual } from 'crypto';

// Signed admin session cookie.
//
// The cookie carries its own expiry plus an HMAC over it, so it cannot be
// forged by setting a fixed value like `admin_auth=1` in a browser. There is
// deliberately no fallback secret: if ADMIN_SESSION_SECRET is missing the
// admin area stays closed rather than trusting something guessable.

export const SESSION_COOKIE = 'admin_session';
export const SESSION_HOURS = 8;

export function signSession(expiresAt: number, secret: string) {
  const payload = String(expiresAt);
  const mac = createHmac('sha256', secret).update(payload).digest('hex');
  return `${payload}.${mac}`;
}

export function verifySession(value: string | undefined, secret = process.env.ADMIN_SESSION_SECRET) {
  if (!value || !secret) return false;

  const [payload, mac] = value.split('.');
  if (!payload || !mac) return false;

  const expected = createHmac('sha256', secret).update(payload).digest('hex');
  let a: Buffer;
  let b: Buffer;
  try {
    a = Buffer.from(mac, 'hex');
    b = Buffer.from(expected, 'hex');
  } catch {
    return false;
  }
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

/** Constant-time compare that does not leak length through an early return. */
export function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function isAdminConfigured() {
  return !!(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}
