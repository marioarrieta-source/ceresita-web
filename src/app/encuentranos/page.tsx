import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { StoreLocator } from "@/components/encuentranos/StoreLocator";

export const metadata: Metadata = {
  title: "Encuéntranos",
  description:
    "Tiendas propias, distribuidores y ferreterías asociadas de Ceresita en todo el Perú. Filtra por ciudad y distrito.",
};

export default function EncuentranosPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Encuéntranos
        </p>
        <h1 className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
          Encuentra tu tienda más cercana
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Elige tu color en la web y recógelo cerca de casa. Tiendas propias,
          distribuidores y ferreterías asociadas en todo el país.
        </p>
      </header>

      <ImageSlot
        ratio="aspect-[21/9]"
        className="mt-8"
        label="Foto de tienda"
        caption="Fachada o interior de un punto de venta Ceresita"
      />

      <div className="mt-12">
        <StoreLocator />
      </div>

      <div className="mt-14 rounded-2xl border border-line bg-bg-raised p-6 text-sm text-ink-soft">
        ¿Eres ferretería o distribuidor y quieres vender Ceresita?{" "}
        <Link
          href="/nosotros#contacto"
          className="font-semibold text-gold hover:text-gold-soft"
        >
          Escríbenos
        </Link>
        .
        <span className="mt-2 block text-xs text-ink-faint">
          Puntos de venta de demostración. Se reemplazan por la red real de
          distribuidores; el mapa se integrará con Google Maps.
        </span>
      </div>
    </div>
  );
}
