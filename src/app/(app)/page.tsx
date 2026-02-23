"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
// Recharts tooltip type is inferred via the content prop — use any for custom tooltips
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RechartsTooltipProps = any;
import {
  CalendarCheck,
  Users,
  TrendingUp,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  dashboardStats,
  bookingTrends,
  categoryBreakdown,
  cityMetrics,
  bookings,
} from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { BookingStatus } from "@/lib/types";

// ── Custom Tooltip ──────────────────────────────────────────────────────────

const ChartTooltip = ({
  active,
  payload,
  label,
}: RechartsTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-background p-3 shadow-sm">
      <p className="text-sm font-medium mb-1">{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color as string }}
          />
          {entry.name === "bookings"
            ? `Bookings: ${entry.value}`
            : entry.name === "revenue"
            ? `Revenue: ${formatCurrency(Number(entry.value))}`
            : `${entry.name}: ${entry.value}`}
        </p>
      ))}
    </div>
  );
};

const CategoryTooltip = ({
  active,
  payload,
}: RechartsTooltipProps) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-lg border border-border/60 bg-background p-3 shadow-sm">
      <p className="text-sm font-medium">{d.payload.category}</p>
      <p className="text-xs text-muted-foreground mt-0.5">
        Bookings: {d.payload.count}
      </p>
      <p className="text-xs text-muted-foreground">
        Revenue: {formatCurrency(d.payload.revenue)}
      </p>
    </div>
  );
};

// ── Status badge helper ─────────────────────────────────────────────────────

const statusConfig: Record<
  BookingStatus,
  { label: string; bg: string; color: string }
> = {
  confirmed: {
    label: "Confirmed",
    bg: "color-mix(in oklch, var(--primary) 12%, transparent)",
    color: "var(--primary)",
  },
  pending: {
    label: "Pending",
    bg: "color-mix(in oklch, var(--warning) 15%, transparent)",
    color: "var(--warning)",
  },
  completed: {
    label: "Completed",
    bg: "color-mix(in oklch, var(--success) 15%, transparent)",
    color: "var(--success)",
  },
  cancelled: {
    bg: "color-mix(in oklch, var(--destructive) 12%, transparent)",
    color: "var(--destructive)",
    label: "Cancelled",
  },
  "no-show": {
    label: "No-show",
    bg: "color-mix(in oklch, var(--muted-foreground) 15%, transparent)",
    color: "var(--muted-foreground)",
  },
};

// ── Page ────────────────────────────────────────────────────────────────────

type ChartView = "bookings" | "revenue";
type BookingFilter = "all" | "confirmed" | "pending" | "completed" | "cancelled";

export default function DashboardPage() {
  const [chartView, setChartView] = useState<ChartView>("bookings");
  const [bookingFilter, setBookingFilter] = useState<BookingFilter>("all");

  const stats = [
    {
      title: "Total Bookings",
      value: dashboardStats.totalBookings.toLocaleString(),
      description: `+${dashboardStats.bookingGrowth}% from last month`,
      icon: CalendarCheck,
      positive: true,
      growth: dashboardStats.bookingGrowth,
    },
    {
      title: "Active Providers",
      value: dashboardStats.activeProviders.toLocaleString(),
      description: `+${dashboardStats.providerGrowth}% new this month`,
      icon: Users,
      positive: true,
      growth: dashboardStats.providerGrowth,
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(dashboardStats.monthlyRevenue),
      description: `+${dashboardStats.revenueGrowth}% vs last month`,
      icon: TrendingUp,
      positive: true,
      growth: dashboardStats.revenueGrowth,
    },
    {
      title: "Avg Rating",
      value: dashboardStats.avgRating.toFixed(2),
      description: `+${dashboardStats.ratingChange} pts this month`,
      icon: Star,
      positive: true,
      growth: dashboardStats.ratingChange,
    },
  ];

  const filteredBookings =
    bookingFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === bookingFilter);

  const topCities = cityMetrics.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Platform overview — ServiceConnect Europe
        </p>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg animate-fade-in"
            style={{
              animationDelay: `${index * 80}ms`,
              animationDuration: "200ms",
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-primary/70" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {stat.positive ? (
                  <ArrowUpRight className="w-3 h-3 text-[var(--success)]" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-[var(--destructive)]" />
                )}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Chart Row ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area chart — takes 2/3 width */}
        <Card className="linear-card p-0 lg:col-span-2">
          <CardHeader className="px-6 pt-5 pb-3 flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-base font-semibold">
                Platform Growth
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                {chartView === "bookings"
                  ? "Monthly booking volume — last 7 months"
                  : "Monthly revenue (EUR) — last 7 months"}
              </p>
            </div>
            {/* Tab switcher */}
            <div className="flex items-center rounded-md border border-border/60 overflow-hidden shrink-0 text-xs">
              {(["bookings", "revenue"] as ChartView[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setChartView(v)}
                  className={`px-3 py-1.5 font-medium transition-colors ${
                    chartView === v
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart
                data={bookingTrends}
                margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="fillPrimary" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  strokeOpacity={0.5}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) =>
                    chartView === "revenue"
                      ? `€${(v / 1000).toFixed(0)}k`
                      : String(v)
                  }
                  width={42}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey={chartView}
                  fill="url(#fillPrimary)"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar chart — category breakdown */}
        <Card className="linear-card p-0">
          <CardHeader className="px-6 pt-5 pb-3">
            <CardTitle className="text-base font-semibold">
              By Category
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">
              Bookings per service type
            </p>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={categoryBreakdown}
                layout="vertical"
                margin={{ top: 0, right: 12, left: 8, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  strokeOpacity={0.5}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  width={56}
                />
                <Tooltip content={<CategoryTooltip />} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── Bottom Row: Bookings Table + City Leaderboard ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bookings table — takes 2/3 */}
        <Card className="linear-card lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
            <div>
              <CardTitle className="text-base font-semibold">
                Recent Bookings
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                {filteredBookings.length} booking
                {filteredBookings.length !== 1 ? "s" : ""} shown
              </p>
            </div>
            {/* Status filter */}
            <div className="flex flex-wrap gap-1">
              {(
                [
                  "all",
                  "confirmed",
                  "pending",
                  "completed",
                  "cancelled",
                ] as BookingFilter[]
              ).map((f) => (
                <button
                  key={f}
                  onClick={() => setBookingFilter(f)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors border ${
                    bookingFilter === f
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border/60 hover:text-foreground"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground pl-6">
                    Client
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Provider
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Date
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground text-right pr-6">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.slice(0, 8).map((booking) => {
                  const s = statusConfig[booking.status];
                  return (
                    <TableRow
                      key={booking.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="pl-6 font-medium text-sm">
                        {booking.clientName}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {booking.providerName}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(booking.date)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="rounded-full text-xs border-0"
                          style={{
                            backgroundColor: s.bg,
                            color: s.color,
                          }}
                        >
                          {s.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm tabular-nums text-right pr-6">
                        {formatCurrency(booking.amount)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* City leaderboard */}
        <Card className="linear-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Top Cities
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">
              By booking volume
            </p>
          </CardHeader>
          <CardContent className="px-0 pb-2">
            <div className="space-y-1">
              {topCities.map((city, idx) => {
                const maxBookings = topCities[0].bookings;
                const pct = (city.bookings / maxBookings) * 100;
                return (
                  <div
                    key={city.city}
                    className="flex items-center gap-3 px-6 py-2.5 hover:bg-muted/30 transition-colors"
                  >
                    {/* Rank */}
                    <span className="text-xs font-mono text-muted-foreground w-4 shrink-0">
                      {idx + 1}
                    </span>
                    {/* City + bar */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium truncate">
                          {city.city}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2 shrink-0">
                          {city.bookings}
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-primary/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    {/* Revenue */}
                    <span className="text-xs font-mono tabular-nums text-muted-foreground shrink-0">
                      {formatCurrency(city.revenue)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Summary footer */}
            <div className="mx-6 mt-3 pt-3 border-t border-border/60 flex justify-between text-xs text-muted-foreground">
              <span>{cityMetrics.length} cities tracked</span>
              <span>
                {formatCurrency(
                  cityMetrics.reduce((sum, c) => sum + c.revenue, 0)
                )}{" "}
                total
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
