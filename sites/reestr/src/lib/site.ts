/*
  Паспорт бренда. Единственное место, где живут домен, адреса и имя.

  Домен пока условный: подставишь купленный - и метатеги, sitemap, robots и
  вся schema.org разметка переедут сами. Ничего больше править не нужно.
*/

export const SITE = {
  /** Короткое имя, им подписан знак в шапке. */
  brand: "Реестр",
  /** Полное имя для метатегов и schema.org. */
  brandFull: "Реестр позиций",
  /** Слоган выходных данных. */
  tagline: "Публичный реестр проектов на поведенческих сигналах",

  origin: "https://reestr-pozicij.ru",
  domain: "reestr-pozicij.ru",

  lk: "https://lk.reestr-pozicij.ru",
  register: "https://lk.reestr-pozicij.ru/register",
  telegram: "https://t.me/reestr_pozicij",
  telegramHandle: "@reestr_pozicij",
  email: "arhiv@reestr-pozicij.ru",

  description:
    "Открытый реестр проектов на поведенческих сигналах: домен, запрос, позиция до и после. С записями, по которым роста не было.",

  /** Номер выпуска реестра. Меняется при пересборке данных. */
  issue: "04",
  /** Дата последней сверки. Показывается в выходных данных. */
  updated: "2026-07-28",
} as const;
