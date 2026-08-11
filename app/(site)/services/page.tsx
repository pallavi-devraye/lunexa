import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { SectionHeading } from '@/components/section-heading';
import { CtaBand } from '@/components/cta-band';
import { BreadcrumbStructuredData } from '@/components/structured-data';
import { services, extraServices } from '@/lib/services';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Software Development Services | Lunexa Technologies' },
  description:
    'Website, web app, mobile app, AI, cloud, and UI/UX services for startups and growing companies in the US, UK, UAE, Europe, Australia and India — senior offshore engineering from Pune.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: site.url },
          { name: 'Services', url: `${site.url}/services` },
        ]}
      />

      <section className="aurora border-b border-white/[0.06]">
        <div
          className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-50"
          aria-hidden="true"
        />
        <div className="relative container-g py-20 md:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">Our services</span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.1] mt-6 tracking-tight">
              Everything between the idea and the{' '}
              <span className="gradient-text">running product</span>
            </h1>
            <p className="text-lg text-slate-400 mt-6 leading-relaxed">
              Six capabilities that make one team. Most clients start with a single service and
              expand, because the same people already know the codebase, the constraints, and the
              decisions behind them.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Get a free quote
              </Link>
              <Link href="/pricing" className="btn btn-outline btn-lg">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core services, alternating */}
      <section className="container-g section space-y-20 md:space-y-28">
        {services.map((s, i) => (
          <article key={s.slug} className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className={`card overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="relative aspect-[8/5] bg-night-800">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
              <div className="h-12 w-12 rounded-2xl bg-brand/12 text-brand-light flex items-center justify-center ring-1 ring-brand/20">
                <Icon name={s.icon} size={22} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mt-5">{s.title}</h2>
              <p className="text-slate-400 mt-4 leading-relaxed">{s.hero}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {s.features.map((f) => (
                  <li key={f.title} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                    <span>
                      <strong className="text-white font-semibold">{f.title}.</strong> {f.desc}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-6">
                {s.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/services/${s.slug}`} className="btn btn-primary">
                  Explore {s.title}
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Get a quote
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Supporting capabilities */}
      <section className="section-raised">
        <div className="container-g section">
          <SectionHeading
            eyebrow="Also available"
            title="The work around the work"
            lede="Everything a product needs beyond the initial build, handled by the same team."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {extraServices.map((s) => (
              <div key={s.title} className="card p-7">
                <div className="h-11 w-11 rounded-xl bg-accent/12 text-accent flex items-center justify-center ring-1 ring-accent/20">
                  <Icon name={s.icon} size={19} />
                </div>
                <h3 className="font-semibold mt-5 text-white">{s.title}</h3>
                <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which of these you actually need?"
        lede="Describe the problem rather than the solution, and we will tell you the most cost-effective way to solve it — even when that means less work for us."
        primaryLabel="Talk to an engineer"
        secondary="work"
      />
    </>
  );
}
