import type { Metadata } from "next";
import {
  Droplets,
  ShieldCheck,
  Wind,
  Leaf,
  HeartHandshake,
} from "lucide-react";
import { HeritageBadge } from "@/components/ui/HeritageBadge";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Ceresita: pinturas base agua, sin metales pesados y con bajo olor. Tecnología BIO TECH antibacterial y antihongos. Colores que hacen bien desde 1933.",
};

const stats = [
  { valor: "1933", label: "Tradición que inspira" },
  { valor: "+1200", label: "Colores de tintometría" },
  { valor: "120+", label: "Puntos de venta" },
  { valor: "100%", label: "Fórmulas base agua" },
];

const valores = [
  {
    icon: Droplets,
    title: "Base agua",
    text: "Fórmulas base agua, fáciles de aplicar y de limpiar, con bajo impacto.",
  },
  {
    icon: ShieldCheck,
    title: "Sin metales pesados",
    text: "Composición pensada para el interior del hogar, sin plomo ni mercurio.",
  },
  {
    icon: Wind,
    title: "Bajo olor",
    text: "Puedes pintar y volver a habitar el ambiente el mismo día.",
  },
  {
    icon: Leaf,
    title: "Tecnología BIO TECH",
    text: "Protección antibacterial y antihongos en toda la línea de látex.",
  },
  {
    icon: HeartHandshake,
    title: "Segura para la familia",
    text: "Pensada para dormitorios, cuartos de niños y espacios compartidos.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Nosotros
            </p>
            <h1 className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
              Colores que hacen bien,
              <br />
              desde 1933<span className="text-gold">.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Llevamos casi un siglo fabricando pinturas y recubrimientos. Hoy
              nuestra propuesta es simple: fórmulas base agua, seguras para toda
              la familia, y un sistema de color que te ayuda a decidir antes de
              comprar.
            </p>
          </div>
          <div className="relative">
            <ImageSlot
              ratio="aspect-[4/3]"
              label="Imagen de marca"
              caption="Fábrica, equipo o archivo histórico de Ceresita"
            />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
              <HeritageBadge />
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-line bg-bg-raised p-4 text-center"
            >
              <p className="font-display text-2xl text-ink">{s.valor}</p>
              <p className="mt-1 text-xs text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-bg-raised">
        <div className="container-page py-16">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Nuestro compromiso
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valores.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-line bg-panel p-5"
              >
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
        </div>
      </section>

      <section className="container-page py-16">
        <blockquote className="mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
            “Tu casa se pinta una vez cada varios años. Que el color sea el
            correcto no debería ser cuestión de suerte.”
          </p>
          <footer className="mt-4 text-sm text-ink-soft">
            — El equipo de Ceresita Perú
          </footer>
        </blockquote>
      </section>

      <ContactSection />
    </>
  );
}
