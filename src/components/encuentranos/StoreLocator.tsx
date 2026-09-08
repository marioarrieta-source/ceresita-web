"use client";

import { useMemo, useState } from "react";
import { MapPin, Phone, Navigation, Search, Store as StoreIcon } from "lucide-react";
import { mapsUrl } from "@/data/stores";
import { useContent } from "@/lib/content";
import { cn } from "@/lib/cn";
import { PeruMap } from "@/components/encuentranos/PeruMap";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-gold bg-gold/15 text-gold"
          : "border-line bg-white/5 text-ink-soft hover:border-white/25 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

export function StoreLocator() {
  const { stores } = useContent();
  const [ciudad, setCiudad] = useState<string>("Lima");
  const [distrito, setDistrito] = useState<string>("todos");
  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const storeCiudades = useMemo(
    () => Array.from(new Set(stores.map((s) => s.ciudad))),
    [stores],
  );

  const distritos = useMemo(
    () =>
      Array.from(
        new Set(
          stores.filter((s) => s.ciudad === ciudad).map((s) => s.distrito),
        ),
      ),
    [ciudad, stores],
  );

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return stores.filter((s) => {
      if (s.ciudad !== ciudad) return false;
      if (distrito !== "todos" && s.distrito !== distrito) return false;
      if (needle) {
        const hay = `${s.nombre} ${s.direccion} ${s.distrito}`
          .toLowerCase()
          .includes(needle);
        if (!hay) return false;
      }
      return true;
    });
  }, [ciudad, distrito, q, stores]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      {/* Mapa */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-line bg-panel p-4">
          <div className="mx-auto aspect-[2/3] max-h-[520px]">
            <PeruMap
              stores={stores.filter((s) => s.ciudad === ciudad)}
              activeId={activeId}
              onHover={setActiveId}
              onSelect={setActiveId}
            />
          </div>
          <p className="mt-2 text-center text-xs text-ink-faint">
            <span className="font-display text-base text-ink">120+</span> puntos
            de venta a nivel nacional
          </p>
        </div>
      </div>

      {/* Filtros + lista */}
      <div>
        <div className="space-y-3">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre, distrito o dirección"
              className="w-full rounded-full border border-line bg-white/5 py-3 pl-11 pr-4 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-white/35"
            />
          </div>

          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {storeCiudades.map((c) => (
              <Chip
                key={c}
                active={ciudad === c}
                onClick={() => {
                  setCiudad(c);
                  setDistrito("todos");
                  setActiveId(null);
                }}
              >
                {c}
              </Chip>
            ))}
          </div>

          {distritos.length > 1 && (
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              <Chip
                active={distrito === "todos"}
                onClick={() => setDistrito("todos")}
              >
                Todos los distritos
              </Chip>
              {distritos.map((d) => (
                <Chip
                  key={d}
                  active={distrito === d}
                  onClick={() =>
                    setDistrito((p) => (p === d ? "todos" : d))
                  }
                >
                  {d}
                </Chip>
              ))}
            </div>
          )}
        </div>

        <p className="mt-5 text-sm text-ink-soft">
          <span className="font-semibold text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "punto de venta" : "puntos de venta"} en{" "}
          {ciudad}
        </p>

        <ul className="mt-4 space-y-3">
          {results.map((s) => (
            <li
              key={s.id}
              onMouseEnter={() => setActiveId(s.id)}
              onMouseLeave={() => setActiveId(null)}
              className={cn(
                "rounded-2xl border bg-bg-raised p-4 transition-colors",
                activeId === s.id ? "border-gold/50" : "border-line",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-lg text-ink">{s.nombre}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-soft">
                    <MapPin size={14} className="shrink-0 text-gold" />
                    {s.direccion} — {s.distrito}, {s.ciudad}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-line bg-white/5 px-2.5 py-1 text-[11px] font-medium text-ink-soft">
                  {s.tipo}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={mapsUrl(s)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-xs font-semibold text-on-gold hover:bg-gold-soft"
                >
                  <Navigation size={13} />
                  Cómo llegar
                </a>
                <a
                  href={`tel:${s.telefono.replace(/[^\d+]/g, "")}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-ink hover:bg-white/5"
                >
                  <Phone size={13} />
                  {s.telefono}
                </a>
              </div>
            </li>
          ))}
          {results.length === 0 && (
            <li className="rounded-2xl border border-line bg-bg-raised p-8 text-center text-sm text-ink-soft">
              <StoreIcon size={20} className="mx-auto mb-2 text-ink-faint" />
              No encontramos puntos de venta con esos filtros.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
