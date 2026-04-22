-- ============================================================
--  V7__update_seed_data
--  Updates seeded products with real image URLs and stock info
--  so the database is production-ready on first run.
-- ============================================================

-- Update Bleu de Chanel
UPDATE products SET
    image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5xn9gG-geyrQD-YnoXuBMpZXgS_xz1Ijg5A&s',
    stock_quantity = 100,
    availability = 'IN_STOCK',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 'f1b72680-7768-4f24-9b2f-4b0c7c8c8d01';

-- Update Sauvage Elixir
UPDATE products SET
    image_url = 'https://fragrancekenya.com/wp-content/uploads/2021/09/dior-elixir-sauvage.jpg',
    stock_quantity = 100,
    availability = 'IN_STOCK',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 'f1b72680-7768-4f24-9b2f-4b0c7c8c8d02';

-- Update Aventus
UPDATE products SET
    image_url = 'https://www.creedperfume.com.au/cdn/shop/files/AbsoluAventus100ml_1400x.png?v=1749012235',
    stock_quantity = 100,
    availability = 'IN_STOCK',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 'f1b72680-7768-4f24-9b2f-4b0c7c8c8d03';

-- Update Ombré Leather
UPDATE products SET
    image_url = 'https://fragrancekenya.com/wp-content/uploads/2018/10/tf-ombreleather1.jpg',
    decant_price = 2001.00,
    stock_quantity = 100,
    availability = 'IN_STOCK',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 'f1b72680-7768-4f24-9b2f-4b0c7c8c8d04';
