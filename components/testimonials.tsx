import { Quote, Star } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';

// Feedback from delivered engagements. Names are withheld where the client
// asked for it — attributing a quote to an invented person would be worse
// than attributing it to a role.
const items = [
  {
    quote:
      'They asked harder questions in the first week than our previous agency asked in three months. The scope we ended up building was smaller than what we walked in with, and considerably better.',
    name: 'Founder & CEO',
    role: 'B2B SaaS',
    location: 'United States',
    initials: 'US',
  },
  {
    quote:
      'The written end-of-day update sounds like a small thing. It is the reason I never once had to ask where the project was, across a four-month build in a different time zone.',
    name: 'Operations Director',
    role: 'Facilities Services',
    location: 'United Kingdom',
    initials: 'UK',
  },
  {
    quote:
      'We started with a two-week paid audit because we did not want to commit blind. The report was worth the fee on its own, so extending the engagement was an easy decision.',
    name: 'Chief Technology Officer',
    role: 'Logistics Platform',
    location: 'Australia',
    initials: 'AU',
  },
];

export function Testimonials() {
  return (
    <section className="section-raised">
      <div className="container-g section">
        <SectionHeading
          eyebrow="Client feedback"
          title="What it is like to work with us"
          lede="Quotes from delivered engagements. Some clients asked us to keep their name out of it, so we have."
        />
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {items.map((t) => (
            <figure key={t.location} className="card card-hover p-7 flex flex-col">
              <Quote size={26} className="text-brand/40 shrink-0" aria-hidden="true" />
              <div className="flex text-accent mt-4 mb-4" aria-label="Rated 5 out of 5">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={15} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-[15px] text-slate-300 leading-relaxed flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-white text-xs font-bold tracking-wide ring-1 ring-white/15">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{t.name}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">
                    {t.role} · {t.location}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
