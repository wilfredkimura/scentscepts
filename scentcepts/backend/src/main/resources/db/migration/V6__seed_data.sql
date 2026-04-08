-- ============================================================
--  V6__seed_data
--  Initial luxury brands and perfumes for Scentcepts
-- ============================================================

-- Seed Brands
INSERT INTO brands (id, name, logo_url, created_at, updated_at) VALUES 
('e1a72680-7768-4f24-9b2f-4b0c7c8c8c81', 'Chanel', '/images/brands/chanel.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('e1a72680-7768-4f24-9b2f-4b0c7c8c8c82', 'Dior', '/images/brands/dior.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('e1a72680-7768-4f24-9b2f-4b0c7c8c8c83', 'Creed', '/images/brands/creed.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('e1a72680-7768-4f24-9b2f-4b0c7c8c8c84', 'Tom Ford', '/images/brands/tomford.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Products
INSERT INTO products (id, name, description, top_notes, middle_notes, base_notes, decant_price, full_bottle_price, image_url, brand_id, created_at, updated_at) VALUES
-- Chanel
('f1b72680-7768-4f24-9b2f-4b0c7c8c8d01', 'Bleu de Chanel', 'A woody, aromatic fragrance for the man who defies convention.', 'Lemon, Mint, Pink Pepper', 'Ginger, Nutmeg, Jasmine', 'Sandalwood, Cedar, White Musk', 1500.00, 18500.00, '/uploads/bleu-de-chanel.jpg', 'e1a72680-7768-4f24-9b2f-4b0c7c8c8c81', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Dior
('f1b72680-7768-4f24-9b2f-4b0c7c8c8d02', 'Sauvage Elixir', 'An extraordinarily concentrated fragrance steeped in the emblematic freshness of Sauvage.', 'Grapefruit, Cinnamon, Cardamom', 'Lavender', 'Amber, Licorice, Sandalwood', 2200.00, 24000.00, '/uploads/sauvage-elixir.jpg', 'e1a72680-7768-4f24-9b2f-4b0c7c8c8c82', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Creed
('f1b72680-7768-4f24-9b2f-4b0c7c8c8d03', 'Aventus', 'Inspired by the dramatic life of a historic emperor who waged war, peace, and romance.', 'Bergamot, Blackcurrant, Apple', 'Burch, Patchouli, Jasmine', 'Musk, Oak Moss, Vanilla', 2800.00, 48000.00, '/uploads/creed-aventus.jpg', 'e1a72680-7768-4f24-9b2f-4b0c7c8c8c83', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Tom Ford
('f1b72680-7768-4f24-9b2f-4b0c7c8c8d04', 'Ombré Leather', 'The tactile sensuality of rich black leather, textured with addictive patchouli and vetiver.', 'Cardamom', 'Leather, Jasmine Sambac', 'Amber, Moss, Patchouli', 1800.00, 22000.00, '/uploads/tom-ford-obre.jpg', 'e1a72680-7768-4f24-9b2f-4b0c7c8c8c84', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
