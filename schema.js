-- ============================
-- SmartThings Devices
-- ============================

CREATE TABLE IF NOT EXISTS devices (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'off',
    manufacturer TEXT DEFAULT 'Mickey',
    model TEXT DEFAULT 'Virtual Switch',
    room TEXT DEFAULT '',
    enabled INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_devices_enabled
ON devices(enabled);

-- Sample devices

INSERT INTO devices
(id,name,type,state)
VALUES
('website','Website','switch','off'),
('maintenance','Maintenance','switch','off'),
('server','Server','switch','off');
-- ============================
-- OAuth Tokens
-- ============================

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
