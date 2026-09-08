# Ceresita Perú — prototipo web

Prototipo funcional de la nueva web de Ceresita Perú, hecho por MCC Agency como
**pitch de venta** (tiene que sentirse como producto real). El color es la
experiencia central. Brief original: `brief-ceresita-web.md` (fuera del repo).

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind v4**
  (`@theme` en `src/app/globals.css`, sin archivo de config).
- **Zustand** persistido (`src/lib/store.ts`, key `ceresita-prototipo`) — lleva el
  color seleccionado entre explorador → rueda → simulador → fichas de producto.
- **lucide-react** para iconos. **next/font**: Inter (cuerpo) + Archivo (display).
- Node 22+ recomendado. `npm install` && `npm run dev` (Turbopack).
- Nota Tailwind v4: usar `bg-linear-to-*`, no `bg-gradient-to-*`.

## Identidad visual (tema oscuro navy + oro)

Fondo navy profundo (`bg` #0a1226, `bg-raised`, `panel`), **oro Ceresita**
(`gold` #f7b500, texto `on-gold` = navy) para CTAs y acentos, texto blanco/slate
(`ink`, `ink-soft`, `ink-faint`), menta para BIO TECH. Motivos: degradado
"spectrum" (`SpectrumBand`) y la placa cromada "DESDE 1933" (`HeritageBadge`).
Logo oficial real en `public/logo-ceresita.png` — recorte de la placa
navy/oro del wordmark (fondo transparente), va directo sobre el navy del
sitio. `src/components/layout/Logo.tsx` recrea "PINTURAS" y el tagline como
texto alrededor, ya que en el PNG original eran negros e ilegibles ahí.

## Páginas (todas hechas)

| Ruta | Qué es |
|---|---|
| `/` | Inicio: resumen dinámico de todo el sitio |
| `/colores` | Explorador de colores (modo Explorar) |
| `/colores?modo=rueda` | Rueda de color (complementario / análogos / triádico → color real más cercano) |
| `/simulador` | Simulador de pintado en canvas |
| `/productos` + `/productos/[id]` | Catálogo + fichas (SSG) |
| `/encuentranos` | Puntos de venta + mapa SVG |
| `/nosotros` | Marca + contacto (`#contacto`) |
| `/admin` | Panel de contenido **oculto** (noindex, sin enlace). Clave `ceresita2025` |

## Datos de color = REALES

`src/data/ceresita-colors.json` = **1488 colores** de la cartilla Millennium
`{codigo, nombre, cartilla, hex}`, extraídos de `GET ceresita.com/api/milleniumPrimer`.
`src/data/colors.ts` deriva `familia` (heurística HSL en `familiaFromHex`) y `tono`
(del sufijo del código: W/M/D/N/A → Claro/Medio/Profundo/Neutro/Vivo).
CSV/JSON también en la raíz del proyecto padre.

Los textos de producto, puntos de venta y fotos de ambientes son de demostración
(ver `public/rooms/README.md` para meter fotos reales en el simulador).

## Simulador

`lib/roomComposite.ts` `recolorWall()` = multiplicado que preserva luminosidad
(la técnica real de los visualizadores de pintura). `lib/roomArt.ts` genera las
bases de ambiente + máscaras (interino). `components/simulador/PhotoCanvas.tsx`
lo maneja: soporta **subir foto propia + pincelar la pared** (añadir/borrar,
tamaño) y un slider de **Luz**. Ambientes en `data/rooms.ts`: sala / dormitorio /
cocina / fachada + "propia". Si un ambiente define `photo` + `mask`, se usan
fotos reales desde `public/rooms/`.

## CMS cliente (panel `/admin`)

`lib/content.ts` — `useContent()` + evento `ceresita-cms-change`, persiste en
`localStorage['ceresita-cms']`. El admin edita textos del hero, puntos de venta
(CRUD) y tagline/descripción de productos. Lo público lo lee vía `useContent()`
(Hero es `"use client"`, `StoreLocator`, `ProductText`).

## Flujo de trabajo entre dispositivos

Fuente de verdad = este repo en GitHub. **`git pull` antes de empezar, `git push`
al terminar.** Clonar en ruta SIN OneDrive ni espacios (ej. `C:\dev\ceresita-web`)
— OneDrive + rutas con espacios rompen `npm install` aquí.

## Backlog fase 2

Segmentación de pared con IA para fotos arbitrarias, blog, cuentas de usuario,
integración real de tintometría/CMS.
