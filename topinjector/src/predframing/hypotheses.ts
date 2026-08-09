/*
  Реестр психологических гипотез предфрейминговой системы.

  Источник: ТЗстраницы/2-predframing-landing.txt, п.3 и п.20 ТЗ UX-дизайнеру.
  Десять версий первых экранов, у каждой свой маршрут и свой идентификатор в
  аналитике. Правило ТЗ: трафик с разных рекламных гипотез нельзя вести на один
  и тот же Hero, поэтому связь «гипотеза → маршрут» живёт здесь, а не в разметке
  страниц — иначе к десятой версии никто не скажет, какая реклама куда ведёт.

  Идентификаторы аналитики заданы ТЗ дословно и переименованию не подлежат: по
  ним склеиваются рекламные кампании и события на странице.
*/

export const HYPOTHESES = [
  { slug: "loss", analyticsId: "hypothesis_01_loss", title: "Потеря преимущества" },
  { slug: "information", analyticsId: "hypothesis_02_information", title: "Информационное преимущество" },
  { slug: "ego", analyticsId: "hypothesis_03_ego", title: "Профессиональное эго" },
  { slug: "time", analyticsId: "hypothesis_04_time", title: "Экономика времени" },
  { slug: "status", analyticsId: "hypothesis_05_status", title: "Статус" },
  { slug: "speed", analyticsId: "hypothesis_06_speed", title: "Скорость" },
  { slug: "fomo", analyticsId: "hypothesis_07_fomo", title: "FOMO" },
  { slug: "test", analyticsId: "hypothesis_08_test", title: "Проверка" },
  { slug: "next-level", analyticsId: "hypothesis_09_next_level", title: "Переход на следующий уровень" },
  { slug: "early-advantage", analyticsId: "hypothesis_10_early_advantage", title: "Закрытое преимущество" },
] as const;

export type HypothesisSlug = (typeof HYPOTHESES)[number]["slug"];
export type HypothesisId = (typeof HYPOTHESES)[number]["analyticsId"];

const BY_SLUG = new Map(HYPOTHESES.map((h) => [h.slug, h]));

/** Идентификатор гипотезы для аналитики. Карта построена из того же массива, что и тип. */
export function hypothesisId(slug: HypothesisSlug): HypothesisId {
  return BY_SLUG.get(slug)!.analyticsId;
}

/**
 * Универсальная часть системы: доказательства, механизм, кейсы, роль продукта,
 * FAQ и финальный CTA. По ТЗ она одна на все десять гипотез, поэтому маршрут
 * задан константой — когда страница появится, менять её придётся в одном месте,
 * а не в десяти разных концовках.
 */
export const UNIVERSAL_ROUTE = "/universal";

/** Сколько читается предфрейминговая часть. Показывается во вторичной ссылке Hero. */
export const READING_MINUTES = "5–7 минут";
