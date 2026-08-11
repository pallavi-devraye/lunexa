import { site } from '@/lib/site';
import { allTech } from '@/lib/tech';

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

/** Organization / LocalBusiness data, emitted site-wide from the root layout. */
export function OrganizationStructuredData() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#organization`,
        name: site.name,
        alternateName: site.shortName,
        url: site.url,
        logo: `${site.url}/logo.svg`,
        image: `${site.url}/logo.svg`,
        description: site.description,
        foundingDate: site.foundingYear,
        email: site.email,
        telephone: site.phoneRaw,
        priceRange: '$$',
        areaServed: [
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'United Arab Emirates' },
          { '@type': 'Country', name: 'Australia' },
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'Singapore' },
          { '@type': 'Country', name: 'India' },
          { '@type': 'Place', name: 'Europe' },
        ],
        knowsAbout: [
          'Offshore Software Development',
          'Website Development',
          'Web Application Development',
          'SaaS Development',
          'Mobile App Development',
          'AI Integration',
          'Large Language Models',
          'Retrieval Augmented Generation',
          'Cloud Architecture',
          'DevOps',
          'UI/UX Design',
          ...allTech,
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: site.phoneRaw,
          email: site.email,
          contactType: 'sales',
          areaServed: ['US', 'GB', 'AE', 'AU', 'CA', 'SG', 'IN'],
          availableLanguage: ['English', 'Hindi', 'Marathi'],
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.countryCode,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: site.address.lat,
          longitude: site.address.lng,
        },
        sameAs: Object.values(site.social).filter(Boolean),
      }}
    />
  );
}

export function WebsiteStructuredData() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        name: site.name,
        url: site.url,
        description: site.description,
        publisher: { '@id': `${site.url}/#organization` },
      }}
    />
  );
}

export function ServiceStructuredData({
  name,
  description,
  serviceType,
  url,
}: {
  name: string;
  description: string;
  serviceType: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        serviceType,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: [
          { '@type': 'Country', name: 'India' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
        url,
      }}
    />
  );
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function FaqStructuredData({ items }: { items: Array<{ question: string; answer: string }> }) {
  if (!items.length) return null;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }}
    />
  );
}

export function ArticleStructuredData({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  tags,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  tags?: string[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        image: image || `${site.url}/logo.svg`,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        author: { '@type': 'Organization', name: site.name, url: site.url },
        publisher: { '@id': `${site.url}/#organization` },
        ...(tags && tags.length > 0 ? { keywords: tags.join(', ') } : {}),
      }}
    />
  );
}

/** Case-study pages describe a delivered engagement rather than a listed offer. */
export function CaseStudyStructuredData({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url,
        image: image || `${site.url}/logo.svg`,
        author: { '@type': 'Organization', name: site.name, url: site.url },
        publisher: { '@id': `${site.url}/#organization` },
      }}
    />
  );
}
