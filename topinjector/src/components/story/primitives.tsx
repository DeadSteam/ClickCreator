"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/*
  Примитивы редакционных схем.

  В ТЗ около двадцати схем, и почти все сводятся к четырём формам: вертикальная
  цепочка, сравнение в две колонки, вынесенная цитата и набор карточек. Рисовать
  каждую отдельно значило бы получить двадцать слегка разных решёток вместо
  одного языка схем — статья тут же перестала бы читаться как единый материал.

  Появление: fade up 300мс с интервалом 120мс, как задано в [ANIMATION].
  Сложных эффектов нет нигде: это статья, а не демонстрация возможностей.
*/

const EASE = [0.23, 1, 0.32, 1] as const;

export function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.3, delay, ease: EASE }}
    >
      {children}
    </motion.div>
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

export function H2({ children }: { children: ReactNode }) {
  return (
    <Rise>
      <h2 className="max-w-[20ch] text-[27px] leading-[1.1] font-extrabold tracking-[-0.03em] sm:text-[38px]">
        {children}
      </h2>
    </Rise>
  );
}

export function P({ children, lead = false }: { children: ReactNode; lead?: boolean }) {
  return (
    <Rise>
      <p
        className={`mt-5 text-[var(--ink-soft)] ${
          lead
            ? "text-[19px] leading-[1.6] sm:text-[21px]"
            : "text-[17px] leading-[1.65] sm:text-[18px]"
        }`}
      >
        {children}
      </p>
    </Rise>
  );
}

/** Реплики и внутренние вопросы. Визуально отделены от повествования. */
export function Line({ children }: { children: ReactNode }) {
  return (
    <Rise>
      <p className="mt-4 border-l-2 border-[var(--rule)] pl-5 text-[17px] leading-[1.5] text-[var(--ink)] sm:text-[19px]">
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
          <li className="flex gap-3.5 text-[17px] leading-[1.55] text-[var(--ink-soft)]">
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
  const accentColor =
    tone === "danger"
      ? "var(--color-risk-critical)"
      : tone === "good"
        ? "var(--color-risk-low)"
        : "var(--accent)";

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
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
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
      <div className="mt-5 grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
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
    <div className="zone-settled mt-[92px] w-screen -translate-x-1/2 px-5 py-24 sm:mt-[128px] sm:px-8 sm:py-36"
      style={{ marginLeft: "50%" }}
    >
      <div className="mx-auto max-w-[48rem]">
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
      <div className="mt-9 border border-[var(--rule-soft)] bg-[var(--inset)] p-6 sm:p-8">
        <h3 className="text-[19px] font-semibold tracking-[-0.02em] sm:text-[21px]">{title}</h3>
        <ul className="mt-6 flex flex-col gap-3.5">
          {items.map((t) => (
            <li key={t} className="flex gap-3.5 text-[16px] leading-snug text-[var(--ink-soft)]">
              <span
                aria-hidden="true"
                className="num shrink-0"
                style={{ color: "var(--color-risk-low)" }}
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
