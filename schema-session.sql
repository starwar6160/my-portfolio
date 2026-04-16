-- Session-based Visitor Analytics Database Schema
-- Create sessions table for session-level logging
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT NOT NULL,
  landing_page TEXT NOT NULL,           -- First page accessed
  user_agent TEXT,
  country TEXT,
  referer TEXT,                         -- Traffic source
  hits INTEGER DEFAULT 1,                -- Total requests in this session
  pages_viewed INTEGER DEFAULT 1,        -- Number of HTML pages viewed
  session_start DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_first_visit BOOLEAN DEFAULT 1       -- 1 = first time we've seen this IP
);

-- Create index on session_start for time-based analytics
CREATE INDEX IF NOT EXISTS idx_session_start ON sessions(session_start);

-- Create index on IP for session analytics
CREATE INDEX IF NOT EXISTS idx_session_ip ON sessions(ip);

-- Create index on country for geographical analytics
CREATE INDEX IF NOT EXISTS idx_session_country ON sessions(country);

-- Create index on referer for source tracking
CREATE INDEX IF NOT EXISTS idx_session_referer ON sessions(referer);

-- Create index on last_seen for session timeout detection
CREATE INDEX IF NOT EXISTS idx_last_seen ON sessions(last_seen);
