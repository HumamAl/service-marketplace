"use client";

import type { ReactNode } from "react";
import { ChallengeList } from "./challenge-list";
import { VizSupabaseMigration } from "./viz-supabase-migration";
import { VizRealtimeAvailability } from "./viz-realtime-availability";
import { VizStripePayments } from "./viz-stripe-payments";
import { VizAuthHardening } from "./viz-auth-hardening";
import { VizMessaging } from "./viz-messaging";

interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome?: string;
}

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "challenge-1": <VizSupabaseMigration />,
    "challenge-2": <VizRealtimeAvailability />,
    "challenge-3": <VizStripePayments />,
    "challenge-4": <VizAuthHardening />,
    "challenge-5": <VizMessaging />,
  };

  return <ChallengeList challenges={challenges} visualizations={visualizations} />;
}
