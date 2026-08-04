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
  { label: "Как работает", href: "/#how" },
  { label: "Расчёт", href: "/#budget" },
  { label: "Результаты", href: "/#cases" },
  { label: "Вопросы", href: "/#faq" },
];

export function Nav({ cross }: { cross: { label: string; href: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="mx-auto flex max-w-[76rem] items-center justify-between gap-8 px-6 py-6 sm:px-10">
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
              className="text-[17px] text-[var(--color-mark-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-mark)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={cross.href}
            className="text-[17px] text-[var(--color-mark-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-mark)]"
          >
            {cross.label}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Cta href={SITE.register} place="nav" variant="outline">
              Запустить тест
            </Cta>
          </div>

          {/* Кнопка подписана словом: иконка-гамбургер без подписи не читается
              скринридером как «меню». */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((v) => !v)}
            className="flex min-h-[48px] cursor-pointer items-center border-2 border-[var(--color-mark)] px-5 text-[16px] font-semibold text-[var(--color-mark)] lg:hidden"
          >
            {open ? "Закрыть" : "Меню"}
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
            className="flex flex-col px-6 pb-6 sm:px-10"
          >
            {[...LINKS, cross].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center border-b border-[var(--color-rule-soft)] text-[17px] text-[var(--color-mark-soft)]"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-5 sm:hidden">
              <Cta href={SITE.register} place="nav_mobile">
                Запустить тест
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
