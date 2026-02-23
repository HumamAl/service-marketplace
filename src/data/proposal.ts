export const proposalData = {
  hero: {
    name: "Humam",
    valueProp:
      "I take marketplace prototypes to production — Supabase backend, Stripe billing, real-time availability, and GDPR-ready auth, all without touching your existing App Router structure.",
    badge: "Built this demo for your project",
    stats: [
      { value: "24+", label: "Projects Shipped" },
      { value: "< 48hr", label: "Demo Turnaround" },
      { value: "15+", label: "Industries Served" },
    ],
  },
  portfolioProjects: [
    {
      name: "Lynt Marketplace",
      description:
        "Full marketplace architecture with vendor onboarding, listing management, and transaction tracking. Two-sided platform built on Next.js App Router with separate vendor and buyer flows.",
      outcome:
        "Production-ready marketplace — vendor onboarding, listing management, and transaction tracking shipped as a complete platform",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      url: "https://lynt-marketplace.vercel.app",
      relevance:
        "Direct architecture match — vendor onboarding = provider onboarding, listing management = service profiles, transaction flow = booking flow",
    },
    {
      name: "Sienna Charles — Vendor Admin",
      description:
        "Luxury vendor discovery and booking platform with AI-powered search, interactive map view, category filters, booking management, and spend analytics per booking.",
      outcome:
        "Vendor discovery and booking platform with map view, AI search, category filters, and per-booking spend tracking shipped and live",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts"],
      url: "https://sienna-vendor-admin.vercel.app",
      relevance:
        "Nearest feature analog — vendor directory = provider directory, booking management = appointment flow, spend analytics = earnings dashboard",
    },
    {
      name: "Rental PM Connect",
      description:
        "Two-sided matching platform connecting property owners with vetted property managers. Separate role dashboards, vetting workflow, review tracking, and matching algorithm.",
      outcome:
        "Two-sided matching platform with vetting workflows, review tracking, and separate owner/PM dashboards — live on Vercel",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      url: "https://rental-pm-connect.vercel.app",
      relevance:
        "Same two-sided structure — owner vs PM = client vs provider, vetting flow = provider verification, role-based dashboards match exactly",
    },
    {
      name: "Creator Economy App",
      description:
        "Livestreaming creator platform with end-to-end Stripe Connect payment flow — viewer tips routed through split payments to creator payouts, with creator dashboard and earnings tracking.",
      outcome:
        "End-to-end payment flow from viewer tip to creator payout via Stripe Connect split payments — shipped with full creator dashboard",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe Connect"],
      url: null,
      relevance:
        "Stripe Connect architecture is the closest match to your subscription + booking deposit model — same webhook reconciliation pattern",
    },
  ],
  approach: [
    {
      step: "01",
      title: "Understand",
      description:
        "Start with the existing codebase — read every route, component, and type before writing a line. Map the mock data layer to a Supabase schema. One clarifying call if needed.",
      timeline: "Day 1–2",
    },
    {
      step: "02",
      title: "Build",
      description:
        "Working backend from day one: Supabase schema + RLS, Stripe webhooks, NextAuth/Clerk auth. Replace mock imports one module at a time — no big-bang rewrites, no dark periods. Progress visible every 2–3 days.",
      timeline: "Week 1–2",
    },
    {
      step: "03",
      title: "Ship",
      description:
        "Production deploy on Vercel: real-time availability via SSE, GDPR consent flows, email verification + 2FA. Clean TypeScript, zero errors, documented architecture you can hand off or extend.",
      timeline: "Week 2–3",
    },
    {
      step: "04",
      title: "Iterate",
      description:
        "Short feedback cycles — 24–48hr turnaround on change requests. No 2-week wait for a small adjustment. CET timezone overlap keeps communication tight.",
      timeline: "Ongoing",
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    },
    {
      category: "Backend & Database",
      items: ["Supabase", "Prisma", "PostgreSQL", "REST APIs", "tRPC"],
    },
    {
      category: "Payments & Auth",
      items: ["Stripe Connect", "Stripe Billing", "NextAuth", "Clerk", "2FA / OTP"],
    },
    {
      category: "Real-time & Messaging",
      items: ["Supabase Realtime", "WebSocket / SSE", "Pusher"],
    },
    {
      category: "AI & Dev Tooling",
      items: ["Claude Code", "Cursor", "Vercel", "GitHub Actions"],
    },
  ],
  cta: {
    headline: "Let's take this from prototype to production",
    subtext:
      "The demo in Tab 1 is already scoped to your spec. I can have the Supabase schema and Stripe webhooks wired within the first week.",
    availability: "30+ hrs/week · CET timezone · Available now",
  },
};
