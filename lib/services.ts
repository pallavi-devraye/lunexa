// Shared service definitions used across the homepage, /services index,
// per-service detail pages, and structured data.

export type Service = {
  slug: string;
  icon: string; // lucide-react icon name, resolved through components/icon.tsx
  title: string;
  short: string; // one-liner used on cards
  metaTitle: string;
  metaDescription: string;
  hero: string; // longer intro on the detail page
  image: string;
  imageAlt: string;
  features: { title: string; desc: string }[];
  tech: string[];
  deliverables: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: 'website-development',
    icon: 'Globe',
    title: 'Website Development',
    short:
      'Fast, mobile-first, SEO-ready websites that make your business look credible and get you found on Google.',
    metaTitle: 'Website Development Company in Pune, India | Lunexa Technologies',
    metaDescription:
      'Website development company in Pune building fast, SEO-friendly, mobile-first websites for businesses in the US, UK, UAE, Europe, Australia and India. Fixed-price quotes.',
    hero:
      'We design and build business websites that load fast, look sharp on every screen, and are structured to rank. Ideal for companies that need an online presence which actually generates enquiries rather than just existing.',
    image: '/images/website-development-company.svg',
    imageAlt: 'Responsive business website shown on desktop, tablet and mobile screens',
    features: [
      { title: 'Mobile-first and responsive', desc: 'Designed for the phone first, because that is where most of your visitors will land.' },
      { title: 'Built to rank', desc: 'Clean semantic markup, fast Core Web Vitals, structured data, and on-page SEO from day one.' },
      { title: 'Edit it yourself', desc: 'Optional headless CMS so your team can change copy, images, and pricing without a developer.' },
      { title: 'Engineered for enquiries', desc: 'Contact forms, WhatsApp, click-to-call, and analytics wired in so you can see what converts.' },
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Headless CMS', 'WordPress', 'Vercel', 'Cloudflare'],
    deliverables: [
      'Custom, brand-aligned UI design',
      'Up to 5–12 responsive pages',
      'Contact and enquiry forms with spam protection',
      'On-page SEO, sitemap, schema and Search Console setup',
      'Performance, accessibility and security tuning',
      'Domain, SSL, hosting setup and launch support',
    ],
    faqs: [
      { question: 'How much does a business website cost?', answer: 'It depends on the number of unique page designs and the features you need. We quote a fixed price per project rather than an hourly rate, and you get an itemised breakdown — usually within one business day of sharing your requirements.' },
      { question: 'How long does a website take to build?', answer: 'A focused business website typically takes 2–4 weeks from kickoff to launch. Content readiness is normally the deciding factor — projects move fastest when your copy and images are ready in advance.' },
      { question: 'Will I be able to update the site myself?', answer: 'Yes, if you want to. We can connect a headless CMS so your team edits text, images, blog posts, and pricing through a simple dashboard, with no code involved.' },
      { question: 'Do you redesign existing websites?', answer: 'Often. We audit what you have, keep the URLs and content that already earn traffic, and rebuild the rest on a modern stack so you gain speed and rankings instead of losing them.' },
    ],
  },
  {
    slug: 'web-app-development',
    icon: 'LayoutDashboard',
    title: 'Web App Development',
    short:
      'Custom web applications, dashboards, portals, and SaaS platforms built to scale securely with your business.',
    metaTitle: 'Web App & SaaS Development Company | Lunexa Technologies',
    metaDescription:
      'Custom web application development — SaaS platforms, customer portals, admin dashboards and internal tools built with Next.js, React, Node.js, Java and Python. Offshore team in Pune, India.',
    hero:
      'Go beyond a brochure site with software built around how your business actually works. We build customer portals, booking systems, admin dashboards, internal tools, and full multi-tenant SaaS products — secure, scalable, and genuinely pleasant to use.',
    image: '/images/web-app-saas-development.svg',
    imageAlt: 'Custom SaaS dashboard with analytics charts, tables and user management',
    features: [
      { title: 'Modelled on your workflow', desc: 'We map your real process first and build software that fits it, instead of forcing you into a generic template.' },
      { title: 'Security by default', desc: 'Role-based access, secure sessions, audit trails, and encrypted data handling designed in from the start.' },
      { title: 'Integrations that hold up', desc: 'Payments, CRMs, ERPs, WhatsApp, email, and any third-party API you depend on — with retries and error handling.' },
      { title: 'Built to scale', desc: 'Cloud-native architecture and sensible caching so growth in users does not mean a rewrite.' },
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'NestJS', 'Java', 'Spring Boot', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS'],
    deliverables: [
      'Product discovery and technical scope',
      'UI/UX design and clickable prototype',
      'Frontend and backend development',
      'Database design and documented APIs',
      'Authentication, roles and permissions',
      'Payments, billing and third-party integrations',
      'CI/CD, monitoring, and post-launch support',
    ],
    faqs: [
      { question: 'What is the difference between a website and a web app?', answer: 'A website mainly presents information. A web app lets people log in and do things — place orders, manage records, book slots, view dashboards. If you need custom functionality behind a login, you need a web app.' },
      { question: 'Can you build a SaaS product I can charge subscriptions for?', answer: 'Yes. We build multi-tenant SaaS with subscription billing through Stripe or Razorpay, plan limits, admin tooling, and usage analytics.' },
      { question: 'Can you take over an existing codebase?', answer: 'Yes. We start with a short paid audit of the code, infrastructure, and risks, then give you a written assessment and a plan before we change anything.' },
      { question: 'Do you work with startups on an MVP?', answer: 'Frequently. We help founders ship a focused MVP in weeks rather than months, then iterate on what real users actually do with it.' },
    ],
  },
  {
    slug: 'mobile-app-development',
    icon: 'Smartphone',
    title: 'Mobile App Development',
    short:
      'Native and cross-platform apps for Android and iOS — Kotlin, Swift, Flutter, and Kotlin Multiplatform.',
    metaTitle: 'Mobile App Development Company — Android & iOS | Lunexa',
    metaDescription:
      'Android and iOS mobile app development from Pune, India. Native Kotlin and Jetpack Compose, Swift and SwiftUI, Flutter, and Kotlin Multiplatform (KMP) apps for startups and businesses worldwide.',
    hero:
      'We build fast, polished mobile apps for Android and iOS. Whether native performance matters most or you need one codebase across both platforms to launch sooner, we recommend the approach that fits your product, your budget, and your roadmap — not the one we happen to prefer.',
    image: '/images/mobile-app-development-android-ios.svg',
    imageAlt: 'Android and iOS mobile app screens built with Flutter and Kotlin Multiplatform',
    features: [
      { title: 'Native Android', desc: 'Kotlin with Jetpack Compose for modern, fluid Android apps that feel native because they are.' },
      { title: 'Native iOS', desc: 'Swift and SwiftUI for smooth, App Store–ready iPhone and iPad apps that pass review first time.' },
      { title: 'Flutter cross-platform', desc: 'A single codebase across Android and iOS — faster to ship and materially cheaper to maintain.' },
      { title: 'Kotlin Multiplatform', desc: 'Shared business logic with native or Compose Multiplatform UI, so you avoid duplicating the hard parts.' },
    ],
    tech: ['Kotlin', 'Jetpack Compose', 'Kotlin Multiplatform (KMP)', 'Flutter', 'Dart', 'Swift', 'SwiftUI', 'React Native', 'Firebase', 'REST', 'GraphQL'],
    deliverables: [
      'Platform and architecture recommendation',
      'Mobile UI/UX design',
      'Android and/or iOS development',
      'Backend, APIs and offline sync',
      'Push notifications and analytics',
      'Play Store and App Store submission',
      'Crash monitoring and version updates',
    ],
    faqs: [
      { question: 'Should I choose native, Flutter, or Kotlin Multiplatform?', answer: 'Native gives the very best performance and platform fidelity per OS. Flutter is usually the fastest and most affordable route to both stores from one team. KMP shares the business logic while keeping UI native. We recommend based on your budget, timeline, and how platform-specific your features are.' },
      { question: 'Do you publish to the Play Store and App Store?', answer: 'Yes — we handle store listings, screenshots, privacy declarations, review compliance, and the submission itself for both stores.' },
      { question: 'Can the app work offline?', answer: 'Yes. We build local-first storage with background sync for apps used in the field, on shop floors, or anywhere connectivity is unreliable.' },
      { question: 'Do you maintain the app after launch?', answer: 'Yes. OS versions and store policies change every year, so we offer maintenance plans covering SDK upgrades, compliance updates, crash fixes, and new features.' },
    ],
  },
  {
    slug: 'ai-solutions',
    icon: 'Sparkles',
    title: 'AI Product Engineering',
    short:
      'AI built into your product properly — assistants, document intelligence, and automation with real guardrails.',
    metaTitle: 'AI Development & LLM Integration Company | Lunexa Technologies',
    metaDescription:
      'AI product engineering — AI assistants, RAG document search, and workflow automation built on Claude and OpenAI, connected to your data with guardrails, evaluation and cost controls.',
    hero:
      'We build AI features that survive contact with real customers. That means production-grade models such as Claude and OpenAI, connected to your own data, with retrieval, guardrails, evaluation, and cost controls engineered in — not a demo prompt wrapped in a chat box.',
    image: '/images/ai-development-llm-integration.svg',
    imageAlt: 'AI assistant, document intelligence and workflow automation architecture',
    features: [
      { title: 'AI assistants and chatbots', desc: 'Support and sales assistants that answer from your own content and hand over to a human at the right moment.' },
      { title: 'Document intelligence', desc: 'Ask questions across contracts, PDFs, and knowledge bases with citations shown for every answer.' },
      { title: 'Workflow automation', desc: 'Classify, extract, route, and draft — taking the repetitive work out of support, admin, and operations.' },
      { title: 'AI inside your existing product', desc: 'Smart search, recommendations, or generation added to the app you already run, without a rewrite.' },
    ],
    tech: ['Claude API', 'OpenAI API', 'Python', 'FastAPI', 'LangChain', 'Vector databases', 'pgvector', 'Next.js', 'Node.js', 'AWS Bedrock'],
    deliverables: [
      'Use-case feasibility and cost review',
      'Model selection and integration architecture',
      'Secure retrieval over your own data',
      'Evaluation suite and accuracy benchmarking',
      'Guardrails, rate limits and monitoring',
      'Production deployment plus ongoing tuning',
    ],
    faqs: [
      { question: 'Which AI models do you build on?', answer: 'Production-ready hosted models — principally Claude and OpenAI — chosen per use case for accuracy, latency, and cost. This ships a reliable feature far faster and cheaper than training your own, and the architecture lets you switch models later as the field moves.' },
      { question: 'Do we need a lot of data to use AI?', answer: 'Usually not. Most business AI features retrieve from your existing documents and systems at the moment of the question, so the content you already have is normally enough to start.' },
      { question: 'Is our company data safe?', answer: 'Yes. We use business API tiers that do not train on your data, keep sensitive records inside your own infrastructure where required, and agree the data-handling terms in writing before we begin.' },
      { question: 'How do you stop the AI from making things up?', answer: 'By grounding answers in retrieved sources, showing citations, constraining the model with system rules and structured outputs, and running an evaluation set before every release. Where the answer is uncertain, the system is designed to say so or escalate to a human.' },
      { question: 'What does an AI feature cost to run?', answer: 'Ongoing cost tracks usage, since models bill per request. We estimate it before we build, design for efficient token use and caching, and add monitoring plus hard limits so the bill stays predictable.' },
    ],
  },
  {
    slug: 'cloud-devops',
    icon: 'Cloud',
    title: 'Cloud & DevOps',
    short:
      'AWS architecture, CI/CD, containers, and cost optimisation so your product ships often and stays up.',
    metaTitle: 'AWS Cloud & DevOps Services Company | Lunexa Technologies',
    metaDescription:
      'Cloud and DevOps services — AWS architecture, Terraform infrastructure as code, Docker and Kubernetes, CI/CD pipelines, monitoring, and cloud cost optimisation from an offshore team in Pune, India.',
    hero:
      'Great software still fails if deploys are scary and outages are silent. We set up the infrastructure, pipelines, and monitoring that let a small team ship confidently every week — and we cut the cloud bill that quietly grew while nobody was watching.',
    image: '/images/cloud-devops-aws-infrastructure.svg',
    imageAlt: 'Cloud infrastructure diagram with CI/CD pipeline, containers and monitoring',
    features: [
      { title: 'Infrastructure as code', desc: 'Terraform-managed AWS environments that are reproducible, reviewable, and never configured by hand in a console.' },
      { title: 'CI/CD you can trust', desc: 'Automated tests, preview environments, and one-click rollbacks so releasing stops being an event.' },
      { title: 'Monitoring and alerting', desc: 'Dashboards, logs, traces, and alerts tuned to page a human only when something genuinely needs one.' },
      { title: 'Cloud cost optimisation', desc: 'Right-sizing, storage lifecycle rules, and savings plans — most audits find meaningful monthly savings.' },
    ],
    tech: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions', 'Vercel', 'Cloudflare', 'PostgreSQL', 'Redis', 'Grafana', 'Linux'],
    deliverables: [
      'Architecture review and written recommendations',
      'Terraform-managed environments (dev, staging, prod)',
      'Containerisation and deployment pipelines',
      'Secrets management and least-privilege IAM',
      'Backups, disaster recovery and runbooks',
      'Monitoring, alerting and on-call setup',
      'Cloud cost audit with a savings plan',
    ],
    faqs: [
      { question: 'Do you work on infrastructure we already have?', answer: 'Yes. Most of this work is improving a live environment rather than starting fresh. We audit first, agree the priorities with you, and change things incrementally so nothing goes dark mid-migration.' },
      { question: 'Can you reduce our AWS bill?', answer: 'Usually, yes. Over-provisioned instances, forgotten volumes, unbounded log retention, and cross-AZ traffic are the common culprits. We quantify the savings before doing the work so you can see the return.' },
      { question: 'Do we need Kubernetes?', answer: 'Often not. Plenty of products run better and far cheaper on managed services such as ECS Fargate, App Runner, or Vercel. We recommend Kubernetes only when your scale or workload genuinely calls for it.' },
      { question: 'Can you help us prepare for a security audit?', answer: 'Yes. We help with the technical groundwork for SOC 2 and similar reviews — access control, encryption, logging, backup policy, and the evidence trail auditors ask for.' },
    ],
  },
  {
    slug: 'ui-ux-design',
    icon: 'PenTool',
    title: 'UI/UX Design',
    short:
      'Research-led product design and design systems that make software obvious to use and pleasant to look at.',
    metaTitle: 'UI/UX Design Services for Web & Mobile Apps | Lunexa',
    metaDescription:
      'UI/UX design services — user research, wireframes, interactive prototypes, design systems, and accessible interface design for web and mobile products. Offshore design team in Pune, India.',
    hero:
      'Design is the difference between software people tolerate and software people recommend. We research the people who will actually use your product, prototype the flows before anything is built, and hand engineering a design system rather than a pile of screens.',
    image: '/images/ui-ux-design-services.svg',
    imageAlt: 'UI/UX design process — wireframes, prototypes and a design system',
    features: [
      { title: 'Research before pixels', desc: 'We talk to real users and map the journey, so design decisions rest on evidence rather than taste.' },
      { title: 'Prototype before you build', desc: 'Clickable Figma prototypes let you test and change flows while it still costs hours, not sprints.' },
      { title: 'A design system, not screens', desc: 'Reusable tokens and components keep the product consistent as it grows and speeds up every future feature.' },
      { title: 'Accessible by default', desc: 'Contrast, focus order, keyboard paths and screen-reader labels handled as part of the work, not a retrofit.' },
    ],
    tech: ['Figma', 'Design tokens', 'WCAG 2.2', 'Tailwind CSS', 'Storybook', 'Framer Motion'],
    deliverables: [
      'User research and journey mapping',
      'Information architecture and wireframes',
      'High-fidelity UI design',
      'Interactive prototype for testing',
      'Design system with tokens and components',
      'Accessibility review and developer handoff',
    ],
    faqs: [
      { question: 'Can you design without also building?', answer: 'Yes. We regularly hand designs to an in-house or third-party engineering team, with a documented system and a handoff session so nothing is lost in translation.' },
      { question: 'Do you redesign existing products?', answer: 'Yes. We start with a UX audit of the live product and usage data, then prioritise the changes that will move your key metric rather than restyling everything at once.' },
      { question: 'How long does design take?', answer: 'A focused marketing site takes 1–2 weeks. A full product design with research and prototyping typically runs 3–6 weeks, depending on how many flows are involved.' },
    ],
  },
];

// Supporting capabilities shown as compact cards alongside the core services.
export const extraServices = [
  { icon: 'ShoppingCart', title: 'E-commerce Development', desc: 'Storefronts with payments, inventory, and order management built to convert and to scale.' },
  { icon: 'Search', title: 'SEO & Performance', desc: 'Technical SEO, Core Web Vitals, and speed engineering so you rank and load fast on real devices.' },
  { icon: 'RefreshCw', title: 'Legacy Modernisation', desc: 'Migrate ageing systems to a modern stack incrementally, without a risky big-bang rewrite.' },
  { icon: 'Wrench', title: 'Maintenance & Support', desc: 'Ongoing updates, security patches, backups, and improvements under a clear monthly plan.' },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
