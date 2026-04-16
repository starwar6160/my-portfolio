import { onRequest } from '@cloudflare/workers-types';

interface Env {
  DB: D1Database;
  ADMIN_PASSWORD?: string;
}

// Internal IP prefixes to exclude from statistics
const INTERNAL_IP_PREFIXES = [
  '240d:1a:41e:2b00',
  '219.113.86.5',
  '2a06:98c0',
];

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  try {
    // Check password authentication
    const url = new URL(request.url);
    const password = url.searchParams.get('password');

    if (password !== env.ADMIN_PASSWORD) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Build SQL exclusion conditions for internal IPs
    const excludeConditions = INTERNAL_IP_PREFIXES.map(
      prefix => `ip NOT LIKE '${prefix}%'`
    );
    const excludeInternalSQL = `WHERE ${excludeConditions.join(' AND ')}`;

    // Get basic stats
    const totalSessions = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM sessions ${excludeInternalSQL}`
    ).first<{ count: number }>();

    const uniqueIPs = await env.DB.prepare(
      `SELECT COUNT(DISTINCT ip) as count FROM sessions ${excludeInternalSQL}`
    ).first<{ count: number }>();

    const totalHits = await env.DB.prepare(
      `SELECT SUM(hits) as total FROM sessions ${excludeInternalSQL}`
    ).first<{ total: number }>();

    const totalPageViews = await env.DB.prepare(
      `SELECT SUM(pages_viewed) as total FROM sessions ${excludeInternalSQL}`
    ).first<{ total: number }>();

    const newVisitors = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM sessions ${excludeInternalSQL} AND is_first_visit = 1`
    ).first<{ count: number }>();

    // Get time series data (last 7 days)
    const timeSeries = await env.DB.prepare(
      `SELECT
        DATE(session_start) as date,
        COUNT(*) as sessions,
        SUM(hits) as total_hits,
        SUM(pages_viewed) as total_page_views,
        COUNT(DISTINCT ip) as unique_visitors
      FROM sessions
      ${excludeInternalSQL}
      GROUP BY DATE(session_start)
      ORDER BY date DESC
      LIMIT 7`
    ).all<{
      date: string;
      sessions: number;
      total_hits: number;
      total_page_views: number;
      unique_visitors: number;
    }>();

    // Get country stats
    const byCountry = await env.DB.prepare(
      `SELECT
        country,
        COUNT(*) as sessions,
        SUM(hits) as total_hits,
        COUNT(DISTINCT ip) as unique_visitors
      FROM sessions
      ${excludeInternalSQL}
      GROUP BY country
      ORDER BY sessions DESC
      LIMIT 10`
    ).all<{
      country: string;
      sessions: number;
      total_hits: number;
      unique_visitors: number;
    }>();

    // Get hourly stats (today)
    const hourlyStats = await env.DB.prepare(
      `SELECT
        CAST(strftime('%H', datetime(session_start, '+9 hours')) AS INTEGER) as hour,
        COUNT(*) as sessions,
        SUM(hits) as total_hits
      FROM sessions
      ${excludeInternalSQL}
      AND DATE(session_start) = DATE('now')
      GROUP BY hour
      ORDER BY hour`
    ).all<{
      hour: number;
      sessions: number;
      total_hits: number;
    }>();

    // Get recent sessions
    const recentSessions = await env.DB.prepare(
      `SELECT
        ip,
        landing_page,
        user_agent,
        country,
        referer,
        hits,
        pages_viewed,
        session_start,
        last_seen,
        is_first_visit
      FROM sessions
      ${excludeInternalSQL}
      ORDER BY session_start DESC
      LIMIT 100`
    ).all<{
      ip: string;
      landing_page: string;
      user_agent: string;
      country: string;
      referer: string;
      hits: number;
      pages_viewed: number;
      session_start: string;
      last_seen: string;
      is_first_visit: number;
    }>();

    // Get top landing pages
    const topLandingPages = await env.DB.prepare(
      `SELECT
        landing_page,
        COUNT(*) as sessions,
        SUM(hits) as total_hits,
        COUNT(DISTINCT ip) as unique_visitors
      FROM sessions
      ${excludeInternalSQL}
      GROUP BY landing_page
      ORDER BY sessions DESC
      LIMIT 10`
    ).all<{
      landing_page: string;
      sessions: number;
      total_hits: number;
      unique_visitors: number;
    }>();

    // Get referer stats
    const refererStats = await env.DB.prepare(
      `SELECT
        CASE
          WHEN referer IS NULL OR referer = '' THEN 'Direct'
          WHEN referer LIKE '%linkedin%' THEN 'LinkedIn'
          WHEN referer LIKE '%google%' THEN 'Google'
          WHEN referer LIKE '%twitter%' THEN 'Twitter'
          WHEN referer LIKE '%facebook%' THEN 'Facebook'
          ELSE 'Other'
        END as source,
        COUNT(*) as sessions,
        COUNT(DISTINCT ip) as unique_visitors
      FROM sessions
      ${excludeInternalSQL}
      GROUP BY source
      ORDER BY sessions DESC`
    ).all<{
      source: string;
      sessions: number;
      unique_visitors: number;
    }>();

    // Detect company visits
    const allSessions = await env.DB.prepare(
      `SELECT ip, user_agent, country FROM sessions ${excludeInternalSQL}`
    ).all<{ ip: string; user_agent: string; country: string }>();

    const companyVisits: Record<string, number> = {};
    const companyPatterns = [
      { name: 'Microsoft', pattern: /microsoft/i },
      { name: 'Amazon', pattern: /amazon/i },
      { name: 'Google', pattern: /google/i },
      { name: 'Apple', pattern: /apple/i },
      { name: 'AMD', pattern: /amd/i },
      { name: 'Intel', pattern: /intel/i },
      { name: 'NVIDIA', pattern: /nvidia/i },
      { name: 'Meta', pattern: /meta/i },
      { name: 'Netflix', pattern: /netflix/i },
    ];

    allSessions.results.forEach(session => {
      for (const company of companyPatterns) {
        if (company.pattern.test(session.user_agent)) {
          companyVisits[company.name] = (companyVisits[company.name] || 0) + 1;
          break;
        }
      }
    });

    const stats = {
      totalSessions: totalSessions?.count || 0,
      uniqueIPs: uniqueIPs?.count || 0,
      totalHits: totalHits?.total || 0,
      totalPageViews: totalPageViews?.total || 0,
      newVisitors: newVisitors?.count || 0,
    };

    return new Response(JSON.stringify({
      stats,
      timeSeries: timeSeries.results,
      byCountry: byCountry.results,
      hourlyStats: hourlyStats.results,
      recentSessions: recentSessions.results,
      topLandingPages: topLandingPages.results,
      refererStats: refererStats.results,
      companyVisits,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
