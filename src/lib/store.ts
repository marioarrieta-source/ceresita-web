"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/*
  Estado global mínimo. Su función principal: que el color elegido en el
  explorador viaje al simulador y a las fichas de producto (brief §10).
*/

export interface SelectedColor {
  id: string;
  nombre: string;
  codigo: string;
  hex: string;
}

export interface SavedPalette {
  id: string;
  nombre: string;
  colorIds: string[];
  ts: number;
}

interface CeresitaState {
  /** Color activo, elegido desde el explorador o una ficha */
  selectedColor: SelectedColor | null;
  setSelectedColor: (color: SelectedColor | null) => void;

  /** Paletas guardadas por el usuario, sólo en este navegador */
  paletas: SavedPalette[];
  savePaleta: (p: Omit<SavedPalette, "ts">) => void;
  removePaleta: (id: string) => void;

  /** Colores guardados por el usuario (favoritos), sólo en este navegador */
  guardados: string[]; // color ids
  toggleGuardado: (id: string) => void;
}

export const useCeresita = create<CeresitaState>()(
  persist(
    (set, get) => ({
      selectedColor: null,
      setSelectedColor: (color) => set({ selectedColor: color }),

      paletas: [],
      savePaleta: (p) => {
        const rest = get().paletas.filter((x) => x.id !== p.id);
        set({ paletas: [{ ...p, ts: Date.now() }, ...rest].slice(0, 24) });
      },
      removePaleta: (id) =>
        set({ paletas: get().paletas.filter((x) => x.id !== id) }),

      guardados: [],
      toggleGuardado: (id) => {
        const cur = get().guardados;
        set({
          guardados: cur.includes(id)
            ? cur.filter((x) => x !== id)
            : [...cur, id],
        });
      },
    }),
    { name: "ceresita-prototipo" },
  ),
);
