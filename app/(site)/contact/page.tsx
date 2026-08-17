'use client';

import { useState, useRef } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Loader2, Check } from 'lucide-react';
import { site, showPhonePublicly, showWhatsApp, whatsappLink } from '@/lib/site';

const serviceOptions = [
  'Website Development',
  'Web App / SaaS Development',
  'Mobile App Development (Android / iOS)',
  'AI Product Engineering',
  'Cloud & DevOps',
  'UI/UX Design',
  'E-commerce',
  'Hire a dedicated team',
  'Not sure yet — need advice',
];

// Currency-neutral bands with USD guides, so the same form works for an
// overseas enquiry and an Indian one without asking for a currency first.
const budgetOptions = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000 – $150,000',
  '$150,000+',
  'Monthly retainer / dedicated team',
  'Not sure yet',
];

const timelineOptions = [
  'As soon as possible',
  'Within 1 month',
  '1–3 months',
  '3+ months',
  'Just exploring',
];

const nextSteps = [
  'We read the requirements and come back with anything unclear.',
  'You get a fixed-price, itemised quote — usually within one business day.',
  'If it works for you, we sign an NDA and agree the first milestone.',
];

export default function ContactPage() {
  const [status, setStatus] = useState<{ kind: 'success' | 'error'; text: string } | undefined>();
  const [loading, setLoading] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  // When the form first rendered. Submitting implausibly fast is a bot signal.
  const mountedAt = useRef(Date.now());

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Service, budget, and timeline are sent separately so the API can run its
    // spam checks against the raw text the person actually typed.
    const body = {
      name: raw.name,
      email: raw.email,
      company: raw.company,
      phone: raw.phone,
      country: raw.country,
      message: raw.message,
      service: raw.service,
      budget: raw.budget,
      timeline: raw.timeline,
      website: raw.website, // honeypot — always empty for a real person
      elapsedMs: Date.now() - mountedAt.current,
    };

    try {
      setLoading(true);
      setStatus(undefined);
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j?.ok) {
        form.reset();
        setStatus({
          kind: 'success',
          text: "Thanks — your enquiry is with us. We'll come back with a quote, usually within one business day.",
        });
      } else {
        setStatus({ kind: 'error', text: j?.error || 'Something went wrong. Please try again.' });
      }
    } catch (err: any) {
      setStatus({ kind: 'error', text: err?.message || 'Network error. Please try again.' });
    } finally {
      setLoading(false);
      setTimeout(() => alertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
    }
  }

  return (
    <>
      <section className="relative aurora border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-50" aria-hidden="true" />
        <div className="relative container-g py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Contact us</span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.3rem] leading-[1.1] mt-6 tracking-tight">
              Tell us what you&apos;re building
            </h1>
            <p className="text-lg text-slate-400 mt-6 leading-relaxed">
              Share as much or as little as you have. We reply with real questions and a fixed-price
              quote — not a calendar link and a sales sequence.
            </p>
          </div>
        </div>
      </section>

      <section className="container-g py-16 grid lg:grid-cols-5 gap-8 items-start">
        {/* Form */}
        <form onSubmit={submit} className="card p-7 md:p-9 space-y-5 lg:col-span-3 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="field">
              <label className="field-label" htmlFor="name">
                Name <span className="text-red-400">*</span>
              </label>
              <input id="name" name="name" required autoComplete="name" className="input" placeholder="Your name" />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="email">
                Work email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="field">
              <label className="field-label" htmlFor="company">
                Company <span className="text-slate-500">(optional)</span>
              </label>
              <input id="company" name="company" autoComplete="organization" className="input" placeholder="Company name" />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="country">
                Country <span className="text-slate-500">(optional)</span>
              </label>
              <input id="country" name="country" autoComplete="country-name" className="input" placeholder="e.g. United Kingdom" />
            </div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="phone">
              Phone / WhatsApp <span className="text-slate-500">(optional)</span>
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" className="input" placeholder="+44 …" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="field">
              <label className="field-label" htmlFor="service">
                What you need
              </label>
              <select id="service" name="service" defaultValue="" className="input">
                <option value="">Select a service</option>
                {serviceOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="budget">
                Budget range
              </label>
              <select id="budget" name="budget" defaultValue="" className="input">
                <option value="">Select a range</option>
                {budgetOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="timeline">
                Timeline
              </label>
              <select id="timeline" name="timeline" defaultValue="" className="input">
                <option value="">Select a timeline</option>
                {timelineOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="message">
              About the project <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="textarea"
              placeholder="What are you trying to build, and what problem does it solve? Any deadlines, existing systems, or examples you like are useful too."
            />
          </div>

          {/* Honeypot. Positioned off-screen rather than display:none, which
              naive bots increasingly skip, and hidden from assistive tech with
              aria-hidden plus tabIndex so keyboard and screen-reader users
              never reach it. Absolutely positioned, so it is out of flow and
              the form's spacing is unaffected. */}
          <div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={18} /> Sending…
              </>
            ) : (
              'Request my free quote'
            )}
          </button>

          <p className="text-xs text-slate-500 leading-relaxed">
            We only use your details to respond to this enquiry. No newsletter, no sales sequence,
            no sharing with anyone else. See our{' '}
            <a href="/privacy" className="text-brand-light hover:underline">
              privacy policy
            </a>
            .
          </p>

          {status && (
            <div
              ref={alertRef}
              className={status.kind === 'success' ? 'alert-success' : 'alert-error'}
              role="status"
              aria-live="polite"
            >
              {status.text}
            </div>
          )}
        </form>

        {/* Contact details */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-7 space-y-5">
            <h2 className="font-semibold text-lg text-white">Talk to us directly</h2>
            {showWhatsApp && (
              <a
                href={whatsappLink(`Hi ${site.name}, I'd like a quote for a project.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 text-slate-300 hover:text-brand-light transition-colors"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25">
                  <MessageCircle size={18} />
                </span>
                <span>
                  <span className="block text-xs text-slate-500">WhatsApp</span>
                  Chat with us now
                </span>
              </a>
            )}
            {showPhonePublicly && (
              <a
                href={`tel:${site.phoneRaw}`}
                className="flex items-center gap-3.5 text-slate-300 hover:text-brand-light transition-colors"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand-light ring-1 ring-brand/20">
                  <Phone size={18} />
                </span>
                <span>
                  <span className="block text-xs text-slate-500">Phone</span>
                  {site.phone}
                </span>
              </a>
            )}
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3.5 text-slate-300 hover:text-brand-light transition-colors"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand-light ring-1 ring-brand/20">
                <Mail size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-slate-500">Email</span>
                <span className="break-all">{site.email}</span>
              </span>
            </a>
            <div className="flex items-start gap-3.5 text-slate-300">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand-light ring-1 ring-brand/20">
                <MapPin size={18} />
              </span>
              <span>
                <span className="block text-xs text-slate-500">Office</span>
                <span className="leading-relaxed">{site.address.full}</span>
              </span>
            </div>
            <div className="flex items-start gap-3.5 text-slate-300">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand-light ring-1 ring-brand/20">
                <Clock size={18} />
              </span>
              <span>
                <span className="block text-xs text-slate-500">Hours</span>
                Mon–Sat, 10:00–19:00 IST
                <span className="block text-xs text-slate-500 mt-1">
                  We schedule calls inside your working day
                </span>
              </span>
            </div>
          </div>

          <div className="card p-7">
            <h2 className="font-semibold text-lg text-white">What happens next</h2>
            <ol className="mt-5 space-y-4">
              {nextSteps.map((s, i) => (
                <li key={s} className="flex gap-3.5 text-sm text-slate-300 leading-relaxed">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-light text-xs font-bold ring-1 ring-brand/25">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
              {['No obligation', 'NDA on request', 'You own the IP', 'Milestone payments'].map((x) => (
                <span key={x} className="flex items-center gap-2 text-slate-400">
                  <Check size={12} className="text-emerald-400 shrink-0" strokeWidth={3.5} /> {x}
                </span>
              ))}
            </div>
          </div>

          {/* Map — themed to match the site */}
          <div className="card overflow-hidden">
            <iframe
              className="w-full h-60 map-dark"
              loading="lazy"
              title={`${site.name} office location on Google Maps`}
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Dreams%20Rakshak%20Society%20Wagholi%20Pune&output=embed"
            />
            <div className="px-5 py-3.5 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
              <MapPin size={12} className="text-brand-light shrink-0" />
              {site.address.locality}, {site.address.region} · working with clients worldwide
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
