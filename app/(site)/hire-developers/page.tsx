import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Icon } from '@/components/icon';
import { SectionHeading } from '@/components/section-heading';
import { FaqAccordion } from '@/components/faq';
import { CtaBand } from '@/components/cta-band';
import { BreadcrumbStructuredData, FaqStructuredData } from '@/components/structured-data';
import { engagementModels, roles, offshoreConcerns } from '@/lib/engagement';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Hire Dedicated Developers in India | Lunexa Technologies' },
  description:
    'Hire dedicated developers from India — fixed-price projects, dedicated teams, staff augmentation, and discovery sprints. Guaranteed time-zone overlap, NDA and full IP transfer. Serving the US, UK, UAE, Europe and Australia.',
  alternates: { canonical: '/hire-developers' },
};

const faqs = [
  {
    question: 'How quickly can a developer or team start?',
    answer:
      'For common stacks — React, Next.js, Node, Java, Python, Flutter, Kotlin — we typically start within two to three weeks. Specialist roles such as senior AI or platform engineers can take longer, and we tell you the realistic date rather than the one you want to hear.',
  },
  {
    question: 'What are your rates?',
    answer:
      'Rates depend on seniority, stack, and engagement length, and we quote them per role rather than publishing a single number that would be wrong for most of them. Send us the roles you need and you get a written rate card, usually the same day.',
  },
  {
    question: 'Do we interview the engineers ourselves?',
    answer:
      'Yes, and we recommend it. We shortlist against your requirements, you interview, and you decide. Nobody joins your team without your approval.',
  },
  {
    question: 'Who manages the team day to day?',
    answer:
      'It depends on the model. With a dedicated team, our technical lead manages delivery and reports to you. With staff augmentation, the engineers report to your leads and follow your process entirely.',
  },
  {
    question: 'What if an engineer is not working out?',
    answer:
      'Tell us early. We replace anyone within two weeks at no additional cost, and we handle the handover so context is not lost. We would rather fix the fit than defend a bad one.',
  },
  {
    question: 'Can we hire the engineers permanently later?',
    answer:
      'Yes. We agree buyout terms upfront so it is never an awkward conversation. We would rather your product succeeds than hold a good engineer hostage to a contract.',
  },
  {
    question: 'How is our intellectual property protected?',
    answer:
      'An NDA is signed before we see anything sensitive, and IP assignment is written into the master agreement — everything created for you is yours from the moment it is written. Access follows least privilege, and we can work entirely inside your own cloud and repositories.',
  },
  {
    question: 'How do we pay an Indian company?',
    answer:
      'We invoice in your currency — USD, GBP, EUR, AED or INR — with invoices formatted for your accounting, and accept international bank transfer, Wise, or Payoneer. We handle the compliance paperwork on our side.',
  },
];

export default function HireDevelopersPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: site.url },
          { name: 'Hire Developers', url: `${site.url}/hire-developers` },
        ]}
      />
      <FaqStructuredData items={faqs} />

      {/* Hero */}
      <section className="relative aurora border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-50" aria-hidden="true" />
        <div className="relative container-g py-20 md:py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="eyebrow">Hire developers</span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.3rem] leading-[1.1] mt-6 tracking-tight">
              Senior engineers from India,{' '}
              <span className="gradient-text">on your terms</span>
            </h1>
            <p className="text-lg text-slate-400 mt-6 leading-relaxed">
              Whether you need one specialist for a quarter or a full product team for a year, you
              get vetted engineers who work in your tools, in your rituals, with a guaranteed
              overlap with your working day.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Request a rate card
              </Link>
              <Link href="/portfolio" className="btn btn-outline btn-lg">
                See our work
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
              {['You interview and approve', 'NDA before we start', 'Full IP assignment', '30 days notice'].map(
                (x) => (
                  <span key={x} className="inline-flex items-center gap-2">
                    <Check size={13} className="text-emerald-400 shrink-0" strokeWidth={3} /> {x}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="relative aspect-[8/5] bg-night-800">
              <Image
                src="/images/dedicated-development-team.svg"
                alt="A dedicated offshore engineering team working in the client's own board, repository and rituals"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="container-g section">
        <SectionHeading
          eyebrow="Engagement models"
          title="Four ways to work together"
          lede="Pick the shape that matches the problem today. Moving between models later is normal, and there is no penalty for it."
        />
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {engagementModels.map((m) => (
            <div key={m.slug} id={m.slug} className="card p-8 scroll-mt-28 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div className="h-12 w-12 rounded-2xl bg-accent/12 text-accent flex items-center justify-center ring-1 ring-accent/20 shrink-0">
                  <Icon name={m.icon} size={21} />
                </div>
                <span className="chip-gold shrink-0">{m.commitment}</span>
              </div>
              <h3 className="text-xl font-semibold mt-5 text-white">{m.title}</h3>
              <p className="text-sm text-accent-light/80 mt-1.5">{m.tagline}</p>
              <p className="text-slate-400 mt-4 leading-relaxed">{m.desc}</p>
              <ul className="mt-6 space-y-2.5 flex-1">
                {m.includes.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-light ring-1 ring-brand/25">
                      <Check size={11} strokeWidth={3.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <dl className="mt-7 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Best for</dt>
                  <dd className="text-slate-300 mt-1">{m.bestFor}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Billing</dt>
                  <dd className="text-slate-300 mt-1">{m.billing}</dd>
                </div>
              </dl>
              <Link href="/contact" className="btn btn-outline mt-6">
                Discuss this model
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="section-raised">
        <div className="container-g section">
          <SectionHeading
            eyebrow="Roles we staff"
            title="The people you can add to your team"
            lede="Every engineer is vetted on real code and a live problem, not a quiz. You interview the shortlist and make the final call."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {roles.map((r) => (
              <div key={r.title} className="card p-6">
                <h3 className="font-semibold text-white">{r.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {r.skills.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-10">
            Need a role that is not listed?{' '}
            <Link href="/contact" className="text-brand-light font-medium hover:underline">
              Tell us what you need
            </Link>{' '}
            — we will say honestly whether we can staff it.
          </p>
        </div>
      </section>

      {/* Objections */}
      <section className="container-g section">
        <SectionHeading
          eyebrow="Straight answers"
          title="The concerns everyone has about offshore"
          lede="These are the objections we hear on almost every first call. Here is how we handle each one, in writing, before you commit to anything."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {offshoreConcerns.map((c) => (
            <div key={c.concern} className="card-edge p-7 pl-8">
              <div className="flex items-center gap-3">
                <span className="text-brand-light shrink-0">
                  <Icon name={c.icon} size={19} />
                </span>
                <h3 className="font-semibold text-white leading-snug">{c.concern}</h3>
              </div>
              <p className="text-sm text-slate-400 mt-3.5 leading-relaxed">{c.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Time zones */}
      <section className="section-deep">
        <div className="container-g section">
          <SectionHeading
            eyebrow="Time zones"
            title="Where the working day actually overlaps"
            lede="We publish this rather than promising 'flexible hours'. The overlap is written into the engagement, and our team's day is shifted to hold it."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {site.markets.map((m) => (
              <div key={m.code} className="card p-6 flex items-center gap-4">
                <span className="text-3xl leading-none shrink-0" aria-hidden="true">
                  {m.flag}
                </span>
                <div>
                  <h3 className="font-semibold text-white">{m.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{m.tz}</p>
                  <p className="text-sm text-accent mt-2">{m.overlap}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-g section">
        <SectionHeading
          eyebrow="FAQ"
          title="Hiring questions, answered"
          lede="If something here is still unclear, ask us directly — we would rather answer it now than in month three."
        />
        <div className="mt-12">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <CtaBand
        title="Tell us the roles and we'll send a rate card"
        lede="Describe the skills, seniority, and how long you need them. You get a written rate card and available profiles — usually within one business day."
        primaryLabel="Request a rate card"
        secondary="call"
      />
    </>
  );
}
