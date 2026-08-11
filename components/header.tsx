'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle, Phone } from 'lucide-react';
import clsx from 'clsx';
import { nav, site, whatsappLink } from '@/lib/site';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The header floats clear of the page at the top and tightens into a solid
  // bar once you scroll, so it never competes with the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet on navigation — without this it stays open behind
  // the new page after a client-side route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'));

  return (
    <header className="sticky top-0 z-50">
      <div
        className={clsx(
          'transition-all duration-300',
          scrolled
            ? 'bg-night/85 backdrop-blur-xl border-b border-white/[0.08]'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="container-g flex items-center justify-between gap-4 py-3.5">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={`${site.name} home`}>
            <span className="relative block h-9 w-9">
              <Image src="/logo.svg" alt="" fill className="object-contain" priority />
            </span>
            <span className="leading-none">
              <span className="block font-display font-bold text-[15px] tracking-tight text-white">
                {site.shortName}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-brand-faint/70 mt-0.5">
                Technologies
              </span>
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-1" aria-label="Primary">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive(l.href)
                    ? 'text-white bg-white/[0.07]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${site.phoneRaw}`}
              className="btn btn-outline"
              aria-label={`Call ${site.phone}`}
            >
              <Phone className="mr-2" size={15} /> {site.phone}
            </a>
            <Link href="/contact" className="btn btn-primary">
              Get a Free Quote
            </Link>
          </div>

          <button
            type="button"
            className="xl:hidden inline-flex items-center justify-center rounded-full p-2.5 text-slate-200 ring-1 ring-white/10 bg-white/[0.05] hover:bg-white/10"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-b border-white/[0.08] bg-night/97 backdrop-blur-xl">
          <nav className="container-g py-4 flex flex-col gap-1" aria-label="Mobile">
            <Link
              href="/"
              className={clsx(
                'rounded-xl px-4 py-2.5 text-sm font-medium',
                pathname === '/' ? 'text-white bg-brand/12' : 'text-slate-300 hover:bg-white/5'
              )}
            >
              Home
            </Link>
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  'rounded-xl px-4 py-2.5 text-sm font-medium',
                  isActive(l.href) ? 'text-white bg-brand/12' : 'text-slate-300 hover:bg-white/5'
                )}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={whatsappLink(`Hi ${site.name}, I'd like a quote for a project.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <MessageCircle className="mr-2" size={16} /> WhatsApp
              </a>
              <Link href="/contact" className="btn btn-primary">
                Free Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
