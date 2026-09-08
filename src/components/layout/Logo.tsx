import Image from "next/image";
import { cn } from "@/lib/cn";

/*
  Logotipo oficial de Ceresita (PNG real, fondo transparente). El wordmark
  "PINTURAS" y el tagline son negros, por eso va sobre una placa clara para
  que se lea bien contra el fondo navy del sitio.
*/
export function Logo({
  className,
  withKicker = false,
}: {
  className?: string;
  withKicker?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[10px] bg-white shadow-[0_6px_20px_-8px_rgba(0,0,0,0.35)]",
        withKicker ? "px-4 py-2.5" : "px-2.5 py-1.5",
        className,
      )}
    >
      <Image
        src="/logo-ceresita.png"
        alt="Pinturas Ceresita — Colores que hacen bien"
        width={1672}
        height={693}
        priority
        className={cn("w-auto", withKicker ? "h-14" : "h-9")}
      />
    </span>
  );
}
