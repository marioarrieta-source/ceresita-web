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
    <section className="relative h-[clamp(190px,14vw,225px)] w-full overflow-hidden bg-bg p-0">
      <Link
        href="/colores"
        aria-label="Ver el catálogo de más de 1500 colores con sus nombres y códigos"
        className="absolute inset-0 block"
      >
        {/* Ancladas cerca del centro (la punta violeta entra bajo la placa) y
            se expanden hacia afuera; el contenedor recorta el sobrante. */}
        <Image
          src="/ceresita-colores-izquierda-desktop.png"
          alt=""
          width={1211}
          height={709}
          className="absolute top-1/2 right-[calc(50%-55px)] z-[1] h-auto w-[clamp(900px,58vw,1200px)] max-w-none -translate-y-1/2 object-contain"
        />
        <Image
          src="/ceresita-colores-derecha-desktop.png"
          alt=""
          width={1141}
          height={408}
          className="absolute top-1/2 left-[calc(50%-55px)] z-[1] h-auto w-[clamp(900px,58vw,1200px)] max-w-none -translate-y-1/2 object-contain"
        />
        <Image
          src="/ceresita-placa-1500-colores.png"
          alt="+1500 colores disponibles en Ceresita"
          width={340}
          height={500}
          priority
          className="absolute left-1/2 top-1/2 z-[3] h-[clamp(150px,11vw,175px)] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
        />
      </Link>
    </section>
  );
}
