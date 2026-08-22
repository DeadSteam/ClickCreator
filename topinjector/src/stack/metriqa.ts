import type { DiagnosticEvent } from "@/diagnostic/analytics";

/*
  Metriqa — глава «ИНТЕГРАЦИЯ ЛЕНДИНГА С MASTER-АНАЛИТИКОЙ», п.4 ТЗ.

  ТЗ задаёт список frontend-событий в собственной номенклатуре мастер-аналитики
  (`landing_viewed`, `hero_cta_clicked`, …) — в прошедшем времени, в отличие от
  разд. 28, где те же события названы `landing_view`, `hero_cta_click`.
  Разд. 25.8 прямо разрешает разные имена при сохранении бизнес-смысла, поэтому
  внутренний словарь событий не переименовывается: вместо этого здесь стоит
  таблица соответствия, и одно и то же действие уходит в dataLayer/Метрику под
  своим именем, а в Metriqa — под своим.

  ⚠ ТРАНСПОРТ ТРЕБУЕТ ПОДТВЕРЖДЕНИЯ. Публичной документации по клиентскому
  API Metriqa нет, а счётчик на сайте пока не установлен. Изобретать сигнатуру
  нельзя, потерять события — тоже, поэтому здесь ровно то, что можно утверждать
  без документации:

    1. Каждое событие всегда кладётся в очередь `window.metriqaDataLayer` —
       её достаточно, чтобы подключить любой реальный сниппет постфактум, не
       трогая ни один вызов на странице (события до загрузки счётчика не
       теряются, как и в dataLayer у GTM).
    2. Если объект `window.metriqa` уже есть, вызов делается по фактической
       форме объекта — функция, `.track()` или `.push()`. Это три конвенции,
       которые покрывают подавляющее большинство сниппетов; неизвестная форма
       не приводит к падению, событие остаётся в очереди.

  Разработчику, подключающему настоящий счётчик: точная форма вызова
  подтверждается у команды Metriqa, менять нужно только `dispatch` ниже.
*/

type MetriqaFn = (event: string, properties: Record<string, unknown>) => void;

type MetriqaClient =
  | MetriqaFn
  | {
      track?: MetriqaFn;
      push?: (envelope: MetriqaEnvelope) => void;
    };

export type MetriqaEnvelope = {
  event: string;
  properties: Record<string, unknown>;
  /** ISO-время постановки в очередь: события могут уйти позже загрузки счётчика. */
  ts: string;
};

declare global {
  interface Window {
    metriqa?: MetriqaClient;
    metriqaDataLayer?: MetriqaEnvelope[];
  }
}

/**
 * Внутреннее имя события → имя в Metriqa (п.4 ТЗ, пятнадцать обязательных
 * frontend-событий). События без записи здесь в Metriqa не уходят: остальные
 * пункты разд. 28 (`free_clicks_issued`, `first_launch`, `first_result`,
 * `first_payment` …) фиксирует backend/SaaS, а не лендинг.
 */
const METRIQA_EVENTS: Partial<Record<DiagnosticEvent, string>> = {
  landing_view: "landing_viewed",
  hero_view: "hero_viewed",
  hero_cta_click: "hero_cta_clicked",
  belief_shift_view: "belief_shift_viewed",
  product_bridge_view: "product_bridge_viewed",
  controlled_test_view: "controlled_test_viewed",
  interface_view: "interface_viewed",
  free_clicks_cta_click: "free_clicks_cta_clicked",
  parallel_use_view: "parallel_use_viewed",
  safety_view: "safety_viewed",
  case_view: "case_viewed",
  calculator_use: "calculator_used",
  pricing_view: "pricing_viewed",
  faq_open: "faq_opened",
  telegram_open: "telegram_opened",
};

function dispatch(envelope: MetriqaEnvelope) {
  const client = window.metriqa;
  if (!client) return;

  if (typeof client === "function") {
    client(envelope.event, envelope.properties);
    return;
  }
  if (typeof client.track === "function") {
    client.track(envelope.event, envelope.properties);
    return;
  }
  if (typeof client.push === "function") {
    client.push(envelope);
  }
}

/**
 * Отправляет событие в Metriqa, если оно входит в список п.4 ТЗ. Как и
 * `track()` в `@/diagnostic/analytics`, никогда не бросает: аналитика не повод
 * ломать страницу.
 */
export function metriqaTrack(event: DiagnosticEvent, properties: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const name = METRIQA_EVENTS[event];
  if (!name) return;

  const envelope: MetriqaEnvelope = { event: name, properties, ts: new Date().toISOString() };

  try {
    window.metriqaDataLayer = window.metriqaDataLayer ?? [];
    window.metriqaDataLayer.push(envelope);
    dispatch(envelope);
  } catch {
    /* Счётчик мог упасть внутри себя — событие уже в очереди, страница живёт дальше. */
  }
}
