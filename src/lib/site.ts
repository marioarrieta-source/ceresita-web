/*
  URL pública del sitio. En Vercel, `VERCEL_URL` se define automáticamente en
  cada deploy (preview o producción) sin protocolo, por eso se le antepone
  `https://`. En local (`npm run dev`) cae a localhost.
*/
export const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const site = {
  nombre: "Ceresita",
  pais: "Perú",
  descripcion:
    "Pinturas base agua, sin metales pesados y con bajo olor. Explora más de 1500 colores, imagínalos en tu espacio y encuentra dónde comprarlos.",
  direccion: "Av. Enrique Meiggs 2925, Lima",
  telefono: "(01) 200 5000",
  email: "contacto@ceresita.pe",
  instagram: "https://www.instagram.com/ceresita_pe/",
  instagramHandle: "@ceresita_pe",
};

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/colores", label: "Colores" },
  { href: "/simulador", label: "Simulador" },
  { href: "/productos", label: "Productos" },
  { href: "/encuentranos", label: "Encuéntranos" },
  { href: "/nosotros", label: "Nosotros" },
];
