/*
  Паспорт бренда. Домен условный: подставишь купленный - метатеги, sitemap,
  robots и вся разметка schema.org переедут сами.
*/

export const SITE = {
  brand: "Порог",
  brandFull: "Порог",
  tagline: "Технические условия на усиление поведенческих сигналов",

  origin: "https://porog-seo.ru",
  domain: "porog-seo.ru",

  lk: "https://lk.porog-seo.ru",
  register: "https://lk.porog-seo.ru/register",
  telegram: "https://t.me/porog_seo",
  telegramHandle: "@porog_seo",
  email: "tu@porog-seo.ru",

  description:
    "Усиление поведенческих сигналов для сайтов, уже находящихся в ТОП-50 Яндекса. Проверяем допуск до оплаты и отказываем тем, кому услуга не поможет. Оплата за фактические переходы, остановка подачи в течение часа.",

  /** Редакция технических условий. Растёт при изменении методики. */
  revision: "3.2",
  updated: "2026-07-28",
} as const;
