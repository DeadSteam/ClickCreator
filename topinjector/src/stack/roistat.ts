/*
  Roistat — глава «ИНТЕГРАЦИЯ ЛЕНДИНГА С MASTER-АНАЛИТИКОЙ», п.5 ТЗ:
  «Если Roistat установлен, сохранить связь roistat_visit_id ↔ attribution_id.
  Нельзя терять Roistat visit при дальнейшем переходе пользователя по воронке.»

  Счётчика Roistat на сайте сейчас нет, поэтому весь модуль — по условию «если
  установлен»: ни один вызов не предполагает его присутствия. Как только код
  счётчика появится в разметке, связка заработает без правок страницы.

  ОТКУДА БЕРЁТСЯ НОМЕР ВИЗИТА (документация Roistat, JS SDK → «Визиты»,
  https://help-ru.roistat.com/API/js_sdk/visits/):

    • cookie `roistat_visit` — то, что сам счётчик пишет в браузер и что
      требуется передавать в CRM вместе с заявкой; доступна сразу, если визит
      уже обработан на предыдущем заходе;
    • `window.roistat.getVisit()` — тот же номер из SDK;
    • `window.roistat.registerOnVisitProcessedCallback(cb)` внутри
      `window.onRoistatAllModulesLoaded` — единственный способ дождаться
      номера на ПЕРВОМ заходе, когда визит ещё обрабатывается;
    • `window.roistatVisitCallback(visitId)` — альтернативный хук, который
      счётчик вызывает с готовым номером.

  Берутся все четыре источника: на первом заходе cookie ещё пуста, на
  повторном — колбэки могут не сработать, если счётчик отдал номер до
  монтирования компонента. Первый сработавший источник выигрывает, дальнейшие
  игнорируются, поэтому дублей связки не возникает.

  ЧУЖИЕ ХУКИ НЕ ЗАТИРАЮТСЯ. `onRoistatAllModulesLoaded` и `roistatVisitCallback`
  — глобальные точки расширения, их может занять другой скрипт (например,
  виджет). Поэтому предыдущий обработчик вызывается первым, а наш — следом.
*/

type RoistatSdk = {
  getVisit?: () => string | number | undefined;
  registerOnVisitProcessedCallback?: (callback: () => void) => void;
};

declare global {
  interface Window {
    roistat?: RoistatSdk;
    onRoistatAllModulesLoaded?: () => void;
    roistatVisitCallback?: (visitId: string | number) => void;
  }
}

const VISIT_COOKIE = "roistat_visit";

/** Номер визита из cookie, которую пишет сам счётчик. `null`, если Roistat не установлен или визит ещё не обработан. */
export function readRoistatVisitCookie(): string | null {
  if (typeof document === "undefined") return null;

  for (const part of document.cookie.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === VISIT_COOKIE) {
      const value = decodeURIComponent(rest.join("="));
      return value === "" ? null : value;
    }
  }
  return null;
}

function fromSdk(): string | null {
  const visit = window.roistat?.getVisit?.();
  return visit === undefined || visit === null || visit === "" ? null : String(visit);
}

/**
 * Подписывается на номер визита Roistat и вызывает `onVisit` ровно один раз,
 * когда номер стал известен. Возвращает функцию отписки: после неё колбэк не
 * вызывается, даже если счётчик догрузился позже (страница уже размонтирована).
 *
 * Если Roistat на сайте нет, `onVisit` просто никогда не вызывается — это
 * штатный сценарий по п.5 ТЗ, а не ошибка.
 */
export function watchRoistatVisit(onVisit: (visitId: string) => void): () => void {
  if (typeof window === "undefined") return () => {};

  let done = false;
  const deliver = (visitId: string | null) => {
    if (done || !visitId) return;
    done = true;
    onVisit(visitId);
  };

  deliver(readRoistatVisitCookie() ?? fromSdk());
  if (done) return () => {};

  const previousModulesLoaded = window.onRoistatAllModulesLoaded;
  window.onRoistatAllModulesLoaded = () => {
    previousModulesLoaded?.();
    window.roistat?.registerOnVisitProcessedCallback?.(() => {
      deliver(fromSdk() ?? readRoistatVisitCookie());
    });
  };

  const previousVisitCallback = window.roistatVisitCallback;
  window.roistatVisitCallback = (visitId) => {
    previousVisitCallback?.(visitId);
    deliver(visitId === undefined || visitId === null ? null : String(visitId));
  };

  return () => {
    done = true;
  };
}
