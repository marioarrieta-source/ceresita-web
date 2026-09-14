import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/colores`, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${siteUrl}/colores?modo=rueda`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    { url: `${siteUrl}/simulador`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/productos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/encuentranos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/nosotros`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/productos/${p.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
