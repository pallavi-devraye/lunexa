import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/portfolio';

export function CaseStudies({ limit = 3 }: { limit?: number }) {
  const items = projects.slice(0, limit);

  return (
    <section className="container-g section">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div className="max-w-2xl">
          <span className="eyebrow">Selected work</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
            Problems we were handed, and what we shipped
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed">
            Each case study covers the constraint we were actually working against, the decisions
            that followed, and what changed once it went live.
          </p>
        </div>
        <Link href="/portfolio" className="btn btn-outline shrink-0">
          All case studies
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-14">
        {items.map((c) => (
          <Link
            key={c.slug}
            href={`/portfolio/${c.slug}`}
            className="card card-hover overflow-hidden group flex flex-col"
          >
            <div className="relative aspect-[8/5] shrink-0 bg-night-800">
              <Image
                src={c.image}
                alt={`${c.title} — ${c.category} case study`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute top-3 left-3 chip bg-night/80 backdrop-blur">{c.category}</span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <p className="text-xs text-slate-500">{c.region}</p>
              <h3 className="font-semibold text-lg mt-2 leading-snug group-hover:text-brand-light transition-colors">
                {c.title}
              </h3>
              <p className="text-sm text-slate-400 mt-3 flex-1 leading-relaxed">{c.summary}</p>
              <p className="text-sm font-semibold text-accent mt-4">{c.result}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light">
                Read the case study
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
