import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Regions where prior consent is required before non-essential (analytics)
// cookies may be set: UK PECR, EU/EEA ePrivacy + GDPR, and the Swiss FADP.
const CONSENT_REQUIRED = new Set([
  'GB',
  // EU 27
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE',
  // EEA, non-EU
  'IS', 'LI', 'NO',
  // Switzerland
  'CH',
]);

// Vercel injects x-vercel-ip-country at the edge. An unknown country counts as
// consent-required: failing closed keeps us compliant wherever geolocation is
// unavailable (local dev, self-hosting, a stripped header).
export async function GET(request: Request) {
  const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();
  const consentRequired = !country || CONSENT_REQUIRED.has(country);

  return NextResponse.json(
    { country: country || null, consentRequired },
    { headers: { 'Cache-Control': 'private, no-store' } }
  );
}
