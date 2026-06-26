-- ===========================================
-- Mickey SmartThings Schema Database
-- Cloudflare D1
-- ===========================================

PRAGMA foreign_keys = ON;

-- ===========================================
-- Devices
-- ===========================================

CREATE TABLE IF NOT EXISTS devices (

    id TEXT PRIMARY KEY,

    name TEXT NOT NULL,

    type TEXT NOT NULL,

    state TEXT NOT NULL DEFAULT 'off',

    manufacturer TEXT DEFAULT 'Mickey',

    model TEXT DEFAULT 'Virtual Switch',

    hardware_version TEXT DEFAULT '1.0',

    software_version TEXT DEFAULT '1.0',

    room TEXT DEFAULT '',

    enabled INTEGER DEFAULT 1,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE INDEX IF NOT EXISTS idx_devices_enabled
ON devices(enabled);

-- ===========================================
-- OAuth Tokens
-- ===========================================

CREATE TABLE IF NOT EXISTS oauth_tokens (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    access_token TEXT UNIQUE NOT NULL,

    refresh_token TEXT UNIQUE NOT NULL,

    expires_at INTEGER NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE INDEX IF NOT EXISTS idx_access_token
ON oauth_tokens(access_token);

CREATE INDEX IF NOT EXISTS idx_refresh_token
ON oauth_tokens(refresh_token);

-- ===========================================
-- Installations
-- ===========================================

CREATE TABLE IF NOT EXISTS installations (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    installed_app_id TEXT UNIQUE,

    location_id TEXT,

    owner_id TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

-- ===========================================
-- Device Events
-- ===========================================

CREATE TABLE IF NOT EXISTS events (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    device_id TEXT NOT NULL,

    event_type TEXT NOT NULL,

    value TEXT,

    source TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(device_id) REFERENCES devices(id)

);

CREATE INDEX IF NOT EXISTS idx_events_device
ON events(device_id);

-- ===========================================
-- Logs
-- ===========================================

CREATE TABLE IF NOT EXISTS logs (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    level TEXT,

    message TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

-- ===========================================
-- Sample Devices
-- ===========================================

INSERT OR IGNORE INTO devices
(id,name,type,state)
VALUES
('website','Website','switch','off'),

('maintenance','Maintenance','switch','off'),

('server','Server','switch','off'),

('notifications','Notifications','switch','off');
