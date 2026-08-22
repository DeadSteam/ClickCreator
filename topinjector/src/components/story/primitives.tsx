"use client";

import type { ReactNode } from "react";

import { Appear } from "@/motion/appear";

/*
  Примитивы редакционных схем.

  В ТЗ около двадцати схем, и почти все сводятся к четырём формам: вертикальная
  цепочка, сравнение в две колонки, вынесенная цитата и набор карточек. Рисовать
  каждую отдельно значило бы получить двадцать слегка разных решёток вместо
  одного языка схем — статья тут же перестала бы читаться как единый материал.

  Появление: fade up 300мс с интервалом 120мс, как задано в [ANIMATION].
  Сложных эффектов нет нигде: это статья, а не демонстрация возможностей.
*/

/** Появление в темпе чтения. Механика — в общем `Appear`. */
export function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Appear speed="reading" delay={delay} className={className}>
      {children}
    </Appear>
  );
}

/** Смысловой блок статьи. Отступ сверху — та самая визуальная пауза. */
export function Block({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`mt-[92px] sm:mt-[128px] ${className}`}>
      {children}
    </section>
  );
}

/* Заголовок раздела — общий `.h-sec`: та же ступень, что на всех маршрутах. */
export function H2({ children }: { children: ReactNode }) {
  return (
    <Rise>
      <h2 className="h-sec">{children}</h2>
    </Rise>
  );
}

export function P({ children, lead = false }: { children: ReactNode; lead?: boolean }) {
  return (
    <Rise>
      <p className={`mt-5 ${lead ? "stk-lead" : "stk-p"}`}>{children}</p>
    </Rise>
  );
}

/** Реплики и внутренние вопросы. Визуально отделены от повествования. */
export function Line({ children }: { children: ReactNode }) {
  return (
    <Rise>
      <p className="mt-4 border-l-2 border-[var(--rule)] pl-5 text-[18px] leading-[1.5] text-[var(--ink)] sm:text-[19px]">
        {children}
      </p>
    </Rise>
  );
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-2.5">
      {items.map((t, i) => (
        <Rise key={t} delay={Math.min(i, 6) * 0.05}>
          <li className="stk-p flex gap-3.5">
            <span aria-hidden="true" className="num shrink-0 text-[var(--ink-faint)]">
              —
            </span>
            {t}
          </li>
        </Rise>
      ))}
    </ul>
  );
}

/**
 * Вертикальная цепочка со стрелками — основная форма схем в ТЗ.
 * `accentAt` выделяет ступень, на которой держится смысл схемы.
 */
export function Flow({
  steps,
  accentAt,
  tone = "plain",
}: {
  steps: string[];
  accentAt?: number;
  tone?: "plain" | "danger" | "good";
}) {
  /*
    Тон различает только опасность: и обычная, и «хорошая» ступень идут
    брендовым акцентом. Зелёный на схемах не появляется — он закреплён за
    кнопками и чекмарками, и третий цвет в цепочке из пяти пунктов читался бы
    как ещё один статус, которого в схеме нет.
  */
  const accentColor =
    tone === "danger" ? "var(--color-risk-critical)" : "var(--accent)";

  return (
    <ol className="mt-8 flex flex-col items-start">
      {steps.map((s, i) => {
        const on = i === accentAt;
        return (
          <Rise key={s} delay={Math.min(i, 6) * 0.06} className="w-full">
            <li>
              {/*
                Соединитель встаёт по центру маркера: маркер сдвинут на 5
                пикселей и сам шириной 7, значит его ось на 8.5. Любое другое
                значение читается как сбитая вёрстка, а не как схема.
              */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="ml-[8px] block h-6 w-px bg-[var(--rule)]"
                />
              )}
              <span
                className={`inline-flex items-center gap-3.5 ${
                  on ? "text-[17px] font-semibold sm:text-[19px]" : "text-[16px] sm:text-[17px]"
                }`}
                style={on ? { color: accentColor } : undefined}
              >
                <span
                  aria-hidden="true"
                  className="block h-[7px] w-[7px] shrink-0 rounded-full"
                  style={{
                    backgroundColor: on ? accentColor : "var(--ink-faint)",
                    marginLeft: 5,
                  }}
                />
                <span className={on ? "" : "text-[var(--ink-soft)]"}>{s}</span>
              </span>
            </li>
          </Rise>
        );
      })}
    </ol>
  );
}

/** Сравнение в две колонки. Правая — та, ради которой схема существует. */
/*
  Порядок появления задан ТЗ и повторяется во всех сравнениях статьи: сначала
  левая колонка, через 250мс правая. Это не украшение — так строится маршрут
  взгляда, и правая колонка должна читаться как ответ на левую, а не появляться
  вместе с ней.
*/
const RIGHT_DELAY = 0.25;

export function Split({
  left,
  right,
  footer,
}: {
  left: { title: string; items: string[] };
  right: { title: string; items: string[]; emphasis?: string };
  footer?: string;
}) {
  return (
    <div className="mt-9">
      {/*
        Сравнение — одна поверхность, разделённая волосяной чертой, а не две
        плитки встык: прямой угол стоял бы рядом с поверхностями статьи,
        скруглёнными на 14 px, и читался бы куском чужой системы.
      */}
      <div className="surf-split grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        <Rise className="bg-[var(--inset)]">
          <div className="h-full p-6 sm:p-7">
            <p className="label text-[var(--ink-faint)]">{left.title}</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {left.items.map((t) => (
                <li key={t} className="text-[15px] leading-snug text-[var(--ink-soft)]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Rise>

        {/*
          Правая колонка должна восприниматься заметно привлекательнее левой:
          у неё акцентная линейка, более контрастный текст и собственный фон.
          Одинаково набранные колонки читаются как нейтральное перечисление, а
          не как выбор.
        */}
        <Rise delay={RIGHT_DELAY} className="bg-[var(--inset)]">
          <div className="h-full border-l-2 border-[var(--accent)] bg-[var(--inset)] p-6 sm:p-7">
            <p className="label text-[var(--accent)]">{right.title}</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {right.items.map((t) => (
                <li
                  key={t}
                  className="text-[15px] leading-snug font-medium text-[var(--ink)]"
                >
                  {t}
                </li>
              ))}
            </ul>
            {right.emphasis && (
              <p className="mt-6 text-[21px] leading-tight font-extrabold tracking-[-0.03em] text-[var(--ink)] sm:text-[26px]">
                {right.emphasis}
              </p>
            )}
          </div>
        </Rise>
      </div>

      {footer && (
        <Rise delay={0.18}>
          <p className="mt-4 text-[14px] leading-relaxed text-[var(--ink-faint)]">{footer}</p>
        </Rise>
      )}
    </div>
  );
}

/** Карточки внутренних мыслей. Без иконок: главный акцент — текст. */
export function Thoughts({ items, who }: { items: string[]; who: string }) {
  return (
    <div className="mt-9">
      <p className="label text-[var(--ink-faint)]">{who}</p>
      <div className="surf-split mt-5 grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        {items.map((t, i) => (
          <Rise key={t} delay={i * 0.12} className="bg-[var(--inset)]">
            <p className="h-full p-6 text-[17px] leading-snug text-[var(--ink)] sm:text-[18px]">
              {t}
            </p>
          </Rise>
        ))}
      </div>
    </div>
  );
}

/**
 * Вынесенная цитата на графите во всю ширину экрана. Это и есть визуальная
 * пауза, которой ТЗ требует после каждого крупного смыслового блока: чтение
 * упирается в тёмный разворот и на секунду останавливается.
 */
export function Pull({
  lines,
  caption,
  size = "normal",
}: {
  lines: string[];
  caption?: string;
  size?: "normal" | "huge";
}) {
  return (
    /*
      Полоса стоит на утопленной земле системы, а не на графитовой зоне прежней.
      `.stk` зоны обнуляет, и `zone-settled` здесь оставался бы прозрачным — от
      паузы, ради которой этот разворот существует, не осталось бы ничего.
      Разница со землёй мала намеренно: чтение должно почувствовать смену
      уровня, а не упереться во второй фон.

      Прорыва из колонки (`w-screen` со сдвигом на половину) больше нет. Обе
      цитаты статьи и так стоят прямыми потомками корня, то есть уже во всю
      ширину, а `100vw` считает вместе с полосой прокрутки: полоса выходила на
      7 px шире листа, съезжала на те же 7 px влево вместе со своей колонкой, и
      на 390 px цитата вставала не по левому краю текста (13 px против 20 px).
      Обычный блок берёт ширину родителя ровно и совпадает с ней всегда.
    */
    <div className="stk-sink mt-[92px] border-y border-[var(--rule-soft)] py-24 sm:mt-[128px] sm:py-36">
      <div className="wrap wrap-read">
        {/*
          Строки появляются последовательно с интервалом 140мс, а не блоком:
          так задано в [ANIMATION], и в этом весь смысл экрана. Цитата
          дочитывается по строке, как мысль, которая собирается на глазах.
          После последней строки — полная тишина, никакой другой анимации.
        */}
        <blockquote>
          {lines.map((l, i) => (
            <Rise key={l} delay={i * 0.14}>
              <p
                className={`font-extrabold tracking-[-0.035em] text-[var(--ink)] ${
                  size === "huge"
                    ? "text-[28px] leading-[1.12] sm:text-[46px]"
                    : "text-[24px] leading-[1.15] sm:text-[36px]"
                } ${i > 0 ? "mt-1" : ""}`}
              >
                {l}
              </p>
            </Rise>
          ))}
        </blockquote>

        {caption && (
          /* Подпись выходит после последней строки, а не наперегонки с ними. */
          <Rise delay={lines.length * 0.14 + 0.1}>
            <p className="mt-8 text-[15px] leading-relaxed text-[var(--ink-faint)]">
              {caption}
            </p>
          </Rise>
        )}
      </div>
    </div>
  );
}

/** Плашка с одной мыслью. Для строк, которые ТЗ требует «выделить». */
export function Note({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "danger" }) {
  const color = tone === "danger" ? "var(--color-risk-critical)" : "var(--accent)";

  return (
    <Rise>
      <p
        className="mt-8 border-l-2 py-1 pl-5 text-[19px] leading-snug font-semibold tracking-[-0.02em] sm:text-[22px]"
        style={{ borderColor: color, color }}
      >
        {children}
      </p>
    </Rise>
  );
}

/** Чек-лист с зелёными маркерами — прямое требование двух [VISUAL] блоков. */
export function Checks({ title, items }: { title: string; items: string[] }) {
  return (
    <Rise>
      <div className="surf mt-9 p-6 sm:p-8">
        <h3 className="stk-h3">{title}</h3>
        <ul className="mt-6 flex flex-col gap-3.5">
          {items.map((t) => (
            <li key={t} className="stk-sm flex gap-3.5">
              <span
                aria-hidden="true"
                className="num shrink-0"
                style={{ color: "var(--positive)" }}
              >
                ✓
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Rise>
  );
}
