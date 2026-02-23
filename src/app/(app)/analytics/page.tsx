"use client";

import { useState, useMemo } from "react";
import { cityMetrics, providers, reviews, categoryBreakdown } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Star, ChevronUp, ChevronDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";

type CitySortKey = "city" | "providers" | "bookings" | "avgRating" | "revenue";
type SortDir = "asc" | "desc";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "w-3 h-3",
            i <= Math.round(rating)
              ? "fill-[color:var(--warning)] text-[color:var(--warning)]"
              : "text-muted-foreground/30"
          )}
        />
      ))}
      <span className="text-xs font-mono ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="linear-card bg-card px-3 py-2 text-xs space-y-1">
      {label && <div className="font-medium mb-1">{label}</div>}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-mono font-medium">
            {p.name.toLowerCase().includes("revenue") ? formatCurrency(p.value) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function PieTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="linear-card bg-card px-3 py-2 text-xs">
      <div className="font-medium">{p.name}</div>
      <div className="font-mono">{p.value} bookings</div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [citySortKey, setCitySortKey] = useState<CitySortKey>("bookings");
  const [citySortDir, setCitySortDir] = useState<SortDir>("desc");
  const [chartView, setChartView] = useState<"bookings" | "revenue">("bookings");

  function handleCitySort(key: CitySortKey) {
    if (citySortKey === key) {
      setCitySortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setCitySortKey(key);
      setCitySortDir("desc");
    }
  }

  const sortedCities = useMemo(() => {
    return [...cityMetrics].sort((a, b) => {
      const aVal = a[citySortKey];
      const bVal = b[citySortKey];
      if (aVal < bVal) return citySortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return citySortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [citySortKey, citySortDir]);

  const topProviders = useMemo(
    () => [...providers].sort((a, b) => b.rating - a.rating).slice(0, 6),
    []
  );

  const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--primary)",
    "var(--chart-2)",
    "var(--chart-4)",
  ];

  function SortIcon({ col }: { col: CitySortKey }) {
    if (citySortKey !== col) return <ChevronDown className="w-3 h-3 opacity-30" />;
    return citySortDir === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 animate-tab-fade">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Performance metrics across cities, providers, and categories
        </p>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category Bar Chart */}
        <div className="linear-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold">Category Volume</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Bookings by service type</p>
            </div>
            <div className="flex gap-1">
              {(["bookings", "revenue"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setChartView(v)}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-md transition-colors duration-150 capitalize",
                    chartView === v
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryBreakdown} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.5} vertical={false} />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={chartView === "revenue" ? (v) => `€${v / 1000}k` : undefined}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey={chartView === "bookings" ? "count" : "revenue"}
                name={chartView === "bookings" ? "Bookings" : "Revenue"}
                radius={[3, 3, 0, 0]}
                fill="var(--primary)"
              >
                {categoryBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="linear-card p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold">Category Distribution</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Share of total bookings</p>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="category"
                >
                  {categoryBreakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 shrink-0">
              {categoryBreakdown.slice(0, 5).map((cat, i) => (
                <div key={cat.category} className="flex items-center gap-2 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ background: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-muted-foreground">{cat.category}</span>
                  <span className="font-mono font-medium ml-1">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* City Metrics Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">City Performance</h2>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>10 active cities</span>
          </div>
        </div>
        <div className="linear-card p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {(
                  [
                    { key: "city", label: "City" },
                    { key: "providers", label: "Providers" },
                    { key: "bookings", label: "Bookings" },
                    { key: "avgRating", label: "Avg Rating" },
                    { key: "revenue", label: "Revenue" },
                  ] as { key: CitySortKey; label: string }[]
                ).map(({ key, label }) => (
                  <TableHead
                    key={key}
                    className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                    onClick={() => handleCitySort(key)}
                  >
                    <div className={cn("flex items-center gap-1", key !== "city" && "justify-end")}>
                      {label}
                      <SortIcon col={key} />
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCities.map((city, i) => (
                <TableRow key={city.city} className="hover:bg-muted/40 transition-colors duration-100">
                  <TableCell className="py-2 px-4 font-medium text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-mono w-5">{i + 1}</span>
                      {city.city}
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-4 font-mono text-sm tabular-nums text-right">{city.providers}</TableCell>
                  <TableCell className="py-2 px-4 font-mono text-sm tabular-nums text-right">{city.bookings}</TableCell>
                  <TableCell className="py-2 px-4 text-right">
                    <div className="flex justify-end">
                      <StarRating rating={city.avgRating} />
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-4 font-mono text-sm tabular-nums text-right font-medium">
                    {formatCurrency(city.revenue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Bottom Row: Top Providers + Recent Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Providers by Rating */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Top Providers</h2>
          <div className="linear-card p-0">
            {topProviders.map((provider, i) => (
              <div
                key={provider.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors duration-100",
                  i < topProviders.length - 1 && "border-b border-border/60"
                )}
              >
                <span className="text-xs font-mono text-muted-foreground w-4 shrink-0">{i + 1}</span>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary text-xs font-semibold">{provider.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{provider.name}</div>
                  <div className="text-xs text-muted-foreground">{provider.city}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="w-3 h-3 fill-[color:var(--warning)] text-[color:var(--warning)]" />
                  <span className="text-xs font-mono font-semibold">{provider.rating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">({provider.reviewCount})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Recent Reviews</h2>
          <div className="space-y-3">
            {reviews.slice(0, 4).map((review) => (
              <div key={review.id} className="linear-card p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-medium">{review.clientName}</div>
                    <div className="text-xs text-muted-foreground">{review.providerName}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-3 h-3",
                          i <= review.rating
                            ? "fill-[color:var(--warning)] text-[color:var(--warning)]"
                            : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {review.comment}
                </p>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="text-xs rounded-full border-border/60 text-muted-foreground capitalize px-2 py-0"
                  >
                    {review.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
