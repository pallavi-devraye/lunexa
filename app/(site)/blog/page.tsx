import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react';
import { CtaBand } from '@/components/cta-band';
import { BreadcrumbStructuredData } from '@/components/structured-data';
import { getAllPostsMeta, pickPostImage } from '@/lib/blog';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: { absolute: 'Blog — Software Engineering & Offshore Delivery | Lunexa' },
  description:
    'Practical, jargon-free articles on software development costs, offshore delivery, AI product engineering, cloud architecture, and technology choices — written for founders and business owners.',
  alternates: { canonical: '/blog' },
};

function fmt(date: string) {
  try {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return date;
  }
}

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();
  const [featured, ...rest] = posts;

  const tagCounts = posts.reduce<Record<string, number>>((acc, p) => {
    (p.tags || []).forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([t]) => t);

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: site.url },
          { name: 'Blog', url: `${site.url}/blog` },
        ]}
      />

      <section className="relative aurora border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-50" aria-hidden="true" />
        <div className="relative container-g py-20 md:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">Blog</span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.3rem] leading-[1.1] mt-6 tracking-tight">
              Notes from{' '}
              <span className="gradient-text">building software for other people</span>
            </h1>
            <p className="text-lg text-slate-400 mt-6 leading-relaxed">
              Costs, trade-offs, and the decisions that actually matter — written for the person
              signing the invoice, not for other engineers.
            </p>
            {topTags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {topTags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container-g section">
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="card card-hover overflow-hidden grid lg:grid-cols-2 group"
          >
            <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[22rem] bg-night-800">
              <Image
                src={pickPostImage(featured.tags)}
                alt={featured.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2">
                <span className="badge">Latest</span>
                {(featured.tags || []).slice(0, 2).map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mt-5 leading-snug group-hover:text-brand-light transition-colors">
                {featured.title}
              </h2>
              <p className="text-slate-400 mt-4 leading-relaxed">{featured.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={13} /> {fmt(featured.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} /> {featured.readingTime} min read
                </span>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light">
                Read the article
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card card-hover overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-[16/9] shrink-0 bg-night-800">
                <Image
                  src={pickPostImage(p.tags)}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-1.5">
                  {(p.tags || []).slice(0, 2).map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-semibold text-lg mt-3.5 leading-snug group-hover:text-brand-light transition-colors">
                  {p.title}
                </h2>
                <p className="text-sm text-slate-400 mt-3 flex-1 leading-relaxed">{p.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={12} /> {fmt(p.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} /> {p.readingTime} min
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Have a question the blog didn't answer?"
        lede="Ask us directly. We answer technical questions from prospective clients whether or not it turns into a project."
        primaryLabel="Ask us anything"
      />
    </>
  );
}
