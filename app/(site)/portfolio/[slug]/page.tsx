import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Clock, Tag, Building2, Globe } from 'lucide-react';
import { CtaBand } from '@/components/cta-band';
import { BreadcrumbStructuredData, CaseStudyStructuredData } from '@/components/structured-data';
import { projects, getProject } from '@/lib/portfolio';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: { absolute: p.metaTitle },
    description: p.metaDescription,
    alternates: { canonical: `/portfolio/${p.slug}` },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url: `${site.url}/portfolio/${p.slug}`,
      images: ['/opengraph-image'],
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();

  const others = projects.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <CaseStudyStructuredData
        title={p.title}
        description={p.metaDescription}
        url={`${site.url}/portfolio/${p.slug}`}
        image={`${site.url}${p.image}`}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: site.url },
          { name: 'Case Studies', url: `${site.url}/portfolio` },
          { name: p.title, url: `${site.url}/portfolio/${p.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative aurora border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-50" aria-hidden="true" />
        <div className="relative container-g py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-light transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/portfolio" className="hover:text-brand-light transition-colors">
                Case Studies
              </Link>
            </nav>
            <span className="chip">{p.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-[1.12] tracking-tight">
              {p.title}
            </h1>
            <p className="text-lg text-slate-400 mt-5 leading-relaxed">{p.summary}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <span className="inline-flex items-center gap-2 text-slate-300">
                <Building2 size={15} className="text-brand-light" /> {p.client}
              </span>
              <span className="inline-flex items-center gap-2 text-slate-300">
                <Globe size={15} className="text-brand-light" /> {p.region}
              </span>
              <span className="inline-flex items-center gap-2 text-slate-300">
                <Clock size={15} className="text-brand-light" /> {p.duration}
              </span>
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="relative aspect-[8/5] bg-night-800">
              <Image
                src={p.image}
                alt={`${p.title} — ${p.category} case study`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-g section grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">The challenge</h2>
            <p className="text-slate-300 mt-4 leading-8">{p.challenge}</p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">What we did</h2>
            <p className="text-slate-300 mt-4 leading-8">{p.solution}</p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">The outcome</h2>
            <ul className="mt-5 space-y-3.5">
              {p.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-slate-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25">
                    <Check size={12} strokeWidth={3.5} />
                  </span>
                  <span className="leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {p.testimonial && (
            <figure className="card p-8">
              <blockquote className="text-lg text-slate-200 leading-relaxed italic">
                &ldquo;{p.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-white">{p.testimonial.name}</span>
                <span className="text-slate-500"> · {p.testimonial.role}</span>
              </figcaption>
            </figure>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="card p-7">
            <h2 className="font-semibold text-white">Project at a glance</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-slate-500 text-xs uppercase tracking-wider">Client</dt>
                <dd className="font-medium text-white mt-1">{p.client}</dd>
              </div>
              <div>
                <dt className="text-slate-500 text-xs uppercase tracking-wider">Region</dt>
                <dd className="font-medium text-white mt-1">{p.region}</dd>
              </div>
              <div>
                <dt className="text-slate-500 text-xs uppercase tracking-wider">Timeline</dt>
                <dd className="font-medium text-white mt-1">{p.duration}</dd>
              </div>
              <div>
                <dt className="text-slate-500 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Tag size={11} /> Services
                </dt>
                <dd className="font-medium text-white mt-1">{p.services.join(', ')}</dd>
              </div>
              <div>
                <dt className="text-slate-500 text-xs uppercase tracking-wider">Stack</dt>
                <dd className="flex flex-wrap gap-1.5 mt-2">
                  {p.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <div className="card p-7 text-center">
            <h2 className="font-semibold text-white">Facing something similar?</h2>
            <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
              Get a fixed-price quote for your version of this problem.
            </p>
            <Link href="/contact" className="btn btn-primary w-full mt-5">
              Get a free quote
            </Link>
          </div>
        </aside>
      </section>

      {/* More work */}
      {others.length > 0 && (
        <section className="section-deep">
          <div className="container-g section">
            <h2 className="text-2xl md:text-3xl font-bold text-center">More case studies</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {others.map((o) => (
                <Link key={o.slug} href={`/portfolio/${o.slug}`} className="card card-hover overflow-hidden group">
                  <div className="relative aspect-[8/5] bg-night-800">
                    <Image
                      src={o.image}
                      alt={o.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <span className="chip">{o.category}</span>
                    <h3 className="font-semibold mt-3 leading-snug group-hover:text-brand-light transition-colors">
                      {o.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2">{o.region}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand title="Let's build your next case study" />
    </>
  );
}
