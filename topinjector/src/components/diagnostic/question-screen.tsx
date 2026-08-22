"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import type { Question } from "@/diagnostic/questions";
import { GOAL_INSIGHTS } from "@/diagnostic/questions";
import { EASE_OUT } from "@/motion/tokens";

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
    <div className="wrap wrap-read flex min-h-dvh flex-col pt-6 pb-10">
      {/* Прогресс всегда виден — требование мобильной версии из ТЗ. */}
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="label text-[var(--ink-faint)]">
            Вопрос {step + 1} из {total}
          </span>
          {/*
            Возврат остаётся в габаритах системы (44 пикселя высоты, кольцо
            фокуса), но набран подписью и потому не спорит с вопросом.
            Отключённый прячется целиком: на первом вопросе возвращаться некуда,
            и погашенная кнопка сообщала бы о недоступном действии вместо того,
            чтобы не сообщать ни о чём.
          */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onBack}
            disabled={!canBack}
            icon={
              <span aria-hidden="true" className="num text-[0.9em] leading-none">
                ←
              </span>
            }
            className="-mr-1 disabled:opacity-0"
          >
            Назад
          </Button>
        </div>

        <div className="mt-3 h-px w-full bg-[var(--rule)]">
          <motion.div
            className="h-px bg-[var(--accent)]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE_OUT }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center py-10">
        <h1 className="stk-h1">{question.title}</h1>

        {question.multiple && (
          <p className="stk-sm mt-4">Можно выбрать несколько вариантов</p>
        )}

        <ul className="mt-8 flex flex-col gap-3">
          {question.answers.map((a) => {
            const on = picked.includes(a.id);
            return (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => choose(a.id)}
                  aria-pressed={on}
                  disabled={revealed && !on}
                  className={`stk-pick flex w-full items-center gap-4 px-5 py-4
                    text-left text-[17px] leading-snug text-[var(--ink)]
                    [transition:transform_var(--t-press)_var(--ease-out)]
                    active:scale-[0.995] ${on ? "font-semibold" : ""}`}
                >
                  {/*
                    Метка выбора — квадрат для множественного и круг для
                    одиночного. Разная форма сообщает правило выбора раньше,
                    чем подпись под заголовком: люди не читают инструкции, но
                    видят чекбокс.
                  */}
                  <span
                    aria-hidden="true"
                    className={`stk-pick-mark block h-[18px] w-[18px] shrink-0
                      ${question.multiple ? "rounded-[3px]" : "rounded-full"}`}
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
            <Button
              onClick={() => (picked.length ? commit(picked) : setError(true))}
              style={picked.length ? undefined : { opacity: 0.55 }}
            >
              Продолжить
            </Button>

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
            transition={{ duration: 0.32, ease: EASE_OUT }}
            className="mt-8 border-t border-[var(--rule)] pt-5"
          >
            <p className="stk-p">{insight}</p>
            <Button
              variant="quiet"
              size="sm"
              arrow
              onClick={advanceNow}
              className="label mt-4 -ml-2 px-2 text-[var(--grn)]"
            >
              Дальше
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
