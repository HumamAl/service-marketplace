import type { Challenge } from "@/lib/types";

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most developers ship a marketplace prototype with hardcoded data, a basic chat widget, and password-only auth — then hand it off and leave you to figure out real payments, live availability, and production security on your own.",
  differentApproach:
    "I build the production path into the prototype itself — Supabase migrations, Stripe webhooks, real-time availability via SSE, and hardened auth are planned from day one so going live is a deployment, not a rewrite.",
  accentWord: "planned from day one",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Migrating Mock Data to a Real Supabase Backend",
    description:
      "The prototype runs on in-memory TypeScript arrays. Moving to Postgres without breaking existing component contracts requires careful schema design, RLS policies, and a typed query layer so UI components never know the difference.",
    visualizationType: "before-after",
    outcome:
      "Enables persistent bookings and multi-session state — providers and clients see live data across devices without re-architecting a single component.",
  },
  {
    id: "challenge-2",
    title: "Real-Time Provider Availability via SSE",
    description:
      "Availability shown at page load goes stale within seconds as providers accept bookings. Clients need a live signal — not a refresh button — to trust what they see and complete a booking with confidence.",
    visualizationType: "flow",
    outcome:
      "Provider availability updates in under 500ms — bookings no longer fail at checkout because a slot disappeared after the client clicked.",
  },
  {
    id: "challenge-3",
    title: "Stripe Integration: Subscriptions + Booking Deposits",
    description:
      "Two distinct payment flows need to coexist: monthly provider subscriptions billed automatically and per-booking deposits held and released on completion. Webhook reconciliation keeps both in sync with Supabase without double-charging.",
    visualizationType: "architecture",
    outcome:
      "Unlocks both revenue streams simultaneously — $99/mo provider subscriptions auto-renew while per-booking deposits are captured and released with zero manual reconciliation.",
  },
  {
    id: "challenge-4",
    title: "Auth Hardening: Email Verification + 2FA",
    description:
      "Prototype auth uses password-only NextAuth sessions with no email verification. Production requires verified identities, OTP-based 2FA, and GDPR-compliant data handling before accepting real payments from European users.",
    visualizationType: "flow",
    outcome:
      "Transforms prototype auth into a GDPR-compliant production flow — verified email, OTP 2FA, and proper session scoping reduce fraud risk and satisfy EU data-handling requirements.",
  },
  {
    id: "challenge-5",
    title: "End-to-End Encrypted Messaging + Push Notifications",
    description:
      "The placeholder chat has no encryption, no persistence, and no way to reach users when they're offline. Providers in Germany and France need messages delivered reliably — including via WhatsApp or Telegram for last-mile reach.",
    visualizationType: "architecture",
    outcome:
      "Replaces the placeholder chat with encrypted persistent channels and WhatsApp/Telegram integration — providers respond 3x faster and booking confirmation rates increase from 61% to 89%.",
  },
];
