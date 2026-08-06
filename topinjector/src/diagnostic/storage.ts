import type { Answers } from "./scoring";

/*
  Сохранение прохождения (п.3 ТЗ: ответы переживают случайное обновление
  страницы). Двенадцать вопросов — это две-четыре минуты работы, и потерять их
  из-за промаха по кнопке обновления значит потерять пользователя целиком.
*/

const KEY = "topinjector:diagnostic:v1";

export type Saved = {
  answers: Answers;
  /** Индекс текущего вопроса. -1 — стартовый экран, -2 — экран подготовки. */
  step: number;
  startedAt: number;
};

export function load(): Saved | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Saved;
    if (!parsed || typeof parsed.step !== "number" || !parsed.answers) return null;
    return parsed;
  } catch {
    /* Испорченная запись не должна мешать пройти диагностику заново. */
    return null;
  }
}

export function save(data: Saved) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* Приватный режим или переполненное хранилище: просто не сохраняем. */
  }
}

export function clear() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* см. save */
  }
}
