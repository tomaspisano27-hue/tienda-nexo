import { STOCK_COLORS } from './constants';
import { StockStatus } from '@/types';

export function getStockStatus(stock: number, minStock: number = 10): StockStatus {
  if (stock === 0) return 'out';
  if (stock <= minStock) return 'low';
  return 'available';
}

export function getStockColor(status: StockStatus) {
  return STOCK_COLORS[status];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-AR').format(num);
}

export function truncate(str: string, length: number = 50): string {
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export function generateProductUrl(productId: string, productName: string): string {
  const slug = productName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  return `/catalog/${slug}-${productId}`;
}

export function generateWhatsAppMessage(productName: string, productCode: string): string {
  return `Hola, me interesa consultar sobre el producto: *${productName}* (Código: ${productCode})`;
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}
