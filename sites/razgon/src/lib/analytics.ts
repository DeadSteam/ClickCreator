/*
  Единая схема событий для всех шести лендингов.

  Файл намеренно продублирован в каждом сайте, а не вынесен в общий пакет:
  сайты независимы и деплоятся по отдельности. Цена дубля - сотня строк,
  цена связанности - невозможность выкатить один сайт, не тронув остальные.

  ГЛАВНОЕ ПРАВИЛО: имена событий и набор параметров менять только одновременно
  во всех шести. Если на одном сайте событие называется иначе, этот сайт
  выпадает из сравнения, а весь смысл запуска нескольких сайтов - в сравнении.
*/

/** Идентификатор варианта. Уходит параметром в каждое событие. */
export const VARIANT: string =
  process.env.NEXT_PUBLIC_VARIANT ?? "unknown";

/**
 * Канонический список. Строковый union, а не enum: опечатка в имени события
 * ломает сборку, а не тихо создаёт мусорную метрику, которую заметишь через месяц.
 */
export type EventName =
  /* Первый экран отрисован. Знаменатель для всех остальных конверсий. */
  | "hero_view"
  /* Клик по любой кнопке целевого действия. Параметр place говорит, по какой. */
  | "cta_click"
  /* Пользователь тронул калькулятор. Первое реальное вовлечение. */
  | "calc_interact"
  /* Расчёт досчитался и был увиден. Параметры несут сами цифры. */
  | "calc_result"
  /* Блок цен попал в зону видимости. */
  | "pricing_view"
  /* Блок доказательств (кейсы, отзывы, реестр) попал в зону видимости. */
  | "proof_view"
  /* Раскрыт вопрос в FAQ. Параметр id - какой именно. */
  | "faq_open"
  /* Клик по контакту: телеграм, почта, телефон. */
  | "contact_click"
  /* Глубина прокрутки. Параметр depth: 25 | 50 | 75 | 100. */
  | "scroll_depth"
  /* Уход в личный кабинет. Финальное целевое действие лендинга. */
  | "register_outbound"
  /* Открыта страница для агентств. */
  | "pro_view";

export type EventParams = Record<string, string | number | boolean>;

type MetrikaFn = (id: number, method: string, ...rest: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    ym?: MetrikaFn;
  }
}

/**
 * Отправка события. Работает и без установленных счётчиков: тогда просто
 * копит в dataLayer, а GTM или Метрика подберут его при подключении.
 *
 * Ошибку счётчика глушим намеренно: аналитика никогда не должна ронять страницу.
 */
export function track(name: EventName, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  const payload = { event: name, variant: VARIANT, ...params };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  const counterId = Number(process.env.NEXT_PUBLIC_YM_ID);
  if (window.ym && Number.isFinite(counterId) && counterId > 0) {
    try {
      window.ym(counterId, "reachGoal", name, payload);
    } catch {
      /* счётчик не должен ломать страницу */
    }
  }
}

/**
 * Одноразовое событие при появлении элемента в зоне видимости.
 *
 * Порог 0.4, а не 0: иначе "секция увидена" срабатывает на пикселе,
 * зацепившемся снизу экрана, и цифра перестаёт что-либо значить.
 * Возвращает функцию отписки для useEffect.
 */
export function trackOnView(
  el: Element | null,
  name: EventName,
  params: EventParams = {},
): () => void {
  if (!el || typeof IntersectionObserver === "undefined") return () => {};

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        track(name, params);
        io.disconnect();
      }
    },
    { threshold: 0.4 },
  );

  io.observe(el);
  return () => io.disconnect();
}

/**
 * Глубина прокрутки четвертями. Каждая отметка отправляется один раз за визит.
 *
 * Слушатель пассивный и считает через requestAnimationFrame: замер scrollY
 * в обработчике scroll без кадрового троттлинга - классическая причина
 * дёрганой прокрутки на телефоне.
 */
export function watchScrollDepth(): () => void {
  if (typeof window === "undefined") return () => {};

  const marks = [25, 50, 75, 100];
  const fired = new Set<number>();
  let ticking = false;

  const measure = () => {
    ticking = false;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;

    const pct = ((window.scrollY / scrollable) * 100) | 0;
    for (const mark of marks) {
      if (pct >= mark && !fired.has(mark)) {
        fired.add(mark);
        track("scroll_depth", { depth: mark });
      }
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(measure);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}
