import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const postsDir = path.join(process.cwd(), 'content', 'blog');

export type Heading = { id: string; text: string };
export type Faq = { question: string; answer: string };
export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  readingTime?: number;
};
export type Post = PostMeta & { contentHtml: string; headings: Heading[]; faqs: Faq[] };

// Turn a heading into a URL-safe anchor id.
function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Map post tags to a local, descriptively named image. Order matters: the more
// specific topics are matched before the broad ones.
export function pickPostImage(tags?: string[]): string {
  const t = (tags || []).map((s) => s.toLowerCase());
  const has = (...names: string[]) => names.some((n) => t.includes(n));

  if (has('ai', 'llm', 'automation')) return '/images/ai-development-llm-integration.svg';
  if (has('cloud', 'devops', 'aws', 'infrastructure')) return '/images/cloud-devops-aws-infrastructure.svg';
  if (has('offshore', 'outsourcing', 'hiring', 'usa', 'uk', 'uae', 'europe', 'australia'))
    return '/images/offshore-development-team-india.svg';
  if (has('mobile app', 'mobile', 'flutter', 'kotlin', 'android', 'ios')) return '/images/mobile-app-development-android-ios.svg';
  if (has('e-commerce', 'ecommerce', 'retail')) return '/images/ecommerce-development.svg';
  if (has('web app', 'saas', 'startup', 'mvp')) return '/images/web-app-saas-development.svg';
  if (has('design', 'ux', 'ui')) return '/images/ui-ux-design-services.svg';
  if (has('seo', 'performance', 'marketing')) return '/images/seo-performance-growth.svg';
  return '/images/website-development-company.svg';
}

export function getAllPostsMeta(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const file = fs.readFileSync(path.join(postsDir, filename), 'utf8');
    const { data, content } = matter(file);
    const excerpt = (data.excerpt as string) || content.slice(0, 180).replace(/\n/g, ' ') + '…';
    const words = content.trim().split(/\s+/).length;
    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt,
      tags: (data.tags || []) as string[],
      readingTime: Math.max(1, Math.round(words / 220)),
    };
  });
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPost(slug: string): Promise<Post> {
  const full = fs.readFileSync(path.join(postsDir, slug + '.md'), 'utf8');
  const { data, content } = matter(full);
  const processed = await remark().use(gfm).use(html).process(content);
  let contentHtml = processed.toString();

  // Collect H2s for the table of contents and give them anchor ids.
  const headings: Heading[] = [];
  contentHtml = contentHtml.replace(/<h2>(.*?)<\/h2>/g, (_m, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const id = slugifyHeading(text);
    headings.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  // Let wide tables scroll horizontally on small screens.
  contentHtml = contentHtml
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>');

  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: (data.excerpt as string) || '',
    tags: (data.tags || []) as string[],
    contentHtml,
    headings,
    faqs: ((data.faqs || []) as Faq[]).filter((f) => f && f.question && f.answer),
    readingTime: Math.max(1, Math.round(words / 220)),
  };
}
