"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FileDown, X } from "lucide-react";
import {
  products,
  categorias,
  ambientesCatalogo,
  type Categoria,
  type Ambiente,
} from "@/data/products";
import { colors } from "@/data/colors";
import { ProductCard } from "@/components/productos/ProductCard";
import { cn } from "@/lib/cn";

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

export function ProductCatalog() {
  const params = useSearchParams();
  const [categoria, setCategoria] = useState<Categoria | "todas">("todas");
  const [ambiente, setAmbiente] = useState<Ambiente | "todos">("todos");
  const [colorCtx, setColorCtx] = useState<(typeof colors)[number] | null>(null);

  useEffect(() => {
    const c = params.get("color");
    if (c) {
      const found = colors.find((x) => x.id === c);
      if (found) {
        setColorCtx(found);
        setCategoria("Látex");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const results = useMemo(
    () =>
      products.filter((p) => {
        if (categoria !== "todas" && p.categoria !== categoria) return false;
        if (ambiente !== "todos" && !p.ambientes.includes(ambiente)) return false;
        if (colorCtx && !colorCtx.productosCompatibles.includes(p.id))
          return false;
        return true;
      }),
    [categoria, ambiente, colorCtx],
  );

  return (
    <div>
      {colorCtx && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-line bg-bg-raised p-3">
          <span
            className="h-10 w-10 shrink-0 rounded-lg ring-1 ring-inset ring-white/10"
            style={{ backgroundColor: colorCtx.hex }}
          />
          <p className="flex-1 text-sm text-ink-soft">
            Productos donde puedes pedir{" "}
            <span className="font-semibold text-ink">{colorCtx.nombre}</span> (
            {colorCtx.codigo})
          </p>
          <button
            type="button"
            onClick={() => setColorCtx(null)}
            aria-label="Quitar filtro de color"
            className="rounded-full p-1.5 text-ink-faint hover:bg-white/5 hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="space-y-3">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          <Chip
            active={categoria === "todas"}
            onClick={() => setCategoria("todas")}
          >
            Todas las categorías
          </Chip>
          {categorias.map((c) => (
            <Chip
              key={c}
              active={categoria === c}
              onClick={() => setCategoria((p) => (p === c ? "todas" : c))}
            >
              {c}
            </Chip>
          ))}
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          <Chip
            active={ambiente === "todos"}
            onClick={() => setAmbiente("todos")}
          >
            Cualquier ambiente
          </Chip>
          {ambientesCatalogo.map((a) => (
            <Chip
              key={a}
              active={ambiente === a}
              onClick={() => setAmbiente((p) => (p === a ? "todos" : a))}
            >
              {a}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        <span className="font-semibold text-ink">{results.length}</span>{" "}
        {results.length === 1 ? "producto" : "productos"}
      </p>

      {results.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-line bg-bg-raised p-10 text-center text-sm text-ink-soft">
          No hay productos para esa combinación.
        </div>
      ) : (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Índice de fichas técnicas (§7.5) */}
      <section className="mt-16 rounded-2xl border border-line bg-bg-raised p-5">
        <h2 className="font-display text-lg text-ink">
          Fichas técnicas para descargar
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Todas las especificaciones en PDF, también disponibles dentro de cada
          ficha de producto.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {products.map((p) => (
            <li key={p.id}>
              <a
                href={p.fichaTecnica}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink-soft transition-colors hover:border-white/25 hover:text-ink"
              >
                <span>{p.nombre}</span>
                <FileDown size={15} className="shrink-0 text-gold" />
              </a>
            </li>
          ))}
        </ul>
        <Link
          href="/simulador"
          className="mt-4 inline-block text-sm font-semibold text-gold hover:text-gold-soft"
        >
          ¿No sabes cuál elegir? Prueba el simulador →
        </Link>
      </section>
    </div>
  );
}
