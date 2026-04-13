#!/bin/bash
# Visitor Analytics Quick Start Script
# Run these commands in order to set up your visitor analytics system

echo "=== Visitor Analytics Setup ==="
echo ""

echo "Step 1: Create D1 Database"
echo "Run: npx wrangler d1 create visitor_log"
echo "Copy the database_id from the output!"
echo ""

echo "Step 2: Update wrangler.jsonc"
echo "Replace 'YOUR_DATABASE_ID_HERE' with your actual database ID"
echo ""

echo "Step 3: Initialize Database Schema (Local)"
npx wrangler d1 execute visitor_log --local --file=./schema.sql
echo ""

echo "Step 4: Initialize Database Schema (Production)"
npx wrangler d1 execute visitor_log --remote --file=./schema.sql
echo ""

echo "Step 5: Set Admin Password (Optional)"
echo "Run: npx wrangler secret put ADMIN_PASSWORD"
echo "Or add it in Cloudflare Pages dashboard settings"
echo ""

echo "Step 6: Test Locally"
echo "Run: npx wrangler pages dev ./public --binding=DB:visitor_log"
echo "Then visit: http://localhost:8788/admin/dashboard.html"
echo ""

echo "Step 7: Deploy to Production"
echo "Run: npx wrangler pages deploy ./public"
echo "Or push to GitHub if using auto-deploy"
echo ""

echo "=== Setup Complete! ==="
echo "Access your dashboard at: https://your-domain.com/admin/dashboard.html"
echo "Default password: admin123"
