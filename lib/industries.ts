// Industries we build software for — strong for long-tail search
// (e.g. "software development company for healthcare", "fintech app developers India").

export type Industry = {
  slug: string;
  icon: string;
  title: string;
  desc: string;
  builds: string[];
};

export const industries: Industry[] = [
  {
    slug: 'saas-startups',
    icon: 'Rocket',
    title: 'SaaS & Startups',
    desc: 'Ship a focused MVP or scale a full multi-tenant platform with subscriptions, dashboards, and usage analytics.',
    builds: ['MVP in weeks', 'Multi-tenant SaaS', 'Billing & subscriptions', 'Admin dashboards'],
  },
  {
    slug: 'ecommerce-retail',
    icon: 'ShoppingCart',
    title: 'E-commerce & Retail',
    desc: 'Storefronts with fast checkout, reliable payments, inventory, and order management that turn browsers into buyers.',
    builds: ['Headless storefronts', 'Payment gateways', 'Inventory & orders', 'Loyalty programmes'],
  },
  {
    slug: 'healthcare',
    icon: 'HeartPulse',
    title: 'Healthcare & Clinics',
    desc: 'Patient portals, appointment systems, and clinical dashboards built with privacy and uptime treated as requirements.',
    builds: ['Appointment booking', 'Patient portals', 'Teleconsultation', 'Records & billing'],
  },
  {
    slug: 'fintech',
    icon: 'Landmark',
    title: 'Fintech & Financial Services',
    desc: 'Secure financial products with strong authentication, ledgers, reconciliation, reporting, and full audit trails.',
    builds: ['KYC & onboarding', 'Ledgers & reconciliation', 'Reporting dashboards', 'Audit trails'],
  },
  {
    slug: 'logistics',
    icon: 'Truck',
    title: 'Logistics & Field Services',
    desc: 'Dispatch, live tracking, and offline-capable field apps that keep working when the signal does not.',
    builds: ['Live tracking', 'Route optimisation', 'Offline field apps', 'Proof of delivery'],
  },
  {
    slug: 'education',
    icon: 'GraduationCap',
    title: 'Education & EdTech',
    desc: 'Learning platforms with courses, assessments, live classes, and analytics that show whether learning is happening.',
    builds: ['Course platforms', 'Assessments & quizzes', 'Live classes', 'Progress analytics'],
  },
  {
    slug: 'real-estate',
    icon: 'Home',
    title: 'Real Estate & PropTech',
    desc: 'Listing portals and agent tools with rich search, saved alerts, lead capture, and CRM integration.',
    builds: ['Listing portals', 'Map & filter search', 'Lead capture', 'Agent dashboards'],
  },
  {
    slug: 'manufacturing',
    icon: 'Factory',
    title: 'Manufacturing & Industrial',
    desc: 'Production tracking, quality control, and IoT dashboards that give the floor and the office the same numbers.',
    builds: ['Production tracking', 'Quality control', 'IoT dashboards', 'Inventory & procurement'],
  },
  {
    slug: 'hospitality',
    icon: 'UtensilsCrossed',
    title: 'Hospitality & Restaurants',
    desc: 'Menus, reservations, online ordering, and loyalty — plus the local SEO that gets you found nearby.',
    builds: ['Online ordering', 'Table reservations', 'Digital menus', 'Local SEO'],
  },
  {
    slug: 'professional-services',
    icon: 'Briefcase',
    title: 'Professional Services',
    desc: 'Client portals, proposal and billing workflows, and internal tools for agencies, consultancies, and firms.',
    builds: ['Client portals', 'Time & billing', 'Document workflows', 'Internal tools'],
  },
  {
    slug: 'travel',
    icon: 'Plane',
    title: 'Travel & Booking',
    desc: 'Search, availability, and booking engines integrated with the suppliers and payment rails you already use.',
    builds: ['Booking engines', 'Availability & pricing', 'Supplier APIs', 'Itinerary apps'],
  },
  {
    slug: 'nonprofit',
    icon: 'HeartHandshake',
    title: 'Non-profit & Community',
    desc: 'Donation platforms, volunteer management, and impact reporting on budgets that have to stretch.',
    builds: ['Donation platforms', 'Volunteer management', 'Impact reporting', 'Event registration'],
  },
];
