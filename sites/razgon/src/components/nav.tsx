"use client";

import { useState } from "react";

import { SITE } from "@/lib/site";
import { Cta } from "./cta";

/*
  Шапка. Узкая, с алой полосой разметки по нижней кромке вместо обычной
  линейки: полоса читается как край дорожного полотна и задаёт тон всей
  странице раньше, чем посетитель доберётся до заголовка.
*/
const LINKS = [
  { label: "Расписание", href: "/#schedule" },
  { label: "Скорость", href: "/#speeds" },
  { label: "Вопросы", href: "/#faq" },
];

export function Nav({ cross }: { cross: { label: string; href: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="mx-auto flex max-w-[84rem] items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <a
          href="/"
          className="shrink-0 [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-blaze)]"
        >
          {/* Знак набран шрифтом: остаётся резким и читается поисковиками. */}
          <span className="font-[family-name:var(--font-tight)] text-[26px] leading-none font-extrabold uppercase tracking-[-0.01em]">
            Разгон
          </span>
        </a>

        <nav aria-label="Разделы" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] text-[var(--color-mark-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-mark)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={cross.href}
            className="plate [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-mark)]"
          >
            {cross.label}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Cta href={SITE.register} place="nav">
              Запустить
            </Cta>
          </div>

          {/* Кнопка подписана словом: иконка-гамбургер без подписи не читается
              скринридером как «меню». */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((v) => !v)}
            className="plate flex min-h-[44px] cursor-pointer items-center border-2 border-[var(--color-mark)] px-3 text-[var(--color-mark)] lg:hidden"
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
          transition: "grid-template-rows var(--t-panel) var(--ease-drive)",
        }}
      >
        <div className="min-h-0">
          <nav
            aria-label="Разделы, мобильная версия"
            className="flex flex-col px-5 pb-5 sm:px-8"
          >
            {[...LINKS, cross].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center border-b border-[var(--color-rule-hair)] text-[17px] text-[var(--color-mark-soft)]"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-5 sm:hidden">
              <Cta href={SITE.register} place="nav_mobile">
                Запустить
              </Cta>
            </div>
          </nav>
        </div>
      </div>

      {/* Разметка полосы вместо линейки под шапкой. */}
      <div aria-hidden className="lane h-1.5" />
    </header>
  );
}
