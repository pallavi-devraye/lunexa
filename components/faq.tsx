'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { SectionHeading } from '@/components/section-heading';

export type FaqItem = { question: string; answer: string };

/**
 * Accordion FAQ. The answer stays mounted and is collapsed with CSS grid
 * rather than being removed, so it animates smoothly and remains findable by
 * the browser's in-page search.
 */
export function FaqAccordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number[]>(defaultOpen >= 0 ? [defaultOpen] : []);
  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {items.map((faq, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={faq.question} className={clsx('card overflow-hidden', isOpen && 'bg-night-600/50')}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
            >
              <h3 className="text-base md:text-[1.05rem] font-medium text-white">{faq.question}</h3>
              <Plus
                size={20}
                className={clsx(
                  'shrink-0 mt-0.5 text-brand-light transition-transform duration-300',
                  isOpen && 'rotate-45'
                )}
              />
            </button>
            <div
              className={clsx(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-7 text-slate-300">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FaqSection({
  items,
  eyebrow = 'FAQ',
  title = 'Questions we get asked',
  lede = 'Everything worth knowing before you start a project with us.',
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  lede?: string;
}) {
  return (
    <section className="section-deep">
      <div className="container-g section">
        <SectionHeading eyebrow={eyebrow} title={title} lede={lede} />
        <div className="mt-12">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
