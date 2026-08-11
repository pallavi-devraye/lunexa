import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Hero } from '@/components/hero';
import { CaseStudies } from '@/components/case-studies';
import { Testimonials } from '@/components/testimonials';
import { FaqSection } from '@/components/faq';
import { CtaBand } from '@/components/cta-band';
import { SectionHeading } from '@/components/section-heading';
import { Icon } from '@/components/icon';
import { FaqStructuredData } from '@/components/structured-data';
import { services, extraServices } from '@/lib/services';
import { industries } from '@/lib/industries';
import { techCategories, featuredTech } from '@/lib/tech';
import { homeFaqs } from '@/lib/faq';
import { engagementModels } from '@/lib/engagement';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// What we commit to on every engagement. A new company cannot honestly quote
// project counts, so this band earns trust with promises we can actually keep
// rather than numbers we would have to invent.
const commitments = [
  {
    icon: 'CircleDollarSign',
    title: 'A fixed price before we start',
    desc: 'You approve an itemised quote and a milestone plan. Scope changes are quoted and agreed before anyone touches them.',
  },
  {
    icon: 'Clock',
    title: 'Overlap with your working day',
    desc: 'A guaranteed shared window every day for calls and decisions, with a written end-of-day update either side of it.',
  },
  {
    icon: 'Code2',
    title: 'Your repository from day one',
    desc: 'Code lands in your GitHub, reviewed and tested, from the first commit. You can bring in your own reviewer whenever you like.',
  },
  {
    icon: 'ShieldCheck',
    title: 'You own all of it',
    desc: 'NDA before we see anything sensitive, IP assignment in the contract, and every account handed over at the end. No lock-in.',
  },
  {
    icon: 'Users',
    title: 'Senior engineers, not a handover',
    desc: 'The people who scope your project are the people who build it. Nothing is quietly passed down to a junior bench.',
  },
  {
    icon: 'Wrench',
    title: 'We stay after launch',
    desc: 'Maintenance plans covering updates, security patches, monitoring, and a set allowance of changes each month.',
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'We dig into the goal behind the request, map the constraints, and challenge scope that will not earn its cost. You leave with a plan, whoever builds it.',
  },
  {
    step: '02',
    title: 'Design & architecture',
    desc: 'Flows and screens you can click through, plus the technical architecture written down — approved by you before a line of production code exists.',
  },
  {
    step: '03',
    title: 'Build in short cycles',
    desc: 'Working software every sprint, demoed live. Code review, automated tests, and CI on every change so quality is not a final-week scramble.',
  },
  {
    step: '04',
    title: 'Launch & iterate',
    desc: 'We deploy, monitor, and hand over everything — then keep improving it against what real users actually do.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Trust / tech strip */}
      <div className="section-raised">
        <div className="container-g py-7 flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-10">
          <span className="text-sm font-semibold text-slate-200 text-center shrink-0">
            Building on the stack your team can hire for
          </span>
          <span className="hidden lg:inline h-5 w-px bg-white/15" />
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-slate-500">
            {featuredTech.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="container-g section">
        <SectionHeading
          eyebrow="What we do"
          title="One team for the whole product"
          lede="Design, web, mobile, AI, and the infrastructure underneath — so nothing falls into the gap between three separate vendors."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="card card-hover p-7 flex flex-col group"
            >
              <div className="h-12 w-12 rounded-2xl bg-brand/12 text-brand-light flex items-center justify-center ring-1 ring-brand/20 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                <Icon name={s.icon} size={22} />
              </div>
              <h3 className="text-lg font-semibold mt-5 group-hover:text-brand-light transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-slate-400 mt-3 flex-1 leading-relaxed">{s.short}</p>
              <div className="flex flex-wrap gap-1.5 mt-5">
                {s.tech.slice(0, 4).map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light">
                Learn more
                <Icon name="ArrowRight" size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {extraServices.map((s) => (
            <div key={s.title} className="card-edge p-5 pl-6">
              <div className="flex items-center gap-2.5">
                <span className="text-accent">
                  <Icon name={s.icon} size={17} />
                </span>
                <h3 className="font-semibold text-sm text-white">{s.title}</h3>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commitments */}
      <section className="section-raised">
        <div className="container-g section">
          <SectionHeading
            eyebrow={`Why ${site.shortName}`}
            title="Offshore without the usual trade-offs"
            lede="Most bad offshore experiences come down to the same handful of failures. These are the commitments we make so they do not happen to you."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {commitments.map((w) => (
              <div key={w.title} className="card p-7">
                <div className="h-11 w-11 rounded-xl bg-brand/12 text-brand-light flex items-center justify-center ring-1 ring-brand/20">
                  <Icon name={w.icon} size={19} />
                </div>
                <h3 className="font-semibold mt-5 text-white">{w.title}</h3>
                <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global clients */}
      <section className="container-g section">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="eyebrow">Global delivery</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
              An engineering team in{' '}
              <span className="gradient-text">your time zone&apos;s reach</span>
            </h2>
            <p className="text-slate-400 mt-5 leading-relaxed">
              We work with startups and established companies across five continents. You get senior
              engineering at Indian rates, with the communication discipline that decides whether
              offshore actually works.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { t: 'A guaranteed daily overlap', d: 'A fixed window inside your working hours for calls and decisions, agreed before we start.' },
                { t: 'Written updates, weekly demos', d: 'You always know what shipped, what is next, and what is blocked — without asking.' },
                { t: 'Invoiced in your currency', d: 'USD, GBP, EUR, AED or INR, via international transfer, Wise, or Payoneer.' },
                { t: 'Start with a small paid pilot', d: 'Judge the code and the communication on a low-risk scope before committing further.' },
              ].map((x) => (
                <li key={x.t} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/25">
                    <Icon name="Check" size={12} strokeWidth={3.5} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{x.t}</span>
                    <span className="block text-sm text-slate-400 mt-1 leading-relaxed">{x.d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Book a free consultation
              </Link>
              <Link href="/hire-developers" className="btn btn-outline">
                How engagements work
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {site.markets.map((m) => (
              <div key={m.code} className="card card-hover p-6">
                <div className="text-3xl leading-none" aria-hidden="true">
                  {m.flag}
                </div>
                <h3 className="font-semibold mt-4 text-white">{m.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{m.tz}</p>
                <p className="text-sm text-accent mt-3">{m.overlap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="section-deep">
        <div className="container-g section">
          <SectionHeading
            eyebrow="How to work with us"
            title="Four ways to start"
            lede="Pick the shape that fits the problem. You can move between them as the work changes — most clients do."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {engagementModels.map((m) => (
              <Link
                key={m.slug}
                href={`/hire-developers#${m.slug}`}
                className="card card-hover p-6 flex flex-col group"
              >
                <div className="h-11 w-11 rounded-xl bg-accent/12 text-accent flex items-center justify-center ring-1 ring-accent/20">
                  <Icon name={m.icon} size={19} />
                </div>
                <h3 className="font-semibold mt-5 text-white group-hover:text-brand-light transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-accent-light/80 mt-1.5">{m.tagline}</p>
                <p className="text-sm text-slate-400 mt-3 flex-1 leading-relaxed">{m.desc}</p>
                <dl className="mt-5 pt-5 border-t border-white/10 space-y-1.5 text-xs">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Billing</dt>
                    <dd className="text-slate-300 text-right">{m.billing}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Commitment</dt>
                    <dd className="text-slate-300 text-right">{m.commitment}</dd>
                  </div>
                </dl>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-g section">
        <SectionHeading
          eyebrow="How we work"
          title="A process built to remove surprises"
          lede="Four stages, each ending in something you can see and sign off. No black-box months."
        />
        {/* The aspect matches the SVG's 800×340 viewBox exactly — object-cover
            on a mismatched box would crop the stage labels off the edges. */}
        <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 mt-14 aspect-[40/17]">
          <Image
            src="/images/product-engineering-process.svg"
            alt="Product engineering process — discovery, design, build in sprints, launch and iterate"
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-contain"
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {process.map((p) => (
            <div key={p.step} className="card-edge p-6 pl-7">
              <span className="font-display text-2xl font-bold gradient-text">{p.step}</span>
              <h3 className="font-semibold mt-3 text-white">{p.title}</h3>
              <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CaseStudies />

      {/* Industries */}
      <section className="section-raised">
        <div className="container-g section">
          <SectionHeading
            eyebrow="Industries"
            title="Domains we already understand"
            lede="Knowing the domain shortens discovery and stops us designing something that breaks the first time it meets a real regulation or a real warehouse."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-14">
            {industries.slice(0, 8).map((ind) => (
              <Link
                key={ind.slug}
                href="/industries"
                className="card card-hover p-5 flex flex-col items-center text-center gap-3 group"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/15 to-accent/12 text-brand-light ring-1 ring-white/10 group-hover:from-brand group-hover:to-brand-dark group-hover:text-white transition-all duration-300">
                  <Icon name={ind.icon} size={20} />
                </span>
                <span className="text-sm font-semibold text-slate-200 group-hover:text-brand-light transition-colors leading-snug">
                  {ind.title}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/industries" className="btn btn-outline">
              All industries
            </Link>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="container-g section">
        <SectionHeading
          eyebrow="Our stack"
          title="Mainstream technology, chosen deliberately"
          lede="We build on tools with large talent pools and long support horizons, so you can hire for your own product later without inheriting something exotic."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {techCategories.map((c) => (
            <div key={c.title} className="card p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand-light ring-1 ring-brand/20">
                  <Icon name={c.icon} size={17} />
                </span>
                <h3 className="font-semibold text-white">{c.title}</h3>
              </div>
              <p className="text-sm text-slate-400 mt-3.5 leading-relaxed">{c.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {c.items.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />

      <FaqSection items={homeFaqs} />
      <FaqStructuredData items={homeFaqs} />

      <CtaBand secondary="call" />
    </>
  );
}
