"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus, Wand2, ArrowRight } from "lucide-react";
import {
  colors,
  seasonalColors,
  harmonyKinds,
  harmonyToCatalog,
  nearestColor,
  type Color,
  type HarmonyKind,
} from "@/data/colors";
import { hexToHsl, hslToHex, readableText } from "@/lib/color";
import { useCeresita } from "@/lib/store";
import { cn } from "@/lib/cn";
import { CatalogPicker } from "@/components/colores/CatalogPicker";

const DEFAULT = nearestColor("#3f6480");
const R_OUTER = 132;
const R_INNER = 88;
const CENTER = 150;

const rnd = (n: number) => Math.round(n * 100) / 100;

function polar(hue: number, r: number) {
  const rad = ((hue - 90) * Math.PI) / 180;
  return { x: rnd(CENTER + r * Math.cos(rad)), y: rnd(CENTER + r * Math.sin(rad)) };
}

function wedgePath(a: number, b: number) {
  const o1 = polar(a, R_OUTER);
  const o2 = polar(b, R_OUTER);
  const i2 = polar(b, R_INNER);
  const i1 = polar(a, R_INNER);
  return `M ${o1.x} ${o1.y} A ${R_OUTER} ${R_OUTER} 0 0 1 ${o2.x} ${o2.y} L ${i2.x} ${i2.y} A ${R_INNER} ${R_INNER} 0 0 0 ${i1.x} ${i1.y} Z`;
}

const SEGMENTS = Array.from({ length: 48 }, (_, i) => i * 7.5);

/** Ángulos relativos de cada armonía respecto al color base */
const OFFSETS: Record<HarmonyKind, number[]> = {
  complementario: [0, 180],
  analogos: [-30, 0, 30],
  monocromatico: [0],
  triadico: [0, 120, 240],
};

export function ColorWheel() {
  const params = useSearchParams();
  const setSelectedColor = useCeresita((s) => s.setSelectedColor);

  const [base, setBase] = useState<Color>(DEFAULT);
  const [kind, setKind] = useState<HarmonyKind>("complementario");
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    const c = params.get("color");
    if (c) {
      const found = colors.find((x) => x.id === c);
      if (found) setBase(found);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const baseHsl = hexToHsl(base.hex);
  const kinds = harmonyKinds.filter((k) => k.id !== "monocromatico");

  const matches = useMemo(
    () => harmonyToCatalog(base.hex, kind),
    [base, kind],
  );

  const markers = useMemo(
    () =>
      OFFSETS[kind].map((off) => {
        const hue = (baseHsl.h + off + 360) % 360;
        const theoretical = hslToHex({ h: hue, s: 68, l: 55 });
        return { hue, off, real: nearestColor(theoretical) };
      }),
    [baseHsl.h, kind],
  );

  const pickHue = (clientX: number, clientY: number, rect: DOMRect) => {
    const x = ((clientX - rect.left) / rect.width) * 300 - CENTER;
    const y = ((clientY - rect.top) / rect.height) * 300 - CENTER;
    let deg = (Math.atan2(y, x) * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;
    setBase(nearestColor(hslToHex({ h: deg, s: baseHsl.s || 60, l: baseHsl.l || 55 })));
  };

  const goSimulador = (c: Color) => {
    setSelectedColor({
      id: c.id,
      nombre: c.nombre,
      codigo: c.codigo,
      hex: c.hex,
    });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      {/* Rueda */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-line bg-bg-raised p-5">
          <svg
            viewBox="0 0 300 300"
            className="mx-auto w-full max-w-sm cursor-crosshair"
            onClick={(e) =>
              pickHue(
                e.clientX,
                e.clientY,
                (e.currentTarget as SVGSVGElement).getBoundingClientRect(),
              )
            }
          >
            {SEGMENTS.map((a) => (
              <path
                key={a}
                d={wedgePath(a, a + 7.5)}
                fill={hslToHex({ h: a + 3.75, s: 70, l: 55 })}
                opacity={0.9}
              />
            ))}
            <circle cx={CENTER} cy={CENTER} r={R_INNER - 6} fill="#0e1a38" />

            {/* Conectores */}
            {markers.map((m, i) => {
              const p = polar(m.hue, (R_OUTER + R_INNER) / 2);
              return (
                <line
                  key={i}
                  x1={CENTER}
                  y1={CENTER}
                  x2={p.x}
                  y2={p.y}
                  stroke="#f7b500"
                  strokeWidth={m.off === 0 ? 2.5 : 1.5}
                  strokeDasharray={m.off === 0 ? "0" : "4 4"}
                  opacity={0.7}
                />
              );
            })}

            {/* Marcadores */}
            {markers.map((m, i) => {
              const p = polar(m.hue, (R_OUTER + R_INNER) / 2);
              const isBase = m.off === 0;
              return (
                <g key={`m${i}`}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isBase ? 17 : 13}
                    fill={m.real.hex}
                    stroke="#0a1226"
                    strokeWidth="3"
                  />
                  {isBase && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={21}
                      fill="none"
                      stroke="#f7b500"
                      strokeWidth="2"
                    />
                  )}
                </g>
              );
            })}

            {/* Centro: color base */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={44}
              fill={base.hex}
              stroke="#0a1226"
              strokeWidth="4"
            />
            <text
              x={CENTER}
              y={CENTER - 2}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={readableText(base.hex)}
            >
              {base.codigo}
            </text>
            <text
              x={CENTER}
              y={CENTER + 12}
              textAnchor="middle"
              fontSize="8"
              fill={readableText(base.hex)}
              opacity="0.8"
            >
              base
            </text>
          </svg>

          <p className="mt-3 text-center text-xs text-ink-faint">
            Toca la rueda o elige un color del catálogo.
          </p>
        </div>
      </div>

      {/* Panel */}
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl text-ink">Color base</h2>
          <div className="mt-3 flex items-center gap-4 rounded-2xl border border-line bg-bg-raised p-3">
            <div
              className="h-16 w-16 shrink-0 rounded-xl ring-1 ring-inset ring-white/10"
              style={{ backgroundColor: base.hex }}
            />
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg text-ink">{base.nombre}</p>
              <p className="text-sm text-ink-soft">
                {base.codigo} · {base.hex.toUpperCase()} · Millennium
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="shrink-0 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-ink hover:bg-white/5"
            >
              Cambiar
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {seasonalColors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setBase(c)}
                title={`${c.nombre} · ${c.codigo}`}
                className="h-8 w-8 rounded-lg ring-1 ring-inset ring-white/10 transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Relación de color</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {kinds.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setKind(k.id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
                  kind === k.id
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-line bg-white/5 text-ink-soft hover:text-ink",
                )}
              >
                {k.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            {kinds.find((k) => k.id === kind)?.hint}
          </p>

          <div className="mt-4 space-y-2">
            {matches.map((c) => (
              <div
                key={c.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-bg-raised p-3"
              >
                <div
                  className="h-12 w-12 shrink-0 rounded-lg ring-1 ring-inset ring-white/10"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">
                    {c.nombre}
                    {c.id === base.id && (
                      <span className="ml-2 text-xs font-normal text-ink-faint">
                        (base)
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {c.codigo} · {c.hex.toUpperCase()}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <Link
                    href={`/simulador?color=${c.id}`}
                    onClick={() => goSimulador(c)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-on-gold hover:bg-gold-soft"
                  >
                    <Wand2 size={13} />
                    Simulador
                  </Link>
                  <Link
                    href={`/colores?color=${c.id}`}
                    className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-white/5"
                  >
                    Ver
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-panel p-5 text-sm text-ink-soft">
          <p className="font-semibold text-ink">Cómo usarlo al vender</p>
          <ul className="mt-2 space-y-1.5">
            <li>
              <span className="text-gold">·</span> El{" "}
              <span className="text-ink">complementario</span> funciona como color
              de acento en una pared o detalle.
            </li>
            <li>
              <span className="text-gold">·</span> Los{" "}
              <span className="text-ink">análogos</span> dan una combinación
              tranquila para ambientes conectados.
            </li>
            <li>
              <span className="text-gold">·</span> El{" "}
              <span className="text-ink">triádico</span> aporta un tercer tono
              para textiles o carpintería.
            </li>
          </ul>
        </section>
      </div>

      <CatalogPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title="Elegir color base"
        onPick={(c) => setBase(c)}
      />
    </div>
  );
}
