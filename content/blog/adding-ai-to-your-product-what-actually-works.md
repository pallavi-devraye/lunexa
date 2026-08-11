---
title: "Adding AI to Your Product: What Actually Works in Production"
date: "2026-08-04"
tags: ["AI", "LLM", "Automation", "Strategy"]
excerpt: "The gap between an impressive AI demo and a feature customers trust is mostly engineering: retrieval, evaluation, guardrails, and cost control. Here is what that involves, what it costs to run, and which use cases genuinely pay off."
faqs:
  - question: "Do we need to train our own model?"
    answer: "Almost certainly not. For the overwhelming majority of business use cases, a hosted model such as Claude or GPT combined with retrieval over your own data outperforms a small custom model, ships in weeks instead of quarters, and costs a fraction as much."
  - question: "How do you stop an AI feature from making things up?"
    answer: "Ground every answer in retrieved source material, show the citation, constrain the output with system rules and structured schemas, and run an evaluation set before each release. Where confidence is low, design the system to say so or escalate to a human rather than guess."
  - question: "What does an AI feature cost to run each month?"
    answer: "It scales with usage, since models bill per token. A support assistant handling a few thousand conversations a month typically costs tens to low hundreds of dollars in inference. Prompt caching, right-sized models per task, and hard spend limits keep it predictable."
  - question: "Is our company data safe with a hosted model?"
    answer: "Business API tiers from the major providers do not train on your data and offer retention controls. Sensitive records can stay in your own infrastructure with only the relevant passage sent at query time. Agree the data-handling terms in writing before you build."
  - question: "How long does it take to build a production AI feature?"
    answer: "A grounded assistant over existing documentation typically takes six to twelve weeks including evaluation and guardrails. The demo takes days; the difference is the engineering that makes it trustworthy enough to put in front of customers."
---

Building an impressive AI demo now takes an afternoon. Building an AI feature that a customer will rely on, that does not embarrass you at the worst moment, and whose monthly cost is predictable, takes considerably longer.

Almost all of that difference is ordinary engineering. Here is what it consists of.

## Start with the use case, not the technology

The question "how do we add AI to our product" produces bad features. The question "which repetitive judgement in our business could a model make faster than a person" produces good ones.

Three patterns account for most of the AI work that actually earns its cost:

**Grounded question answering.** Support assistants, internal knowledge search, document Q&A. The model does not know your business — it retrieves relevant passages from your content and answers from those, with citations.

**Extraction and classification.** Pulling structured data out of unstructured input: invoices, CVs, emails, contracts, support tickets. This is where the return is most predictable, because you can measure accuracy against a labelled set and compare directly against the manual cost.

**Drafting.** First drafts of replies, summaries, and reports that a human then edits. The value is in removing the blank page, not in removing the human.

Notice what is not on that list: anything where a wrong answer is expensive and no human sees the output before it acts. That is where AI features go badly wrong, and it is usually a design choice rather than a model limitation.

## The engineering between demo and production

### Retrieval that actually retrieves

A model answering from its training data will confidently describe your product as it imagines it. The fix is retrieval: find the relevant passages from your own content, and instruct the model to answer only from those.

Doing that well is where most of the difficulty sits. Chunking documents so a passage still makes sense on its own. Combining semantic and keyword search, because pure vector search misses exact product names and error codes. Reranking the candidates. Handling the case where nothing relevant exists — which must produce "I don't know", not a plausible invention.

### Evaluation before every release

You cannot improve what you cannot measure, and "it looked good when I tried it" is not measurement.

Build a set of a few hundred real questions with known correct answers, drawn from actual support tickets or user queries. Run it on every prompt change, every model change, every retrieval tweak. Track accuracy, refusal rate, and citation correctness.

This is the single highest-leverage practice in AI engineering, and the one most often skipped. Without it, every change is a guess, and regressions are found by customers.

### Guardrails that are actually enforced

Not a line in the prompt asking the model to behave. Enforced, in code:

- **Structured outputs** with a schema, validated before anything downstream sees them
- **Allow-lists** for any action the model can trigger
- **Confidence thresholds** that route uncertain cases to a human
- **Input limits** so a huge paste cannot run up a bill or blow the context
- **A human in the loop** for anything irreversible

The rule of thumb: the model can decide, but code decides what the model is allowed to decide about.

### Cost control from day one

Per-token billing means cost scales with success, which is a pleasant problem only if you planned for it.

The levers that matter, roughly in order of impact: prompt caching for the large static context you send on every request; using a small fast model for classification and routing and reserving the large model for genuinely hard reasoning; trimming retrieved context to what is relevant rather than padding it; and setting hard monthly spend limits with alerting well before them.

Done properly, most business AI features cost far less to run than teams expect. Done carelessly — the largest model, the full document set on every call, no caching — the same feature can cost twenty times as much for no measurable gain in quality.

## What it costs to build

Indicative ranges for a production feature, including evaluation and guardrails, built by a senior team.

| Feature | Typical build | Timeline | Monthly run cost |
| --- | --- | --- | --- |
| Grounded FAQ assistant | $12,000 – $30,000 | 6–9 weeks | $30 – $300 |
| Document intelligence (search + summaries) | $20,000 – $50,000 | 8–14 weeks | $100 – $800 |
| Extraction pipeline (invoices, forms, CVs) | $15,000 – $40,000 | 6–12 weeks | Scales with volume |
| AI inside an existing product | $10,000 – $35,000 | 4–10 weeks | Varies with usage |

Run costs assume sensible engineering: caching, right-sized models, trimmed context. They can be an order of magnitude higher without it.

## Where AI features fail

**No evaluation.** Every change is a vibe check. Regressions ship. Trust erodes slowly and then all at once.

**Retrieval as an afterthought.** The retrieval quality sets the ceiling on the answer quality. A better model cannot rescue a bad passage.

**No graceful failure.** A system that always answers will sometimes answer wrongly. A system that says "I could not find this — here is a human" is trusted far more, and the honesty is what earns it.

**Automating the wrong decision.** If a mistake is expensive and irreversible, keep a person in the path. Use AI to make that person faster, not absent.

**Ignoring the boring alternative.** Some problems presented as AI problems are search problems, or form-design problems, or process problems. A good engineering partner will say so before quoting you for a model.

## A sensible sequence

1. **Feasibility review, one to two weeks.** Is there enough data, is the accuracy bar reachable, what would it cost to run? Ends with a recommendation, including the recommendation not to build it.
2. **Evaluation set first.** Before any prompt engineering, assemble the questions and known-good answers. This defines "working".
3. **Thinnest useful version.** One use case, one channel, internal users only.
4. **Measure against the set.** Iterate on retrieval and prompts until accuracy clears the bar you agreed.
5. **Guardrails and monitoring.** Structured outputs, thresholds, spend limits, logging.
6. **Limited release.** A subset of real users, watching the escalation rate.
7. **Expand.** More content, more channels, more use cases — with the evaluation set growing alongside.

Teams that follow roughly this order ship features people trust. Teams that start at step three and stop there ship demos.

## The short version

Use hosted models and retrieval; do not train your own. Build the evaluation set before the prompts. Enforce guardrails in code rather than in prose. Design the failure case deliberately — a system that admits uncertainty is trusted more than one that never does. Control cost with caching and right-sized models from the first week.

The model is the easy part. Everything around it is what makes the feature worth shipping.
