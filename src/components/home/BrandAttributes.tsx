import { Timer, Wind, ShieldCheck, Layers, Leaf } from "lucide-react";
import { ImageSlot } from "@/components/ui/ImageSlot";

const attrs = [
  {
    icon: Timer,
    title: "Secado rápido",
    text: "Repinta en pocas horas y termina tu proyecto el mismo día.",
  },
  {
    icon: Wind,
    title: "Bajo olor",
    text: "Fórmula base agua, cómoda de aplicar en ambientes cerrados.",
  },
  {
    icon: ShieldCheck,
    title: "Segura para la familia",
    text: "Sin metales pesados. Pensada para dormitorios y espacios de niños.",
  },
  {
    icon: Layers,
    title: "Buen poder cubritivo",
    text: "Cubre parejo en menos manos y rinde más por litro.",
  },
];

export function BrandAttributes() {
  return (
    <section className="border-y border-line bg-bg-raised">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <ImageSlot
          ratio="aspect-[4/3] lg:aspect-[3/4]"
          label="Detalle de producto"
          caption="Foto de la lata / aplicación en primer plano"
        />

        <div>
          <div className="grid gap-8 sm:grid-cols-2">
            {attrs.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-gold ring-1 ring-line">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-mint/20 bg-mint/10 px-5 py-4 text-sm text-mint">
            <Leaf size={18} className="shrink-0" />
            <p>
              <span className="font-semibold text-mint">
                Tecnología BIO TECH:
              </span>{" "}
              protección antibacterial y antihongos en toda la línea de látex.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
