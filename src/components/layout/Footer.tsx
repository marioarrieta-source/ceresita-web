import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-raised">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo withKicker />
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            {site.descripcion}
          </p>
          <p className="mt-4 font-display text-sm italic text-gold">
            Colores que hacen bien.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-ink-faint">
            Navegación
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink-soft transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-ink-faint">
            Contacto
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li>{site.direccion}</li>
            <li>{site.telefono}</li>
            <li>{site.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-1 py-5 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ceresita Perú. Prototipo de propuesta.</p>
          <p>
            Diseño y desarrollo:{" "}
            <span className="text-ink-soft">MCC Agency</span> · Datos de color de
            demostración.
          </p>
        </div>
      </div>
    </footer>
  );
}
