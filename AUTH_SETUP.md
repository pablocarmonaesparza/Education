# Sistema de Autenticación y Dashboard

## ✅ Lo que está listo

### Autenticación
- ✅ Formulario de registro (`/auth/signup`)
- ✅ Formulario de login (`/auth/login`)
- ✅ Integración completa con Supabase Auth
- ✅ Callback handler para OAuth
- ✅ Protección de rutas del dashboard

### Dashboard (Estilo Platzi)
- ✅ Sidebar con navegación
- ✅ Layout completo del dashboard
- ✅ Página principal con resumen de progreso
- ✅ Componentes de progreso (ProgressCard)
- ✅ Tarjetas de curso (CourseCard)
- ✅ Sistema de cerrar sesión

### Reproductor de Video
- ✅ Reproductor HTML5 personalizado
- ✅ Controles de reproducción (play/pause)
- ✅ Barra de progreso interactiva
- ✅ Control de volumen
- ✅ Control de velocidad de reproducción (0.5x - 2x)
- ✅ Modo pantalla completa
- ✅ Marcado de posición para continuar viendo
- ✅ Detección de completado (90% del video)

### Páginas de Curso
- ✅ Vista de módulo con reproductor
- ✅ Lista de videos (playlist sidebar)
- ✅ Recursos adicionales
- ✅ Breadcrumb de navegación

## 🚀 Cómo Usar

### 1. Configurar Supabase

**Paso 1: Ejecutar el Schema SQL**

1. Ve a tu proyecto en [Supabase](https://supabase.com)
2. Abre el SQL Editor
3. Ejecuta el contenido de `supabase-schema.sql`

**Paso 2: Configurar Variables de Entorno**

Edita `.env.local` y agrega tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 2. Rutas Disponibles

**Públicas:**
- `/` - Landing page
- `/auth/login` - Iniciar sesión
- `/auth/signup` - Crear cuenta

**Protegidas (requieren autenticación):**
- `/dashboard` - Dashboard principal
- `/dashboard/my-path` - Ruta personalizada
- `/dashboard/courses` - Todos los cursos
- `/dashboard/progress` - Progreso del estudiante
- `/dashboard/course/[id]` - Vista de módulo con video

### 3. Flujo de Usuario

1. **Registro**
   - Usuario va a `/auth/signup`
   - Completa formulario (nombre, email, contraseña)
   - Supabase envía email de confirmación
   - Usuario confirma email
   - Puede iniciar sesión

2. **Login**
   - Usuario va a `/auth/login`
   - Ingresa email y contraseña
   - Es redirigido a `/dashboard`

3. **Dashboard**
   - Ve su progreso general
   - Accede a módulos del curso
   - Navega por el sidebar

4. **Ver Videos**
   - Hace clic en un módulo
   - Ve el reproductor de video
   - Puede marcar como completado
   - El progreso se guarda automáticamente

## 📊 Estructura de Datos

### Tabla: `users`
```sql
- id (UUID) - ID del usuario (referencia a auth.users)
- email (TEXT) - Email del usuario
- name (TEXT) - Nombre completo
- tier (TEXT) - Plan: basic, personalized, premium
- created_at (TIMESTAMP)
```

### Tabla: `video_progress`
```sql
- id (UUID)
- user_id (UUID) - Referencia al usuario
- video_id (TEXT) - ID del video
- section_id (TEXT) - ID de la sección
- completed (BOOLEAN) - Si completó el video
- last_position (INTEGER) - Posición en segundos
- completed_at (TIMESTAMP)
```

## 🎨 Componentes Clave

### `<AuthForm />`
Formulario reutilizable para login y registro.

```tsx
<AuthForm mode="login" />  // Para login
<AuthForm mode="signup" /> // Para registro
```

### `<Sidebar />`
Barra lateral del dashboard con navegación.

### `<ProgressCard />`
Muestra progreso con barra visual.

```tsx
<ProgressCard
  title="Videos Vistos"
  progress={10}
  total={366}
  icon={<svg>...</svg>}
/>
```

### `<CourseCard />`
Tarjeta de módulo/curso con preview.

```tsx
<CourseCard
  id="1"
  title="Fundamentos de IA"
  description="..."
  icon="🧠"
  videoCount={25}
  duration="45-60 min"
  progress={30}
/>
```

### `<VideoPlayer />`
Reproductor de video HTML5 personalizado.

```tsx
<VideoPlayer
  videoUrl="https://..."
  title="Video Title"
  onProgress={(time) => console.log(time)}
  onComplete={() => console.log('Completed!')}
  initialTime={120} // Segundos
/>
```

## 🔐 Seguridad

### Row Level Security (RLS)
Todas las tablas tienen RLS habilitado. Los usuarios solo pueden:
- Ver sus propios datos
- Actualizar sus propios registros
- No pueden ver datos de otros usuarios

### Middleware
El middleware de Next.js verifica la sesión en cada request y:
- Refresca la sesión automáticamente
- Redirige a `/auth/login` si no está autenticado
- Protege todas las rutas bajo `/dashboard`

## 📝 Próximos Pasos

### Funcionalidad Pendiente
- [ ] Integración con datos reales del syllabus
- [ ] Sistema de tracking de progreso real con Supabase
- [ ] Guardar última posición del video
- [ ] Marcar videos como completados
- [ ] Sistema de checkpoints
- [ ] Rutas personalizadas con IA
- [ ] Integración con pagos (Stripe/Mercado Pago)
- [ ] Emails automáticos (bienvenida, progreso, etc.)

### Mejoras de UI
- [ ] Animaciones de transición
- [ ] Skeleton loaders
- [ ] Modo oscuro
- [ ] Sidebar responsive para móvil
- [ ] Notificaciones toast
- [ ] Modal de confirmación para acciones

## 🧪 Pruebas

### Para Probar el Sistema:

1. **Registrarse**
   ```
   1. Visita http://localhost:3000/auth/signup
   2. Completa el formulario
   3. Verifica tu email (en desarrollo, revisa la consola de Supabase)
   4. Confirma tu cuenta
   ```

2. **Iniciar Sesión**
   ```
   1. Visita http://localhost:3000/auth/login
   2. Ingresa tus credenciales
   3. Deberías ser redirigido a /dashboard
   ```

3. **Ver Dashboard**
   ```
   - Verifica que veas tu nombre
   - Navega por las secciones en el sidebar
   - Haz clic en un módulo de curso
   ```

4. **Ver Video**
   ```
   1. Haz clic en "Fundamentos de IA" (o cualquier módulo)
   2. Deberías ver el reproductor
   3. Prueba los controles (play, pause, volumen, velocidad)
   4. Prueba el modo pantalla completa
   ```

## 🐛 Troubleshooting

### Error: "Invalid login credentials"
- Verifica que el email esté confirmado en Supabase
- Revisa que la contraseña sea correcta (mínimo 6 caracteres)

### Error: "Not authenticated"
- Verifica que las variables de entorno estén configuradas
- Revisa que Supabase esté funcionando
- Borra cookies y vuelve a intentar

### Videos no cargan
- El ejemplo usa un video de prueba de Google
- Reemplaza con tus URLs de Vimeo/YouTube cuando estén listos

## 💡 Tips

- Los datos actuales son de ejemplo (placeholder)
- Para agregar tus videos reales, necesitarás:
  1. Subir videos a Vimeo/YouTube
  2. Actualizar el componente con las URLs reales
  3. Conectar con tu syllabus JSON
- El sistema de progreso está listo para recibir datos de Supabase
- Puedes personalizar colores en `tailwind.config.ts`
