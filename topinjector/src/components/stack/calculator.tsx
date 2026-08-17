"use client";

import { useRef, useState } from "react";

import { ManualInputPlaceholder } from "@/components/predframing/manual-input";
import { plural } from "@/format";
import { stackTrack } from "@/stack/attribution";

/*
  Калькулятор блока 12 ТЗ. Оплата за клик — подтверждённая модель (разд. 13
  ТЗ), но формулы «цена за клик» и «расчётный расход» отмечены ⚠ REAL FORMULA:
  считать несуществующую цену нельзя, поэтому поля собирают объём (запросы,
  планируемые клики), а результат — заметный технический плейсхолдер, как и в
  `predframing/plan-calculator.tsx`.
*/
export function StackCalculator() {
  const [queries, setQueries] = useState(10);
  const [clicks, setClicks] = useState(3000);
  const used = useRef(false);

  const onUse = () => {
    if (used.current) return;
    used.current = true;
    stackTrack("calculator_use", "calculator");
  };

  return (
    <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-[1.1fr_0.9fr]">
      <div className="bg-[var(--inset)] p-7 sm:p-8">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="stack-calc-queries" className="text-[16px] text-[var(--ink-soft)]">
              Запросов в тесте
            </label>
            <span className="num text-[24px] font-bold tracking-[-0.02em]">{queries}</span>
          </div>
          <input
            id="stack-calc-queries"
            type="range"
            min={1}
            max={100}
            step={1}
            value={queries}
            onChange={(e) => {
              setQueries(Number(e.target.value));
              onUse();
            }}
            className="mt-2 w-full"
          />
        </div>

        <div className="mt-6 border-t border-[var(--rule-soft)] pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="stack-calc-clicks" className="text-[16px] text-[var(--ink-soft)]">
              Планируемый объём кликов
            </label>
            <span className="num text-[24px] font-bold tracking-[-0.02em]">{clicks.toLocaleString("ru-RU")}</span>
          </div>
          <input
            id="stack-calc-clicks"
            type="range"
            min={3000}
            max={100000}
            step={1000}
            value={clicks}
            onChange={(e) => {
              setClicks(Number(e.target.value));
              onUse();
            }}
            className="mt-2 w-full"
          />
        </div>

        {/*
          Число и его величина не разлучаются переносом.

          Строка набиралась как сплошной текст, и при двузначном числе
          запросов слово «кликов» уезжало на следующую строку — оставляя
          число в конце предыдущей без величины. Каждая пара обёрнута в
          неразрывный блок: перенос теперь возможен только между парами.

          Заодно склонение: «1 запрос», «2 запроса», «5 запросов». Прежняя
          развилка на два случая давала «2 запросов» на каждом втором
          положении ползунка.
        */}
        <p className="mt-7 max-w-[44ch] text-[15px] leading-relaxed text-[var(--ink-faint)]">
          Объём для расчёта:{" "}
          <span className="whitespace-nowrap">
            {queries} {plural(queries, "запрос", "запроса", "запросов")}
          </span>
          ,{" "}
          <span className="whitespace-nowrap">
            {clicks.toLocaleString("ru-RU")} {plural(clicks, "клик", "клика", "кликов")}
          </span>
          .
        </p>
      </div>

      <ManualInputPlaceholder
        materialType="Цена клика / расчётный расход"
        need="Реальная формула стоимости клика для Topinjector (разд. 12 ТЗ). Сейчас подтверждена только единица тарификации — клик, — без цены за неё."
        source="Тарифная политика Topinjector"
        readyWhen="Цена клика подтверждена и подключена к полям слева"
        className="justify-center"
      />
    </div>
  );
}
