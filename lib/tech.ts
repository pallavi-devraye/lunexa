// Single source of truth for the technologies we work with.
// Used by the homepage, About page, and service pages so the list never drifts.

export type TechCategory = {
  icon: string;
  title: string;
  desc: string;
  items: string[];
};

export const techCategories: TechCategory[] = [
  {
    icon: 'Globe',
    title: 'Frontend',
    desc: 'Fast, accessible interfaces that hold up on real devices and slow networks.',
    items: ['React', 'Next.js', 'TypeScript', 'Angular', 'Vue.js', 'Tailwind CSS', 'HTML5 & CSS3'],
  },
  {
    icon: 'Code2',
    title: 'Backend',
    desc: 'Secure, well-documented services and APIs that other teams can build on.',
    items: ['Node.js', 'NestJS', 'Java', 'Spring Boot', 'Python', 'Django', 'FastAPI', 'REST & GraphQL'],
  },
  {
    icon: 'Smartphone',
    title: 'Mobile',
    desc: 'Native and cross-platform apps for Android and iOS.',
    items: ['Kotlin', 'Jetpack Compose', 'Kotlin Multiplatform', 'Flutter', 'Swift', 'SwiftUI', 'React Native'],
  },
  {
    icon: 'Sparkles',
    title: 'AI & Machine Learning',
    desc: 'Practical AI engineered into real products, with evaluation and guardrails.',
    items: ['Claude API', 'OpenAI API', 'LangChain', 'RAG & vector search', 'pgvector', 'AWS Bedrock', 'Python'],
  },
  {
    icon: 'Database',
    title: 'Data',
    desc: 'Storage modelled around your business, not around a default template.',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase', 'Elasticsearch', 'BigQuery'],
  },
  {
    icon: 'Cloud',
    title: 'Cloud & DevOps',
    desc: 'Infrastructure, pipelines, and monitoring that make shipping routine.',
    items: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions', 'Vercel', 'Cloudflare', 'Grafana'],
  },
  {
    icon: 'ShoppingCart',
    title: 'Commerce & CMS',
    desc: 'Content and storefronts your own team can run day to day.',
    items: ['Headless CMS', 'WordPress', 'Shopify', 'Stripe', 'Razorpay', 'Medusa'],
  },
  {
    icon: 'PenTool',
    title: 'Design',
    desc: 'Product design and systems that keep the interface coherent as it grows.',
    items: ['Figma', 'Design tokens', 'Storybook', 'WCAG 2.2', 'Framer Motion'],
  },
];

// Flat list, handy for compact badge rows.
export const allTech = techCategories.flatMap((c) => c.items);

// Short list for the homepage trust strip.
export const featuredTech = [
  'Next.js',
  'React',
  'Node.js',
  'Java',
  'Python',
  'Claude',
  'Kotlin',
  'Flutter',
  'AWS',
  'PostgreSQL',
];
