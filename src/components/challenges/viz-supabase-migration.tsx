import { XCircle, CheckCircle2 } from "lucide-react";

const beforeItems = [
  "Hardcoded TypeScript arrays reset on every deploy",
  "No persistence — bookings vanish on page refresh",
  "No relational integrity between providers and bookings",
  "Multi-user state impossible without a real DB",
];

const afterItems = [
  "Postgres tables with typed Supabase client (supabase-js v2)",
  "Row Level Security — each user sees only their own data",
  "Foreign keys enforce booking ↔ provider relationships",
  "Real-time subscriptions via Supabase Realtime channels",
];

export function VizSupabaseMigration() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div
        className="rounded-lg p-4 space-y-3"
        style={{
          backgroundColor: "color-mix(in oklch, var(--destructive) 8%, transparent)",
          borderColor: "color-mix(in oklch, var(--destructive) 15%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <p className="text-xs font-mono font-medium uppercase tracking-widest text-destructive">
          Current — Prototype
        </p>
        <ul className="space-y-2">
          {beforeItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <XCircle className="h-4 w-4 shrink-0 mt-0.5 text-destructive" />
              <span className="text-destructive/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="rounded-lg p-4 space-y-3"
        style={{
          backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
          borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <p className="text-xs font-mono font-medium uppercase tracking-widest text-[color:var(--success)]">
          Production — Supabase
        </p>
        <ul className="space-y-2">
          {afterItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[color:var(--success)]" />
              <span className="text-[color:var(--success)]/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
