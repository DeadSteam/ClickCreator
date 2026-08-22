"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { QUESTIONS } from "@/diagnostic/questions";
import { calculate, type Answers } from "@/diagnostic/scoring";
import { track } from "@/diagnostic/analytics";
import { clear, load, save } from "@/diagnostic/storage";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { QuestionScreen } from "./question-screen";
import { ResultScreen } from "./result-screen";
import { WindowFigure } from "./window-figure";
import { EASE_OUT } from "@/motion/tokens";
import { ordinal } from "@/format";

/*
  Шаги прохождения. Отрицательные значения — экраны до вопросов, поэтому индекс
  вопроса совпадает с шагом и нигде не требует поправки.
*/
const START = -2;
const BRIEF = -1;
const COMPUTING = QUESTIONS.length;
const RESULT = QUESTIONS.length + 1;

const COMPUTING_STEPS = [
  "Скорость появления вопросов клиента",
  "Видимость результата в первые дни",
  "Уровень контроля и предсказуемости",
  "Риск потери доверия до основного результата",
];

const PROMISES = [
  "насколько рано клиенты начинают сомневаться",
  "какие действия усиливают риск их ухода",
  "насколько быстро ваша экспертность становится видимой",
  "где именно вы теряете контроль над ожиданиями клиента",
];

export function Diagnostic({ kicker }: { kicker: string }) {
  const [step, setStep] = useState(START);
  const [answers, setAnswers] = useState<Answers>({});
  const [restored, setRestored] = useState(false);
  const startedAt = useRef(Date.now());
  const reduce = useReducedMotion();

  /* Восстановление прохождения. Двенадцать вопросов слишком дорого терять. */
  useEffect(() => {
    const saved = load();
    if (saved && saved.step > START) {
      setAnswers(saved.answers);
      setStep(saved.step);
      startedAt.current = saved.startedAt;
    }
    setRestored(true);
    track("diagnostic_view");
  }, []);

  useEffect(() => {
    if (!restored) return;
    if (step === RESULT) return;
    save({ answers, step, startedAt: startedAt.current });
  }, [answers, step, restored]);

  /* Каждый экран начинается сверху, иначе длинный результат открывается с середины. */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, [step, reduce]);

  const result = useMemo(
    () => (step === RESULT ? calculate(answers) : null),
    [step, answers],
  );

  /* Экран расчёта живёт ровно столько, сколько идёт его анимация. */
  useEffect(() => {
    if (step !== COMPUTING) return;
    const t = window.setTimeout(() => setStep(RESULT), 3200);
    return () => window.clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== RESULT || !result) return;
    track("diagnostic_completed", {
      index: result.index,
      segment: result.segment,
      risk: result.risk,
      /* Выбранные желания — обязательное поле п.19 ТЗ и тег goal_* в CRM. */
      goals: result.goals.join(","),
      sub_distrust: result.sub.distrust,
      sub_visibility: result.sub.visibility,
      sub_control: result.sub.control,
      duration_sec: Math.round((Date.now() - startedAt.current) / 1000),
    });
    track(`result_${result.segment}`, { index: result.index });
  }, [step, result]);

  /*
    Время ответа на каждый вопрос (п.19 ТЗ). Считается от появления экрана, а не
    от старта прохождения: интересен именно вопрос, на котором человек
    задумался, — по нему видно, какая формулировка тяжело читается.
  */
  const shownAt = useRef(Date.now());
  useEffect(() => {
    shownAt.current = Date.now();
  }, [step]);

  const answer = (picked: string[]) => {
    const q = QUESTIONS[step];
    const next = { ...answers, [q.id]: picked };
    setAnswers(next);
    track(`question_${q.n}_answered`, {
      answer: picked.join(","),
      answer_time_sec: Math.round((Date.now() - shownAt.current) / 1000),
    });
    setStep(step + 1);
  };

  /*
    Точка выхода (п.19 ТЗ). Без неё в статистике видно только тех, кто дошёл до
    конца, и совершенно не видно, на каком вопросе теряется остальная половина.
    visibilitychange, а не beforeunload: на мобильных вкладку сворачивают, а не
    закрывают.
  */
  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState !== "hidden") return;
      if (step === RESULT) return;
      track("diagnostic_exit", {
        step,
        question: step >= 0 && step < COMPUTING ? QUESTIONS[step].n : null,
        seconds: Math.round((Date.now() - startedAt.current) / 1000),
      });
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [step]);

  const restart = () => {
    clear();
    setAnswers({});
    startedAt.current = Date.now();
    setStep(START);
  };

  /*
    Земля системы объявлена до восстановления прохождения, а не вместе с
    первым экраном. Восстановление читает localStorage и потому живёт в
    эффекте: до него компонент возвращал `null`, и первый кадр страницы
    доставался фону старой системы на body — тёмная воронка открывалась
    вспышкой светлой бумаги.
  */
  if (!restored) return <div className="stk min-h-dvh" aria-hidden="true" />;

  /*
    Обёртка одна на всю воронку: экраны сменяют друг друга через
    AnimatePresence, и объяви её каждый экран сам — на кадре перехода земля
    исчезала бы вместе с уходящим экраном.
  */
  return (
    <div className="stk">
      {step === RESULT && result ? (
        <ResultScreen result={result} onRestart={restart} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
          >
            {step === START && (
              <StartScreen kicker={kicker} onStart={() => setStep(BRIEF)} />
            )}

            {step === BRIEF && (
              <BriefScreen
                onStart={() => {
                  track("diagnostic_start");
                  startedAt.current = Date.now();
                  setStep(0);
                }}
              />
            )}

            {step >= 0 && step < COMPUTING && (
              <QuestionScreen
                key={QUESTIONS[step].id}
                question={QUESTIONS[step]}
                step={step}
                total={QUESTIONS.length}
                initial={answers[QUESTIONS[step].id] ?? []}
                onAnswer={answer}
                onBack={() => setStep(step - 1)}
                canBack={step > 0}
              />
            )}

            {step === COMPUTING && <ComputingScreen />}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function StartScreen({ kicker, onStart }: { kicker: string; onStart: () => void }) {
  return (
    <div className="min-h-dvh py-8 sm:py-10">
      <div className="wrap">
        {/*
          Логотип без навигации. Меню, тарифы и ссылки на странице диагностики
          запрещены п.3 ТЗ: любой выход отсюда — это потерянное прохождение.
        */}
        <header className="flex items-center justify-between gap-4">
          <Logo idPrefix="diagnostic" />
          <ThemeToggle />
        </header>

        <main className="mt-12 grid gap-14 sm:mt-20 lg:grid-cols-[1fr_0.78fr] lg:items-start lg:gap-16">
          <div>
            <span className="label text-[var(--ink-faint)]">{kicker}</span>

            <h1 className="stk-h1 mt-6">
              Узнайте, когда ожидание SEO-результата начинает разрушать доверие
              клиента
            </h1>

            <p className="stk-lead mt-6">
              За 3 минуты оцените своё «окно сомнения» — период, когда клиент уже
              анализирует вашу работу, но ещё не получил убедительного
              подтверждения, что выбрал правильного специалиста.
            </p>

            <div className="mt-8 border-t border-[var(--rule)] pt-6">
              <p className="label text-[var(--ink-faint)]">после диагностики вы узнаете</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {PROMISES.map((p) => (
                  <li
                    key={p}
                    className="stk-p flex gap-3"
                  >
                    <span aria-hidden="true" className="num shrink-0 text-[var(--ink-faint)]">
                      —
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <Button size="lg" arrow onClick={onStart} className="mt-9">
              Начать диагностику
            </Button>

            <p className="stk-sm mt-4">
              12 вопросов. Без регистрации. Результат сразу.
            </p>
          </div>

          <WindowFigure className="lg:mt-16" />
        </main>

        <p className="stk-sm mt-16 border-t border-[var(--rule-soft)] pt-5 sm:mt-24">
          Диагностика не оценивает качество вашей SEO-работы. Она показывает,
          насколько быстро клиент получает видимые доказательства её ценности.
        </p>
      </div>
    </div>
  );
}

function BriefScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="wrap wrap-read flex min-h-dvh flex-col justify-center py-12">
      <h1 className="stk-h1">Отвечайте так, как происходит в реальных проектах</h1>

      <p className="stk-lead mt-6">
        Здесь нет правильных и неправильных ответов. Результат будет точнее,
        если вы будете ориентироваться не на идеальный процесс, а на типичный
        клиентский проект.
      </p>

      <Button
        size="lg"
        block
        onClick={onStart}
        className="mt-10 sm:w-auto sm:self-start"
      >
        Понятно, начать
      </Button>
    </div>
  );
}

function ComputingScreen() {
  const reduce = useReducedMotion();

  return (
    <div className="wrap wrap-read flex min-h-dvh flex-col justify-center py-12">
      <h1 className="stk-h1">Анализируем ваше окно сомнения</h1>

      <p className="stk-lead mt-5">
        Сопоставляем ваши ответы и определяем, насколько быстро клиент начинает
        сомневаться по сравнению со скоростью появления доказательств вашей
        экспертности.
      </p>

      {/*
        Четыре пункта проявляются по очереди за три секунды. Дольше пяти секунд
        задерживать нельзя (п.8 ТЗ): искусственная пауза здесь читается не как
        работа, а как попытка придать вес пустому ожиданию.
      */}
      <ul className="mt-10 flex flex-col border-t border-[var(--rule-soft)]">
        {COMPUTING_STEPS.map((s, i) => (
          <motion.li
            key={s}
            initial={reduce ? false : { opacity: 0.15 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.35 + i * 0.6 }}
            className="flex items-baseline gap-4 border-b border-[var(--rule-soft)] py-4"
          >
            <span className="num text-[11px] text-[var(--accent)]">
              {ordinal(i)}
            </span>
            <span className="stk-p">{s}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
