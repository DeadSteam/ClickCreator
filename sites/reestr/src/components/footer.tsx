"use client";

import { SITE } from "@/lib/site";
import { ENTRIES } from "@/lib/content";
import { Mark } from "./logo";
import { track } from "@/lib/analytics";

/*
  Выходные данные. В печатном реестре это последняя страница: кто издал, когда
  сверено, сколько записей, что считать оговоркой.

  Дисклеймер стоит здесь намеренно и не должен уезжать в мелкий шрифт: страница
  весь свой вес держит на утверждении "мы публикуем правду", и спрятанная
  оговорка про демо-данные обнулила бы это одним движением.
*/
export function Footer({ cross }: { cross: { label: string; href: string } }) {
  const stopped = ENTRIES.filter((e) => e.status === "остановлен").length;

  return (
    <footer className="border-t border-[var(--color-ink)] px-5 pt-10 pb-12 sm:px-8">
      <div className="mx-auto max-w-[86rem]">
        <div className="grid gap-10 border-b border-[var(--color-rule-soft)] pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="flex items-center gap-2.5">
              <Mark className="h-5 w-5" />
              <span className="text-[17px] font-semibold tracking-[-0.02em]">
                {SITE.brandFull}
              </span>
            </span>
            <p className="mt-4 max-w-[38ch] text-[14px] leading-relaxed text-[var(--color-ink-soft)]">
              {SITE.tagline}. Выпуск {SITE.issue}, сверено {SITE.updated}.
            </p>
          </div>

          <div>
            <span className="field">в реестре</span>
            <dl className="mt-4 flex flex-col gap-2 text-[14px]">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[var(--color-ink-soft)]">всего записей</dt>
                <dd className="num text-[var(--color-ink)]">{ENTRIES.length}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[var(--color-ink-soft)]">из них без роста</dt>
                <dd className="num text-[var(--color-stamp)]">{stopped}</dd>
              </div>
            </dl>
          </div>

          <div>
            <span className="field">связь</span>
            <div className="mt-4 flex flex-col gap-2 text-[14px]">
              <a
                href={SITE.telegram}
                rel="noopener"
                onClick={() => track("contact_click", { channel: "telegram" })}
                className="text-[var(--color-ink-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-stamp)]"
              >
                {SITE.telegramHandle}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                onClick={() => track("contact_click", { channel: "email" })}
                className="text-[var(--color-ink-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-stamp)]"
              >
                {SITE.email}
              </a>
              <a
                href={cross.href}
                className="mt-2 text-[var(--color-ink-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-stamp)]"
              >
                {cross.label}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[64ch] text-[13px] leading-relaxed text-[var(--color-ink-faint)]">
            Записи в таблице демонстрационные и приведены для показа формата
            реестра. Услуга относится к серой зоне поисковой оптимизации:
            поведенческие сигналы не входят в число методов, одобренных Яндексом.
            Мы не гарантируем позиции и не обещаем отсутствия реакции поисковой
            системы.
          </p>
          <p className="field shrink-0">
            {SITE.domain} &middot; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
