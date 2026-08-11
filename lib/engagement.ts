// Engagement models and the roles we staff. Used by /hire-developers and
// referenced from /pricing, so the two pages can never contradict each other.

export type EngagementModel = {
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  desc: string;
  bestFor: string;
  billing: string;
  commitment: string;
  includes: string[];
};

export const engagementModels: EngagementModel[] = [
  {
    slug: 'fixed-price',
    icon: 'Target',
    title: 'Fixed-Price Project',
    tagline: 'A defined outcome for an agreed number',
    desc:
      'We scope the work in detail, agree a price and a milestone schedule, and deliver against it. Best when you know what you want built and want budget certainty.',
    bestFor: 'Websites, MVPs, and well-defined builds',
    billing: 'Fixed price, paid per milestone',
    commitment: 'Per project',
    includes: [
      'Detailed written scope and acceptance criteria',
      'Fixed price with no hourly surprises',
      'Milestone payments tied to delivered work',
      'Change requests quoted before anything moves',
      'Fixed delivery date with penalties we agree upfront',
    ],
  },
  {
    slug: 'dedicated-team',
    icon: 'Users',
    title: 'Dedicated Team',
    tagline: 'Your offshore engineering team, ours to manage',
    desc:
      'A named team working only on your product, in your tools and your rituals, with a technical lead accountable for delivery. Best for ongoing product development.',
    bestFor: 'Ongoing product development and roadmaps',
    billing: 'Monthly per person',
    commitment: 'Minimum 3 months, 30 days notice',
    includes: [
      'Named engineers dedicated to your product',
      'A technical lead accountable for delivery',
      'Your Slack, your board, your sprint cadence',
      'Guaranteed daily overlap with your working hours',
      'Scale the team up or down with 30 days notice',
    ],
  },
  {
    slug: 'staff-augmentation',
    icon: 'UserPlus',
    title: 'Staff Augmentation',
    tagline: 'Specific skills, plugged into your team',
    desc:
      'Individual engineers who join your existing team and report to your leads. Best when you have the process and need capacity or a specific skill.',
    bestFor: 'Filling a skills gap or adding capacity fast',
    billing: 'Monthly per person',
    commitment: 'Minimum 1 month',
    includes: [
      'Vetted engineers matched to your stack',
      'Onboarded into your existing process',
      'Report directly to your engineering leads',
      'Replaceable within two weeks if the fit is wrong',
      'Typically starting within 2–3 weeks',
    ],
  },
  {
    slug: 'discovery-sprint',
    icon: 'Compass',
    title: 'Discovery Sprint',
    tagline: 'Two weeks to de-risk a big decision',
    desc:
      'A short paid engagement that turns a vague idea into a costed plan: requirements, architecture, prototype, and a realistic budget and timeline.',
    bestFor: 'Validating scope and cost before committing',
    billing: 'Fixed price',
    commitment: '2 weeks',
    includes: [
      'Requirements workshops with your stakeholders',
      'Technical architecture and stack recommendation',
      'Clickable prototype of the core flows',
      'Costed delivery plan with phased milestones',
      'Yours to keep, whoever ends up building it',
    ],
  },
];

export type Role = {
  title: string;
  skills: string[];
};

export const roles: Role[] = [
  { title: 'Frontend Engineers', skills: ['React', 'Next.js', 'TypeScript', 'Angular', 'Vue.js'] },
  { title: 'Backend Engineers', skills: ['Node.js', 'Java', 'Spring Boot', 'Python', 'Django', 'Go'] },
  { title: 'Full-Stack Engineers', skills: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS'] },
  { title: 'Mobile Engineers', skills: ['Kotlin', 'Swift', 'Flutter', 'Kotlin Multiplatform'] },
  { title: 'AI / ML Engineers', skills: ['Claude API', 'OpenAI API', 'RAG', 'Python', 'Vector search'] },
  { title: 'DevOps / Cloud Engineers', skills: ['AWS', 'Terraform', 'Kubernetes', 'CI/CD', 'Observability'] },
  { title: 'QA Engineers', skills: ['Playwright', 'Cypress', 'Automation', 'Performance testing'] },
  { title: 'Product Designers', skills: ['Figma', 'UX research', 'Design systems', 'Accessibility'] },
];

// The objections every serious offshore buyer raises, answered directly.
export const offshoreConcerns = [
  {
    icon: 'Clock',
    concern: 'Will the time-zone gap slow us down?',
    answer:
      'We hold a guaranteed overlap with your working hours every day for calls and decisions, and work asynchronously either side of it. Most clients end up using the offset deliberately: review in your morning, work continues while you sleep.',
  },
  {
    icon: 'MessageCircle',
    concern: 'How do we know what is actually happening?',
    answer:
      'A written end-of-day update, a demo every week, and a shared board you can open at any time. No status meeting is needed to find out where things stand, and there are no surprises at the end of a sprint.',
  },
  {
    icon: 'ShieldCheck',
    concern: 'Is our IP and data protected?',
    answer:
      'An NDA is signed before we see anything sensitive, and IP assignment is written into the agreement. Access is least-privilege, credentials stay in your vault, and we can work entirely inside your own cloud accounts.',
  },
  {
    icon: 'Award',
    concern: 'Will the quality hold up?',
    answer:
      'Every change goes through code review, automated tests, and CI. You get the repository from day one and can bring in your own reviewer at any point. Start with a small paid pilot and judge the code rather than the pitch.',
  },
  {
    icon: 'Repeat',
    concern: 'What if the fit is wrong?',
    answer:
      'Dedicated team engagements run on 30 days notice, and any individual can be replaced within two weeks. We would rather you had a clean exit than an unhappy contract.',
  },
  {
    icon: 'Landmark',
    concern: 'How does paying an Indian company work?',
    answer:
      'We invoice in your currency — USD, GBP, EUR, AED or INR — and accept international bank transfer, Wise, or Payoneer. Invoices are compliant for your accounting, and we handle the paperwork on our side.',
  },
];
