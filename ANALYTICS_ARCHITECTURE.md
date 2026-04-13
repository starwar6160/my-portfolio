# Visitor Analytics System Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     Visitor Request                             │
│                  (IP, URL, User-Agent, Country)                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Cloudflare Pages Functions                          │
│         functions/_middleware.ts                                 │
│                                                                  │
│  1. Extract visitor metadata from request headers               │
│  2. Async write to D1 using waitUntil()                         │
│  3. Pass request through with next()                            │
└─────────────────┬───────────────────────┬───────────────────────┘
                  │                       │
                  │                       ▼
                  │              ┌──────────────────────┐
                  │              │   Page Response      │
                  │              │   (Instant return)   │
                  │              └──────────────────────┘
                  │
                  ▼ (Async, Non-blocking)
┌─────────────────────────────────────────────────────────────────┐
│                    Cloudflare D1 Database                        │
│                  visitor_log DB                                   │
│                                                                  │
│  CREATE TABLE logs (                                            │
│    id INTEGER PRIMARY KEY,                                      │
│    ip TEXT,                                                     │
│    url TEXT,                                                    │
│    user_agent TEXT,                                             │
│    country TEXT,                                                │
│    timestamp DATETIME                                           │
│  );                                                             │
│                                                                  │
│  INDEXES: timestamp, ip, country, url                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Queries on demand
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│          Admin Dashboard Request                                 │
│     /admin/dashboard.html?password=admin123                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│         functions/admin/stats.ts                                 │
│                                                                  │
│  1. Verify password                                             │
│  2. Query D1 for:                                               │
│     - Total visits / unique IPs                                 │
│     - Country distribution                                      │
│     - Top pages                                                 │
│     - Recent logs                                               │
│     - Time series (7 days)                                      │
│     - Company detection                                         │
│     - Hourly stats (today)                                      │
│  3. Return JSON response                                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│       Dashboard Frontend (static/admin/dashboard.html)          │
│                                                                  │
│  • Login form with password authentication                      │
│  • Statistics cards (4 metrics)                                 │
│  • Chart.js visualizations:                                     │
│    - Time series line chart                                     │
│    - Country distribution bar chart                             │
│    - Hourly distribution bar chart                              │
│    - Company detection doughnut chart                           │
│  • Recent logs table (last 100)                                 │
│  • Top pages table                                              │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Logging Flow (Every Request)
1. **Request arrives** at your Cloudflare Pages site
2. **Middleware intercepts** the request in `_middleware.ts`
3. **Extracts data**:
   - IP: `CF-Connecting-IP` header
   - URL: Full request URL
   - User-Agent: `User-Agent` header
   - Country: `request.cf.country` (Cloudflare geo data)
4. **Async database write** using `waitUntil()`:
   - Query runs in background
   - Doesn't block response
   - If it fails, no impact on user experience
5. **Pass through** to page/content
6. **Response returned** immediately to visitor

### Analytics Flow (Admin Dashboard)
1. **Admin visits** `/admin/dashboard.html`
2. **Enters password** in login form
3. **Frontend calls** `/api/stats?password=xxx`
4. **Backend validates** password
5. **Executes queries** on D1 database:
   - Aggregated stats (COUNT, GROUP BY)
   - Time series data (last 7 days)
   - Company pattern matching
6. **Returns JSON** with all analytics data
7. **Frontend renders** charts and tables

## Key Design Decisions

### 1. Non-blocking Logging
- **Why**: Zero performance impact on page load speed
- **How**: `waitUntil()` fires the database write asynchronously
- **Tradeoff**: If database write fails, we lose that log entry (but visitor never notices)

### 2. Log Everything
- **Why**: Complete visibility into all traffic
- **What**: Pages, CSS, JS, images, fonts, API calls
- **Benefit**: See what resources are most accessed, detect scraping bots
- **Storage**: D1 is cheap, indexes keep queries fast

### 3. Simple Password Auth
- **Why**: Quick setup, no external dependencies
- **How**: Query parameter `?password=xxx`
- **Security**: Good enough for basic use, upgrade to Cloudflare Access for production
- **Recommendation**: Change default password via `ADMIN_PASSWORD` env var

### 4. Company Detection
- **Why**: Track visits from target companies (Microsoft, AMD)
- **How**: Regex patterns on user agent and IP
- **Patterns**: Configurable in `functions/admin/stats.ts`
- **Limitation**: Not 100% accurate (some companies use generic tools)

### 5. Chart.js for Visualizations
- **Why**: Lightweight, CDN-hosted, no build step
- **Benefits**: Fast load, interactive charts, responsive
- **Charts included**:
  - Line chart (time series)
  - Bar chart (countries, hourly)
  - Doughnut chart (company distribution)

## Performance Characteristics

### Response Time Impact
- **Logging overhead**: ~0ms (async, non-blocking)
- **Page load**: No measurable impact
- **Database write**: Happens after response sent
- **Dashboard load**: ~200-500ms (depends on data size)

### Database Queries
- **All indexed**: Fast even with millions of rows
- **Aggregated queries**: Use GROUP BY with indexed columns
- **Recent logs**: Limited to 100 rows
- **Time series**: Only last 7 days by default

### Storage Growth
- **Estimate**: ~200 bytes per log entry
- **10,000 visits**: ~2MB
- **100,000 visits**: ~20MB
- **1 million visits**: ~200MB
- **D1 limits**: Generous free tier, affordable paid tier

## Security Considerations

### Current Implementation
- ✅ Password protection (query param)
- ✅ HTTPS only (Cloudflare auto-enforces)
- ✅ No sensitive data exposed (logs are visitor metadata)
- ⚠️ Password in URL (can be logged in browser history)

### Recommendations for Production
1. **Upgrade authentication**:
   - Use Cloudflare Access (email/SSO)
   - Or implement JWT bearer tokens
2. **Add rate limiting**:
   - Prevent API abuse
   - Cloudflare Workers can implement this
3. **IP whitelisting**:
   - Restrict admin access to known IPs
4. **Data retention**:
   - Auto-delete old logs (90+ days)
   - Implement cleanup job
5. **Privacy compliance**:
   - Consider hashing IPs before storage
   - Add cookie consent tracking
   - Provide data export/deletion endpoints

## Scaling Considerations

### Current Design Handles
- ✅ Thousands of visits per day
- ✅ Millions of total log entries
- ✅ Concurrent admin dashboard users
- ✅ High-traffic spikes (D1 is designed for this)

### If You Need More
- **Partitioning**: Separate tables by month/year
- **Archiving**: Move old data to Cloudflare R2 (object storage)
- **Sampling**: Log every Nth request during high traffic
- **Caching**: Cache API responses for 60 seconds
- **Read replicas**: Not available in D1 yet, but queries are fast

## Monitoring & Alerts

### Health Checks
```bash
# Check database is receiving writes
npx wrangler d1 execute visitor_log --remote --command="SELECT COUNT(*) FROM logs"

# Check recent activity
npx wrangler d1 execute visitor_log --remote --command="SELECT COUNT(*) FROM logs WHERE timestamp > datetime('now', '-1 hour')"
```

### Alert Ideas
- Database size approaching limit
- No new logs in last hour (possible issue)
- Spike in error rates (from middleware)
- Unusual traffic patterns

---

**Architecture optimized for:**
✅ Zero performance impact
✅ Real-time analytics
✅ Easy deployment
✅ Low maintenance
✅ Scalable to millions of visits
