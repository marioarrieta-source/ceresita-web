"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/cn";

/*
  Comparador "antes / después" arrastrable: dos fotos del mismo ambiente
  (misma toma, sin pintar / pintado) superpuestas, con la de "antes"
  recortada por un clip-path según la posición del divisor. Sin
  librerías externas — clip-path + eventos de puntero.
*/
export function BeforeAfterSlider({ className }: { className?: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative aspect-[4/3] w-full touch-none select-none overflow-hidden md:aspect-auto md:h-full",
        className,
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerLeave={() => {
        dragging.current = false;
      }}
    >
      {/* Después (base, siempre visible) */}
      <Image
        src="/antes-despues-despues.jpg"
        alt="Ambiente ya pintado, acabado final"
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="pointer-events-none object-cover"
        priority
      />

      {/* Antes (recortada por el divisor) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src="/antes-despues-antes.jpg"
          alt="Mismo ambiente sin pintar"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-bg/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink backdrop-blur-sm">
        Antes
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-gold">
        Después
      </span>

      {/* Divisor */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
        style={{ left: `${pos}%` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Deslizar para comparar antes y después"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-bg shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)] outline-none ring-gold focus-visible:ring-2"
        style={{ left: `${pos}%` }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
          if (e.key === "Home") setPos(0);
          if (e.key === "End") setPos(100);
        }}
      >
        <ArrowLeftRight size={16} />
      </div>
    </div>
  );
}
