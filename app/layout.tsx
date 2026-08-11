import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { AnalyticsProvider } from '@/components/analytics';
import { OrganizationStructuredData, WebsiteStructuredData } from '@/components/structured-data';
import { site } from '@/lib/site';

// Two families: Sora carries the headings, Inter the body. Both are exposed as
// CSS variables so tailwind.config.js can map them to font-display / font-sans.
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const display = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const title = `${site.tagline} in India | ${site.name}`;
const description = site.description;

export const viewport: Viewport = {
  // Matches the page canvas so mobile browser chrome and the Android status
  // bar blend into the header instead of showing a bright band above a dark site.
  themeColor: '#0A0711',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    'offshore software development company India',
    'hire dedicated developers India',
    'software development company Pune',
    'outsource web development to India',
    'software development company for US startups',
    'software development company UK',
    'software development company Dubai UAE',
    'custom software development company',
    'web app development company',
    'SaaS development company',
    'mobile app development company',
    'Flutter app development',
    'Kotlin Multiplatform development',
    'AI development company',
    'LLM integration services',
    'AWS DevOps consulting',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  applicationName: site.name,
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to emit the Search Console tag.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} scroll-smooth`}>
      <body className="font-sans">
        <OrganizationStructuredData />
        <WebsiteStructuredData />
        {/* Kept out of .btn: those utilities set `position: relative`, which
            would override sr-only's absolute clipping and leave the link
            visible in the corner on every page. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]
                     focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm
                     focus:font-semibold focus:text-white focus:ring-2 focus:ring-white/40"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="min-h-[70vh]">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
