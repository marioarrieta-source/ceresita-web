# Ceresita Perú — Prototipo de nueva web

Prototipo funcional para el pitch de MCC Agency a Ceresita Perú.
Convierte el catálogo de color en el eje central de la experiencia.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Zustand** para estado global (el color elegido viaja entre explorador, simulador y fichas)
- **lucide-react** para iconografía

## Cómo correr

```bash
cd ceresita-web
npm install
npm run dev
```

Abre http://localhost:3000

## Estado de los módulos

| Módulo | Estado |
|---|---|
| Andamiaje + Inicio | ✅ Listo |
| Colores — modo explorar | ✅ Listo |
| Colores — modo crear paleta | ✅ Listo |
| Simulador de pintado (2 ambientes) | ✅ Listo |
| Catálogo de productos + fichas | ✅ Listo |
| Encuéntranos (mapa + filtros) | ✅ Listo |
| Nosotros (marca + contacto) | ✅ Listo |

**MVP funcional completo.** Pendiente para fase 2: subir foto propia al simulador,
blog "Inspírate", cuentas de usuario, integración con tintometría real y CMS.

## Estructura

```
src/
  app/                 rutas (Inicio + placeholders de cada sección)
  components/
    layout/            Header, Footer, Logo
    home/              secciones de la página de Inicio
    ui/                Button, SectionHeading
  data/
    colors.ts          catálogo de color SEMILLA (placeholder, ver nota)
    products.ts        8 productos del anexo del brief
    stores.ts          puntos de venta (placeholder)
  lib/
    color.ts           utilidades de color (hex/rgb/hsl, armonías, contraste)
    store.ts           estado global (Zustand)
    site.ts            navegación y datos de marca
```

## Panel de administrador

Ruta oculta (sin enlace en el sitio, `noindex`): **`/admin`** · contraseña `ceresita2025`.
Permite editar textos de Inicio, puntos de venta y textos de producto. Los cambios
se guardan en `localStorage` y se reflejan en el sitio; en producción se conecta a un CMS.

## Notas de datos (para reemplazar antes de lanzar)

- **Colores**: catálogo REAL — `src/data/ceresita-colors.json` (1488 colores de la
  cartilla Millennium, extraídos de `ceresita.com/api/milleniumPrimer`). La familia
  y el tono se derivan del HSL / código. CSV y JSON también en la raíz del proyecto.
- **Fichas técnicas**: los enlaces PDF apuntan a los archivos reales de ceresita.pe.
- **Descripciones de producto y tiempos de secado**: redactados en tono de marca
  como placeholder; se reemplazan por el copy real.
- **Fotos de producto y de ambientes**: pendientes (las tarjetas usan bloques de color).
```
