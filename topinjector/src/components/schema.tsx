/*
  Structured data. A search-marketing service whose own page carries no schema
  is the shoemaker without shoes, and the FAQ block is exactly the shape search
  engines reward. Replace the placeholder identifiers before publishing.
*/
export function Schema({
  faq,
  service,
  offers = { price: "4", description: "Цена за одну ключевую фразу в день, тариф Экономный" },
}: {
  faq: { q: string; a: string }[];
  service: { name: string; description: string; url: string };
  /**
   * Цена привязана к тарифу с подписью в день/фразу (`@/landing/config`) — то,
   * чем живут /service и десять гипотез. Страницы с другой, ещё не
   * подтверждённой тарифной моделью (например /stack — оплата за клик, цена
   * ⚠ не зафиксирована) обязаны передать `offers={null}`: структурированные
   * данные не должны публиковать цену, которой сама страница не называет.
   */
  offers?: { price: string; description: string } | null;
}) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://topinjector.ru/#org",
        name: "TopInjector",
        url: "https://topinjector.ru",
        description:
          "Сервис усиления поведенческих сигналов для продвижения сайтов в Яндексе.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "hi@topinjector.ru",
          availableLanguage: "Russian",
        },
      },
      {
        "@type": "Service",
        "@id": `${service.url}#service`,
        name: service.name,
        description: service.description,
        provider: { "@id": "https://topinjector.ru/#org" },
        areaServed: { "@type": "Country", name: "Россия" },
        ...(offers && {
          offers: {
            "@type": "Offer",
            priceCurrency: "RUB",
            price: offers.price,
            description: offers.description,
          },
        }),
      },
      {
        "@type": "FAQPage",
        "@id": `${service.url}#faq`,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  /*
    Content here is author-controlled, but escaping `<` still matters: a stray
    `</script>` inside any string would otherwise close the tag early and spill
    the rest of the payload into the document as markup.
  */
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
