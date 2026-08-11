import { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// Generated rather than a static file so the sitemap URL can never drift out
// of sync with site.url.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
