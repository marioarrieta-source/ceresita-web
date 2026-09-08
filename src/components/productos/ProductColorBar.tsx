"use client";

import Link from "next/link";
import { Palette, Wand2 } from "lucide-react";
import { useCeresita } from "@/lib/store";

export function ProductColorBar() {
  const selected = useCeresita((s) => s.selectedColor);

  return (
    <div className="rounded-2xl border border-line bg-bg-raised p-5">
      <h2 className="font-display text-xl text-ink">Pruébalo en un color</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Este producto se entona con todo el catálogo de tintometría Ceresita
        (cartilla Millennium, 1488 colores).
      </p>

      {selected ? (
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <span
              className="h-11 w-11 rounded-lg ring-1 ring-inset ring-white/10"
              style={{ backgroundColor: selected.hex }}
            />
            <div>
              <p className="text-sm font-semibold text-ink">{selected.nombre}</p>
              <p className="text-xs text-ink-soft">
                {selected.codigo} · {selected.hex.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/simulador?color=${selected.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-on-gold hover:bg-gold-soft"
            >
              <Wand2 size={15} />
              Ver en el simulador
            </Link>
            <Link
              href="/colores"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-ink hover:bg-white/5"
            >
              <Palette size={15} />
              Cambiar color
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/colores"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-on-gold hover:bg-gold-soft"
          >
            <Palette size={15} />
            Explorar colores
          </Link>
          <Link
            href="/simulador"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-ink hover:bg-white/5"
          >
            <Wand2 size={15} />
            Abrir simulador
          </Link>
        </div>
      )}
    </div>
  );
}
