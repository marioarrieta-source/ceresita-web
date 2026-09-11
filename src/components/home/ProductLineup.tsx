import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { products } from "@/data/products";

const lineupIds = [
  "latex-satinado-premium",
  "latex-satinado",
  "ambientes-y-fachada",
  "latex-extracubriente",
  "latex-experto",
];

/*
  Comparativa horizontal de las 5 líneas de látex, inspirada en la
  página de AirPods de Apple: cada línea con su foto, nombre, tagline
  y atributos clave, una al lado de otra para comparar de un vistazo.
*/
export function ProductLineup() {
  const lineup = lineupIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="border-y border-line bg-bg-raised">
      <div className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Nuestras líneas de látex
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Compara y elige tu línea Ceresita
          </h2>
          <p className="mt-3 text-ink-soft">
            Todas base agua, bajo olor y con tecnología BIO TECH
            antibacterial y antihongos.
          </p>
        </div>

        <div className="mt-12 -mx-5 flex snap-x gap-6 overflow-x-auto px-5 pb-4 scrollbar-none md:mx-0 md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-12 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5">
          {lineup.map((product) => (
            <Link
              key={product.id}
              href={`/productos/${product.id}`}
              className="group flex w-64 shrink-0 snap-start flex-col items-center rounded-2xl bg-panel/40 p-4 text-center transition-colors hover:bg-panel md:w-auto md:shrink md:bg-transparent md:p-0 md:hover:bg-transparent"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                {product.destacado ? "Destacado" : " "}
              </span>

              <div className="relative mt-2 flex h-40 w-full items-center justify-center">
                {product.imagen && (
                  <Image
                    src={product.imagen}
                    alt={product.nombre}
                    width={220}
                    height={242}
                    unoptimized
                    className="h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transition-transform group-hover:-translate-y-1"
                  />
                )}
              </div>

              <h3 className="mt-5 font-display text-lg text-ink">
                {product.nombre}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {product.tagline}
              </p>

              <ul className="mt-4 space-y-1.5 text-left text-xs text-ink-soft">
                {product.atributos.slice(0, 2).map((atributo) => (
                  <li key={atributo} className="flex items-start gap-1.5">
                    <Check size={13} className="mt-0.5 shrink-0 text-mint" />
                    {atributo}
                  </li>
                ))}
              </ul>

              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                Ver ficha
                <ArrowRight
                  size={14}
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
