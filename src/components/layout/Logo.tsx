import Image from "next/image";
import { cn } from "@/lib/cn";

/*
  Logotipo oficial de Ceresita: recorte de la placa navy/oro con el wordmark
  (fondo transparente), se apoya directo sobre el fondo navy del sitio. El
  wordmark "PINTURAS" y el tagline del PNG original eran negros e ilegibles
  ahí, así que se recrean como texto para mantenerlos sin necesitar una
  placa clara detrás.
*/
export function Logo({
  className,
  withKicker = false,
}: {
  className?: string;
  withKicker?: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col items-start leading-none", className)}>
      {withKicker && (
        <span className="mb-1.5 pl-1 text-[0.6rem] font-semibold tracking-[0.42em] text-ink-soft">
          PINTURAS
        </span>
      )}
      <Image
        src="/logo-ceresita.png"
        alt="Pinturas Ceresita"
        width={1656}
        height={468}
        priority
        className={cn("w-auto", withKicker ? "h-16" : "h-10")}
      />
    </span>
  );
}
