# API Examples & Testing Guide

This document shows example API responses and how to test the visitor analytics system.

## API Endpoint

### Get Analytics Data

**Endpoint:** `GET /api/stats?password=YOUR_PASSWORD`

**Authentication:** Query parameter `password`

**Success Response:** 200 OK
**Error Responses:** 401 Unauthorized, 500 Internal Server Error

## Example Responses

### Success Response (200 OK)

```json
{
  "stats": {
    "totalVisits": 1234,
    "uniqueIPs": 567
  },
  "byCountry": [
    { "country": "US", "count": 456 },
    { "country": "JP", "count": 123 },
    { "country": "DE", "count": 89 },
    { "country": "CN", "count": 67 },
    { "country": "GB", "count": 45 },
    { "country": "FR", "count": 34 },
    { "country": "CA", "count": 23 },
    { "country": "Unknown", "count": 12 }
  ],
  "topPages": [
    {
      "url": "https://portfolio.st6160.click/",
      "count": 234,
      "unique_visitors": 123
    },
    {
      "url": "https://portfolio.st6160.click/en/",
      "count": 145,
      "unique_visitors": 89
    },
    {
      "url": "https://portfolio.st6160.click/cases/",
      "count": 98,
      "unique_visitors": 67
    },
    {
      "url": "https://portfolio.st6160.click/cases/etl-optimization/",
      "count": 76,
      "unique_visitors": 45
    },
    {
      "url": "https://portfolio.st6160.click/projects/kernel-surgery/",
      "count": 65,
      "unique_visitors": 34
    }
  ],
  "recentLogs": [
    {
      "id": 1234,
      "ip": "203.0.113.1",
      "url": "https://portfolio.st6160.click/",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "country": "US",
      "timestamp": "2025-04-13T10:30:45.000Z"
    },
    {
      "id": 1233,
      "ip": "2001:db8::1",
      "url": "https://portfolio.st6160.click/en/",
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15",
      "country": "JP",
      "timestamp": "2025-04-13T10:28:32.000Z"
    },
    {
      "id": 1232,
      "ip": "198.51.100.1",
      "url": "https://portfolio.st6160.click/cases/etl-optimization/",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
      "country": "DE",
      "timestamp": "2025-04-13T10:25:18.000Z"
    }
  ],
  "timeSeries": [
    {
      "date": "2025-04-06",
      "visits": 145,
      "unique_visitors": 89
    },
    {
      "date": "2025-04-07",
      "visits": 167,
      "unique_visitors": 98
    },
    {
      "date": "2025-04-08",
      "visits": 189,
      "unique_visitors": 112
    },
    {
      "date": "2025-04-09",
      "visits": 234,
      "unique_visitors": 134
    },
    {
      "date": "2025-04-10",
      "visits": 198,
      "unique_visitors": 145
    },
    {
      "date": "2025-04-11",
      "visits": 212,
      "unique_visitors": 156
    },
    {
      "date": "2025-04-12",
      "visits": 89,
      "unique_visitors": 67
    }
  ],
  "companyVisits": {
    "Microsoft": 23,
    "Google": 45,
    "Amazon": 12,
    "Apple": 8,
    "Meta": 5
  },
  "hourlyStats": [
    { "hour": 0, "visits": 12 },
    { "hour": 1, "visits": 8 },
    { "hour": 2, "visits": 5 },
    { "hour": 8, "visits": 34 },
    { "hour": 9, "visits": 45 },
    { "hour": 10, "visits": 56 },
    { "hour": 14, "visits": 67 },
    { "hour": 15, "visits": 78 },
    { "hour": 16, "visits": 45 }
  ],
  "timestamp": "2025-04-13T10:30:00.000Z"
}
```

### Error Response - Unauthorized (401)

```json
{
  "error": "Unauthorized"
}
```

### Error Response - Internal Server Error (500)

```json
{
  "error": "Internal Server Error",
  "message": "D1_ERROR: Database not found"
}
```

## Testing with curl

### Test API with Default Password

```bash
curl "https://portfolio.st6160.click/api/stats?password=admin123"
```

### Test API with Custom Password

```bash
curl "https://portfolio.st6160.click/api/stats?password=YOUR_CUSTOM_PASSWORD"
```

### Test API Locally

```bash
# First, start local server
npx wrangler pages dev ./public --binding=DB:visitor_log

# In another terminal, test the API
curl "http://localhost:8788/api/stats?password=admin123"
```

### Test Authentication Failure

```bash
curl "https://portfolio.st6160.click/api/stats?password=wrongpassword"
# Should return: {"error":"Unauthorized"}
```

### Pretty Print JSON Response

```bash
curl "https://portfolio.st6160.click/api/stats?password=admin123" | jq
```

## Testing with JavaScript

### Fetch API

```javascript
// Fetch analytics data
const response = await fetch('/api/stats?password=admin123');
const data = await response.json();

console.log('Total visits:', data.stats.totalVisits);
console.log('Unique visitors:', data.stats.uniqueIPs);
console.log('Top country:', data.byCountry[0]);
```

### Error Handling

```javascript
try {
  const response = await fetch('/api/stats?password=admin123');

  if (!response.ok) {
    if (response.status === 401) {
      console.error('Invalid password');
    } else {
      console.error('Server error:', response.status);
    }
    return;
  }

  const data = await response.json();
  console.log('Analytics data:', data);
} catch (error) {
  console.error('Network error:', error);
}
```

## Testing with Python

### Using requests

```python
import requests

# Fetch analytics data
response = requests.get(
    'https://portfolio.st6160.click/api/stats',
    params={'password': 'admin123'}
)

if response.status_code == 200:
    data = response.json()
    print(f"Total visits: {data['stats']['totalVisits']}")
    print(f"Unique visitors: {data['stats']['uniqueIPs']}")
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

### Using urllib

```python
import urllib.request
import json

url = 'https://portfolio.st6160.click/api/stats?password=admin123'

with urllib.request.urlopen(url) as response:
    data = json.loads(response.read().decode())
    print(f"Total visits: {data['stats']['totalVisits']}")
```

## Database Testing Queries

### Check Total Logs

```bash
# Local
npx wrangler d1 execute visitor_log --local --command="SELECT COUNT(*) as total FROM logs"

# Remote
npx wrangler d1 execute visitor_log --remote --command="SELECT COUNT(*) as total FROM logs"
```

### View Recent Logs

```bash
# Local
npx wrangler d1 execute visitor_log --local --command="SELECT * FROM logs ORDER BY timestamp DESC LIMIT 10"

# Remote
npx wrangler d1 execute visitor_log --remote --command="SELECT * FROM logs ORDER BY timestamp DESC LIMIT 10"
```

### Check Company Visits

```bash
# Look for Microsoft user agents
npx wrangler d1 execute visitor_log --local --command="SELECT * FROM logs WHERE user_agent LIKE '%microsoft%' ORDER BY timestamp DESC LIMIT 10"

# Look for AMD visits
npx wrangler d1 execute visitor_log --local --command="SELECT * FROM logs WHERE user_agent LIKE '%amd%' OR ip LIKE '%amd%' ORDER BY timestamp DESC LIMIT 10"
```

### Check Today's Visits

```bash
npx wrangler d1 execute visitor_log --local --command="SELECT COUNT(*) as count FROM logs WHERE DATE(timestamp) = DATE('now')"
```

### Check Visits by Country

```bash
npx wrangler d1 execute visitor_log --local --command="SELECT country, COUNT(*) as count FROM logs GROUP BY country ORDER BY count DESC LIMIT 10"
```

### Check Top Pages

```bash
npx wrangler d1 execute visitor_log --local --command="SELECT url, COUNT(*) as count FROM logs GROUP BY url ORDER BY count DESC LIMIT 10"
```

## Performance Testing

### Load Test with curl

```bash
# Generate 100 rapid requests
for i in {1..100}; do
  curl -s "https://portfolio.st6160.click/" > /dev/null &
done
wait

# Check if all were logged
npx wrangler d1 execute visitor_log --remote --command="SELECT COUNT(*) FROM logs"
```

### Check Response Time

```bash
# Measure API response time
time curl "https://portfolio.st6160.click/api/stats?password=admin123"
```

### Apache Bench (if installed)

```bash
# 100 requests, 10 concurrent
ab -n 100 -c 10 "https://portfolio.st6160.click/"
```

## Monitoring Queries

### Database Size

```sql
-- Check total rows
SELECT COUNT(*) as total_logs FROM logs;

-- Check date range
SELECT
  MIN(timestamp) as first_log,
  MAX(timestamp) as last_log,
  COUNT(*) as total_logs
FROM logs;
```

### Unique Visitors

```sql
-- Unique IPs over time
SELECT
  DATE(timestamp) as date,
  COUNT(DISTINCT ip) as unique_visitors
FROM logs
GROUP BY DATE(timestamp)
ORDER BY date DESC
LIMIT 30;
```

### Growth Trend

```sql
-- Daily growth for last 30 days
SELECT
  DATE(timestamp) as date,
  COUNT(*) as visits,
  COUNT(DISTINCT ip) as unique_visitors
FROM logs
WHERE timestamp >= datetime('now', '-30 days')
GROUP BY DATE(timestamp)
ORDER BY date ASC;
```

## Dashboard Integration Examples

### Custom Dashboard Widget

```html
<!DOCTYPE html>
<html>
<head>
  <title>Custom Widget</title>
</head>
<body>
  <h1>Visit Counter</h1>
  <div id="counter">Loading...</div>

  <script>
    async function loadStats() {
      const response = await fetch('/api/stats?password=admin123');
      const data = await response.json();
      document.getElementById('counter').textContent =
        data.stats.totalVisits.toLocaleString();
    }

    loadStats();
    setInterval(loadStats, 60000); // Refresh every minute
  </script>
</body>
</html>
```

### Company Alert System

```javascript
// Check for company visits every 5 minutes
async function checkCompanyVisits() {
  const response = await fetch('/api/stats?password=admin123');
  const data = await response.json();

  const companies = data.companyVisits;
  if (companies['Microsoft'] > 0) {
    console.log(`🎉 Microsoft visited ${companies['Microsoft']} times!`);
    // Send notification, email, etc.
  }

  if (companies['AMD'] > 0) {
    console.log(`🎉 AMD visited ${companies['AMD']} times!`);
  }
}

setInterval(checkCompanyVisits, 300000); // Every 5 minutes
```

## Troubleshooting Tests

### Test Database Connection

```bash
# Should return database info
npx wrangler d1 info visitor_log
```

### Test Schema

```bash
# Should show the logs table
npx wrangler d1 execute visitor_log --remote --command="SELECT sql FROM sqlite_master WHERE type='table'"
```

### Test Middleware

```bash
# Make a request and immediately check if logged
curl "https://portfolio.st6160.click/"
sleep 2
npx wrangler d1 execute visitor_log --remote --command="SELECT * FROM logs ORDER BY timestamp DESC LIMIT 1"
```

### Test API Response Format

```bash
# Validate JSON
curl "https://portfolio.st6160.click/api/stats?password=admin123" | jq
```

---

**Use these examples to test and integrate with your visitor analytics system!**
