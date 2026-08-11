import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { CtaBand } from '@/components/cta-band';
import { BreadcrumbStructuredData } from '@/components/structured-data';
import { industries } from '@/lib/industries';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Industries We Build Software For | Lunexa Technologies' },
  description:
    'Software development for SaaS, e-commerce, healthcare, fintech, logistics, education, real estate, manufacturing, hospitality and more — from an offshore engineering team in Pune, India.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: site.url },
          { name: 'Industries', url: `${site.url}/industries` },
        ]}
      />

      <section className="relative aurora border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-50" aria-hidden="true" />
        <div className="relative container-g py-20 md:py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="eyebrow">Industries</span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.3rem] leading-[1.1] mt-6 tracking-tight">
              Software shaped by{' '}
              <span className="gradient-text">how your industry works</span>
            </h1>
            <p className="text-lg text-slate-400 mt-6 leading-relaxed">
              Domain knowledge is not a nice-to-have. It is the difference between a booking system
              that respects clinical no-show rules and one that has to be rebuilt six weeks after
              launch. Here is where we have already done the learning.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Get a free quote
              </Link>
              <Link href="/portfolio" className="btn btn-outline btn-lg">
                See case studies
              </Link>
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="relative aspect-[8/5] bg-night-800">
              <Image
                src="/images/offshore-development-team-india.svg"
                alt="Offshore development team in India serving clients across the US, UK, UAE, Europe and Australia"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-g section">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <article key={ind.slug} className="card card-hover p-7 flex flex-col">
              <div className="h-12 w-12 rounded-2xl bg-brand/12 text-brand-light flex items-center justify-center ring-1 ring-brand/20">
                <Icon name={ind.icon} size={21} />
              </div>
              <h2 className="text-lg font-semibold mt-5 text-white">{ind.title}</h2>
              <p className="text-sm text-slate-400 mt-3 flex-1 leading-relaxed">{ind.desc}</p>
              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  What we build
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {ind.builds.map((b) => (
                    <span key={b} className="chip">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-slate-400 mt-14">
          Don&apos;t see your industry?{' '}
          <Link href="/contact" className="text-brand-light font-medium hover:underline">
            Tell us about your project
          </Link>{' '}
          — most of what makes software hard is not sector-specific.
        </p>
      </section>

      <CtaBand
        title="Let's build for your sector"
        lede="Whatever the domain, we start by learning how the work is really done — then design software that fits it rather than fighting it."
        secondary="work"
      />
    </>
  );
}
