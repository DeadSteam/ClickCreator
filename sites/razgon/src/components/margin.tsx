"use client";

import { useEffect, useRef, useState } from "react";

import { track, trackOnView } from "@/lib/analytics";

/*
  Маржа по ступеням.

  Ползунка здесь нет. Весь этот сайт устроен на дискретных ступенях - трое
  суток, седьмые, четырнадцатые, три скорости, - и непрерывный ползунок
  выпадал бы из его логики. Наценка выбирается тем же сегментным
  переключателем, что и скорость на главной, а закупки перечислены строками:
  видно сразу все размеры проектов, а не одно значение под бегунком.

  Побочная выгода: строк пять, и глаз сравнивает их между собой. Ползунок
  показал бы одну цифру и спрятал остальные - как раз то, чего не нужно
  человеку, который выбирает, с каким объёмом заходить.

  Число форматируем вручную, а не через Intl.NumberFormat: Node и браузер
  разводят разделитель разрядов для ru-RU, серверная отрисовка перестаёт
  совпадать с клиентской, и React перерисовывает поддерево с предупреждением.
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

const BUY = [10000, 25000, 50000, 100000, 200000] as const;
const MARKUP = [1.5, 2, 3] as const;

export function Margin() {
  const [markup, setMarkup] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  useEffect(() => trackOnView(ref.current, "pricing_view"), []);

  const pick = (i: number) => {
    setMarkup(i);
    if (!touched.current) {
      touched.current = true;
      track("calc_interact", { widget: "margin" });
    }
    track("calc_result", { widget: "margin", markup: MARKUP[i] });
  };

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <span className="text-[18px] text-[var(--color-mark-soft)]">Ваша наценка</span>

        <div role="radiogroup" aria-label="Наценка" className="flex flex-wrap gap-px bg-[var(--color-rule-soft)]">
          {MARKUP.map((m, i) => {
            const active = i === markup;
            return (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => pick(i)}
                className={`min-h-[48px] cursor-pointer px-6 py-3
                  font-[family-name:var(--font-tight)] text-[22px] font-extrabold uppercase
                  [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro)]
                  ${
                    active
                      ? "bg-[var(--color-blaze)] text-[var(--color-field)]"
                      : "bg-[var(--color-field)] text-[var(--color-mark-soft)] hover:bg-[var(--color-field-edge)]"
                  }`}
              >
                &times;{String(m).replace(".", ",")}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 border-t border-[var(--color-mark)]">
        <div
          aria-hidden
          className="grid grid-cols-[1fr_1fr_1fr] gap-x-6 border-b border-[var(--color-rule-soft)] py-5"
        >
          <span className="text-[17px] text-[var(--color-mark-soft)]">Закупка</span>
          <span className="text-right text-[17px] text-[var(--color-mark-soft)]">Чек клиента</span>
          <span className="text-right text-[17px] text-[var(--color-mark-soft)]">Ваша прибыль</span>
        </div>

        {BUY.map((b) => (
          <div
            key={b}
            className="grid grid-cols-[1fr_1fr_1fr] items-baseline gap-x-6 border-b border-[var(--color-rule-soft)] py-6"
          >
            <span className="day text-[20px] text-[var(--color-mark-soft)] sm:text-[24px]">
              {money(b)}
            </span>
            <span className="day text-right text-[20px] text-[var(--color-mark-soft)] sm:text-[24px]">
              {money(b * MARKUP[markup])}
            </span>
            {/*
              Прибыль набрана сигнальным цветом и крупнее соседей: это то
              единственное число, ради которого агентство открыло страницу.
            */}
            <span className="day text-right text-[24px] text-[var(--color-blaze)] sm:text-[30px]">
              {money(b * MARKUP[markup] - b)}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-[58ch] text-[18px] leading-relaxed text-[var(--color-mark-soft)]">
        Закупка списывается за фактические переходы, поэтому в месяц с
        недобором вы платите меньше, а чек клиенту выставляете прежний.
        Верхнюю границу наценки мы не устанавливаем и не проверяем: цифры в
        переключателе распространены на рынке, а не предписаны нами.
      </p>
    </div>
  );
}
