import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { SectionHeading } from '@/components/section-heading';
import { CtaBand } from '@/components/cta-band';
import { BreadcrumbStructuredData } from '@/components/structured-data';
import { techCategories } from '@/lib/tech';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'About Lunexa Technologies | Software Company in Pune, India' },
  description:
    'Lunexa Technologies is a software development company in Wagholi, Pune, India, working as the offshore product engineering team for startups and growing companies across the US, UK, UAE, Europe and Australia.',
  alternates: { canonical: '/about' },
};

const principles = [
  {
    icon: 'Compass',
    title: 'We argue with the brief',
    desc: 'The request is rarely the problem. We ask what you are actually trying to achieve and will push back on scope that will not earn its cost — including our own.',
  },
  {
    icon: 'Eye',
    title: 'Nothing happens off-screen',
    desc: 'Your repository, your board, written updates every day. If you have to ask where a project stands, we have already failed at the easy part.',
  },
  {
    icon: 'Award',
    title: 'Senior people do the work',
    desc: 'The engineers who scope your project are the ones who build it. No bait-and-switch to a junior bench once the contract is signed.',
  },
  {
    icon: 'Layers',
    title: 'Boring technology on purpose',
    desc: 'We pick tools with large talent pools and long support horizons, so you can hire for your own product later without inheriting something exotic.',
  },
  {
    icon: 'Handshake',
    title: 'Easy to leave',
    desc: 'Full IP transfer, documented handover, 30 days notice. We would rather earn the next engagement than trap you in this one.',
  },
  {
    icon: 'Lightbulb',
    title: 'We say what we do not know',
    desc: 'An honest "we would need to test that" beats a confident guess that costs you three weeks. Uncertainty gets named, then reduced.',
  },
];

const capabilities = [
  { icon: 'Globe', title: 'Website Development', href: '/services/website-development' },
  { icon: 'LayoutDashboard', title: 'Web App & SaaS', href: '/services/web-app-development' },
  { icon: 'Smartphone', title: 'Mobile App Development', href: '/services/mobile-app-development' },
  { icon: 'Sparkles', title: 'AI Product Engineering', href: '/services/ai-solutions' },
  { icon: 'Cloud', title: 'Cloud & DevOps', href: '/services/cloud-devops' },
  { icon: 'PenTool', title: 'UI/UX Design', href: '/services/ui-ux-design' },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: site.url },
          { name: 'About', url: `${site.url}/about` },
        ]}
      />

      {/* Hero */}
      <section className="relative aurora border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-50" aria-hidden="true" />
        <div className="relative container-g py-20 md:py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="eyebrow">About {site.shortName}</span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.3rem] leading-[1.1] mt-6 tracking-tight">
              A small team that{' '}
              <span className="gradient-text">behaves like a good one</span>
            </h1>
            <p className="text-lg text-slate-400 mt-6 leading-relaxed">
              {site.name} is a product engineering company based in Wagholi, Pune, working as the
              offshore team for startups and growing companies across the{' '}
              <strong className="text-white font-semibold">US, UK, UAE, Europe, Australia</strong>{' '}
              and India — building websites, web apps, mobile apps, AI features, and the cloud
              infrastructure underneath them.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Work with us
              </Link>
              <Link href="/portfolio" className="btn btn-outline btn-lg">
                See our work
              </Link>
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="relative aspect-[8/5] bg-night-800">
              <Image
                src="/images/dedicated-development-team.svg"
                alt={`The ${site.name} engineering team working in a shared board and repository`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-g section">
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="text-3xl font-bold mt-4 leading-tight">Why we started</h2>
          </div>
          <div className="lg:col-span-2 prose max-w-none">
            <p>
              Nearly every company that has outsourced software has the same story: the demos looked
              fine, the updates were vague, and the codebase that arrived at the end was somebody
              else&apos;s problem to maintain. The engineering was rarely the failure. Visibility was.
            </p>
            <p>
              We started {site.name} to run offshore the way we would want it run for our own
              product. That means a fixed price agreed before anyone starts, code landing in your
              repository from the first commit, a written update at the end of every day, and a
              working demo every week. None of that is clever. It is just harder to hide behind.
            </p>
            <p>
              Being based in Pune keeps our costs low, and that saving goes to you rather than into
              a sales team. What it does not buy is a discount on the engineering: reviews, tests,
              and CI are on every change, on every project, at every budget.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-raised">
        <div className="container-g section grid md:grid-cols-2 gap-6">
          <div className="card p-9">
            <div className="h-12 w-12 rounded-2xl bg-brand/12 text-brand-light flex items-center justify-center ring-1 ring-brand/20">
              <Icon name="Target" size={22} />
            </div>
            <h2 className="text-2xl font-bold mt-5">Our mission</h2>
            <p className="text-slate-400 mt-4 leading-relaxed">
              To make senior product engineering affordable to companies that could never justify an
              in-house team of the same calibre — without the opacity that usually comes attached to
              the price.
            </p>
          </div>
          <div className="card p-9">
            <div className="h-12 w-12 rounded-2xl bg-accent/12 text-accent flex items-center justify-center ring-1 ring-accent/20">
              <Icon name="Eye" size={22} />
            </div>
            <h2 className="text-2xl font-bold mt-5">Our vision</h2>
            <p className="text-slate-400 mt-4 leading-relaxed">
              A world where hiring an offshore team is a normal engineering decision rather than a
              gamble — judged on the code that gets shipped, not on where the people sit.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="container-g section">
        <SectionHeading
          eyebrow="How we operate"
          title="Six things we hold to"
          lede="Not values on a wall. These are the rules we actually work by, and you can hold us to every one of them."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {principles.map((v) => (
            <div key={v.title} className="card p-7">
              <div className="h-11 w-11 rounded-xl bg-brand/12 text-brand-light flex items-center justify-center ring-1 ring-brand/20">
                <Icon name={v.icon} size={19} />
              </div>
              <h3 className="font-semibold mt-5 text-white">{v.title}</h3>
              <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Where we are */}
      <section className="section-deep">
        <div className="container-g section grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="eyebrow">Where we are</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
              Pune, India — and inside your working day
            </h2>
            <p className="text-slate-400 mt-5 leading-relaxed">
              Pune is one of India&apos;s largest engineering hubs, which is why we hire here. Our
              office is in Wagholi, on the eastern side of the city, and our working day is shifted
              to hold a real overlap with whichever time zone you are in.
            </p>
            <dl className="mt-8 space-y-5 text-sm">
              <div className="flex gap-3.5">
                <Icon name="MapPin" size={17} className="text-brand-light mt-0.5 shrink-0" />
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wider">Office</dt>
                  <dd className="text-slate-200 mt-1">{site.address.full}</dd>
                </div>
              </div>
              <div className="flex gap-3.5">
                <Icon name="Clock" size={17} className="text-brand-light mt-0.5 shrink-0" />
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wider">Working hours</dt>
                  <dd className="text-slate-200 mt-1">
                    Mon–Sat, 10:00–19:00 IST — extended to overlap your time zone
                  </dd>
                </div>
              </div>
              <div className="flex gap-3.5">
                <Icon name="MessageCircle" size={17} className="text-brand-light mt-0.5 shrink-0" />
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wider">Languages</dt>
                  <dd className="text-slate-200 mt-1">English, Hindi, Marathi</dd>
                </div>
              </div>
            </dl>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {site.markets.map((m) => (
              <div key={m.code} className="card p-5">
                <div className="text-2xl leading-none" aria-hidden="true">
                  {m.flag}
                </div>
                <h3 className="font-semibold mt-3 text-sm text-white">{m.name}</h3>
                <p className="text-xs text-accent mt-2">{m.overlap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="container-g section">
        <SectionHeading
          eyebrow="What we do"
          title="Our capabilities"
          lede="Six services, one team, one accountable point of contact."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {capabilities.map((c) => (
            <Link key={c.title} href={c.href} className="card card-hover p-6 flex items-center gap-4 group">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand-light ring-1 ring-brand/20">
                <Icon name={c.icon} size={19} />
              </span>
              <span className="font-medium text-slate-200 group-hover:text-brand-light transition-colors">
                {c.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="section-raised">
        <div className="container-g section">
          <SectionHeading
            eyebrow="Our toolkit"
            title="Technologies we work with"
            lede="A deliberately broad, mainstream stack — so we can recommend what genuinely fits your project rather than the only thing we know."
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
        </div>
      </section>

      <CtaBand
        title="Let's build something together"
        lede="Honest advice, a fair fixed price, and code you would be happy to inherit. Tell us what you are working on."
        primaryLabel="Get in touch"
        secondary="call"
      />
    </>
  );
}
