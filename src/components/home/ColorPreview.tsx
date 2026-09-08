"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { seasonalColors, familias } from "@/data/colors";
import { readableText } from "@/lib/color";

export function ColorPreview() {
  const [active, setActive] = useState<string | null>(null);
  const preview = familias.slice(0, 8);

  return (
    <section className="container-page py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Explorador de colores"
          title="Encuentra tu color sin perderte entre mil opciones"
          description="Filtra por familia, cartilla o temporada y llega al tono exacto. Cada color se conecta con el simulador y con los productos donde puedes pedirlo."
        />
        <Link
          href="/colores"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold hover:text-gold-soft"
        >
          Ver los 1488 colores
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
        {seasonalColors.map((c) => (
          <Link
            key={c.id}
            href={`/colores?color=${c.id}`}
            onMouseEnter={() => setActive(c.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(c.id)}
            onBlur={() => setActive(null)}
            className="group relative aspect-square rounded-xl ring-1 ring-inset ring-white/10 transition-transform hover:-translate-y-1"
            style={{ backgroundColor: c.hex }}
          >
            <span
              className={`pointer-events-none absolute inset-x-1 bottom-1 rounded-lg p-1.5 text-[10px] leading-tight transition-opacity ${
                active === c.id ? "opacity-100" : "opacity-0"
              }`}
              style={{ color: readableText(c.hex) }}
            >
              <span className="block font-semibold">{c.nombre}</span>
              <span className="block uppercase tracking-wide opacity-70">
                {c.codigo}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {preview.map((f) => (
          <Link
            key={f.id}
            href={`/colores?familia=${f.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-white/25 hover:text-ink"
          >
            <span
              className="h-3 w-3 rounded-full ring-1 ring-inset ring-white/20"
              style={{ backgroundColor: f.muestra }}
            />
            {f.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
