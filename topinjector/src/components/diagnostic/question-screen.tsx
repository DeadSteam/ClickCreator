"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import type { Question } from "@/diagnostic/questions";
import { GOAL_INSIGHTS } from "@/diagnostic/questions";

/* Пауза между выбором и сменой экрана: успеть прочитать микроинсайт. */
const AUTO_ADVANCE_MS = 2200;

export function QuestionScreen({
  question,
  step,
  total,
  initial,
  onAnswer,
  onBack,
  canBack,
}: {
  question: Question;
  step: number;
  total: number;
  initial: string[];
  onAnswer: (picked: string[]) => void;
  onBack: () => void;
  canBack: boolean;
}) {
  const [picked, setPicked] = useState<string[]>(initial);
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState(false);
  const timer = useRef<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  /*
    Микроинсайт держит экран, но не запирает его: таймер идёт параллельно с
    живой кнопкой «Дальше». Без кнопки одиннадцать принудительных пауз
    складываются в полминуты ожидания, и человек, который уже всё прочитал,
    начинает воспринимать диагностику как медленную.
  */
  const commit = (next: string[]) => {
    setPicked(next);
    setRevealed(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => onAnswer(next), AUTO_ADVANCE_MS);
  };

  const advanceNow = () => {
    if (timer.current) window.clearTimeout(timer.current);
    onAnswer(picked);
  };

  const choose = (id: string) => {
    if (revealed) return;

    if (question.multiple) {
      setError(false);
      setPicked((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
      return;
    }

    commit([id]);
  };

  const insight = question.multiple && question.id === "goal"
    ? GOAL_INSIGHTS[picked[0]] ?? GOAL_INSIGHTS.nothing
    : question.insight;

  const progress = ((step + 1) / total) * 100;

  return (
    <div className="zone-doubt mx-auto flex min-h-dvh w-full max-w-[46rem] flex-col px-5 pt-6 pb-10 sm:px-8">
      {/* Прогресс всегда виден — требование мобильной версии из ТЗ. */}
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="label text-[var(--ink-faint)]">
            Вопрос {step + 1} из {total}
          </span>
          <button
            type="button"
            onClick={onBack}
            disabled={!canBack}
            className="label -mr-2 px-2 py-2 text-[var(--ink-faint)]
              [transition:color_var(--t-hover)_var(--ease-micro)]
              enabled:hover:text-[var(--ink)] disabled:opacity-0"
          >
            Назад
          </button>
        </div>

        <div className="mt-3 h-px w-full bg-[var(--rule)]">
          <motion.div
            className="h-px bg-[var(--accent)]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={reduce ? { duration: 0 } : { duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center py-10">
        <h1 className="max-w-[22ch] text-[28px] leading-[1.08] font-extrabold tracking-[-0.03em] sm:text-[40px]">
          {question.title}
        </h1>

        {question.multiple && (
          <p className="mt-4 text-[14px] text-[var(--ink-faint)]">
            Можно выбрать несколько вариантов
          </p>
        )}

        <ul className="mt-8 flex flex-col gap-2">
          {question.answers.map((a) => {
            const on = picked.includes(a.id);
            return (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => choose(a.id)}
                  aria-pressed={on}
                  disabled={revealed && !on}
                  className={`flex w-full items-center gap-4 rounded-[var(--radius-panel)] border
                    px-5 py-4 text-left text-[16px] leading-snug
                    [transition:border-color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),opacity_var(--t-hover)_var(--ease-micro),transform_var(--t-press)_var(--ease-out)]
                    active:scale-[0.995] disabled:opacity-35
                    ${
                      on
                        ? "border-[var(--ink)] bg-[var(--inset)] font-semibold"
                        : "border-[var(--rule)] hover:border-[var(--ink)]"
                    }`}
                >
                  {/*
                    Метка выбора — квадрат для множественного и круг для
                    одиночного. Разная форма сообщает правило выбора раньше,
                    чем подпись под заголовком: люди не читают инструкции, но
                    видят чекбокс.
                  */}
                  <span
                    aria-hidden="true"
                    className={`block h-[18px] w-[18px] shrink-0 border
                      ${question.multiple ? "rounded-[2px]" : "rounded-full"}
                      ${on ? "border-[var(--ink)] bg-[var(--ink)]" : "border-[var(--rule)]"}`}
                  />
                  {a.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/*
          Кнопка остаётся живой при пустом выборе и объясняет, чего от человека
          ждут. Погашенная кнопка молчит: пользователь видит, что она не
          нажимается, но не понимает почему, и это единственное место
          диагностики, где он может застрять.
        */}
        {question.multiple && !revealed && (
          <div className="mt-6 self-start">
            <button
              type="button"
              onClick={() => (picked.length ? commit(picked) : setError(true))}
              className="rounded-[var(--radius-pill)] bg-[var(--btn-bg)] px-6 py-3.5
                text-[15px] font-semibold text-[var(--btn-ink)]
                [transition:background-color_var(--t-hover)_var(--ease-micro),opacity_var(--t-hover)_var(--ease-micro),transform_var(--t-press)_var(--ease-out)]
                active:scale-[0.975]"
              style={picked.length ? undefined : { opacity: 0.55 }}
            >
              Продолжить
            </button>

            {error && (
              <p
                role="alert"
                className="mt-3 max-w-[42ch] text-[14px] leading-snug"
                style={{ color: "var(--color-risk-critical)" }}
              >
                Выберите вариант, который ближе всего к вашей реальной ситуации.
              </p>
            )}
          </div>
        )}

        {revealed && insight && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className="mt-8 border-t border-[var(--rule)] pt-5"
          >
            <p className="max-w-[62ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
              {insight}
            </p>
            <button
              type="button"
              onClick={advanceNow}
              className="label mt-4 -ml-2 px-2 py-2 text-[var(--accent)]
                [transition:opacity_var(--t-hover)_var(--ease-micro)] hover:opacity-70"
            >
              Дальше →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
