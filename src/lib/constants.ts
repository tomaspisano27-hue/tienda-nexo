export const BUSINESS_INFO = {
  name: 'Tienda Nexo',
  tagline: 'Tu distribuidor mayorista de productos para kioscos',
  description: 'Más de cientos de productos con stock permanente y envíos a todo el país',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+54 9 11 1234-5678',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'contacto@tiendasnexo.com.ar',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Buenos Aires, Argentina',
  whatsapp: process.env.WHATSAPP_PHONE_NUMBER || '5491123456789',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
  },
  hours: {
    weekday: '08:00 - 18:00',
    saturday: '09:00 - 13:00',
    sunday: 'Cerrado',
  },
};

export const STOCK_COLORS = {
  available: {
    status: 'available' as const,
    color: 'bg-green-100',
    textColor: 'text-green-700',
    label: 'Disponible',
    badge: '🟢',
  },
  low: {
    status: 'low' as const,
    color: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    label: 'Poco stock',
    badge: '🟡',
  },
  out: {
    status: 'out' as const,
    color: 'bg-red-100',
    textColor: 'text-red-700',
    label: 'Sin stock',
    badge: '🔴',
  },
};

export const PAGINATION = {
  defaultLimit: 12,
  maxLimit: 100,
};

export const SORT_OPTIONS = [
  { label: 'Más Recientes', value: 'newest', sortBy: 'created_at', sortOrder: 'desc' },
  { label: 'Nombre (A-Z)', value: 'name-asc', sortBy: 'name', sortOrder: 'asc' },
  { label: 'Nombre (Z-A)', value: 'name-desc', sortBy: 'name', sortOrder: 'desc' },
  { label: 'Precio (Menor)', value: 'price-asc', sortBy: 'price_unit', sortOrder: 'asc' },
  { label: 'Precio (Mayor)', value: 'price-desc', sortBy: 'price_unit', sortOrder: 'desc' },
  { label: 'Stock (Menor)', value: 'stock-asc', sortBy: 'stock', sortOrder: 'asc' },
  { label: 'Stock (Mayor)', value: 'stock-desc', sortBy: 'stock', sortOrder: 'desc' },
];

export const BENEFITS = [
  {
    title: 'Envíos a todo el país',
    description: 'Llegamos a cualquier rincón de Argentina',
    icon: '🚚',
  },
  {
    title: 'Stock actualizado',
    description: 'Información en tiempo real de disponibilidad',
    icon: '📊',
  },
  {
    title: 'Precios mayoristas',
    description: 'Precios competitivos y por volumen',
    icon: '💰',
  },
  {
    title: 'Atención personalizada',
    description: 'Equipo dedicado a tu negocio',
    icon: '👥',
  },
  {
    title: 'Compra rápida',
    description: 'Proceso simple y sin complicaciones',
    icon: '⚡',
  },
  {
    title: 'Amplio catálogo',
    description: 'Cientos de productos disponibles',
    icon: '📦',
  },
];
