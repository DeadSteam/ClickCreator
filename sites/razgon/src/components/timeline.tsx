"use client";

import { useEffect, useRef, useState } from "react";

import { STAGES } from "@/lib/content";
import { track } from "@/lib/analytics";

/*
  Расписание по суткам. Главный механизм сайта.

  Слева висит счётчик текущих суток и меняется по мере прокрутки - это и есть
  заявленное движение. Ничего не едет, не мигает и не масштабируется: меняется
  только число и цвет отметки. Любое шевеление залипшего блока при прокрутке
  читается как подёргивание интерфейса, а не как скорость.

  Активные сутки определяются не по формуле от scrollY, а наблюдателем
  пересечений с узкой полосой посреди экрана. Подсчёт вручную заставлял бы
  читать геометрию на каждом кадре прокрутки, и на телефоне это первое, что
  начинает тормозить.
*/
const pad = (n: number) => String(n).padStart(2, "0");

export function Timeline() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);
  /* Какие сутки уже отправляли в аналитику: событие на каждый шаг, но по разу. */
  const seen = useRef(new Set<number>());

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (Number.isNaN(idx)) continue;

          setActive(idx);

          const day = STAGES[idx].day;
          if (!seen.current.has(day)) {
            seen.current.add(day);
            track("proof_view", { widget: "timeline", day });
          }
        }
      },
      /*
        Полоса высотой в четверть экрана посередине. Порог 0 и узкое окно
        вместо threshold: длинный блок никогда не пересечёт экран на 50
        процентов, и порог по площади для него просто не сработает.
      */
      { rootMargin: "-38% 0px -50% 0px", threshold: 0 },
    );

    for (const el of items.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-[11rem_1fr] lg:gap-14">
      {/* Счётчик суток. Виден только на широком экране: на телефоне номер
          суток стоит прямо в заголовке каждого шага. */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <span className="plate block">сутки</span>
          <p className="day now mt-3 text-[86px]">{pad(STAGES[active].day)}</p>

          {/* Деления шкалы. Пройденные закрашены, текущее - алое. */}
          <ol className="mt-8 flex flex-col gap-2.5" aria-hidden>
            {STAGES.map((s, i) => (
              <li key={s.day} className="flex items-center gap-3">
                <span
                  className="block h-px"
                  style={{
                    width: i === active ? "2.5rem" : i < active ? "1.5rem" : "0.75rem",
                    backgroundColor:
                      i === active
                        ? "var(--color-blaze)"
                        : i < active
                          ? "var(--color-mark)"
                          : "var(--color-rule)",
                    transition:
                      "width var(--t-panel) var(--ease-drive), background-color var(--t-panel) var(--ease-drive)",
                  }}
                />
                <span
                  className={`day text-[13px] ${
                    i === active
                      ? "text-[var(--color-blaze)]"
                      : i < active
                        ? "text-[var(--color-mark)]"
                        : "text-[var(--color-mark-faint)]"
                  }`}
                >
                  {pad(s.day)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="border-t border-[var(--color-mark)]">
        {STAGES.map((s, i) => (
          <section
            key={s.day}
            data-idx={i}
            ref={(el) => {
              items.current[i] = el;
            }}
            aria-labelledby={`stage-${s.day}`}
            className="border-b border-[var(--color-rule-hair)] py-12 sm:py-16"
          >
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="plate">сутки</span>
              <span className="day text-[40px] lg:hidden">{pad(s.day)}</span>
            </div>

            <h2
              id={`stage-${s.day}`}
              className="mt-4 max-w-[14ch] text-[42px] sm:text-[62px] lg:text-[76px]"
            >
              {s.t}
            </h2>

            <div className="mt-7 grid gap-x-12 gap-y-6 lg:grid-cols-2">
              <p className="max-w-[48ch] text-[17px] leading-relaxed text-[var(--color-mark-soft)]">
                {s.d}
              </p>

              {/*
                Чего на этих сутках НЕ происходит. Половина ценности всего
                расписания: именно здесь страница отличается от категории,
                которая обещает всё и сразу. Отмечена алой чертой слева - тем
                же цветом, что и текущие сутки, потому что это то же самое
                утверждение о времени.
              */}
              <p className="max-w-[46ch] border-l-2 border-[var(--color-blaze)] pl-5 text-[16px] leading-relaxed">
                {s.not}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
