"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { GATE, verdictFor, type Question } from "@/lib/content";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import { Cta } from "./cta";

/*
  Проверка допуска. Главный механизм сайта и его первый экран.

  Три вопроса показаны сразу, а не по одному. Пошаговый мастер прячет объём
  анкеты и читается как воронка, из которой не выпускают; здесь же смысл
  обратный - показать, что условий всего три и что часть посетителей их не
  пройдёт. Форма, которую видно целиком, вызывает меньше сопротивления, чем
  форма, конец которой неизвестен.

  Вердикт "отказ" не смягчается и не заканчивается кнопкой регистрации. Кнопка
  на отказе обнулила бы весь смысл: если после "мы вам откажем" всё равно
  предлагают зарегистрироваться, значит, никакого отказа не было.
*/
function Choice({
  question,
  value,
  onPick,
}: {
  question: Question;
  value: string | undefined;
  onPick: (v: string) => void;
}) {
  return (
    <fieldset className="clause border-t border-[var(--color-rule-soft)] pt-6">
      <legend className="sr-only">{question.q}</legend>

      <div className="flex items-baseline gap-4">
        <span
          aria-hidden
          className="clause-no num shrink-0 text-[11px] text-[var(--color-graphite-faint)]"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[17px] leading-snug font-medium tracking-[-0.02em] sm:text-[19px]">
            {question.q}
          </p>
          <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-[var(--color-graphite-soft)]">
            {question.why}
          </p>

          {/*
            w-fit обязателен. Без него флекс-контейнер растягивается на всю
            колонку, и его фон - та самая линейка толщиной в gap - вылезает
            справа от кнопок серым прямоугольником.
          */}
          <div role="radiogroup" aria-label={question.q} className="mt-4 flex w-fit flex-wrap gap-px bg-[var(--color-rule-soft)]">
            {question.answers.map((a) => {
              const active = value === a.value;
              return (
                <button
                  key={a.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onPick(a.value)}
                  className={`hit min-h-[44px] cursor-pointer px-4 py-2.5 text-[14px]
                    [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro)]
                    ${
                      active
                        ? "bg-[var(--color-graphite)] text-[var(--color-sheet)]"
                        : "bg-[var(--color-sheet-raise)] text-[var(--color-graphite-soft)]"
                    }`}
                >
                  {a.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export function Gate() {
  const [answers, setAnswers] = useState<Partial<Record<Question["id"], string>>>({});
  const started = useRef(false);
  const reported = useRef<string | null>(null);

  const result = useMemo(() => verdictFor(answers), [answers]);

  /*
    Событие результата шлём один раз на каждый новый вердикт, а не на каждый
    перерендер: без этой проверки перещёлкивание ответов туда-обратно
    надувает метрику до бессмыслицы.
  */
  useEffect(() => {
    if (!result) return;
    if (reported.current === result.verdict) return;
    reported.current = result.verdict;
    track("calc_result", { widget: "gate", verdict: result.verdict });
  }, [result]);

  const pick = (id: Question["id"], v: string) => {
    if (!started.current) {
      started.current = true;
      track("calc_interact", { widget: "gate" });
    }
    setAnswers((prev) => ({ ...prev, [id]: v }));
  };

  const denied = result?.verdict === "отказ";

  return (
    <div className="panel chapter">
      <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-rule)] px-5 py-4 sm:px-7">
        <span className="mark">проверка допуска</span>
        <span className="mark">
          {Object.keys(answers).length} / {GATE.length}
        </span>
      </div>

      <div className="flex flex-col gap-6 px-5 py-6 sm:px-7 sm:py-7">
        {GATE.map((q) => (
          <Choice
            key={q.id}
            question={q}
            value={answers[q.id]}
            onPick={(v) => pick(q.id, v)}
          />
        ))}
      </div>

      {/*
        Область вердикта существует всегда и держит собственную высоту:
        появляющийся из ниоткуда блок толкает вниз всё, что под ним, и на
        телефоне это выглядит как сбой вёрстки, а не как ответ.
      */}
      <div
        aria-live="polite"
        className="border-t border-[var(--color-rule)] min-h-[9.5rem]"
      >
        {/* Предупреждающая лента только на отказе. Это её единственная работа. */}
        {denied ? <div aria-hidden className="hazard h-1.5" /> : null}

        {result ? (
          <div className="px-5 py-6 sm:px-7">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span
                className={`mark ${denied ? "text-[var(--color-graphite)]" : ""}`}
              >
                вердикт
              </span>
              <h3 className="text-[22px] tracking-[-0.03em] sm:text-[26px]">
                {result.title}
              </h3>
            </div>

            <p className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-[var(--color-graphite-soft)]">
              {result.body}
            </p>

            {result.action === "register" ? (
              <div className="mt-6">
                <Cta href={SITE.register} place="gate_pass">
                  Завести проект
                </Cta>
              </div>
            ) : null}

            {result.action === "check" ? (
              <div className="mt-6">
                <Cta href={SITE.register} place="gate_check">
                  Проверить позиции бесплатно
                </Cta>
              </div>
            ) : null}

            {/* На отказе - только ссылка на человека. Никакой регистрации. */}
            {result.action === "none" ? (
              <p className="mt-6 text-[14px] text-[var(--color-graphite-faint)]">
                Если считаете, что проверка ошиблась,{" "}
                <a
                  href={SITE.telegram}
                  rel="noopener"
                  onClick={() => track("contact_click", { channel: "telegram", place: "gate_deny" })}
                  className="border-b border-[var(--color-rule)] text-[var(--color-graphite)] [transition:border-color_var(--t-hover)_var(--ease-micro)] hover:border-[var(--color-graphite)]"
                >
                  напишите нам
                </a>{" "}
                и приложите домен - посмотрим руками.
              </p>
            ) : null}
          </div>
        ) : (
          <p className="px-5 py-6 text-[14px] text-[var(--color-graphite-faint)] sm:px-7">
            Ответьте на три вопроса. Вердикт появится здесь, и он может
            оказаться отказом.
          </p>
        )}
      </div>
    </div>
  );
}
