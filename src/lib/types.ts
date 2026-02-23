import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ── App-specific types ──

export type ProviderStatus = "online" | "busy" | "offline";
export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled" | "no-show";
export type SubscriptionTier = "basic" | "premium" | "enterprise";
export type ServiceCategory =
  | "wellness"
  | "beauty"
  | "therapy"
  | "coaching"
  | "fitness"
  | "nutrition"
  | "massage"
  | "holistic";

export interface Provider {
  id: string;
  name: string;
  avatar: string;
  city: string;
  country: string;
  categories: ServiceCategory[];
  rating: number;
  reviewCount: number;
  responseTime: number;
  hourlyRate: number;
  status: ProviderStatus;
  subscriptionTier: SubscriptionTier;
  verified: boolean;
  completedBookings: number;
  joinedDate: string;
  bio: string;
  languages: string[];
  availableSlots: number;
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;
  category: ServiceCategory;
  status: BookingStatus;
  date: string;
  time: string;
  duration: number;
  amount: number;
  notes: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export interface Review {
  id: string;
  clientName: string;
  providerId: string;
  providerName: string;
  rating: number;
  comment: string;
  date: string;
  category: ServiceCategory;
}

export interface DashboardStats {
  totalBookings: number;
  activeProviders: number;
  monthlyRevenue: number;
  avgRating: number;
  bookingGrowth: number;
  providerGrowth: number;
  revenueGrowth: number;
  ratingChange: number;
}

export interface ChartDataPoint {
  name: string;
  bookings: number;
  revenue: number;
}

export interface CategoryBreakdown {
  category: string;
  count: number;
  revenue: number;
  fill: string;
}

export interface CityMetric {
  city: string;
  providers: number;
  bookings: number;
  avgRating: number;
  revenue: number;
}

export interface SearchResult {
  providerId: string;
  providerName: string;
  matchScore: number;
  category: ServiceCategory;
  city: string;
  rating: number;
  hourlyRate: number;
  availableSlots: number;
  matchReason: string;
}
