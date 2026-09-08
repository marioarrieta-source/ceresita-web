"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const field =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-white/35";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contacto" className="border-t border-line bg-bg-raised">
      <div className="container-page grid gap-10 py-20 md:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contacto"
            title="¿Un proyecto grande o una consulta técnica?"
            description="Escríbenos y un asesor Ceresita te responde. También puedes visitarnos en nuestra tienda central."
          />
          <dl className="mt-8 space-y-3 text-sm text-ink-soft">
            <div>
              <dt className="font-medium text-ink">Dirección</dt>
              <dd>{site.direccion}</dd>
            </div>
            <div>
              <dt className="font-medium text-ink">Teléfono</dt>
              <dd>{site.telefono}</dd>
            </div>
            <div>
              <dt className="font-medium text-ink">Correo</dt>
              <dd>{site.email}</dd>
            </div>
          </dl>
        </div>

        {sent ? (
          <div className="flex flex-col items-start justify-center rounded-2xl border border-line bg-panel p-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-mint/15 text-mint">
              <Check size={22} />
            </span>
            <h3 className="mt-4 font-display text-lg text-ink">
              ¡Gracias! Recibimos tu mensaje
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Un asesor te contactará dentro de las próximas 24 horas hábiles.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-5 text-sm font-semibold text-gold hover:text-gold-soft"
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-2xl border border-line bg-panel p-6 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1.5 block font-medium text-ink">Nombre</span>
                <input required className={field} placeholder="Tu nombre" />
              </label>
              <label className="text-sm">
                <span className="mb-1.5 block font-medium text-ink">Correo</span>
                <input
                  required
                  type="email"
                  className={field}
                  placeholder="tucorreo@ejemplo.com"
                />
              </label>
              <label className="text-sm sm:col-span-2">
                <span className="mb-1.5 block font-medium text-ink">
                  Teléfono
                </span>
                <input
                  className={field}
                  inputMode="tel"
                  placeholder="+51 999 999 999"
                />
              </label>
              <label className="text-sm sm:col-span-2">
                <span className="mb-1.5 block font-medium text-ink">Mensaje</span>
                <textarea
                  required
                  rows={4}
                  className={field}
                  placeholder="Cuéntanos sobre tu proyecto"
                />
              </label>
            </div>
            <Button type="submit" size="lg" className="mt-5 w-full sm:w-auto">
              Enviar mensaje
              <Send size={16} />
            </Button>
            <p className="mt-3 text-xs text-ink-faint">
              Prototipo: el formulario no envía datos reales.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
