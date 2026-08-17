import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Clock, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { FaqAccordion } from '@/components/faq';
import {
  ArticleStructuredData,
  BreadcrumbStructuredData,
  FaqStructuredData,
} from '@/components/structured-data';
import { getAllPostsMeta, getPost, pickPostImage } from '@/lib/blog';
import { site, showWhatsApp, whatsappLink } from '@/lib/site';

export const dynamic = 'force-static';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllPostsMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: 'article',
      publishedTime: post.date,
      url: `${site.url}/blog/${post.slug}`,
      images: [pickPostImage(post.tags)],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || undefined,
    },
  };
}

function fmt(date: string) {
  try {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return date;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);
  const related = getAllPostsMeta()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const postUrl = `${site.url}/blog/${post.slug}`;
  const image = pickPostImage(post.tags);

  return (
    <>
      <ArticleStructuredData
        title={post.title}
        description={post.excerpt}
        url={postUrl}
        image={`${site.url}${image}`}
        publishedTime={post.date}
        tags={post.tags}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: site.url },
          { name: 'Blog', url: `${site.url}/blog` },
          { name: post.title, url: postUrl },
        ]}
      />
      {post.faqs.length > 0 && <FaqStructuredData items={post.faqs} />}

      {/* Article header */}
      <section className="relative aurora border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-40" aria-hidden="true" />
        <div className="relative container-g py-12 md:py-16">
          <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-light transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-brand-light transition-colors">
              Blog
            </Link>
          </nav>
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {(post.tags || []).map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-[2.7rem] font-bold leading-[1.15] mt-5 tracking-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg text-slate-400 mt-5 leading-relaxed">{post.excerpt}</p>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2.5">
                <span className="relative block h-8 w-8">
                  <Image src="/logo.svg" alt="" fill className="object-contain" />
                </span>
                <span className="text-slate-300 font-medium">{site.name}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} /> {fmt(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} /> {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body + sidebar */}
      <section className="container-g py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Table of contents */}
          <aside className="lg:col-span-3 order-1 lg:order-none">
            <div className="lg:sticky lg:top-28 space-y-4">
              {post.headings.length > 1 && (
                <nav className="card p-6" aria-label="Table of contents">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    On this page
                  </h2>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {post.headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="text-slate-400 hover:text-brand-light leading-snug block transition-colors"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <div className="card p-6">
                <h2 className="font-semibold text-sm text-white">Working on something similar?</h2>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Get a fixed-price quote for your project, usually within one business day.
                </p>
                <Link href="/contact" className="btn btn-primary w-full mt-4 text-sm py-2.5">
                  Get a free quote
                </Link>
              </div>
            </div>
          </aside>

          {/* Article */}
          <article className="lg:col-span-9">
            <div className="relative aspect-[16/8] rounded-3xl overflow-hidden bg-night-800 ring-1 ring-white/10">
              <Image
                src={image}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="prose max-w-none mt-10" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

            {/* FAQs — also emitted as FAQPage structured data above */}
            {post.faqs.length > 0 && (
              <div className="mt-14">
                <h2 className="text-2xl font-bold">Frequently asked questions</h2>
                <div className="mt-6">
                  <FaqAccordion items={post.faqs} defaultOpen={-1} />
                </div>
              </div>
            )}

            {/* Author box */}
            <div className="card p-7 mt-14 flex flex-col sm:flex-row gap-5 items-start">
              <span className="relative block h-14 w-14 shrink-0">
                <Image src="/logo.svg" alt="" fill className="object-contain" />
              </span>
              <div>
                <h2 className="font-semibold text-white">Written by the {site.name} team</h2>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  We are a product engineering company in Pune, India, building websites, web apps,
                  mobile apps, AI features, and cloud infrastructure for companies across the US, UK,
                  UAE, Europe, Australia, and India.
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Link href="/about" className="text-sm font-medium text-brand-light hover:underline">
                    About us
                  </Link>
                  <Link href="/portfolio" className="text-sm font-medium text-brand-light hover:underline">
                    Case studies
                  </Link>
                  <Link href="/services" className="text-sm font-medium text-brand-light hover:underline">
                    Services
                  </Link>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="cta-band rounded-3xl mt-6 p-9 text-center">
              <h2 className="text-2xl font-bold text-white">Have a project in mind?</h2>
              <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                Tell us what you need and we will send a clear, fixed-price quote — usually within
                one business day.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="btn btn-primary">
                  Get a free quote
                </Link>
                {showWhatsApp ? (
                  <a
                    href={whatsappLink(`Hi ${site.name}, I read your article "${post.title}" and have a question.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    Chat on WhatsApp
                  </a>
                ) : (
                  <a href={`mailto:${site.email}`} className="btn btn-outline">
                    Email us
                  </a>
                )}
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-light hover:underline"
              >
                <ArrowLeft size={16} /> All articles
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-deep">
          <div className="container-g section">
            <h2 className="text-2xl md:text-3xl font-bold">Keep reading</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="card card-hover overflow-hidden flex flex-col group"
                >
                  <div className="relative aspect-[16/9] bg-night-800">
                    <Image
                      src={pickPostImage(p.tags)}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs text-slate-500">
                      {fmt(p.date)} · {p.readingTime} min
                    </div>
                    <h3 className="font-semibold mt-2.5 leading-snug group-hover:text-brand-light transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-3 flex-1 leading-relaxed line-clamp-3">
                      {p.excerpt}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-brand-light inline-flex items-center gap-1.5">
                      Read article <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
