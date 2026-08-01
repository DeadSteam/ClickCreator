"use client";

import { SITE } from "@/lib/site";
import { SPEEDS, STAGES } from "@/lib/content";
import { track } from "@/lib/analytics";

/*
  Подвал. Диапазон ставок и последние сутки расписания берутся из тех же
  массивов, что и страница выше: вписанные руками цифры однажды разойдутся с
  содержимым, а на сайте, который весь построен на расписании, расхождение в
  сроках заметят первым.
*/
export function Footer({ cross }: { cross: { label: string; href: string } }) {
  const last = STAGES[STAGES.length - 1].day;
  const low = SPEEDS[0].rate;
  const high = SPEEDS[SPEEDS.length - 1].rate;

  return (
    <footer>
      <div aria-hidden className="lane h-1.5" />

      <div className="px-5 pt-10 pb-12 sm:px-8">
        <div className="mx-auto max-w-[84rem]">
          <div className="grid gap-10 border-b border-[var(--color-rule-hair)] pb-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <span className="font-[family-name:var(--font-tight)] text-[30px] leading-none font-extrabold uppercase">
                {SITE.brandFull}
              </span>
              <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-[var(--color-mark-soft)]">
                {SITE.tagline}. Медианы по базе на {SITE.updated}.
              </p>
            </div>

            <div>
              <span className="plate">коротко</span>
              <dl className="mt-4 flex flex-col gap-2 text-[15px]">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[var(--color-mark-soft)]">ставка за фразу</dt>
                  <dd className="day">
                    {low}-{high} ₽
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[var(--color-mark-soft)]">закрепление</dt>
                  <dd className="day">{last} сут</dd>
                </div>
              </dl>
            </div>

            <div>
              <span className="plate">связь</span>
              <div className="mt-4 flex flex-col gap-2 text-[15px]">
                <a
                  href={SITE.telegram}
                  rel="noopener"
                  onClick={() => track("contact_click", { channel: "telegram" })}
                  className="text-[var(--color-mark-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-blaze)]"
                >
                  {SITE.telegramHandle}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  onClick={() => track("contact_click", { channel: "email" })}
                  className="text-[var(--color-mark-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-blaze)]"
                >
                  {SITE.email}
                </a>
                <a
                  href={cross.href}
                  className="mt-2 text-[var(--color-mark-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--color-blaze)]"
                >
                  {cross.label}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <p className="max-w-[66ch] text-[13px] leading-relaxed text-[var(--color-mark-faint)]">
              Сроки в расписании - медианы по нашей базе на самом быстром
              режиме, а не обязательство: в перегретых нишах те же события
              наступают позже. Цифры демонстрационные. Усиление поведенческих
              сигналов не входит в число методов, одобренных Яндексом: мы не
              гарантируем позиции и не обещаем отсутствия реакции поисковой
              системы.
            </p>
            <p className="plate shrink-0">
              {SITE.domain} &middot; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
