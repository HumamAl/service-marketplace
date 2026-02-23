import type { LucideIcon } from "lucide-react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { CalendarCheck, Wifi, Database, Bell, Users } from "lucide-react";

interface Step {
  icon: LucideIcon;
  label: string;
  description: string;
  highlight?: boolean;
}

const steps: Step[] = [
  {
    icon: Users,
    label: "Client views slot",
    description: "SSE channel opens on mount",
  },
  {
    icon: CalendarCheck,
    label: "Provider accepts booking",
    description: "Supabase row updated",
    highlight: true,
  },
  {
    icon: Database,
    label: "DB triggers SSE event",
    description: "Postgres NOTIFY fired",
    highlight: true,
  },
  {
    icon: Wifi,
    label: "Event pushed to clients",
    description: "< 500ms delivery",
    highlight: true,
  },
  {
    icon: Bell,
    label: "Slot marked unavailable",
    description: "No page refresh needed",
  },
];

export function VizRealtimeAvailability() {
  return (
    <div className="space-y-2">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
        Availability update flow
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 rounded-lg border px-3 py-2"
                style={
                  step.highlight
                    ? {
                        borderColor: "color-mix(in oklch, var(--primary) 40%, transparent)",
                        backgroundColor: "color-mix(in oklch, var(--primary) 8%, transparent)",
                      }
                    : {
                        borderColor: "color-mix(in oklch, var(--border) 60%, transparent)",
                        backgroundColor: "var(--card)",
                      }
                }
              >
                <Icon
                  className="w-4 h-4 shrink-0"
                  style={{ color: step.highlight ? "var(--primary)" : "var(--muted-foreground)" }}
                />
                <div>
                  <p
                    className="text-xs font-medium"
                    style={{ color: step.highlight ? "var(--primary)" : "inherit" }}
                  >
                    {step.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <>
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
                  <ArrowDown className="w-4 h-4 text-muted-foreground shrink-0 sm:hidden" />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
