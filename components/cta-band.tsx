import Link from 'next/link';
import { Mail, Phone, MessageCircle, Check } from 'lucide-react';
import { site, whatsappLink } from '@/lib/site';

const reassurances = ['Reply within 1 business day', 'NDA on request', 'You own the IP', 'No sales sequence'];

/**
 * Closing call to action, reused at the foot of most pages.
 *
 * It carries the direct contact routes as well as the buttons: someone who
 * has read a whole page and is ready to talk should not have to navigate to
 * another one to find an email address.
 */
export function CtaBand({
  title = 'Ready to build something worth shipping?',
  lede = 'Tell us what you have in mind and we will send a clear, fixed-price quote — usually within one business day.',
  primaryLabel = 'Get a free quote',
  secondary = 'whatsapp',
}: {
  title?: string;
  lede?: string;
  primaryLabel?: string;
  secondary?: 'whatsapp' | 'call' | 'work' | 'none';
}) {
  const contacts = [
    {
      key: 'email',
      Icon: Mail,
      label: 'Email us',
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
    },
    {
      key: 'phone',
      Icon: Phone,
      label: 'Call us',
      value: site.phone,
      href: `tel:${site.phoneRaw}`,
      external: false,
    },
    {
      key: 'whatsapp',
      Icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Message us now',
      href: whatsappLink(`Hi ${site.name}, I'd like a quote for a project.`),
      external: true,
    },
  ];

  return (
    <section className="cta-band">
      {/* Decorative. -z-10 keeps it behind the content inside the band's own
          stacking context; without it the blur would wash over the heading. */}
      <div
        className="pointer-events-none absolute -top-32 -left-24 -z-10 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-16 -z-10 h-80 w-80 rounded-full bg-accent/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-g py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-3xl mx-auto leading-[1.12]">
            {title}
          </h2>
          <p className="text-lg text-slate-400 mt-5 max-w-2xl mx-auto leading-relaxed">{lede}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-lg btn-primary">
              {primaryLabel}
            </Link>
            {secondary === 'whatsapp' && (
              <a
                href={whatsappLink(`Hi ${site.name}, I'd like a quote for a project.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-outline"
              >
                Chat on WhatsApp
              </a>
            )}
            {secondary === 'call' && (
              <a href={`tel:${site.phoneRaw}`} className="btn btn-lg btn-outline">
                Call {site.phone}
              </a>
            )}
            {secondary === 'work' && (
              <Link href="/portfolio" className="btn btn-lg btn-outline">
                See our work
              </Link>
            )}
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-sm text-slate-400">
            {reassurances.map((r) => (
              <li key={r} className="inline-flex items-center gap-2">
                <Check size={13} className="text-emerald-400 shrink-0" strokeWidth={3.5} />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Direct routes, for the reader who is ready to talk right now */}
        <div className="rule mt-14" />
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {contacts.map(({ key, Icon, label, value, href, external }) => (
            <a
              key={key}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center gap-4 rounded-2xl bg-white/[0.03] ring-1 ring-inset ring-white/10 px-5 py-4 transition-colors hover:bg-white/[0.07] hover:ring-white/20"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-light ring-1 ring-brand/25 transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon size={17} />
              </span>
              <span className="min-w-0 text-left">
                <span className="block text-xs text-slate-500">{label}</span>
                <span className="block text-sm font-medium text-white truncate">{value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
