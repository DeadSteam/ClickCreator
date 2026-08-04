"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { RATES, VOLUME, discountFor } from "@/lib/content";
import { track, trackOnView } from "@/lib/analytics";

/*
  Расчёт бюджета.

  Весь этот сайт устроен на дискретных ступенях - трое суток, седьмые,
  двадцать первые, три скорости, - и непрерывный ползунок выпадал бы из его
  логики. Поэтому объём и скорость выбираются сегментными переключателями:
  четыре размера проекта и три режима, всё видно сразу, ничего не прячется
  под бегунком.

  Побочная выгода: соседние ступени объёма остаются на экране, и видно, что
  следующая даёт скидку крупнее. Ползунок показал бы одно значение.

  Число форматируем вручную, а не через Intl.NumberFormat: Node и браузер
  разводят разделитель разрядов для ru-RU, серверная отрисовка перестаёт
  совпадать с клиентской, и React перерисовывает поддерево с предупреждением.
  Разделитель - узкий неразрывный пробел: обычный переносится на новую строку
  и рвёт число пополам.
*/
const money = (n: number) => {
  const s = Math.round(n).toString();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += " ";
    out += s[i];
  }
  return out;
};

const SIZES = [30, 100, 250, 500] as const;

export function Budget() {
  const [size, setSize] = useState(1);
  const [plan, setPlan] = useState(2);

  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  useEffect(() => trackOnView(ref.current, "pricing_view"), []);

  const calc = useMemo(() => {
    const phrases = SIZES[size];
    const off = discountFor(phrases);
    const perDay = phrases * RATES[plan].rate * (1 - off);
    return { phrases, off, perDay, perMonth: perDay * 30 };
  }, [size, plan]);

  const pick = (fn: () => void, what: string) => {
    fn();
    if (!touched.current) {
      touched.current = true;
      track("calc_interact", { widget: "budget" });
    }
    track("calc_result", {
      widget: "budget",
      what,
      phrases: SIZES[size],
      plan: RATES[plan].plan,
    });
  };

  const seg = (active: boolean) =>
    `min-h-[54px] cursor-pointer px-6 font-[family-name:var(--font-tight)] text-[20px] font-extrabold uppercase
     [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro)]
     ${
       active
         ? "bg-[var(--color-blaze)] text-[var(--color-field)]"
         : "bg-[var(--color-field)] text-[var(--color-mark-soft)] hover:bg-[var(--color-field-edge)]"
     }`;

  const next = VOLUME.find((v) => v.from > calc.phrases);

  return (
    <div ref={ref}>
      <div className="flex flex-col gap-10">
        <div>
          <span className="block text-[18px] text-[var(--color-mark-soft)]">
            Фраз в работе
          </span>
          {/*
            Радиогруппа, а не набор переключателей: выбор взаимоисключающий,
            и aria-pressed сказал бы «кнопка нажата» вместо «выбрано 1 из 4».
          */}
          <div
            role="radiogroup"
            aria-label="Фраз в работе"
            className="mt-4 flex flex-wrap gap-px bg-[var(--color-rule-soft)]"
          >
            {SIZES.map((n, i) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={i === size}
                onClick={() => pick(() => setSize(i), "size")}
                className={seg(i === size)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-[18px] text-[var(--color-mark-soft)]">
            Скорость
          </span>
          <div
            role="radiogroup"
            aria-label="Скорость"
            className="mt-4 flex flex-wrap gap-px bg-[var(--color-rule-soft)]"
          >
            {RATES.map((r, i) => (
              <button
                key={r.plan}
                type="button"
                role="radio"
                aria-checked={i === plan}
                onClick={() => pick(() => setPlan(i), "plan")}
                className={seg(i === plan)}
              >
                {r.plan}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-[var(--color-mark)] pt-10">
        <p className="flex flex-wrap items-baseline gap-x-5">
          <span className="day text-[clamp(52px,8vw,88px)] text-[var(--color-blaze)]">
            {money(calc.perDay)}
          </span>
          <span className="text-[21px] text-[var(--color-mark-soft)]">
            ₽ в сутки
          </span>
        </p>

        <p className="mt-6 max-w-[56ch] text-[19px] leading-relaxed text-[var(--color-mark-soft)]">
          Это {money(calc.perMonth)} ₽ за месяц при полном расходе. Списывается
          за фактические переходы, поэтому в месяц с недобором выйдет меньше.
          Первые сдвиги в этом режиме обычно видны через {RATES[plan].window}.
          {calc.off > 0
            ? ` Скидка за объём ${Math.round(calc.off * 100)} процентов уже учтена.`
            : ""}
          {next
            ? ` От ${next.from} фраз скидка составит ${Math.round(next.off * 100)} процентов.`
            : ""}
        </p>
      </div>
    </div>
  );
}
