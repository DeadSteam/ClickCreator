"use client";

import type { ReactNode } from "react";

import { Appear } from "@/motion/appear";

/*
  Появление крупных блоков страницы. Сохранено как имя: им пользуются главная,
  `/pro` и их секции, и переименование ничего бы не улучшило. Вся механика
  живёт в общем `Appear` — здесь остаётся только выбор скорости.
*/
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Appear speed="calm" delay={delay} className={className}>
      {children}
    </Appear>
  );
}
