"use client";

import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";

/*
  Подвал.

  Было три колонки, дублирующее меню и подписи капслоком - двенадцать мелких
  объектов там, где ищут ровно одно: как связаться.

  Оговорка набрана обычным для страницы кеглем, а не восьмым. Сайт весь свой
  вес держит на том, что неприятное говорится вслух; оговорка, спрятанная в
  мелкий шрифт, обнулила бы это одним движением.
*/
export function Footer({ cross }: { cross: { label: string; href: string } }) {
  return (
    <footer className="px-6 pb-16 sm:px-10">
      <div className="mx-auto max-w-[74rem] border-t border-[var(--color-graphite)] pt-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <span className="text-[21px] font-bold tracking-[-0.04em]">
              {SITE.brandFull}
            </span>
            <p className="mt-3 max-w-[36ch] text-[17px] leading-relaxed text-[var(--color-graphite-soft)]">
              {SITE.tagline}. Редакция {SITE.revision} от {SITE.updated}.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-[17px] md:items-end">
            <a
              href={SITE.telegram}
              rel="noopener"
              onClick={() => track("contact_click", { channel: "telegram" })}
              className="text-[var(--color-graphite-soft)] [transition:color_var(--t-fast)_var(--ease-snap)] hover:text-[var(--color-graphite)]"
            >
              {SITE.telegramHandle}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              onClick={() => track("contact_click", { channel: "email" })}
              className="text-[var(--color-graphite-soft)] [transition:color_var(--t-fast)_var(--ease-snap)] hover:text-[var(--color-graphite)]"
            >
              {SITE.email}
            </a>
            <a
              href={cross.href}
              className="text-[var(--color-graphite-soft)] [transition:color_var(--t-fast)_var(--ease-snap)] hover:text-[var(--color-graphite)]"
            >
              {cross.label}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[66ch] text-[16px] leading-relaxed text-[var(--color-graphite-soft)]">
            Усиление поведенческих сигналов не входит в число методов,
            одобренных Яндексом. Мы не гарантируем позиции и не обещаем
            отсутствия реакции поисковой системы. Приведённые сроки и доли —
            медианы по нашей базе, а не обязательство. Цифры на странице
            демонстрационные.
          </p>
          <p className="shrink-0 text-[16px] text-[var(--color-graphite-soft)]">
            {SITE.domain} · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
