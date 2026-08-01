"use client";

import { useState } from "react";

import { SITE } from "@/lib/site";
import { Wordmark } from "./logo";
import { Cta } from "./cta";

const LINKS = [
  { label: "Реестр", href: "/#registry" },
  { label: "Как читать", href: "/#legend" },
  { label: "Прайс", href: "/#rates" },
  { label: "Как завести", href: "/#start" },
  { label: "Примечания", href: "/#faq" },
];

export function Nav({ cross }: { cross: { label: string; href: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[var(--color-rule)]">
      <div className="mx-auto flex max-w-[86rem] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <a
          href="/"
          className="shrink-0 [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-stamp)]"
        >
          <Wordmark issue={SITE.issue} />
        </a>

        <nav aria-label="Разделы" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-[var(--color-ink-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-stamp)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={cross.href}
            className="field border-b border-[var(--color-rule)] pb-1 [transition:color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro)] hover:border-[var(--color-stamp)] hover:text-[var(--color-stamp)]"
          >
            {cross.label}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Cta href={SITE.register} place="nav">
              Завести запись
            </Cta>
          </div>

          {/*
            Кнопка меню подписана словом, а не только иконкой: иконка-гамбургер
            без текстовой подписи не читается скринридером как "меню".
          */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((v) => !v)}
            className="field flex min-h-[44px] cursor-pointer items-center border border-[var(--color-rule)] px-3 lg:hidden"
          >
            {open ? "закрыть" : "меню"}
          </button>
        </div>
      </div>

      {/*
        Панель не размонтируется, а схлопывается по высоте: так у неё есть
        переход в обе стороны. Скрытая панель убирается из последовательности
        табуляции через inert, иначе фокус уезжает в невидимые ссылки.
      */}
      <div
        id="nav-sheet"
        inert={!open}
        className="grid overflow-hidden lg:hidden"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows var(--t-panel) var(--ease-page)",
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
                className="flex min-h-[44px] items-center border-b border-[var(--color-rule-hair)] text-[16px] text-[var(--color-ink-soft)]"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-5 sm:hidden">
              <Cta href={SITE.register} place="nav_mobile">
                Завести запись
              </Cta>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
