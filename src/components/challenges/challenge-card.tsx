import type { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome?: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
  index: number;
  visualization?: ReactNode;
}

export function ChallengeCard({ challenge, index, visualization }: ChallengeCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className="linear-card bg-gradient-to-br from-accent/5 to-background border-primary/10 p-6 space-y-4"
      style={{
        animationDelay: `${index * 80}ms`,
        animationDuration: "200ms",
      }}
    >
      <div>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm font-medium text-primary/70 w-6 shrink-0 tabular-nums">
            {stepNumber}
          </span>
          <h3 className="text-lg font-semibold">{challenge.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1 pl-[calc(1.5rem+0.75rem)]">
          {challenge.description}
        </p>
      </div>

      {visualization && <div>{visualization}</div>}

      {challenge.outcome && (
        <div
          className="flex items-start gap-2 rounded-md px-3 py-2"
          style={{
            backgroundColor: "color-mix(in oklch, var(--success) 6%, transparent)",
            borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <TrendingUp className="h-4 w-4 mt-0.5 shrink-0 text-[color:var(--success)]" />
          <p className="text-sm font-medium text-[color:var(--success)]">{challenge.outcome}</p>
        </div>
      )}
    </div>
  );
}
