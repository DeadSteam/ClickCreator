"use client";

import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";

/*
  Конец письма: подпись, контакты, оговорка.

  Дисклеймер набран тем же кеглем, что и остальные примечания, и не спрятан в
  шрифт восьмого размера. На сайте, который весь построен на утверждении
  "я говорю правду", мелкая оговорка внизу работает против автора сильнее,
  чем сама оговорка - за.
*/
export function Footer({ cross }: { cross: { label: string; href: string } }) {
  return (
    <footer className="border-t border-[var(--color-rule)] px-5 pt-12 pb-14 sm:px-8">
      <div className="mx-auto max-w-[72rem]">
        <div className="grid gap-10 border-b border-[var(--color-rule-soft)] pb-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="font-[family-name:var(--font-display)] text-[26px] leading-tight font-bold tracking-[-0.015em]">
              {SITE.author}
            </p>
            <p className="mt-3 max-w-[42ch] text-[16px] leading-relaxed text-[var(--color-ink-soft)]">
              {SITE.city}, <span className="fig">{SITE.years}</span> лет в
              поисковой оптимизации. Отвечаю сам, обычно в течение дня.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-[16px]">
            <a
              href={SITE.telegram}
              rel="noopener"
              onClick={() => track("contact_click", { channel: "telegram" })}
              className="link text-[var(--color-ink-soft)]"
            >
              {SITE.telegramHandle}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              onClick={() => track("contact_click", { channel: "email" })}
              className="link text-[var(--color-ink-soft)]"
            >
              {SITE.email}
            </a>
            <a href={cross.href} className="link mt-2 text-[var(--color-ink-soft)]">
              {cross.label}
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[64ch] text-[16px] leading-relaxed text-[var(--color-ink-soft)]">
            Цифры на этой странице демонстрационные. Усиление поведенческих
            сигналов не входит в число методов, одобренных Яндексом: я не
            гарантирую позиции и не обещаю, что поисковая система не отреагирует.
            Об этом я пишу и выше, а не только здесь.
          </p>
          <p className="cap shrink-0">
            {SITE.domain} &middot; <span className="fig">{new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
