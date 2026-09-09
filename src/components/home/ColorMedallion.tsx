import Image from "next/image";
import Link from "next/link";

/*
  Franja "+1500 colores": diseño final aprobado por el cliente. El archivo
  fuente venía con fondo blanco sólido (export de Canva, sin canal alfa);
  se le quitó el fondo por flood-fill del blanco conectado al borde
  (conservando los brillos internos de la placa y los reflejos de cada
  lámina, que no tocan el borde) para que se integre sobre el navy del
  sitio en vez de verse como una foto pegada encima. Sin reconstrucción
  del diseño ni animación — a todo el ancho, con su proporción intacta.
  Todo el bloque enlaza al catálogo de colores.

  `unoptimized`: el optimizador de Next re-codifica a WebP para el
  navegador y esa conversión aplasta la transparencia a negro opaco en
  este archivo (confirmado comparando la respuesta con y sin negociación
  de formato) — se sirve el PNG original tal cual para conservar el alfa.
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
          width={1405}
          height={343}
          priority
          unoptimized
          className="block h-auto w-full"
        />
      </Link>
    </section>
  );
}
