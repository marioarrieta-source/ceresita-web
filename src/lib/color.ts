/*
  Utilidades de color compartidas por el explorador, el creador de paletas
  y el simulador. Sin dependencias externas.
*/

export interface RGB {
  r: number;
  g: number;
  b: number;
}
export interface HSL {
  h: number;
  s: number;
  l: number;
}

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const to = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  return { r: (rp + m) * 255, g: (gp + m) * 255, b: (bp + m) * 255 };
}

export function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}
export function hslToHex(hsl: HSL): string {
  return rgbToHex(hslToRgb(hsl));
}

/** Luminancia relativa (WCAG) para decidir texto claro u oscuro sobre el swatch */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function readableText(hex: string): "#ffffff" | "#221c17" {
  return relativeLuminance(hex) > 0.42 ? "#221c17" : "#ffffff";
}

export function isLight(hex: string): boolean {
  return relativeLuminance(hex) > 0.8;
}

/** Distancia perceptual aproximada (Euclídea ponderada en RGB) */
export function colorDistance(a: string, b: string): number {
  const c1 = hexToRgb(a);
  const c2 = hexToRgb(b);
  const rMean = (c1.r + c2.r) / 2;
  const dr = c1.r - c2.r;
  const dg = c1.g - c2.g;
  const db = c1.b - c2.b;
  return Math.sqrt(
    (2 + rMean / 256) * dr * dr +
      4 * dg * dg +
      (2 + (255 - rMean) / 256) * db * db,
  );
}

export function withHue(hex: string, hueShift: number): string {
  const hsl = hexToHsl(hex);
  return hslToHex({ ...hsl, h: (hsl.h + hueShift + 360) % 360 });
}

export function adjustLightness(hex: string, deltaL: number): string {
  const hsl = hexToHsl(hex);
  return hslToHex({
    ...hsl,
    l: Math.max(0, Math.min(100, hsl.l + deltaL)),
  });
}

/**
 * Desplaza el tono en claridad pero mantiene un rango que evita el blanco y el
 * negro puros (así no se pierde el matiz al generar variantes de catálogo).
 */
export function toneShift(hex: string, deltaL: number, min = 13, max = 93): string {
  const hsl = hexToHsl(hex);
  return hslToHex({
    ...hsl,
    l: Math.max(min, Math.min(max, hsl.l + deltaL)),
  });
}

export type HarmonyKind =
  | "complementario"
  | "analogos"
  | "monocromatico"
  | "triadico";

/** Genera colores teóricos de una armonía a partir de un color base */
export function harmonyColors(baseHex: string, kind: HarmonyKind): string[] {
  const hsl = hexToHsl(baseHex);
  switch (kind) {
    case "complementario":
      return [baseHex, hslToHex({ ...hsl, h: (hsl.h + 180) % 360 })];
    case "analogos":
      return [
        hslToHex({ ...hsl, h: (hsl.h + 330) % 360 }),
        baseHex,
        hslToHex({ ...hsl, h: (hsl.h + 30) % 360 }),
      ];
    case "triadico":
      return [
        baseHex,
        hslToHex({ ...hsl, h: (hsl.h + 120) % 360 }),
        hslToHex({ ...hsl, h: (hsl.h + 240) % 360 }),
      ];
    case "monocromatico":
    default:
      return [
        adjustLightness(baseHex, 28),
        adjustLightness(baseHex, 14),
        baseHex,
        adjustLightness(baseHex, -14),
        adjustLightness(baseHex, -26),
      ];
  }
}
