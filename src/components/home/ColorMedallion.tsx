"use client";

import { useEffect, useRef, useState } from "react";
import { hslToHex } from "@/lib/color";

/*
  Franja "+1500 colores": una ruleta cromática de aspas gira detrás de una
  placa metálica estática. La placa se construye con CSS (gradientes +
  sombras, sin imagen) para que el trazo del bisel y las esquinas asimétricas
  queden nítidos en cualquier resolución, incluida Retina.

  La rueda es un único contenedor rotado (transform: rotate(0→360deg)); al
  ser una rotación rígida completa, el loop es matemáticamente perfecto sin
  necesidad de sincronizar colores en el punto de reinicio.
*/

const HUE_STOPS = [175, 195, 215, 255, 275, 320, 380, 400, 415, 535];
const BLADE_COUNT = 20;

function hueAt(t: number): number {
  const segments = HUE_STOPS.length - 1;
  const pos = t * segments;
  const i = Math.min(Math.floor(pos), segments - 1);
  const frac = pos - i;
  const a = HUE_STOPS[i];
  const b = HUE_STOPS[i + 1];
  return (a + (b - a) * frac) % 360;
}

const blades = Array.from({ length: BLADE_COUNT }, (_, i) => {
  const hue = hueAt(i / BLADE_COUNT);
  // sombreado alterno entre piezas vecinas: refuerza la lectura de facetas
  // plegadas en vez de una franja de color plana.
  const fold = i % 2 === 0 ? -6 : 5;
  return {
    id: i,
    angle: (i / BLADE_COUNT) * 360,
    dark: hslToHex({ h: hue, s: 66, l: 26 + fold }),
    mid: hslToHex({ h: hue, s: 76, l: 52 + fold }),
    light: hslToHex({ h: hue, s: 58, l: 76 + fold * 0.5 }),
  };
});

function Plaque() {
  return (
    <div className="relative z-10 h-[190px] w-[136px] rounded-tl-[32px] rounded-tr-[11px] rounded-br-[32px] rounded-bl-[11px] bg-linear-to-br from-white via-[#c6ccd6] to-[#868e9c] p-[6px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] sm:h-[248px] sm:w-[178px] sm:p-[7px] lg:h-[292px] lg:w-[212px] lg:p-2">
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
        className="relative mx-auto flex h-[260px] max-w-6xl items-center justify-center sm:h-[340px] lg:h-[420px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="color-wheel" data-spinning={inView} aria-hidden>
          {blades.map((b) => (
            <span
              key={b.id}
              className="color-wheel-blade"
              style={{
                transform: `rotate(${b.angle}deg) translateY(calc(-1 * (var(--wheel-radius) + var(--blade-h) / 2)))`,
                backgroundImage: `linear-gradient(100deg, ${b.dark} 0%, ${b.mid} 34%, ${b.light} 50%, ${b.mid} 66%, ${b.dark} 100%)`,
              }}
            />
          ))}
        </div>

        <Plaque />
      </div>
    </section>
  );
}
