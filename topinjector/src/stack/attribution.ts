import { track, utm as liveUtm, type DiagnosticEvent } from "@/diagnostic/analytics";
import { TELEGRAM } from "@/landing/config";
import { metriqaTrack } from "./metriqa";

/*
  Сквозная атрибуция /stack — разд. 25 ТЗ «ЦА ПФ-щики» и глава «ИНТЕГРАЦИЯ
  ЛЕНДИНГА С MASTER-АНАЛИТИКОЙ».

  Требование ТЗ: связка «РСЯ → audience → angle → creative → Landing →
  landing_variant → CTA → Telegram → подписка → 3000 кликов → SaaS-аккаунт →
  first_result → paid» не должна ни на одном переходе делать пользователя
  «неизвестным» (разд. 25.17). В этом репозитории нет бэкенда SaaS — он
  появится отдельно на FastAPI, — поэтому здесь реализована ровно фронтенд-часть
  цепочки: захват параметров при первом заходе, персистентность через переход
  на Telegram и обратно, и attribution-aware события/deep-link. Всё, что
  происходит внутри SaaS и Telegram-бота (free_clicks_issued, first_launch,
  first_result, paid), эта страница может только инициировать, но не
  подтвердить — глава master-аналитики, п.8, оставляет их за backend.

  ПЕРСИСТЕНТНОСТЬ. `localStorage`, а не cookie: атрибуция нужна только этому
  фронтенду (сервер её не читает), а `sessionStorage` не пережил бы «открыл
  Telegram → вернулся по ссылке в новой вкладке» — частый путь на мобильном.

  ДВА ИДЕНТИФИКАТОРА. `attribution_id` — постоянный идентификатор рекламного
  привлечения из главы master-аналитики: именно он уходит в Telegram и по нему
  backend восстанавливает audience/angle/creative/UTM/landing_variant.
  `session_id` — тот же по сроку жизни идентификатор из разд. 25.13, который
  уже фигурирует в событиях страницы; ТЗ считает их взаимозаменяемыми
  (разд. 25.6: «session_id или attribution_id»), поэтому оба сохраняются и оба
  уходят в события — переименование сломало бы уже собранные отчёты.

  FIRST TOUCH. Глава master-аналитики, п.1 и разд. 25.10 запрещают
  перезаписывать исходную атрибуцию при повторных заходах: `firstTouch`
  фиксируется один раз за browser storage и дальше не меняется никогда.
  Повторный рекламный вход обновляет только `lastTouch` — «последний известный
  рекламный вход перед конверсией», рекомендованный тем же разд. 25.10.
*/

const STORAGE_KEY = "tpi_stack_attribution_v1";
const RECORD_VERSION = 2;

/** Рекламный вход: то, что ТЗ называет `first_touch_*` / last touch (глава master-аналитики п.1, разд. 25.10). */
export type TouchPoint = {
  source: string | null;
  audience: string | null;
  angle: string | null;
  creative: string | null;
  campaign: string | null;
  at: string;
};

export type Attribution = {
  version: number;
  /** Постоянный идентификатор привлечения: Landing → Telegram → 3000 кликов → SaaS → first_result → paid. */
  attributionId: string;
  sessionId: string;
  /** `?audience=` последнего рекламного входа (разд. 24.11, напр. `competitor_communities`). Сохраняется как есть, включая неизвестные значения (разд. 24.17). */
  audience: string | null;
  /** Сопоставленный со словарём вариант, а не строка из адреса: у неизвестного `?angle=` здесь окажется "default" — тот Hero, который человек реально увидел. */
  angle: string;
  /** Исходная строка `?angle=` как она стояла в объявлении — глава master-аналитики п.2: при неизвестном angle её нужно сохранить отдельно как `raw_angle`. */
  rawAngle: string | null;
  creative: string | null;
  /** Фактически показанный Hero — после сопоставления `angle` со словарём вариантов (разд. 25.12). */
  landingVariant: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  referrer: string | null;
  firstSeenAt: string;
  firstTouch: TouchPoint;
  lastTouch: TouchPoint | null;
  /** Номер визита Roistat, связанный с `attributionId` (глава master-аналитики п.5). `null`, если счётчик не установлен. */
  roistatVisitId: string | null;
};

function genId(): string {
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

function str(value: unknown): string | null {
  return typeof value === "string" && value !== "" ? value : null;
}

function normalizeTouch(value: unknown): TouchPoint | null {
  if (typeof value !== "object" || value === null) return null;
  const t = value as Record<string, unknown>;
  const at = str(t.at);
  if (!at) return null;
  return {
    source: str(t.source),
    audience: str(t.audience),
    angle: str(t.angle),
    creative: str(t.creative),
    campaign: str(t.campaign),
    at,
  };
}

/*
  Читает и запись версии 2, и запись версии 1 (у неё не было ни
  `attribution_id`, ни first/last touch). Ключ хранения общий намеренно:
  завести новый — значит на глазах у вернувшегося пользователя обнулить его
  first-touch-атрибуцию, ровно то, что запрещает глава master-аналитики, п.7.
  Поэтому старая запись достраивается на месте, а не выбрасывается.
*/
function normalize(parsed: unknown): Attribution | null {
  if (typeof parsed !== "object" || parsed === null) return null;
  const r = parsed as Record<string, unknown>;

  const sessionId = str(r.sessionId);
  if (!sessionId) return null;

  const angle = str(r.angle) ?? "default";
  const audience = str(r.audience);
  const creative = str(r.creative);
  const utmSource = str(r.utmSource);
  const utmCampaign = str(r.utmCampaign);
  const firstSeenAt = str(r.firstSeenAt) ?? new Date().toISOString();
  /*
    В записи v1 отсутствие `?angle=` и буквальное `?angle=default` выглядят
    одинаково — обе дают строку "default". Считаем такую запись «параметра не
    было»: это единственная трактовка, которая не выдумывает данные.
  */
  const rawAngle = str(r.rawAngle) ?? (angle === "default" ? null : angle);

  return {
    version: RECORD_VERSION,
    /* v1 не знала attribution_id: роль постоянного идентификатора в ней играл session_id — он и переносится, чтобы уже выданные deep-link'и остались валидными. */
    attributionId: str(r.attributionId) ?? sessionId,
    sessionId,
    audience,
    angle,
    rawAngle,
    creative,
    landingVariant: str(r.landingVariant) ?? angle,
    utmSource,
    utmMedium: str(r.utmMedium),
    utmCampaign,
    utmContent: str(r.utmContent),
    utmTerm: str(r.utmTerm),
    referrer: str(r.referrer),
    firstSeenAt,
    firstTouch: normalizeTouch(r.firstTouch) ?? {
      source: utmSource ?? hostOf(str(r.referrer)),
      audience,
      angle: rawAngle,
      creative,
      campaign: utmCampaign,
      at: firstSeenAt,
    },
    lastTouch: normalizeTouch(r.lastTouch),
    roistatVisitId: str(r.roistatVisitId),
  };
}

function hostOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).host || null;
  } catch {
    return null;
  }
}

function readStored(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return normalize(JSON.parse(raw));
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

/*
  Рекламная идентичность текущего захода — всё, что описывает «по какому
  объявлению человек здесь оказался». Отделена от идентификаторов и от
  `firstTouch` потому, что живёт по другому правилу: новый рекламный вход
  обновляет её целиком, прямой возврат не трогает вовсе (глава
  master-аналитики, п.7 — прямой визит не делает пользователя direct/unknown).

  Обновлять её обязательно всем набором сразу. Частичное обновление уже дало
  ошибку: у вернувшегося по второму объявлению посетителя на экране был Hero
  `second_tool`, а в событие уходил `angle` от прошлой кампании и вовсе не
  уходил `creative` — то есть отчёт разд. 29 (Angle × Creative × Landing)
  считал бы этот визит другой связкой.
*/
type AdIdentity = Pick<
  Attribution,
  | "audience"
  | "angle"
  | "rawAngle"
  | "creative"
  | "landingVariant"
  | "utmSource"
  | "utmMedium"
  | "utmCampaign"
  | "utmContent"
  | "utmTerm"
>;

function adIdentity(p: URLSearchParams, landingVariant: string): AdIdentity {
  return {
    audience: p.get("audience"),
    angle: landingVariant,
    rawAngle: p.get("angle"),
    creative: p.get("creative"),
    landingVariant,
    utmSource: p.get("utm_source"),
    utmMedium: p.get("utm_medium"),
    utmCampaign: p.get("utm_campaign"),
    utmContent: p.get("utm_content"),
    utmTerm: p.get("utm_term"),
  };
}

/** Рекламный вход текущего URL или `null`, если ни одного рекламного параметра нет (прямой заход). */
function adTouch(p: URLSearchParams): TouchPoint | null {
  const angle = p.get("angle");
  const audience = p.get("audience");
  const creative = p.get("creative");
  const source = p.get("utm_source");
  const campaign = p.get("utm_campaign");

  if (!angle && !audience && !creative && !source && !campaign) return null;
  return { source, audience, angle, creative, campaign, at: new Date().toISOString() };
}

/**
 * Создаёт запись атрибуции при первом заходе или восстанавливает уже
 * сохранённую (глава master-аналитики, п.7: прямой возврат не превращает
 * пользователя в direct/unknown). Вызывается со страницы клиентскими
 * компонентами, которые владеют `landingVariant`, полученным от серверного
 * выбора Hero.
 */
export function ensureAttribution(landingVariant: string): Attribution {
  const p = new URLSearchParams(window.location.search);
  const existing = readStored();

  if (existing) {
    const touch = adTouch(p);
    if (!touch) return existing;
    /* Повторный рекламный вход: идентификаторы и first touch неприкосновенны, рекламная идентичность и last touch — от нового объявления. */
    const updated: Attribution = {
      ...existing,
      ...adIdentity(p, landingVariant),
      lastTouch: touch,
    };
    writeStored(updated);
    return updated;
  }

  const now = new Date().toISOString();
  const identity = adIdentity(p, landingVariant);
  const referrer = document.referrer || null;

  const attribution: Attribution = {
    version: RECORD_VERSION,
    attributionId: genId(),
    sessionId: genId(),
    ...identity,
    referrer,
    firstSeenAt: now,
    firstTouch: {
      /* Без UTM источником считается домен перехода: разд. 25.11 требует не терять происхождение даже там, где рекламной разметки не было. */
      source: identity.utmSource ?? hostOf(referrer),
      audience: identity.audience,
      /* Здесь именно исходная строка из объявления: `first_touch_angle` сопоставляется с кампанией, а не с тем, какой Hero отрисовала страница. */
      angle: identity.rawAngle,
      creative: identity.creative,
      campaign: identity.utmCampaign,
      at: now,
    },
    lastTouch: null,
    roistatVisitId: null,
  };

  writeStored(attribution);
  return attribution;
}

/** Только чтение — для компонентов, которым атрибуция уже гарантированно создана (CTA внутри страницы). */
export function getAttribution(): Attribution | null {
  return readStored();
}

/**
 * Связывает номер визита Roistat с `attribution_id` (глава master-аналитики,
 * п.5). Идемпотентна: повторный тот же номер не переписывает запись.
 */
export function linkRoistatVisit(visitId: string): void {
  const a = readStored();
  if (!a || a.roistatVisitId === visitId) return;
  writeStored({ ...a, roistatVisitId: visitId });
}

/**
 * Параметры атрибуции для события аналитики. Состав задан главой
 * master-аналитики, п.3 и разд. 24.13/25.13: attribution_id, audience, angle,
 * creative, landing_variant, UTM и `cta_id` — обязателен на каждом CTA.
 */
export function attributionParams(ctaId?: string): Record<string, string> {
  const a = getAttribution();
  if (!a) return { ...liveUtm() };

  const out: Record<string, string> = {
    attribution_id: a.attributionId,
    session_id: a.sessionId,
    angle: a.angle,
    landing_variant: a.landingVariant,
  };
  /* `raw_angle` уходит всегда, когда параметр вообще был: для известного angle он совпадает с `angle`, для неизвестного — единственный след того, что реально стояло в объявлении. */
  if (a.rawAngle) out.raw_angle = a.rawAngle;
  if (a.audience) out.audience = a.audience;
  if (a.creative) out.creative = a.creative;
  if (a.utmSource) out.utm_source = a.utmSource;
  if (a.utmMedium) out.utm_medium = a.utmMedium;
  if (a.utmCampaign) out.utm_campaign = a.utmCampaign;
  if (a.utmContent) out.utm_content = a.utmContent;
  if (a.utmTerm) out.utm_term = a.utmTerm;
  if (a.roistatVisitId) out.roistat_visit_id = a.roistatVisitId;
  if (ctaId) out.cta_id = ctaId;
  return out;
}

/**
 * First-touch и last-touch срез (глава master-аналитики п.1, разд. 25.10).
 * Отдельно от `attributionParams`, потому что нужен не в каждом событии, а
 * там, где открывается сессия: иначе десять полей ехали бы в каждом просмотре
 * блока, ничего не добавляя к отчёту.
 */
export function touchParams(): Record<string, string> {
  const a = getAttribution();
  if (!a) return {};

  const out: Record<string, string> = {};
  const first = a.firstTouch;
  if (first.source) out.first_touch_source = first.source;
  if (first.audience) out.first_touch_audience = first.audience;
  if (first.angle) out.first_touch_angle = first.angle;
  if (first.creative) out.first_touch_creative = first.creative;
  if (first.campaign) out.first_touch_campaign = first.campaign;
  out.first_touch_at = first.at;

  const last = a.lastTouch;
  if (last) {
    if (last.source) out.last_touch_source = last.source;
    if (last.audience) out.last_touch_audience = last.audience;
    if (last.angle) out.last_touch_angle = last.angle;
    if (last.creative) out.last_touch_creative = last.creative;
    if (last.campaign) out.last_touch_campaign = last.campaign;
    out.last_touch_at = last.at;
  }
  return out;
}

/**
 * `track()` с автоматически подмешанной атрибуцией — чтобы вызывающий код не
 * собирал payload вручную на каждом CTA. Одновременно отправляет событие в
 * Metriqa (глава master-аналитики, п.4) с теми же properties: два приёмника
 * должны видеть один и тот же контекст, иначе отчёты разойдутся.
 */
export function stackTrack(
  event: DiagnosticEvent,
  ctaId?: string,
  extra: Record<string, unknown> = {},
) {
  const params = { ...attributionParams(ctaId), ...extra };
  track(event, params);
  metriqaTrack(event, params);
}

/**
 * Telegram deep-link, переживающий переход (разд. 25.6 и глава
 * master-аналитики п.6 — «перед открытием Telegram должен существовать
 * attribution_id»). Полезная нагрузка `start` держит и место клика, и
 * идентификатор привлечения: по одному `attribution_id` backend восстанавливает
 * audience/angle/creative/UTM/landing_variant, а `cta_id` в самом payload
 * экономит человеку в поддержке одно обращение к аналитике, если он открывает
 * диалог бота напрямую.
 *
 * Чувствительных данных в payload нет и быть не должно (тот же п.6): ни
 * email, ни телефона, ни платёжных реквизитов страница в Telegram не передаёт.
 *
 * ⚠ Конкретный механизм привязки на стороне бота (разд. 25.6/27 ТЗ) должен
 * подтвердить разработчик бэкенда после проверки фактической архитектуры
 * Telegram-бота — здесь зафиксирован только формат payload.
 */
export function attributionBotLink(ctaId: string): string {
  const a = getAttribution();
  const id = a?.attributionId ?? "noattribution";
  /*
    Лимит payload — 64 символа. Обрезать сам идентификатор нельзя: усечённый
    attribution_id backend уже не сопоставит ни с чем. Поэтому при нехватке
    места жертвуем `cta_id` — он дублируется в событии `telegram_open`.
  */
  const full = `stack_${ctaId}_${id}`;
  const payload = full.length <= 64 ? full : `stack_${id}`.slice(0, 64);
  return `${TELEGRAM.bot}?start=${encodeURIComponent(payload)}`;
}
