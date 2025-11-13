# IA & Automatización - Plataforma de Curso

Plataforma web completa para el curso "Inteligencia Artificial y Automatización para Profesionales" con sistema de personalización con IA.

## Tecnologías Utilizadas

- **Frontend**: Next.js 14+ (App Router) con TypeScript
- **Styling**: Tailwind CSS
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **IA**: Anthropic Claude API
- **Pagos**: Stripe + Mercado Pago
- **Deployment**: Vercel (recomendado)

## Estructura del Proyecto

```
ia-automation-course/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Landing page
│   ├── globals.css          # Estilos globales
│   ├── api/                 # API routes (próximo)
│   ├── auth/                # Páginas de autenticación (próximo)
│   ├── dashboard/           # Dashboard de estudiantes (próximo)
│   └── intake/              # Sistema de intake con IA (próximo)
├── components/
│   ├── landing/             # Componentes de landing page
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSolutionSection.tsx
│   │   ├── DifferentiatorsSection.tsx
│   │   ├── CourseStructureSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── FAQSection.tsx
│   ├── shared/              # Componentes compartidos
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── dashboard/           # Componentes del dashboard (próximo)
├── lib/
│   ├── supabase/            # Configuración de Supabase
│   │   ├── client.ts        # Cliente para navegador
│   │   ├── server.ts        # Cliente para servidor
│   │   └── middleware.ts    # Middleware de autenticación
│   └── utils/               # Utilidades (próximo)
├── types/
│   └── course.ts            # Tipos TypeScript
├── public/                  # Archivos estáticos
├── middleware.ts            # Middleware de Next.js
├── supabase-schema.sql      # Schema de base de datos
└── .env.local.example       # Variables de entorno de ejemplo
```

## Setup Inicial

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` basado en `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` y agrega tus credenciales:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Mercado Pago
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=TEST-xxx
MERCADO_PAGO_ACCESS_TOKEN=TEST-xxx

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-xxx

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve a SQL Editor en tu proyecto de Supabase
3. Ejecuta el contenido de `supabase-schema.sql` para crear las tablas
4. Copia tu URL de proyecto y Anon Key a `.env.local`

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estado del Proyecto

### ✅ Completado (Fase 1 - MVP Base)

- [x] Configuración de Next.js 14+ con TypeScript y Tailwind CSS
- [x] Configuración de Supabase (cliente, servidor, middleware)
- [x] Schema de base de datos completo
- [x] Landing page completa con todas las secciones:
  - Hero section con CTA principal
  - Problema/Solución
  - Diferenciadores clave
  - Estructura del curso (12 módulos)
  - Precios (3 tiers)
  - FAQs
  - Footer con links legales
- [x] Navbar responsive
- [x] Tipos TypeScript para el curso

### 🚧 Pendiente (Fase 2)

- [ ] Sistema de AI Intake (pre-compra)
  - [ ] Interfaz de chat interactiva
  - [ ] Integración con Claude API
  - [ ] Generación de ruta personalizada
  - [ ] Visualización de la ruta generada
- [ ] Sistema de autenticación
  - [ ] Login/Signup pages
  - [ ] Auth con Supabase
  - [ ] Protección de rutas
- [ ] Dashboard del estudiante (LMS)
  - [ ] Vista de progreso
  - [ ] Reproductor de video
  - [ ] Sistema de checkpoints
  - [ ] Biblioteca completa
- [ ] Integración de pagos
  - [ ] Stripe checkout
  - [ ] Mercado Pago checkout
  - [ ] Webhooks
- [ ] Páginas adicionales
  - [ ] /about
  - [ ] /syllabus
  - [ ] /terms, /privacy, /refund

## Scripts Disponibles

```bash
npm run dev      # Ejecutar servidor de desarrollo
npm run build    # Construir para producción
npm start        # Ejecutar servidor de producción
npm run lint     # Ejecutar linter
```

## Notas de Desarrollo

### Datos del Curso

Los datos del curso (12 módulos) están actualmente hardcodeados en `CourseStructureSection.tsx`.
Cuando tengas el syllabus JSON completo, reemplaza estos datos con los reales.

### Personalización del Diseño

Todos los colores principales usan el sistema de gradientes de Tailwind:
- Primary: `purple-600` a `blue-600`
- Accent: `yellow-400` a `orange-500`

Puedes ajustar estos en `tailwind.config.ts` si deseas cambiar la paleta.

### Próximos Pasos Recomendados

1. **Crear páginas estáticas**: `/about`, `/terms`, `/privacy`
2. **Implementar sistema de AI Intake**: La funcionalidad más importante y diferenciadora
3. **Sistema de autenticación**: Para acceso al LMS
4. **Dashboard básico**: Progreso del usuario y reproductor de video
5. **Integración de Stripe**: Para comenzar a recibir pagos

## Despliegue

### Vercel (Recomendado)

1. Push tu código a GitHub
2. Conecta tu repo en [Vercel](https://vercel.com)
3. Agrega las variables de entorno
4. Deploy automático

### Otros Proveedores

El proyecto funciona en cualquier plataforma que soporte Next.js 14+:
- Netlify
- Railway
- DigitalOcean App Platform

## Soporte

Para preguntas o problemas, contacta a Pablo en [email].

## Licencia

Propietario - Beta AI © 2025
