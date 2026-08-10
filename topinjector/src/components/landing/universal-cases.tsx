"use client";

import { Appear } from "./sections";
import type { CASE_GRID, FEATURED_CASE } from "@/landing/universal";

/*
  Кейсы основного лендинга (п.13 ТЗ). Структура карточки повторяет ту, что ТЗ
  задаёт прямым текстом: проект, регион, задача, исходная точка, период,
  действия, динамика, результат, ограничения, вывод. Вывод — не «сервис
  лучший», а «в этом сценарии инструмент показал преимущество…»: п.13 ТЗ
  требует именно такую формулировку.
*/

export function FeaturedCase({ data }: { data: typeof FEATURED_CASE }) {
  return (
    <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-[1fr_1fr]">
      <Appear className="cell p-7 sm:p-8">
        <p className="label text-[var(--ink-faint)]">ситуация</p>

        <dl className="mt-5 flex flex-col border-t border-[var(--rule-soft)] pt-5">
          {[
            ["Проект", data.project],
            ["Регион", data.region],
            ["Задача", data.task],
            ["Исходная точка", data.start],
            ["Период", data.period],
            ["Действия", data.actions],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex flex-col gap-1 border-t border-[var(--rule-soft)] py-3 first:border-t-0 first:pt-0"
            >
              <dt className="label text-[var(--ink-faint)]">{k}</dt>
              <dd className="max-w-[42ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">{v}</dd>
            </div>
          ))}
        </dl>
      </Appear>

      <Appear delay={0.1} className="cell p-7 sm:p-8">
        <p className="label text-[var(--ink-faint)]">динамика</p>

        <ul className="mt-5 flex flex-col">
          {data.dynamics.map((d) => (
            <li
              key={d.day}
              className="flex items-baseline justify-between gap-4 border-t border-[var(--rule-soft)] py-3 first:border-t-0 first:pt-0"
            >
              <span className="label shrink-0 text-[var(--ink-faint)]">{d.day}</span>
              <span className="max-w-[28ch] text-right text-[13px] leading-snug text-[var(--ink-soft)]">
                {d.value}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-7 border-t border-[var(--rule-soft)] pt-6 text-[15px] leading-relaxed text-[var(--ink)]">
          {data.conclusion}
        </p>

        <p className="mt-6 text-[13px] leading-relaxed text-[var(--ink-faint)]">
          Ограничения кейса: {data.limits}
        </p>
      </Appear>
    </div>
  );
}

export function CaseGrid({ items }: { items: readonly (typeof CASE_GRID)[number][] }) {
  return (
    <div className="mt-14 grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
      {items.map((c, i) => (
        <Appear key={c.niche} delay={Math.min(i, 4) * 0.06} className="cell">
          <article className="h-full p-6 sm:p-7">
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="text-[16px] font-semibold tracking-[-0.02em]">{c.niche}</h4>
              <span className="label text-[var(--ink-faint)]">{c.region}</span>
            </div>

            <p className="mt-3 text-[14px] leading-snug text-[var(--ink-soft)]">{c.task}</p>

            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-[var(--rule-soft)] pt-4">
              <div>
                <dt className="label text-[var(--ink-faint)]">период</dt>
                <dd className="mt-1 text-[13px] text-[var(--ink-soft)]">{c.period}</dd>
              </div>
              <div>
                <dt className="label text-[var(--ink-faint)]">вывод</dt>
                <dd className="mt-1 text-[13px] font-medium text-[var(--ink)]">{c.outcome}</dd>
              </div>
            </dl>
          </article>
        </Appear>
      ))}
    </div>
  );
}
