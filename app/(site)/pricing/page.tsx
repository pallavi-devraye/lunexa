import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Icon } from '@/components/icon';
import { SectionHeading } from '@/components/section-heading';
import { FaqAccordion } from '@/components/faq';
import { CtaBand } from '@/components/cta-band';
import { BreadcrumbStructuredData, FaqStructuredData } from '@/components/structured-data';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Pricing — Fixed-Price Software Development | Lunexa' },
  description:
    'Transparent pricing for software development: fixed-price projects, monthly dedicated teams, and paid discovery sprints. Quoted in USD, GBP, EUR, AED or INR with milestone payments.',
  alternates: { canonical: '/pricing' },
};

const tiers = [
  {
    name: 'Launch',
    best: 'Getting a credible product in front of people',
    summary:
      'A marketing site or a focused MVP — designed, built, and shipped as one fixed-price project.',
    features: [
      'Discovery and written scope',
      'Custom UI design, mobile-first',
      'Marketing site or MVP build',
      'On-page SEO, analytics, forms',
      'Deployment and domain setup',
      'Two weeks of post-launch support',
    ],
    cta: 'Get a Launch quote',
    highlighted: false,
  },
  {
    name: 'Build',
    best: 'A real product with users and a roadmap',
    summary:
      'A custom web app, mobile app, or SaaS platform, delivered in milestones against an agreed scope.',
    features: [
      'Everything in Launch',
      'Custom web app, mobile app, or SaaS',
      'Auth, roles, and admin tooling',
      'Payments and third-party integrations',
      'Automated tests and CI/CD',
      'Monitoring, alerting, and a runbook',
      'Priority support and team training',
    ],
    cta: 'Get a Build quote',
    highlighted: true,
  },
  {
    name: 'Partner',
    best: 'Ongoing product development',
    summary:
      'A dedicated team billed monthly, working your roadmap sprint after sprint as an extension of your company.',
    features: [
      'Named engineers, dedicated to you',
      'Technical lead accountable for delivery',
      'Your board, your rituals, your repo',
      'Guaranteed daily time-zone overlap',
      'Scale up or down on 30 days notice',
      'Quarterly architecture review',
    ],
    cta: 'Discuss a team',
    highlighted: false,
  },
];

const inclusions = [
  { icon: 'Lock', title: 'No hidden charges', desc: 'The quote is the price. Anything outside the agreed scope is quoted and approved before work starts.' },
  { icon: 'ShieldCheck', title: 'You own everything', desc: 'Source code, design files, infrastructure, and every account transferred to you. IP assignment is in the contract.' },
  { icon: 'Workflow', title: 'Milestone payments', desc: 'Payment tracks delivered, demoed work — not a calendar. You are never paying far ahead of what exists.' },
  { icon: 'Wrench', title: 'Support after launch', desc: 'Optional maintenance plans covering updates, patches, monitoring, and a monthly change allowance.' },
];

const faqs = [
  {
    question: 'Why is there no price list?',
    answer:
      'Because a single number would be wrong for almost everyone who reads it. "A web app" covers a two-week internal tool and a nine-month platform. We would rather spend a day scoping properly and give you a fixed price we will stand behind than post a range you cannot plan against.',
  },
  {
    question: 'How fast can you quote?',
    answer:
      'For a well-described project, usually within one business day. If the requirements are still forming, we will say what we need to know rather than padding the estimate to cover the uncertainty — or suggest a paid discovery sprint if the unknowns are genuinely large.',
  },
  {
    question: 'What currency do you invoice in?',
    answer:
      'USD, GBP, EUR, AED, or INR — whichever suits your accounting. We accept international bank transfer, Wise, and Payoneer, and issue invoices formatted for your finance team.',
  },
  {
    question: 'Do you take equity instead of fees?',
    answer:
      'Not usually. We prefer a straightforward commercial relationship where our incentives are clear. For pre-seed founders we would rather cut scope to fit the budget than dilute you and blur the accountability.',
  },
  {
    question: 'What if the project runs over?',
    answer:
      'On fixed-price work, an overrun caused by our estimate is our cost, not yours. That is the point of a fixed price. If the scope changes on your side, we quote the change first and you decide whether it is worth it.',
  },
  {
    question: 'Are there ongoing costs after launch?',
    answer:
      'Yes, and we set them out before you commit: hosting, domain, and any paid third-party services, plus AI usage if your product uses models. We design for efficiency and estimate the monthly run cost upfront so there are no surprises on the first bill.',
  },
  {
    question: 'Can you work within a fixed budget?',
    answer:
      'Usually. Tell us the number and we will tell you honestly what fits inside it and what does not. Cutting scope to a real budget produces a better product than stretching an over-ambitious scope thin.',
  },
];

export default function PricingPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: site.url },
          { name: 'Pricing', url: `${site.url}/pricing` },
        ]}
      />
      <FaqStructuredData items={faqs} />

      <section className="relative aurora border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-50" aria-hidden="true" />
        <div className="relative container-g py-20 md:py-24 text-center">
          <span className="eyebrow">Pricing</span>
          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.1] mt-6 max-w-3xl mx-auto tracking-tight">
            Fixed prices, quoted{' '}
            <span className="gradient-text">before you commit</span>
          </h1>
          <p className="text-lg text-slate-400 mt-6 max-w-2xl mx-auto leading-relaxed">
            No hourly meter, no scope creep billed after the fact. You get an itemised quote and a
            milestone plan, and the price only moves if you ask it to.
          </p>
          <div className="mt-9 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl bg-white/[0.04] ring-1 ring-white/10 px-5 py-3.5">
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">We invoice in</span>
            {['USD $', 'GBP £', 'EUR €', 'AED د.إ', 'INR ₹'].map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="container-g section">
        <div className="grid lg:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`card p-8 flex flex-col ${
                t.highlighted ? 'ring-2 ring-brand/60 shadow-glow relative lg:-mt-4 lg:mb-4' : ''
              }`}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge bg-brand text-white ring-brand whitespace-nowrap">
                  Most common
                </span>
              )}
              <h2 className="text-2xl font-bold">{t.name}</h2>
              <p className="text-xs font-medium text-brand-light mt-2">Best for: {t.best}</p>
              <p className="text-sm text-slate-400 mt-4 leading-relaxed">{t.summary}</p>
              <div className="mt-6 pb-6 border-b border-white/10">
                <span className="text-2xl font-bold text-white font-display">Custom quote</span>
                <p className="text-xs text-slate-500 mt-1.5">
                  Fixed price · your currency · itemised
                </p>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25 shrink-0">
                      <Check size={11} strokeWidth={3.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`btn mt-8 ${t.highlighted ? 'btn-primary' : 'btn-outline'}`}>
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why offshore costs less */}
      <section className="section-raised">
        <div className="container-g section">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="eyebrow">For overseas clients</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
                The rate reflects where we are, {' '}
                <span className="gradient-text">not the standard of work</span>
              </h2>
              <p className="text-slate-400 mt-5 leading-relaxed">
                Salaries, rent, and overheads in Pune are a fraction of what they are in New York,
                London, or Sydney. That difference is the entire discount — it does not come from
                junior staff, rushed reviews, or corners cut on testing.
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  'Quoted and invoiced in your currency',
                  'Milestone payments, never everything upfront',
                  'International transfer, Wise, or Payoneer',
                  'NDA and IP assignment signed before we start',
                  'Compliant invoices your finance team can file',
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25 shrink-0">
                      <Check size={11} strokeWidth={3.5} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Typical project rate, relative
              </p>
              <div className="grid grid-cols-3 gap-5 text-center mt-8">
                {[
                  { region: 'US / UK agency', level: 'Highest', h: 'h-40', tone: 'bg-white/[0.09]' },
                  { region: 'EU / AU agency', level: 'High', h: 'h-28', tone: 'bg-white/[0.14]' },
                  { region: site.shortName, level: 'Best value', h: 'h-14', tone: 'bg-gradient-to-t from-brand-dark via-brand to-accent' },
                ].map((c) => (
                  <div key={c.region} className="flex flex-col items-center justify-end">
                    <span className="text-[11px] text-slate-500 mb-2.5">{c.level}</span>
                    <div className={`w-full rounded-t-xl ${c.h} ${c.tone}`} />
                    <span className="text-xs text-slate-300 mt-3.5 leading-tight">{c.region}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-8 text-center leading-relaxed">
                An indicative comparison of typical project rates, not a quote. Yours is always
                fixed and itemised against your actual scope.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {inclusions.map((v) => (
              <div key={v.title} className="card p-7">
                <div className="h-11 w-11 rounded-xl bg-accent/12 text-accent flex items-center justify-center ring-1 ring-accent/20">
                  <Icon name={v.icon} size={19} />
                </div>
                <h3 className="font-semibold mt-5 text-white">{v.title}</h3>
                <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-g section">
        <SectionHeading
          eyebrow="Pricing FAQ"
          title="Straight answers about money"
          lede="The questions people usually ask on the second call. Here they are on the first."
        />
        <div className="mt-12">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <CtaBand
        title="Get a fixed price for your project"
        lede="Describe what you need — or just the problem you are trying to solve — and we will send a clear, itemised quote, usually within one business day."
      />
    </>
  );
}
