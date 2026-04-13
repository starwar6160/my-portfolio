# Visitor Analytics System - Setup Guide

Complete visitor tracking and analytics system for your Cloudflare Pages portfolio using D1 database.

## Features

- **Automatic Logging**: Logs ALL requests (pages, static assets, API calls) automatically
- **Zero Performance Impact**: Uses `waitUntil()` for non-blocking async database writes
- **Company Detection**: Identifies visits from Microsoft, AMD, Google, Amazon, Apple, etc.
- **Real-time Analytics Dashboard**: Beautiful dashboard with charts and statistics
- **Password Protected**: Simple password authentication for admin access
- **Geographic Tracking**: Country-level visitor location data

## Quick Start

### 1. Create D1 Database

```bash
# Create the database
npx wrangler d1 create visitor_log

# You'll receive output like:
# ✅ Successfully created DB 'visitor_log'
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Copy the `database_id` - you'll need it in the next step!**

### 2. Update wrangler.jsonc

Edit `wrangler.jsonc` and replace `YOUR_DATABASE_ID_HERE` with your actual database ID:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "visitor_log",
      "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  // Replace this
    }
  ]
}
```

### 3. Initialize Database Schema

```bash
# Local development database
npx wrangler d1 execute visitor_log --local --file=./schema.sql

# Production database (remote)
npx wrangler d1 execute visitor_log --remote --file=./schema.sql
```

### 4. Set Admin Password (Optional)

By default, the password is `admin123`. To change it, set an environment variable:

```bash
# Add to wrangler.jsonc or Cloudflare dashboard
npx wrangler secret put ADMIN_PASSWORD
# You'll be prompted to enter your password
```

Or in Cloudflare Pages dashboard:
1. Go to your project settings
2. Add environment variable `ADMIN_PASSWORD` with your desired password

### 5. Deploy to Cloudflare Pages

```bash
# Deploy your site
npx wrangler pages deploy ./public

# Or if using GitHub integration, just push your changes
git add .
git commit -m "Add visitor analytics system"
git push
```

## Accessing the Dashboard

Visit: `https://your-domain.com/admin/dashboard.html`

Default password: `admin123`

## Testing Locally

### Start Local Development Server

```bash
# Start Pages functions with D1 binding
npx wrangler pages dev ./public --binding=DB:visitor_log
```

### Generate Test Traffic

```bash
# Make some requests to generate logs
curl http://localhost:8788/
curl http://localhost:8788/en/
curl http://localhost:8788/cases/
```

### Check Local Database

```bash
# Query local database
npx wrangler d1 execute visitor_log --local --command="SELECT * FROM logs ORDER BY timestamp DESC LIMIT 10"
```

## API Endpoints

### Get Analytics Data

```bash
GET /api/stats?password=YOUR_PASSWORD
```

Response includes:
- `stats`: Total visits, unique IPs
- `byCountry`: Visits per country
- `topPages`: Most visited pages
- `recentLogs`: Last 100 visits
- `timeSeries`: Daily visits for last 7 days
- `companyVisits`: Detected company visits
- `hourlyStats`: Hourly distribution for today

Example:
```bash
curl "https://your-domain.com/api/stats?password=admin123"
```

## Dashboard Features

### Statistics Cards
- Total Visits: All logged requests
- Unique Visitors: Unique IP addresses
- Company Visits: Visits from detected companies
- Avg per Visitor: Average visits per unique IP

### Charts
1. **Visits Over Time**: Last 7 days trend (total vs unique)
2. **Top Countries**: Geographic distribution bar chart
3. **Hourly Distribution**: Today's visits by hour
4. **Company Detection**: Doughnut chart of company visits

### Tables
- **Recent Visits**: Last 100 requests with IP, URL, country, user agent
- **Top Pages**: Most visited pages with visit counts

## Company Detection

The system automatically detects visits from these companies based on user agent and IP patterns:

- **Microsoft**: microsoft.com, live.com, outlook.com, msn.com, office.com
- **AMD**: amd.com domains
- **Google**: google.com, gmail.com, youtube.com, chromium
- **Amazon**: amazon.com, aws
- **Apple**: apple.com, icloud, macintosh, iphone, ipad
- **Meta**: meta.com, facebook, instagram, whatsapp
- **Netflix**: netflix.com
- **Intel**: intel.com
- **NVIDIA**: nvidia.com, geforce

## Database Schema

```sql
CREATE TABLE logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT NOT NULL,
  url TEXT NOT NULL,
  user_agent TEXT,
  country TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_timestamp ON logs(timestamp);
CREATE INDEX idx_ip ON logs(ip);
CREATE INDEX idx_country ON logs(country);
CREATE INDEX idx_url ON logs(url);
```

## Monitoring & Maintenance

### Check Database Size

```bash
# Local
npx wrangler d1 execute visitor_log --local --command="SELECT COUNT(*) as count FROM logs"

# Remote (Production)
npx wrangler d1 execute visitor_log --remote --command="SELECT COUNT(*) as count FROM logs"
```

### Clean Old Logs (Optional)

```sql
-- Delete logs older than 90 days
DELETE FROM logs WHERE timestamp < datetime('now', '-90 days');

-- Or keep only last 1000 records
DELETE FROM logs WHERE id NOT IN (
  SELECT id FROM logs ORDER BY timestamp DESC LIMIT 1000
);
```

### Export Data

```bash
# Export to CSV
npx wrangler d1 execute visitor_log --remote --command="SELECT * FROM logs" > visitor_logs.csv
```

## Troubleshooting

### Database Not Found

**Error**: `D1_ERROR: Unknown database`

**Solution**: Make sure you've created the database and updated `wrangler.jsonc` with the correct `database_id`.

### Permission Denied

**Error**: `401 Unauthorized`

**Solution**:
1. Check your password is correct
2. If using environment variable, ensure it's set correctly
3. Try `?password=admin123` (default)

### No Data Showing

**Solution**:
1. Visit your site to generate some traffic
2. Wait a few seconds for data to be written
3. Refresh the dashboard
4. Check browser console for errors

### Functions Not Working

**Solution**:
1. Ensure `functions/_middleware.ts` and `functions/admin/stats.ts` exist
2. Check Wrangler is serving functions: `npx wrangler pages dev ./public`
3. Look for errors in the terminal output

## Performance Considerations

- **Non-blocking**: Uses `waitUntil()` so logging never slows down your site
- **Indexed Queries**: All database queries use indexed columns for speed
- **Efficient Charts**: Dashboard loads only last 100 logs and aggregated data
- **No Static Asset Overhead**: CSS/JS assets are cached normally

## Security Notes

1. **Change the Default Password**: Set `ADMIN_PASSWORD` environment variable
2. **HTTPS Only**: Always use HTTPS in production (Cloudflare Pages does this automatically)
3. **Rate Limiting**: Consider adding rate limiting to `/api/stats` endpoint for production
4. **IP Privacy**: Consider hashing IPs before storage if needed for privacy compliance
5. **Data Retention**: Implement automatic cleanup of old logs (see monitoring section)

## Customization

### Add More Companies

Edit `functions/admin/stats.ts` and add to `COMPANY_PATTERNS`:

```typescript
const COMPANY_PATTERNS = {
  // ... existing patterns
  'YourCompany': /\byour-domain\.com\b/i,
};
```

### Change Chart Colors

Edit `static/admin/dashboard.html` and modify the Chart.js color arrays.

### Customize Dashboard

The dashboard is a single HTML file with embedded CSS/JS. Feel free to:
- Change the color scheme
- Add more charts
- Modify the layout
- Add filters for date ranges

## Production Checklist

- [ ] Created D1 database
- [ ] Updated `wrangler.jsonc` with correct `database_id`
- [ ] Ran schema initialization locally and remotely
- [ ] Changed default admin password
- [ ] Tested locally with `wrangler pages dev`
- [ ] Deployed to production
- [ ] Accessed dashboard and verified data is being collected
- [ ] Set up any additional monitoring/alerts as needed

## Support

For issues or questions:
1. Check Cloudflare D1 documentation: https://developers.cloudflare.com/d1/
2. Check Cloudflare Pages Functions: https://developers.cloudflare.com/pages/functions/
3. Review error messages in browser console and Wrangler output
4. Verify database connectivity using `wrangler d1 execute` commands

---

**Enjoy tracking your visitors! 🚀**
