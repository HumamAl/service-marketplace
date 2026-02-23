"use client";

import { useState, useMemo } from "react";
import { providers } from "@/data/mock-data";
import type { ServiceCategory } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, CheckCircle, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES: { label: string; value: ServiceCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Wellness", value: "wellness" },
  { label: "Beauty", value: "beauty" },
  { label: "Therapy", value: "therapy" },
  { label: "Coaching", value: "coaching" },
  { label: "Fitness", value: "fitness" },
  { label: "Nutrition", value: "nutrition" },
  { label: "Massage", value: "massage" },
  { label: "Holistic", value: "holistic" },
];

function StatusDot({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-block w-2 h-2 rounded-full shrink-0",
        status === "online" && "bg-[color:var(--success)]",
        status === "busy" && "bg-[color:var(--warning)]",
        status === "offline" && "bg-muted-foreground/40"
      )}
    />
  );
}

function ProviderCard({ provider, index }: { provider: typeof providers[0]; index: number }) {
  return (
    <div
      className="linear-card p-5 flex flex-col gap-4 animate-fade-in"
      style={{ animationDelay: `${index * 60}ms`, animationDuration: "200ms" }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">{provider.avatar}</span>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5">
            <StatusDot status={provider.status} />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold truncate">{provider.name}</span>
            {provider.verified && (
              <CheckCircle className="w-3.5 h-3.5 text-[color:var(--success)] shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <MapPin className="w-3 h-3" />
            <span>{provider.city}, {provider.country}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm font-semibold font-mono">€{provider.hourlyRate}/hr</div>
          <div className="flex items-center gap-0.5 justify-end mt-0.5">
            <Star className="w-3 h-3 fill-[color:var(--warning)] text-[color:var(--warning)]" />
            <span className="text-xs font-medium">{provider.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({provider.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-1.5">
        {provider.categories.map((cat) => (
          <Badge
            key={cat}
            variant="outline"
            className="text-xs rounded-full border-border/60 text-muted-foreground capitalize px-2 py-0"
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Bio */}
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{provider.bio}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-border/60">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>{provider.availableSlots > 0 ? `${provider.availableSlots} slots` : "Fully booked"}</span>
        </div>
        <Button size="sm" variant="outline" className="h-7 text-xs rounded-md">
          View Profile
        </Button>
      </div>
    </div>
  );
}

export default function ProvidersPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "online" | "available">("all");

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()) ||
        p.country.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "all" || p.categories.includes(activeCategory as ServiceCategory);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "online" && p.status === "online") ||
        (statusFilter === "available" && p.availableSlots > 0);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, activeCategory, statusFilter]);

  return (
    <div className="space-y-6 p-4 md:p-6 animate-tab-fade">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Providers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {providers.length} certified wellness professionals across Europe
          </p>
        </div>
        <Button size="sm">Add Provider</Button>
      </div>

      {/* Search + Status Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 min-w-[200px] w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "online", "available"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-md border border-border/60 transition-colors duration-150",
                statusFilter === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "text-muted-foreground hover:bg-muted/80"
              )}
            >
              {s === "all" ? "All" : s === "online" ? "Online" : "Available"}
            </button>
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            {filtered.length} provider{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveCategory(value)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 capitalize",
              activeCategory === value
                ? "bg-primary/10 text-primary border-primary/30 font-medium"
                : "border-border/60 text-muted-foreground hover:border-primary/20 hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Provider Grid */}
      {filtered.length === 0 ? (
        <div className="linear-card p-16 text-center">
          <p className="text-sm text-muted-foreground">No providers match your filters.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => {
              setSearch("");
              setActiveCategory("all");
              setStatusFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((provider, index) => (
            <ProviderCard key={provider.id} provider={provider} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
