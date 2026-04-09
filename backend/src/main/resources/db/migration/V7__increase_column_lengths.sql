-- ============================================================
--  V7__increase_column_lengths
--  Description: Increase lengths for logo_url, image_url, and note fields to handle long inputs.
-- ============================================================

-- Increase brand logo URL length
ALTER TABLE brands ALTER COLUMN logo_url TYPE TEXT;

-- Increase product image URL length
ALTER TABLE products ALTER COLUMN image_url TYPE TEXT;

-- Increase product notes length
ALTER TABLE products ALTER COLUMN top_notes TYPE TEXT;
ALTER TABLE products ALTER COLUMN middle_notes TYPE TEXT;
ALTER TABLE products ALTER COLUMN base_notes TYPE TEXT;
