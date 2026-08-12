import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Github } from 'lucide-react';
import { site, showPhonePublicly, whatsappLink } from '@/lib/site';

const serviceLinks = [
  { href: '/services/website-development', label: 'Website Development' },
  { href: '/services/web-app-development', label: 'Web App & SaaS' },
  { href: '/services/mobile-app-development', label: 'Mobile App Development' },
  { href: '/services/ai-solutions', label: 'AI Product Engineering' },
  { href: '/services/cloud-devops', label: 'Cloud & DevOps' },
  { href: '/services/ui-ux-design', label: 'UI/UX Design' },
];

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/hire-developers', label: 'Hire Developers' },
  { href: '/portfolio', label: 'Case Studies' },
  { href: '/industries', label: 'Industries' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { href: site.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: site.social.github, label: 'GitHub', Icon: Github },
  ].filter((s) => s.href);

  return (
    <footer className="bg-night-900 border-t border-white/[0.08] text-slate-400">
      <div className="container-g py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="relative block h-10 w-10">
              <Image src="/logo.svg" alt="" fill className="object-contain" />
            </span>
            <span className="leading-none">
              <span className="block font-display font-bold text-white">{site.shortName}</span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-brand-faint/70 mt-1">
                Technologies
              </span>
            </span>
          </div>
          <p className="text-sm mt-5 max-w-sm leading-relaxed">
            Your offshore product engineering team in Pune, India — building websites, web apps,
            mobile apps, AI features, and cloud infrastructure for companies across the US, UK, UAE,
            Europe, Australia, and India.
          </p>
          <a
            href={whatsappLink(`Hi ${site.name}, I'd like a quote for a project.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            <MessageCircle size={16} /> Chat with us on WhatsApp
          </a>
          {socials.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] ring-1 ring-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
            Services
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link className="hover:text-white transition-colors" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
            Company
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link className="hover:text-white transition-colors" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
            Get in touch
          </h2>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-light" />
              <span className="leading-relaxed">{site.address.full}</span>
            </li>
            {showPhonePublicly && (
              <li className="flex gap-3 items-center">
                <Phone size={16} className="shrink-0 text-brand-light" />
                <a className="hover:text-white transition-colors" href={`tel:${site.phoneRaw}`}>
                  {site.phone}
                </a>
              </li>
            )}
            <li className="flex gap-3 items-center">
              <Mail size={16} className="shrink-0 text-brand-light" />
              <a className="hover:text-white transition-colors break-all" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
          </ul>
          <Link href="/contact" className="btn btn-primary mt-6 w-full">
            Start a project
          </Link>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="container-g flex flex-col md:flex-row items-center justify-between gap-3 py-6 text-xs">
          <p>
            © {year} {site.name}. Software development company · Pune, India.
          </p>
          <nav className="flex items-center gap-5" aria-label="Legal">
            <Link className="hover:text-white transition-colors" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-white transition-colors" href="/terms">
              Terms of Service
            </Link>
            <Link className="hover:text-white transition-colors" href="/contact">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
