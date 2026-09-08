"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, Check, Copy, Heart, Wand2, PaintBucket } from "lucide-react";
import type { Color } from "@/data/colors";
import { familias } from "@/data/colors";
import { products } from "@/data/products";
import { readableText } from "@/lib/color";
import { useCeresita } from "@/lib/store";
import { cn } from "@/lib/cn";

const familiaLabel = (id: string) =>
  familias.find((f) => f.id === id)?.label ?? id;

export function ColorDetailModal({
  color,
  onClose,
}: {
  color: Color | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const setSelectedColor = useCeresita((s) => s.setSelectedColor);
  const guardados = useCeresita((s) => s.guardados);
  const toggleGuardado = useCeresita((s) => s.toggleGuardado);

  useEffect(() => {
    if (!color) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [color, onClose]);

  useEffect(() => setCopied(false), [color]);

  if (!color) return null;

  const saved = guardados.includes(color.id);
  const text = readableText(color.hex);
  const compatibles = products.filter((p) =>
    color.productosCompatibles.includes(p.id),
  );

  const goSimulador = () => {
    setSelectedColor({
      id: color.id,
      nombre: color.nombre,
      codigo: color.codigo,
      hex: color.hex,
    });
    router.push(`/simulador?color=${color.id}`);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de color ${color.nombre}`}
    >
      <div
        className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-line bg-bg-raised sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative flex h-44 flex-col justify-between p-5"
          style={{ backgroundColor: color.hex, color: text }}
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/15 backdrop-blur-0 hover:bg-black/25"
              style={{ color: text }}
            >
              <X size={18} />
            </button>
          </div>
          <div>
            <p className="font-display text-2xl leading-tight">{color.nombre}</p>
            <p className="text-sm opacity-80">{color.codigo}</p>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-ink-soft">
              Cartilla {color.cartilla}
            </span>
            <span className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-ink-soft">
              Familia {familiaLabel(color.familia)}
            </span>
            <span className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-ink-soft">
              Tono {color.tono}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(color.hex).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              });
            }}
            className="flex w-full items-center justify-between rounded-xl border border-line bg-bg px-4 py-3 text-sm hover:border-white/25"
          >
            <span className="font-mono uppercase text-ink">{color.hex}</span>
            <span className="inline-flex items-center gap-1.5 text-ink-soft">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copiado" : "Copiar"}
            </span>
          </button>

          <div className="grid gap-2">
            <button
              type="button"
              onClick={goSimulador}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold text-sm font-semibold text-on-gold transition-colors hover:bg-gold-soft"
            >
              <Wand2 size={16} />
              Probar en el simulador
            </button>
            <div className="flex gap-2">
              <Link
                href={`/productos?color=${color.id}`}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 text-sm font-semibold text-ink hover:bg-white/5"
              >
                <PaintBucket size={15} />
                Productos compatibles
              </Link>
              <button
                type="button"
                onClick={() => toggleGuardado(color.id)}
                aria-pressed={saved}
                aria-label={saved ? "Quitar de guardados" : "Guardar color"}
                className={cn(
                  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors",
                  saved
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-white/20 text-ink-soft hover:bg-white/5",
                )}
              >
                <Heart size={16} fill={saved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Se aplica con
            </p>
            <div className="flex flex-wrap gap-2">
              {compatibles.map((p) => (
                <Link
                  key={p.id}
                  href={`/productos/${p.id}`}
                  className="rounded-lg border border-line bg-white/5 px-2.5 py-1.5 text-xs text-ink-soft hover:text-ink"
                >
                  {p.nombre}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
