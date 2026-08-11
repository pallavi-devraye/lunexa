// Representative project examples / case studies.
// These illustrate the kind of work and outcomes we deliver. Replace each
// entry with a named client engagement as permissions come through.

export type Project = {
  slug: string;
  title: string;
  category: 'Website' | 'Web App' | 'Mobile App' | 'E-commerce' | 'AI' | 'Cloud';
  client: string;
  region: string;
  summary: string;
  result: string;
  tech: string[];
  image: string;
  // Case-study detail
  metaTitle: string;
  metaDescription: string;
  duration: string;
  services: string[];
  challenge: string;
  solution: string;
  outcomes: string[];
  testimonial?: { quote: string; name: string; role: string };
};

export const projects: Project[] = [
  {
    slug: 'ai-support-assistant-saas',
    title: 'AI Support Assistant for a B2B SaaS',
    category: 'AI',
    client: 'Confidential — B2B SaaS',
    region: 'United States',
    summary:
      'A retrieval-grounded support assistant that answers from the product docs and ticket history, with citations and human handover.',
    result: 'Deflected a large share of tier-1 tickets',
    tech: ['Claude API', 'Next.js', 'pgvector', 'PostgreSQL', 'AWS'],
    image: '/images/ai-development-llm-integration.svg',
    metaTitle: 'AI Support Assistant Case Study | Lunexa Technologies',
    metaDescription:
      'How we built a retrieval-grounded AI support assistant for a B2B SaaS — answers cited from real documentation, guardrails, evaluation, and clean handover to human agents.',
    duration: '9 weeks',
    services: ['AI Product Engineering', 'Web App Development', 'Cloud & DevOps'],
    challenge:
      'A growing SaaS company was drowning in repetitive tier-1 support tickets. An off-the-shelf chatbot had already been tried and abandoned: it invented product behaviour that did not exist, which cost the team more trust than it saved in time.',
    solution:
      'We indexed the product documentation, changelog, and resolved ticket history into a vector store, and built an assistant that answers only from retrieved passages with a citation on every claim. Confidence thresholds route anything uncertain to a human with the conversation attached. Before launch we ran an evaluation set of real historical questions and tuned retrieval until accuracy cleared the bar the team set.',
    outcomes: [
      'A large share of tier-1 tickets resolved without a human',
      'Every answer carries a citation the customer can open',
      'Uncertain questions escalate cleanly rather than guessing',
      'Per-conversation cost monitored with hard spend limits',
    ],
    testimonial: {
      quote:
        'The difference from the chatbot we tried before is that this one admits when it does not know. That is the reason our support team trusts it.',
      name: 'Head of Customer Success',
      role: 'B2B SaaS, United States',
    },
  },
  {
    slug: 'field-service-mobile-platform',
    title: 'Offline-First Field Service Platform',
    category: 'Mobile App',
    client: 'Confidential — Facilities Services',
    region: 'United Kingdom',
    summary:
      'A Flutter app for engineers with job dispatch, photo evidence, and full offline capability, paired with an operations dashboard.',
    result: 'Job reports filed same-day instead of same-week',
    tech: ['Flutter', 'Node.js', 'PostgreSQL', 'AWS', 'Firebase'],
    image: '/images/mobile-app-development-android-ios.svg',
    metaTitle: 'Offline-First Field Service App Case Study | Lunexa',
    metaDescription:
      'How we built an offline-first Flutter field service app with job dispatch, photo evidence, and sync — plus an operations dashboard that gave the office real-time visibility.',
    duration: '14 weeks',
    services: ['Mobile App Development', 'Web App Development', 'Cloud & DevOps'],
    challenge:
      'Engineers worked in basements, plant rooms, and rural sites with no reliable signal. Job sheets came back on paper days later, invoicing lagged behind the work, and the office had no idea what had actually been completed until the paperwork arrived.',
    solution:
      'We built a Flutter app with a local-first data layer: every job, checklist, and photo is written to on-device storage and synced opportunistically when a connection appears, with conflict resolution for jobs edited in more than one place. The operations dashboard shows live status, and completed jobs flow straight into invoicing.',
    outcomes: [
      'Job reports filed the same day rather than the same week',
      'Works fully offline, syncs automatically when signal returns',
      'Photo evidence and signatures attached to every job',
      'Invoicing triggered by completion instead of paperwork',
    ],
    testimonial: {
      quote:
        'Our engineers stopped fighting the app the week it launched, which never happened with the last system we bought.',
      name: 'Operations Director',
      role: 'Facilities Services, United Kingdom',
    },
  },
  {
    slug: 'multi-tenant-booking-saas',
    title: 'Multi-Tenant Booking SaaS',
    category: 'Web App',
    client: 'Confidential — Wellness Startup',
    region: 'United Arab Emirates',
    summary:
      'A white-label booking platform with per-tenant branding, Stripe subscriptions, staff rosters, and automated reminders.',
    result: 'From idea to paying customers in one quarter',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Vercel'],
    image: '/images/web-app-saas-development.svg',
    metaTitle: 'Multi-Tenant Booking SaaS Case Study | Lunexa Technologies',
    metaDescription:
      'How we took a wellness booking SaaS from idea to paying customers in a single quarter — multi-tenant architecture, Stripe subscriptions, staff rosters and automated reminders.',
    duration: '12 weeks',
    services: ['Web App Development', 'UI/UX Design', 'Cloud & DevOps'],
    challenge:
      'A founder had signed letters of intent from a handful of studios but no product, and a runway measured in months. The platform needed to serve each studio under its own branding from day one, without becoming a codebase of per-customer forks.',
    solution:
      'We designed a multi-tenant schema with row-level isolation and per-tenant theming, so a new studio is onboarded through configuration rather than code. Stripe handles subscriptions and plan limits, staff rosters drive availability, and reminders go out over email and WhatsApp. We shipped a deliberately narrow first release and added features against real usage.',
    outcomes: [
      'First paying customers live within the quarter',
      'New tenants onboarded through config, not a code branch',
      'Subscription billing and plan limits automated end to end',
      'No-shows down measurably after reminders went live',
    ],
  },
  {
    slug: 'headless-ecommerce-replatform',
    title: 'Headless E-commerce Replatform',
    category: 'E-commerce',
    client: 'Confidential — Speciality Retailer',
    region: 'India',
    summary:
      'Replatformed a slow legacy storefront onto a headless Next.js frontend, keeping the existing catalogue and order systems.',
    result: 'Pages went from seconds to sub-second',
    tech: ['Next.js', 'Headless CMS', 'Razorpay', 'PostgreSQL', 'Cloudflare'],
    image: '/images/ecommerce-development.svg',
    metaTitle: 'Headless E-commerce Replatform Case Study | Lunexa',
    metaDescription:
      'How we replatformed a slow legacy storefront onto a headless Next.js frontend without disrupting the catalogue or order systems — sub-second pages and better mobile conversion.',
    duration: '10 weeks',
    services: ['E-commerce Development', 'SEO & Performance', 'UI/UX Design'],
    challenge:
      'A speciality retailer had outgrown a plugin-heavy legacy store. Category pages took several seconds to render on mobile, mobile conversion was well below desktop, and every theme change risked breaking checkout.',
    solution:
      'We kept the existing catalogue and order management as the source of truth and rebuilt only the storefront: a headless Next.js frontend with static generation for category and product pages, incremental revalidation on stock changes, and a rebuilt mobile checkout. We migrated URLs with redirects mapped one to one so nothing dropped out of the index.',
    outcomes: [
      'Category and product pages render in under a second',
      'Mobile conversion closed most of the gap to desktop',
      'Search rankings held through the migration',
      'Merchandising changes no longer risk checkout',
    ],
  },
  {
    slug: 'aws-cost-and-reliability-programme',
    title: 'AWS Cost & Reliability Programme',
    category: 'Cloud',
    client: 'Confidential — Logistics Platform',
    region: 'Australia',
    summary:
      'An infrastructure audit turned into Terraform-managed environments, a real CI/CD pipeline, and a materially smaller cloud bill.',
    result: 'Deploys went from monthly and manual to daily',
    tech: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Grafana'],
    image: '/images/cloud-devops-aws-infrastructure.svg',
    metaTitle: 'AWS Cost Optimisation & DevOps Case Study | Lunexa',
    metaDescription:
      'How an AWS audit became Terraform-managed environments, automated CI/CD, proper monitoring, and a materially lower monthly cloud bill for a logistics platform.',
    duration: '8 weeks',
    services: ['Cloud & DevOps', 'Architecture Review'],
    challenge:
      'A logistics platform had grown its AWS footprint by hand over three years. Nobody could recreate production from scratch, releases happened monthly at night, and the bill had roughly doubled without a matching rise in traffic.',
    solution:
      'We started with a written audit of architecture, cost, and risk. Then we brought the environments under Terraform, containerised the services, and built a CI/CD pipeline with preview environments and one-click rollback. Right-sizing, storage lifecycle rules, and savings plans took a large bite out of the monthly spend, and Grafana dashboards with tuned alerts replaced customers as the outage detection system.',
    outcomes: [
      'Environments reproducible from code in minutes',
      'Deploys moved from monthly and manual to daily',
      'Monthly AWS spend reduced substantially',
      'Incidents detected by alerts rather than by customers',
    ],
    testimonial: {
      quote:
        'The audit alone paid for the engagement. Everything after that was upside.',
      name: 'CTO',
      role: 'Logistics Platform, Australia',
    },
  },
  {
    slug: 'clinic-website-and-patient-portal',
    title: 'Clinic Website & Patient Portal',
    category: 'Website',
    client: 'Confidential — Multi-Site Clinic',
    region: 'India',
    summary:
      'A fast multi-location clinic website with local SEO, online appointment booking, and a secure patient portal.',
    result: 'Online bookings became the leading channel',
    tech: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
    image: '/images/website-development-company.svg',
    metaTitle: 'Clinic Website & Patient Portal Case Study | Lunexa',
    metaDescription:
      'How we built a fast multi-location clinic website with local SEO, online appointment booking, and a secure patient portal that made online the leading booking channel.',
    duration: '6 weeks',
    services: ['Website Development', 'SEO & Performance', 'Web App Development'],
    challenge:
      'A clinic group with several locations relied entirely on phone bookings. Reception spent most of the day on the phone, each branch had inconsistent information online, and none of the pages ranked for the treatments people actually searched for.',
    solution:
      'We built a fast Next.js site with a proper page per location and per treatment, complete with local business schema and Google Business integration. Online booking writes into the existing clinic calendar, and a secure patient portal gives people their upcoming appointments, history, and documents without a phone call.',
    outcomes: [
      'Online booking became the leading appointment channel',
      'Ranking for treatment and location searches across branches',
      'Reception time freed up from routine scheduling calls',
      'Consistent, accurate information for every location',
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
