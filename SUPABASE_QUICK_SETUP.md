# ⚡ Configuración Rápida de Supabase (5 minutos)

Esta guía te ayudará a configurar Supabase para que el sistema de autenticación funcione.

## 🎯 ¿Por qué necesitas configurar Supabase?

Actualmente ves el error **"Failed to fetch"** porque:
- Supabase maneja toda la autenticación y base de datos
- Las credenciales en `.env.local` son placeholders
- Sin credenciales reales, la app no puede conectarse a la base de datos

## 🚀 Pasos Rápidos

### 1. Crear Cuenta en Supabase (1 min)

1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"**
3. Regístrate con GitHub o Google (lo más rápido)

### 2. Crear Nuevo Proyecto (2 min)

1. Una vez dentro, haz clic en **"New project"**
2. Completa:
   - **Name**: `ia-automation-course`
   - **Database Password**: Crea una contraseña segura (guárdala)
   - **Region**: Selecciona el más cercano (ej: `South America (São Paulo)`)
   - **Pricing Plan**: Selecciona **Free** (suficiente para empezar)
3. Haz clic en **"Create new project"**
4. Espera 1-2 minutos mientras se crea el proyecto

### 3. Obtener Credenciales (1 min)

1. En tu proyecto, ve al menú lateral y haz clic en **⚙️ Settings**
2. Haz clic en **API** en el submenú
3. Verás dos valores importantes:

   **Project URL:**
   ```
   https://xxxxxxxxxxx.supabase.co
   ```

   **anon public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M.... (texto muy largo)
   ```

4. **Copia estos valores** (los necesitarás en el siguiente paso)

### 4. Configurar Variables de Entorno (1 min)

1. Abre el archivo `.env.local` en tu proyecto
2. Reemplaza los valores:

   ```env
   # ANTES (valores placeholder):
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

   # DESPUÉS (tus valores reales):
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M....
   ```

3. **IMPORTANTE**: Asegúrate de copiar los valores completos, sin espacios extra

### 5. Crear las Tablas de la Base de Datos (1 min)

1. En Supabase, ve a **SQL Editor** en el menú lateral
2. Haz clic en **"New query"**
3. Copia y pega todo el contenido del archivo `supabase-schema.sql` (está en la raíz del proyecto)
4. Haz clic en **"Run"** (botón verde en la esquina inferior derecha)
5. Deberías ver: **"Success. No rows returned"**

### 6. Reiniciar el Servidor (30 segundos)

1. Ve a la terminal donde está corriendo tu servidor
2. Detén el servidor: **Ctrl + C** (o Cmd + C en Mac)
3. Vuelve a iniciar:
   ```bash
   npm run dev
   ```

### 7. ¡Probar! (30 segundos)

1. Recarga la página: `http://localhost:3000/auth/signup`
2. El banner amarillo de advertencia **ya no debería aparecer**
3. Completa el formulario y haz clic en **"Crear Cuenta"**
4. Deberías ver: **"¡Cuenta creada! Revisa tu email para confirmar tu cuenta."**

## ✅ Verificar que Todo Funciona

### Opción 1: Confirmar Email (Recomendado)

1. Revisa tu bandeja de entrada (el email que usaste)
2. Busca un email de **noreply@mail.app.supabase.io**
3. Haz clic en **"Confirm your mail"**
4. Serás redirigido al dashboard y estarás autenticado

### Opción 2: Desactivar Confirmación por Email (Solo para desarrollo)

Si quieres probar sin confirmar el email:

1. Ve a Supabase Dashboard
2. Click en **Authentication** en el menú lateral
3. Click en **Providers**
4. Busca **"Email"** y haz clic en él
5. Desactiva **"Enable email confirmations"**
6. Guarda los cambios

Ahora podrás crear cuentas y acceder sin confirmar el email.

## 🐛 Solución de Problemas Comunes

### Error: "Invalid API key"

**Causa**: La API key está mal copiada.

**Solución**:
1. Ve a Supabase > Settings > API
2. Copia nuevamente el **anon public** key
3. Asegúrate de copiar TODO el texto (es muy largo, como 200+ caracteres)
4. Pégalo en `.env.local` sin espacios extra
5. Reinicia el servidor

### Error: "Invalid project URL"

**Causa**: La URL del proyecto está mal.

**Solución**:
1. Ve a Supabase > Settings > API
2. Copia el **Project URL** completo
3. Debe verse como: `https://xxxxxxxxxxx.supabase.co`
4. NO incluyas `/` al final
5. Reinicia el servidor

### Error: "relation 'public.users' does not exist"

**Causa**: No se ejecutó el script SQL de las tablas.

**Solución**:
1. Ve a Supabase > SQL Editor
2. Ejecuta el contenido de `supabase-schema.sql`
3. Verifica en **Table Editor** que existan las tablas

### El servidor no recarga las variables de entorno

**Solución**:
1. Detén completamente el servidor (Ctrl+C)
2. Espera 2 segundos
3. Vuelve a iniciar con `npm run dev`
4. Next.js debe mostrar: `Reload env: .env.local`

## 🔐 Notas de Seguridad

- **NEVER** subas tu `.env.local` a GitHub
- El `.gitignore` ya incluye `.env.local` para protegerte
- La **anon key** es pública (es segura compartirla en el navegador)
- Para producción, configura las variables en tu plataforma de hosting (Vercel, etc.)

## 📚 Recursos Adicionales

- [Documentación oficial de Supabase](https://supabase.com/docs)
- [Supabase Auth con Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Archivo de schema completo](./supabase-schema.sql)
- [Guía de Google OAuth](./GOOGLE_OAUTH_SETUP.md)

## ❓ ¿Prefieres No Configurar Supabase Ahora?

No hay problema. Puedes explorar la plataforma en **modo demo**:

- **Dashboard Demo**: [http://localhost:3000/demo](http://localhost:3000/demo)
- **Video Player Demo**: [http://localhost:3000/demo/video](http://localhost:3000/demo/video)

El modo demo te muestra toda la funcionalidad visual sin necesidad de autenticación.

---

## 🎉 ¡Listo!

Una vez configurado, tendrás:
- ✅ Sistema de registro funcionando
- ✅ Login con email/password
- ✅ Login con Google (después de configurar Google OAuth)
- ✅ Redirección automática al dashboard
- ✅ Sesión persistente (no necesitas volver a login)
- ✅ Base de datos para guardar progreso de videos
