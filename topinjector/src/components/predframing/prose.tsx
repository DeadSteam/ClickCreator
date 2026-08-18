"use client";

import type { ReactNode } from "react";

import { Appear } from "@/motion/appear";

/** Появление в темпе чтения: сдвиг на 16px и затухание, без слайдов. */
export function Fade({
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
