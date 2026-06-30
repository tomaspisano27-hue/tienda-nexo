# Tienda Nexo - Distribuidora Mayorista de Productos para Kioscos

## 🎯 Descripción

Tienda Nexo es una plataforma de ecommerce B2B profesional diseñada para distribuidoras mayoristas de productos para kioscos. Ofrece un catálogo rápido, actualización en tiempo real de stock y una experiencia de usuario optimizada para comercios, distribuidores y revendedores.

## ✨ Características Principales

- 🛍️ **Catálogo Profesional**: Búsqueda avanzada, filtros y ordenamiento
- 📊 **Stock en Tiempo Real**: Actualización automática desde Supabase
- 💰 **Precios Mayoristas**: Precios por unidad, blister y bulto
- 🎨 **Diseño Minimalista**: Azul oscuro, blanco y detalles en naranja
- 📱 **Responsive**: Optimizado para PC y dispositivos móviles
- ⚡ **Carga Rápida**: Optimizado con Next.js y lazy loading
- 🔐 **Panel Admin**: Gestión completa de productos y categorías
- 📤 **Importar/Exportar**: CSV y Excel para gestión masiva
- 🔍 **SEO Optimizado**: Meta tags, Schema.org, sitemap dinámico

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15, React 18, TypeScript
- **Estilos**: Tailwind CSS, Framer Motion
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Íconos**: Lucide React
- **UI Components**: Shadcn/UI
- **Estado Global**: Zustand
- **Queries**: React Query (@tanstack/react-query)
- **Validación**: React Hook Form + Zod

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta en Supabase
- Git

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tomaspisano27-hue/tienda-nexo.git
cd tienda-nexo
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
ADMIN_PASSWORD=tu_contraseña_admin
WHATSAPP_PHONE_NUMBER=tu_número_whatsapp
NEXT_PUBLIC_BUSINESS_EMAIL=contacto@tiendasnexo.com.ar
```

### 4. Crear la base de datos

```bash
# Ejecutar el script SQL en Supabase
npm run db:push
```

O copiar el contenido de `supabase-schema.sql` en la consola SQL de Supabase.

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Estructura del Proyecto

```
tienda-nexo/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout principal
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Estilos globales
│   │   ├── catalog/
│   │   │   ├── page.tsx            # Página de catálogo
│   │   │   └── [slug].tsx          # Detalle de producto
│   │   ├── admin/
│   │   │   ├── page.tsx            # Panel de admin
│   │   │   ├── products/           # Gestión de productos
│   │   │   ├── categories/         # Gestión de categorías
│   │   │   └── layout.tsx          # Admin layout con autenticación
│   │   ├── contact/
│   │   │   └── page.tsx            # Página de contacto
│   │   └── api/
│   │       ├── products/           # Endpoints de productos
│   │       ├── categories/         # Endpoints de categorías
│   │       ├── upload/             # Endpoints de upload
│   │       └── contact/            # Endpoints de contacto
│   ├── components/
│   │   ├── sections/
│   │   │   ├── hero.tsx            # Sección hero
│   │   │   ├── benefits.tsx        # Sección beneficios
│   │   │   ├── featured.tsx        # Productos destacados
│   │   │   ├── cta.tsx             # Call to action
│   │   │   └── footer.tsx          # Footer
│   │   ├── catalog/
│   │   │   ├── product-card.tsx    # Tarjeta de producto
│   │   │   ├── product-grid.tsx    # Grid de productos
│   │   │   ├── search-bar.tsx      # Buscador
│   │   │   ├── filters.tsx         # Filtros
│   │   │   └── sort.tsx            # Ordenamiento
│   │   ├── layout/
│   │   │   ├── navbar.tsx          # Barra de navegación
│   │   │   ├── header.tsx          # Header
│   │   │   └── sidebar.tsx         # Sidebar
│   │   ├── common/
│   │   │   ├── button.tsx          # Botón reutilizable
│   │   │   ├── card.tsx            # Card reutilizable
│   │   │   ├── badge.tsx           # Badge
│   │   │   ├── loading.tsx         # Skeleton loaders
│   │   │   ├── modal.tsx           # Modal
│   │   │   └── toast.tsx           # Notificaciones
│   │   └── admin/
│   │       ├── product-form.tsx    # Formulario de producto
│   │       ├── import-modal.tsx    # Modal de importación
│   │       └── table.tsx           # Tabla de gestión
│   ├── lib/
│   │   ├── supabase.ts             # Cliente de Supabase
│   │   ├── api.ts                  # Funciones de API
│   │   ├── hooks.ts                # Custom hooks
│   │   ├── store.ts                # Zustand store
│   │   ├── utils.ts                # Utilidades
│   │   ├── constants.ts            # Constantes
│   │   └── validators.ts           # Validadores (zod)
│   ├── types/
│   │   └── index.ts                # Tipos TypeScript
│   └── styles/
│       └── globals.css             # Estilos globales
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
│       ├── hero.svg
│       ├── logo.svg
│       └── ...
├── supabase-schema.sql             # Schema de base de datos
├── .env.local.example              # Ejemplo de variables de entorno
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## 🗄️ Base de Datos

Ver `supabase-schema.sql` para la estructura completa de tablas:

- `categories` - Categorías de productos
- `products` - Catálogo de productos
- `favorites` - Productos favoritos del usuario
- `admin_logs` - Registro de actividades del admin

## 🔒 Autenticación Admin

El panel de admin está protegido por contraseña. Por seguridad en producción:

1. Usar Supabase Auth con roles
2. Implementar 2FA
3. Usar bcrypt para contraseña

## 📱 Funcionalidades

### Para Clientes
- ✅ Búsqueda de productos
- ✅ Filtros por categoría, marca, precio
- ✅ Visualizar stock en tiempo real
- ✅ Ver precios por unidad, blister, bulto
- ✅ Agregar a favoritos
- ✅ Compartir producto
- ✅ Contactar por WhatsApp
- ✅ Ver productos relacionados
- ✅ Suscribirse a notificaciones de stock

### Para Admin
- ✅ CRUD de productos
- ✅ CRUD de categorías
- ✅ Gestión de precios
- ✅ Control de stock
- ✅ Importar desde CSV/Excel
- ✅ Exportar a CSV
- ✅ Subir imágenes
- ✅ Ver logs de actividad
- ✅ Gestionar destacados y ofertas

## 🚀 Despliegue en Vercel

### 1. Preparar el repositorio

```bash
git add .
git commit -m "Tienda Nexo: versión inicial lista para producción"
git push origin main
```

### 2. Configurar en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. En "Environment Variables", agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
   - `WHATSAPP_PHONE_NUMBER`
   - `NEXT_PUBLIC_BUSINESS_EMAIL`
   - `NEXT_PUBLIC_SITE_URL=https://tiendasnexo.com.ar`

### 3. Deploy

```bash
vercel --prod
```

O conecta GitHub y Vercel deploya automáticamente en cada push a `main`.

## 🔍 SEO

- Meta tags personalizadas por página
- Open Graph para redes sociales
- Schema.org para rich snippets
- Sitemap dinámico
- Robots.txt optimizado
- URLs amigables
- Lazy loading de imágenes
- Core Web Vitals optimizados

## 📈 Rendimiento

- ⚡ Next.js 15 con App Router
- 🖼️ Optimización de imágenes
- 🔄 ISR (Incremental Static Regeneration)
- 📦 Code splitting automático
- 🗜️ Compresión GZIP
- 🚀 CDN en Vercel
- ⏱️ LCP < 2.5s, FID < 100ms, CLS < 0.1

## 🐛 Troubleshooting

### El catálogo no carga
- Verificar credenciales de Supabase en `.env.local`
- Asegurar que las tablas existan en la BD
- Revisar logs: `npm run dev` (verá errores en consola)

### Las imágenes no se muestran
- Verificar que la URL de Supabase sea correcta
- Asegurar que el bucket `products` exista y sea público
- Usar URLs completamente cualificadas

### Admin no responde
- Verificar `ADMIN_PASSWORD` en `.env.local`
- Limpiar cookies/cache del navegador
- Resetear contraseña en `.env.local` y reiniciar

## 📝 Licencia

Propietario - Tienda Nexo

## 👥 Soporte

Para preguntas o soporte, contacta a través de:
- WhatsApp: [Número]
- Email: contacto@tiendasnexo.com.ar

---

**Made with ❤️ for B2B ecommerce in Argentina**
