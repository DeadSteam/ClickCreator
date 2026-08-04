"use client";

import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";

/*
  Выходные данные.

  Было три колонки, пара определений со счётчиком записей и подписи капслоком -
  двенадцать мелких объектов там, где ищут ровно одно: как связаться. Счётчик
  записей переехал в первый экран, где он и работает как довод.

  Оговорка набрана обычным для страницы кеглем, а не восьмым. Страница весь
  свой вес держит на утверждении «мы публикуем правду»; оговорка, спрятанная
  в мелкий шрифт, обнулила бы это одним движением.
*/
export function Footer({ cross }: { cross: { label: string; href: string } }) {
  return (
    <footer className="px-6 pb-16 sm:px-10">
      <div className="mx-auto max-w-[74rem] border-t border-[var(--color-ink)] pt-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <span className="text-[21px] font-semibold tracking-[-0.025em]">
              {SITE.brandFull}
            </span>
            <p className="mt-3 max-w-[36ch] text-[17px] leading-relaxed text-[var(--color-ink-soft)]">
              {SITE.tagline}. Выпуск {SITE.issue}, сверено {SITE.updated}.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-[17px] md:items-end">
            <a
              href={SITE.telegram}
              rel="noopener"
              onClick={() => track("contact_click", { channel: "telegram" })}
              className="text-[var(--color-ink-soft)] [transition:color_var(--t-fast)_var(--ease-page)] hover:text-[var(--color-ink)]"
            >
              {SITE.telegramHandle}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              onClick={() => track("contact_click", { channel: "email" })}
              className="text-[var(--color-ink-soft)] [transition:color_var(--t-fast)_var(--ease-page)] hover:text-[var(--color-ink)]"
            >
              {SITE.email}
            </a>
            <a
              href={cross.href}
              className="text-[var(--color-ink-soft)] [transition:color_var(--t-fast)_var(--ease-page)] hover:text-[var(--color-ink)]"
            >
              {cross.label}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[66ch] text-[16px] leading-relaxed text-[var(--color-ink-soft)]">
            Записи в таблице демонстрационные и приведены для показа формата
            реестра. Услуга относится к серой зоне поисковой оптимизации:
            поведенческие сигналы не входят в число методов, одобренных
            Яндексом. Мы не гарантируем позиции и не обещаем отсутствия реакции
            поисковой системы.
          </p>
          <p className="shrink-0 text-[16px] text-[var(--color-ink-soft)]">
            {SITE.domain} · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
