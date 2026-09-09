"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { hslToHex } from "@/lib/color";

/*
  Franja "+1500 colores": dos alas de láminas de color, fijas en su forma
  (abanico que se abre desde la placa hacia afuera y hacia arriba, como en la
  referencia de marca), con una placa metálica estática al centro construida
  en CSS (gradientes + sombras, sin imagen) para que el bisel y las esquinas
  asimétricas queden nítidos en cualquier resolución, incluida Retina.

  El "movimiento continuo" no rota el abanico (eso rompería su silueta fija):
  cada lámina cicla un shimmer interno de brillo/color vía background-position,
  con una fase distinta por lámina, así el flujo cromático se percibe
  atravesando el abanico sin mover su geometría.
*/

const HUE_STOPS = [175, 195, 215, 255, 275, 320, 380, 400, 415];
const PANELS_PER_SIDE = 9;

function hueAt(t: number): number {
  const segments = HUE_STOPS.length - 1;
  const pos = t * segments;
  const i = Math.min(Math.floor(pos), segments - 1);
  const frac = pos - i;
  const a = HUE_STOPS[i];
  const b = HUE_STOPS[i + 1];
  return (a + (b - a) * frac) % 360;
}

interface FanPanel {
  id: string;
  d: number; // distancia del centro, 0 (junto a la placa) .. 1 (punta del ala)
  parity: 0 | 1;
  dark: string;
  mid: string;
  light: string;
}

function buildSide(side: "left" | "right"): FanPanel[] {
  return Array.from({ length: PANELS_PER_SIDE }, (_, idx) => {
    const d = (idx + 1) / PANELS_PER_SIDE;
    const t = side === "left" ? 0.5 - d * 0.5 : 0.5 + d * 0.5;
    const hue = hueAt(t);
    return {
      id: `${side}-${idx}`,
      d,
      parity: (idx % 2) as 0 | 1,
      dark: hslToHex({ h: hue, s: 64, l: 27 }),
      mid: hslToHex({ h: hue, s: 76, l: 53 }),
      light: hslToHex({ h: hue, s: 56, l: 75 }),
    };
  });
}

const leftPanels = buildSide("left").reverse(); // punta del ala → placa
const rightPanels = buildSide("right"); // placa → punta del ala

function FanSide({ panels, sign }: { panels: FanPanel[]; sign: 1 | -1 }) {
  return (
    <div className="color-fan-side flex items-end">
      {panels.map((p, i) => (
        <span
          key={p.id}
          className="color-fan-panel"
          data-parity={p.parity}
          style={
            {
              "--d": p.d,
              "--rotate-sign": sign,
              backgroundImage: `linear-gradient(180deg, ${p.dark} 0%, ${p.mid} 32%, ${p.light} 50%, ${p.mid} 68%, ${p.dark} 100%)`,
              animationDelay: `${-i * 0.4}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function Plaque() {
  return (
    <div className="absolute left-1/2 top-1/2 z-10 h-[190px] w-[136px] -translate-x-1/2 -translate-y-1/2 rounded-tl-[32px] rounded-tr-[11px] rounded-br-[32px] rounded-bl-[11px] bg-linear-to-br from-white via-[#c6ccd6] to-[#868e9c] p-[6px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] sm:h-[248px] sm:w-[178px] sm:p-[7px] lg:h-[292px] lg:w-[212px] lg:p-2">
      {/* barrido de brillo diagonal sobre el marco cromado */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-tr from-transparent via-white/45 to-transparent" />
      {/* anillo interno oscuro (segundo bisel) */}
      <div className="relative h-full w-full rounded-[inherit] bg-linear-to-br from-[#7d8592] via-[#e7ebf0] to-[#5c636f] p-[3px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.35)]">
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-tl-[26px] rounded-tr-[8px] rounded-br-[26px] rounded-bl-[8px] bg-linear-to-b from-[#10151f] via-[#171f34] to-[#0a0e18] shadow-[inset_0_3px_8px_rgba(255,255,255,0.12),inset_0_-10px_22px_rgba(0,0,0,0.65)] ring-1 ring-black/50">
          <span className="text-sm font-black leading-none text-white/75 sm:text-base">
            +
          </span>
          <span
            className="font-display text-[2.15rem] font-black italic leading-none text-transparent sm:text-[2.7rem] lg:text-[3.2rem]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #ffffff 0%, #d7dde6 45%, #99a2b3 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            1500
          </span>
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.34em] text-white/85 sm:text-xs">
            Colores
          </span>
        </div>
      </div>
    </div>
  );
}

export function ColorMedallion() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#040610] py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-bg to-transparent" />

      <div
        className="relative mx-auto flex h-[240px] max-w-6xl items-center justify-center sm:h-[320px] lg:h-[400px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="color-fan flex items-end" data-spinning={inView} aria-hidden>
          <FanSide panels={leftPanels} sign={-1} />
          <div className="color-fan-gap shrink-0" />
          <FanSide panels={rightPanels} sign={1} />
        </div>

        <Plaque />
      </div>
    </section>
  );
}
