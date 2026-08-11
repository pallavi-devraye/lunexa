---
title: "Choosing a Tech Stack You Can Still Hire For in Three Years"
date: "2026-01-28"
tags: ["SaaS", "Strategy", "Web App", "Startup"]
excerpt: "The stack decision most founders treat as technical is really a hiring decision. How to weigh talent pools, support horizons, and maintenance cost — and why the most interesting choice is usually the wrong one."
faqs:
  - question: "What is the safest default stack for a new SaaS product in 2026?"
    answer: "TypeScript with React and Next.js on the frontend, Node or Java or Python on the backend, and PostgreSQL for data, hosted on a managed platform. It is not exciting, but the talent pool is enormous, the documentation is excellent, and nothing on that list is at risk of disappearing."
  - question: "Does the technology choice really affect hiring?"
    answer: "Substantially. A product built on a niche framework narrows your candidate pool to a fraction of the market and lengthens every hire. It also raises the price, because the few people who know it can charge for the scarcity."
  - question: "Should we use whatever our first developer prefers?"
    answer: "Only if their preference also passes the hiring and support tests. A first engineer optimises for their own productivity, which is reasonable — but they will not necessarily be the person maintaining it in year three."
  - question: "When is it worth choosing a less common technology?"
    answer: "When it solves a problem central to your product that mainstream options genuinely cannot, and you can articulate that problem in one sentence. Elixir for massive concurrent connections or Rust for a performance-critical component are defensible. 'It is more elegant' is not."
  - question: "How much does the wrong stack cost to fix later?"
    answer: "A full rewrite typically costs 60–100% of the original build and delivers no new features while it happens. Incremental migration is usually the better path, but it still runs for quarters rather than weeks."
---

Founders tend to treat the technology choice as an engineering decision, so they delegate it to the first engineer they hire. That engineer, reasonably, picks what they most enjoy working in.

Two years later the company is trying to hire a third developer and discovering that the candidate pool for that framework, in their city, at their budget, is roughly four people.

The stack decision is a hiring decision wearing technical clothes. Here is how to make it that way.

## Four questions, in order

### 1. Can we hire for it?

Search your target markets for the technology and count the results. Then check the salary expectations attached.

A mainstream stack means hundreds of candidates and a fortnight to shortlist. A niche one means a handful, a longer search, and a premium. That premium is permanent — it applies to every hire you make for the life of the product.

This matters most exactly when things are going well. A product nobody uses can be maintained by one person on any stack. A growing product needs a team, and the team has to exist.

### 2. Will it still be supported?

Look at the release cadence, the size of the maintaining organisation, and how the last major version migration went for people who lived through it.

React, Angular, Spring, Django, Rails, Postgres, .NET — all have institutional backing, long track records, and predictable upgrade paths. A framework with one prolific maintainer and a lively Discord may be excellent, and may also be unmaintained in three years. That risk is real and it is asymmetric: the upside is some developer convenience, the downside is a rewrite.

### 3. What will it cost to run?

Not just hosting. Total cost includes hosting, the ease of finding managed services, how much engineering time deployment and monitoring consume, and how quickly a new hire becomes productive.

An unusual stack often means self-hosting something that is a managed service everywhere else — which means someone on your team is now responsible for operating it, forever.

### 4. Does it fit the actual problem?

Only now does the technical fit matter, and for most business software the honest answer is that almost anything works. A CRUD application with a database behind it is not a hard technical problem in any mainstream language. The differentiators are your product and your speed, not your runtime.

The exceptions are real but narrower than they are claimed to be: very high concurrency, hard real-time constraints, heavy numerical work, or a genuine need to share code across platforms. If your product is in one of those categories you already know it.

## A default that is hard to regret

For a typical B2B SaaS product in 2026:

- **Frontend**: TypeScript with React and Next.js. Enormous talent pool, excellent documentation, server rendering when you want it.
- **Backend**: Node with TypeScript for a small team sharing one language; Java with Spring Boot or Python with Django where the domain is complex or the team already knows it.
- **Database**: PostgreSQL. It handles relational data, JSON, full-text search, and vector search for AI features, which removes several would-be dependencies.
- **Hosting**: A managed platform — Vercel, Railway, Render, or AWS with managed services. Do not run your own Kubernetes until something forces you to.
- **Auth**: A managed provider unless you have a specific reason not to. Authentication is easy to get almost right and expensive to get wrong.

None of this is interesting. That is the feature. Every part of it can be hired for in any major market, and every part will still exist in five years.

## When a less common choice is justified

There are good reasons to deviate, and they share a shape: a specific, articulable problem the mainstream option cannot solve.

- **Elixir or Go** when massive concurrent connections are central to the product
- **Rust** for a performance-critical component, usually alongside a mainstream stack rather than replacing it
- **Kotlin Multiplatform** when sharing business logic across mobile platforms is a core requirement
- **A specialist database** when your access pattern genuinely does not fit a relational model

The test is whether you can state the problem in one sentence without using the words "elegant", "modern", or "clean". If you cannot, the mainstream option is the right call.

## What it costs to be wrong

A full rewrite typically costs 60–100% of the original build, and during it you ship no new features — which is often the more expensive half. Incremental migration, replacing one module at a time behind a stable interface, is almost always the better path, but it still runs for quarters rather than weeks.

The cheapest time to make this decision well is before the first commit. The second cheapest is at month three, when there is still little enough code that changing direction is annoying rather than catastrophic.

## A sanity check before you commit

- Can we hire three of these in our target market within a month?
- Will this framework have a maintained major version in three years?
- Is there a managed hosting option, or are we operating it ourselves?
- Could a competent engineer new to our team ship something in their first week?
- If our lead engineer left tomorrow, could someone else pick this up?

Five yeses and the choice is safe. Any no needs a specific, written reason — because that is the answer you will be explaining to yourself in two years.
