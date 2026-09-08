import { Gauge, Home, Paintbrush, Sparkles, Timer } from "lucide-react";
import type { Product } from "@/data/products";

export function ProductSeals({ product }: { product: Product }) {
  const seals = [
    { icon: Gauge, label: "Rendimiento", value: product.rendimiento },
    { icon: Home, label: "Uso", value: product.usos.join(" · ") },
    {
      icon: Paintbrush,
      label: "Aplicación",
      value: product.aplicaciones.join(", "),
    },
    { icon: Sparkles, label: "Acabado", value: product.acabado },
    {
      icon: Timer,
      label: "Secado al tacto",
      value: product.secadoAlTacto,
    },
    {
      icon: Timer,
      label: "Repintado",
      value: product.secadoRepintado,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {seals.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="rounded-xl border border-line bg-bg-raised p-3"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gold ring-1 ring-line">
            <Icon size={17} />
          </span>
          <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
            {label}
          </p>
          <p className="text-sm font-medium text-ink">{value}</p>
        </div>
      ))}
    </div>
  );
}
