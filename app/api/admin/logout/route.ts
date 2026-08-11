import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/adminSession';

export const runtime = 'nodejs';

/** Clears the admin session cookie and returns to the login page. */
export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/admin/login', req.url));
  res.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return res;
}
