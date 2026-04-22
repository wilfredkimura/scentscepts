-- ============================================================
--  V8__increase_user_avatar_length
--  Description: Increase length for avatar_url field in users table.
-- ============================================================

-- Increase user avatar URL length
ALTER TABLE users ALTER COLUMN avatar_url TYPE TEXT;
