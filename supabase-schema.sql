-- Tienda Nexo Database Schema
-- PostgreSQL with Supabase

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  brand VARCHAR(100),
  image_url TEXT,
  price_unit DECIMAL(10, 2) NOT NULL,
  price_blister DECIMAL(10, 2),
  price_bulk DECIMAL(10, 2),
  stock INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER DEFAULT 10,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'discontinued')),
  featured BOOLEAN DEFAULT FALSE,
  discount DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for products table
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_code ON products(code);
CREATE INDEX idx_products_name ON products USING GIN(name gin_trgm_ops);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_created_at ON products(created_at);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

CREATE INDEX idx_favorites_product_id ON favorites(product_id);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);

-- Admin logs table
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID,
  action VARCHAR(50) NOT NULL CHECK (action IN ('create', 'update', 'delete', 'import', 'export')),
  entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('product', 'category')),
  entity_id UUID,
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_admin_logs_created_at ON admin_logs(created_at);
CREATE INDEX idx_admin_logs_action ON admin_logs(action);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Anyone can read products and categories
CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);

-- RLS Policies - Only authenticated users can read/write favorites
CREATE POLICY "Authenticated can read favorites" ON favorites FOR SELECT USING (auth.role() = 'authenticated_user');
CREATE POLICY "Authenticated can insert favorites" ON favorites FOR INSERT WITH CHECK (auth.role() = 'authenticated_user');
CREATE POLICY "Authenticated can delete favorites" ON favorites FOR DELETE USING (auth.role() = 'authenticated_user');

-- RLS Policies - Anyone can insert contact messages
CREATE POLICY "Public can create contact messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Functions for auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-update timestamps
CREATE TRIGGER categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample categories
INSERT INTO categories (name, slug, description, icon) VALUES
  ('Bebidas', 'bebidas', 'Bebidas para kioscos', '🥤'),
  ('Golosinas', 'golosinas', 'Golosinas y snacks', '🍬'),
  ('Cigarrillos', 'cigarrillos', 'Productos de tabaco', '🚬'),
  ('Accesorios', 'accesorios', 'Accesorios y útiles', '🛍'),
  ('Higiene', 'higiene', 'Productos de higiene y limpieza', '🧼')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (code, name, description, category_id, brand, price_unit, price_blister, price_bulk, stock, min_stock, featured, status) VALUES
  ('COCA-001', 'Coca Cola 2.25L', 'Bebida refrescante', (SELECT id FROM categories WHERE slug = 'bebidas'), 'Coca Cola', 150.00, 445.00, 1250.00, 50, 10, true, 'active'),
  ('FANT-002', 'Fanta Naranja 2.25L', 'Bebida refrescante sabor naranja', (SELECT id FROM categories WHERE slug = 'bebidas'), 'Fanta', 120.00, 355.00, 1050.00, 45, 10, true, 'active'),
  ('SPRITE-003', 'Sprite 2.25L', 'Bebida refrescante limón', (SELECT id FROM categories WHERE slug = 'bebidas'), 'Sprite', 120.00, 355.00, 1050.00, 40, 10, true, 'active'),
  ('ARLTO-004', 'Arletito 1L', 'Jugo artificial', (SELECT id FROM categories WHERE slug = 'bebidas'), 'Arleto', 45.00, 130.00, 380.00, 100, 20, false, 'active'),
  ('CHOCO-005', 'Chocolate Milka 30g', 'Chocolate con leche', (SELECT id FROM categories WHERE slug = 'golosinas'), 'Milka', 35.00, 100.00, 280.00, 200, 50, false, 'active'),
  ('CHICHA-006', 'Chicle Adams Fruit', 'Chicle sabor frutas x5', (SELECT id FROM categories WHERE slug = 'golosinas'), 'Adams', 15.00, 42.00, 120.00, 150, 30, false, 'active'),
  ('CARAMELO-007', 'Caramelo Arcor Mix', 'Surtido de caramelos', (SELECT id FROM categories WHERE slug = 'golosinas'), 'Arcor', 25.00, 70.00, 200.00, 120, 25, false, 'active'),
  ('PALL-008', 'Pall Mall Roja', 'Cigarrillos x20', (SELECT id FROM categories WHERE slug = 'cigarrillos'), 'Pall Mall', 180.00, NULL, NULL, 75, 15, false, 'active'),
  ('MARL-009', 'Marlboro Gold', 'Cigarrillos x20', (SELECT id FROM categories WHERE slug = 'cigarrillos'), 'Marlboro', 200.00, NULL, NULL, 60, 15, false, 'active'),
  ('LIBR-010', 'Libretas Cuadriculadas', 'Libreta 80 hojas', (SELECT id FROM categories WHERE slug = 'accesorios'), 'Varios', 45.00, 130.00, 380.00, 250, 50, false, 'active'),
  ('LAPI-011', 'Lápiz HB x12', 'Caja de 12 lápices', (SELECT id FROM categories WHERE slug = 'accesorios'), 'Staedtler', 80.00, 230.00, 650.00, 100, 20, false, 'active'),
  ('PAPEL-012', 'Papel Higiénico x12', 'Rolos de papel higiénico', (SELECT id FROM categories WHERE slug = 'higiene'), 'Elite', 95.00, 280.00, 800.00, 180, 40, false, 'active')
ON CONFLICT (code) DO NOTHING;
