import { cn } from "@/lib/cn";

/* Placa "DESDE 1933" inspirada en el sello de marca */
export function HeritageBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center rounded-lg bg-linear-to-b from-white to-[#c9ced8] px-3 py-1.5 text-center shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/60",
        className,
      )}
    >
      <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-navy/70">
        Desde
      </span>
      <span className="font-display text-xl font-black leading-none text-navy">
        1933
      </span>
      <span className="mt-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-navy/70">
        Tradición que inspira
      </span>
    </span>
  );
}
