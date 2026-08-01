import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

/*
  Карта сайта. Две страницы, поэтому обходимся без генерации из файловой
  системы: явный список честнее, его видно глазом и он не обрастает
  служебными маршрутами сам собой.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(SITE.updated);

  return [
    {
      url: `${SITE.origin}/`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.origin}/pro`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
