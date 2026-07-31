/*
  Structured data. A search-marketing service whose own page carries no schema
  is the shoemaker without shoes, and the FAQ block is exactly the shape search
  engines reward. Replace the placeholder identifiers before publishing.
*/
export function Schema({
  faq,
  service,
}: {
  faq: { q: string; a: string }[];
  service: { name: string; description: string; url: string };
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
        offers: {
          "@type": "Offer",
          priceCurrency: "RUB",
          price: "4",
          description: "Цена за одну ключевую фразу в день, тариф Экономный",
        },
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
