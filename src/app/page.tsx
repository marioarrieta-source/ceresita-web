import Link from "next/link";
import { ArrowRight, Wand2 } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ColorMedallion } from "@/components/home/ColorMedallion";
import { ProductLineup } from "@/components/home/ProductLineup";
import { ColorPreview } from "@/components/home/ColorPreview";
import { Inspiration } from "@/components/home/Inspiration";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Coverage } from "@/components/home/Coverage";
import { ImageSlot } from "@/components/ui/ImageSlot";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ColorMedallion />
      <ProductLineup />
      <ColorPreview />

      {/* Teaser del simulador / Color Studio */}
      <section className="container-page pb-4">
        <div className="relative grid overflow-hidden rounded-3xl border border-line bg-panel md:grid-cols-2">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(247,181,0,0.22) 0%, rgba(247,181,0,0) 70%)",
            }}
          />
          <div className="relative z-10 max-w-xl p-8 md:p-14">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              <Wand2 size={14} />
              Simulador de pintado
            </p>
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-[2.4rem]">
              Mira el color en tu pared antes de abrir el galón
            </h2>
            <p className="mt-4 text-ink-soft">
              Elige un ambiente, aplica el color y calcula cuánta pintura
              necesitas según los metros de tu muro.
            </p>
            <Link
              href="/simulador"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-on-gold transition-colors hover:bg-gold-soft"
            >
              Abrir el simulador
              <ArrowRight size={17} />
            </Link>
            <div className="mt-8 h-1.5 w-full rounded-full spectrum-bar opacity-90" />
          </div>
          <ImageSlot
            ratio="aspect-[4/3] md:aspect-auto"
            label="Antes / después"
            caption="Foto del mismo ambiente sin pintar y pintado"
            className="rounded-none border-0 md:border-l md:border-line"
          />
        </div>
      </section>

      <Inspiration />
      <FeaturedProducts />
      <Coverage />

      {/* Contacto — banda compacta (el formulario completo vive en Nosotros) */}
      <section className="container-page py-16">
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-line bg-bg-raised p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              ¿Un proyecto grande o una consulta técnica?
            </h2>
            <p className="mt-2 text-ink-soft">
              Escríbenos y un asesor Ceresita te responde.
            </p>
          </div>
          <Link
            href="/nosotros#contacto"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-on-gold transition-colors hover:bg-gold-soft"
          >
            Contáctanos
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
