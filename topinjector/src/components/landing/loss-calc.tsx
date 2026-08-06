"use client";

import { useState } from "react";

/*
  Калькулятор экономики (п.17 ТЗ): сравнивает стоимость сервиса не с другими
  инструментами, а с последствиями периода, в котором клиент не видит
  результата.

  Считает выручку под риском, а не «сколько вы заработаете». Это принципиально:
  обещать финансовый результат от использования сервиса запрещено, а показать
  цену уже происходящего — законно и честно.
*/

const FIELDS = [
  {
    id: "check",
    label: "Средний ежемесячный чек клиента",
    unit: "₽",
    min: 10000,
    max: 200000,
    step: 5000,
    initial: 45000,
  },
  {
    id: "months",
    label: "Средняя длительность работы",
    unit: "мес.",
    min: 1,
    max: 24,
    step: 1,
    initial: 6,
  },
  {
    id: "lost",
    label: "Клиентов, ушедших до основного результата за год",
    unit: "чел.",
    min: 0,
    max: 12,
    step: 1,
    initial: 3,
  },
] as const;

const money = (n: number) => new Intl.NumberFormat("ru-RU").format(Math.round(n));

export function LossCalc() {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(FIELDS.map((f) => [f.id, f.initial])),
  );

  const atRisk = values.check * values.months * values.lost;

  return (
    <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-[1.1fr_0.9fr]">
      <div className="bg-[var(--inset)] p-7 sm:p-8">
        {FIELDS.map((f) => (
          <div key={f.id} className="border-t border-[var(--rule-soft)] pt-5 first:border-t-0 first:pt-0 [&+div]:mt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <label htmlFor={f.id} className="max-w-[32ch] text-[14px] text-[var(--ink-soft)]">
                {f.label}
              </label>
              <span className="num text-[19px] font-semibold whitespace-nowrap">
                {money(values[f.id])}
                <span className="ml-1.5 text-[12px] text-[var(--ink-faint)]">{f.unit}</span>
              </span>
            </div>

            <input
              id={f.id}
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={values[f.id]}
              onChange={(e) =>
                setValues((v) => ({ ...v, [f.id]: Number(e.target.value) }))
              }
              className="mt-1 w-full"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-between bg-[var(--inset)] p-7 sm:p-8">
        <div>
          <p className="label text-[var(--ink-faint)]">потенциальная выручка под риском</p>
          <p className="num mt-5 text-[40px] leading-none font-semibold sm:text-[52px]">
            {money(atRisk)}
            <span className="ml-2 text-[20px] text-[var(--ink-faint)]">₽</span>
          </p>
          <p className="mt-5 max-w-[36ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
            Столько приносили бы за год клиенты, которые ушли раньше, чем
            стратегия успела показать результат. Сюда не входят бесплатные
            дополнительные работы, время на поиск замены и несостоявшиеся
            рекомендации.
          </p>
        </div>

        <p className="mt-8 text-[12px] leading-relaxed text-[var(--ink-faint)]">
          Расчёт является ориентировочным и не гарантирует финансового
          результата от использования сервиса.
        </p>
      </div>
    </div>
  );
}
