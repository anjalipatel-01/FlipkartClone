-- ============================================================
-- Migration: Add auth, wishlists, and seed test user
-- Safe to run on existing databases (all operations are idempotent)
-- ============================================================

-- 1. Ensure users table exists with password_hash column
--    (schema.sql creates users without password_hash; this covers both cases)
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(255)  NOT NULL,
  email         VARCHAR(255)  UNIQUE NOT NULL,
  password_hash VARCHAR(255)  NOT NULL DEFAULT '',
  phone         VARCHAR(20),
  created_at    TIMESTAMP     DEFAULT NOW()
);

-- Add password_hash if users table already existed without it
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255) NOT NULL DEFAULT '';

-- Add gender for profile read/update support
ALTER TABLE users ADD COLUMN IF NOT EXISTS gender VARCHAR(20);

-- 2. Ensure cart and orders have user_id (no-op if already present)
ALTER TABLE cart   ADD COLUMN IF NOT EXISTS user_id INT REFERENCES users(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id INT REFERENCES users(id);

-- 3. Insert the default test user (skip if email already exists)
--    password_hash below is bcrypt hash of 'password123' (saltRounds=10)
INSERT INTO users (name, email, password_hash, phone)
VALUES (
  'Test User',
  'test@flipkart.com',
  '$2b$10$l652vNVOGkvW2ijWUBCizuHhT1TxqgWmm/QzQK7.2e62SWTNXG8m.',
  '9999999999'
)
ON CONFLICT (email) DO NOTHING;

-- 4. Assign any orphaned cart/order rows to the test user (id=1)
UPDATE cart   SET user_id = 1 WHERE user_id IS NULL;
UPDATE orders SET user_id = 1 WHERE user_id IS NULL;

-- 5. Wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id         SERIAL PRIMARY KEY,
  user_id    INT REFERENCES users(id)    ON DELETE CASCADE,
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- 6. Helpful indexes
CREATE INDEX IF NOT EXISTS idx_wishlists_user ON wishlists(user_id);
