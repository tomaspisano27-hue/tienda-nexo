// Types para Tienda Nexo

export type StockStatus = 'available' | 'low' | 'out';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  category_id: string;
  brand?: string;
  image_url?: string;
  price_unit: number;
  price_blister: number;
  price_bulk: number;
  stock: number;
  min_stock: number;
  status: 'active' | 'inactive' | 'discontinued';
  featured?: boolean;
  discount?: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface ProductWithCategory extends Product {
  category: Category;
}

export interface Favorite {
  id: string;
  user_id?: string;
  product_id: string;
  created_at: string;
}

export interface AdminLog {
  id: string;
  admin_id?: string;
  action: 'create' | 'update' | 'delete' | 'import' | 'export';
  entity_type: 'product' | 'category';
  entity_id: string;
  changes?: Record<string, any>;
  created_at: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at?: string;
}

export interface FilterOptions {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'stock' | 'newest';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type StockStatusColor = {
  status: StockStatus;
  color: string;
  label: string;
  textColor: string;
};
