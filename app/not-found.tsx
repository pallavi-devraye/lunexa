import Link from 'next/link';
import { site } from '@/lib/site';

const suggestions = [
  { href: '/services', label: 'Services' },
  { href: '/hire-developers', label: 'Hire Developers' },
  { href: '/portfolio', label: 'Case Studies' },
  { href: '/industries', label: 'Industries' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
];

export default function NotFound() {
  return (
    <section className="relative aurora">
      <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-50" aria-hidden="true" />
      <div className="relative container-g py-28 md:py-36 text-center">
        <p className="font-display text-7xl md:text-9xl font-bold gradient-text">404</p>
        <h1 className="text-2xl md:text-3xl font-bold mt-6">This page couldn&apos;t be found</h1>
        <p className="text-slate-400 mt-4 max-w-md mx-auto leading-relaxed">
          The page may have moved or never existed. Here is the way back.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary btn-lg">
            Back to home
          </Link>
          <Link href="/contact" className="btn btn-outline btn-lg">
            Get a free quote
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {suggestions.map((s) => (
            <Link key={s.href} href={s.href} className="text-brand-light hover:underline">
              {s.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-14">
          {site.name} · {site.tagline}
        </p>
      </div>
    </section>
  );
}
