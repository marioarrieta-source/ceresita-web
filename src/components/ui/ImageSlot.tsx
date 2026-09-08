import type { ReactNode } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/*
  Espacio reservado para fotografía real. Marca claramente dónde va cada
  imagen y deja el layout ya dimensionado para recibirla.
*/
export function ImageSlot({
  label = "Espacio para fotografía",
  caption,
  ratio = "aspect-[4/3]",
  className,
  overlayColor,
  children,
  tint = "brand",
}: {
  label?: string;
  caption?: ReactNode;
  ratio?: string;
  className?: string;
  /** Aplica un lavado de color encima (para el simulador) */
  overlayColor?: string;
  children?: ReactNode;
  tint?: "brand" | "plain";
}) {
  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line",
        ratio,
        className,
      )}
    >
      {/* Fondo */}
      <div
        className={cn(
          "absolute inset-0",
          tint === "brand"
            ? "bg-[radial-gradient(120%_120%_at_15%_10%,#16294f_0%,#0c1730_55%,#0a1226_100%)]"
            : "bg-bg-raised",
        )}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.15]"
        aria-hidden
      >
        <defs>
          <pattern
            id="hatch"
            width="14"
            height="14"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="14" stroke="#8494b0" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hatch)" />
      </svg>

      {overlayColor && (
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ backgroundColor: overlayColor, opacity: 0.82 }}
        />
      )}

      {children}

      {/* Rótulo */}
      {!children && (
        <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-ink-soft ring-1 ring-white/15">
            <ImageIcon size={18} />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            {label}
          </span>
          {caption && (
            <span className="max-w-[85%] text-xs leading-snug text-ink-faint">
              {caption}
            </span>
          )}
          <span className="mt-1 text-[10px] uppercase tracking-wider text-ink-faint/70">
            Espacio para fotografía
          </span>
        </figcaption>
      )}
    </figure>
  );
}
