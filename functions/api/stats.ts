import { PagesFunction } from '@cloudflare/workers-types';

interface Env {
  DB: D1Database;
  ADMIN_PASSWORD?: string;
}

// Company detection patterns
const COMPANY_PATTERNS = {
  'Microsoft': /\b(microsoft|live|outlook|msn|office)\b/i,
  'AMD': /\b(amd\.com|advanced.*micro.*devices)\b/i,
  'Google': /\b(google|gmail|youtube|chromium|chrome)\b/i,
  'Amazon': /\b(amazon|aws)\b/i,
  'Apple': /\b(apple|icloud|macintosh|iphone|ipad)\b/i,
  'Meta': /\b(meta|facebook|instagram|whatsapp|oculus)\b/i,
  'Netflix': /\b(netflix)\b/i,
  'Intel': /\b(intel)\b/i,
  'NVIDIA': /\b(nvidia|geforce)\b/i,
};

// Internal IPs to exclude from statistics (add your own IPs here)
const INTERNAL_IPS = [
  '240d:1a:41e:2b00:4427:2857:eee3:3d79', // Your IPv6
  '219.113.86.5', // Add other internal IPs if needed
];

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  // Simple password authentication via query parameter
  const url = new URL(request.url);
  const password = url.searchParams.get('password');

  // Use environment variable or default password
  const expectedPassword = env.ADMIN_PASSWORD || 'admin123';

  if (password !== expectedPassword) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'WWW-Authenticate': 'Bearer',
        },
      }
    );
  }

  try {
    // Build WHERE clause to exclude internal IPs
    const internalIPFilter = INTERNAL_IPS.map(() => '?').join(',');
    const excludeInternalSQL = INTERNAL_IPS.length > 0
      ? `WHERE ip NOT IN (${internalIPFilter})`
      : '';

    // Get basic stats (excluding internal IPs)
    const totalVisits = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM logs ${excludeInternalSQL}`
    ).bind(...INTERNAL_IPS).first<{ count: number }>();

    const uniqueIPs = await env.DB.prepare(
      `SELECT COUNT(DISTINCT ip) as count FROM logs ${excludeInternalSQL}`
    ).bind(...INTERNAL_IPS).first<{ count: number }>();

    // Get visits by country
    const countryStats = await env.DB.prepare(
      'SELECT country, COUNT(*) as count FROM logs GROUP BY country ORDER BY count DESC LIMIT 20'
    ).all<{ country: string; count: number }>();

    // Get top pages
    const topPages = await env.DB.prepare(
      `SELECT
        url,
        COUNT(*) as count,
        COUNT(DISTINCT ip) as unique_visitors
      FROM logs
      GROUP BY url
      ORDER BY count DESC
      LIMIT 20`
    ).all<{ url: string; count: number; unique_visitors: number }>();

    // Get recent logs
    const recentLogs = await env.DB.prepare(
      `SELECT * FROM logs
      ORDER BY timestamp DESC
      LIMIT 100`
    ).all<{
      id: number;
      ip: string;
      url: string;
      user_agent: string;
      country: string;
      timestamp: string;
    }>();

    // Get time series data (last 7 days)
    const timeSeries = await env.DB.prepare(
      `SELECT
        DATE(timestamp) as date,
        COUNT(*) as visits,
        COUNT(DISTINCT ip) as unique_visitors
      FROM logs
      WHERE timestamp >= datetime('now', '-7 days')
      GROUP BY DATE(timestamp)
      ORDER BY date ASC`
    ).all<{ date: string; visits: number; unique_visitors: number }>();

    // Detect companies from user agents and IPs
    const companyVisits: Record<string, number> = {};

    for (const log of recentLogs.results || []) {
      const userAgent = log.user_agent || '';
      const ip = log.ip || '';

      for (const [company, pattern] of Object.entries(COMPANY_PATTERNS)) {
        if (pattern.test(userAgent) || pattern.test(ip)) {
          companyVisits[company] = (companyVisits[company] || 0) + 1;
          break; // Count each visit only once
        }
      }
    }

    // Get hourly distribution for today
    const hourlyStats = await env.DB.prepare(
      `SELECT
        CAST(strftime('%H', timestamp) AS INTEGER) as hour,
        COUNT(*) as visits
      FROM logs
      WHERE DATE(timestamp) = DATE('now')
      GROUP BY hour
      ORDER BY hour`
    ).all<{ hour: number; visits: number }>();

    // Get LinkedIn traffic statistics
    const linkedinStats = await env.DB.prepare(
      `SELECT
        COUNT(*) as total_visits,
        COUNT(DISTINCT ip) as unique_visitors,
        MIN(timestamp) as first_visit,
        MAX(timestamp) as last_visit
      FROM logs
      WHERE referer IS NOT NULL
      AND LOWER(referer) LIKE '%linkedin%'`
    ).first<{
      total_visits: number;
      unique_visitors: number;
      first_visit: string;
      last_visit: string;
    }>();

    // Get recent LinkedIn visits
    const linkedinVisits = await env.DB.prepare(
      `SELECT * FROM logs
      WHERE referer IS NOT NULL
      AND LOWER(referer) LIKE '%linkedin%'
      ORDER BY timestamp DESC
      LIMIT 20`
    ).all<{
      id: number;
      ip: string;
      url: string;
      user_agent: string;
      country: string;
      referer: string;
      timestamp: string;
    }>();

    // Get traffic sources breakdown
    const trafficSources = await env.DB.prepare(
      `SELECT
        CASE
          WHEN referer IS NULL OR referer = '' THEN 'Direct'
          WHEN LOWER(referer) LIKE '%linkedin%' THEN 'LinkedIn'
          WHEN LOWER(referer) LIKE '%google%' THEN 'Google'
          WHEN LOWER(referer) LIKE '%facebook%' THEN 'Facebook'
          WHEN LOWER(referer) LIKE '%twitter%' OR LOWER(referer) LIKE '%x.com%' THEN 'Twitter/X'
          WHEN LOWER(referer) LIKE '%github%' THEN 'GitHub'
          ELSE 'Other'
        END as source,
        COUNT(*) as visits,
        COUNT(DISTINCT ip) as unique_visitors
      FROM logs
      GROUP BY source
      ORDER BY visits DESC`
    ).all<{ source: string; visits: number; unique_visitors: number }>();

    // Prepare response
    const response = {
      stats: {
        totalVisits: totalVisits?.count || 0,
        uniqueIPs: uniqueIPs?.count || 0,
      },
      byCountry: countryStats.results || [],
      topPages: topPages.results || [],
      recentLogs: recentLogs.results || [],
      timeSeries: timeSeries.results || [],
      companyVisits,
      hourlyStats: hourlyStats.results || [],
      linkedinStats: {
        totalVisits: linkedinStats?.total_visits || 0,
        uniqueVisitors: linkedinStats?.unique_visitors || 0,
        firstVisit: linkedinStats?.first_visit || null,
        lastVisit: linkedinStats?.last_visit || null,
        recentVisits: linkedinVisits.results || [],
      },
      trafficSources: trafficSources.results || [],
      timestamp: new Date().toISOString(),
    };

    // Add CORS headers for potential cross-origin requests
    return new Response(JSON.stringify(response, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
