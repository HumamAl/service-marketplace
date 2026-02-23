"use client";

import { useState, useMemo } from "react";
import { bookings } from "@/data/mock-data";
import type { BookingStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ChevronUp, ChevronDown, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate, formatTime } from "@/lib/formatters";

type SortKey = "date" | "amount";
type SortDir = "asc" | "desc";

const STATUS_FILTERS: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "No-show", value: "no-show" },
];

function StatusBadge({ status }: { status: BookingStatus }) {
  const config: Record<BookingStatus, { label: string; className: string }> = {
    confirmed: {
      label: "Confirmed",
      className: "text-primary bg-primary/10",
    },
    pending: {
      label: "Pending",
      className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
    },
    completed: {
      label: "Completed",
      className: "text-[color:var(--success)] bg-[color:var(--success)]/10",
    },
    cancelled: {
      label: "Cancelled",
      className: "text-destructive bg-destructive/10",
    },
    "no-show": {
      label: "No-show",
      className: "text-muted-foreground bg-muted",
    },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium border-0 rounded-full", c.className)}>
      {c.label}
    </Badge>
  );
}

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const filtered = useMemo(() => {
    return bookings
      .filter((b) => {
        const matchesStatus = statusFilter === "all" || b.status === statusFilter;
        const matchesSearch =
          search === "" ||
          b.clientName.toLowerCase().includes(search.toLowerCase()) ||
          b.providerName.toLowerCase().includes(search.toLowerCase()) ||
          b.category.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const aVal = sortKey === "date" ? a.date : a.amount;
        const bVal = sortKey === "date" ? b.date : b.amount;
        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, statusFilter, sortKey, sortDir]);

  const totalAmount = filtered.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6 p-4 md:p-6 animate-tab-fade">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all client sessions and appointments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1.5" />
            Export
          </Button>
          <Button size="sm">New Booking</Button>
        </div>
      </div>

      {/* Summary Stat */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["all", "confirmed", "pending", "completed"] as const).map((s) => {
          const count = s === "all" ? bookings.length : bookings.filter((b) => b.status === s).length;
          return (
            <div key={s} className="linear-card p-4">
              <div className="text-xs text-muted-foreground capitalize mb-1">{s === "all" ? "Total" : s}</div>
              <div className="text-2xl font-bold font-mono">{count}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by client or provider..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setStatusFilter(value)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-md border border-border/60 transition-colors duration-150",
                statusFilter === value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "text-muted-foreground hover:bg-muted/80"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count + total */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{filtered.length} booking{filtered.length !== 1 ? "s" : ""}</span>
        <span>Total: <span className="font-mono font-medium text-foreground">{formatCurrency(totalAmount)}</span></span>
      </div>

      {/* Table */}
      <div className="linear-card p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide pl-4">
                Client
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Provider
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Category
              </TableHead>
              <TableHead
                className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-1">
                  Date
                  {sortKey === "date" ? (
                    sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3 opacity-30" />
                  )}
                </div>
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </TableHead>
              <TableHead
                className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide text-right cursor-pointer select-none"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center justify-end gap-1">
                  Amount
                  {sortKey === "amount" ? (
                    sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3 opacity-30" />
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                  No bookings match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-muted/40 transition-colors duration-100">
                  <TableCell className="py-2 px-4 font-medium text-sm">{booking.clientName}</TableCell>
                  <TableCell className="py-2 px-3 text-sm text-muted-foreground">{booking.providerName}</TableCell>
                  <TableCell className="py-2 px-3">
                    <span className="text-xs capitalize text-muted-foreground">{booking.category}</span>
                  </TableCell>
                  <TableCell className="py-2 px-3 text-sm">
                    <div className="font-medium">{formatDate(booking.date)}</div>
                    <div className="text-xs text-muted-foreground">{formatTime(booking.time)} · {booking.duration} min</div>
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell className="py-2 px-3 font-mono text-sm tabular-nums text-right font-medium">
                    {formatCurrency(booking.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
