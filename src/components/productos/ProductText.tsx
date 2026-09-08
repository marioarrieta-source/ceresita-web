"use client";

import { useContent, productText } from "@/lib/content";

/*
  Muestra un texto de producto respetando los overrides del panel de contenido.
*/
export function ProductText({
  id,
  field,
  className,
}: {
  id: string;
  field: "tagline" | "descripcion";
  className?: string;
}) {
  const content = useContent();
  return <span className={className}>{productText(content, id, field)}</span>;
}
