import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, MapPin, Sparkles } from 'lucide-react';
import { site } from '@/lib/site';

const proofPoints = [
  'Fixed-price quotes, no hourly surprises',
  'Web, mobile, AI and cloud under one roof',
  'Guaranteed daily overlap with your hours',
  'Full IP and source code transferred to you',
];

export function Hero() {
  return (
    <section className="relative overflow-hidden aurora">
      {/* Texture and light. Purely decorative, so hidden from assistive tech. */}
      <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand/12 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-accent/[0.07] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative container-g pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Centred statement first, product visual beneath — the reverse of the
            usual split hero, and it lets the headline run full width. */}
        <div className="mx-auto max-w-4xl text-center animate-rise-in">
          {/* The full market list runs to three lines on a narrow phone, where
              it reads as a paragraph rather than a label. Shortened there. */}
          <span className="eyebrow">
            <MapPin size={13} className="shrink-0" />
            <span className="sm:hidden">Pune, India · Serving worldwide</span>
            <span className="hidden sm:inline">
              Pune, India · Serving the US, UK, UAE, Europe &amp; Australia
            </span>
          </span>

          <h1 className="mt-6 text-[2.6rem] leading-[1.08] md:text-6xl lg:text-[4.1rem] tracking-tight">
            Your offshore team for{' '}
            <span className="gradient-text">software that ships</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {site.name} builds{' '}
            <strong className="text-white font-semibold">websites, web apps, mobile apps, AI features</strong>{' '}
            and the cloud infrastructure underneath them — senior engineering from India, at a
            fraction of onshore cost.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn btn-primary btn-lg group">
              Get a free quote
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/portfolio" className="btn btn-outline btn-lg">
              See our work
            </Link>
          </div>

          <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-slate-300 max-w-2xl mx-auto text-left">
            {proofPoints.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-light ring-1 ring-brand/30">
                  <Check size={12} strokeWidth={3.5} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Product visual */}
        <div className="relative mt-16 md:mt-20 max-w-5xl mx-auto animate-rise-in">
          <div
            className="absolute -inset-8 bg-gradient-to-tr from-brand/25 via-transparent to-accent/20 rounded-[3rem] blur-3xl"
            aria-hidden="true"
          />
          <div className="relative rounded-3xl overflow-hidden bg-night-700 ring-1 ring-white/12 shadow-glow">
            <div className="relative aspect-[8/5]">
              <Image
                src="/images/software-development-company-pune-hero.svg"
                alt="Offshore software development team building web, mobile and AI products from Pune, India"
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Floating stat cards. Hidden below sm, where they would crowd the
              image rather than frame it. */}
          <div className="hidden sm:flex absolute -left-4 lg:-left-10 top-10 items-center gap-3 rounded-2xl bg-night-600/95 backdrop-blur px-4 py-3 ring-1 ring-white/15 shadow-panel animate-drift">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25">
              <Check size={18} strokeWidth={3} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">Fixed-price quotes</span>
              <span className="block text-xs text-slate-500">Itemised, in your currency</span>
            </span>
          </div>

          <div className="hidden sm:flex absolute -right-4 lg:-right-10 bottom-10 items-center gap-3 rounded-2xl bg-night-600/95 backdrop-blur px-4 py-3 ring-1 ring-white/15 shadow-panel">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/25">
              <Sparkles size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">Quote in 1 business day</span>
              <span className="block text-xs text-slate-500">Free, no obligation</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
