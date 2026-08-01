"use client";

import { track } from "@/lib/analytics";
import { Reveal } from "./reveal";

/*
  Построено на details/summary, а не на самописном аккордеоне: нативный элемент
  уже умеет клавиатуру, роль для скринридера и раскрытие при поиске по странице
  через Ctrl+F. Самописный теряет все три вещи молча.

  Клиентский компонент нужен ради события faq_open: оно входит в общий список
  и без него нельзя сравнить, какие возражения читают на разных вариантах.
*/
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="border-t border-[var(--color-rule)]">
      {items.map((item, i) => (
        <Reveal key={item.q} delay={i * 0.03}>
          <details
            className="group border-b border-[var(--color-rule-hair)]"
            onToggle={(e) => {
              if (!(e.currentTarget as HTMLDetailsElement).open) return;
              track("faq_open", { id: i + 1, q: item.q });
            }}
          >
            <summary className="flex min-h-[44px] cursor-pointer list-none items-baseline gap-5 py-5">
              <span className="read shrink-0 text-[11px] text-[var(--color-read-faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[17px] leading-snug font-medium tracking-[-0.025em] sm:text-[18px]">
                {item.q}
              </span>
              {/* Знак поворачивается, а не подменяется другим глифом: подмена
                  мигает, поворот показывает то же управление в другом состоянии. */}
              <span
                aria-hidden
                className="read shrink-0 text-[16px] text-[var(--color-read-faint)] [transition:transform_var(--t-hover)_var(--ease-micro)] group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-[70ch] pb-6 pl-9 text-[15px] leading-relaxed text-[var(--color-read-soft)]">
              {item.a}
            </p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
