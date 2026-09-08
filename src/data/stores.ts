/*
  Puntos de venta (placeholder para el prototipo).
  Se reemplaza por la red real de distribuidores de Ceresita Perú.
  mapPos: posición aproximada del pin en el mapa ilustrado (viewBox 0 0 400 600).
*/

export type StoreTipo =
  | "Tienda propia"
  | "Distribuidor"
  | "Ferretería asociada";

export interface Store {
  id: string;
  nombre: string;
  ciudad: string;
  distrito: string;
  direccion: string;
  telefono: string;
  tipo: StoreTipo;
  mapPos: { x: number; y: number };
}

export const stores: Store[] = [
  {
    id: "meiggs",
    nombre: "Ceresita Central",
    ciudad: "Lima",
    distrito: "Cercado de Lima",
    direccion: "Av. Enrique Meiggs 2925",
    telefono: "(01) 200 5000",
    tipo: "Tienda propia",
    mapPos: { x: 103, y: 372 },
  },
  {
    id: "surco",
    nombre: "Distribuidora ColorHogar",
    ciudad: "Lima",
    distrito: "Santiago de Surco",
    direccion: "Av. Caminos del Inca 1802",
    telefono: "(01) 271 4420",
    tipo: "Distribuidor",
    mapPos: { x: 110, y: 386 },
  },
  {
    id: "sanmiguel",
    nombre: "Ferretería El Maestro",
    ciudad: "Lima",
    distrito: "San Miguel",
    direccion: "Av. La Marina 2450",
    telefono: "(01) 452 8890",
    tipo: "Ferretería asociada",
    mapPos: { x: 96, y: 374 },
  },
  {
    id: "ate",
    nombre: "MegaColor Ate",
    ciudad: "Lima",
    distrito: "Ate",
    direccion: "Carretera Central Km 4.5",
    telefono: "(01) 351 2200",
    tipo: "Distribuidor",
    mapPos: { x: 120, y: 378 },
  },
  {
    id: "sjl",
    nombre: "Pinturas del Norte",
    ciudad: "Lima",
    distrito: "San Juan de Lurigancho",
    direccion: "Av. Próceres de la Independencia 1650",
    telefono: "(01) 388 7710",
    tipo: "Ferretería asociada",
    mapPos: { x: 114, y: 366 },
  },
  {
    id: "callao",
    nombre: "Distribuidora Bellavista",
    ciudad: "Callao",
    distrito: "Bellavista",
    direccion: "Av. Colonial 3120",
    telefono: "(01) 429 3350",
    tipo: "Distribuidor",
    mapPos: { x: 90, y: 380 },
  },
  {
    id: "arequipa",
    nombre: "ColorSur Arequipa",
    ciudad: "Arequipa",
    distrito: "Cercado",
    direccion: "Av. Ejército 710, Yanahuara",
    telefono: "(054) 25 6600",
    tipo: "Distribuidor",
    mapPos: { x: 168, y: 486 },
  },
  {
    id: "trujillo",
    nombre: "Ferretería La Libertad",
    ciudad: "Trujillo",
    distrito: "Cercado",
    direccion: "Av. España 1450",
    telefono: "(044) 29 4120",
    tipo: "Ferretería asociada",
    mapPos: { x: 104, y: 244 },
  },
  {
    id: "cusco",
    nombre: "Andina Pinturas",
    ciudad: "Cusco",
    distrito: "Wanchaq",
    direccion: "Av. de la Cultura 1201",
    telefono: "(084) 24 7730",
    tipo: "Distribuidor",
    mapPos: { x: 236, y: 430 },
  },
  {
    id: "piura",
    nombre: "Color Norte Piura",
    ciudad: "Piura",
    distrito: "Cercado",
    direccion: "Av. Sánchez Cerro 234",
    telefono: "(073) 30 8810",
    tipo: "Distribuidor",
    mapPos: { x: 96, y: 150 },
  },
];

export const storeCiudades = Array.from(new Set(stores.map((s) => s.ciudad)));

export function mapsUrl(s: Store): string {
  const q = encodeURIComponent(`${s.nombre}, ${s.direccion}, ${s.ciudad}, Perú`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
