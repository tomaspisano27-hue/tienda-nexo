import { Product, FilterOptions, PaginatedResponse, Category, ApiResponse } from '@/types';
import { supabase } from './supabase';

// Products API
export async function getProducts(
  options: FilterOptions = {}
): Promise<PaginatedResponse<Product>> {
  let query = supabase.from('products').select('*, categories(*)', { count: 'exact' });

  // Filters
  if (options.search) {
    query = query.or(`name.ilike.%${options.search}%,code.ilike.%${options.search}%,brand.ilike.%${options.search}%`);
  }

  if (options.category) {
    query = query.eq('category_id', options.category);
  }

  if (options.brand) {
    query = query.eq('brand', options.brand);
  }

  if (options.minPrice) {
    query = query.gte('price_unit', options.minPrice);
  }

  if (options.maxPrice) {
    query = query.lte('price_unit', options.maxPrice);
  }

  if (options.inStock) {
    query = query.gt('stock', 0);
  }

  query = query.eq('status', 'active');

  // Sorting
  const sortColumn = options.sortBy || 'created_at';
  const sortOrder = options.sortOrder || 'desc';
  query = query.order(sortColumn, { ascending: sortOrder === 'asc' });

  // Pagination
  const page = options.page || 1;
  const limit = options.limit || 12;
  const offset = (page - 1) * limit;
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return { success: false, data: [], total: 0, page, limit, totalPages: 0 };
  }

  return {
    success: true,
    data: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('featured', true)
    .eq('status', 'active')
    .limit(6);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data || [];
}

export async function getNewProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Error fetching new products:', error);
    return [];
  }

  return data || [];
}

// Categories API
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  return data;
}

// Favorites API
export async function addToFavorites(productId: string, userId?: string): Promise<ApiResponse<any>> {
  const { data, error } = await supabase
    .from('favorites')
    .insert([{ product_id: productId, user_id: userId }]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function removeFromFavorites(productId: string, userId?: string): Promise<ApiResponse<any>> {
  const query = supabase.from('favorites').delete().eq('product_id', productId);

  if (userId) {
    query.eq('user_id', userId);
  }

  const { error } = await query;

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function isFavorite(productId: string, userId?: string): Promise<boolean> {
  const query = supabase.from('favorites').select('id').eq('product_id', productId);

  if (userId) {
    query.eq('user_id', userId);
  }

  const { data, error } = await query.single();

  return !error && !!data;
}

// Contact API
export async function submitContactMessage(message: any): Promise<ApiResponse<any>> {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([message]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Stock status helper
export function getStockStatus(stock: number, minStock: number = 10) {
  if (stock === 0) return 'out';
  if (stock <= minStock) return 'low';
  return 'available';
}

// Format price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(price);
}
