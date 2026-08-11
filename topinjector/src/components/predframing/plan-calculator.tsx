"use client";

import { useRef, useState } from "react";

import { track } from "@/diagnostic/analytics";
import { ManualInputPlaceholder } from "./manual-input";

/*
  Калькулятор блока 12 (ТЗ 1.2 + п.53A.11 нового мастер-промпта).

  Интерфейс калькулятора проектировать можно и нужно — поля, ползунки, шаг
  расчёта. Но п.53A.11 прямо запрещает заполнять результат вымышленным числом,
  даже основанным на трёх реально опубликованных тарифах: у продукта нет
  подтверждённой формулы «цена за произвольный объём», только три фиксированных
  пакета. Поэтому результат — не число, а технический плейсхолдер: сумма
  появится, когда появится сама формула, а не подбором ближайшего тарифа.
*/

export function PlanCalculator() {
  const [projects, setProjects] = useState(1);
  const [queries, setQueries] = useState(10);
  /* Событие «пользователь начал считать» фиксируется один раз, а не на каждый пиксель ползунка. */
  const used = useRef(false);
  const onUse = () => {
    if (used.current) return;
    used.current = true;
    track("calculator_use", { hypothesis: "loss_advantage" });
  };

  return (
    <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-[1.1fr_0.9fr]">
      <div className="bg-[var(--inset)] p-7 sm:p-8">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="calc-projects" className="text-[14px] text-[var(--ink-soft)]">
              Количество проектов
            </label>
            <span className="num text-[19px] font-semibold">{projects}</span>
          </div>
          <input
            id="calc-projects"
            type="range"
            min={1}
            max={20}
            step={1}
            value={projects}
            onChange={(e) => {
              setProjects(Number(e.target.value));
              onUse();
            }}
            className="mt-2 w-full"
          />
        </div>

        <div className="mt-6 border-t border-[var(--rule-soft)] pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="calc-queries" className="text-[14px] text-[var(--ink-soft)]">
              Количество запросов
            </label>
            <span className="num text-[19px] font-semibold">{queries}</span>
          </div>
          <input
            id="calc-queries"
            type="range"
            min={10}
            max={500}
            step={10}
            value={queries}
            onChange={(e) => {
              setQueries(Number(e.target.value));
              onUse();
            }}
            className="mt-2 w-full"
          />
        </div>

        <p className="mt-6 max-w-[40ch] text-[12px] leading-relaxed text-[var(--ink-faint)]">
          Объём для расчёта: {projects}{" "}
          {projects === 1 ? "проект" : "проектов"}, {queries} запросов.
        </p>
      </div>

      <ManualInputPlaceholder
        materialType="Формула калькулятора"
        need={
          <>
            Реальная тарифная формула Topinjector для произвольного объёма
            (сейчас опубликовано только три фиксированных пакета — см.
            тарифы ниже).
          </>
        }
        source="Тарифная политика Topinjector"
        readyWhen="Формула подтверждена и подключена к полям слева"
        className="justify-center"
      />
    </div>
  );
}
