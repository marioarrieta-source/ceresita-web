"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeritageBadge } from "@/components/ui/HeritageBadge";
import { stripColors } from "@/data/colors";
import { readableText } from "@/lib/color";

export function SpectrumBand() {
  const track = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    track.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <div className="container-page">
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-bg-raised p-3 sm:gap-5 sm:p-4">
        <div className="shrink-0">
          <HeritageBadge />
        </div>

        <div className="relative min-w-0 flex-1">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Ver colores anteriores"
            className="absolute -left-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-line bg-bg p-1.5 text-ink-soft hover:text-ink sm:block"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={track}
            className="flex snap-x gap-2 overflow-x-auto scroll-px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {stripColors.map((c) => (
              <Link
                key={c.id}
                href={`/colores?color=${c.id}`}
                title={`${c.nombre} · ${c.codigo}`}
                className="group relative aspect-square w-14 shrink-0 snap-start rounded-lg ring-1 ring-inset ring-white/10 transition-transform hover:-translate-y-1 sm:w-16"
                style={{ backgroundColor: c.hex }}
              >
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 truncate rounded-b-lg px-1 pb-1 text-[8px] font-semibold uppercase tracking-wide opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: readableText(c.hex) }}
                >
                  {c.codigo}
                </span>
              </Link>
            ))}
            <Link
              href="/colores"
              className="flex aspect-square w-14 shrink-0 snap-start items-center justify-center rounded-lg border border-dashed border-white/20 text-[10px] font-semibold text-ink-soft hover:text-ink sm:w-16"
            >
              Ver
              <br />
              todos
            </Link>
          </div>

          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Ver más colores"
            className="absolute -right-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-line bg-bg p-1.5 text-ink-soft hover:text-ink sm:block"
          >
            <ChevronRight size={16} />
          </button>

          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-bg-raised to-transparent" />
        </div>
      </div>
    </div>
  );
}
