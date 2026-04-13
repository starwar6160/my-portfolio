import { PagesFunction } from '@cloudflare/workers-types';

interface Env {
  DB: D1Database;
  ADMIN_PASSWORD?: string;
}

// Internal IP prefixes to completely exclude from logging
const INTERNAL_IP_PREFIXES = [
  '240d:1a:41e:2b00', // Your IPv6 prefix (covers all addresses in this subnet)
  '219.113.86.5', // Specific IPv4 if needed
  '2a06:98c0', // Cloudflare bots/health checks
];

// Check if IP matches any internal prefix
function isInternalIP(ip: string): boolean {
  return INTERNAL_IP_PREFIXES.some(prefix => ip.startsWith(prefix));
}

// Admin and API paths that require special logging
const ADMIN_PATHS = [
  '/admin/',
  '/api/',
];

export const onRequest: PagesFunction<Env> = async ({ request, next, env }) => {
  try {
    // Extract visitor information from request headers
    const ip = request.headers.get('CF-Connecting-IP') || 'Unknown';
    const url = request.url;
    const userAgent = request.headers.get('User-Agent') || 'Unknown';
    const referer = request.headers.get('Referer') || null;

    // Get country from Cloudflare's geolocation data
    const country = (request as any).cf?.country || 'Unknown';

    // Don't log anything from internal IPs (using prefix matching)
    if (isInternalIP(ip)) {
      // Silently skip logging for internal IPs
      return await next();
    }

    // Check if this is an admin/API path
    const isAdminPath = ADMIN_PATHS.some(path => url.includes(path));

    // For admin paths from external IPs, log with warning (security monitoring)
    if (isAdminPath) {
      console.warn(`⚠️ Admin access detected from external IP: ${ip} to ${url}`);
    }

    // Log all external IP visits
    if (env.DB) {
      // Async database write using waitUntil to avoid blocking the response
      // This ensures the visitor's page load is not affected by logging
      const logPromise = env.DB.prepare(
        'INSERT INTO logs (ip, url, user_agent, country, referer) VALUES (?, ?, ?, ?, ?)'
      )
        .bind(ip, url, userAgent, country, referer)
        .run();

      // Use waitUntil to handle the promise in the background
      // This returns immediately without waiting for the database write
      (self as any).waitUntil(logPromise);
    }
  } catch (error) {
    // Silently ignore logging errors to avoid breaking the site
    console.error('Logging error:', error);
  }

  // Pass the request through to the next handler
  return await next();
};
