"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";

/*
  Хребет страницы. Прокрутка и есть сокращение окна сомнения: вы входите на
  девяностом дне ожидания и выходите на третьем. Прибор структурный, а не
  декоративный, поэтому он оправдывает фиксированное место, которое занимает.

  Считает именно окно сомнения, а не позицию сайта. Позиция — метрика
  инструмента; окно сомнения — главный враг бренда, и на нём держится вся
  ветка коммуникации.

  Состояние обновляется только при смене целого числа, поэтому компонент
  перерисовывается по числу шагов диапазона за весь документ, а не раз в кадр.
*/

const FROM = 90;
const TO = 3;

export function DoubtRail({
  ctaHref,
  ctaLabel,
  from = FROM,
  to = TO,
  caption = "окно сомнения",
  unit = "дней",
}: {
  ctaHref: string;
  ctaLabel: string;
  from?: number;
  to?: number;
  caption?: string;
  unit?: string;
}) {
  const { scrollYProgress } = useScroll();
  const [days, setDays] = useState(from);
  const [dark, setDark] = useState(false);
  const settleTop = useRef(Infinity);
  const reduce = useReducedMotion();

  /*
    Рейка висит вне секций и потому не наследует ни одной зоны: на графитовом
    финале тёмная краска пропадала целиком. Порог берётся от фактического верха
    графитовой секции, а не от процента прокрутки — страницы разной длины
    переключались бы в разных местах, и на короткой рейка оставалась бы тёмной
    поверх тёмного.
  */
  useEffect(() => {
    const measure = () => {
      const el = document.querySelector<HTMLElement>(".settle-in");
      settleTop.current = el
        ? el.getBoundingClientRect().top + window.scrollY
        : Infinity;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.max(to, Math.round(from - p * (from - to)));
    setDays((prev) => (prev === next ? prev : next));

    /* Рейка стоит по центру экрана, растушёвка входа занимает 200 пикселей. */
    const mid = window.scrollY + window.innerHeight / 2;
    const isDark = mid > settleTop.current + 120;
    setDark((prev) => (prev === isDark ? prev : isDark));
  });

  const pct = ((from - days) / (from - to)) * 100;

  /*
    Зона берётся вместе с bg-transparent: класс зоны подкладывает собственный
    графит, а рейке нужны только переменные, иначе она обрастает прямоугольной
    плашкой.
  */
  const zone = dark ? "zone-settled bg-transparent" : "zone-doubt bg-transparent";

  return (
    <>
      {/* Десктоп: фрезерованная рейка по левому полю. */}
      <aside
        className={`pointer-events-none fixed top-1/2 left-6 z-30 hidden -translate-y-1/2
          flex-col items-start gap-3 [transition:color_var(--t-panel)_var(--ease-micro)]
          xl:flex ${zone}`}
        aria-hidden="true"
      >
        {/*
          Подпись набрана вертикально, а не строкой. Горизонтальный вариант
          растягивал рейку шире левого поля контейнера и накладывал её на
          заголовок первого экрана.
        */}
        <span className="label max-w-[7ch] leading-[1.6] text-[var(--ink-faint)]">
          {caption}
        </span>

        <p className="flex flex-col gap-1">
          <span className="num text-[40px] leading-none font-semibold text-[var(--ink)]">
            {days}
          </span>
          <span className="label text-[var(--ink-faint)]">{unit}</span>
        </p>

        <div className="relative mt-1 h-[38vh] w-px bg-[var(--rule)]">
          <div
            className="absolute inset-x-0 top-0 bg-[var(--accent)]"
            style={{
              height: `${pct}%`,
              transition: reduce ? "none" : "height 220ms var(--ease-haptic)",
            }}
          />
          <span
            className="absolute -left-[3px] block h-px w-[7px] bg-[var(--accent)]"
            style={{
              top: `${pct}%`,
              transition: reduce ? "none" : "top 220ms var(--ease-haptic)",
            }}
          />
        </div>

        <span className="num text-[11px] text-[var(--ink-faint)]">{to}</span>
      </aside>

      {/* Мобильный: действие остаётся в досягаемости и несёт то же показание. */}
      <div className="fixed inset-x-0 bottom-0 z-40 xl:hidden">
        <div className="flex items-stretch border-t border-[color-mix(in_oklab,var(--settled-ink)_14%,transparent)] bg-[var(--settled-bg)]">
          <div className="flex shrink-0 flex-col justify-center px-4 py-2.5">
            <span className="label text-[9px] text-[oklch(0.640_0.014_248)]">
              {caption}
            </span>
            <span className="num text-[19px] leading-none font-semibold text-[var(--settled-ink)]">
              {days}
            </span>
          </div>

          <div className="relative w-px shrink-0 bg-[color-mix(in_oklab,var(--settled-ink)_14%,transparent)]" />

          <Link
            href={ctaHref}
            className="flex flex-1 items-center justify-center bg-[var(--color-green)]
              px-4 py-3.5 text-[15px] font-semibold text-[oklch(0.172_0.014_252)]
              [transition:background-color_var(--t-hover)_var(--ease-micro),transform_var(--t-press)_var(--ease-out)] active:scale-[0.99] active:bg-[var(--color-green-lit)]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </>
  );
}
