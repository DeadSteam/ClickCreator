"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { RATES, discountFor } from "@/lib/content";
import { track, trackOnView } from "@/lib/analytics";
import { Amount } from "./amount";

/*
  Расчёт.

  Прежняя версия показывала восемь чисел разом: расход, месяц, переходы, цену
  перехода, долю скидки, три ступени порогов и две полосы сравнения. Всё это
  правда, но человек, впервые открывший страницу, не может выбрать, на что
  смотреть, и не смотрит никуда.

  Здесь одно крупное число и два органа управления. Остальное - две строки
  подписи под ним. Ступени скидки, сравнение с контекстом и месячная сумма
  переехали в текст страницы, где им и место: это аргументы, а не показания.
*/

/**
 * Подсветка меняющегося числа.
 *
 * Горит акцентом, пока значение меняется, и гаснет через 600мс после
 * последнего изменения. Таймер сбрасывается на каждом шаге, поэтому при
 * протаскивании ползунка число горит непрерывно, а не мигает на каждом
 * пикселе - мигание читалось бы как сбой.
 */
function useLive(value: number) {
  const [live, setLive] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setLive(true);
    const id = setTimeout(() => setLive(false), 600);
    return () => clearTimeout(id);
  }, [value]);

  return live;
}

export function Meter() {
  const [phrases, setPhrases] = useState(120);
  const [speed, setSpeed] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  useEffect(() => trackOnView(ref.current, "pricing_view"), []);

  const calc = useMemo(() => {
    const mode = RATES[speed];
    const off = discountFor(phrases);
    const perDay = phrases * mode.rate * (1 - off);
    return { perDay, off, mode };
  }, [phrases, speed]);

  const live = useLive(Math.round(calc.perDay));

  const note = () => {
    if (touched.current) return;
    touched.current = true;
    track("calc_interact", { widget: "meter" });
  };

  useEffect(() => {
    if (!touched.current) return;
    const id = setTimeout(
      () =>
        track("calc_result", {
          widget: "meter",
          phrases,
          speed: calc.mode.plan,
          per_day: Math.round(calc.perDay),
        }),
      700,
    );
    return () => clearTimeout(id);
  }, [phrases, calc.mode.plan, calc.perDay]);

  return (
    <div ref={ref} className="panel px-7 py-8 sm:px-10 sm:py-10">
      {/* Число. Единственный крупный объект блока. */}
      <p className="flex flex-wrap items-baseline gap-x-4">
        <Amount
          value={calc.perDay}
          className={`num text-[clamp(52px,8vw,80px)] leading-none font-medium ${
            live ? "text-[var(--color-accent)]" : ""
          }`}
          style={{ transition: "color var(--t-base) var(--ease-soft)" }}
        />
        <span className="text-[19px] text-[var(--color-text-muted)]">
          ₽ в сутки
        </span>
      </p>

      <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-[var(--color-text-muted)]">
        Списывается за фактические переходы. Первые сдвиги на темпе
        &laquo;{calc.mode.plan.toLowerCase()}&raquo; обычно видны через{" "}
        {calc.mode.window}.
        {calc.off > 0
          ? ` Скидка за объём ${Math.round(calc.off * 100)} процентов уже учтена.`
          : ""}
      </p>

      {/* Управление. Два элемента, разделённые воздухом, а не линейкой. */}
      <div className="mt-10 flex flex-col gap-9">
        <div>
          <div className="flex items-baseline justify-between gap-6">
            <label htmlFor="m-phrases" className="text-[16px] text-[var(--color-text-muted)]">
              Фраз в работе
            </label>
            <output htmlFor="m-phrases" className="num text-[24px] font-medium">
              {phrases}
            </output>
          </div>
          <input
            id="m-phrases"
            type="range"
            min={10}
            max={800}
            step={10}
            value={phrases}
            onChange={(e) => {
              setPhrases(Number(e.target.value));
              note();
            }}
          />
        </div>

        <div>
          <span className="block text-[16px] text-[var(--color-text-muted)]">
            Темп
          </span>
          {/*
            Радиогруппа, а не набор переключателей: выбор взаимоисключающий,
            и aria-pressed сказал бы «кнопка нажата» вместо «выбрано 1 из 3».
          */}
          <div
            role="radiogroup"
            aria-label="Темп"
            className="mt-3 flex flex-wrap gap-2"
          >
            {RATES.map((s, i) => {
              const active = i === speed;
              return (
                <button
                  key={s.plan}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setSpeed(i);
                    note();
                  }}
                  className={`min-h-[48px] cursor-pointer rounded-[var(--radius-control)] px-6 text-[16px]
                    [transition:background-color_var(--t-fast)_var(--ease-soft),color_var(--t-fast)_var(--ease-soft)]
                    ${
                      active
                        ? "bg-[var(--color-text)] text-[var(--color-ink)]"
                        : "bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    }`}
                >
                  {s.plan}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
