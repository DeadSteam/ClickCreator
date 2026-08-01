"use client";

import { SITE } from "@/lib/site";
import { SPEEDS } from "@/lib/content";
import { Mark } from "./logo";
import { track } from "@/lib/analytics";

/*
  Нижняя панель прибора: диапазон шкалы, связь, оговорка.

  Диапазон ставок берётся из того же массива, что и счётчик наверху. Вписать
  его руками означало бы однажды поменять тариф в одном месте и оставить
  старую цифру в подвале - на сайте, который весь держится на счёте, такое
  расхождение стоит дороже, чем где-либо ещё.
*/
export function Footer({ cross }: { cross: { label: string; href: string } }) {
  const low = SPEEDS[0].rate;
  const high = SPEEDS[SPEEDS.length - 1].rate;

  return (
    <footer className="border-t border-[var(--color-rule)] px-5 pt-10 pb-12 sm:px-8">
      <div className="mx-auto max-w-[84rem]">
        <div className="grid gap-10 border-b border-[var(--color-rule-hair)] pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="flex items-center gap-2.5">
              <Mark className="h-5 w-5" />
              <span className="text-[17px] font-semibold tracking-[-0.04em]">
                {SITE.brandFull}
              </span>
            </span>
            <p className="mt-4 max-w-[38ch] text-[14px] leading-relaxed text-[var(--color-read-soft)]">
              {SITE.tagline}. Данные на {SITE.updated}.
            </p>
          </div>

          <div>
            <span className="tag">диапазон шкалы</span>
            <dl className="mt-4 flex flex-col gap-2 text-[14px]">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[var(--color-read-soft)]">ставка за фразу</dt>
                <dd className="read">
                  {low}-{high} ₽
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[var(--color-read-soft)]">скидка за объём</dt>
                <dd className="read">до 22 %</dd>
              </div>
            </dl>
          </div>

          <div>
            <span className="tag">связь</span>
            <div className="mt-4 flex flex-col gap-2 text-[14px]">
              <a
                href={SITE.telegram}
                rel="noopener"
                onClick={() => track("contact_click", { channel: "telegram" })}
                className="text-[var(--color-read-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-read)]"
              >
                {SITE.telegramHandle}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                onClick={() => track("contact_click", { channel: "email" })}
                className="text-[var(--color-read-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-read)]"
              >
                {SITE.email}
              </a>
              <a
                href={cross.href}
                className="mt-2 text-[var(--color-read-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-read)]"
              >
                {cross.label}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[66ch] text-[13px] leading-relaxed text-[var(--color-read-faint)]">
            Ставки, коэффициенты и цена клика в контексте демонстрационные и
            служат для показа механики расчёта. Усиление поведенческих сигналов
            не входит в число методов, одобренных Яндексом: мы не гарантируем
            позиции и не обещаем отсутствия реакции поисковой системы.
          </p>
          <p className="tag shrink-0">
            {SITE.domain} &middot; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
