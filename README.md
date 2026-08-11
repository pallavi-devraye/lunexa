# Lunexa Technologies

Marketing and lead-generation website for **Lunexa Technologies** — an offshore
software development company based in Wagholi, Pune, India, serving clients in
the US, UK, UAE, Europe, Australia, and India.

Live domain: **https://www.lunexatechnologies.com**

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| Icons | lucide-react |
| Content | Markdown + gray-matter + remark |
| Enquiry storage | Vercel Postgres, with a local JSON fallback |
| Email | Nodemailer over SMTP |
| Hosting | Vercel |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — the site runs without any of it
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project layout

```
app/
  (site)/            Public pages, grouped so they share the root layout
    page.tsx           Home
    services/          Index + [slug] detail (6 services)
    hire-developers/   Engagement models, roles, offshore objections
    portfolio/         Index + [slug] case studies
    industries/        Industry coverage
    pricing/           Tiers, cost comparison, pricing FAQ
    about/             Story, principles, location, stack
    blog/              Index + [slug] article pages
    contact/           Enquiry form (+ layout.tsx for its metadata)
    privacy/ terms/    Legal
    admin/             Enquiry dashboard + login
  api/
    contact/           Enquiry submission: spam checks, storage, email
    geo/               Edge geolocation, used to gate analytics on consent
    admin/             Signed-session login, logout, delete
  layout.tsx           Root layout, fonts, metadata, schema
  sitemap.ts robots.ts opengraph-image.tsx not-found.tsx
components/            Header, footer, hero, cards, FAQ, CTA, schema, admin
lib/                   Site config and all page data (see below)
content/blog/          Markdown articles with frontmatter
public/images/         Self-hosted SVG illustrations
```

## Editing content

Almost all copy lives in typed data modules, so a change propagates to every
page that uses it:

| File | Controls |
| --- | --- |
| `lib/site.ts` | Name, URL, email, phone, address, markets, nav, socials |
| `lib/services.ts` | The six services, their features, tech, deliverables, FAQs |
| `lib/portfolio.ts` | Case studies |
| `lib/industries.ts` | Industry cards |
| `lib/engagement.ts` | Engagement models, roles, offshore objections |
| `lib/tech.ts` | Technology categories and the homepage trust strip |
| `lib/faq.ts` | Homepage FAQ (also emitted as FAQPage structured data) |

`lib/site.ts` is the single source of truth for the public origin. The sitemap,
robots file, canonical URLs, and structured data all read `site.url` — do not
reintroduce an environment variable for it, which is how these drift apart.

### Adding a blog post

Create `content/blog/your-slug.md`:

```markdown
---
title: "Your title"
date: "2026-08-01"
tags: ["Offshore", "Pricing"]
excerpt: "One or two sentences used on cards and in meta description."
faqs:
  - question: "A question"
    answer: "An answer, also emitted as FAQPage structured data."
---

Body in markdown. H2 headings become the table of contents automatically.
```

The route, sitemap entry, and article schema are generated from the file. Tags
also pick the header image via `pickPostImage()` in `lib/blog.ts`.

## Environment variables

See `.env.example` for the full list with comments. Every block is optional and
degrades gracefully:

- **No `POSTGRES_URL`** → enquiries go to `data/contact-messages.json` locally.
  In production this falls back to `/tmp`, which does not survive a cold start,
  so attach a database before going live.
- **No SMTP variables** → nothing is emailed; the enquiry is still stored.
- **No admin variables** → `/admin` stays closed. All three of `ADMIN_EMAIL`,
  `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` are required; there is no
  fallback secret by design.
- **No `NEXT_PUBLIC_GA_ID`** → no analytics at all.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it in Vercel — the framework is detected automatically, no build
   configuration needed.
3. Add `www.lunexatechnologies.com` as the primary domain and redirect the apex
   to it (or the reverse — but make it match `site.url`).
4. Attach a Postgres database. The `contact_messages` table is created on the
   first submission.
5. Add the SMTP, admin, and analytics variables from `.env.example`.
6. Submit `https://www.lunexatechnologies.com/sitemap.xml` in Google Search
   Console.

## Notes on a few decisions

**Analytics is geo-gated.** GA4 sets cookies, so it is suppressed entirely for
visitors in the UK, EU/EEA, and Switzerland, where consent is required first.
The region comes from `/api/geo` rather than `headers()` in the layout, which
would force every page to render dynamically and lose static generation.

**Spam handling is two-tier.** The honeypot and submit-timing checks report
success and silently discard, so bots get no signal to adapt against. Content
checks return a real message, because losing a terse but genuine lead is worse
than a bot learning the rules. See `lib/spam.ts`.

**The admin session is signed.** The cookie carries its own expiry plus an HMAC
over it, so it cannot be forged by setting a fixed value in a browser.

**All imagery is self-hosted SVG** in `public/images`, which keeps the pages
fast and avoids remote image configuration. `next.config.js` has an empty
`remotePatterns` for that reason — add to it only if you later serve images
from another origin.
