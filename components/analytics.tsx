'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

// Google Analytics 4 — activates only when NEXT_PUBLIC_GA_ID is set.
//
// GA4 sets cookies, so it is suppressed entirely for visitors in the UK,
// EU/EEA, and Switzerland, where consent is required before non-essential
// cookies may be set. The region comes from /api/geo (Vercel edge
// geolocation) rather than headers() in the layout, which would force every
// page to render dynamically and give up static generation.
export function AnalyticsProvider() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!gaId) return;
    let cancelled = false;

    fetch('/api/geo')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.consentRequired === false) setAllowed(true);
      })
      .catch(() => {
        // Stay off. Failing closed is the safer default for a cookie gate.
      });

    return () => {
      cancelled = true;
    };
  }, [gaId]);

  if (!gaId || !allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
