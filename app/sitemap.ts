import { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { services } from '@/lib/services';
import { projects } from '@/lib/portfolio';
import { getAllPostsMeta } from '@/lib/blog';

// site.url is the single source of truth for the public origin. Reading it
// from an env var here has a habit of going stale and emitting the wrong host.
const baseUrl = site.url;

type Entry = { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' };

const staticPages: Entry[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/hire-developers', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/industries', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...services.map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...projects.map((p) => ({
      url: `${baseUrl}/portfolio/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...getAllPostsMeta().map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
