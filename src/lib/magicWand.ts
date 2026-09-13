/*
  Selección automática de pared por "varita mágica" (flood-fill tolerante).

  En vez de pintar la pared a mano, el usuario hace clic sobre ella: se
  expande una selección desde ese punto comparando cada píxel con sus
  VECINOS (no solo contra el color semilla), lo que permite seguir
  degradados de luz/sombra suaves sobre la pared sin "fugarse" a objetos
  vecinos (marcos, plantas, muebles) porque ahí el color cambia de golpe.
  Es la misma idea que la "varita mágica" de Photoshop, sin depender de
  ningún modelo de IA ni servicio externo — corre entero en el navegador.
*/

function newTransparentCanvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

/**
 * Devuelve un canvas del tamaño de `base` con la región contigua a
 * (`seedX`,`seedY`) pintada en rojo opaco (formato de máscara usado por
 * `recolorWall`) y el resto totalmente transparente, para poder
 * componerla sobre una máscara existente sin borrar lo ya seleccionado.
 *
 * `tolerance` 0–100: qué tan distinto puede ser un píxel de su vecino ya
 * seleccionado para seguir sumándose a la selección.
 */
export function magicWandMask(
  base: HTMLCanvasElement,
  seedX: number,
  seedY: number,
  tolerance: number,
): HTMLCanvasElement {
  const w = base.width;
  const h = base.height;
  const out = newTransparentCanvas(w, h);

  const sx = Math.round(seedX);
  const sy = Math.round(seedY);
  if (sx < 0 || sy < 0 || sx >= w || sy >= h) return out;

  const bctx = base.getContext("2d", { willReadFrequently: true })!;
  const { data } = bctx.getImageData(0, 0, w, h);

  const maxDiff = 10 + tolerance * 2.4;
  const visited = new Uint8Array(w * h);
  const stack = new Int32Array(w * h);
  let sp = 0;

  const seedI = (sy * w + sx) * 4;
  stack[sp++] = sy * w + sx;
  visited[sy * w + sx] = 1;

  // Referencia que se va actualizando por vecindad (región creciente),
  // así sigue degradados suaves de luz sin perder el color "raíz".
  let refR = data[seedI];
  let refG = data[seedI + 1];
  let refB = data[seedI + 2];
  let refN = 1;

  const selected = new Uint8Array(w * h);

  while (sp > 0) {
    const p = stack[--sp];
    selected[p] = 1;
    const x = p % w;
    const y = (p / w) | 0;
    const i = p * 4;

    refR += (data[i] - refR) / ++refN;
    refG += (data[i + 1] - refG) / refN;
    refB += (data[i + 2] - refB) / refN;

    const nb =
      x > 0 && y > 0 && x < w - 1 && y < h - 1
        ? ([
            p - 1,
            p + 1,
            p - w,
            p + w,
          ] as const)
        : ([
            x > 0 ? p - 1 : -1,
            x < w - 1 ? p + 1 : -1,
            y > 0 ? p - w : -1,
            y < h - 1 ? p + w : -1,
          ] as const);

    for (const np of nb) {
      if (np < 0 || visited[np]) continue;
      visited[np] = 1;
      const ni = np * 4;
      const dr = data[ni] - refR;
      const dg = data[ni + 1] - refG;
      const db = data[ni + 2] - refB;
      const dist = Math.sqrt(dr * dr + dg * dg + db * db);
      if (dist <= maxDiff) {
        stack[sp++] = np;
      }
    }
  }

  const octx = out.getContext("2d")!;
  const img = octx.createImageData(w, h);
  for (let p = 0; p < w * h; p++) {
    if (!selected[p]) continue;
    const i = p * 4;
    img.data[i] = 255;
    img.data[i + 1] = 0;
    img.data[i + 2] = 0;
    img.data[i + 3] = 255;
  }
  octx.putImageData(img, 0, 0);
  return out;
}
