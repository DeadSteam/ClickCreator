"use client";

import { useEffect, useRef } from "react";

import { track } from "@/diagnostic/analytics";
import type { HypothesisId } from "./hypotheses";

/*
  Аналитика предфрейминговой страницы.

  ТЗ (п.20) требует пять величин: просмотр первого экрана, доскролл до каждого
  смыслового блока, время на каждом блоке, клики по CTA и уход со страницы с
  глубиной просмотра. Всё меряется одним наблюдателем на странице, а не хуком в
  каждом блоке: блоков полдесятка, и отдельные таймеры невозможно свести в один
  отчёт.

  Каждое событие несёт `hypothesis` — без него десять версий страницы
  неотличимы, а вся система построена на их сравнении.
*/

/** Блоки наблюдаются по `data-pf-block`: список задаёт разметка, а не этот модуль. */
const BLOCK_ATTR = "data-pf-block";

export function usePredframingAnalytics(hypothesis: HypothesisId) {
  /*
    Значения в ref, а не в state: ни одно из них не влияет на разметку, и
    обновление состояния на каждый пиксель прокрутки перерисовывало бы страницу.
  */
  const seen = useRef<Set<string>>(new Set());
  const enteredAt = useRef<Map<string, number>>(new Map());
  const spent = useRef<Map<string, number>>(new Map());
  const depth = useRef(0);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const base = { hypothesis };
    track("pf_view", base);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.getAttribute(BLOCK_ATTR);
          if (!id) continue;

          if (e.isIntersecting) {
            if (!seen.current.has(id)) {
              seen.current.add(id);
              track("pf_block_view", { ...base, block: id });
            }
            enteredAt.current.set(id, Date.now());
            continue;
          }

          /* Время копится: возврат к блоку — такая же часть внимания, как первый заход. */
          const from = enteredAt.current.get(id);
          if (from === undefined) continue;
          enteredAt.current.delete(id);
          spent.current.set(id, (spent.current.get(id) ?? 0) + (Date.now() - from));
        }
      },
      /* Четверть блока в кадре: длинный блок целиком в окно не помещается. */
      { threshold: 0.25 },
    );

    for (const el of document.querySelectorAll(`[${BLOCK_ATTR}]`)) io.observe(el);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      depth.current = Math.max(depth.current, Math.round((window.scrollY / max) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /*
      Отчёт уходит при уходе со страницы, а не по таймеру: иначе на каждую
      секунду чтения приходилось бы событие. `visibilitychange` — единственное
      событие, которое переживает закрытие вкладки на мобильных.
    */
    const onHide = () => {
      if (document.visibilityState !== "hidden") return;

      const now = Date.now();
      for (const [id, from] of enteredAt.current) {
        spent.current.set(id, (spent.current.get(id) ?? 0) + (now - from));
      }
      enteredAt.current.clear();

      for (const [id, ms] of spent.current) {
        track("pf_block_time", { ...base, block: id, seconds: Math.round(ms / 1000) });
      }
      spent.current.clear();

      track("pf_leave", {
        ...base,
        depth_pct: depth.current,
        seconds: Math.round((now - startedAt.current) / 1000),
      });
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [hypothesis]);
}

/** Клики страницы. Обёртка, чтобы `hypothesis` не забывали передавать руками. */
export function pfClick(
  event: "pf_hero_cta_click" | "pf_secondary_click" | "pf_continue_click",
  hypothesis: HypothesisId,
  place: string,
) {
  track(event, { hypothesis, place });
}
