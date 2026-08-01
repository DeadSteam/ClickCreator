"use client";

import { SITE } from "@/lib/site";
import { Mark } from "./logo";
import { track } from "@/lib/analytics";

/*
  Подвал технических условий: кто выпустил, какая редакция, что считать
  оговоркой.

  Предупреждающая лента идёт по верхней кромке подвала - последнее, что видит
  дочитавший, это ограничение, а не призыв. Для сайта, который продаёт через
  отказ, это правильный последний кадр.
*/
export function Footer({ cross }: { cross: { label: string; href: string } }) {
  return (
    <footer>
      <div aria-hidden className="hazard h-1.5" />

      <div className="bg-[var(--color-sheet-raise)] px-5 pt-10 pb-12 sm:px-8">
        <div className="mx-auto max-w-[84rem]">
          <div className="grid gap-10 border-b border-[var(--color-rule-soft)] pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <span className="flex items-center gap-2.5">
                <Mark className="h-5 w-5" />
                <span className="text-[17px] font-bold tracking-[-0.03em]">
                  {SITE.brandFull}
                </span>
              </span>
              <p className="mt-4 max-w-[40ch] text-[14px] leading-relaxed text-[var(--color-graphite-soft)]">
                {SITE.tagline}. Редакция {SITE.revision} от {SITE.updated}.
              </p>
            </div>

            <div>
              <span className="mark">разделы</span>
              <div className="mt-4 flex flex-col gap-2 text-[14px]">
                <a href="/#gate" className="text-[var(--color-graphite-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-graphite)]">
                  Проверка допуска
                </a>
                <a href="/#terms" className="text-[var(--color-graphite-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-graphite)]">
                  Технические условия
                </a>
                <a href={cross.href} className="text-[var(--color-graphite-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-graphite)]">
                  {cross.label}
                </a>
              </div>
            </div>

            <div>
              <span className="mark">связь</span>
              <div className="mt-4 flex flex-col gap-2 text-[14px]">
                <a
                  href={SITE.telegram}
                  rel="noopener"
                  onClick={() => track("contact_click", { channel: "telegram" })}
                  className="text-[var(--color-graphite-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-graphite)]"
                >
                  {SITE.telegramHandle}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  onClick={() => track("contact_click", { channel: "email" })}
                  className="text-[var(--color-graphite-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-graphite)]"
                >
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <p className="max-w-[66ch] text-[13px] leading-relaxed text-[var(--color-graphite-faint)]">
              Усиление поведенческих сигналов не входит в число методов,
              одобренных Яндексом. Мы не гарантируем позиции и не обещаем
              отсутствия реакции поисковой системы. Приведённые сроки и доли -
              медианы по нашей базе, а не обязательство. Цифры на странице
              демонстрационные.
            </p>
            <p className="mark shrink-0">
              {SITE.domain} &middot; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
