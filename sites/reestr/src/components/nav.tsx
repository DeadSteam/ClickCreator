"use client";

import { useState } from "react";

import { SITE } from "@/lib/site";
import { Cta } from "./cta";

/*
  Шапка.

  Было пять разделов, номер выпуска рядом со знаком и перекрёстная ссылка
  капслоком - восемь мелких объектов над заголовком. Осталось четыре: по
  одному на каждый раздел, к которому посетитель может захотеть вернуться.

  Знак набран шрифтом, а не нарисован: имя издания в его же гарнитуре
  выглядит достовернее любой пиктограммы и не требует второго файла.
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
      <div className="mx-auto flex max-w-[74rem] items-center justify-between gap-8 px-6 py-7 sm:px-10">
        <a
          href="/"
          className="shrink-0 text-[21px] font-semibold tracking-[-0.025em] [transition:color_var(--t-fast)_var(--ease-page)] hover:text-[var(--color-stamp)]"
        >
          {SITE.brand}
        </a>

        <nav aria-label="Разделы" className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[17px] text-[var(--color-ink-soft)] [transition:color_var(--t-fast)_var(--ease-page)] hover:text-[var(--color-ink)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={cross.href}
            className="text-[17px] text-[var(--color-ink-soft)] [transition:color_var(--t-fast)_var(--ease-page)] hover:text-[var(--color-ink)]"
          >
            {cross.label}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {/* Обведённая, а не залитая: залитая в шапке спорит по весу с
              главной кнопкой первого экрана. */}
          <div className="hidden sm:block">
            <Cta href={SITE.register} place="nav" variant="outline">
              Запустить тест
            </Cta>
          </div>

          {/* Подписано словом: иконка-гамбургер без подписи не читается
              скринридером как «меню». */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((v) => !v)}
            className="flex min-h-[46px] cursor-pointer items-center border border-[var(--color-rule)] px-5 text-[16px] md:hidden"
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
        className="grid overflow-hidden md:hidden"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows var(--t-base) var(--ease-page)",
        }}
      >
        <div className="min-h-0">
          <nav
            aria-label="Разделы, мобильная версия"
            className="inset mx-6 flex flex-col px-5 py-3"
          >
            {[...LINKS, cross].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[50px] items-center text-[18px] text-[var(--color-ink-soft)]"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 mb-2 sm:hidden">
              <Cta href={SITE.register} place="nav_mobile">
                Запустить тест
              </Cta>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
