import { cn } from "@/lib/cn";

/*
  Recreación del logotipo Ceresita para el prototipo (placa marino con borde
  dorado y wordmark blanco en itálica). Se reemplaza por el asset oficial en
  SVG cuando llegue la guía de marca (brief §11).
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
        <span className="mb-1 pl-1 text-[0.6rem] font-semibold tracking-[0.42em] text-ink-soft">
          PINTURAS
        </span>
      )}
      <span className="inline-block rounded-[11px] bg-gold p-[3px] shadow-[0_6px_20px_-8px_rgba(247,181,0,0.5)]">
        <span className="block rounded-[8px] bg-navy px-3 py-1">
          <span className="font-display text-2xl font-black italic tracking-tight text-white">
            Ceresita
          </span>
        </span>
      </span>
    </span>
  );
}
