import Link from "next/link";
import { MapPin, ArrowRight, Store } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stores } from "@/data/stores";

const ciudades = ["Lima", "Arequipa", "Trujillo", "Cusco"];

export function Coverage() {
  const distritos = Array.from(new Set(stores.map((s) => s.distrito)));

  return (
    <section className="container-page py-20">
      <div className="grid gap-10 rounded-3xl border border-line bg-panel p-8 md:grid-cols-2 md:p-12">
        <div>
          <SectionHeading
            eyebrow="Puntos de venta"
            title="Encuentra tu tienda más cercana"
            description="Tiendas propias, distribuidores y ferreterías asociadas. Elige el color acá y recógelo cerca de casa."
          />

          <div className="mt-6 flex flex-wrap gap-2">
            {ciudades.map((c, i) => (
              <span
                key={c}
                className={
                  i === 0
                    ? "rounded-full bg-gold px-3.5 py-1.5 text-xs font-semibold text-on-gold"
                    : "rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-ink-soft"
                }
              >
                {c}
              </span>
            ))}
          </div>

          <Link
            href="/encuentranos"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-soft"
          >
            Ver todos los puntos de venta
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="rounded-2xl border border-line bg-bg-raised p-5">
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <Store size={16} className="text-gold" />
            <span className="font-display text-lg text-ink">120+</span> puntos de
            venta a nivel nacional
          </p>
          <ul className="mt-4 divide-y divide-line">
            {stores.slice(0, 4).map((s) => (
              <li key={s.id} className="flex items-start gap-3 py-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <div className="text-sm">
                  <p className="font-medium text-ink">{s.nombre}</p>
                  <p className="text-ink-soft">
                    {s.direccion} — {s.distrito}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-ink-faint">
            {stores.length} sedes de demostración en {distritos.length} distritos
            de Lima y Callao.
          </p>
        </div>
      </div>
    </section>
  );
}
