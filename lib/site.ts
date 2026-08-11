// Central site configuration — brand, contact, and navigation.
// Change a value here and it updates everywhere: copy, metadata, and schema.

export const site = {
  name: 'Lunexa Technologies',
  shortName: 'Lunexa',
  legalName: 'Lunexa Technologies',
  tagline: 'Offshore Software Development Company',
  description:
    'Lunexa Technologies builds websites, web apps, mobile apps, and AI-powered products for startups and growing companies in the USA, UK, UAE, Europe, Australia, and India — senior engineering from Pune at a fraction of onshore cost.',
  // Must match the host the site is actually served from (Vercel primary domain).
  url: 'https://www.lunexatechnologies.com',
  domain: 'lunexatechnologies.com',
  email: 'info@lunexatechnologies.com',
  phone: '+91 89832 65077',
  phoneRaw: '+918983265077',
  whatsapp: '918983265077',
  foundingYear: '2026',
  address: {
    street: 'H603, Dreams Rakshak Society, Wagholi',
    locality: 'Pune',
    region: 'Maharashtra',
    postalCode: '412207',
    country: 'India',
    countryCode: 'IN',
    full: 'H603, Dreams Rakshak Society, Wagholi, Pune, Maharashtra 412207, India',
    // Approximate coordinates for Wagholi, Pune — used by LocalBusiness schema.
    lat: 18.5793,
    lng: 73.9819,
  },
  // Primary markets we sell into — used in copy, metadata, and schema.
  markets: [
    { code: 'US', name: 'United States', flag: '🇺🇸', tz: 'ET / CT / PT', overlap: '~4 hrs shared (ET)' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', tz: 'GMT / BST', overlap: '~8 hrs shared' },
    { code: 'AE', name: 'UAE & Middle East', flag: '🇦🇪', tz: 'GST', overlap: 'Near-full working day' },
    { code: 'EU', name: 'Europe', flag: '🇪🇺', tz: 'CET / EET', overlap: '~8 hrs shared' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', tz: 'AEST', overlap: '~5 hrs shared' },
    { code: 'IN', name: 'India', flag: '🇮🇳', tz: 'IST', overlap: 'Full working day' },
  ],
  social: {
    // Feeds the Organization schema's sameAs array, which is how search engines
    // tie these profiles to the site as one entity. Only add URLs that resolve —
    // an empty string is filtered out; a dead link is worse than no link.
    linkedin: '',
    github: '',
    twitter: '',
    instagram: '',
  },
} as const;

export const nav = [
  { href: '/services', label: 'Services' },
  { href: '/hire-developers', label: 'Hire Developers' },
  { href: '/portfolio', label: 'Work' },
  { href: '/industries', label: 'Industries' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
] as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
