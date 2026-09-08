import { products, type Product } from "@/data/products";

/** Extrae los m² por envase (por mano) de un string tipo "58 ± 5 m² / 4L / mano" */
export function rendimientoM2(r: string): number {
  const m = r.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 40;
}

export interface PaintEstimate {
  area: number;
  manos: number;
  litros: number;
  envases4L: number;
}

export function estimatePaint(
  area: number,
  manos: number,
  rendM2per4L: number,
): PaintEstimate {
  const litros = rendM2per4L > 0 ? (area * manos * 4) / rendM2per4L : 0;
  return {
    area,
    manos,
    litros,
    envases4L: Math.max(1, Math.ceil(litros / 4)),
  };
}

export type Acabado = "Mate" | "Satinado";

/** Producto Ceresita más adecuado según acabado y uso del ambiente */
export function recommendProduct(
  acabado: Acabado,
  uso: "Interior" | "Exterior",
): Product {
  const latex = products.filter((p) => p.categoria === "Látex");
  const byAll = latex.filter(
    (p) => p.acabado === acabado && p.usos.includes(uso),
  );
  const byAcabado = latex.filter((p) => p.acabado === acabado);
  const pool = byAll.length ? byAll : byAcabado.length ? byAcabado : latex;
  return [...pool].sort(
    (a, b) => rendimientoM2(b.rendimiento) - rendimientoM2(a.rendimiento),
  )[0];
}
