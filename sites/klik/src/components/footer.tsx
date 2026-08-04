"use client";

import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";

/*
  Подвал.

  Прежний нёс три колонки, две пары определений с диапазоном ставок и
  подписи капслоком - двенадцать мелких объектов там, где посетитель ищет
  ровно одно: как связаться. Диапазон ставок переехал в раздел о темпе,
  где он и нужен, а здесь остались имя, два адреса и оговорка.

  Оговорка набрана обычным для страницы кеглем, а не восьмым. Мелкий шрифт
  на предупреждении читается как попытка его спрятать, и это ровно то
  впечатление, которого сайту в серой нише допускать нельзя.
*/
export function Footer({ cross }: { cross: { label: string; href: string } }) {
  return (
    <footer className="px-6 pb-16 sm:px-10">
      <div className="mx-auto max-w-[72rem] border-t border-[var(--color-line-soft)] pt-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <span className="text-[19px] font-semibold tracking-[-0.03em]">
              {SITE.brandFull}
            </span>
            <p className="mt-3 max-w-[34ch] text-[16px] leading-relaxed text-[var(--color-text-muted)]">
              {SITE.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-[16px] md:items-end">
            <a
              href={SITE.telegram}
              rel="noopener"
              onClick={() => track("contact_click", { channel: "telegram" })}
              className="text-[var(--color-text-muted)] [transition:color_var(--t-fast)_var(--ease-soft)] hover:text-[var(--color-text)]"
            >
              {SITE.telegramHandle}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              onClick={() => track("contact_click", { channel: "email" })}
              className="text-[var(--color-text-muted)] [transition:color_var(--t-fast)_var(--ease-soft)] hover:text-[var(--color-text)]"
            >
              {SITE.email}
            </a>
            <a
              href={cross.href}
              className="text-[var(--color-text-muted)] [transition:color_var(--t-fast)_var(--ease-soft)] hover:text-[var(--color-text)]"
            >
              {cross.label}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[68ch] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
            Ставки и коэффициенты на странице демонстрационные и показывают
            механику расчёта. Усиление поведенческих сигналов не входит в число
            методов, одобренных Яндексом: мы не гарантируем позиции и не обещаем
            отсутствия реакции поисковой системы.
          </p>
          <p className="shrink-0 text-[15px] text-[var(--color-text-muted)]">
            {SITE.domain} · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
