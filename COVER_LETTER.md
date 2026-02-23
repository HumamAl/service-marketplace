Hi,

Built a two-sided service marketplace with provider discovery, booking flow, availability calendar, and earnings dashboard — adapted it for your spec:

**Built this for your project:** https://service-marketplace-rust.vercel.app

Covers the AI concierge chatbot, premium subscription gate, real-time availability, and the privacy/discreet mode with Quick Exit — the detail most developers won't anticipate. Lynt Marketplace and Sienna Charles (AI-powered vendor booking, map discovery) are the closest live examples.

Claude Code is my daily driver — it's how this demo got built before I wrote this letter.

Is the AI concierge parsing free-text intent or are you planning structured wizard steps first?

The demo covers the core — want to discuss what the production backend needs?

Humam

---

## Screening Question Answers

### 1. A link to a marketplace/booking platform you've built (or similar complexity)

Built a working demo for your exact use case: https://service-marketplace-rust.vercel.app

For live marketplace examples: Lynt Marketplace (vendor onboarding, listings, transactions) and Sienna Charles vendor platform (AI search, booking management, map discovery).

### 2. Which AI coding tools you use daily and how they change your workflow

Claude Code is my primary tool — scaffolding, refactoring, generating TypeScript interfaces from specs. Combined with Cursor for inline completions. The demo above was built entirely this way. Since your prototype was already built with Claude Code, I can read that codebase and extend it without a context-switching penalty.

### 3. Your experience with Next.js App Router specifically (not Pages Router)

All my deployed projects use App Router — never shipped a Pages Router project. Familiar with route groups, Server vs Client component boundaries, parallel routes, and intercepting routes. The demo shows route groups in action (sidebar layout for the app, full-width for other tabs).

### 4. Your hourly rate and weekly availability

Rate aligns with your $50-80/hr range. Available 30+ hrs/week with European business hours (CET) overlap. Can start immediately.

### 5. A brief note on how you'd approach migrating our mock data layer to a real Supabase backend

The demo covers this approach visually in the "My Approach" tab. Short version: (1) define Prisma schema matching your existing TypeScript interfaces — zero component rewrites, (2) set up Supabase project with RLS policies per user role, (3) replace mock imports with typed Supabase client queries one module at a time, (4) add Supabase Realtime subscriptions for provider availability. Keeping Server Components where possible to avoid unnecessary 'use client' spread.
