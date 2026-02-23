import type { LucideIcon } from "lucide-react";
import { MessageSquare, Lock, Bell, Smartphone, Database } from "lucide-react";

interface SystemNode {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  type: "frontend" | "backend" | "external" | "database";
}

const nodeColors = {
  frontend: {
    border: "color-mix(in oklch, var(--primary) 30%, transparent)",
    bg: "color-mix(in oklch, var(--primary) 8%, transparent)",
    text: "var(--primary)",
  },
  backend: {
    border: "color-mix(in oklch, var(--border) 60%, transparent)",
    bg: "var(--card)",
    text: "var(--muted-foreground)",
  },
  external: {
    border: "color-mix(in oklch, var(--warning) 30%, transparent)",
    bg: "color-mix(in oklch, var(--warning) 8%, transparent)",
    text: "var(--warning)",
  },
  database: {
    border: "color-mix(in oklch, var(--success) 25%, transparent)",
    bg: "color-mix(in oklch, var(--success) 6%, transparent)",
    text: "var(--success)",
  },
};

const components: SystemNode[] = [
  {
    icon: MessageSquare,
    label: "In-app Chat",
    sublabel: "Next.js client",
    type: "frontend",
  },
  {
    icon: Lock,
    label: "E2E Encryption",
    sublabel: "Signal protocol",
    type: "backend",
  },
  {
    icon: Database,
    label: "Message store",
    sublabel: "Supabase + RLS",
    type: "database",
  },
  {
    icon: Bell,
    label: "Push (web)",
    sublabel: "Web Push API",
    type: "backend",
  },
  {
    icon: Smartphone,
    label: "WhatsApp / Telegram",
    sublabel: "Last-mile delivery",
    type: "external",
  },
];

export function VizMessaging() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Messaging architecture
      </p>
      <div className="flex flex-wrap gap-2 items-center">
        {components.map((node, i) => {
          const Icon = node.icon;
          const colors = nodeColors[node.type];
          return (
            <div key={node.label} className="flex items-center gap-2">
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
              {i < components.length - 1 && (
                <span className="text-muted-foreground text-sm">+</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
        {[
          { label: "Message delivery", value: "< 200ms", status: "success" },
          { label: "Provider response rate", value: "3× faster", status: "success" },
          { label: "Booking confirmation", value: "61% → 89%", status: "success" },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg px-3 py-2 text-center"
            style={{
              backgroundColor: "color-mix(in oklch, var(--success) 6%, transparent)",
              borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <p className="text-sm font-bold text-[color:var(--success)]">{metric.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
