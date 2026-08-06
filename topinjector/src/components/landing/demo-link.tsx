"use client";

import type { ReactNode } from "react";

import { track, type DiagnosticEvent } from "@/diagnostic/analytics";

/*
  Вторичная кнопка «Посмотреть, как это работает». Ведёт якорем к разделу
  механики и отправляет собственное событие.

  Без него в отчёте видно только тех, кто нажал основной CTA, и совершенно не
  видно тех, кто сначала пошёл разбираться в механике: а это ровно та часть
  профессиональной аудитории, ради которой раздел и написан.
*/
export function DemoLink({
  children,
  href = "#how",
  event = "hero_demo_click",
  place,
}: {
  children: ReactNode;
  href?: string;
  event?: DiagnosticEvent;
  place: string;
}) {
  return (
    <a
      href={href}
      onClick={() => track(event, { place })}
      className="flex min-h-[52px] items-center justify-center rounded-[var(--radius-pill)]
        border border-[var(--rule)] px-6 text-center text-[15px] font-semibold text-[var(--ink)]
        [transition:border-color_var(--t-hover)_var(--ease-micro)] hover:border-[var(--ink)]"
    >
      {children}
    </a>
  );
}
