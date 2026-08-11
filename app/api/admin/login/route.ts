import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE,
  SESSION_HOURS,
  isAdminConfigured,
  safeEqual,
  signSession,
} from '@/lib/adminSession';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json().catch(() => ({ email: '', password: '' }));

  if (!isAdminConfigured()) {
    console.error('[admin] ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_SESSION_SECRET must all be set');
    return NextResponse.json({ error: 'Admin access is not configured.' }, { status: 503 });
  }

  const ok =
    safeEqual(String(email || ''), process.env.ADMIN_EMAIL!) &&
    safeEqual(String(password || ''), process.env.ADMIN_PASSWORD!);

  if (!ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, signSession(expiresAt, process.env.ADMIN_SESSION_SECRET!), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_HOURS * 60 * 60,
  });
  return res;
}
