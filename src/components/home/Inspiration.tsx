import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageSlot } from "@/components/ui/ImageSlot";

const tiles = [
  { caption: "Sala en tonos tierra", big: true },
  { caption: "Dormitorio sereno" },
  { caption: "Cocina con carácter" },
  { caption: "Fachada renovada" },
  { caption: "Detalle de muro y textura" },
  { caption: "Baño en verde salvia" },
];

export function Inspiration() {
  return (
    <section className="container-page py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Inspírate"
          title="Ideas de color para cada rincón"
          description="Paletas de temporada y ambientes reales para imaginar tu próximo proyecto. Cada foto lleva a los colores que la componen."
        />
        <Link
          href="/colores"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold hover:text-gold-soft"
        >
          Ver la galería completa
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t, i) => (
          <ImageSlot
            key={t.caption}
            ratio={t.big ? "aspect-[4/3] lg:aspect-auto" : "aspect-[4/3]"}
            className={t.big ? "lg:col-span-2 lg:row-span-2" : undefined}
            label={`Ambiente ${i + 1}`}
            caption={t.caption}
          />
        ))}
      </div>

    </section>
  );
}
