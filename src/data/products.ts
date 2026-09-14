/*
  Catálogo de productos Ceresita Perú.
  Datos base tomados del anexo del brief (web actual ceresita.pe).
  Los tiempos de secado y las descripciones largas son placeholders redactados
  en tono de marca; se reemplazan por el copy y las fichas reales antes de lanzar.
*/

export type Categoria = "Látex" | "Sellador" | "Pasta";
export type Ambiente =
  | "Dormitorio"
  | "Sala"
  | "Cocina"
  | "Baño"
  | "Fachada"
  | "Cielo raso";
export type Aplicacion = "Brocha" | "Rodillo" | "Pistola" | "Espátula" | "Plancha";
export type Uso = "Interior" | "Exterior";

export interface Product {
  id: string;
  nombre: string;
  categoria: Categoria;
  tagline: string;
  rendimiento: string;
  usos: Uso[];
  aplicaciones: Aplicacion[];
  ambientes: Ambiente[];
  acabado: string;
  secadoAlTacto: string;
  secadoRepintado: string;
  descripcion: string;
  atributos: string[];
  fichaTecnica: string;
  /* Color de muestra para la tarjeta mientras no hay fotografía de producto */
  swatch: string;
  /* Foto real del balde en public/productos/, si existe */
  imagen?: string;
  destacado?: boolean;
}

export const products: Product[] = [
  {
    id: "latex-satinado-premium",
    nombre: "Látex Satinado Premium",
    categoria: "Látex",
    tagline: "Acabado satinado de alta gama para interiores y exteriores",
    rendimiento: "58 ± 5 m² / 4L / mano",
    usos: ["Interior", "Exterior"],
    aplicaciones: ["Brocha", "Rodillo"],
    ambientes: ["Dormitorio", "Sala", "Cocina", "Fachada"],
    acabado: "Satinado",
    secadoAlTacto: "30 – 60 min",
    secadoRepintado: "4 horas",
    descripcion:
      "Nuestra pintura látex de mayor desempeño. Base agua, sin metales pesados y con bajo olor, formulada con tecnología BIO TECH antibacterial y antihongos. Su acabado satinado premium resiste el lavado frecuente y realza el color con una terminación uniforme y elegante.",
    atributos: [
      "Tecnología BIO TECH antibacterial y antihongos",
      "Lavable y resistente al frote húmedo",
      "Excelente poder cubritivo",
      "Bajo olor · base agua",
    ],
    fichaTecnica:
      "https://ceresita.pe/sites/default/files/2026/ficha-tecnica/07/latex-satinado-premium_compressed.pdf",
    swatch: "#e8e2d6",
    imagen: "/productos/latex-satinado-premium.png",
    destacado: true,
  },
  {
    id: "latex-satinado",
    nombre: "Látex Satinado",
    categoria: "Látex",
    tagline: "El satinado versátil para toda la casa",
    rendimiento: "58 ± 5 m² / 4L / mano",
    usos: ["Interior", "Exterior"],
    aplicaciones: ["Brocha", "Rodillo", "Pistola"],
    ambientes: ["Dormitorio", "Sala", "Cocina", "Baño", "Fachada"],
    acabado: "Satinado",
    secadoAlTacto: "30 – 60 min",
    secadoRepintado: "4 horas",
    descripcion:
      "Pintura látex de acabado satinado para muros interiores y exteriores. Base agua, sin metales pesados y con bajo olor. Fácil de aplicar y de mantener, con buena resistencia a la humedad y a la limpieza cotidiana.",
    atributos: [
      "Acabado satinado uniforme",
      "Resistente a la humedad",
      "Fácil de limpiar",
      "Bajo olor · base agua",
    ],
    fichaTecnica:
      "https://ceresita.pe/sites/default/files/2026/ficha-tecnica/07/latex-satinado_compressed.pdf",
    swatch: "#dfe4e2",
    imagen: "/productos/latex-satinado.png",
    destacado: true,
  },
  {
    id: "ambientes-y-fachada",
    nombre: "Ambientes y Fachada",
    categoria: "Látex",
    tagline: "Acabado mate parejo para grandes superficies",
    rendimiento: "60 ± 5 m² / 4L / mano",
    usos: ["Interior", "Exterior"],
    aplicaciones: ["Brocha", "Rodillo", "Pistola"],
    ambientes: ["Sala", "Dormitorio", "Fachada", "Cielo raso"],
    acabado: "Mate",
    secadoAlTacto: "30 – 60 min",
    secadoRepintado: "4 horas",
    descripcion:
      "Látex de acabado mate con muy buen rendimiento por litro, pensado para pintar ambientes completos y fachadas. Base agua, bajo olor y sin metales pesados. Disimula imperfecciones del muro y entrega un color parejo de pared a pared.",
    atributos: [
      "Alto rendimiento por litro",
      "Acabado mate que disimula imperfecciones",
      "Interior y exterior",
      "Bajo olor · base agua",
    ],
    fichaTecnica:
      "https://ceresita.pe/sites/default/files/2026/ficha-tecnica/07/latex-ambientes-fachada_compressed.pdf",
    swatch: "#efe7dc",
    imagen: "/productos/ambientes-y-fachada.png",
    destacado: true,
  },
  {
    id: "latex-extracubriente",
    nombre: "Látex Extracubriente",
    categoria: "Látex",
    tagline: "Máxima cobertura, menos manos",
    rendimiento: "48 ± 5 m² / 4L / mano",
    usos: ["Interior", "Exterior"],
    aplicaciones: ["Brocha", "Rodillo", "Pistola"],
    ambientes: ["Sala", "Dormitorio", "Fachada"],
    acabado: "Mate",
    secadoAlTacto: "30 – 60 min",
    secadoRepintado: "4 horas",
    descripcion:
      "Formulada para cubrir en menos manos, incluso sobre colores intensos o muros parchados. Acabado mate, base agua y bajo olor. Ideal cuando se busca ahorrar tiempo de obra sin resignar terminación.",
    atributos: [
      "Cubre colores intensos en menos manos",
      "Ideal para repintado sobre tonos fuertes",
      "Acabado mate",
      "Bajo olor · base agua",
    ],
    fichaTecnica:
      "https://ceresita.pe/sites/default/files/2026/ficha-tecnica/07/latex-extracubriente_compressed.pdf",
    swatch: "#e6ddcf",
    imagen: "/productos/latex-extracubriente.png",
  },
  {
    id: "latex-experto",
    nombre: "Látex Experto",
    categoria: "Látex",
    tagline: "Rendimiento para proyectos de interior",
    rendimiento: "42 ± 5 m² / 4L / mano",
    usos: ["Interior"],
    aplicaciones: ["Brocha", "Rodillo", "Pistola"],
    ambientes: ["Dormitorio", "Sala", "Cielo raso"],
    acabado: "Mate",
    secadoAlTacto: "30 – 60 min",
    secadoRepintado: "4 horas",
    descripcion:
      "Látex mate de uso interior para quienes pintan seguido: buen balance entre precio y terminación. Base agua, bajo olor y sin metales pesados, seguro para dormitorios y espacios de la familia.",
    atributos: [
      "Pensado para uso interior",
      "Buena relación rendimiento / terminación",
      "Acabado mate",
      "Bajo olor · base agua",
    ],
    fichaTecnica:
      "https://ceresita.pe/sites/default/files/2026/ficha-tecnica/07/latex-experto_compressed.pdf",
    swatch: "#eae4d8",
    imagen: "/productos/latex-experto.png",
  },
  {
    id: "sellador-para-muros-250",
    nombre: "Sellador para Muros 250",
    categoria: "Sellador",
    tagline: "Prepara el muro y sella la porosidad",
    rendimiento: "25 ± 5 m² / gal / mano",
    usos: ["Interior", "Exterior"],
    aplicaciones: ["Brocha", "Rodillo"],
    ambientes: ["Sala", "Dormitorio", "Fachada"],
    acabado: "Satinado",
    secadoAlTacto: "1 hora",
    secadoRepintado: "4 horas",
    descripcion:
      "Sellador base agua que uniforma la absorción del muro antes de pintar, mejora la adherencia y optimiza el rendimiento de la pintura de terminación. Reduce el consumo de látex y ayuda a lograr un color más parejo.",
    atributos: [
      "Uniforma la absorción del muro",
      "Mejora adherencia de la terminación",
      "Optimiza el rendimiento del látex",
      "Base agua",
    ],
    fichaTecnica:
      "https://ceresita.pe/sites/default/files/2026/ficha-tecnica/07/sellador-muros-250_compressed.pdf",
    swatch: "#efe9de",
    imagen: "/productos/sellador-para-muros-250.png",
  },
  {
    id: "sellador-imprimante-acrilico",
    nombre: "Sellador Imprimante Acrílico",
    categoria: "Sellador",
    tagline: "Imprimación acrílica para superficies nuevas",
    rendimiento: "20 ± 5 m² / gal / mano",
    usos: ["Interior", "Exterior"],
    aplicaciones: ["Brocha", "Rodillo"],
    ambientes: ["Sala", "Dormitorio", "Fachada", "Cielo raso"],
    acabado: "Mate",
    secadoAlTacto: "1 hora",
    secadoRepintado: "4 horas",
    descripcion:
      "Imprimante acrílico base agua para sellar y anclar superficies nuevas o muy porosas antes de aplicar la pintura de terminación. Entrega una base estable y homogénea para el color final.",
    atributos: [
      "Sella superficies nuevas y porosas",
      "Base uniforme para la terminación",
      "Interior y exterior",
      "Base agua",
    ],
    fichaTecnica:
      "https://ceresita.pe/sites/default/files/2026/ficha-tecnica/07/sellador-imprimante-acrilico_compressed.pdf",
    swatch: "#ece6da",
    imagen: "/productos/sellador-imprimante-acrilico.png",
  },
  {
    id: "pasta-mural",
    nombre: "Pasta Mural",
    categoria: "Pasta",
    tagline: "Empaste para nivelar y corregir muros",
    rendimiento: "6 – 9 m² / gal / mano",
    usos: ["Interior", "Exterior"],
    aplicaciones: ["Plancha", "Espátula"],
    ambientes: ["Sala", "Dormitorio", "Fachada", "Cielo raso"],
    acabado: "Mate",
    secadoAlTacto: "2 – 3 horas",
    secadoRepintado: "8 horas",
    descripcion:
      "Pasta lista para usar que corrige imperfecciones, rellena fisuras finas y nivela el muro antes de pintar. Se lija con facilidad y deja una superficie tersa para recibir el sellador y la pintura de terminación.",
    atributos: [
      "Nivela y corrige imperfecciones",
      "Fácil de lijar",
      "Lista para usar",
      "Interior y exterior",
    ],
    fichaTecnica:
      "https://ceresita.pe/sites/default/files/2026/ficha-tecnica/07/pasta-mural_compressed.pdf",
    swatch: "#f0ebe1",
    imagen: "/productos/pasta-mural.png",
  },
  {
    id: "imprimante-para-muros",
    nombre: "Imprimante para Muros",
    categoria: "Sellador",
    tagline: "Fondo de alto rendimiento para el muro",
    rendimiento: "55 ± 5 m² / gal / mano",
    usos: ["Interior", "Exterior"],
    aplicaciones: ["Brocha", "Rodillo"],
    ambientes: ["Sala", "Dormitorio", "Fachada"],
    acabado: "Mate",
    secadoAlTacto: "1 hora",
    secadoRepintado: "4 horas",
    descripcion:
      "Imprimante base agua de alto rendimiento que prepara el muro, controla la absorción y mejora el anclaje de la pintura de terminación. Un buen fondo para que el color final rinda y dure más.",
    atributos: [
      "Alto rendimiento por galón",
      "Controla la absorción del muro",
      "Mejora la durabilidad del color",
      "Base agua",
    ],
    fichaTecnica:
      "https://ceresita.pe/sites/default/files/2026/ficha-tecnica/07/imprimante-para-muros.pdf",
    swatch: "#ede7dc",
    imagen: "/productos/imprimante-para-muros.png",
  },
];

export const categorias: Categoria[] = ["Látex", "Sellador", "Pasta"];
export const ambientesCatalogo: Ambiente[] = [
  "Dormitorio",
  "Sala",
  "Cocina",
  "Baño",
  "Fachada",
  "Cielo raso",
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
