import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CtaBand } from '@/components/cta-band';
import { BreadcrumbStructuredData } from '@/components/structured-data';
import { projects } from '@/lib/portfolio';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Case Studies — Software We Have Built | Lunexa Technologies' },
  description:
    'Case studies from Lunexa Technologies — AI assistants, offline-first mobile apps, multi-tenant SaaS, headless e-commerce, and AWS cost programmes delivered for clients worldwide.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: site.url },
          { name: 'Case Studies', url: `${site.url}/portfolio` },
        ]}
      />

      <section className="relative aurora border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-50" aria-hidden="true" />
        <div className="relative container-g py-20 md:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">Case studies</span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.1] mt-6 tracking-tight">
              The constraint, the decision, and{' '}
              <span className="gradient-text">what changed</span>
            </h1>
            <p className="text-lg text-slate-400 mt-6 leading-relaxed">
              Every project here started with a real limitation — a budget, a deadline, a legacy
              system, a team that had been burned before. These write-ups cover what we actually
              did about it.
            </p>
          </div>
        </div>
      </section>

      <section className="container-g section">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="card card-hover overflow-hidden group flex flex-col"
            >
              <div className="relative aspect-[8/5] shrink-0 bg-night-800">
                <Image
                  src={p.image}
                  alt={`${p.title} — ${p.category} case study`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute top-3 left-3 chip bg-night/80 backdrop-blur">{p.category}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs text-slate-500">
                  {p.client} · {p.region}
                </p>
                <h2 className="font-semibold text-lg mt-2 leading-snug group-hover:text-brand-light transition-colors">
                  {p.title}
                </h2>
                <p className="text-sm text-slate-400 mt-3 flex-1 leading-relaxed">{p.summary}</p>
                <p className="text-sm font-semibold text-accent mt-4">{p.result}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light">
                  Read the case study
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-500 mt-12 max-w-2xl mx-auto leading-relaxed">
          Client names are withheld where our agreement requires it. Outcomes are described
          qualitatively rather than as invented percentages — we would rather be checkable than
          impressive.
        </p>
      </section>

      <CtaBand
        title="Have a constraint of your own?"
        lede="Tell us the budget, the deadline, or the legacy system you are working around. That is usually where the interesting engineering starts."
        // No secondary button here: the fallback for an unpublished channel is
        // "See our work", which on this page would link back to itself.
        secondary="none"
      />
    </>
  );
}
