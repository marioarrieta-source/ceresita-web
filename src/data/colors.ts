/*
  Catálogo de colores REAL de Ceresita.

  Fuente: https://ceresita.com/api/milleniumPrimer (cartilla Millennium, 1488
  colores con código, nombre y hex). La familia de color y el tono se derivan
  del valor HSL y del sufijo de código; la cartilla es "Millennium" para todos.
*/

import rawColors from "@/data/ceresita-colors.json";
import {
  colorDistance,
  harmonyColors,
  hexToHsl,
  type HarmonyKind,
} from "@/lib/color";

export type { HarmonyKind };

export type Familia =
  | "blancos"
  | "neutros"
  | "grises"
  | "negros"
  | "tierras"
  | "rojos"
  | "naranjas"
  | "amarillos"
  | "verdes"
  | "azules"
  | "morados"
  | "rosados";

export type Cartilla = "Millennium";
export type Tono = "Claro" | "Medio" | "Profundo" | "Neutro" | "Vivo";

export interface Color {
  id: string;
  nombre: string;
  codigo: string;
  hex: string;
  cartilla: Cartilla;
  familia: Familia;
  tono: Tono;
  productosCompatibles: string[];
}

const LATEX = [
  "latex-satinado-premium",
  "latex-satinado",
  "ambientes-y-fachada",
  "latex-extracubriente",
  "latex-experto",
];

/* -------------------------------------------------------------------------- */

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function familiaFromHex(hex: string): Familia {
  const { h, s, l } = hexToHsl(hex);
  const warm = h >= 16 && h <= 56;

  if (l <= 19) return "negros";
  if (l >= 85 && s <= 20) return "blancos";
  if (s <= 7) return "grises";

  // Zona apagada: cálido → greige/beige (neutros); frío → se lee como gris
  if (s <= 15) return warm ? "neutros" : "grises";

  // Tierras (marrones): cálidos, no muy claros, saturación media
  if (warm && l < 62 && s <= 60) return "tierras";
  // Greige un poco más cromático pero muy claro y cálido
  if (warm && s <= 24 && l >= 62) return "neutros";

  if (h < 14 || h >= 346) return "rojos";
  if (h < 42) return "naranjas";
  if (h < 66) return "amarillos";
  if (h < 165) return "verdes";
  if (h < 250) return "azules";
  if (h < 292) return "morados";
  return "rosados";
}

function tonoFromCodigo(codigo: string): Tono {
  const suf = codigo.trim().slice(-1).toUpperCase();
  if (suf === "W") return "Claro";
  if (suf === "M") return "Medio";
  if (suf === "D") return "Profundo";
  if (suf === "N") return "Neutro";
  return "Vivo";
}

interface RawColor {
  codigo: string;
  nombre: string;
  cartilla: string;
  hex: string;
}

export const colors: Color[] = (rawColors as RawColor[]).map((c) => {
  const hex = c.hex.startsWith("#") ? c.hex.toLowerCase() : `#${c.hex}`;
  return {
    id: `${slugify(c.nombre)}-${c.codigo.toLowerCase()}`,
    nombre: c.nombre,
    codigo: c.codigo,
    hex,
    cartilla: "Millennium" as const,
    familia: familiaFromHex(hex),
    tono: tonoFromCodigo(c.codigo),
    productosCompatibles: LATEX,
  };
});

/* -------------------------------------------------------------------------- */
/*  Metadatos de UI                                                            */
/* -------------------------------------------------------------------------- */

const FAMILIA_META: Record<Familia, { label: string; muestra: string }> = {
  blancos: { label: "Blancos", muestra: "#eef0ec" },
  neutros: { label: "Neutros", muestra: "#ddd0bb" },
  grises: { label: "Grises", muestra: "#9a9a97" },
  negros: { label: "Negros", muestra: "#2c2c2e" },
  tierras: { label: "Tierras", muestra: "#a9724f" },
  rojos: { label: "Rojos", muestra: "#b23a2f" },
  naranjas: { label: "Naranjas", muestra: "#d5803b" },
  amarillos: { label: "Amarillos", muestra: "#e3b64c" },
  verdes: { label: "Verdes", muestra: "#5c7f5a" },
  azules: { label: "Azules", muestra: "#3f6480" },
  morados: { label: "Morados", muestra: "#6d5a80" },
  rosados: { label: "Rosados", muestra: "#c98a8f" },
};

const FAMILIA_ORDER: Familia[] = [
  "blancos",
  "neutros",
  "grises",
  "negros",
  "tierras",
  "rojos",
  "naranjas",
  "amarillos",
  "verdes",
  "azules",
  "morados",
  "rosados",
];

const presentes = new Set(colors.map((c) => c.familia));

export const familias: { id: Familia; label: string; muestra: string }[] =
  FAMILIA_ORDER.filter((f) => presentes.has(f)).map((f) => ({
    id: f,
    ...FAMILIA_META[f],
  }));

export const cartillas: Cartilla[] = ["Millennium"];
export const tonos: Tono[] = ["Claro", "Medio", "Profundo", "Neutro", "Vivo"];

export function getColor(id: string): Color | undefined {
  return colors.find((c) => c.id === id);
}

/* -------------------------------------------------------------------------- */
/*  Búsqueda y filtrado                                                        */
/* -------------------------------------------------------------------------- */

export interface ColorFilters {
  q?: string;
  familia?: Familia | "todas";
  tono?: Tono | "todos";
}

export function filterColors(all: Color[], f: ColorFilters): Color[] {
  const q = (f.q ?? "").trim().toLowerCase();
  return all.filter((c) => {
    if (f.familia && f.familia !== "todas" && c.familia !== f.familia)
      return false;
    if (f.tono && f.tono !== "todos" && c.tono !== f.tono) return false;
    if (q) {
      const hay =
        c.nombre.toLowerCase().includes(q) ||
        c.codigo.toLowerCase().includes(q) ||
        c.hex.toLowerCase().includes(q);
      if (!hay) return false;
    }
    return true;
  });
}

/* -------------------------------------------------------------------------- */
/*  Selección curada (home, atajos)                                            */
/* -------------------------------------------------------------------------- */

/** Un color "medio" y agradable por familia, para vitrinas */
function spread(count: number): Color[] {
  const out: Color[] = [];
  const orden: Familia[] = [
    "tierras",
    "verdes",
    "azules",
    "amarillos",
    "rosados",
    "neutros",
    "naranjas",
    "grises",
    "rojos",
    "morados",
    "blancos",
    "negros",
  ];
  for (const fam of orden) {
    let pool = colors
      .filter(
        (c) => c.familia === fam && (c.tono === "Medio" || c.tono === "Neutro"),
      )
      .sort((a, b) => a.codigo.localeCompare(b.codigo));
    if (!pool.length) {
      pool = colors
        .filter((c) => c.familia === fam)
        .sort((a, b) => a.codigo.localeCompare(b.codigo));
    }
    const pick = pool[Math.floor(pool.length / 2)] ?? pool[0];
    if (pick) out.push(pick);
    if (out.length >= count) break;
  }
  return out;
}

export const seasonalColors: Color[] = spread(10);

/** Tira de colores ordenada por matiz, para la vitrina scrolleable de la home */
export const stripColors: Color[] = [...colors]
  .sort((a, b) => {
    const ha = hexToHsl(a.hex);
    const hb = hexToHsl(b.hex);
    return ha.h - hb.h || hb.l - ha.l;
  })
  .filter((_, i) => i % 18 === 0);

/* -------------------------------------------------------------------------- */
/*  Mapeo a catálogo (creador de paletas)                                      */
/* -------------------------------------------------------------------------- */

export function nearestColor(hex: string, pool: Color[] = colors): Color {
  let best = pool[0];
  let bestD = Infinity;
  for (const c of pool) {
    const d = colorDistance(hex, c.hex);
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best;
}

export function harmonyToCatalog(baseHex: string, kind: HarmonyKind): Color[] {
  const seen = new Set<string>();
  const out: Color[] = [];
  for (const h of harmonyColors(baseHex, kind)) {
    const match = nearestColor(h);
    if (!seen.has(match.id)) {
      seen.add(match.id);
      out.push(match);
    }
  }
  return out;
}

export const harmonyKinds: { id: HarmonyKind; label: string; hint: string }[] = [
  {
    id: "complementario",
    label: "Complementario",
    hint: "El color base y su opuesto. Máximo contraste.",
  },
  {
    id: "analogos",
    label: "Análogos",
    hint: "Vecinos en la rueda de color. Combinación suave y natural.",
  },
  {
    id: "monocromatico",
    label: "Monocromático",
    hint: "Un solo tono en distintas intensidades.",
  },
  {
    id: "triadico",
    label: "Triádico",
    hint: "Tres colores equidistantes. Vivo y equilibrado.",
  },
];

/** Construye una paleta curada tomando un rango de claridad dentro de familias */
export function buildCurated(fams: Familia[], count = 5): Color[] {
  const pool = colors.filter((c) => fams.includes(c.familia));
  if (!pool.length) return [];
  const sorted = [...pool].sort(
    (a, b) => hexToHsl(b.hex).l - hexToHsl(a.hex).l,
  );
  const out: Color[] = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.round((i / (count - 1)) * (sorted.length - 1));
    const c = sorted[idx];
    if (c && !out.some((x) => x.id === c.id)) out.push(c);
  }
  return out;
}
