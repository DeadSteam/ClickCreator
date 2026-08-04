"use client";

import { track } from "@/lib/analytics";

/*
  Вопросы.

  Построено на details/summary, а не на самописном аккордеоне: нативный
  элемент уже умеет клавиатуру, роль для скринридера и раскрытие при поиске
  по странице через Ctrl+F. Самописный теряет все три вещи молча.

  Из прежней версии убраны номера пунктов: 01, 02, 03 не помогают выбрать
  вопрос - их читают глазами, но не используют. Осталась одна мелкая деталь
  на строку, знак раскрытия, и он крупный.

  Клиентский компонент нужен ради события faq_open: оно входит в общий
  список и без него нельзя сравнить, какие возражения читают на вариантах.
*/
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <details
          key={item.q}
          className="group border-b border-[var(--color-line-soft)]"
          onToggle={(e) => {
            if (!(e.currentTarget as HTMLDetailsElement).open) return;
            track("faq_open", { id: i + 1, q: item.q });
          }}
        >
          <summary className="flex cursor-pointer list-none items-baseline gap-8 py-7">
            <span className="flex-1 text-[19px] leading-snug font-medium tracking-[-0.02em] sm:text-[21px]">
              {item.q}
            </span>
            {/* Знак поворачивается, а не подменяется другим глифом: подмена
                мигает, поворот показывает то же управление в другом состоянии. */}
            <span
              aria-hidden
              className="shrink-0 text-[24px] leading-none font-light text-[var(--color-text-dim)] [transition:transform_var(--t-base)_var(--ease-soft),color_var(--t-base)_var(--ease-soft)] group-open:rotate-45 group-open:text-[var(--color-text)]"
            >
              +
            </span>
          </summary>
          <p className="max-w-[62ch] pb-8 text-[17px] leading-relaxed text-[var(--color-text-muted)]">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
