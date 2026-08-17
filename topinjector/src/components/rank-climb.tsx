"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { EASE_OUT } from "@/motion/tokens";

/* Position by day, 14 days. Demo figures. */
const SERIES = [47, 46, 44, 41, 38, 33, 29, 24, 19, 15, 11, 8, 6, 4, 3];
const START = SERIES[0];
const END = SERIES[SERIES.length - 1];

const W = 320;
const H = 132;
const x = (i: number) => (i / (SERIES.length - 1)) * W;
const y = (pos: number) => 8 + ((pos - 1) / 49) * (H - 16);

const LINE = SERIES.map(
  (p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p).toFixed(1)}`,
).join(" ");
const AREA = `${LINE} L${W},${H} L0,${H} Z`;

/*
  The page's one moment of delight, and it earns the licence: it plays once, on
  first view, and what it shows is the product's entire claim. The counter is a
  motion value rendered straight to the DOM, so the number ticks without pushing
  a React render every frame.
*/
export function RankClimb() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  const count = useMotionValue(START);
  /*
    Без ведущего нуля: «03» — это запись счётчика, а не позиция. Показание
    прибора должно читаться тем же числом, которое человек увидит в выдаче.
    Ширина держится табличными цифрами шрифта, поэтому счётчик не дёргается,
    когда двузначное число сменяется однозначным.
  */
  const shown = useTransform(count, (v) => String(Math.round(v)));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(END);
      return;
    }
    const controls = animate(count, END, {
      duration: 1.5,
      ease: EASE_OUT,
    });
    return () => controls.stop();
  }, [inView, reduce, count]);

  return (
    <figure ref={ref} className="panel p-5 sm:p-6">
      <div className="flex items-start justify-between gap-6 border-b border-[var(--rule-soft)] pb-4">
        <div className="min-w-0">
          <span className="label text-[var(--ink-faint)]">запрос</span>
          <p className="mt-1.5 truncate text-[14px] text-[var(--ink-soft)]">
            полусухая стяжка пола цена
          </p>
        </div>
        <span className="label shrink-0 border border-[var(--rule)] px-2 py-1 text-[var(--ink-faint)]">
          демо
        </span>
      </div>

      {/*
        Обе величины набраны той же системой, что и показания на странице:
        подпись сверху, число, единица на его базовой линии. Раньше слева
        подпись стояла сбоку от числа, а справа — под ним, и два соседних
        показания в одной панели читались по разным правилам.
      */}
      <div className="flex items-start justify-between gap-4 py-6">
        <div className="metric">
          <span className="metric-cap">позиция сегодня</span>
          <p className="metric-body metric-lg">
            <motion.span className="metric-n">{shown}</motion.span>
          </p>
        </div>
        <motion.div
          className="metric text-right"
          initial={reduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.35 }}
        >
          {/*
            Единицы здесь нет намеренно. Подпись уже назвала величину ростом
            позиций, и слово «позиции» рядом с числом повторяло бы её вторым
            шрифтом — на кегле, где оно всё равно нечитаемо. Единица нужна там,
            где без неё величина неоднозначна; здесь она избыточна.
          */}
          <span className="metric-cap">рост за 14 дней</span>
          <p className="metric-body metric-sm justify-end">
            <span className="metric-n text-[var(--accent)]">+44</span>
          </p>
        </motion.div>
      </div>

      <div className="relative">
<motion.div
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 1.2, ease: EASE_OUT }}
        >
                <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-[124px] w-full sm:h-[140px]"
          preserveAspectRatio="none"
          role="img"
          aria-label="Позиция по запросу выросла с 47 до 3 за четырнадцать дней"
        >
          <defs>
            <linearGradient id="rc-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[1, 10, 25, 50].map((p) => (
            <line
              key={p}
              x1="0"
              x2={W}
              y1={y(p)}
              y2={y(p)}
              stroke="var(--rule-soft)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <motion.path
            d={AREA}
            fill="url(#rc-area)"
            initial={reduce ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          />

          {/*
            Линия рисуется без pathLength.

            Прежняя отрисовка шла через `pathLength`, а он реализован штриховым
            пунктиром: motion гонит `stroke-dasharray` от нуля к единице. У
            этого SVG стоит `preserveAspectRatio="none"` — он растягивается по
            ширине сильнее, чем по высоте, — и штрих растягивается вместе с
            ним, но только вдоль. На крутых участках кривой длина штриха в
            экранных пикселях переставала совпадать с длиной промежутка, и
            линия шла с разрывами. Чем шире панель, тем заметнее: после
            перевода первого экрана на широкую панель дырки стали видны сразу.

            Развёртка перенесена на обёртку (clip-path ниже). Она режет уже
            отрисованный слой и к масштабированию нечувствительна вовсе.
          */}
          <path
            d={LINE}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-col justify-between py-1">
          {[1, 50].map((p) => (
            <span key={p} className="num text-[9px] text-[var(--ink-faint)]">
              {p}
            </span>
          ))}
        </div>
      </div>

      <figcaption className="mt-3 flex justify-between border-t border-[var(--rule-soft)] pt-3">
        <span className="num text-[10px] text-[var(--ink-faint)]">Д1</span>
        <span className="num text-[10px] text-[var(--ink-faint)]">Д14</span>
      </figcaption>
    </figure>
  );
}
