"use client";

import { useEffect, useRef } from "react";

import { track, type DiagnosticEvent } from "@/diagnostic/analytics";

/*
  События /universal (п.26 ТЗ основного лендинга). Один наблюдатель на все
  отслеживаемые секции — тот же приём, что и `LandingAnalytics` на /service:
  список целей задаётся данными, добавить экран позже — одна строка.
*/
const WATCHED: { id: string; event: DiagnosticEvent }[] = [
  { id: "scenarios", event: "universal_scenarios_view" },
  { id: "product", event: "universal_mechanism_interact" },
  { id: "cases", event: "universal_case_view" },
  { id: "pricing", event: "universal_pricing_view" },
];

export function UniversalAnalytics({ hypothesis }: { hypothesis?: string }) {
  const fired = useRef<Set<string>>(new Set());

  useEffect(() => {
    const once = (name: DiagnosticEvent) => {
      if (fired.current.has(name)) return;
      fired.current.add(name);
      track(name, { hypothesis });
    };

    once("universal_view");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const hit = WATCHED.find((w) => w.id === e.target.id);
          if (hit) once(hit.event);
        }
      },
      { threshold: 0.25 },
    );

    for (const w of WATCHED) {
      const el = document.getElementById(w.id);
      if (el) io.observe(el);
    }

    return () => io.disconnect();
  }, [hypothesis]);

  return null;
}
