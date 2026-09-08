"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Lock,
  LogOut,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  ExternalLink,
} from "lucide-react";
import {
  defaultContent,
  loadContent,
  saveContent,
  resetContent,
  productText,
  type SiteContent,
} from "@/lib/content";
import { products } from "@/data/products";
import { colors, familias } from "@/data/colors";
import type { Store, StoreTipo } from "@/data/stores";
import { cn } from "@/lib/cn";

const ADMIN_PASS = "ceresita2025";
const SESSION_KEY = "ceresita-admin";
const TIPOS: StoreTipo[] = [
  "Tienda propia",
  "Distribuidor",
  "Ferretería asociada",
];

const field =
  "w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-white/35";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-bg-raised p-5">
      <h2 className="font-display text-lg text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function AdminApp() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
    } catch {
      /* noop */
    }
    setContent(loadContent());
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === ADMIN_PASS) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* noop */
      }
      setAuthed(true);
      setErr(false);
    } else {
      setErr(true);
    }
  };

  const persist = (next: SiteContent) => {
    setContent(next);
    saveContent(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const setStore = (i: number, patch: Partial<Store>) => {
    const stores = content.stores.map((s, idx) =>
      idx === i ? { ...s, ...patch } : s,
    );
    persist({ ...content, stores });
  };
  const addStore = () => {
    const s: Store = {
      id: `nuevo-${Date.now()}`,
      nombre: "Nuevo punto de venta",
      ciudad: "Lima",
      distrito: "",
      direccion: "",
      telefono: "",
      tipo: "Distribuidor",
      mapPos: { x: 105, y: 378 },
    };
    persist({ ...content, stores: [...content.stores, s] });
  };
  const removeStore = (i: number) =>
    persist({ ...content, stores: content.stores.filter((_, idx) => idx !== i) });

  const setProducto = (
    id: string,
    patch: { tagline?: string; descripcion?: string },
  ) =>
    persist({
      ...content,
      productos: {
        ...content.productos,
        [id]: { ...content.productos[id], ...patch },
      },
    });

  /* --------------------------------------------------------------------- */

  if (!authed) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg p-6">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl border border-line bg-bg-raised p-6"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-gold ring-1 ring-line">
            <Lock size={20} />
          </span>
          <h1 className="mt-4 font-display text-xl text-ink">
            Panel de contenido
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Acceso restringido al equipo de Ceresita.
          </p>
          <input
            type="password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setErr(false);
            }}
            placeholder="Contraseña"
            autoFocus
            className={cn(field, "mt-4")}
          />
          {err && (
            <p className="mt-2 text-xs text-brand">Contraseña incorrecta.</p>
          )}
          <button
            type="submit"
            className="mt-4 h-11 w-full rounded-full bg-gold text-sm font-semibold text-on-gold hover:bg-gold-soft"
          >
            Ingresar
          </button>
          <Link
            href="/"
            className="mt-3 block text-center text-xs text-ink-faint hover:text-ink"
          >
            Volver al sitio
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-auto bg-bg">
      <header className="sticky top-0 z-10 border-b border-line bg-bg/95">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg text-ink">
              Ceresita · Contenido
            </span>
            {saved && (
              <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-2.5 py-1 text-xs font-medium text-mint">
                <Check size={13} />
                Guardado
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-white/5"
            >
              Ver sitio
              <ExternalLink size={13} />
            </Link>
            <button
              type="button"
              onClick={() => {
                if (confirm("¿Restablecer todo el contenido a los valores por defecto?")) {
                  resetContent();
                  setContent(defaultContent);
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-white/5"
            >
              <RotateCcw size={13} />
              Restablecer
            </button>
            <button
              type="button"
              onClick={() => {
                try {
                  sessionStorage.removeItem(SESSION_KEY);
                } catch {
                  /* noop */
                }
                setAuthed(false);
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-ink-soft hover:text-ink"
            >
              <LogOut size={13} />
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-6 px-5 py-8">
        <p className="text-sm text-ink-soft">
          Los cambios se guardan en este navegador y se ven de inmediato en el
          sitio. En producción esto se conecta al CMS de Ceresita.
        </p>

        {/* Inicio */}
        <Section title="Textos de Inicio">
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Etiqueta superior
              <input
                className={cn(field, "mt-1")}
                value={content.home.heroEyebrow}
                onChange={(e) =>
                  persist({
                    ...content,
                    home: { ...content.home, heroEyebrow: e.target.value },
                  })
                }
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-faint">
                Título — línea 1
                <input
                  className={cn(field, "mt-1")}
                  value={content.home.heroTitleLine1}
                  onChange={(e) =>
                    persist({
                      ...content,
                      home: { ...content.home, heroTitleLine1: e.target.value },
                    })
                  }
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-faint">
                Título — línea 2
                <input
                  className={cn(field, "mt-1")}
                  value={content.home.heroTitleLine2}
                  onChange={(e) =>
                    persist({
                      ...content,
                      home: { ...content.home, heroTitleLine2: e.target.value },
                    })
                  }
                />
              </label>
            </div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Bajada
              <textarea
                rows={3}
                className={cn(field, "mt-1")}
                value={content.home.heroSubtitle}
                onChange={(e) =>
                  persist({
                    ...content,
                    home: { ...content.home, heroSubtitle: e.target.value },
                  })
                }
              />
            </label>
          </div>
        </Section>

        {/* Puntos de venta */}
        <Section title={`Puntos de venta (${content.stores.length})`}>
          <div className="space-y-4">
            {content.stores.map((s, i) => (
              <div
                key={s.id}
                className="rounded-xl border border-line bg-bg p-3"
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    className={field}
                    value={s.nombre}
                    placeholder="Nombre"
                    onChange={(e) => setStore(i, { nombre: e.target.value })}
                  />
                  <select
                    className={field}
                    value={s.tipo}
                    onChange={(e) =>
                      setStore(i, { tipo: e.target.value as StoreTipo })
                    }
                  >
                    {TIPOS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <input
                    className={field}
                    value={s.ciudad}
                    placeholder="Ciudad"
                    onChange={(e) => setStore(i, { ciudad: e.target.value })}
                  />
                  <input
                    className={field}
                    value={s.distrito}
                    placeholder="Distrito"
                    onChange={(e) => setStore(i, { distrito: e.target.value })}
                  />
                  <input
                    className={field}
                    value={s.direccion}
                    placeholder="Dirección"
                    onChange={(e) => setStore(i, { direccion: e.target.value })}
                  />
                  <input
                    className={field}
                    value={s.telefono}
                    placeholder="Teléfono"
                    onChange={(e) => setStore(i, { telefono: e.target.value })}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeStore(i)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-ink-faint hover:text-brand"
                >
                  <Trash2 size={13} />
                  Eliminar
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStore}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-ink hover:bg-white/5"
            >
              <Plus size={15} />
              Agregar punto de venta
            </button>
          </div>
        </Section>

        {/* Productos */}
        <Section title="Textos de producto">
          <div className="space-y-4">
            {products.map((p) => (
              <div key={p.id} className="rounded-xl border border-line bg-bg p-3">
                <p className="text-sm font-semibold text-ink">{p.nombre}</p>
                <input
                  className={cn(field, "mt-2")}
                  value={productText(content, p.id, "tagline")}
                  onChange={(e) =>
                    setProducto(p.id, { tagline: e.target.value })
                  }
                />
                <textarea
                  rows={3}
                  className={cn(field, "mt-2")}
                  value={productText(content, p.id, "descripcion")}
                  onChange={(e) =>
                    setProducto(p.id, { descripcion: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Colores */}
        <Section title="Catálogo de colores">
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-ink">
              {colors.length.toLocaleString("es-PE")}
            </span>{" "}
            colores sincronizados desde la tintometría (cartilla Millennium).
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {familias.map((f) => (
              <span
                key={f.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-ink-soft"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: f.muestra }}
                />
                {f.label} {colors.filter((c) => c.familia === f.id).length}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => alert("Sincronización con la tintometría: disponible al conectar el sistema real de Ceresita.")}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-ink hover:bg-white/5"
          >
            <RotateCcw size={14} />
            Sincronizar ahora
          </button>
        </Section>
      </div>
    </div>
  );
}
