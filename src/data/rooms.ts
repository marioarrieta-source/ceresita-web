/*
  Ambientes del simulador.

  El simulador recolorea la ZONA DE PARED de una imagen conservando su
  iluminación y textura (mezcla tipo "multiply"), que es la técnica de los
  visualizadores de pintura reales. Cada ambiente puede apuntar a una
  FOTOGRAFÍA real (`photo` + `mask` en /public/rooms/); si no hay foto, se
  usa una escena de referencia generada. El usuario también puede subir su
  propia foto y marcar la pared con el pincel.
*/

export type RoomId = "sala" | "dormitorio" | "cocina" | "fachada" | "propia";

export interface Room {
  id: RoomId;
  nombre: string;
  descripcion: string;
  uso: "Interior" | "Exterior";
  paredRef: { ancho: number; alto: number };
  /** rutas a la foto real y su máscara, cuando existan */
  photo?: string;
  mask?: string;
}

export const rooms: Room[] = [
  {
    id: "sala",
    nombre: "Sala",
    descripcion: "Muro principal detrás del sofá.",
    uso: "Interior",
    paredRef: { ancho: 4.2, alto: 2.6 },
  },
  {
    id: "dormitorio",
    nombre: "Dormitorio",
    descripcion: "Muro de cabecera.",
    uso: "Interior",
    paredRef: { ancho: 3.6, alto: 2.5 },
  },
  {
    id: "cocina",
    nombre: "Cocina",
    descripcion: "Muro entre alacenas.",
    uso: "Interior",
    paredRef: { ancho: 3.0, alto: 2.5 },
  },
  {
    id: "fachada",
    nombre: "Fachada",
    descripcion: "Frente de la casa.",
    uso: "Exterior",
    paredRef: { ancho: 8.0, alto: 3.0 },
  },
];

export const uploadRoom: Room = {
  id: "propia",
  nombre: "Mi foto",
  descripcion: "Sube una foto de tu espacio y marca la pared.",
  uso: "Interior",
  paredRef: { ancho: 3.5, alto: 2.5 },
};

export const getRoom = (id: string): Room | undefined =>
  [...rooms, uploadRoom].find((r) => r.id === id);
