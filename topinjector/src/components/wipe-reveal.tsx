"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/*
  Заголовок приходит так, как свет ложится на поверхность: развёрткой от
  ведущего края, а не проявлением. Используется один раз на страницу и только
  на h1. Развёртка везде была бы трюком; здесь она заявляет посылку бренда
  раньше, чем прочитано первое слово.
*/
export function WipeReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.4 }}
      animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      transition={{
        clipPath: { duration: 0.95, delay, ease: [0.23, 1, 0.32, 1] },
        opacity: { duration: 0.3, delay },
      }}
    >
      {children}
    </motion.div>
  );
}
