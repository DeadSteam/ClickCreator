"use client";

import { Breakout, Fade } from "./prose";

/*
  Схемы гипотезы №6 «Скорость».

  Источник метафор — ТЗстраницы/2_6_..._Скорость.docx. Главное ограничение ТЗ:
  ни один маршрут или сектор не объявляется победителем заранее — только синим
  отмечается профессионально значимый исход, зелёный держится за фактически
  подтверждённый результат в другом месте системы. Правило FadeItem только
  внутри <ul>/<ol> соблюдено — везде Fade.
*/

/**
 * Два маршрута от общей стартовой точки («Рабочая гипотеза») до общей
 * конечной («Следующий профессиональный шаг» либо «Решение»). Один длиннее,
 * с зонами ожидания, другой короче — но ни один не подписан как «плохой»
 * или «хороший». Переиспользуется в Hero и в блоке 3 (Инструмент A / B).
 */
export function RouteCompare({
  startLabel,
  endLabel,
  routeALabel,
  routeA,
  routeBLabel,
  routeB,
}: {
  startLabel: string;
  endLabel: string;
  routeALabel: string;
  routeA: string[];
  routeBLabel: string;
  routeB: string[];
}) {
  return (
    <figure className="border border-[var(--rule-soft)] bg-[var(--reading-bg)] p-6 sm:p-8">
      <p className="label text-[var(--ink-faint)]">{startLabel} → {endLabel}</p>

      <div
        role="img"
        aria-label={`Два маршрута от «${startLabel}» до «${endLabel}». ${routeALabel}: ${routeA.join(" → ")}. ${routeBLabel}: ${routeB.join(" → ")}.`}
        className="mt-7 grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2"
      >
        {[
          { label: routeALabel, steps: routeA },
          { label: routeBLabel, steps: routeB },
        ].map((route, ri) => (
          <Fade key={route.label} delay={ri * 0.12} className="bg-[var(--inset)]">
            <div className="h-full p-5 sm:p-6">
              <p className="label text-[var(--ink-faint)]">{route.label}</p>
              <ol className="mt-4 flex flex-col items-start">
                {route.steps.map((s, i) => (
                  <li key={s} className="w-full">
                    {i > 0 && (
                      <span aria-hidden="true" className="ml-[6px] block h-4 w-px bg-[var(--rule)]" />
                    )}
                    <span className="inline-flex items-center gap-3 text-[14px] text-[var(--ink-soft)] sm:text-[15px]">
                      <span
                        aria-hidden="true"
                        className="ml-[3px] block h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--ink-faint)]"
                      />
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Fade>
        ))}
      </div>
    </figure>
  );
}

/** Одна карточка показателя скорости цикла. */
function MetricCard({ index, title, description }: { index: number; title: string; description: string }) {
  return (
    <Fade delay={index * 0.06} className="cell">
      <div className="h-full p-6 sm:p-7">
        <p className="label text-[var(--ink-faint)]">показатель {index + 1}</p>
        <p className="mt-4 text-[18px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[19px]">
          {title}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-soft)] sm:text-[15px]">{description}</p>
      </div>
    </Fade>
  );
}

/** Пять измеримых показателей скорости рабочего цикла. */
export function SpeedMetrics() {
  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
        <MetricCard
          index={0}
          title="Время до первых полезных данных"
          description="Не до первого изменения вообще, а до сигнала, который заслуживает профессионального внимания."
        />
        <MetricCard
          index={1}
          title="Время до устойчивого вывода"
          description="Сколько проходит времени, прежде чем закономерность можно отличить от случайного колебания."
        />
        <MetricCard
          index={2}
          title="Количество возвратов"
          description="Сколько раз приходится повторно открывать проект, перепроверять данные, ждать подтверждения."
        />
        <MetricCard
          index={3}
          title="Количество решений за цикл"
          description="Помогает ли инструмент перейти к следующему действию или только добавляет данные без вывода."
        />
        <MetricCard
          index={4}
          title="Качество сигнала"
          description="Насколько надёжны данные, появившиеся раньше — можно ли действовать без дополнительной проверки."
        />
      </div>
    </Breakout>
  );
}

/**
 * Матрица «скорость × надёжность» 2×2. Нужный сектор («быстро + надёжно»)
 * отмечен синим — акцентом данных, а не зелёным цветом победы: ТЗ прямо
 * запрещает зелёную маркировку здесь, зелёный держится за факт подтверждения.
 */
export function SpeedMatrix() {
  const cells = [
    { title: "Быстро + ненадёжно", result: "= преждевременный вывод", strong: false },
    { title: "Медленно + надёжно", result: "= высокая стоимость ожидания", strong: false },
    { title: "Медленно + ненадёжно", result: "= слабый рабочий цикл", strong: false },
    { title: "Быстро + надёжно", result: "= профессионально значимая скорость", strong: true },
  ];

  return (
    <Breakout>
      <figure>
        <div
          role="img"
          aria-label="Матрица два на два: скорость сигнала и его надёжность. Три сектора нейтральные, четвёртый — «быстро и надёжно» — отмечен акцентом как профессионально значимая скорость."
          className="grid grid-cols-2 gap-px bg-[var(--rule-soft)]"
        >
          {cells.map((c, i) => (
            <Fade
              key={c.title}
              delay={i * 0.08}
              className={`cell p-5 sm:p-6 ${c.strong ? "border-l-2 border-[var(--accent)]" : "opacity-70"}`}
            >
              <p
                className={`text-[14px] font-semibold tracking-[-0.01em] sm:text-[15px] ${
                  c.strong ? "text-[var(--ink)]" : "text-[var(--ink-soft)]"
                }`}
              >
                {c.title}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-[var(--ink-faint)]">{c.result}</p>
            </Fade>
          ))}
        </div>
      </figure>
    </Breakout>
  );
}
