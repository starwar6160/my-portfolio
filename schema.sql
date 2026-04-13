-- Visitor Analytics Database Schema
-- Create logs table for storing visitor information
CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT NOT NULL,
  url TEXT NOT NULL,
  user_agent TEXT,
  country TEXT,
  referer TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on timestamp for faster queries
CREATE INDEX IF NOT EXISTS idx_timestamp ON logs(timestamp);

-- Create index on IP for analytics
CREATE INDEX IF NOT EXISTS idx_ip ON logs(ip);

-- Create index on country for geographical analytics
CREATE INDEX IF NOT EXISTS idx_country ON logs(country);

-- Create index on URL for page analytics
CREATE INDEX IF NOT EXISTS idx_url ON logs(url);

-- Create index on referer for source tracking
CREATE INDEX IF NOT EXISTS idx_referer ON logs(referer);
