import { hexToRgb } from "@/lib/color";

/*
  Motor de recoloreado de pared para el simulador.

  Es la misma técnica que usan los visualizadores de pintura reales
  (CPP, Sherwin-Williams, Behr): sobre una FOTO real, se recolorea sólo la
  zona de pared marcada por una MÁSCARA, conservando las sombras, luces y
  textura de la foto mediante una mezcla tipo "multiply" que respeta la
  luminosidad original. El resultado se ve real porque la base ES una foto.
*/

export interface RecolorOptions {
  /** 0.6 – 1.6; mueve la exposición de la pared recoloreada */
  light?: number;
  /** ganancia general del tinte */
  gain?: number;
}

/**
 * Devuelve un canvas con la pared (definida por `mask`, canal rojo = pared)
 * recoloreada al `hex` indicado, conservando la iluminación de `base`.
 */
export function recolorWall(
  base: HTMLCanvasElement | HTMLImageElement,
  mask: HTMLCanvasElement,
  hex: string,
  opts: RecolorOptions = {},
): HTMLCanvasElement {
  const light = opts.light ?? 1;
  const gain = opts.gain ?? 1.16;

  const w = mask.width;
  const h = mask.height;
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  const octx = out.getContext("2d", { willReadFrequently: true })!;
  octx.drawImage(base, 0, 0, w, h);

  const img = octx.getImageData(0, 0, w, h);
  const d = img.data;
  const mctx = mask.getContext("2d", { willReadFrequently: true })!;
  const m = mctx.getImageData(0, 0, w, h).data;

  const { r: cr, g: cg, b: cb } = hexToRgb(hex);

  // Luminancia media de la pared en la base → normaliza el multiply
  let sum = 0;
  let n = 0;
  for (let i = 0; i < d.length; i += 4) {
    if (m[i] < 24) continue;
    sum += 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    n++;
  }
  const wallMean = n ? sum / n : 170;
  const norm = 180 / Math.max(40, wallMean);

  for (let i = 0; i < d.length; i += 4) {
    const mv = m[i];
    if (mv < 6) continue;
    const a = (mv / 255) * (m[i + 3] / 255 || 1);

    const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    const f = ((lum * norm) / 255) * (1 + (light - 1) * 0.7);

    let nr = cr * f * gain;
    let ng = cg * f * gain;
    let nb = cb * f * gain;

    // conserva reflejos fuertes de la foto (marcos de ventana, brillos)
    if (lum > 205) {
      const k = Math.min(1, (lum - 205) / 50) * 0.55;
      nr += (255 - nr) * k;
      ng += (255 - ng) * k;
      nb += (255 - nb) * k;
    }

    d[i] = d[i] * (1 - a) + Math.min(255, Math.max(0, nr)) * a;
    d[i + 1] = d[i + 1] * (1 - a) + Math.min(255, Math.max(0, ng)) * a;
    d[i + 2] = d[i + 2] * (1 - a) + Math.min(255, Math.max(0, nb)) * a;
  }

  octx.putImageData(img, 0, 0);
  return out;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
