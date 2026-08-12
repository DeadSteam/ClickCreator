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
  /*
    Предфрейминговые лендинги (п.20 ТЗ UX-дизайнеру). Десять версий первых
    экранов ходят одним набором событий: различает их параметр `hypothesis`, а
    не имя события. Иначе словарь распух бы вдесятеро, и ни один отчёт не смог
    бы сравнить гипотезы между собой.
  */
  | "pf_view"
  | "pf_leave"
  | "pf_hero_cta_click"
  | "pf_secondary_click"
  | "pf_block_view"
  | "pf_block_time"
  | "pf_continue_click"
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
  | "trial_started"
  /*
    Telegram-связка. Лендинг видит только первые два события — клик и уход в
    бота. Всё, что дальше (запуск бота, привязка аккаунта, переход в канал,
    проверка подписки, начисление лимитов, возврат в сервис, первый проект),
    происходит вне страницы и приходит от бота с тем же deep-link-параметром,
    по которому эти цепочки и склеиваются.
  */
  | "tg_cta_click"
  | "tg_bot_open"
  | "tg_bot_start"
  | "tg_account_linked"
  | "tg_channel_open"
  | "tg_subscription_confirmed"
  | "tg_limits_granted"
  | "tg_return_to_app"
  | "first_project_created"
  /*
    Основной лендинг /universal (п.26 ТЗ основного лендинга). Продолжает
    предфрейминговую воронку: гипотеза передаётся параметром `hypothesis` в
    каждом событии, а не отдельным именем — так десять версий входа остаются
    сравнимыми на одном экране аналитики.
  */
  | "universal_view"
  | "universal_hero_cta_click"
  | "universal_how_it_works_click"
  | "universal_scenarios_view"
  | "universal_mechanism_interact"
  | "universal_case_view"
  | "universal_limits_open"
  | "universal_pricing_view"
  | "universal_plan_select"
  | "universal_faq_open"
  | "universal_form_start"
  | `universal_form_step_${number}_complete`
  | "universal_form_submit"
  /*
    Психологические спец-лендинги (Мастер-промпт + ТЗ 1.1/1.2). Одна страница
    на гипотезу, один набор событий на все гипотезы — различает их параметр
    `hypothesis_id` в payload, а не имя события, тем же приёмом, что и pf_*.
  */
  | "hero_view"
  | "hero_cta_click"
  | "belief_shift_view"
  | "practical_consequence_view"
  | "product_bridge_view"
  | "product_bridge_cta_click"
  | "mechanism_view"
  | "interface_view"
  | "free_limits_view"
  | "free_limits_cta_click"
  | "parallel_test_view"
  | "calculator_view"
  | "calculator_use"
  | "final_cta_view"
  | "final_cta_click"
  | "first_limit_used"
  | "free_limits_exhausted"
  | "payment_start"
  | "first_payment"
  /*
    /stack — «второй ПФ-инструмент» (ТЗ на лендинг ЦА ПФ-щики, разд. 24/27).
    Страница с динамическим Hero по параметру ?angle= требует сквозной
    атрибуции до оплаты: имена события здесь заданы ТЗ дословно и не
    переиспользуют близкие по смыслу события выше (`parallel_test_view` и
    `parallel_use_view` — разные страницы, разные ТЗ, путать нельзя). Каждое
    событие несёт `angle`/`creative`/`landing_variant`/`session_id`/`cta_id`
    из `@/stack/attribution` — без них десять входов неразличимы.
  */
  | "controlled_test_view"
  | "parallel_use_view"
  | "telegram_open"
  | "subscription_confirmed"
  | "free_clicks_issued"
  | "free_clicks_cta_click"
  | "product_open"
  | "first_launch"
  | "first_click_used"
  | "first_result";

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
