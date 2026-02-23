import type { LucideIcon } from "lucide-react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { UserPlus, Mail, ShieldCheck, KeyRound, Lock } from "lucide-react";

interface AuthStep {
  icon: LucideIcon;
  label: string;
  description: string;
  highlight?: boolean;
  isNew?: boolean;
}

const protoSteps: AuthStep[] = [
  { icon: UserPlus, label: "Register", description: "Email + password" },
  { icon: Lock, label: "Session created", description: "NextAuth JWT" },
];

const prodSteps: AuthStep[] = [
  { icon: UserPlus, label: "Register", description: "Email + password", highlight: true },
  {
    icon: Mail,
    label: "Email verification",
    description: "OTP sent via Resend",
    highlight: true,
    isNew: true,
  },
  {
    icon: ShieldCheck,
    label: "2FA enrollment",
    description: "TOTP or SMS OTP",
    highlight: true,
    isNew: true,
  },
  {
    icon: KeyRound,
    label: "Scoped session",
    description: "Role-based JWT claims",
    highlight: true,
    isNew: true,
  },
  {
    icon: Lock,
    label: "GDPR consent",
    description: "Data processing recorded",
    highlight: true,
    isNew: true,
  },
];

function StepRow({ steps }: { steps: AuthStep[] }) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <div key={step.label + i} className="flex items-center gap-2">
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
                style={{
                  color: step.highlight ? "var(--primary)" : "var(--muted-foreground)",
                }}
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <p
                    className="text-xs font-medium"
                    style={{ color: step.highlight ? "var(--primary)" : "inherit" }}
                  >
                    {step.label}
                  </p>
                  {step.isNew && (
                    <span
                      className="text-[9px] font-mono font-bold px-1 rounded"
                      style={{
                        backgroundColor: "color-mix(in oklch, var(--success) 15%, transparent)",
                        color: "var(--success)",
                      }}
                    >
                      NEW
                    </span>
                  )}
                </div>
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
  );
}

export function VizAuthHardening() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Prototype flow (2 steps)
        </p>
        <StepRow steps={protoSteps} />
      </div>
      <div
        className="border-t"
        style={{ borderColor: "color-mix(in oklch, var(--border) 60%, transparent)" }}
      />
      <div className="space-y-2">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Production flow (5 steps — GDPR-ready)
        </p>
        <StepRow steps={prodSteps} />
      </div>
    </div>
  );
}
