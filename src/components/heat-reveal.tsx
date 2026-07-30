"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/*
  The headline arrives the way heat travels through metal: a wipe from the
  leading edge rather than a fade. Used once per page, on the h1 only. A wipe
  everywhere would be a gimmick; here it states the brand's premise before a
  word is read.
*/
export function HeatReveal({
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
