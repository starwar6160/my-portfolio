import { PagesFunction } from '@cloudflare/workers-types';

interface Env {
  DB: D1Database;
  ADMIN_PASSWORD?: string;
}

// Session timeout in minutes (30 minutes of inactivity = new session)
const SESSION_TIMEOUT_MINUTES = 30;

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

// Check if URL is an HTML page (not a static resource)
function isHTMLPage(url: string): boolean {
  const urlLower = url.toLowerCase();
  // Exclude static resources
  if (urlLower.endsWith('.css') || urlLower.endsWith('.js') ||
      urlLower.endsWith('.png') || urlLower.endsWith('.jpg') ||
      urlLower.endsWith('.jpeg') || urlLower.endsWith('.gif') ||
      urlLower.endsWith('.svg') || urlLower.endsWith('.ico') ||
      urlLower.endsWith('.woff') || urlLower.endsWith('.woff2') ||
      urlLower.endsWith('.ttf') || urlLower.endsWith('.eot') ||
      urlLower.endsWith('.txt') || urlLower.endsWith('.xml')) {
    return false;
  }
  // Include HTML pages and directory paths (likely pages)
  return urlLower.endsWith('.html') || urlLower.endsWith('.htm') ||
         !urlLower.includes('.') || urlLower.endsWith('/');
}

// Bot/scanner detection patterns
const BOT_PATTERNS = {
  // Scanner paths commonly targeted by vulnerability scanners
  scannerPaths: [
    // Config files
    '.env',
    '.env.bak',
    '.env.local',
    '.env.production',
    '.git',
    '.svn',
    '.s3cfg',
    'config.js',
    'aws.config.js',
    'aws-config.js',
    'aws.json',
    'aws-credentials',
    '.aws/config',
    '.aws/credentials',
    'application.yml',
    'database.yml',
    '_environment',
    '_profiler',

    // Info disclosure
    'phpinfo.php',
    'info.php',
    'server-status',
    'server-info',
    'debug.log',
    'error.log',

    // Admin panels
    'administrator',
    'wp-admin',
    'xmlrpc.php',
    'admin',
    'login',
    'signin',

    // Common files
    'README.md',
    'LICENSE',
    '.htaccess',
    'web.config',
    'composer.json',
    'package.json.bak',
    'package-lock.json',

    // Framework specific
    'brevo',
    'mailpit',
    'solr',
    'actuator',
    'api/docs',
    'swagger',
    'graphql',

    // Resume/Job scraping patterns
    '/CV',
    '/resume',
    '/cv',
    '/portfolio',
    '/jobs',
    '/careers',
    '/about',
    '/contact',
  ],

  // Known scanner user agents
  scannerUserAgents: [
    // General bots
    /scanner/i,
    /bot/i,
    /crawler/i,
    /spider/i,

    // CLI tools
    /curl/i,
    /wget/i,
    /python/i,
    /python-requests/i,
    /go-http-client/i,
    /http.rb/i,
    /java/i,
    /okhttp/i,

    // Security scanners
    /nikto/i,
    /nmap/i,
    /masscan/i,
    /zgrab/i,
    /sqlmap/i,
    /dirbuster/i,
    /gobuster/i,
    /feroxbuster/i,
    /wpscan/i,

    // SEO/Resume scrapers
    /semantic-bot/i,
    /semrush/i,
    /ahrefsbot/i,
    /majestic12/i,
    /dotbot/i,
    /barkrowler/i,
    /linkedinbot/i,
    /twitterbot/i,
    /facebookexternalhit/i,

    // Generic patterns
    /^\s*$/,  // Empty user agent
    /-/i,     // Single dash
  ],
};

// Check if request is from a bot/scanner
function isBotScanner(url: string, userAgent: string): 'block' | 'ignore' | 'allow' {
  const urlLower = url.toLowerCase();
  const uaLower = userAgent.toLowerCase();

  // Check for scanner paths (high confidence - block)
  for (const path of BOT_PATTERNS.scannerPaths) {
    if (urlLower.includes(path.toLowerCase())) {
      return 'block';  // Definitely malicious scanner
    }
  }

  // Check for scanner user agents
  for (const pattern of BOT_PATTERNS.scannerUserAgents) {
    if (pattern.test(userAgent)) {
      // SEO bots and social media crawlers - ignore but don't block
      if (uaLower.includes('linkedin') || uaLower.includes('twitter') ||
          uaLower.includes('facebook') || uaLower.includes('semantic-bot') ||
          uaLower.includes('semrush') || uaLower.includes('ahrefs')) {
        return 'ignore';  // SEO/social crawler, don't log
      }
      // Security scanners and generic bots - block
      return 'block';
    }
  }

  return 'allow';  // Real visitor
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

    // Check if this is a bot/scanner request with three levels
    const scannerAction = isBotScanner(url, userAgent);

    if (scannerAction === 'block') {
      // Definitely malicious scanner - log warning and ignore
      console.warn(`🚫 Malicious scanner blocked: ${ip} -> ${url} (${userAgent})`);
      return await next();  // Don't log, don't count
    }

    if (scannerAction === 'ignore') {
      // SEO/social crawler - silently ignore
      return await next();  // Don't log, don't count
    }

    // scannerAction === 'allow' - Real visitor, continue to session-based logging
    // Check if this is an admin/API path
    const isAdminPath = ADMIN_PATHS.some(path => url.includes(path));

    // For admin paths from external IPs, log with warning (security monitoring)
    if (isAdminPath) {
      console.warn(`⚠️ Admin access detected from external IP: ${ip} to ${url}`);
    }

    // Session-based logging using D1 database
    if (env.DB) {
      // Extract URL path for cleaner storage
      const urlObj = new URL(url);
      const path = urlObj.pathname;

      // Check if this is an HTML page or static resource
      const isPage = isHTMLPage(path);

      // Use waitUntil to handle database operations in background
      (self as any).waitUntil((async () => {
        try {
          // Check if there's an active session for this IP (within timeout)
          const sessionTimeout = new Date(Date.now() - SESSION_TIMEOUT_MINUTES * 60 * 1000).toISOString();

          const existingSession = await env.DB.prepare(
            `SELECT id, landing_page, hits, pages_viewed, session_start
             FROM sessions
             WHERE ip = ? AND last_seen > ?
             ORDER BY last_seen DESC
             LIMIT 1`
          ).bind(ip, sessionTimeout).first<{
            id: number;
            landing_page: string;
            hits: number;
            pages_viewed: number;
            session_start: string;
          }>();

          if (existingSession) {
            // Update existing session
            const newHits = existingSession.hits + 1;
            const newPagesViewed = isPage ? existingSession.pages_viewed + 1 : existingSession.pages_viewed;

            await env.DB.prepare(
              `UPDATE sessions
               SET hits = ?, pages_viewed = ?, last_seen = CURRENT_TIMESTAMP
               WHERE id = ?`
            ).bind(newHits, newPagesViewed, existingSession.id).run();
          } else {
            // Create new session
            // Check if this IP has visited before (for is_first_visit flag)
            const pastVisits = await env.DB.prepare(
              `SELECT COUNT(*) as count FROM sessions WHERE ip = ?`
            ).bind(ip).first<{ count: number }>();

            const isFirstVisit = (!pastVisits || pastVisits.count === 0) ? 1 : 0;

            await env.DB.prepare(
              `INSERT INTO sessions (ip, landing_page, user_agent, country, referer, is_first_visit)
               VALUES (?, ?, ?, ?, ?, ?)`
            ).bind(ip, path, userAgent, country, referer, isFirstVisit).run();
          }
        } catch (error) {
          // Silently ignore logging errors to avoid breaking the site
          console.error('Session logging error:', error);
        }
      })());
    }
  } catch (error) {
    // Silently ignore logging errors to avoid breaking the site
    console.error('Logging error:', error);
  }

  // Pass the request through to the next handler
  return await next();
};
