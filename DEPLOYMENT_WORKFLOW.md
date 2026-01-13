# Flujo de Trabajo: Staging vs Production

## Situación Actual
- Todas las correcciones suben directamente a `main` → GitHub → Vercel → Producción
- Esto está bien durante desarrollo, pero cuando se lance al público, necesitamos separar desarrollo de producción

## Solución: Ramas de Git + Vercel Environments

### Opción 1: Crear rama `staging` (Recomendada)
1. Crear rama `staging` desde `main` actual
2. A partir de ahora, trabajar en `staging`
3. Cuando algo esté listo, hacer merge `staging` → `main`
4. Configurar Vercel:
   - **Production Branch**: `main` (solo se despliega a producción cuando haces merge aquí)
   - **Preview Deployments**: Todas las ramas (cada push crea una URL única)
   - **Staging Domain**: Asignar `staging.tudominio.com` a la rama `staging`

### Opción 2: Renombrar rama actual
1. Renombrar `main` → `staging`
2. Crear nueva `main` limpia para producción
3. Configurar Vercel: Production = `main`, Preview = `staging` y otras ramas

## Configuración en Vercel

### Settings → Git
- **Production Branch**: `main` (o la rama que quieras para producción)
- **Preview Deployments**: ✅ Habilitado

### Settings → Domains
- Agregar dominio de staging (ej: `staging.tudominio.com`)
- Asignarlo a la rama `staging` como "Branch Domain"

### Settings → Environment Variables
- Separar variables por entorno:
  - **Production**: Variables para producción
  - **Preview**: Variables para staging/preview
  - **Development**: Variables locales

## Flujo de Trabajo Recomendado

```
1. git checkout -b feature/nueva-funcion
2. Trabajas y haces commits
3. git push origin feature/nueva-funcion
   → Vercel crea una URL de preview automáticamente
4. Pruebas en la URL de preview
5. Si está bien, haces merge a staging
6. Pruebas en staging.tudominio.com
7. Cuando todo está listo, haces merge staging → main
8. Se despliega automáticamente a producción
```

## Ventajas
- ✅ Puedes trabajar sin afectar producción
- ✅ Cada PR/rama tiene su propia URL de preview
- ✅ Staging tiene una URL fija para pruebas constantes
- ✅ Producción solo se actualiza cuando tú quieras (merge manual)
