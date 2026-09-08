import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Check, FileDown, MapPin } from "lucide-react";
import { products, getProduct } from "@/data/products";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ProductVisual } from "@/components/productos/ProductVisual";
import { ProductText } from "@/components/productos/ProductText";
import { ProductSeals } from "@/components/productos/ProductSeals";
import { ProductColorBar } from "@/components/productos/ProductColorBar";
import { ProductCard } from "@/components/productos/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.nombre,
    description: `${product.tagline}. ${product.descripcion.slice(0, 120)}`,
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = [
    ...products.filter((p) => p.id !== id && p.categoria === product.categoria),
    ...products.filter((p) => p.id !== id && p.categoria !== product.categoria),
  ].slice(0, 3);

  return (
    <div className="container-page py-10 md:py-14">
      <Link
        href="/productos"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
      >
        <ChevronLeft size={16} />
        Todos los productos
      </Link>

      {/* Hero */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div>
          <ProductVisual product={product} size="lg" />
          <div className="mt-3 grid grid-cols-3 gap-3">
            <ImageSlot ratio="aspect-square" label="Detalle" />
            <ImageSlot ratio="aspect-square" label="En ambiente" />
            <ImageSlot ratio="aspect-square" label="Textura" />
          </div>
        </div>

        <div>
          <span className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs font-medium text-ink-soft">
            {product.categoria}
          </span>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
            {product.nombre}
          </h1>
          <p className="mt-3 text-lg text-ink-soft">
            <ProductText id={product.id} field="tagline" />
          </p>

          <div className="mt-6">
            <ProductSeals product={product} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={product.fichaTecnica}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-on-gold transition-colors hover:bg-gold-soft"
            >
              <FileDown size={16} />
              Descargar ficha técnica
            </a>
            <Link
              href="/encuentranos"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-ink hover:bg-white/5"
            >
              <MapPin size={16} />
              Dónde comprar
            </Link>
          </div>
        </div>
      </div>

      {/* Descripción + atributos */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-display text-xl text-ink">Descripción</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            <ProductText id={product.id} field="descripcion" />
          </p>
          <p className="mt-3 text-xs text-ink-faint">
            Texto y tiempos de secado de demostración; se reemplazan por el copy
            y la ficha técnica oficiales.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-ink">Características</h2>
          <ul className="mt-3 space-y-2">
            {product.atributos.map((a) => (
              <li key={a} className="flex gap-2.5 text-sm text-ink-soft">
                <Check size={16} className="mt-0.5 shrink-0 text-mint" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Aplicación en ambiente */}
      <div className="mt-14">
        <ImageSlot
          ratio="aspect-[21/9]"
          label="Aplicación real"
          caption={`${product.nombre} aplicado en un ambiente`}
        />
      </div>

      {/* Color */}
      <div className="mt-14">
        <ProductColorBar />
      </div>

      {/* Relacionados */}
      <div className="mt-16">
        <h2 className="font-display text-xl text-ink">Otros productos</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
