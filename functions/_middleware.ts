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

// Bot/scanner detection patterns
const BOT_PATTERNS = {
  // Scanner paths commonly targeted by vulnerability scanners
  scannerPaths: [
    '.env',
    '.env.bak',
    '.env.local',
    '.env.production',
    '.git',
    '.svn',
    'phpinfo.php',
    'info.php',
    'server-status',
    'server-info',
    'administrator',
    'wp-admin',
    'xmlrpc.php',
    'README.md',
    'LICENSE',
    '.htaccess',
    'web.config',
    'composer.json',
    'package.json.bak',
    '_environment',
    'brevo',
    'mailpit',
    'solr',
    'actuator',
  ],

  // Known scanner user agents
  scannerUserAgents: [
    /scanner/i,
    /bot/i,
    /crawler/i,
    /spider/i,
    /curl/i,
    /wget/i,
    /python/i,
    /go-http-client/i,
    /nikto/i,
    /nmap/i,
    /masscan/i,
    /zgrab/i,
    /http.rb/i,
  ],
};

// Check if request is from a bot/scanner
function isBotScanner(url: string, userAgent: string): boolean {
  // Check for scanner paths
  const urlLower = url.toLowerCase();
  for (const path of BOT_PATTERNS.scannerPaths) {
    if (urlLower.includes(path.toLowerCase())) {
      return true;
    }
  }

  // Check for scanner user agents
  for (const pattern of BOT_PATTERNS.scannerUserAgents) {
    if (pattern.test(userAgent)) {
      return true;
    }
  }

  return false;
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

    // Check if this is a bot/scanner request
    const isScanner = isBotScanner(url, userAgent);

    if (isScanner) {
      // Log scanner requests separately for security monitoring
      // but don't count them in analytics
      console.warn(`🤖 Scanner detected: ${ip} -> ${url}`);
      // Optionally: log to separate scanner table for WAF rule creation
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
