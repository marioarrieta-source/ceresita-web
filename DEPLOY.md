# Subir a Vercel

La app está en la carpeta **`ceresita-web/`** (Next.js 16, sin variables de
entorno necesarias). Vercel la detecta sola.

## Opción A — CLI (más rápido)

```bash
cd ceresita-web
npx vercel          # primera vez: te pide login y crea el proyecto
npx vercel --prod   # despliegue de producción
```

## Opción B — GitHub + Vercel

1. Crear un repo en GitHub y subir **solo la carpeta `ceresita-web/`** (o el
   repo completo; en ese caso ver el paso 3).

   ```bash
   cd ceresita-web
   git init
   git add .
   git commit -m "Prototipo web Ceresita"
   git branch -M main
   git remote add origin git@github.com:TU_USUARIO/ceresita-web.git
   git push -u origin main
   ```

2. En vercel.com → **Add New… → Project** → importar el repo.
3. Si subiste el repo completo (con la carpeta padre), en la config del
   proyecto poner **Root Directory = `ceresita-web`**.
4. Framework: **Next.js** (automático). Build: `next build` (automático).
   Deploy.

## Notas

- El panel de administrador vive en `/<dominio>/admin` (contraseña `ceresita2025`).
  No está enlazado en el sitio y lleva `noindex`.
- Los datos de color son reales (cartilla Millennium, 1488 colores). Los textos
  de producto, los puntos de venta y las fotos de ambientes son de demostración
  y se reemplazan antes de lanzar (ver `public/rooms/README.md`).
- El build de producción ya pasa localmente (`npm run build`).
