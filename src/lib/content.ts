"use client";

import { useEffect, useState } from "react";
import { stores as defaultStores, type Store } from "@/data/stores";
import { products as defaultProducts } from "@/data/products";

/*
  "CMS" de demostración. Persiste overrides de contenido en localStorage y el
  sitio público los lee con useContent(). En producción esto se reemplaza por
  un CMS headless o el backend de Ceresita.
*/

const KEY = "ceresita-cms";

export interface HomeContent {
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
}

export interface SiteContent {
  home: HomeContent;
  stores: Store[];
  /** overrides de textos de producto por id */
  productos: Record<string, { tagline?: string; descripcion?: string }>;
}

export const defaultContent: SiteContent = {
  home: {
    heroEyebrow: "Tintometría Ceresita · 1488 colores de la cartilla Millennium",
    heroTitleLine1: "El color que buscas,",
    heroTitleLine2: "desde 1933",
    heroSubtitle:
      "Explora la paleta completa, arma combinaciones que funcionan y pruébalas sobre un ambiente real antes de comprar. Pinturas base agua, bajo olor y seguras para toda la familia.",
  },
  stores: defaultStores,
  productos: {},
};

export function loadContent(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return {
      home: { ...defaultContent.home, ...parsed.home },
      stores:
        Array.isArray(parsed.stores) && parsed.stores.length
          ? parsed.stores
          : defaultContent.stores,
      productos: parsed.productos ?? {},
    };
  } catch {
    return defaultContent;
  }
}

export function saveContent(next: SiteContent): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("ceresita-cms-change"));
  } catch {
    /* almacenamiento no disponible */
  }
}

export function resetContent(): void {
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("ceresita-cms-change"));
  } catch {
    /* noop */
  }
}

export function productText(
  content: SiteContent,
  id: string,
  field: "tagline" | "descripcion",
): string {
  const override = content.productos[id]?.[field];
  if (override && override.trim()) return override;
  const p = defaultProducts.find((x) => x.id === id);
  return p ? p[field] : "";
}

export function useContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    const sync = () => setContent(loadContent());
    sync();
    window.addEventListener("ceresita-cms-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("ceresita-cms-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return content;
}
