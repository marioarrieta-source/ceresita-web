import Image from "next/image";
import Link from "next/link";

/*
  Franja "+1500 colores": imagen estática (public/mas-1500-colores.png,
  provista por el cliente) mostrada tal cual, sin recreación ni animación.
  Todo el bloque enlaza al catálogo de colores.
*/
export function ColorMedallion() {
  return (
    <section className="bg-black">
      <Link
        href="/colores"
        aria-label="Ver el catálogo de más de 1500 colores con sus nombres y códigos"
        className="block"
      >
        <Image
          src="/mas-1500-colores.png"
          alt="+1500 colores disponibles en Ceresita"
          width={1748}
          height={899}
          className="h-auto w-full"
          sizes="100vw"
        />
      </Link>
    </section>
  );
}
