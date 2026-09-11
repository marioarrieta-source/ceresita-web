"use client";

import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { seasonalColors } from "@/data/colors";
import { readableText } from "@/lib/color";
import { useContent } from "@/lib/content";

export function Hero() {
  const { home } = useContent();
  const swatches = seasonalColors.slice(0, 6);

  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(31,95,192,0.35) 0%, rgba(31,95,192,0) 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(247,181,0,0.18) 0%, rgba(247,181,0,0) 70%)",
        }}
      />

      <div className="container-page relative grid items-center gap-12 pb-0 pt-16 md:grid-cols-[1.02fr_0.98fr] md:pt-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1 text-xs font-medium text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {home.heroEyebrow}
          </p>

          <h1 className="font-display text-[2.7rem] leading-[1.02] text-ink sm:text-6xl">
            {home.heroTitleLine1}
            <br />
            <span className="text-ink">{home.heroTitleLine2}</span>
            <span className="text-gold">.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            {home.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/colores" size="lg">
              Explorar colores
              <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="/simulador" size="lg" variant="outline">
              Probar el simulador
            </ButtonLink>
          </div>
        </div>

        <div className="relative">
          <ImageSlot
            ratio="aspect-[4/5] sm:aspect-square md:aspect-[4/5]"
            label="Ambiente de portada"
            caption="Foto lifestyle de un espacio pintado con un color de temporada"
            className="shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]"
          />

          {/* Cartilla flotante de colores de temporada */}
          <div className="absolute bottom-3 left-3 w-[14rem] rounded-2xl border border-line bg-panel/95 p-3 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]">
            <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Colores de temporada
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {swatches.map((c) => (
                <div
                  key={c.id}
                  className="flex aspect-square flex-col justify-end rounded-lg p-1.5"
                  style={{ backgroundColor: c.hex, color: readableText(c.hex) }}
                >
                  <span className="truncate text-[8px] font-semibold opacity-95">
                    {c.nombre}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full spectrum-bar opacity-90" />
          </div>
        </div>
      </div>
    </section>
  );
}
