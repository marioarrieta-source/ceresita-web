/*
  Contenido de la franja "Inspírate" del home. No hay fotografía real todavía
  (ver public/rooms/README.md), así que cada tarjeta se construye con
  combinaciones de colores REALES de la cartilla Millennium (src/data/colors.ts)
  en vez de imágenes de stock genéricas. Cuando llegue fotografía real, cada
  tile puede cambiar `treatment`/`colors` por una foto sin tocar el layout.
*/

import { colors, type Familia, type Tono } from "@/data/colors";

function pick(familia: Familia, tono: Tono = "Medio"): string {
  const pool = colors.filter((c) => c.familia === familia && c.tono === tono);
  const fallback = colors.filter((c) => c.familia === familia);
  const chosen = pool[Math.floor(pool.length / 2)] ?? fallback[Math.floor(fallback.length / 2)];
  return chosen?.hex ?? "#223154";
}

export type Treatment = "block" | "blend" | "grain" | "glow" | "hatch";

export interface InspirationTile {
  id: string;
  kicker: string;
  title: string;
  colors: [string] | [string, string];
  treatment: Treatment;
  /** ancho relativo a la altura fija de la franja (editorial, no todas iguales) */
  ratio: number;
}

export const inspirationTiles: InspirationTile[] = [
  {
    id: "sala-tierra",
    kicker: "Interior",
    title: "Sala en tonos tierra",
    colors: [pick("tierras", "Medio"), pick("neutros", "Claro")],
    treatment: "blend",
    ratio: 1.35,
  },
  {
    id: "dormitorio-sereno",
    kicker: "Interior",
    title: "Dormitorio sereno",
    colors: [pick("azules", "Claro")],
    treatment: "glow",
    ratio: 0.78,
  },
  {
    id: "textura-terracota",
    kicker: "Textura",
    title: "Textura en terracota",
    colors: [pick("tierras", "Vivo")],
    treatment: "grain",
    ratio: 0.62,
  },
  {
    id: "cocina-caracter",
    kicker: "Interior",
    title: "Cocina con carácter",
    colors: [pick("naranjas", "Profundo"), pick("negros", "Neutro")],
    treatment: "block",
    ratio: 1,
  },
  {
    id: "fachada-renovada",
    kicker: "Fachada",
    title: "Fachada renovada",
    colors: [pick("grises", "Medio"), pick("amarillos", "Claro")],
    treatment: "blend",
    ratio: 1.5,
  },
  {
    id: "bano-salvia",
    kicker: "Interior",
    title: "Baño en verde salvia",
    colors: [pick("verdes", "Medio"), pick("blancos", "Claro")],
    treatment: "block",
    ratio: 0.8,
  },
  {
    id: "rincon-lectura",
    kicker: "Paleta",
    title: "Rincón de lectura",
    colors: [pick("morados", "Medio"), pick("neutros", "Medio")],
    treatment: "blend",
    ratio: 1.1,
  },
  {
    id: "muro-hatch",
    kicker: "Textura",
    title: "Detalle de muro y textura",
    colors: [pick("tierras", "Profundo")],
    treatment: "hatch",
    ratio: 0.68,
  },
  {
    id: "detalle-cromatico",
    kicker: "Paleta",
    title: "Detalle cromático",
    colors: [pick("rosados", "Medio"), pick("grises", "Claro")],
    treatment: "block",
    ratio: 0.9,
  },
  {
    id: "fachada-minimal",
    kicker: "Fachada",
    title: "Fachada minimal",
    colors: [pick("blancos", "Claro"), pick("negros", "Neutro")],
    treatment: "blend",
    ratio: 1.45,
  },
  {
    id: "combinacion-analoga",
    kicker: "Paleta",
    title: "Combinación análoga",
    colors: [pick("azules", "Medio"), pick("morados", "Claro")],
    treatment: "glow",
    ratio: 0.75,
  },
  {
    id: "textura-arena",
    kicker: "Textura",
    title: "Textura arena y cal",
    colors: [pick("neutros", "Claro")],
    treatment: "grain",
    ratio: 1.15,
  },
];
