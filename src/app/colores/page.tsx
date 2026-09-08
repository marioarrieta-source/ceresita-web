import type { Metadata } from "next";
import { Suspense } from "react";
import { colors } from "@/data/colors";
import { ModeTabs } from "@/components/colores/ModeTabs";
import { ColorExplorer } from "@/components/colores/ColorExplorer";
import { ColorWheel } from "@/components/colores/ColorWheel";

export const metadata: Metadata = {
  title: "Colores",
  description:
    "Explora la cartilla Millennium de Ceresita: 1488 colores reales para filtrar por familia y tono, y llevar al simulador.",
};

export default async function ColoresPage({
  searchParams,
}: {
  searchParams: Promise<{ modo?: string }>;
}) {
  const { modo } = await searchParams;
  const isRueda = modo === "crear" || modo === "rueda";

  return (
    <div className="container-page py-12 md:py-16">
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Explorador de colores
        </p>
        <h1 className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
          {colors.length.toLocaleString("es-PE")} colores para encontrar el tuyo
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          La cartilla Millennium de Ceresita, completa. Filtra por familia y tono,
          acércate al color exacto y llévalo al simulador o a los productos donde
          puedes pedirlo.
        </p>
      </header>

      <div className="mt-8">
        <ModeTabs active={isRueda ? "rueda" : "explorar"} />
      </div>

      <div className="mt-6">
        <Suspense
          fallback={
            <div className="py-20 text-center text-sm text-ink-faint">
              Cargando…
            </div>
          }
        >
          {isRueda ? <ColorWheel /> : <ColorExplorer />}
        </Suspense>
      </div>
    </div>
  );
}
