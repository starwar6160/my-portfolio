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
    // Get basic stats
    const totalVisits = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM logs'
    ).first<{ count: number }>();

    const uniqueIPs = await env.DB.prepare(
      'SELECT COUNT(DISTINCT ip) as count FROM logs'
    ).first<{ count: number }>();

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
