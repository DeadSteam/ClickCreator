import { track, utm as liveUtm, type DiagnosticEvent } from "@/diagnostic/analytics";
import { TELEGRAM } from "@/landing/config";

/*
  Сквозная атрибуция /stack — разд. 24 ТЗ «ЦА ПФ-щики».

  Требование ТЗ: связка «РСЯ → angle → creative → Landing → landing_variant →
  CTA → Telegram → подписка → 3000 кликов → SaaS-аккаунт → first_result →
  paid» не должна ни на одном переходе делать пользователя «неизвестным»
  (п.24.17). В этом репозитории нет бэкенда SaaS — он появится отдельно на
  FastAPI, — поэтому здесь реализована ровно фронтенд-часть цепочки: захват
  параметров при первом заходе, персистентность через переход на Telegram и
  обратно, и attribution-aware события/deep-link. Всё, что происходит внутри
  SaaS и Telegram-бота (first_project_created и далее), эта страница может
  только инициировать, но не подтвердить — see `ManualInputInline` в разметке.

  ПЕРСИСТЕНТНОСТЬ. `localStorage`, а не cookie: атрибуция нужна только этому
  фронтенду (сервер её не читает), а `sessionStorage` не пережил бы «открыл
  Telegram → вернулся по ссылке в новой вкладке» — частый путь на мобильном.

  FIRST TOUCH. П.24.10 ТЗ прямо запрещает перезаписывать исходную атрибуцию
  при повторных заходах: `ensureAttribution` создаёт запись только один раз за
  browser storage и дальше всегда возвращает её же, даже если пользователь
  вернулся с другим `angle` в URL.
*/

const STORAGE_KEY = "tpi_stack_attribution_v1";

export type Attribution = {
  sessionId: string;
  /** Сырое значение `angle` из URL первого захода. "default", если параметра не было. */
  angle: string;
  creative: string | null;
  /** Фактически показанный Hero — после сопоставления `angle` со словарём вариантов (разд. 24.12 ТЗ). */
  landingVariant: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  referrer: string | null;
  firstSeenAt: string;
};

function genSessionId(): string {
  /*
    Telegram deep-link payload допускает только `[A-Za-z0-9_-]{1,64}` — поэтому
    id генерируется уже в этом алфавите, а не как UUID с дефисами (дефис
    Telegram пропускает, но лишний риск незачем).
  */
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "");
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

function readStored(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

function writeStored(a: Attribution) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    /* Приватный режим/квота — атрибуция становится one-shot, но страница не падает. */
  }
}

/**
 * Создаёт запись атрибуции при первом заходе или возвращает уже сохранённую
 * (first-touch). Вызывается один раз со страницы — клиентским компонентом
 * `StackAnalytics`, который и владеет `landingVariant`, полученным от
 * серверного выбора Hero.
 */
export function ensureAttribution(landingVariant: string): Attribution {
  const existing = readStored();
  if (existing) return existing;

  const p = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    sessionId: genSessionId(),
    angle: p.get("angle") ?? "default",
    creative: p.get("creative"),
    landingVariant,
    utmSource: p.get("utm_source"),
    utmMedium: p.get("utm_medium"),
    utmCampaign: p.get("utm_campaign"),
    utmContent: p.get("utm_content"),
    utmTerm: p.get("utm_term"),
    referrer: document.referrer || null,
    firstSeenAt: new Date().toISOString(),
  };

  writeStored(attribution);
  return attribution;
}

/** Только чтение — для компонентов, которым атрибуция уже гарантированно создана (CTA внутри страницы). */
export function getAttribution(): Attribution | null {
  return readStored();
}

/** Параметры атрибуции для события аналитики. `cta_id` — п.24.13 ТЗ: обязателен на каждом CTA. */
export function attributionParams(ctaId?: string): Record<string, string> {
  const a = getAttribution();
  if (!a) return { ...liveUtm() };

  const out: Record<string, string> = {
    session_id: a.sessionId,
    angle: a.angle,
    landing_variant: a.landingVariant,
  };
  if (a.creative) out.creative = a.creative;
  if (a.utmSource) out.utm_source = a.utmSource;
  if (a.utmMedium) out.utm_medium = a.utmMedium;
  if (a.utmCampaign) out.utm_campaign = a.utmCampaign;
  if (a.utmContent) out.utm_content = a.utmContent;
  if (a.utmTerm) out.utm_term = a.utmTerm;
  if (ctaId) out.cta_id = ctaId;
  return out;
}

/** `track()` с автоматически подмешанной атрибуцией — чтобы вызывающий код не собирал payload вручную на каждом CTA. */
export function stackTrack(event: DiagnosticEvent, ctaId?: string, extra: Record<string, unknown> = {}) {
  track(event, { ...attributionParams(ctaId), ...extra });
}

/**
 * Telegram deep-link, переживающий переход (п.24.6 ТЗ — «переход в Telegram не
 * должен обрывать attribution chain»). Полезная нагрузка `start` держит и
 * место клика, и сессию: одного `session_id` достаточно, чтобы связать
 * дальнейшие события бота с этой атрибуцией, но `cta_id` в самом payload
 * экономит человеку в поддержке одно обращение к аналитике, если он открывает
 * диалог бота напрямую.
 *
 * ⚠ Конкретный механизм привязки на стороне бота (разд. 24.6/26 ТЗ) должен
 * подтвердить разработчик бэкенда после проверки фактической архитектуры
 * Telegram-бота — здесь зафиксирован только формат payload.
 */
export function attributionBotLink(ctaId: string): string {
  const a = getAttribution();
  const sessionPart = a?.sessionId ?? "nosession";
  const payload = `stack_${ctaId}_${sessionPart}`.slice(0, 64);
  return `${TELEGRAM.bot}?start=${encodeURIComponent(payload)}`;
}
