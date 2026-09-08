"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import {
  colors,
  familias,
  tonos,
  filterColors,
  type Color,
  type Familia,
  type Tono,
} from "@/data/colors";
import { readableText } from "@/lib/color";
import { cn } from "@/lib/cn";
import { ColorDetailModal } from "@/components/colores/ColorDetailModal";

type FamOpt = Familia | "todas";
type TonoOpt = Tono | "todos";

const PREVIEW_PER_FAMILIA = 36;
const FLAT_CAP = 600;

function Swatch({ color, onOpen }: { color: Color; onOpen: (c: Color) => void }) {
  const text = readableText(color.hex);
  return (
    <button
      type="button"
      onClick={() => onOpen(color)}
      className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-inset ring-white/10 outline-none transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-gold"
      style={{ backgroundColor: color.hex }}
      title={`${color.nombre} · ${color.codigo}`}
    >
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-2 text-left text-[10px] leading-tight opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          color: text,
          background:
            text === "#ffffff"
              ? "linear-gradient(to top, rgba(0,0,0,0.4), transparent)"
              : "linear-gradient(to top, rgba(255,255,255,0.4), transparent)",
        }}
      >
        <span className="font-semibold">{color.nombre}</span>
        <span className="uppercase tracking-wide opacity-80">{color.codigo}</span>
      </span>
    </button>
  );
}

function Chip({
  active,
  onClick,
  children,
  dot,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dot?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-gold bg-gold/15 text-gold"
          : "border-line bg-white/5 text-ink-soft hover:border-white/25 hover:text-ink",
      )}
    >
      {dot && (
        <span
          className="h-3 w-3 rounded-full ring-1 ring-inset ring-white/20"
          style={{ backgroundColor: dot }}
        />
      )}
      {children}
    </button>
  );
}

export function ColorExplorer() {
  const params = useSearchParams();

  const [q, setQ] = useState("");
  const [familia, setFamilia] = useState<FamOpt>("todas");
  const [tono, setTono] = useState<TonoOpt>("todos");
  const [openColor, setOpenColor] = useState<Color | null>(null);

  useEffect(() => {
    const f = params.get("familia");
    if (f && familias.some((x) => x.id === f)) setFamilia(f as Familia);
    const c = params.get("color");
    if (c) {
      const found = colors.find((x) => x.id === c);
      if (found) setOpenColor(found);
    }
    const query = params.get("q");
    if (query) setQ(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const results = useMemo(
    () => filterColors(colors, { q, familia, tono }),
    [q, familia, tono],
  );

  const countByFamilia = useMemo(() => {
    const base = filterColors(colors, { q, tono });
    const map: Record<string, number> = {};
    base.forEach((c) => (map[c.familia] = (map[c.familia] ?? 0) + 1));
    return map;
  }, [q, tono]);

  const grouped = familia === "todas" && !q.trim();
  const hasFilters = q.trim() !== "" || familia !== "todas" || tono !== "todos";

  const clearAll = () => {
    setQ("");
    setFamilia("todas");
    setTono("todos");
  };

  return (
    <div>
      {/* Barra de filtros */}
      <div className="sticky top-16 z-30 -mx-5 border-b border-line bg-bg/95 px-5 py-4 md:-mx-8 md:px-8">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Busca por nombre, código o #hex"
              className="w-full rounded-full border border-line bg-white/5 py-3 pl-11 pr-10 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-white/35"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            <Chip active={familia === "todas"} onClick={() => setFamilia("todas")}>
              Todas
            </Chip>
            {familias.map((f) => (
              <Chip
                key={f.id}
                active={familia === f.id}
                onClick={() =>
                  setFamilia((prev) => (prev === f.id ? "todas" : f.id))
                }
                dot={f.muestra}
              >
                {f.label}
                <span className="text-ink-faint">
                  {countByFamilia[f.id] ?? 0}
                </span>
              </Chip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Tono
            </span>
            <Chip active={tono === "todos"} onClick={() => setTono("todos")}>
              Todos
            </Chip>
            {tonos.map((t) => (
              <Chip
                key={t}
                active={tono === t}
                onClick={() => setTono((p) => (p === t ? "todos" : t))}
              >
                {t}
              </Chip>
            ))}
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="ml-1 text-xs font-medium text-gold hover:text-gold-soft"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="py-8">
        <p className="mb-5 text-sm text-ink-soft">
          <span className="font-semibold text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "color" : "colores"}
          {familia !== "todas" && (
            <>
              {" "}
              en{" "}
              <span className="text-ink">
                {familias.find((f) => f.id === familia)?.label}
              </span>
            </>
          )}
        </p>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-line bg-bg-raised p-10 text-center">
            <p className="text-ink">Sin resultados para esta combinación.</p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-3 text-sm font-semibold text-gold hover:text-gold-soft"
            >
              Limpiar filtros
            </button>
          </div>
        ) : grouped ? (
          <div className="space-y-10">
            {familias.map((f) => {
              const list = results.filter((c) => c.familia === f.id);
              if (!list.length) return null;
              const shown = list.slice(0, PREVIEW_PER_FAMILIA);
              return (
                <section key={f.id}>
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="h-4 w-4 rounded-full ring-1 ring-inset ring-white/20"
                      style={{ backgroundColor: f.muestra }}
                    />
                    <h2 className="font-display text-lg text-ink">{f.label}</h2>
                    <span className="text-xs text-ink-faint">{list.length}</span>
                    <button
                      type="button"
                      onClick={() => setFamilia(f.id)}
                      className="ml-auto text-xs font-medium text-gold hover:text-gold-soft"
                    >
                      Ver los {list.length} →
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
                    {shown.map((c) => (
                      <Swatch key={c.id} color={c} onOpen={setOpenColor} />
                    ))}
                  </div>
                  {list.length > PREVIEW_PER_FAMILIA && (
                    <button
                      type="button"
                      onClick={() => setFamilia(f.id)}
                      className="mt-3 text-xs font-medium text-ink-soft hover:text-ink"
                    >
                      + {list.length - PREVIEW_PER_FAMILIA} colores más en{" "}
                      {f.label.toLowerCase()}
                    </button>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
              {results.slice(0, FLAT_CAP).map((c) => (
                <Swatch key={c.id} color={c} onOpen={setOpenColor} />
              ))}
            </div>
            {results.length > FLAT_CAP && (
              <p className="mt-4 text-center text-xs text-ink-faint">
                Mostrando {FLAT_CAP} de {results.length}. Afina la búsqueda o el
                tono para ver el resto.
              </p>
            )}
          </>
        )}
      </div>

      <ColorDetailModal color={openColor} onClose={() => setOpenColor(null)} />
    </div>
  );
}
