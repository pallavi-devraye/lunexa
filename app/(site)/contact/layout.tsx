import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: `Contact Us — Get a Free Quote | ${site.name}` },
  description: `Contact ${site.name} for a free, fixed-price quote on website, web app, mobile app, AI, or cloud work. Based in Pune, India, serving clients worldwide. We reply within one business day.`,
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
