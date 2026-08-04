"use client";

import { useState } from "react";

import { SITE } from "@/lib/site";
import { Cta } from "./cta";

/*
  Шапка.

  Три ссылки вместо пяти и никакой линейки снизу. Прежняя версия несла
  четыре пункта, перекрёстную ссылку капслоком и разделитель - шесть мелких
  объектов над первым экраном, каждый из которых отбирал внимание у
  заголовка. Меню на лендинге почти не используют: сюда приходят по одному
  делу, а не изучать разделы.

  Фон появляется только при прокрутке, поэтому над первым экраном шапка
  растворена в сцене и не режет её пополам.
*/
const LINKS = [
  { label: "Как работает", href: "/#how" },
  { label: "Результаты", href: "/#cases" },
  { label: "Цена", href: "/#price" },
  { label: "Вопросы", href: "/#faq" },
];

export function Nav({ cross }: { cross: { label: string; href: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-[76rem] items-center justify-between gap-8 px-6 py-6 sm:px-10">
        <a
          href="/"
          className="text-[19px] font-semibold tracking-[-0.03em] [transition:opacity_var(--t-fast)_var(--ease-soft)] hover:opacity-70"
        >
          {SITE.brand}
        </a>

        <nav aria-label="Разделы" className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[16px] text-[var(--color-text-muted)] [transition:color_var(--t-fast)_var(--ease-soft)] hover:text-[var(--color-text)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={cross.href}
            className="text-[16px] text-[var(--color-text-muted)] [transition:color_var(--t-fast)_var(--ease-soft)] hover:text-[var(--color-text)]"
          >
            {cross.label}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {/* Обведённая, а не заливкой. Заливка в шапке спорит по яркости с
              главной кнопкой первого экрана, и на экране оказывается два
              одинаково громких призыва вместо одного. */}
          <div className="hidden sm:block">
            <Cta href={SITE.register} place="nav" variant="ghost">
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
            className="flex min-h-[44px] cursor-pointer items-center rounded-[var(--radius-control)] border border-[var(--color-line)] px-5 text-[15px] md:hidden"
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
          transition: "grid-template-rows var(--t-base) var(--ease-soft)",
        }}
      >
        <div className="min-h-0">
          <nav
            aria-label="Разделы, мобильная версия"
            className="mx-6 flex flex-col gap-1 rounded-[var(--radius-panel)] bg-[var(--color-surface)] p-4"
          >
            {[...LINKS, cross].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] items-center rounded-[14px] px-4 text-[17px] text-[var(--color-text-muted)]"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 sm:hidden">
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
