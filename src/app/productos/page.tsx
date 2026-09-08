import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCatalog } from "@/components/productos/ProductCatalog";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Látex, selladores y pasta mural Ceresita. Filtra por ambiente y categoría, revisa la data técnica y descarga la ficha en PDF.",
};

export default function ProductosPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Productos
        </p>
        <h1 className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
          La pintura correcta para cada terminación
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Todas las líneas base agua de Ceresita, con la data técnica clara y la
          ficha en PDF a un clic.
        </p>
      </header>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="py-20 text-center text-sm text-ink-faint">
              Cargando catálogo…
            </div>
          }
        >
          <ProductCatalog />
        </Suspense>
      </div>
    </div>
  );
}
