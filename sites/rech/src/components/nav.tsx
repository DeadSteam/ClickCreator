"use client";

import { useState } from "react";

import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";

/*
  Шапка письма.

  Кнопки целевого действия здесь нет намеренно. На всех остальных вариантах
  она в шапке есть, и это правильно; здесь её отсутствие - часть проверяемой
  гипотезы. Письмо, которое с первой строки предлагает купить, читается как
  рассылка, а не как письмо.

  Вместо кнопки - ссылка на живого человека в Telegram. Написать автору можно
  в любой момент, и это не покупка.
*/
const LINKS = [
  { label: "Что я делаю", href: "/#work" },
  { label: "Чего не делаю", href: "/#refusals" },
  { label: "Сколько", href: "/#money" },
  { label: "Вопросы", href: "/#faq" },
];

export function Nav({ cross }: { cross: { label: string; href: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[var(--color-rule-soft)]">
      <div className="mx-auto flex max-w-[72rem] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <a href="/" className="link shrink-0">
          {/* Подпись автора вместо знака: у человека нет логотипа. */}
          <span className="font-[family-name:var(--font-display)] text-[20px] leading-none font-bold tracking-[-0.015em]">
            {SITE.author}
          </span>
        </a>

        <nav aria-label="Разделы" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link text-[15px] text-[var(--color-ink-soft)]"
            >
              {l.label}
            </a>
          ))}
          <a href={cross.href} className="link text-[15px] text-[var(--color-ink-soft)]">
            {cross.label}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={SITE.telegram}
            rel="noopener"
            onClick={() => track("contact_click", { channel: "telegram", place: "nav" })}
            className="stroke hidden text-[15px] sm:inline-block"
          >
            Написать мне
          </a>

          {/* Кнопка подписана словом: иконка-гамбургер без подписи не читается
              скринридером как «меню». */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((v) => !v)}
            className="cap flex min-h-[44px] cursor-pointer items-center border border-[var(--color-rule)] px-3 lg:hidden"
          >
            {open ? "закрыть" : "меню"}
          </button>
        </div>
      </div>

      {/* Панель схлопывается по высоте, а не размонтируется: так у неё есть
          переход в обе стороны. inert убирает скрытые ссылки из табуляции. */}
      <div
        id="nav-sheet"
        inert={!open}
        className="grid overflow-hidden lg:hidden"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows var(--t-panel) var(--ease-turn)",
        }}
      >
        <div className="min-h-0">
          <nav
            aria-label="Разделы, мобильная версия"
            className="flex flex-col border-t border-[var(--color-rule-hair)] px-5 pb-5 sm:px-8"
          >
            {[...LINKS, cross].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center border-b border-[var(--color-rule-hair)] text-[17px] text-[var(--color-ink-soft)]"
              >
                {l.label}
              </a>
            ))}
            <a
              href={SITE.telegram}
              rel="noopener"
              onClick={() => track("contact_click", { channel: "telegram", place: "nav_mobile" })}
              className="mt-4 flex min-h-[44px] items-center text-[17px] text-[var(--color-ochre)] sm:hidden"
            >
              Написать мне
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
