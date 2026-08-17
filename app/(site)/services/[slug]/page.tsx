import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { Icon } from '@/components/icon';
import { FaqAccordion } from '@/components/faq';
import { CtaBand } from '@/components/cta-band';
import { SectionHeading } from '@/components/section-heading';
import {
  ServiceStructuredData,
  BreadcrumbStructuredData,
  FaqStructuredData,
} from '@/components/structured-data';
import { services, getService } from '@/lib/services';
import { site, showWhatsApp, whatsappLink } from '@/lib/site';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${site.url}/services/${service.slug}`,
      images: ['/opengraph-image'],
    },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <ServiceStructuredData
        name={service.title}
        description={service.metaDescription}
        serviceType={service.title}
        url={`${site.url}/services/${service.slug}`}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: site.url },
          { name: 'Services', url: `${site.url}/services` },
          { name: service.title, url: `${site.url}/services/${service.slug}` },
        ]}
      />
      <FaqStructuredData items={service.faqs} />

      {/* Hero */}
      <section className="relative aurora border-b border-white/[0.06]">
        <div
          className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-50"
          aria-hidden="true"
        />
        <div className="relative container-g py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-light transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/services" className="hover:text-brand-light transition-colors">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-300">{service.title}</span>
            </nav>
            <div className="h-14 w-14 rounded-2xl bg-brand/12 text-brand-light flex items-center justify-center ring-1 ring-brand/20">
              <Icon name={service.icon} size={26} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mt-6 leading-[1.12] tracking-tight">
              {service.title}
            </h1>
            <p className="text-lg text-slate-400 mt-5 leading-relaxed">{service.hero}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Get a free quote
              </Link>
              {showWhatsApp ? (
                <a
                  href={whatsappLink(`Hi ${site.name}, I'm interested in ${service.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  Chat on WhatsApp
                </a>
              ) : (
                <Link href="/portfolio" className="btn btn-outline btn-lg">
                  See our work
                </Link>
              )}
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="relative aspect-[8/5] bg-night-800">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-g section">
        <SectionHeading
          eyebrow="What you get"
          title="Built to hold up in production"
          align="left"
        />
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {service.features.map((f) => (
            <div key={f.title} className="card p-7 flex gap-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand-light ring-1 ring-brand/20">
                <Check size={19} strokeWidth={2.5} />
              </span>
              <div>
                <h3 className="font-semibold text-white">{f.title}</h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables + tech */}
      <section className="section-raised">
        <div className="container-g section grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">What&apos;s included</h2>
            <ul className="mt-7 space-y-3.5">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-slate-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25">
                    <Check size={12} strokeWidth={3.5} />
                  </span>
                  <span className="text-[15px] leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Technologies we use</h2>
            <div className="flex flex-wrap gap-2 mt-7">
              {service.tech.map((t) => (
                <span key={t} className="badge text-sm py-1.5 px-4">
                  {t}
                </span>
              ))}
            </div>
            <div className="card p-7 mt-8">
              <h3 className="font-semibold text-white">Not sure which of these fits?</h3>
              <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
                Stack choices are trade-offs between cost, speed, and who you will be able to hire
                in two years. Tell us your constraints and we will make the case for a specific
                option in writing — no obligation.
              </p>
              <Link href="/contact" className="btn btn-primary mt-5">
                Ask for a recommendation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-g section">
        <SectionHeading
          eyebrow="FAQ"
          title={`${service.title} — common questions`}
          lede="The questions clients actually ask before signing off on this work."
        />
        <div className="mt-12">
          <FaqAccordion items={service.faqs} />
        </div>
      </section>

      {/* Other services */}
      <section className="section-deep">
        <div className="container-g section">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Explore our other services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {others.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card card-hover p-6 flex gap-4 items-start group">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand-light ring-1 ring-brand/20">
                  <Icon name={s.icon} size={19} />
                </span>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-brand-light transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{s.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Ready to start your ${service.title.toLowerCase()} project?`}
        lede="Send us the requirements — or just the problem — and we will come back with a fixed-price quote, usually within one business day."
      />
    </>
  );
}
