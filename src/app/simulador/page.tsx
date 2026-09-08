import type { Metadata } from "next";
import { Suspense } from "react";
import { Simulador } from "@/components/simulador/Simulador";

export const metadata: Metadata = {
  title: "Simulador de pintado",
  description:
    "Elige un ambiente, aplica el color y calcula cuánta pintura Ceresita necesitas según el metraje de tu muro.",
};

export default function SimuladorPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Simulador de pintado
        </p>
        <h1 className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
          Mira el color en tu pared antes de comprar
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Elige un ambiente de prueba, aplica cualquier color del catálogo y
          calcula cuánta pintura necesitas. Si vienes desde el explorador, tu
          color ya está puesto.
        </p>
      </header>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="py-20 text-center text-sm text-ink-faint">
              Cargando simulador…
            </div>
          }
        >
          <Simulador />
        </Suspense>
      </div>

      <p className="mt-10 max-w-2xl text-xs text-ink-faint">
        Prototipo: las escenas son ilustraciones con la pared separada como capa.
        En producción se reemplazan por fotografías reales de ambientes con la
        pared enmascarada. La opción de subir una foto propia queda para fase 2.
      </p>
    </div>
  );
}
