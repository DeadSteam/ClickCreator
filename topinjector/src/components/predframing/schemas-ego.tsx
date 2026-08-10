"use client";

import { Breakout, Fade, Ladder } from "./prose";

/*
  Схемы гипотезы №3 «Профессиональное эго».

  Источник метафор — ТЗстраницы/2_3_..._Профессиональное.docx, разделы «ТЗ дизайнеру»
  и «ВИЗУАЛ БЛОКА N». Главное отличие от гипотез №1-2: здесь запрещено визуализировать
  поражение, ошибку или разоблачение специалиста (ТЗ прямым текстом). Ни один
  сценарий на схемах не читается как «плохой исход» — контраст между вариантами
  держится на плотности и положении, а не на цвете «правильно/неправильно».
*/

/**
 * Главный образ обложки: измерительный инструмент и монитор с двумя почти
 * одинаковыми траекториями. Разница едва заметна — так и должно быть, ТЗ прямо
 * запрещает делать расхождение очевидным на этом экране.
 */
export function CertaintyMeasure() {
  return (
    <figure className="border border-[var(--rule-soft)] bg-[var(--reading-bg)] p-6 sm:p-8">
      <p className="label text-[var(--ink-faint)]">измерение, а не убеждение</p>

      <svg
        viewBox="0 0 520 300"
        className="mt-7 h-auto w-full"
        role="img"
        aria-label="Измерительная шкала слева и два графика справа, растущие почти одинаково. К правому краю между ними появляется едва заметный зазор."
      >
        {/* Линейка: шкала деления слева, метафора измерительного инструмента с рабочего стола. */}
        <g opacity="0.8">
          <path d="M28 20 L28 260" stroke="var(--rule)" strokeWidth="1" />
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M22 ${28 + i * 28} L28 ${28 + i * 28}`}
              stroke="var(--ink-faint)"
              strokeWidth="1"
            />
          ))}
        </g>

        <path d="M56 20 L56 260" stroke="var(--rule)" strokeWidth="1" fill="none" />
        <path d="M56 260 L500 260" stroke="var(--rule)" strokeWidth="1" fill="none" />

        <path
          d="M56 236 C 160 220, 260 188, 360 150 C 410 130, 460 110, 500 96"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
        />
        <path
          d="M56 236 C 160 222, 260 194, 360 162 C 410 148, 460 136, 500 128"
          fill="none"
          stroke="var(--ink-faint)"
          strokeWidth="2.5"
        />
        <circle cx="56" cy="236" r="4" fill="var(--ink)" />
      </svg>

      <figcaption className="mt-7 border-t border-[var(--rule-soft)] pt-6">
        <p className="max-w-[46ch] text-[14px] leading-relaxed text-[var(--ink-faint)] sm:text-[15px]">
          На первый взгляд разницы нет. При более внимательном измерении одна
          траектория постепенно уходит вперёд.
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * «Как формируется профессиональная уверенность» — первый экран после скролла.
 * Пять шагов, последний подсвечен акцентом: ровно та точка, где, по ТЗ,
 * уверенность способна незаметно перейти в инерцию.
 */
export function ConfidenceLoop() {
  return (
    <figure className="mt-12">
      <Ladder
        caption="как формируется профессиональная уверенность"
        steps={["Первый выбор", "Положительный результат", "Повторение результата", "Рабочая привычка", "Решение перестают перепроверять"]}
        markAt={4}
      />

      <Fade delay={0.5}>
        <div className="mt-9 border-l-2 border-[var(--accent)] bg-[var(--inset)] p-6 sm:p-7">
          <p className="text-[19px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[22px]">
            Именно здесь уверенность может превратиться в инерцию.
          </p>
        </div>
      </Fade>
    </figure>
  );
}

/** Одна карточка признака сравнения. */
function CriterionCard({
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
        <p className="label text-[var(--ink-faint)]">критерий {index + 1}</p>
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

/**
 * Пять критериев объективного сравнения. ТЗ явно требует не прятать их в
 * табы или слайдер — вся система оценки видна сразу, поэтому это плоская
 * сетка, а не карусель.
 */
export function CriteriaFive() {
  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
        <CriterionCard
          index={0}
          title="Скорость"
          description="Насколько быстро инструмент позволяет увидеть первую значимую динамику — не в рекламном кейсе, а на вашем проекте, в ваших условиях."
        />
        <CriterionCard
          index={1}
          title="Экономика"
          description="Сколько стоит не только подписка, но и достижение рабочего результата: время специалиста, объём ручных действий, дополнительные инструменты."
        />
        <CriterionCard
          index={2}
          title="Управляемость"
          description="Понимаете ли вы, что происходит после запуска. Можно ли контролировать процесс по понятным показателям."
        />
        <CriterionCard
          index={3}
          title="Повторяемость"
          description="Результат появился один раз или воспроизводится на нескольких подходящих сценариях."
        />
        <CriterionCard
          index={4}
          title="Встраиваемость"
          description="Нужно ли перестраивать всю систему, или инструмент можно добавить в текущий стек там, где он даёт преимущество."
        />
      </div>
    </Breakout>
  );
}

/**
 * Четыре сценария результата проверки — намеренно равнозначные карточки.
 * ТЗ прямо запрещает выделять «сценарий успеха нового инструмента» ярче
 * остальных: любой исход должен читаться как полезный.
 */
export function ScenarioGrid() {
  const scenarios = [
    {
      title: "Текущий инструмент показывает лучший результат",
      description: "Вы получаете актуальное подтверждение, что прежнее решение остаётся сильным.",
    },
    {
      title: "Новый подход показывает преимущество",
      description: "Вы обнаруживаете изменение раньше, чем оно начинает влиять на клиентские результаты.",
    },
    {
      title: "Результаты сопоставимы",
      description: "Немедленный переход не нужен, но появляется резервная возможность для отдельных сценариев.",
    },
    {
      title: "Данных недостаточно",
      description: "Вы не делаете преждевременный вывод — уточняете условия или выбираете другой проект для проверки.",
    },
  ];

  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        {scenarios.map((s, i) => (
          <Fade
            key={s.title}
            delay={i * 0.08}
            className="cell flex flex-col gap-3 p-6 sm:p-7"
          >
            <p className="label text-[var(--ink-faint)]">сценарий {i + 1}</p>
            <p className="text-[16px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[17px]">
              {s.title}
            </p>
            <p className="text-[14px] leading-relaxed text-[var(--ink-soft)] sm:text-[15px]">
              {s.description}
            </p>
          </Fade>
        ))}
      </div>
    </Breakout>
  );
}

/**
 * «Специалист в центре системы»: текущий инструмент и новый подход подают
 * данные в центральный блок «Решение специалиста» — инструмент не заменяет
 * эксперта, а только приносит ему данные для решения.
 */
export function DecisionCenter() {
  return (
    <figure className="mt-12">
      <div
        role="img"
        aria-label="Слева — текущий инструмент, справа — новый подход. Оба подают данные в центральный блок «Решение специалиста»."
        className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5"
      >
        <Fade className="border border-[var(--rule-soft)] bg-[var(--inset)] p-4 text-center sm:p-6">
          <p className="text-[14px] leading-snug text-[var(--ink-soft)] sm:text-[15px]">
            Текущий инструмент
          </p>
        </Fade>

        <span aria-hidden="true" className="num text-[var(--ink-faint)]">
          →
        </span>

        <Fade delay={0.08} className="border border-[var(--rule-soft)] bg-[var(--inset)] p-4 text-center sm:p-6">
          <p className="text-[14px] leading-snug text-[var(--ink-soft)] sm:text-[15px]">
            Новый подход
          </p>
        </Fade>
      </div>

      <div className="mt-3 flex justify-center">
        <span aria-hidden="true" className="block h-6 w-px bg-[var(--rule)]" />
      </div>

      <Fade delay={0.2}>
        <div className="border-l-2 border-[var(--accent)] bg-[var(--inset)] p-6 text-center sm:p-8">
          <p className="label text-[var(--accent)]">оба подают данные сюда</p>
          <p className="mt-3 text-[19px] font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[21px]">
            Решение специалиста
          </p>
        </div>
      </Fade>
    </figure>
  );
}
