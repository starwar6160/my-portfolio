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

  // Behavior patterns (request frequency, path patterns)
  scannerBehaviors: {
    // High frequency requests from single IP (>10 requests in 1 minute)
    highFrequency: true,

    // Only requesting resources without HTML pages
    resourcesOnly: true,

    // Sequential path scanning (e.g., /config1, /config2, /config3)
    sequentialScanning: true,
  },
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

    // scannerAction === 'allow' - Real visitor, continue to logging
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
