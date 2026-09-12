import Image from "next/image";
import Link from "next/link";

/*
  Franja "+1500 colores": diseño final aprobado por el cliente, con
  transparencia real (canal alfa nativo del archivo, no un recorte por
  color) para integrarse con el navy del sitio en vez de verse como una
  franja pegada encima. Se muestra tal cual — sin reconstrucción, sin
  animación — a todo el ancho, con su proporción intacta. Todo el bloque
  enlaza al catálogo de colores.

  `unoptimized`: el optimizador de Next re-codifica a WebP para el
  navegador y esa conversión aplasta la transparencia a negro opaco en
  estos archivos — se sirve el PNG original tal cual para conservar el
  alfa (ver commit "Volver +1500 colores transparente...").
*/
export function ColorMedallion() {
  return (
    <section className="w-full">
      <Link
        href="/colores"
        aria-label="Ver el catálogo de más de 1500 colores con sus nombres y códigos"
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold"
      >
        <Image
          src="/ceresita-1500-colores-banner.png"
          alt="+1500 colores disponibles en Ceresita"
          width={2171}
          height={724}
          priority
          unoptimized
          className="block h-auto w-full"
        />
      </Link>
    </section>
  );
}
