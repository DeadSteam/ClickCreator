"use client";

import type { ReactNode } from "react";

import { Appear } from "@/motion/appear";
import { ordinal } from "@/format";

/* Общие формы лендинга. Один язык секций вместо семнадцати самодельных. */

/*
  Реэкспорт: секции лендинга зовут появление как `Appear` из соседнего модуля,
  и обход двух десятков файлов ради смены пути импорта не даёт ничего.
*/
export { Appear };

export function Section({
  id,
  zone = "",
  children,
  className = "",
}: {
  id?: string;
  zone?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      /*
        Атрибут инертен везде, кроме предфрейминговых страниц: там
        `usePredframingAnalytics` слушает `[data-pf-block]`, чтобы мерить
        просмотр и время по блокам. Ставится автоматически по `id`, а не
        отдельным пропсом — второй источник правды для одного и того же
        идентификатора расходится быстрее, чем успевает пригодиться.
      */
      data-pf-block={id}
      className={`scroll-mt-20 px-5 pt-24 sm:px-8 sm:pt-32 ${zone} ${className}`}
    >
      <div className="mx-auto max-w-[76rem]">{children}</div>
    </section>
  );
}

export function Head({
  kicker,
  title,
  lead,
}: {
  kicker?: string;
  title: string;
  lead?: string;
}) {
  return (
    <Appear>
      {kicker && <p className="label text-[var(--ink-faint)]">{kicker}</p>}
      <h2 className={`max-w-[22ch] text-[30px] leading-[1.08] font-extrabold tracking-[-0.03em] sm:text-[44px] ${kicker ? "mt-6" : ""}`}>
        {title}
      </h2>
      {lead && (
        <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
          {lead}
        </p>
      )}
    </Appear>
  );
}

export type Card = { t: string; d: string; id?: string };

/**
 * Сетка карточек на волосяных линейках. Никаких скруглённых плашек с иконкой:
 * структуру на этом сайте держат линейки и нумерация.
 */
export function Cards({ items, cols = 3 }: { items: Card[]; cols?: 2 | 3 }) {
  /*
    Нечётный хвост иначе оставляет пустую ячейку рядом с последней карточкой:
    сетка не рисует под неё контент, и сквозь пустое место просвечивает фон
    секции — на тёмной зоне это читается как случайный чёрный прямоугольник.
    Последняя одинокая карточка растягивается на всю строку вместо него.
  */
  const lastAlone = cols === 2 && items.length % 2 === 1;

  return (
    <div
      className={`mt-14 grid gap-px bg-[var(--rule-soft)] ${
        cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {items.map((c, i) => (
        <Appear
          key={c.t}
          delay={Math.min(i, 5) * 0.06}
          className={`cell ${lastAlone && i === items.length - 1 ? "sm:col-span-2" : ""}`}
        >
          <div className="h-full p-6 sm:p-7">
            <span className="num text-[11px] text-[var(--ink-faint)]">
              {ordinal(i)}
            </span>
            <h3 className="mt-4 max-w-[24ch] text-[18px] leading-snug font-semibold tracking-[-0.02em] sm:text-[20px]">
              {c.t}
            </h3>
            <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
              {c.d}
            </p>
          </div>
        </Appear>
      ))}
    </div>
  );
}

/** Две колонки «до и после». Правая всегда та, ради которой блок написан. */
export function Contrast({
  left,
  right,
  footer,
}: {
  left: { title: string; items: string[] };
  right: { title: string; items: string[] };
  footer?: string;
}) {
  return (
    <div className="mt-14">
      <div className="grid gap-px bg-[var(--rule-soft)] lg:grid-cols-2">
        <Appear className="cell">
          <div className="h-full p-7 sm:p-8">
            <p className="label text-[var(--ink-faint)]">{left.title}</p>
            <ul className="mt-6 flex flex-col">
              {left.items.map((t) => (
                <li
                  key={t}
                  className="border-t border-[var(--rule-soft)] py-3.5 text-[15px] leading-snug text-[var(--ink-soft)] first:border-t-0 first:pt-0"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Appear>

        <Appear delay={0.1} className="cell">
          <div className="h-full border-l-2 border-[var(--accent)] p-7 sm:p-8">
            <p className="label text-[var(--accent)]">{right.title}</p>
            <ul className="mt-6 flex flex-col">
              {right.items.map((t) => (
                <li
                  key={t}
                  className="border-t border-[var(--rule-soft)] py-3.5 text-[15px] leading-snug font-semibold text-[var(--ink)] first:border-t-0 first:pt-0"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Appear>
      </div>

      {footer && (
        <Appear delay={0.16}>
          <p className="mt-6 max-w-[60ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
            {footer}
          </p>
        </Appear>
      )}
    </div>
  );
}

/** Горизонтальная цепочка этапов. Используется для схемы пути проекта. */
export function Chain({ steps, accentAt }: { steps: string[]; accentAt?: number }) {
  return (
    <Appear>
      <ol className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span
              className={`text-[14px] leading-snug sm:text-[15px] ${
                i === accentAt
                  ? "font-semibold text-[var(--accent)]"
                  : "text-[var(--ink-soft)]"
              }`}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="num text-[var(--ink-faint)]">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </Appear>
  );
}

export type Step = { t: string; d: string };

/**
 * Шаги процесса на рельсе.
 *
 * Раньше это была сетка колонок с номерами — список, а не последовательность:
 * ничто не говорило, что шаг 2 следует за шагом 1, кроме порядка чтения. Узел
 * на общей линии превращает перечисление в процесс, и делает это языком самой
 * страницы: здесь всё держится линейками, а не рамками.
 *
 * Первый узел закрашен акцентом, остальные полые. Так видно, где вход: у ряда
 * одинаковых точек начала нет.
 */
export function Steps({ items }: { items: Step[] }) {
  return (
    <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <Appear
          key={s.t}
          delay={i * 0.07}
          /*
            Колонки расходятся правым полем, а не левым: узел на рельсе и
            подпись под ним обязаны стоять на одной вертикали, а левый отступ
            сдвигал текст и оставлял точку висеть отдельно.
          */
          className="relative border-t border-[var(--rule)] pt-8 pb-8 sm:pr-8 lg:pb-0"
        >
          {/*
            Узел сидит верхом на линии: половина сверху, половина снизу.
            Смещение по вертикали ровно в половину диаметра, иначе точка
            «висит» рядом с рельсой, а не на ней.
          */}
          <span
            aria-hidden="true"
            className={`absolute -top-[5px] left-0 block h-[9px] w-[9px] rounded-full ${
                i === 0
                  ? "bg-[var(--accent)]"
                  : "border border-[var(--rule)] bg-[var(--bg-node)]"
              }`}
          />

          <span className="num text-[11px] text-[var(--ink-faint)]">
            {ordinal(i)}
          </span>
          <h3 className="mt-5 text-[20px] leading-snug sm:text-[22px]">{s.t}</h3>
          <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
            {s.d}
          </p>
        </Appear>
      ))}
    </div>
  );
}
