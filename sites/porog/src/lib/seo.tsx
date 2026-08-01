/*
  Структурированные данные. Дублируется в каждом сайте по той же причине,
  что и analytics.ts: сайты деплоятся независимо.

  Значения берутся из site.ts, поэтому один и тот же код даёт разную разметку
  под каждый бренд - в выдаче шесть сайтов не должны выглядеть клонами.
*/

import { SITE } from "./site";

type Faq = { q: string; a: string };

/**
 * JSON-LD рендерится через dangerouslySetInnerHTML: это единственный способ
 * отдать сырой JSON внутри script. React экранирует содержимое обычного
 * текстового узла, и разметка приезжает к роботу битой.
 *
 * Экранируем "<" - иначе строка вида "</script>" внутри данных закрывает тег
 * раньше времени и ломает страницу. Это дыра, а не косметика.
 */
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.brand,
        url: SITE.origin,
        description: SITE.description,
        sameAs: [SITE.telegram],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: SITE.email,
          availableLanguage: ["Russian"],
        },
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  lowPrice,
  highPrice,
}: {
  name: string;
  description: string;
  lowPrice: number;
  highPrice: number;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType: "Поисковая оптимизация",
        areaServed: { "@type": "Country", name: "Россия" },
        provider: {
          "@type": "Organization",
          name: SITE.brand,
          url: SITE.origin,
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "RUB",
          lowPrice,
          highPrice,
          /* Цена за одну фразу в сутки - без этого числа выглядят произвольными. */
          unitText: "фраза в сутки",
        },
      }}
    />
  );
}

export function FaqSchema({ items }: { items: readonly Faq[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({
  trail,
}: {
  trail: readonly { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((step, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: step.name,
          item: `${SITE.origin}${step.path}`,
        })),
      }}
    />
  );
}
