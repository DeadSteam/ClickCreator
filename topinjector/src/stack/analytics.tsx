"use client";

import { useEffect, useRef } from "react";

import type { DiagnosticEvent } from "@/diagnostic/analytics";
import { ensureAttribution, linkRoistatVisit, stackTrack, touchParams } from "./attribution";
import { watchRoistatVisit } from "./roistat";

/*
  Аналитика /stack — разд. 28 ТЗ («обязательные dimensions» + «events») и
  глава «ИНТЕГРАЦИЯ ЛЕНДИНГА С MASTER-АНАЛИТИКОЙ», п.4/5.

  Один наблюдатель на страницу, как и в `predframing/analytics.ts`: блоков
  почти столько же (девять размеченных из шестнадцати — остальные не несут
  отдельного события по ТЗ), и отдельный таймер на каждый не сводится потом в
  один отчёт. Отличие от predframing-версии — не гипотеза, а audience/angle/
  creative/landing_variant/attribution_id несёт каждое событие через
  `stackTrack`.
*/

/*
  Тот же атрибут, что `Section`/`Chapter` (`@/components/landing/sections`,
  `@/components/predframing/prose`) уже проставляют сами по `id` — отдельный
  `data-stack-block` заставил бы вручную дублировать разметку на каждом блоке
  страницы. Коллизии с предфрейминговой аналитикой нет: там свой хук
  (`usePredframingAnalytics`) и он не подключается на этой странице.
*/
const BLOCK_ATTR = "data-pf-block";

/** id блока → его событие просмотра. Блоки без записи здесь событие не шлют — как FAQ/CTA-архитектура, у них свои триггеры (клик, open). */
const BLOCK_EVENTS: Record<string, DiagnosticEvent> = {
  hero: "hero_view",
  "new-criterion": "belief_shift_view",
  "product-bridge": "product_bridge_view",
  "controlled-test": "controlled_test_view",
  interface: "interface_view",
  "parallel-use": "parallel_use_view",
  safety: "safety_view",
  cases: "case_view",
  pricing: "pricing_view",
};

export function StackAnalytics({
  landingVariant,
  audience,
}: {
  landingVariant: string;
  /** `?audience=` этой загрузки, как его прочитал сервер (разд. 24.11/24.13). */
  audience: string | null;
}) {
  const seen = useRef<Set<string>>(new Set());
  const depth = useRef(0);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    ensureAttribution(landingVariant);

    /*
      `landing_variant` и `audience` идут в `extra` и потому перебивают то, что
      `attributionParams` иначе взяла бы из сохранённой (замороженной на
      first touch) записи атрибуции. Без этой перебивки возвращающийся
      посетитель с новым `?angle=`/`?audience=` в адресе увидел бы на экране
      один Hero, а событие ушло бы с параметрами от самого первого визита —
      расхождение между тем, что показано, и тем, что записано в аналитику.
    */
    const current: Record<string, unknown> = { landing_variant: landingVariant };
    if (audience) current.audience = audience;

    /* Открытие сессии — единственное событие, которому нужен полный first/last-touch срез. */
    stackTrack("landing_view", undefined, { ...current, ...touchParams() });

    /*
      `block`, а не `cta_id`. Разд. 25.13 ТЗ отводит `cta_id` под точки CTA и
      перечисляет для него закрытый словарь (hero, product_bridge,
      controlled_test, cases, calculator, final), а глава master-аналитики
      добавляет «cta_id — где применимо». К просмотру блока он не применим:
      подставляя туда id секции, страница отправляла в отчёт значения вроде
      `new-criterion` и `parallel-use`, из-за которых разрез по CTA переставал
      быть разрезом по CTA.
    */
    if (!seen.current.has("hero")) {
      seen.current.add("hero");
      stackTrack("hero_view", undefined, { ...current, block: "hero" });
    }

    /* Roistat: связка roistat_visit_id ↔ attribution_id, если счётчик установлен. */
    const unwatchRoistat = watchRoistatVisit(linkRoistatVisit);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.getAttribute(BLOCK_ATTR);
          if (!id || seen.current.has(id)) continue;
          seen.current.add(id);
          const event = BLOCK_EVENTS[id];
          if (event) stackTrack(event, undefined, { ...current, block: id });
        }
      },
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

    const onHide = () => {
      if (document.visibilityState !== "hidden") return;
      stackTrack("landing_leave", undefined, {
        ...current,
        depth_pct: depth.current,
        seconds: Math.round((Date.now() - startedAt.current) / 1000),
      });
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      io.disconnect();
      unwatchRoistat();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [landingVariant, audience]);

  return null;
}
