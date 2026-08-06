/*
  События диагностики (п.20 ТЗ). Счётчика Метрики на сайте пока нет, поэтому
  слой намеренно тонкий: пишет в dataLayer и вызывает ym, если он появился.

  Без обёртки каждый вызов на странице пришлось бы городить проверками
  существования — и первый же забытый привёл бы к падению всей диагностики
  из-за отсутствующей аналитики. Событие никогда не должно ломать прохождение.
*/

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    ym?: (id: number, action: string, target: string, params?: unknown) => void;
    ymCounterId?: number;
  }
}

/*
  Единый словарь событий всей воронки: диагностика, статья, лендинг. Держится в
  одном месте, потому что параметры у них общие (UTM, индекс диагностики,
  сегмент) и сквозная аналитика собирает их в одну цепочку.
*/
export type DiagnosticEvent =
  /* Диагностика */
  | "diagnostic_view"
  | "diagnostic_start"
  | `question_${number}_answered`
  | "diagnostic_completed"
  | "result_low"
  | "result_medium"
  | "result_high"
  | "result_critical"
  | "result_contact_submitted"
  | "diagnostic_exit"
  /* Статья */
  | "story_view"
  | `story_scroll_${number}`
  | "story_eureka_reached"
  | "story_time_on_page"
  | "story_cta_clicked"
  /* Лендинг */
  | "landing_view"
  | "landing_leave"
  | "hero_trial_click"
  | "hero_demo_click"
  | "how_it_works_view"
  | "case_view"
  | "case_detail_click"
  | "demo_play"
  | "demo_complete"
  | "safety_view"
  | "pricing_view"
  | "pricing_plan_click"
  | "faq_open"
  | "final_trial_click"
  | "signup_start"
  | "signup_complete"
  | "trial_started";

export function track(event: DiagnosticEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const payload = { ...utm(), ...params };

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...payload });

    if (window.ym && window.ymCounterId) {
      window.ym(window.ymCounterId, "reachGoal", event, payload);
    }
  } catch {
    /* Аналитика не повод прерывать прохождение. */
  }
}

/** UTM и идентификатор объявления — обязательные параметры всех событий (п.20). */
export function utm(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const p = new URLSearchParams(window.location.search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ];

  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = p.get(k);
    if (v) out[k] = v;
  }

  const creative = p.get("yclid") ?? p.get("creative") ?? p.get("ad_id");
  if (creative) out.creative_id = creative;

  return out;
}
