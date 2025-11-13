# Configuración de Google OAuth en Supabase

Esta guía te ayudará a configurar el login con Google para tu aplicación.

## 📋 Requisitos Previos

- Cuenta de Supabase creada
- Proyecto de Supabase activo
- Cuenta de Google (para crear el proyecto OAuth)

## 🚀 Paso 1: Configurar Google Cloud Console

### 1.1 Crear un Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Haz clic en el selector de proyectos (arriba a la izquierda)
3. Haz clic en "Nuevo Proyecto"
4. Asigna un nombre: `IA-Automation-Course`
5. Haz clic en "Crear"

### 1.2 Habilitar Google+ API

1. En el menú lateral, ve a **APIs y servicios > Biblioteca**
2. Busca "Google+ API"
3. Haz clic en "Google+ API"
4. Haz clic en "Habilitar"

### 1.3 Configurar Pantalla de Consentimiento OAuth

1. Ve a **APIs y servicios > Pantalla de consentimiento de OAuth**
2. Selecciona **Externo** (para permitir cualquier cuenta de Google)
3. Haz clic en "Crear"
4. Completa la información:
   - **Nombre de la aplicación**: `IA & Automatización Course`
   - **Email de asistencia al usuario**: Tu email
   - **Logo de la aplicación**: (Opcional) Sube tu logo
   - **Dominios autorizados**: (Déjalo vacío por ahora)
   - **Email de contacto del desarrollador**: Tu email
5. Haz clic en "Guardar y continuar"
6. En **Ámbitos**, haz clic en "Guardar y continuar" (usa los ámbitos predeterminados)
7. En **Usuarios de prueba**, agrega tu email para pruebas
8. Haz clic en "Guardar y continuar"
9. Revisa y haz clic en "Volver al panel"

### 1.4 Crear Credenciales OAuth 2.0

1. Ve a **APIs y servicios > Credenciales**
2. Haz clic en **+ Crear credenciales**
3. Selecciona **ID de cliente de OAuth**
4. Selecciona **Aplicación web**
5. Asigna un nombre: `IA Automation Web Client`
6. En **Orígenes de JavaScript autorizados**, agrega:
   ```
   http://localhost:3000
   https://tu-dominio-de-produccion.com
   ```
7. En **URIs de redireccionamiento autorizados**, necesitas la URL de callback de Supabase

## 🔐 Paso 2: Obtener la URL de Callback de Supabase

1. Ve a tu [Dashboard de Supabase](https://app.supabase.com/)
2. Selecciona tu proyecto
3. Ve a **Authentication > Providers**
4. Busca "Google" en la lista
5. Copia la **Callback URL** que aparece (se ve así):
   ```
   https://tu-proyecto.supabase.co/auth/v1/callback
   ```

## 🔗 Paso 3: Completar la Configuración en Google Cloud

1. Regresa a Google Cloud Console (donde estabas configurando las credenciales)
2. En **URIs de redireccionamiento autorizados**, pega la URL de callback de Supabase:
   ```
   https://tu-proyecto.supabase.co/auth/v1/callback
   ```
3. Haz clic en "Crear"
4. **IMPORTANTE**: Guarda estos datos que aparecen:
   - **Client ID**: Algo como `123456789-abc123.apps.googleusercontent.com`
   - **Client Secret**: Algo como `GOCSPX-abc123xyz789`

## ⚙️ Paso 4: Configurar Supabase

1. Ve al [Dashboard de Supabase](https://app.supabase.com/)
2. Selecciona tu proyecto
3. Ve a **Authentication > Providers**
4. Busca "Google" y haz clic en él
5. Activa el toggle **Enable Sign in with Google**
6. Pega el **Client ID** de Google
7. Pega el **Client Secret** de Google
8. En **Authorized Client IDs**, agrega el mismo Client ID
9. Haz clic en "Save"

## 🧪 Paso 5: Probar el Login con Google

1. Asegúrate de que tu servidor de desarrollo esté corriendo:
   ```bash
   npm run dev
   ```

2. Ve a `http://localhost:3000/auth/login`

3. Haz clic en el botón **"Continuar con Google"**

4. Deberías ver la pantalla de login de Google

5. Selecciona tu cuenta de Google

6. Si todo está configurado correctamente:
   - Serás redirigido a `/auth/callback`
   - Y luego a `/dashboard`
   - Estarás autenticado con tu cuenta de Google

## 🐛 Solución de Problemas

### Error: "redirect_uri_mismatch"

**Causa**: La URL de callback no coincide con la configurada en Google Cloud.

**Solución**:
1. Ve a Google Cloud Console > Credenciales
2. Edita tu OAuth 2.0 Client ID
3. Verifica que la URL de callback de Supabase esté exactamente como aparece en Supabase Dashboard
4. Asegúrate de incluir `https://` al inicio
5. NO incluyas espacios ni caracteres extra

### Error: "Access blocked: This app's request is invalid"

**Causa**: El dominio no está autorizado o la pantalla de consentimiento no está configurada.

**Solución**:
1. Ve a Google Cloud Console > Pantalla de consentimiento OAuth
2. Verifica que hayas completado todos los campos requeridos
3. Agrega tu email en "Usuarios de prueba"
4. Espera unos minutos y vuelve a intentar

### Error: "Invalid client_id"

**Causa**: El Client ID o Secret están mal copiados.

**Solución**:
1. Ve a Google Cloud Console > Credenciales
2. Haz clic en tu OAuth 2.0 Client ID
3. Copia nuevamente el Client ID y Secret
4. Pégalos en Supabase (Authentication > Providers > Google)
5. Asegúrate de no incluir espacios al copiar

### El usuario se autentica pero no se guarda en la base de datos

**Causa**: Las políticas de RLS (Row Level Security) pueden estar bloqueando la inserción.

**Solución**:
1. Ve a Supabase Dashboard > Table Editor > users
2. Verifica que exista la tabla `users` con una política que permita INSERT
3. Si no existe, ejecuta el script `supabase-schema.sql`

### El callback no redirige al dashboard

**Causa**: La ruta `/auth/callback` no está configurada correctamente.

**Solución**:
1. Verifica que exista el archivo `/app/auth/callback/route.ts`
2. Asegúrate de que el código maneje correctamente el `code` del query parameter
3. Revisa los logs del servidor para ver errores

## 📝 Notas Importantes

1. **Modo de Prueba**: En desarrollo, solo los emails agregados como "Usuarios de prueba" podrán iniciar sesión con Google.

2. **Publicar la App**: Para permitir que cualquier usuario de Google inicie sesión:
   - Ve a Google Cloud Console > Pantalla de consentimiento OAuth
   - Haz clic en "Publicar aplicación"
   - Google puede requerir una verificación (toma algunos días)

3. **Límites de Rate**: Google tiene límites en el número de solicitudes OAuth. Para producción, considera aumentar las cuotas en Google Cloud Console.

4. **URLs de Producción**: Cuando despliegues a producción:
   - Agrega tu dominio de producción en "Orígenes de JavaScript autorizados"
   - La URL de callback de Supabase permanece igual
   - Actualiza las variables de entorno en tu servidor de producción

## 🎉 ¡Listo!

Ahora tus usuarios pueden iniciar sesión con Google en tu aplicación. La experiencia de usuario será:

1. Click en "Continuar con Google"
2. Seleccionar cuenta de Google
3. Aceptar permisos (solo la primera vez)
4. Redirigir automáticamente al dashboard

## 🔒 Seguridad

El flujo OAuth con Google es seguro porque:
- No necesitas almacenar contraseñas de usuario
- Google maneja toda la autenticación
- Supabase valida el token de Google
- El usuario solo comparte su email y nombre con tu app
- El Secret de Google nunca se expone al navegador

## 📚 Recursos Adicionales

- [Documentación oficial de Supabase Auth](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
