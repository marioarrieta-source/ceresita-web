import Image from "next/image";
import Link from "next/link";

/*
  Franja "+1500 colores": tres PNG transparentes (provistos por el cliente)
  como capas independientes sobre el fondo navy del sitio — sin fondo propio,
  sin animación, sin reconstrucción. La placa va encima de los laterales
  mediante z-index. Todo el bloque es un único link al catálogo de colores.
*/
export function ColorMedallion() {
  return (
    <section className="relative h-[clamp(130px,14vw,220px)] w-full overflow-hidden bg-bg">
      <Link
        href="/colores"
        aria-label="Ver el catálogo de más de 1500 colores con sus nombres y códigos"
        className="absolute inset-0 block"
      >
        <Image
          src="/ceresita-colores-izquierda-desktop.png"
          alt=""
          width={1211}
          height={709}
          className="absolute left-0 top-1/2 h-[clamp(95px,13vw,200px)] w-auto -translate-y-1/2"
          sizes="(min-width: 1024px) 32vw, 40vw"
        />
        <Image
          src="/ceresita-colores-derecha-desktop.png"
          alt=""
          width={1141}
          height={408}
          className="absolute right-0 top-1/2 h-[clamp(95px,13vw,200px)] w-auto -translate-y-1/2"
          sizes="(min-width: 1024px) 32vw, 40vw"
        />
        <Image
          src="/ceresita-placa-1500-colores.png"
          alt="+1500 colores disponibles en Ceresita"
          width={340}
          height={500}
          priority
          className="absolute left-1/2 top-1/2 z-10 h-[clamp(92px,12vw,175px)] w-auto -translate-x-1/2 -translate-y-1/2"
          sizes="(min-width: 1024px) 12vw, 25vw"
        />
      </Link>
    </section>
  );
}
