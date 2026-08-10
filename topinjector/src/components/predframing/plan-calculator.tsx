"use client";

import { useMemo, useRef, useState } from "react";

import { track } from "@/diagnostic/analytics";
import { PLANS } from "@/landing/config";
import { groupDigits } from "@/format";

/*
  Калькулятор блока 12 (ТЗ 1.2). Реальной формулы «цена за единицу» в продукте
  нет — есть три опубликованных тарифа с фиксированными лимитами проектов и
  запросов (те же `PLANS`, что и на /service, /universal). П.31 мастер-промпта
  прямо запрещает придумывать формулу вместо продукта: поэтому калькулятор не
  считает произвольную цену, а подбирает подходящий опубликованный тариф по
  введённому объёму — это расчёт на реальных данных, а не декоративный
  лид-магнит.
*/

const CAPS = [
  { id: PLANS[0].id, projects: 3, queries: 50 },
  { id: PLANS[1].id, projects: 10, queries: 300 },
] as const;

function planFor(projects: number, queries: number) {
  const fit = CAPS.find((c) => projects <= c.projects && queries <= c.queries);
  const plan = PLANS.find((p) => p.id === (fit?.id ?? "team"))!;
  return plan;
}

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

  const plan = useMemo(() => planFor(projects, queries), [projects, queries]);
  const numeric = /^[\d\s ]+$/.test(plan.price);

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
          Расчёт подбирает ближайший из опубликованных тарифов по введённому
          объёму. Формула цены за один запрос вне тарифов пока не опубликована.
        </p>
      </div>

      <div className="flex flex-col justify-between bg-[var(--inset)] p-7 sm:p-8">
        <div>
          <p className="label text-[var(--ink-faint)]">подходящий тариф</p>
          <p className="mt-4 text-[19px] font-semibold tracking-[-0.02em] text-[var(--ink)]">
            {plan.name}
          </p>

          <p className="num mt-5 flex items-baseline gap-2 text-[36px] leading-none font-semibold sm:text-[44px]">
            {numeric ? (
              <>
                {groupDigits(plan.price)}
                <span className="text-[16px] text-[var(--ink-faint)]">₽ в месяц</span>
              </>
            ) : (
              <span className="text-[24px]">{plan.price}</span>
            )}
          </p>

          <ul className="mt-6 flex flex-col gap-2 border-t border-[var(--rule-soft)] pt-5">
            {plan.features.map((f) => (
              <li key={f} className="text-[14px] leading-snug text-[var(--ink-soft)]">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
