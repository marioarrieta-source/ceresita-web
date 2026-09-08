import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ComingSoon({
  titulo,
  descripcion,
  puntos,
}: {
  titulo: string;
  descripcion: string;
  puntos: string[];
}) {
  return (
    <div className="container-page py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Módulo en construcción
        </p>
        <h1 className="font-display text-4xl leading-tight text-ink">{titulo}</h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {descripcion}
        </p>

        <ul className="mx-auto mt-8 max-w-md space-y-2 text-left text-sm text-ink-soft">
          {puntos.map((p) => (
            <li
              key={p}
              className="flex gap-2 rounded-xl border border-line bg-panel px-4 py-3"
            >
              <span className="text-gold">→</span>
              {p}
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-soft"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
