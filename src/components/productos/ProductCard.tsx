import Link from "next/link";
import { ArrowRight, Gauge, Home, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductVisual } from "@/components/productos/ProductVisual";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/productos/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors hover:border-white/20"
    >
      <ProductVisual product={product} className="rounded-none border-0" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg text-ink">{product.nombre}</h3>
        <p className="mt-1 text-sm text-ink-soft">{product.tagline}</p>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-ink-soft">
          <div className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-gold" />
            {product.acabado}
          </div>
          <div className="flex items-center gap-1.5">
            <Home size={13} className="text-gold" />
            {product.usos.join(" · ")}
          </div>
          <div className="col-span-2 flex items-center gap-1.5">
            <Gauge size={13} className="text-gold" />
            {product.rendimiento}
          </div>
        </dl>

        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold">
          Ver ficha
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
