"use client";

import { useEffect } from "react";

import { track, watchScrollDepth, type EventName } from "@/lib/analytics";

/*
  Запуск сквозной аналитики страницы. Отдельный компонент, а не код внутри
  layout: layout серверный, а слушатели прокрутки существуют только в браузере.

  Ничего не рендерит - только подписывается и отписывается.
*/
export function Boot({ page }: { page: Extract<EventName, "hero_view" | "pro_view"> }) {
  useEffect(() => {
    track(page);
    return watchScrollDepth();
  }, [page]);

  return null;
}
