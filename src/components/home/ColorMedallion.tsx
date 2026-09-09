import Image from "next/image";
import Link from "next/link";

/*
  Franja "+1500 colores": diseño final aprobado por el cliente, una sola
  imagen (public/ceresita-1500-colores-banner.png, fondo negro propio,
  sin transparencia). Se muestra tal cual — sin reconstrucción, sin
  animación — a todo el ancho, con su proporción intacta. Todo el bloque
  enlaza al catálogo de colores.
*/
export function ColorMedallion() {
  return (
    <section className="w-full bg-black">
      <Link
        href="/colores"
        aria-label="Ver el catálogo de más de 1500 colores con sus nombres y códigos"
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold"
      >
        <Image
          src="/ceresita-1500-colores-banner.png"
          alt="+1500 colores disponibles en Ceresita"
          width={2164}
          height={530}
          priority
          className="block h-auto w-full"
          sizes="100vw"
        />
      </Link>
    </section>
  );
}
