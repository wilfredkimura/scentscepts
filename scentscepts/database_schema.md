# Database Schema Design (PostgreSQL)

*Designed for high scalability, performance, and future expansion.*

## 📌 Architectural Decisions
- **UUID Primary Keys:** Used across all tables instead of auto-incrementing integers. This prevents ID guessing (security) and makes database sharding, merging, or replicating significantly easier as the app scales.
- **Audit Columns:** Every table includes `created_at` and `updated_at` timestamps for tracking data changes.
- **Soft Deletes:** `deleted_at` column implemented in core tables (like Products and Users) for safe data removal without breaking relational historical integrity (e.g., past orders linking to a deleted product).
- **Role-based Authentication:** A unified `users` table handles both Customers and Admins via a `role` enum. This scales better than separate `admins` and `customers` tables.
- **Indexing Strategy:** B-Tree indexes placed on foreign keys and frequently queried filtering fields (e.g., `role`, `status`, `brand_id`) to maintain fast read queries as data grows.
- **Historical Price Safety:** `order_items` stores the `price_at_purchase`. If a product price changes in the future, past orders will not be affected.

---

## 🗂️ Tables

### `users`
Handles both Admin staff and end-customer profiles.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL | User's full name |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User's email address |
| `phone_number` | VARCHAR(20) | | Contact number |
| `address` | TEXT | | Default delivery address |
| `password_hash` | VARCHAR(255) | | Hashed password (for admins/registered users) |
| `role` | VARCHAR(50) | NOT NULL, DEFAULT 'CUSTOMER' | 'ADMIN' or 'CUSTOMER' |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |
| `deleted_at` | TIMESTAMPTZ | NULL | For soft deletes |

*Indexes:* `CREATE INDEX idx_users_email ON users(email);`
*Indexes:* `CREATE INDEX idx_users_role ON users(role);`

### `brands`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `name` | VARCHAR(255) | UNIQUE, NOT NULL | Brand name |
| `logo_url` | TEXT | | URL to brand logo |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |

### `products`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `brand_id` | UUID | FOREIGN KEY (`brands.id`) | Relates to Brand |
| `name` | VARCHAR(255) | NOT NULL | Perfume name |
| `description` | TEXT | | Full product description |
| `top_notes` | VARCHAR(255) | | Comma-separated |
| `middle_notes` | VARCHAR(255) | | Comma-separated |
| `base_notes` | VARCHAR(255) | | Comma-separated |
| `decant_price` | DECIMAL(10,2) | NOT NULL | Price for 10ml |
| `full_bottle_price` | DECIMAL(10,2) | NOT NULL | Price for full bottle |
| `image_url` | TEXT | | URL to product image |
| `stock_quantity` | INTEGER | NOT NULL, DEFAULT 0 | Inventory tracking |
| `availability` | VARCHAR(50) | NOT NULL, DEFAULT 'AVAILABLE' | 'AVAILABLE', 'SOLD_OUT' |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |
| `deleted_at` | TIMESTAMPTZ | NULL | Soft delete products |

*Indexes:* `CREATE INDEX idx_products_brand_id ON products(brand_id);`
*Indexes:* `CREATE INDEX idx_products_availability ON products(availability);`

### `orders`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `user_id` | UUID | FOREIGN KEY (`users.id`) | Order owner |
| `total_amount` | DECIMAL(10,2) | NOT NULL | Final calculated total |
| `status` | VARCHAR(50) | NOT NULL, DEFAULT 'PENDING' | 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED' |
| `delivery_address` | TEXT | NOT NULL | Address for this specific order |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |

*Indexes:* `CREATE INDEX idx_orders_user_id ON orders(user_id);`
*Indexes:* `CREATE INDEX idx_orders_status ON orders(status);`
*Indexes:* `CREATE INDEX idx_orders_created_at ON orders(created_at);`

### `order_items`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `order_id` | UUID | FOREIGN KEY (`orders.id`) | Associated order |
| `product_id` | UUID | FOREIGN KEY (`products.id`) | Purchased product |
| `size` | VARCHAR(50) | NOT NULL | 'DECANT_10ML', 'FULL_BOTTLE' |
| `quantity` | INTEGER | NOT NULL | Quantity purchased |
| `price_at_purchase` | DECIMAL(10,2)| NOT NULL | Snapshot of price to prevent historical changes |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |

*Indexes:* `CREATE INDEX idx_order_items_order_id ON order_items(order_id);`
*Indexes:* `CREATE INDEX idx_order_items_product_id ON order_items(product_id);`
