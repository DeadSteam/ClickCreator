"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { APPEAR, EASE_OUT, type AppearSpeed } from "./tokens";

/*
  Появление при прокрутке. Одно на весь сайт.

  Было три копии: `Reveal` на страницах, `Appear` на лендинге, `Rise` в статье.
  Различались они длительностью, порогом видимости и — без всякой причины —
  кривой: у двух была одна, у третьей другая. Каждая новая секция копировала ту
  из трёх, что попалась под руку, и язык движения расползался.

  Разница между ними была настоящей ровно в одном: статья появляется медленнее
  плотной сетки лендинга. Это и осталось — тремя именованными скоростями, а не
  тремя компонентами.

  Появление одноразовое (`once`) намеренно: повторный проигрыш при прокрутке
  вверх превращает страницу в аттракцион и мешает вернуться к прочитанному.
*/
export function Appear({
  children,
  delay = 0,
  speed = "quick",
  className,
}: {
  children: ReactNode;
  /** Ступень в очереди появления. Задаётся вызывающим: он знает порядок. */
  delay?: number;
  speed?: AppearSpeed;
  className?: string;
}) {
  /*
    При уменьшенном движении начальное состояние не задаётся вовсе, а не
    подменяется на нулевой сдвиг: элемент просто рисуется на месте, без кадра
    анимации. Это прямая рекомендация motion для такого случая.
  */
  const reduce = useReducedMotion();
  const { duration, y, margin } = APPEAR[speed];

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
