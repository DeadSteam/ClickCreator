"use client";

import { Appear } from "./sections";
import { ordinal } from "@/format";
import type { COMPARE_ROWS, PRODUCT_SCREENS, SUITABILITY } from "@/landing/universal";

/*
  Структурные блоки основного лендинга /universal, специфичные для его ТЗ:
  таблица сравнения (п.9), три категории применимости (п.8) и иллюстративные
  экраны кабинета (п.16). Сгруппированы в одном файле по тому же принципу, что
  и `sections.tsx` — это язык одной страницы, а не примитивы всего сайта.
*/

/**
 * Таблица сравнения текущего процесса с проверяемым (п.9 ТЗ). Требование ТЗ
 * прямое: не заполнять колонку текущего процесса негативными утверждениями и
 * не объявлять новый подход победителем — обе колонки набраны одним весом,
 * без зачёркиваний и крестов.
 */
export function CompareTable({ rows }: { rows: readonly (typeof COMPARE_ROWS)[number][] }) {
  return (
    <Appear className="mt-14 overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse">
        <thead>
          <tr className="border-b border-[var(--rule)] text-left">
            <th className="label pb-4 pr-4 font-normal text-[var(--ink-faint)]">критерий</th>
            <th className="label pb-4 pr-4 font-normal text-[var(--ink-faint)]">текущий процесс</th>
            <th className="label pb-4 font-normal text-[var(--accent)]">проверяемый процесс</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.criterion} className="border-b border-[var(--rule-soft)]">
              <th scope="row" className="py-4 pr-4 text-left text-[15px] font-medium text-[var(--ink)]">
                {r.criterion}
              </th>
              <td className="py-4 pr-4 text-[15px] text-[var(--ink-soft)]">{r.current}</td>
              <td className="py-4 text-[15px] font-medium text-[var(--ink)]">{r.tested}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Appear>
  );
}

/** Одна категория применимости внутри {@link SuitabilityGrid}. */
function SuitabilityColumn({
  data,
  weight,
  delay,
}: {
  data: (typeof SUITABILITY)[keyof typeof SUITABILITY];
  weight: "strong" | "neutral" | "faint";
  delay: number;
}) {
  return (
    <Appear delay={delay} className="cell">
      <div
        className={`h-full p-6 sm:p-7 ${weight === "strong" ? "border-l-2 border-[var(--accent)]" : ""}`}
      >
        <p className="label" style={{ color: weight === "strong" ? "var(--accent)" : "var(--ink-faint)" }}>
          {data.title}
        </p>
        <p className="mt-2 text-[13px] leading-snug text-[var(--ink-faint)]">{data.caption}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {data.items.map((t) => (
            <li
              key={t}
              className={`text-[14px] leading-snug ${
                weight === "faint" ? "text-[var(--ink-faint)]" : "text-[var(--ink-soft)]"
              }`}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Appear>
  );
}

/** Три категории применимости: подходит / требует оценки / не рекомендуется (п.8 ТЗ). */
export function SuitabilityGrid({ data }: { data: typeof SUITABILITY }) {
  return (
    <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-3">
      <SuitabilityColumn data={data.fits} weight="strong" delay={0} />
      <SuitabilityColumn data={data.review} weight="neutral" delay={0.08} />
      <SuitabilityColumn data={data.notRecommended} weight="faint" delay={0.16} />
    </div>
  );
}

/**
 * Иллюстративные экраны кабинета (п.16 ТЗ). Не скриншоты и не претендуют на
 * реалистичность — каркасная схема экрана (подпись строк, не пиксели), плюс
 * короткое объяснение, какое решение экран поддерживает: ТЗ прямо требует
 * именно это, а не длинную галерею.
 */
export function ProductScreens({ items }: { items: readonly (typeof PRODUCT_SCREENS)[number][] }) {
  return (
    <div className="mt-14 grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => (
        <Appear key={s.t} delay={Math.min(i, 5) * 0.06} className="cell">
          <div className="flex h-full flex-col p-6 sm:p-7">
            <span className="num text-[11px] text-[var(--ink-faint)]">{ordinal(i)}</span>
            <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.02em]">{s.t}</h3>

            {/* Каркас экрана: подписанные строки вместо картинки кабинета. */}
            <div
              role="img"
              aria-label={`Схема экрана «${s.t}»: ${s.rows.join(", ")}`}
              className="mt-5 flex flex-col gap-1.5 border border-[var(--rule-soft)] bg-[var(--inset)] p-3"
            >
              {s.rows.map((r) => (
                <span
                  key={r}
                  className="border-l-2 border-[var(--rule)] bg-[var(--page-bg)] px-2.5 py-2 text-[12px] leading-snug text-[var(--ink-faint)]"
                >
                  {r}
                </span>
              ))}
            </div>

            <p className="mt-5 text-[13px] leading-relaxed text-[var(--ink-soft)]">{s.supports}</p>
          </div>
        </Appear>
      ))}
    </div>
  );
}
