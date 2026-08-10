"use client";

import { Breakout, Fade, FadeItem } from "./prose";

/*
  Схемы гипотезы №2 «Информационное преимущество» — по новому ТЗ
  (ТЗредактирование/NEW_..._гипотеза_№2_Информационное.docx).

  Прежние схемы этого файла (MonitorField, AdvantageWindow, InfoFilter,
  CriteriaGrid на 4 признака) относились к старой архитектуре статьи и не
  совпадают с текущим ТЗ дизайнеру (маршрут A/B в Hero, схема «потребление
  vs производство» в блоке 2, пять критериев в блоке 3) — заменены полностью,
  тем же визуальным языком, что и schemas.tsx гипотезы №1: акцент размечает
  данные, второй ряд — приглушённые чернила, зелёный на схемах не появляется.
*/

/**
 * Визуал Hero: один и тот же сигнал приходит нескольким специалистам сразу.
 * ТЗ прямо запрещает объявлять «победителя» — маршруты набраны одним весом,
 * различие только в наличии собственных данных на конце маршрута B. Маркер
 * Topinjector — отдельная строка снизу, а не третий маршрут.
 */
export function RouteSplit() {
  const ROWS: { title: string; steps: string[] }[] = [
    { title: "Маршрут A", steps: ["Прочитал", "Сохранил", "Наблюдает"] },
    { title: "Маршрут B", steps: ["Прочитал", "Выбрал задачу", "Проверил", "Получил данные"] },
  ];

  return (
    <figure className="border border-[var(--rule-soft)] bg-[var(--reading-bg)] p-6 sm:p-8">
      <p className="label text-[var(--ink-faint)]">один и тот же сигнал</p>

      <div className="mt-7 grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        {ROWS.map((row, ri) => (
          <Fade key={row.title} delay={ri * 0.1} className="cell">
            <div className="h-full p-5 sm:p-6">
              <p className="text-[14px] font-semibold tracking-[-0.01em] text-[var(--ink)] sm:text-[15px]">
                {row.title}
              </p>
              <ol className="mt-5 flex flex-col items-start">
                {row.steps.map((s, i) => (
                  <FadeItem key={s} delay={0.1 + i * 0.08} className="w-full">
                    {i > 0 && (
                      <span aria-hidden="true" className="ml-[8px] block h-4 w-px bg-[var(--rule)]" />
                    )}
                    <span className="inline-flex items-center gap-3 text-[14px] leading-snug text-[var(--ink-soft)] sm:text-[15px]">
                      <span
                        aria-hidden="true"
                        className="ml-[5px] block h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--ink-faint)]"
                      />
                      {s}
                    </span>
                  </FadeItem>
                ))}
              </ol>
            </div>
          </Fade>
        ))}
      </div>

      <Fade delay={0.34}>
        <div className="mt-px flex items-center gap-3 border border-t-0 border-[var(--rule-soft)] bg-[var(--inset)] p-5 sm:p-6">
          <span aria-hidden="true" className="block h-[3px] w-6 shrink-0 bg-[var(--accent)]" />
          <p className="text-[13px] leading-snug text-[var(--ink-soft)] sm:text-[14px]">
            <span className="font-semibold text-[var(--ink)]">Topinjector</span> — сигнал →
            проверка → данные
          </p>
        </div>
      </Fade>

      <figcaption className="mt-6 border-t border-[var(--rule-soft)] pt-5 text-[13px] leading-relaxed text-[var(--ink-faint)] sm:text-[14px]">
        Оба узнали одно и то же. Разница появляется не в моменте получения
        сигнала, а дальше — в том, у кого есть собственные данные.
      </figcaption>
    </figure>
  );
}

/**
 * Блок 2: «потребление информации» против «производства собственного вывода».
 * Пять одинаковых по длине шагов в обеих колонках — ТЗ требует именно
 * параллельную структуру, а не более длинную «правильную» колонку.
 */
export function ConsumptionVsProduction() {
  const COLUMNS: { title: string; accent: boolean; steps: string[] }[] = [
    { title: "Потребление информации", accent: false, steps: ["Сигнал", "Статья", "Обсуждение", "Чужой кейс", "Мнение"] },
    { title: "Производство собственного вывода", accent: true, steps: ["Сигнал", "Отбор", "Ограниченная проверка", "Собственные данные", "Решение"] },
  ];

  return (
    <Breakout>
      <figure>
        <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
          {COLUMNS.map((col, ci) => (
            <Fade key={col.title} delay={ci * 0.1} className="cell">
              <div className={`h-full p-6 sm:p-8 ${col.accent ? "border-l-2 border-[var(--accent)]" : ""}`}>
                <p className={`label ${col.accent ? "text-[var(--accent)]" : "text-[var(--ink-faint)]"}`}>
                  {col.title}
                </p>
                <ol className="mt-6 flex flex-col items-start">
                  {col.steps.map((s, i) => (
                    <FadeItem key={s} delay={0.1 + i * 0.07} className="w-full">
                      {i > 0 && (
                        <span aria-hidden="true" className="ml-[8px] block h-5 w-px bg-[var(--rule)]" />
                      )}
                      <span
                        className={`inline-flex items-center gap-3.5 text-[16px] leading-snug sm:text-[17px] ${
                          col.accent ? "text-[var(--ink)]" : "text-[var(--ink-faint)]"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="ml-[5px] block h-[7px] w-[7px] shrink-0 rounded-full"
                          style={{ backgroundColor: col.accent ? "var(--accent)" : "var(--ink-faint)" }}
                        />
                        {s}
                      </span>
                    </FadeItem>
                  ))}
                </ol>
              </div>
            </Fade>
          ))}
        </div>
      </figure>
    </Breakout>
  );
}

/** Одна карточка из пяти критериев сильной гипотезы. */
function CriterionCard({
  index,
  title,
  detail,
}: {
  index: number;
  title: string;
  detail: string;
}) {
  return (
    <Fade delay={index * 0.06} className="cell">
      <div className="h-full p-6 sm:p-7">
        <span className="num text-[11px] text-[var(--ink-faint)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="mt-4 text-[17px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[18px]">
          {title}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-soft)] sm:text-[15px]">
          {detail}
        </p>
      </div>
    </Fade>
  );
}

/**
 * Пять критериев гипотезы, которую имеет смысл проверить (блок 3). ТЗ
 * требует desktop-раскладку 3+2 и не растягивать блок по высоте — поэтому
 * сетка на три колонки, а не квадрат 2×2 с одним лишним элементом.
 */
export function CriteriaFive() {
  const ITEMS = [
    {
      title: "Понятная рабочая ценность",
      detail: "Можно заранее объяснить, какую часть процесса она потенциально улучшает.",
    },
    {
      title: "Измеримый результат",
      detail: "До запуска понятно, что именно будет наблюдаться.",
    },
    {
      title: "Ограниченный риск",
      detail: "Тест не требует переноса всего клиентского портфеля.",
    },
    {
      title: "Достаточно короткий цикл",
      detail: "Первые полезные данные можно получить за разумный для этой задачи период.",
    },
    {
      title: "Применимость к реальной работе",
      detail: "Гипотеза проверяется не в идеальном демо, а на задаче, похожей на ежедневную работу специалиста.",
    },
  ];

  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
        {ITEMS.map((item, i) => (
          <CriterionCard key={item.title} index={i} title={item.title} detail={item.detail} />
        ))}
      </div>
    </Breakout>
  );
}
