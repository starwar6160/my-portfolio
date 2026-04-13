# Visitor Analytics Deployment Checklist

Use this checklist to ensure your visitor analytics system is properly set up and deployed.

## Phase 1: Initial Setup

### Database Creation
- [ ] Run `npx wrangler d1 create visitor_log`
- [ ] Copy the `database_id` from the output
- [ ] Update `wrangler.jsonc` with the database ID (line 18)

### Database Initialization
- [ ] Run `npx wrangler d1 execute visitor_log --local --file=./schema.sql`
- [ ] Run `npx wrangler d1 execute visitor_log --remote --file=./schema.sql`
- [ ] Verify tables created: `npx wrangler d1 execute visitor_log --remote --command="SELECT name FROM sqlite_master WHERE type='table'"`

## Phase 2: Configuration

### Security
- [ ] Decide on admin password (default: `admin123`)
- [ ] Optional: Set `ADMIN_PASSWORD` environment variable:
  - Via CLI: `npx wrangler secret put ADMIN_PASSWORD`
  - Or in Cloudflare Pages dashboard
- [ ] Test password authentication locally

### Verification
- [ ] Check `wrangler.jsonc` has D1 binding configured
- [ ] Verify `functions/_middleware.ts` exists
- [ ] Verify `functions/admin/stats.ts` exists
- [ ] Verify `static/admin/dashboard.html` exists

## Phase 3: Local Testing

### Start Local Server
- [ ] Run: `npx wrangler pages dev ./public --binding=DB:visitor_log`
- [ ] Check terminal shows "Listening on http://localhost:8788"

### Generate Test Traffic
- [ ] Visit http://localhost:8788/ (homepage)
- [ ] Visit http://localhost:8788/en/ (English page)
- [ ] Visit http://localhost:8788/cases/ (case studies)
- [ ] Visit some static assets (CSS, JS, images)

### Verify Data Collection
- [ ] Check local database: `npx wrangler d1 execute visitor_log --local --command="SELECT * FROM logs ORDER BY timestamp DESC LIMIT 5"`
- [ ] Verify data shows correct IP, URL, country, user agent

### Test Dashboard
- [ ] Visit http://localhost:8788/admin/dashboard.html
- [ ] Login with password
- [ ] Verify statistics cards show numbers
- [ ] Verify charts render without errors
- [ ] Verify recent logs table shows your visits
- [ ] Check browser console for errors (should be none)

### Test API
- [ ] Run: `curl "http://localhost:8788/api/stats?password=admin123"`
- [ ] Verify JSON response with stats, logs, charts data
- [ ] Test with wrong password: should return 401

## Phase 4: Production Deployment

### Deploy to Cloudflare Pages
- [ ] Run: `npx wrangler pages deploy ./public`
  - Or push to GitHub if using auto-deploy
- [ ] Verify deployment succeeds
- [ ] Note the deployed URL

### Production Database Verification
- [ ] Run: `npx wrangler d1 execute visitor_log --remote --command="SELECT COUNT(*) FROM logs"`
- [ ] Initialize if needed (should already be done in Phase 1)

### Production Testing
- [ ] Visit your deployed site (generate some traffic)
- [ ] Visit `/admin/dashboard.html`
- [ ] Login with password
- [ ] Verify dashboard shows production data
- [ ] Check all charts render correctly
- [ ] Verify recent logs show real visitor data

### Smoke Tests
- [ ] Test from different devices/browsers
- [ ] Test from mobile device
- [ ] Test from different geographic locations (if possible)
- [ ] Generate lots of requests (rapid page reloads) to test performance
- [ ] Verify site is still fast (should be no impact)

## Phase 5: Monitoring Setup

### Initial Monitoring
- [ ] Bookmark the dashboard URL
- [ ] Set a calendar reminder to check analytics weekly
- [ ] Note the initial baseline statistics

### Optional Monitoring
- [ ] Set up alerts for unusual traffic patterns
- [ ] Create saved views for company visits (Microsoft, AMD)
- [ ] Set up automated database backup (if needed)
- [ ] Create data retention policy (e.g., delete logs after 90 days)

## Phase 6: Security Hardening (Optional but Recommended)

### Password Security
- [ ] Changed default password from `admin123`
- [ ] Password stored in environment variable (not hardcoded)
- [ ] Consider implementing Cloudflare Access for stronger auth

### Access Control
- [ ] Consider IP whitelisting for admin access
- [ ] Add rate limiting to `/api/stats` endpoint
- [ ] Consider adding 2FA for dashboard access
- [ ] Add HTTPS redirect (should be automatic with Cloudflare)

### Data Privacy
- [ ] Consider if you need to hash IPs before storage
- [ ] Add privacy policy if collecting visitor data
- [ ] Consider implementing data export/deletion for GDPR compliance
- [ ] Add cookie consent if tracking individual users

## Phase 7: Maintenance

### Regular Tasks
- [ ] Check dashboard weekly for insights
- [ ] Monitor database size (should stay manageable)
- [ ] Review and clean up old logs if needed
- [ ] Update company detection patterns as needed

### Database Maintenance
- [ ] Query: `SELECT COUNT(*) FROM logs` (check total size)
- [ ] Query: `SELECT MIN(timestamp), MAX(timestamp) FROM logs` (date range)
- [ ] Optional: Delete logs older than 90 days
  ```sql
  DELETE FROM logs WHERE timestamp < datetime('now', '-90 days')
  ```

### Updates & Improvements
- [ ] Keep documentation updated
- [ ] Add more charts as needed
- [ ] Enhance company detection patterns
- [ ] Add new metrics based on your needs
- [ ] Consider adding email alerts for company visits

## Troubleshooting Quick Reference

### Dashboard Shows No Data
1. Generate traffic by visiting your site
2. Wait 5 seconds and refresh dashboard
3. Check database: `npx wrangler d1 execute visitor_log --remote --command="SELECT COUNT(*) FROM logs"`
4. Check browser console for errors
5. Verify password is correct

### Database Errors
1. Check database ID in `wrangler.jsonc`
2. Verify database exists: `npx wrangler d1 list`
3. Re-run schema initialization
4. Check Cloudflare dashboard for D1 status

### Charts Not Rendering
1. Check browser console for JavaScript errors
2. Verify Chart.js CDN is accessible
3. Check API returns valid JSON
4. Try different browser

### Performance Issues
1. Should be none - logging is async!
2. If site is slow, check it's not middleware:
   - Comment out database write temporarily
   - Test if performance improves
   - Check Cloudflare analytics for actual page load times

## Success Criteria

Your analytics system is successfully deployed when:
- ✅ Dashboard loads without errors
- ✅ Real-time data shows visits
- ✅ Charts render correctly
- ✅ API returns valid JSON
- ✅ Site performance is unchanged (no slowdown)
- ✅ Password protection works
- ✅ Company visits are detected
- ✅ Geographic data shows countries

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Database not found | Run `wrangler d1 create` and update ID in `wrangler.jsonc` |
| 401 Unauthorized | Check password, ensure `ADMIN_PASSWORD` env var is set if changed |
| No data showing | Visit your site to generate traffic, then refresh dashboard |
| Charts don't render | Check browser console, verify API returns data |
| Slow page load | This shouldn't happen - check it's not caused by something else |

## Support Resources

- **Cloudflare D1 Docs**: https://developers.cloudflare.com/d1/
- **Cloudflare Pages Functions**: https://developers.cloudflare.com/pages/functions/
- **Chart.js Docs**: https://www.chartjs.org/docs/
- **Project Documentation**: See `VISITOR_ANALYTICS_SETUP.md`

---

**Ready to launch! 🚀**

Once you complete this checklist, your visitor analytics system will be fully operational and tracking every visit to your portfolio site.
