import clsx from 'clsx';

/**
 * The standard section header used across the site. Centralised so the
 * eyebrow → heading → lede rhythm stays identical on every page.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">{title}</h2>
      {lede && <p className="text-slate-400 mt-4 leading-relaxed">{lede}</p>}
    </div>
  );
}
