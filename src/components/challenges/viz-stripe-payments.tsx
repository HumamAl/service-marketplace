import type { LucideIcon } from "lucide-react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Globe, CreditCard, Webhook, Database, RefreshCw } from "lucide-react";

interface ArchNode {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  type: "frontend" | "external" | "backend" | "database";
}

const subscriptionFlow: ArchNode[] = [
  {
    icon: Globe,
    label: "Provider signs up",
    sublabel: "Selects Basic / Premium",
    type: "frontend",
  },
  {
    icon: CreditCard,
    label: "Stripe Checkout",
    sublabel: "Subscription created",
    type: "external",
  },
  {
    icon: Webhook,
    label: "Webhook received",
    sublabel: "invoice.paid event",
    type: "backend",
  },
  {
    icon: Database,
    label: "Supabase updated",
    sublabel: "subscriptionTier set",
    type: "database",
  },
];

const depositFlow: ArchNode[] = [
  {
    icon: Globe,
    label: "Client books slot",
    sublabel: "Deposit amount shown",
    type: "frontend",
  },
  {
    icon: CreditCard,
    label: "Stripe PaymentIntent",
    sublabel: "Deposit captured",
    type: "external",
  },
  {
    icon: Webhook,
    label: "Webhook received",
    sublabel: "payment_intent.succeeded",
    type: "backend",
  },
  {
    icon: RefreshCw,
    label: "Booking confirmed",
    sublabel: "Deposit released on completion",
    type: "database",
  },
];

const nodeColors: Record<ArchNode["type"], { border: string; bg: string; text: string }> = {
  frontend: {
    border: "color-mix(in oklch, var(--primary) 30%, transparent)",
    bg: "color-mix(in oklch, var(--primary) 8%, transparent)",
    text: "var(--primary)",
  },
  external: {
    border: "color-mix(in oklch, var(--warning) 30%, transparent)",
    bg: "color-mix(in oklch, var(--warning) 8%, transparent)",
    text: "var(--warning)",
  },
  backend: {
    border: "color-mix(in oklch, var(--border) 60%, transparent)",
    bg: "var(--card)",
    text: "var(--muted-foreground)",
  },
  database: {
    border: "color-mix(in oklch, var(--success) 25%, transparent)",
    bg: "color-mix(in oklch, var(--success) 6%, transparent)",
    text: "var(--success)",
  },
};

function FlowRow({ nodes, label }: { nodes: ArchNode[]; label: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const colors = nodeColors[node.type];
          return (
            <div key={node.label + i} className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 rounded-lg border px-3 py-2"
                style={{ borderColor: colors.border, backgroundColor: colors.bg }}
              >
                <Icon className="w-4 h-4 shrink-0" style={{ color: colors.text }} />
                <div>
                  <p className="text-xs font-medium" style={{ color: colors.text }}>
                    {node.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{node.sublabel}</p>
                </div>
              </div>
              {i < nodes.length - 1 && (
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

export function VizStripePayments() {
  return (
    <div className="space-y-4">
      <FlowRow nodes={subscriptionFlow} label="Flow A — Provider subscription ($99/mo)" />
      <div
        className="border-t"
        style={{ borderColor: "color-mix(in oklch, var(--border) 60%, transparent)" }}
      />
      <FlowRow nodes={depositFlow} label="Flow B — Booking deposit (per session)" />
    </div>
  );
}
