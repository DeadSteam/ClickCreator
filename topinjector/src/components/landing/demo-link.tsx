"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
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
    /*
      Размер lg, как у главного действия рядом: вторичная кнопка отличается
      материалом, а не ростом. Разная высота в паре читалась как разный статус
      элементов, хотя оба — шаги одного выбора.
    */
    <Button
      variant="secondary"
      size="lg"
      block
      href={href}
      onClick={() => track(event, { place })}
      /*
        На узком экране кнопка занимает всю ширину, на широком — только свою
        подпись. Без ограничения она как flex-элемент забирала весь остаток
        строки и оказывалась втрое шире главного действия рядом.
      */
      className="sm:w-auto"
    >
      {children}
    </Button>
  );
}
