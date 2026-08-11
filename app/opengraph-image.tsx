import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#0A0711',
          backgroundImage:
            'radial-gradient(900px 520px at 12% -10%, rgba(139,92,246,0.55), transparent 62%), radial-gradient(700px 460px at 96% 8%, rgba(244,183,64,0.24), transparent 60%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              width: 56,
              height: 56,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #a78bfa, #6d28d9)',
              border: '1.5px solid rgba(255,255,255,0.25)',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>{site.shortName}</span>
            <span style={{ fontSize: 15, letterSpacing: 5, color: '#c4b5fd' }}>TECHNOLOGIES</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5 }}>
            Your offshore team for
          </div>
          <div
            style={{
              fontSize: 70,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: '#c4b5fd',
            }}
          >
            software that ships
          </div>
          <div style={{ fontSize: 29, marginTop: 26, color: '#a3a3b8', maxWidth: 940 }}>
            Web, mobile, AI and cloud engineering from Pune, India — for the US, UK, UAE, Europe and
            Australia.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, fontSize: 23, color: '#f4b740' }}>
          <span>Fixed-price quotes</span>
          <span style={{ color: '#4b4460' }}>·</span>
          <span>You own the IP</span>
          <span style={{ color: '#4b4460' }}>·</span>
          <span>{site.domain}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
