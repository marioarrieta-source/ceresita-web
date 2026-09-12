"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { inspirationTiles, type InspirationTile } from "@/data/inspiration";
import { cn } from "@/lib/cn";

function tileBackground(tile: InspirationTile): string {
  const [c1, c2] = tile.colors;
  switch (tile.treatment) {
    case "block":
      return `linear-gradient(135deg, ${c1} 0%, ${c1} 46%, ${c2 ?? c1} 54%, ${c2 ?? c1} 100%)`;
    case "glow":
      return `radial-gradient(90% 90% at 22% 18%, rgba(255,255,255,0.32) 0%, transparent 55%), linear-gradient(160deg, ${c1} 0%, ${c2 ?? c1} 100%)`;
    case "hatch":
      return `repeating-linear-gradient(45deg, rgba(255,255,255,0.09) 0px, rgba(255,255,255,0.09) 1px, transparent 1px, transparent 9px), linear-gradient(150deg, ${c1} 0%, ${c2 ?? c1} 100%)`;
    case "grain":
      return `radial-gradient(120% 120% at 18% 0%, rgba(255,255,255,0.16) 0%, transparent 55%), linear-gradient(160deg, ${c1} 0%, ${c1} 100%)`;
    case "blend":
    default:
      return `linear-gradient(150deg, ${c1} 0%, ${c2 ?? c1} 100%)`;
  }
}

function Tile({ tile }: { tile: InspirationTile }) {
  return (
    <a
      href={site.instagram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${tile.title} — ver en Instagram`}
      className="group relative block h-full shrink-0 overflow-hidden rounded-xl transition-transform duration-500 ease-out hover:z-10 hover:scale-[1.035]"
      style={{ aspectRatio: tile.ratio }}
    >
      <div
        className={cn("absolute inset-0", tile.treatment === "grain" && "grain-overlay")}
        style={{ backgroundImage: tileBackground(tile) }}
      />

      {/* Scrim inferior para legibilidad, más presente en hover */}
      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/0 to-black/0 opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

      {/* Etiqueta editorial, siempre visible pero discreta */}
      <span className="absolute left-3 top-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
        {tile.kicker}
      </span>

      {/* Título + CTA, aparecen con el hover */}
      <div className="absolute inset-x-3 bottom-3 flex translate-y-1.5 flex-col gap-1 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-sm font-medium leading-tight text-white">
          {tile.title}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-gold-soft">
          Ver en Instagram
          <ArrowUpRight size={12} />
        </span>
      </div>
    </a>
  );
}

export function Inspiration() {
  const [paused, setPaused] = useState(false);
  const loopTiles = [...inspirationTiles, ...inspirationTiles];

  return (
    <section className="py-14 sm:py-16">
      <div className="container-page mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Inspírate
          </p>
          <h2 className="font-display text-2xl leading-[1.08] text-ink sm:text-3xl">
            Ideas de color para cada rincón
          </h2>
        </div>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-faint transition-colors hover:text-gold sm:inline-flex"
        >
          Más inspiración en Instagram
          <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Desktop / tablet: marquee infinito, se pausa con el hover */}
      <div
        className="hidden md:block"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
        }}
      >
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="marquee-track flex h-[240px] w-max gap-3 lg:h-[272px]"
            data-paused={paused}
          >
            {loopTiles.map((tile, i) => (
              <Tile key={`${tile.id}-${i}`} tile={tile} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: franja compacta, deslizable con el dedo, sin animación automática */}
      <div className="container-page md:hidden">
        <div className="scrollbar-none flex h-[168px] snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
          {inspirationTiles.map((tile) => (
            <div key={tile.id} className="snap-start">
              <Tile tile={tile} />
            </div>
          ))}
        </div>
      </div>

      <div className="container-page mt-4 sm:hidden">
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-faint"
        >
          Más inspiración en Instagram
          <ArrowUpRight size={13} />
        </a>
      </div>
    </section>
  );
}
