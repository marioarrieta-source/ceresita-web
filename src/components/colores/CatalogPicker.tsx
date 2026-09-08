"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import {
  colors,
  familias,
  filterColors,
  type Color,
  type Familia,
} from "@/data/colors";
import { readableText } from "@/lib/color";
import { cn } from "@/lib/cn";

export function CatalogPicker({
  open,
  onClose,
  onPick,
  title = "Elegir color del catálogo",
}: {
  open: boolean;
  onClose: () => void;
  onPick: (c: Color) => void;
  title?: string;
}) {
  const [q, setQ] = useState("");
  const [familia, setFamilia] = useState<Familia | "todas">("todas");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(
    () => filterColors(colors, { q, familia }),
    [q, familia],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-line bg-bg-raised sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line p-4">
          <p className="font-display text-lg text-ink">{title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-white/5"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 border-b border-line p-4">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Nombre, código o #hex"
              className="w-full rounded-full border border-line bg-white/5 py-2.5 pl-11 pr-4 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-white/35"
            />
          </div>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            <button
              type="button"
              onClick={() => setFamilia("todas")}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium",
                familia === "todas"
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-line bg-white/5 text-ink-soft",
              )}
            >
              Todas
            </button>
            {familias.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() =>
                  setFamilia((p) => (p === f.id ? "todas" : f.id))
                }
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
                  familia === f.id
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-line bg-white/5 text-ink-soft",
                )}
              >
                <span
                  className="h-3 w-3 rounded-full ring-1 ring-inset ring-white/20"
                  style={{ backgroundColor: f.muestra }}
                />
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto p-4">
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">
            {results.slice(0, 160).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onPick(c);
                  onClose();
                }}
                title={`${c.nombre} · ${c.codigo}`}
                className="group relative aspect-square rounded-lg ring-1 ring-inset ring-white/10 transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-gold"
                style={{ backgroundColor: c.hex }}
              >
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 truncate p-1 text-[9px] font-semibold opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: readableText(c.hex) }}
                >
                  {c.codigo}
                </span>
              </button>
            ))}
          </div>
          {results.length === 0 && (
            <p className="py-8 text-center text-sm text-ink-faint">
              Sin resultados.
            </p>
          )}
          {results.length > 160 && (
            <p className="mt-3 text-center text-xs text-ink-faint">
              Mostrando 160 de {results.length}. Afina la búsqueda o el filtro.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
