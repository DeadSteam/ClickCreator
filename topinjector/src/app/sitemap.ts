import type { MetadataRoute } from "next";

import { SITE_ORIGIN } from "@/site";

/*
  Карта сайта. Перечень маршрутов ведётся руками, а не обходом файловой
  системы: попасть в карту должна не всякая страница, у которой есть файл, а
  только та, которую мы действительно отдаём поиску.

  Чего здесь нет и почему:

  · `/privacy` и `/terms` — у обеих в метаданных стоит `robots: index: false`.
    Страница, закрытая от индексации, в карте сайта — прямое противоречие: она
    приглашает робота туда, откуда его же и разворачивают.
  · `/api/*` — не страницы.
  · Варианты первого экрана `/stack?angle=…` — это один и тот же документ с
    разным заголовком под рекламный сегмент, и `alternates.canonical` у него
    указывает на `/stack` без параметров. Отдельные адреса в карте
    рассказывали бы поиску о десяти страницах там, где страница одна.

  `lastModified` не проставлен намеренно. Взять его неоткуда: даты правок
  живут в git, а не в сборке, и единственное, что можно было бы подставить
  честно, — момент деплоя. Тогда каждая пересборка сообщала бы поиску, что
  обновились все страницы разом, — это шум, который обесценивает сам признак.

  `priority` — не «важность страницы для бизнеса», а вес внутри сайта: как
  распределять обход между своими же адресами. Google его игнорирует, Яндекс
  учитывает, поэтому он расставлен по одному правилу — чем ближе страница к
  входу воронки, тем выше.
*/

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const ROUTES: readonly Route[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/service", priority: 0.9, changeFrequency: "monthly" },
  { path: "/stack", priority: 0.9, changeFrequency: "monthly" },
  { path: "/universal", priority: 0.8, changeFrequency: "monthly" },
  { path: "/diagnostika", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pro", priority: 0.7, changeFrequency: "monthly" },
  { path: "/limits", priority: 0.6, changeFrequency: "monthly" },
  { path: "/docs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/istoriya", priority: 0.6, changeFrequency: "yearly" },
  { path: "/trial-terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`,
    changeFrequency,
    priority,
  }));
}
