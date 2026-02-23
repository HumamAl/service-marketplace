"use client";

import { useState, useMemo } from "react";
import { searchResults } from "@/data/mock-data";
import type { SearchResult } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, MapPin, Clock, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SortMode = "relevance" | "rating" | "price";

function MatchScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90
      ? "text-[color:var(--success)] bg-[color:var(--success)]/10"
      : score >= 80
      ? "text-primary bg-primary/10"
      : "text-[color:var(--warning)] bg-[color:var(--warning)]/10";
  return (
    <Badge variant="outline" className={cn("text-xs font-mono border-0 rounded-full font-semibold", color)}>
      {score}% match
    </Badge>
  );
}

function ResultCard({ result, index }: { result: SearchResult; index: number }) {
  return (
    <div
      className="linear-card p-5 flex flex-col sm:flex-row gap-4 animate-fade-in"
      style={{ animationDelay: `${index * 70}ms`, animationDuration: "200ms" }}
    >
      {/* Left: Avatar + name */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-primary font-semibold text-sm">
            {result.providerName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold">{result.providerName}</span>
            <MatchScoreBadge score={result.matchScore} />
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span className="capitalize">{result.category}</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {result.city}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[color:var(--warning)] text-[color:var(--warning)]" />
              {result.rating.toFixed(1)}
            </span>
          </div>
          {/* AI Match Reason */}
          <div className="mt-2 flex items-start gap-1.5">
            <Sparkles className="w-3 h-3 text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">{result.matchReason}</p>
          </div>
        </div>
      </div>

      {/* Right: Stats + CTA */}
      <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2 sm:shrink-0">
        <div className="text-right">
          <div className="font-mono text-sm font-semibold">€{result.hourlyRate}/hr</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5 justify-end">
            <Clock className="w-3 h-3" />
            {result.availableSlots > 0
              ? `${result.availableSlots} slots`
              : "Waitlist"}
          </div>
        </div>
        <Button
          size="sm"
          variant={result.availableSlots > 0 ? "default" : "outline"}
          className="h-7 text-xs"
        >
          {result.availableSlots > 0 ? "Book Now" : "Join Waitlist"}
        </Button>
      </div>
    </div>
  );
}

function ShimmerCard() {
  return (
    <div className="linear-card p-5 flex gap-4 animate-pulse">
      <div className="w-11 h-11 rounded-lg bg-muted shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded w-1/3" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-3 bg-muted rounded w-3/4" />
      </div>
    </div>
  );
}

const SUGGESTED_QUERIES = [
  "Massage therapist in Berlin this week",
  "Executive coach for burnout recovery",
  "Nordic beauty treatment Copenhagen",
  "Plant-based nutrition Barcelona",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("relevance");

  const sorted = useMemo(() => {
    return [...searchResults].sort((a, b) => {
      if (sortMode === "relevance") return b.matchScore - a.matchScore;
      if (sortMode === "rating") return b.rating - a.rating;
      if (sortMode === "price") return a.hourlyRate - b.hourlyRate;
      return 0;
    });
  }, [sortMode]);

  function handleSearch(q?: string) {
    const searchQuery = q ?? query;
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setHasSearched(false);
    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
    }, 1200);
  }

  function handleSuggestedQuery(q: string) {
    setQuery(q);
    handleSearch(q);
  }

  return (
    <div className="space-y-6 p-4 md:p-6 animate-tab-fade">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Provider Search</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Describe what you need — our AI matches you to the best providers
        </p>
      </div>

      {/* Search Input */}
      <div className="linear-card p-4 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <Input
              placeholder="Ask AI to find a provider..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-9 pr-4"
            />
          </div>
          <Button
            onClick={() => handleSearch()}
            disabled={isLoading || !query.trim()}
            className="shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span className="ml-1.5 hidden sm:inline">Search</span>
          </Button>
        </div>

        {/* Suggested queries */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Try:</span>
          {SUGGESTED_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => handleSuggestedQuery(q)}
              className="text-xs px-2.5 py-1 rounded-full border border-border/60 text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors duration-150"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Loading shimmer */}
      {isLoading && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span>Finding the best providers for you...</span>
          </div>
          {[1, 2, 3].map((i) => <ShimmerCard key={i} />)}
        </div>
      )}

      {/* Results */}
      {hasSearched && !isLoading && (
        <>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-sm text-muted-foreground">
              {sorted.length} providers found
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Sort by:</span>
              {(["relevance", "rating", "price"] as SortMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSortMode(mode)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-md border border-border/60 transition-colors duration-150 capitalize",
                    sortMode === mode
                      ? "bg-primary text-primary-foreground border-primary"
                      : "text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {sorted.map((result, index) => (
              <ResultCard key={result.providerId} result={result} index={index} />
            ))}
          </div>
        </>
      )}

      {/* Empty — before first search */}
      {!hasSearched && !isLoading && (
        <div className="linear-card p-16 text-center">
          <Sparkles className="w-8 h-8 text-primary/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Enter your wellness needs above to find the perfect provider
          </p>
        </div>
      )}
    </div>
  );
}
