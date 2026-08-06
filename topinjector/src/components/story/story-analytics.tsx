"use client";

import { useEffect, useRef } from "react";
import { track, type DiagnosticEvent } from "@/diagnostic/analytics";

/*
  События статьи из [ANALYTICS]: глубина чтения, дочитывание до «Эврики», время
  на странице, клик по единственной кнопке.

  Глубина считается по максимуму достигнутого, а не по текущему положению:
  иначе возврат наверх после прочтения обнулял бы показатель, и статистика
  сообщала бы, что до конца не дошёл никто.
*/
export function StoryAnalytics() {
  const fired = useRef<Set<string>>(new Set());
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const once = (name: string, params?: Record<string, unknown>) => {
      if (fired.current.has(name)) return;
      fired.current.add(name);
      track(name as DiagnosticEvent, params);
    };

    once("story_view");

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;

      if (pct >= 25) once("story_scroll_25");
      if (pct >= 50) once("story_scroll_50");
      if (pct >= 90) once("story_scroll_90");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Дочитывание до «Эврики» — отдельный KPI документа. */
    const eureka = document.getElementById("eureka");
    const io = eureka
      ? new IntersectionObserver(
          ([e]) => e.isIntersecting && once("story_eureka_reached"),
          { threshold: 0.4 },
        )
      : null;
    if (eureka && io) io.observe(eureka);

    /*
      Время на странице отправляется при уходе. visibilitychange, а не
      beforeunload: на мобильных вкладку чаще сворачивают, чем закрывают, и
      beforeunload там просто не срабатывает.
    */
    const onHide = () => {
      if (document.visibilityState !== "hidden") return;
      const sec = Math.round((Date.now() - startedAt.current) / 1000);
      track("story_time_on_page", { seconds: sec });
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
      io?.disconnect();
    };
  }, []);

  return null;
}
