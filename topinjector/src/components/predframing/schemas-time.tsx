"use client";

import { Breakout, Fade } from "./prose";

/*
  Схемы гипотезы №4 «Экономика времени».

  Источник метафор — ТЗстраницы/2_4_..._Экономика.docx, разделы «ТЗ дизайнеру»
  и «ВИЗУАЛ БЛОКА N». Правило проекта: FadeItem — только внутри настоящего
  <ul>/<ol> (иначе браузер рисует маркер списка даже без родителя-списка, этот
  баг уже однажды всплыл в schemas-ego.tsx). Здесь схемы построены на div-сетках,
  поэтому everywhere используется Fade.

  ТЗ прямо запрещает деньги, сгорающие в огне, падающие монеты, красные графики,
  таймеры обратного отсчёта и «вы теряете деньги каждую минуту» — ни одна схема
  этого не делает.
*/

/**
 * Главный образ обложки: песочные часы. Вместо песка — поток того, что на
 * самом деле пересыпается, пока проект ждёт результата. Карточка цены
 * подписки рядом визуально меньше потока — в этом весь смысл визуала по ТЗ.
 */
export function HourglassFlow() {
  return (
    <figure className="border border-[var(--rule-soft)] bg-[var(--reading-bg)] p-6 sm:p-8">
      <p className="label text-[var(--ink-faint)]">цена подписки заметна, цена ожидания скрыта</p>

      <svg
        viewBox="0 0 300 260"
        className="mt-7 h-auto w-full max-w-[220px]"
        role="img"
        aria-label="Песочные часы. Вместо песка внутри пересыпаются позиции, карточки проектов, рабочие часы и уведомления от клиентов."
      >
        <path
          d="M70 20 H230 L150 130 L230 240 H70 L150 130 Z"
          fill="none"
          stroke="var(--rule)"
          strokeWidth="1.5"
        />
        {/* Верхняя колба: ожидание ещё впереди — приглушённо. */}
        <path d="M92 34 H208 L150 122 Z" fill="var(--ink-faint)" opacity="0.18" />
        {/* Нижняя колба: то, что уже накопилось — акцентом. */}
        <path d="M92 226 H208 L150 138 Z" fill="var(--accent)" opacity="0.22" />
        <path d="M150 122 L150 138" stroke="var(--accent)" strokeWidth="2" />
      </svg>

      <figcaption className="mt-7 border-t border-[var(--rule-soft)] pt-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[13px] text-[var(--ink-faint)]">поисковые позиции · карточки проектов · рабочие часы · уведомления</p>
        </div>
        <div className="mt-4 inline-block border border-[var(--rule-soft)] bg-[var(--inset)] px-3 py-2">
          <p className="text-[13px] text-[var(--ink-soft)]">цена подписки</p>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * «Из чего складывается реальная стоимость инструмента» — первый экран после
 * скролла. Подписка визуально самый маленький блок; остальные факторы
 * постепенно увеличивают итоговую полосу — ровно как требует ТЗ.
 */
export function CostStack() {
  const parts = [
    { label: "Стоимость подписки", weight: 1 },
    { label: "Время до результата", weight: 2 },
    { label: "Ручная работа", weight: 2 },
    { label: "Коммуникация с клиентом", weight: 2 },
    { label: "Стоимость отсроченного решения", weight: 3 },
  ];

  return (
    <figure className="mt-12">
      <Fade>
        <p className="label text-[var(--ink-faint)]">из чего складывается реальная стоимость инструмента</p>
      </Fade>

      <div className="mt-6 flex flex-col gap-px bg-[var(--rule-soft)]">
        {parts.map((p, i) => (
          <Fade key={p.label} delay={i * 0.08} className="bg-[var(--inset)]">
            <div
              className={`flex items-center py-3 pl-4 text-[14px] leading-snug sm:text-[15px] ${
                i === 0 ? "text-[var(--ink-faint)]" : "text-[var(--ink-soft)]"
              }`}
              style={{ width: `${40 + p.weight * 18}%` }}
            >
              {p.label}
            </div>
          </Fade>
        ))}
      </div>

      <Fade delay={0.5}>
        <div className="mt-3 border-l-2 border-[var(--accent)] bg-[var(--inset)] p-5 sm:p-6">
          <p className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[17px]">
            = реальная стоимость использования
          </p>
        </div>
      </Fade>
    </figure>
  );
}

/** Одна карточка измеримого показателя цикла. */
function MetricCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <Fade delay={index * 0.06} className="cell">
      <div className="h-full p-6 sm:p-7">
        <p className="label text-[var(--ink-faint)]">показатель {index + 1}</p>
        <p className="mt-4 text-[18px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[19px]">
          {title}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-soft)] sm:text-[15px]">
          {description}
        </p>
      </div>
    </Fade>
  );
}

/** Пять измеримых показателей полного цикла — плоская сетка, без табов. */
export function CycleMetrics() {
  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
        <MetricCard
          index={0}
          title="Время до полезного сигнала"
          description="Сколько проходит времени до появления данных, которые позволяют подтвердить, скорректировать или остановить рабочую гипотезу?"
        />
        <MetricCard
          index={1}
          title="Количество ручных касаний"
          description="Сколько раз нужно открыть проект, проверить динамику, скорректировать настройки, повторить действие, вручную собрать данные?"
        />
        <MetricCard
          index={2}
          title="Стоимость внимания"
          description="Сколько незавершённых циклов инструмент оставляет в работе? Как долго проект занимает операционное внимание?"
        />
        <MetricCard
          index={3}
          title="Стоимость коммуникации"
          description="Сколько дополнительных сообщений, отчётов и объяснений требуется до появления понятной динамики?"
        />
        <MetricCard
          index={4}
          title="Пропускная способность"
          description="Сколько проектов специалист может вести без пропорционального роста нагрузки?"
        />
      </div>
    </Breakout>
  );
}

/**
 * Три фазы объективного сравнения: до запуска / во время работы / после
 * результата. ТЗ прямо требует разделить схему на эти три зоны и оставить
 * её понятной без анимации.
 */
export function CycleTimeline() {
  const phases = [
    { title: "До запуска", items: ["Цель", "Стартовую точку", "Метрики", "Период", "Критерий решения"] },
    { title: "Во время работы", items: ["Дни", "Касания", "Проверки", "Коммуникации"] },
    { title: "После результата", items: ["Полную стоимость цикла"] },
  ];

  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
        {phases.map((phase, i) => (
          <Fade key={phase.title} delay={i * 0.1} className="cell">
            <div className="h-full p-6 sm:p-7">
              <p className="label text-[var(--accent)]">{phase.title}</p>
              <p className="mt-4 text-[13px] leading-relaxed text-[var(--ink-faint)]">
                {i === 2 ? "Сравниваем:" : "Фиксируем:"}
              </p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {phase.items.map((it) => (
                  <li key={it} className="text-[15px] leading-snug text-[var(--ink-soft)] sm:text-[16px]">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Fade>
        ))}
      </div>
    </Breakout>
  );
}

/**
 * Block 4: текущий и проверяемый циклы подают пять показателей в общий центр
 * «Профессиональное решение». Ни один цикл не подписан победителем заранее —
 * прямое требование ТЗ.
 */
export function CycleConvergence() {
  return (
    <figure className="mt-12">
      <div
        role="img"
        aria-label="Слева — текущий цикл, справа — проверяемый цикл. Оба подают пять показателей (время, ручные действия, внимание, коммуникация, итоговый результат) в общий центр «Профессиональное решение»."
        className="grid grid-cols-2 gap-3 sm:gap-5"
      >
        <Fade className="border border-[var(--rule-soft)] bg-[var(--inset)] p-4 text-center sm:p-6">
          <p className="text-[14px] leading-snug text-[var(--ink-soft)] sm:text-[15px]">Текущий цикл</p>
        </Fade>
        <Fade delay={0.08} className="border border-[var(--rule-soft)] bg-[var(--inset)] p-4 text-center sm:p-6">
          <p className="text-[14px] leading-snug text-[var(--ink-soft)] sm:text-[15px]">Проверяемый цикл</p>
        </Fade>
      </div>

      <div className="mt-3 flex justify-center gap-8 text-[12px] text-[var(--ink-faint)]">
        <span>время</span>
        <span>действия</span>
        <span>внимание</span>
        <span>коммуникация</span>
        <span>результат</span>
      </div>

      <div className="mt-3 flex justify-center">
        <span aria-hidden="true" className="block h-6 w-px bg-[var(--rule)]" />
      </div>

      <Fade delay={0.2}>
        <div className="border-l-2 border-[var(--accent)] bg-[var(--inset)] p-6 text-center sm:p-8">
          <p className="label text-[var(--accent)]">пять показателей сходятся сюда</p>
          <p className="mt-3 text-[19px] font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[21px]">
            Профессиональное решение
          </p>
        </div>
      </Fade>
    </figure>
  );
}
