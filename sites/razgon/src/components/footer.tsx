"use client";

import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";

/*
  Подвал.

  Было три колонки, пара определений со ставкой и сроком и подписи капслоком
  одиннадцатым кеглем - двенадцать мелких объектов там, где ищут ровно одно:
  как связаться. Ставка и срок остались наверху, где они и работают доводами.

  Оговорка набрана обычным для страницы кеглем. Сайт заявляет предельную
  скорость; оговорка, спрятанная в восьмой кегль, обнулила бы доверие,
  которое эта страница выстраивает расписанием.
*/
export function Footer({ cross }: { cross: { label: string; href: string } }) {
  return (
    <footer>
      <div aria-hidden className="lane h-1.5" />

      <div className="px-6 pt-14 pb-16 sm:px-10">
        <div className="mx-auto max-w-[76rem]">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
            <div>
              <span className="font-[family-name:var(--font-tight)] text-[34px] leading-none font-extrabold uppercase">
                {SITE.brandFull}
              </span>
              <p className="mt-4 max-w-[36ch] text-[17px] leading-relaxed text-[var(--color-mark-soft)]">
                {SITE.tagline}. Медианы по базе на {SITE.updated}.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-[17px] md:items-end">
              <a
                href={SITE.telegram}
                rel="noopener"
                onClick={() => track("contact_click", { channel: "telegram" })}
                className="text-[var(--color-mark-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-mark)]"
              >
                {SITE.telegramHandle}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                onClick={() => track("contact_click", { channel: "email" })}
                className="text-[var(--color-mark-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-mark)]"
              >
                {SITE.email}
              </a>
              <a
                href={cross.href}
                className="text-[var(--color-mark-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-mark)]"
              >
                {cross.label}
              </a>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[66ch] text-[16px] leading-relaxed text-[var(--color-mark-soft)]">
              Сроки в расписании — медианы по нашей базе на самом быстром
              режиме, а не обязательство: в перегретых нишах те же события
              наступают позже. Цифры демонстрационные. Усиление поведенческих
              сигналов не входит в число методов, одобренных Яндексом: мы не
              гарантируем позиции и не обещаем отсутствия реакции поисковой
              системы.
            </p>
            <p className="shrink-0 text-[16px] text-[var(--color-mark-soft)]">
              {SITE.domain} · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
