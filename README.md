# Lunexa Technologies

Marketing and lead-generation website for **Lunexa Technologies** — an offshore
software development company based in Wagholi, Pune, India, serving clients in
the US, UK, UAE, Europe, Australia, and India.

- **Live domain:** https://www.lunexatechnologies.com
- **Repository:** https://github.com/rizwan-dev/lunexa
- **Hosting:** Vercel

---

## Table of contents

1. [Quick start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Running it locally, step by step](#running-it-locally-step-by-step)
4. [Available commands](#available-commands)
5. [Environment variables](#environment-variables)
6. [Project structure](#project-structure)
7. [How to change the content](#how-to-change-the-content)
8. [The admin dashboard](#the-admin-dashboard)
9. [Deploying to Vercel](#deploying-to-vercel)
10. [Connecting the domain](#connecting-the-domain)
11. [After the first deploy](#after-the-first-deploy)
12. [Committing from a different computer](#committing-from-a-different-computer)
13. [Troubleshooting](#troubleshooting)
14. [Why a few things are built the way they are](#why-a-few-things-are-built-the-way-they-are)

---

## Quick start

If Node.js and git are already installed:

```bash
git clone https://github.com/rizwan-dev/lunexa.git
cd lunexa
npm install
npm run dev
```

Open **http://localhost:3000**.

No environment file is needed to run the site. Everything optional degrades
gracefully — this was verified from a clean clone with no `.env` present at
all: it installs, builds all 42 pages, and the contact form still accepts and
stores submissions.

---

## Prerequisites

| Tool | Version | Check with | Where to get it |
| --- | --- | --- | --- |
| Node.js | 18.17 or newer (20 LTS recommended) | `node -v` | https://nodejs.org — download the **LTS** installer |
| npm | Comes with Node.js | `npm -v` | — |
| git | Any recent version | `git --version` | https://git-scm.com/downloads (already installed on most Macs) |
| A code editor | — | — | VS Code: https://code.visualstudio.com |

`package.json` declares `"engines": { "node": ">=18.17" }`, so npm warns if the
Node version is too old rather than failing with a confusing error later.
`.nvmrc` pins 20 for anyone using [nvm](https://github.com/nvm-sh/nvm) — run
`nvm use` in the project folder to switch.

**Windows note:** every command below works in PowerShell or Windows Terminal.
Where a command uses `openssl`, an alternative is given.

---

## Running it locally, step by step

**1. Get the code.**

```bash
git clone https://github.com/rizwan-dev/lunexa.git
```

If that asks for a password and fails, use the GitHub Desktop app instead, or
sign in with the `gh` CLI (`gh auth login`), then clone again. SSH
(`git@github.com:rizwan-dev/lunexa.git`) works only if SSH keys are set up on
that machine.

**2. Move into the folder.**

```bash
cd lunexa
```

**3. Install the dependencies.** This creates `node_modules/` (about 500
packages) and takes a minute or two the first time.

```bash
npm install
```

**4. Start the development server.**

```bash
npm run dev
```

**5. Open http://localhost:3000** in a browser.

The dev server watches for file changes and reloads automatically. Press
`Ctrl+C` in the terminal to stop it.

### Optional: enable email, database, and the admin area locally

Only needed if you want to test those specific features on your own machine.
Copy the template and fill in what you need:

```bash
cp .env.example .env.local
```

`.env.local` is git-ignored and never leaves the machine. See
[Environment variables](#environment-variables) for what each key does.
**Restart `npm run dev` after editing it** — environment variables are read at
startup, not on file change.

---

## Available commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload, on http://localhost:3000 |
| `npm run build` | Production build — run this before deploying to catch errors |
| `npm run start` | Serves the production build locally (run `npm run build` first) |
| `npm run lint` | Checks code style and common mistakes |

To run the dev server on a different port (if 3000 is taken):

```bash
npm run dev -- --port 3001
```

---

## Environment variables

**None of these are required to run the site.** Each block turns a feature on;
without it, that feature is simply inactive. Copy `.env.example` to `.env.local`
for local use, and add the same keys in the Vercel dashboard for production.

### Enquiry storage

| Key | Purpose |
| --- | --- |
| `POSTGRES_URL` | Database connection string. Added automatically when you attach a Postgres database in Vercel. |

Without it, enquiries are written to `data/contact-messages.json` in the project
folder. That is fine for local development.

> **Important for production:** on Vercel the filesystem is read-only apart from
> `/tmp`, which is wiped whenever the server restarts. **Attach a database
> before sending traffic to the site**, or enquiries will be lost. This is the
> one setting that genuinely matters.

The `contact_messages` table is created automatically on the first submission —
there is no migration to run.

### Email notifications

| Key | Purpose |
| --- | --- |
| `SMTP_HOST` | Mail server, e.g. `smtp.zoho.in` |
| `SMTP_PORT` | `465` for SSL, `587` for STARTTLS |
| `SMTP_USER` | The mailbox username |
| `SMTP_PASS` | The mailbox password or app-specific password |
| `MAIL_FROM` | Address the email is sent from |
| `MAIL_FROM_NAME` | Display name on outgoing email |
| `MAIL_TO` | Where enquiry notifications are delivered |

Works with any SMTP provider — Zoho Mail, Google Workspace, Fastmail, and
others. When these are absent, nothing is emailed but the enquiry is still
stored, so no lead is lost.

Two emails go out per enquiry: a notification to `MAIL_TO`, and a branded
acknowledgement to the person who submitted the form.

### Admin dashboard

| Key | Purpose |
| --- | --- |
| `ADMIN_EMAIL` | Login email |
| `ADMIN_PASSWORD` | Login password |
| `ADMIN_SESSION_SECRET` | Long random string used to sign the session cookie |

**All three are required together.** If any is missing, `/admin` stays closed —
there is deliberately no fallback secret, because a predictable one would make
the login forgeable.

Generate the secret with either of these:

```bash
openssl rand -hex 32
```

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The second works on Windows too. Use a different secret in production from the
one used locally.

### Analytics and search console

| Key | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID, e.g. `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification token |

Leave `NEXT_PUBLIC_GA_ID` blank to disable analytics entirely. When it is set,
analytics still does not load for visitors in the UK, EU/EEA, or Switzerland,
where consent is legally required before non-essential cookies may be set.

---

## Project structure

```
app/
  (site)/              Public pages. The bracketed folder groups them so they
                       share one layout; it does not appear in the URL.
    page.tsx             Home
    services/            Index + [slug] detail pages (6 services)
    hire-developers/     Engagement models, roles, offshore objections
    portfolio/           Index + [slug] case studies
    industries/          Industry coverage
    pricing/             Tiers, cost comparison, pricing FAQ
    about/               Story, principles, location, stack
    blog/                Index + [slug] article pages
    contact/             Enquiry form (layout.tsx holds its page title)
    privacy/  terms/     Legal pages
    admin/               Enquiry dashboard + login
  api/
    contact/             Enquiry handling: spam checks, storage, email
    geo/                 Edge geolocation, used to gate analytics on consent
    admin/               Login, logout, delete
  layout.tsx           Root layout: fonts, site-wide metadata, schema
  globals.css          Design system — colours, buttons, cards, prose styles
  sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx
components/            Header, footer, hero, cards, FAQ, CTA, schema, admin
lib/                   Site config and all page content (see next section)
content/blog/          Blog articles as markdown files
public/images/         Self-hosted SVG illustrations
```

---

## How to change the content

Almost all wording lives in plain data files under `lib/`, so one edit updates
every page that uses it. **You do not need to touch page layouts to change
copy.**

### Company details — phone, email, address, name

**File:** `lib/site.ts`

This is the single source of truth. Editing the phone number here changes it in
the header, footer, contact page, WhatsApp links, and the structured data
Google reads — everywhere at once.

It also holds `site.url`, which drives canonical URLs, the sitemap, `robots.txt`
and schema. **If the live domain ever changes, change it here** and nowhere
else. Deliberately not an environment variable, because those go stale and
silently emit the wrong domain.

### Services

**File:** `lib/services.ts`

Each service has a slug, description, features, technologies, deliverables, and
its own FAQs. Adding an entry automatically creates its page at
`/services/your-slug`, adds it to the services index, the footer, the sitemap,
and the homepage grid.

### Case studies

**File:** `lib/portfolio.ts`

Same pattern — add an entry and the case study page, listing card, and sitemap
entry all appear. Replace the current anonymised examples with named client work
as permissions come through.

### Industries

**File:** `lib/industries.ts`

### Engagement models and roles

**File:** `lib/engagement.ts` — powers the Hire Developers page.

### Technologies

**File:** `lib/tech.ts` — the stack lists and the homepage trust strip.

### Homepage FAQ

**File:** `lib/faq.ts` — also emitted as FAQ structured data for Google.

### Adding a blog post

Create a new file in `content/blog/`, named after the URL you want. For example
`content/blog/how-to-choose-a-cms.md` becomes `/blog/how-to-choose-a-cms`.

```markdown
---
title: "Your headline here"
date: "2026-08-01"
tags: ["Website", "Pricing"]
excerpt: "One or two sentences. Used on cards and as the meta description."
faqs:
  - question: "A common question"
    answer: "The answer. Also published as FAQ structured data for Google."
---

Write the article in markdown below the dashes.

## Headings like this become the table of contents automatically

Regular paragraphs, **bold**, [links](https://example.com), bullet lists and
tables all work.
```

The page, its sitemap entry, and its article schema are generated from the file.
The `tags` also choose the header image — see `pickPostImage()` in `lib/blog.ts`
for which tag maps to which illustration.

### Colours, fonts, and branding

- **Colours:** `tailwind.config.js` — the `brand` (violet), `accent` (gold), and
  `night` (background) palettes.
- **Fonts:** `app/layout.tsx` — Sora for headings, Inter for body text.
- **Buttons, cards, and shared styles:** `app/globals.css`
- **Logo:** `public/logo.svg` (also copied to `public/favicon.svg`). Replacing
  both files updates the header, footer, and browser tab icon.

---

## The admin dashboard

Enquiries submitted through the contact form can be read at **`/admin`**.

- Sign in at `/admin/login` with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- Search by name, email, company, country, or message text.
- Select and delete individual enquiries or several at once.
- Sessions last 8 hours, then require signing in again.

The page is excluded from Google via `robots.txt`, a `noindex` tag, and an
`X-Robots-Tag` header, so enquiries never turn up in search results.

If `/admin` says the admin area is not configured, the three `ADMIN_*` variables
are not all set.

---

## Deploying to Vercel

### Option A — from the Vercel website (simplest, no local setup)

This needs nothing installed. It can be done entirely in a browser.

1. Go to https://vercel.com and sign in **with the GitHub account that can see
   `rizwan-dev/lunexa`**.
2. Click **Add New → Project**.
3. Find `lunexa` in the repository list and click **Import**.
4. Leave every build setting alone — Vercel detects Next.js automatically. Do
   not change the build command, output directory, or install command.
5. Click **Deploy** and wait a couple of minutes.

The site is now live on a temporary `*.vercel.app` address. Then:

6. **Attach a database.** In the project, go to **Storage → Create Database →
   Postgres**, then connect it to this project. Vercel adds `POSTGRES_URL`
   automatically. **Do this before sending real traffic**, or enquiries will not
   survive a restart.
7. **Add the remaining variables.** Go to **Settings → Environment Variables**
   and add the SMTP, admin, and analytics keys from
   [Environment variables](#environment-variables). Apply them to
   *Production*, *Preview*, and *Development*.
8. **Redeploy** so the new variables take effect: **Deployments → ⋯ on the
   latest one → Redeploy**. Environment variables are read at build and start
   time, so an existing deployment will not pick them up on its own.

### Option B — from the command line

```bash
npm install -g vercel
vercel login
vercel          # preview deployment
vercel --prod   # production deployment
```

Environment variables still need to be added in the dashboard, or with
`vercel env add`.

### Before any deploy

Run this locally to be sure the build is healthy — it catches errors that would
otherwise fail the deploy:

```bash
npm run build
```

---

## Connecting the domain

1. In the Vercel project: **Settings → Domains**.
2. Add **`www.lunexatechnologies.com`** and set it as the primary domain.
3. Add **`lunexatechnologies.com`** and set it to redirect to the `www` version.
4. Vercel shows the exact DNS records to create. At the domain registrar, add
   them:
   - `www` → a **CNAME** pointing at `cname.vercel-dns.com`
   - the root/apex → an **A** record pointing at the IP Vercel gives you
5. DNS usually propagates within an hour, occasionally up to 48. Vercel issues
   the SSL certificate automatically once it resolves.

> The primary domain **must match `site.url` in `lib/site.ts`**, which is
> currently `https://www.lunexatechnologies.com`. If you make the non-www
> version primary instead, update that file too, otherwise canonical tags and
> the sitemap will point at the wrong host and confuse Google.

---

## After the first deploy

- [ ] Submit `https://www.lunexatechnologies.com/sitemap.xml` in
      [Google Search Console](https://search.google.com/search-console)
- [ ] Send a real test enquiry through the contact form and confirm it arrives
      by email **and** appears in `/admin`
- [ ] Check the site on a phone as well as a laptop
- [ ] Test the WhatsApp button and the click-to-call link on a phone
- [ ] Confirm `https://` works and the padlock appears
- [ ] Set up a Google Business Profile for the Pune office (helps local search)
- [ ] Replace the anonymised case studies in `lib/portfolio.ts` with named
      client work as permissions come through
- [ ] Add real LinkedIn and GitHub URLs to `site.social` in `lib/site.ts` — they
      are empty strings for now, which correctly omits them from the structured
      data rather than publishing dead links

---

## Committing from a different computer

Git labels each commit with whatever name and email that machine is configured
with. To keep this repository showing a single author, set the identity **inside
the project folder** after cloning:

```bash
cd lunexa
git config user.name "Rizwanul Haque"
git config user.email "riztech.dev@gmail.com"
```

Because these are set locally, they apply to this project only and do not affect
any other repository on that computer.

Then the usual cycle:

```bash
git pull            # get the latest before starting
git add -A
git commit -m "Describe what changed"
git push
```

Verify the author afterwards with:

```bash
git log -1 --format='%an <%ae>'
```

Vercel redeploys automatically on every push to `main`.

---

## Troubleshooting

**The page loads as plain unstyled text, or every URL shows a 404.**
The `.next` build folder is stale or was deleted while the dev server was
running. Stop the server (`Ctrl+C`) and start it again:

```bash
npm run dev
```

If it persists, delete the folder and restart — it is regenerated
automatically, and nothing in it is worth keeping:

```bash
rm -rf .next && npm run dev
```

Then hard-reload the browser (`Cmd+Shift+R` on Mac, `Ctrl+Shift+R` on Windows)
so it does not serve the broken page from cache.

**`Error: listen EADDRINUSE: address already in use :::3000`**
Something else is on port 3000, often a dev server left running in another
terminal window. Either close it, or use a different port:

```bash
npm run dev -- --port 3001
```

**`npm install` fails, or the build errors after pulling changes.**
Delete and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

**Changes to `.env.local` seem to have no effect.**
Environment variables are read when the server starts. Stop `npm run dev` and
start it again.

**Enquiries are not arriving by email.**
Check that all of `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` are set, and that
the deployment has been redeployed since they were added. Email failures never
break the form — the enquiry is still stored, so check `/admin`. Vercel's
**Logs** tab shows the SMTP error if there is one.

**`/admin` says admin access is not configured.**
All three of `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` must be
present. Add the missing one and redeploy.

**Enquiries disappear from `/admin` on the live site.**
No database is attached, so they are being written to `/tmp`, which Vercel wipes
on restart. Attach a Postgres database as described above.

---

## Why a few things are built the way they are

**Content lives in data files, not in pages.** The homepage, detail pages,
sitemap, and structured data all read the same modules under `lib/`, so they
cannot drift out of sync. Adding a service in one file publishes it everywhere.

**`site.url` is hard-coded rather than an environment variable.** An env var for
the public origin has a habit of going stale in one environment and silently
emitting the wrong host in canonical tags and the sitemap, which is a
hard-to-notice SEO problem.

**Analytics is geo-gated.** Google Analytics sets cookies, so it is suppressed
for visitors in the UK, EU/EEA, and Switzerland, where consent is required
first. The visitor's region comes from the `/api/geo` edge route rather than
from `headers()` in the layout, because reading headers there would force every
page to render on demand and give up static generation.

**Spam handling is two-tier.** The hidden honeypot field and the submit-timing
check report success and silently discard, so bots get no feedback to adapt
against. Message-content checks return a real error message instead, because
losing a terse but genuine enquiry is worse than a bot learning the rules. See
`lib/spam.ts`.

**The admin session cookie is signed.** It carries its own expiry plus an HMAC
over it, so it cannot be forged by setting a fixed value like `admin_auth=1` in
a browser.

**All imagery is self-hosted SVG.** The illustrations in `public/images` are
vector files drawn for this site, so they stay sharp at any size, cost almost
nothing to load, and need no external image service. `next.config.js` keeps
`remotePatterns` empty for that reason — add to it only if images are ever
served from another domain.
