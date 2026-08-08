"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/*
  Макет кабинета для первого экрана. ТЗ требует показать проекты, запросы,
  исходную и текущую позицию, срок и график, причём один запрос должен
  визуально пройти путь 18 → 7 → 3.

  Это схема интерфейса, а не скриншот: настоящих скриншотов ещё нет, а
  подделывать их «под фотографию» нельзя — п.24 ТЗ разрешает реальные
  скриншоты, а не изображения, которые за них выдают. Подпись под макетом
  говорит прямо, что это пример.
*/

const PATH = [18, 7, 3];

const ROWS = [
  { q: "полусухая стяжка пола цена", from: 18, live: true },
  { q: "стяжка пола под ключ казань", from: 24, to: 9 },
  { q: "механизированная стяжка пола", from: 31, to: 14 },
];

export function AppPreview() {
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  /*
    Движение запускается один раз при появлении и на этом останавливается.
    Зациклить его значило бы получить вечно дёргающийся элемент рядом с
    заголовком — ровно то, что мешает читать первый экран.
  */
  useEffect(() => {
    if (reduce) {
      setStep(PATH.length - 1);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let timers: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timers = PATH.map((_, i) =>
          window.setTimeout(() => setStep(i), 700 + i * 900),
        );
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduce]);

  const pos = PATH[step];

  return (
    <figure ref={ref} className="w-full">
      <div className="panel overflow-hidden">
        {/* Шапка кабинета. */}
        <div className="flex items-center justify-between gap-4 border-b border-[var(--rule-soft)] px-5 py-3.5">
          <div className="flex items-baseline gap-2.5">
            <span className="label text-[var(--ink-faint)]">проект</span>
            <span className="text-[14px] font-semibold">stjazhka-kazan.ru</span>
          </div>
          <span className="label text-[var(--ink-faint)]">казань</span>
        </div>

        {/* Таблица запросов. */}
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-5 py-2.5 sm:gap-x-6">
          <span className="label text-[var(--ink-faint)]">запрос</span>
          <span className="label text-right text-[var(--ink-faint)]">было</span>
          <span className="label text-right text-[var(--ink-faint)]">стало</span>
        </div>

        {ROWS.map((r) => (
          <div
            key={r.q}
            className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-t border-[var(--rule-soft)] px-5 py-3 sm:gap-x-6 ${
              r.live ? "bg-[var(--inset)]" : ""
            }`}
          >
            <span className="truncate text-[13px] text-[var(--ink-soft)] sm:text-[14px]">
              {r.q}
            </span>
            <span className="num text-right text-[13px] text-[var(--ink-faint)]">
              {r.from}
            </span>
            {r.live ? (
              <motion.span
                key={pos}
                initial={reduce ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="num text-right text-[17px] font-semibold text-[var(--accent)] sm:text-[19px]"
              >
                {pos}
              </motion.span>
            ) : (
              <span className="num text-right text-[13px] text-[var(--ink-soft)]">
                {r.to}
              </span>
            )}
          </div>
        ))}

        {/* График динамики выделенного запроса. */}
        <div className="border-t border-[var(--rule-soft)] px-5 pt-5 pb-4">
          <div className="flex items-baseline justify-between">
            <span className="label text-[var(--ink-faint)]">динамика запроса</span>
            <span className="label text-[var(--accent)]">в работе</span>
          </div>

          {/*
            Высота поля 84 при разбросе точек в 50: сверху остаётся полоса под
            подпись верхней точки. Раньше поле кончалось ровно на ней, и цифра
            лучшей позиции — та, ради которой график и нарисован — срезалась
            наполовину.
          */}
          <svg viewBox="0 0 300 84" className="mt-3 h-auto w-full" aria-hidden="true">
            <line x1="0" y1="83" x2="300" y2="83" stroke="var(--rule-soft)" strokeWidth="1" />
            {[0, 1, 2].map((i) => {
              const x = 30 + i * 120;
              const y = 22 + (PATH[i] / 20) * 50;
              const on = i <= step;
              return (
                <g key={i}>
                  {i > 0 && (
                    <motion.line
                      x1={30 + (i - 1) * 120}
                      y1={22 + (PATH[i - 1] / 20) * 50}
                      x2={x}
                      y2={y}
                      stroke="var(--accent)"
                      strokeWidth="2"
                      initial={reduce ? false : { pathLength: 0 }}
                      animate={{ pathLength: on ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={on ? 4 : 3}
                    fill={on ? "var(--accent)" : "var(--rule)"}
                  />
                  <text
                    x={x}
                    y={y - 10}
                    textAnchor="middle"
                    className="num"
                    fill={on ? "var(--ink)" : "var(--ink-faint)"}
                    style={{ fontSize: 11, fontWeight: 600 }}
                  >
                    {PATH[i]}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="mt-1 flex justify-between">
            {["день 1", "день 2", "день 4"].map((d) => (
              <span key={d} className="label text-[var(--ink-faint)]">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-[12px] leading-relaxed text-[var(--ink-faint)]">
        Пример интерфейса. Результаты зависят от проекта и запросов.
      </figcaption>
    </figure>
  );
}
