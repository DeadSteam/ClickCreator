"use client";

import { useState } from "react";

import { SITE } from "@/lib/site";
import { Wordmark } from "./logo";
import { Cta } from "./cta";

const LINKS = [
  { label: "Допуск", href: "/#gate" },
  { label: "Условия", href: "/#terms" },
  { label: "Режимы", href: "/#modes" },
  { label: "Расчёт", href: "/#calc" },
  { label: "Вопросы", href: "/#faq" },
];

export function Nav({ cross }: { cross: { label: string; href: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[var(--color-rule)] bg-[var(--color-sheet-raise)]">
      <div className="mx-auto flex max-w-[84rem] items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <a
          href="/"
          className="shrink-0 [transition:opacity_var(--t-hover)_var(--ease-micro)] hover:opacity-70"
        >
          <Wordmark revision={SITE.revision} />
        </a>

        <nav aria-label="Разделы" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-[var(--color-graphite-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-graphite)]"
            >
              {l.label}
            </a>
          ))}
          <a href={cross.href} className="mark [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-graphite)]">
            {cross.label}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Cta href="/#gate" place="nav">
              Проверить допуск
            </Cta>
          </div>

          {/* Кнопка подписана словом: иконка-гамбургер без подписи не читается
              скринридером как «меню». */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((v) => !v)}
            className="mark flex min-h-[44px] cursor-pointer items-center border border-[var(--color-rule)] px-3 lg:hidden"
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
          transition: "grid-template-rows var(--t-panel) var(--ease-snap)",
        }}
      >
        <div className="min-h-0">
          <nav
            aria-label="Разделы, мобильная версия"
            className="flex flex-col border-t border-[var(--color-rule-soft)] px-5 pb-5 sm:px-8"
          >
            {[...LINKS, cross].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center border-b border-[var(--color-rule-hair)] text-[16px] text-[var(--color-graphite-soft)]"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-5 sm:hidden">
              <Cta href="/#gate" place="nav_mobile">
                Проверить допуск
              </Cta>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
