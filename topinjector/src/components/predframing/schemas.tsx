"use client";

import { Breakout, Fade, FadeItem } from "./prose";

/*
  Схемы гипотезы №1 «Потеря преимущества».

  Каждая — отдельная метафора из ТЗ, а не украшение. Правило проекта: графика
  идёт брендовым акцентом, второй ряд — приглушёнными чернилами; зелёный на
  схемах не появляется, он закреплён за кнопками.

  Подписи вынесены из SVG в разметку. Внутри SVG они масштабируются вместе с
  картинкой и на телефоне превращаются в семь пикселей — исчезают ровно там,
  где схема и должна объяснять смысл.
*/

/** Строка легенды: цвет ряда и его значение. */
function Key({ color, children }: { color: string; children: string }) {
  return (
    <li className="flex items-center gap-2.5 text-[14px] text-[var(--ink-soft)] sm:text-[15px]">
      <span
        aria-hidden="true"
        className="block h-[3px] w-6 shrink-0"
        style={{ backgroundColor: color }}
      />
      {children}
    </li>
  );
}

/**
 * Главный образ первого экрана: два похожих графика. Оба растут, один заметно
 * медленнее. Разница мала намеренно — в ТЗ именно её незаметность названа
 * опасной.
 */
export function AdvantageDrift() {
  return (
    /*
      Панель подкладывает бумагу статьи, а не утопленную выемку: она лежит на
      подложке обложки, и одинаковый с ней материал слил бы схему с фоном.
    */
    <figure className="border border-[var(--rule-soft)] bg-[var(--reading-bg)] p-6 sm:p-8">
      <p className="label text-[var(--ink-faint)]">динамика преимущества</p>

      <svg
        viewBox="0 0 520 320"
        className="mt-7 h-auto w-full"
        role="img"
        aria-label="Два графика роста от общей точки. Верхний, отмеченный акцентным цветом, поднимается быстрее и уходит выше. Нижний продолжает расти, но заметно медленнее. К правому краю между ними образуется разрыв."
      >
        <defs>
          <pattern
            id="pf-drift-gap"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="7" stroke="var(--accent)" strokeWidth="1" />
          </pattern>
        </defs>

        <path d="M40 16 L40 272" stroke="var(--rule)" strokeWidth="1" fill="none" />
        <path d="M40 272 L496 272" stroke="var(--rule)" strokeWidth="1" fill="none" />

        {/* Разрыв заштрихован, а не залит: заливка стала бы вторым фоном. */}
        <path
          d="M40 250 C 148 234, 248 192, 338 146 C 398 116, 448 94, 496 76 L496 162 C 448 172, 398 186, 338 204 C 248 230, 148 248, 40 250 Z"
          fill="url(#pf-drift-gap)"
          opacity="0.5"
        />

        <path
          d="M40 250 C 148 234, 248 192, 338 146 C 398 116, 448 94, 496 76"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
        />
        <path
          d="M40 250 C 148 248, 248 230, 338 204 C 398 186, 448 172, 496 162"
          fill="none"
          stroke="var(--ink-faint)"
          strokeWidth="2.5"
        />

        {/* Точка, где линии ещё совпадали. */}
        <circle cx="40" cy="250" r="4" fill="var(--ink)" />
      </svg>

      <figcaption className="mt-7 border-t border-[var(--rule-soft)] pt-6">
        <ul className="flex flex-col gap-2.5">
          <Key color="var(--accent)">Преимущество, доступное на рынке сегодня</Key>
          <Key color="var(--ink-faint)">Инструмент, который однажды был лучшим</Key>
        </ul>
        <p className="mt-5 max-w-[44ch] text-[14px] leading-relaxed text-[var(--ink-faint)] sm:text-[15px]">
          Разница появляется не в один день и остаётся небольшой. Именно поэтому
          её почти невозможно заметить изнутри рабочего процесса.
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * «Как обычно ищут проблему». Цепочка привычных версий упирается в вопрос, а
 * настоящая причина стоит отдельно и подсвечена: в этот список она не попадает.
 */
export function ProblemSearch() {
  const usual = ["Алгоритмы", "Конкуренты", "Ссылки", "Контент", "Бюджет", "?"];

  return (
    <figure className="my-12">
      <Fade>
        <p className="label text-[var(--ink-faint)]">как обычно ищут причину</p>
      </Fade>

      <Fade delay={0.06}>
        <p className="mt-5 text-[18px] font-semibold text-[var(--ink)] sm:text-[19px]">
          Позиции упали
        </p>
      </Fade>

      <ol className="mt-4 flex flex-col items-start">
        {usual.map((s, i) => (
          <FadeItem key={s} delay={0.1 + Math.min(i, 6) * 0.06} className="w-full">
            <span aria-hidden="true" className="ml-[8px] block h-5 w-px bg-[var(--rule)]" />
            <span className="inline-flex items-center gap-3.5 text-[17px] text-[var(--ink-soft)] sm:text-[18px]">
              <span
                aria-hidden="true"
                className="ml-[5px] block h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--ink-faint)]"
              />
              {s}
            </span>
          </FadeItem>
        ))}
      </ol>

      {/*
        Настоящая причина вынесена из цепочки на собственную плашку: в общем
        перечислении она читалась бы седьмым равноправным пунктом, тогда как
        смысл схемы в том, что до неё очередь не доходит.
      */}
      <Fade delay={0.5}>
        <div className="mt-9 border-l-2 border-[var(--accent)] bg-[var(--inset)] p-6 sm:p-7">
          <p className="label text-[var(--accent)]">почти никогда не проверяется</p>
          <p className="mt-4 text-[19px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[22px]">
            Инструмент, с которым вы работаете каждый день
          </p>
        </div>
      </Fade>
    </figure>
  );
}

/** Смена основания решения: чужое мнение уступает собственным данным. */
export function EvidenceShift() {
  return (
    <Breakout>
      <figure className="grid items-stretch gap-px bg-[var(--rule-soft)] sm:grid-cols-[1fr_auto_1fr]">
        <Fade className="cell">
          <div className="h-full p-6 opacity-60 sm:p-8">
            <p className="label text-[var(--ink-faint)]">основание решения</p>
            <p className="mt-5 text-[19px] font-semibold tracking-[-0.02em] text-[var(--ink-soft)] sm:text-[21px]">
              Отзывы и обещания
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-faint)] sm:text-[16px]">
              Чужой опыт: другие сайты, запросы, регионы, клиенты и ограничения.
            </p>
          </div>
        </Fade>

        <div
          aria-hidden="true"
          className="num flex items-center justify-center bg-[var(--inset)] px-5 py-3 text-[var(--ink-faint)] sm:px-4"
        >
          →
        </div>

        <Fade delay={0.25} className="cell">
          <div className="h-full border-l-2 border-[var(--accent)] p-6 sm:p-8">
            <p className="label text-[var(--accent)]">основание решения</p>
            <p className="mt-5 text-[19px] font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[21px]">
              Собственные данные
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)] sm:text-[16px]">
              Ваш проект, ваши запросы, ваш регион. Результат, который можно
              повторить и проверить.
            </p>
          </div>
        </Fade>
      </figure>
    </Breakout>
  );
}

/** Два пути принятия решения. Подсвечен только второй — так требует ТЗ. */
export function TwoPaths() {
  const paths = [
    {
      t: "Поверить",
      d: "Принять решение по рекламе, отзывам или чужому кейсу и узнать результат уже на своих проектах.",
      on: false,
    },
    {
      t: "Проверить",
      d: "Выбрать один проект и одну группу запросов, получить собственные данные и решить по ним.",
      on: true,
    },
  ];

  return (
    <Breakout>
      <figure className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        {paths.map((p, i) => (
          <Fade key={p.t} delay={i * 0.2} className="cell">
            <div
              className={`h-full p-6 sm:p-8 ${
                p.on ? "border-l-2 border-[var(--accent)]" : "opacity-60"
              }`}
            >
              <p className="label" style={{ color: p.on ? "var(--accent)" : "var(--ink-faint)" }}>
                путь {i + 1}
              </p>
              <p
                className={`mt-5 text-[19px] font-semibold tracking-[-0.02em] sm:text-[21px] ${
                  p.on ? "text-[var(--ink)]" : "text-[var(--ink-soft)]"
                }`}
              >
                {p.t}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)] sm:text-[16px]">
                {p.d}
              </p>
            </div>
          </Fade>
        ))}
      </figure>
    </Breakout>
  );
}
