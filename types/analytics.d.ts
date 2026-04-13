/**
 * Analytics System Type Definitions
 * Provides TypeScript types for Cloudflare Pages Functions and D1 database
 */

export interface Env {
  DB: D1Database;
  ADMIN_PASSWORD?: string;
}

export interface AnalyticsStats {
  totalVisits: number;
  uniqueIPs: number;
}

export interface CountryStat {
  country: string;
  count: number;
}

export interface PageStat {
  url: string;
  count: number;
  unique_visitors: number;
}

export interface VisitorLog {
  id: number;
  ip: string;
  url: string;
  user_agent: string;
  country: string;
  timestamp: string;
}

export interface TimeSeriesData {
  date: string;
  visits: number;
  unique_visitors: number;
}

export interface HourlyStat {
  hour: number;
  visits: number;
}

export interface CompanyVisits {
  [companyName: string]: number;
}

export interface AnalyticsResponse {
  stats: AnalyticsStats;
  byCountry: CountryStat[];
  topPages: PageStat[];
  recentLogs: VisitorLog[];
  timeSeries: TimeSeriesData[];
  companyVisits: CompanyVisits;
  hourlyStats: HourlyStat[];
  timestamp: string;
}

export interface CompanyPattern {
  name: string;
  pattern: RegExp;
}
