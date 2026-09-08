import Link from "next/link";
import { ArrowRight, Droplets, Sun, PaintBucket } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/products";

const glow: Record<string, string> = {
  "latex-satinado-premium": "#1f5fc0",
  "latex-satinado": "#2ec9f7",
  "ambientes-y-fachada": "#f7b500",
};

export function FeaturedProducts() {
  const destacados = products.filter((p) => p.destacado).slice(0, 3);

  return (
    <section className="border-t border-line bg-bg-raised">
      <div className="container-page py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Nuestras líneas"
            title="La pintura correcta para cada terminación"
            description="Látex, selladores y pasta mural con la data técnica clara y la ficha en PDF a un clic."
          />
          <Link
            href="/productos"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold hover:text-gold-soft"
          >
            Ver catálogo completo
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {destacados.map((p) => (
            <Link
              key={p.id}
              href={`/productos/${p.id}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-white/20"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                style={{
                  background: `radial-gradient(circle, ${glow[p.id] ?? "#1f5fc0"} 0%, transparent 70%)`,
                }}
              />
              <div className="relative flex items-center justify-between">
                <span className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs font-medium text-ink-soft">
                  {p.categoria}
                </span>
                <PaintBucket size={22} className="text-ink-faint" />
              </div>

              <h3 className="relative mt-6 font-display text-xl text-ink">
                {p.nombre}
              </h3>
              <p className="relative mt-1 text-sm text-ink-soft">{p.tagline}</p>

              <dl className="relative mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-ink-soft">
                <div className="flex items-center gap-1.5">
                  <PaintBucket size={14} className="text-gold" />
                  {p.acabado}
                </div>
                <div className="flex items-center gap-1.5">
                  <Sun size={14} className="text-gold" />
                  {p.usos.join(" · ")}
                </div>
                <div className="col-span-2 flex items-center gap-1.5">
                  <Droplets size={14} className="text-gold" />
                  {p.rendimiento}
                </div>
              </dl>

              <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                Ver producto
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
