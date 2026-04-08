-- =============================================================================
-- Scentcepts Database Setup Script
-- Run as: psql -U postgres -f setup-db.sql
-- =============================================================================

-- 1. Create the application user
CREATE USER scentcepts_user WITH PASSWORD 'scentcepts';

-- 2. Create the database owned by that user
CREATE DATABASE scentcepts_db OWNER scentcepts_user;

-- 3. Grant all privileges on the database
GRANT ALL PRIVILEGES ON DATABASE scentcepts_db TO scentcepts_user;

-- 4. Grant schema and object privileges (run after connecting to scentcepts_db)
\connect scentcepts_db

GRANT ALL ON SCHEMA public TO scentcepts_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL ON TABLES TO scentcepts_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL ON SEQUENCES TO scentcepts_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL ON FUNCTIONS TO scentcepts_user;

-- Flyway migration history table access
GRANT ALL ON ALL TABLES IN SCHEMA public TO scentcepts_user;

\echo '✅ Database setup complete. User: scentcepts_user, DB: scentcepts_db'
