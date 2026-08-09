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

  if (!restored) return null;

  if (step === RESULT && result) {
    return <ResultScreen result={result} onRestart={restart} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
      >
        {step === START && <StartScreen kicker={kicker} onStart={() => setStep(BRIEF)} />}

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
  );
}

function StartScreen({ kicker, onStart }: { kicker: string; onStart: () => void }) {
  return (
    <div className="zone-doubt min-h-dvh px-5 py-8 sm:px-8 sm:py-10">
      {/*
        Логотип без навигации. Меню, тарифы и ссылки на странице диагностики
        запрещены п.3 ТЗ: любой выход отсюда — это потерянное прохождение.
      */}
      <header className="mx-auto flex max-w-[68rem] items-center justify-between gap-4">
        <Logo />
        <ThemeToggle />
      </header>

      <main className="mx-auto mt-12 grid max-w-[68rem] gap-14 sm:mt-20 lg:grid-cols-[1fr_0.78fr] lg:items-start lg:gap-16">
        <div>
          <span className="label text-[var(--ink-faint)]">{kicker}</span>

          <h1 className="mt-6 max-w-[24ch] text-[30px] leading-[1.06] font-extrabold tracking-[-0.035em] sm:text-[46px]">
            Узнайте, когда ожидание SEO-результата начинает разрушать доверие
            клиента
          </h1>

          <p className="mt-6 max-w-[56ch] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[17px]">
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
                  className="flex max-w-[54ch] gap-3 text-[15px] leading-snug text-[var(--ink-soft)]"
                >
                  <span aria-hidden="true" className="num shrink-0 text-[var(--accent)]">
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

          <p className="mt-4 text-[13px] text-[var(--ink-faint)]">
            12 вопросов. Без регистрации. Результат сразу.
          </p>
        </div>

        <WindowFigure className="lg:mt-16" />
      </main>

      <p className="mx-auto mt-16 max-w-[68rem] border-t border-[var(--rule-soft)] pt-5 text-[13px] leading-relaxed text-[var(--ink-faint)] sm:mt-24">
        Диагностика не оценивает качество вашей SEO-работы. Она показывает,
        насколько быстро клиент получает видимые доказательства её ценности.
      </p>
    </div>
  );
}

function BriefScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="zone-doubt mx-auto flex min-h-dvh max-w-[42rem] flex-col justify-center px-5 py-12 sm:px-8">
      <h1 className="max-w-[20ch] text-[28px] leading-[1.08] font-extrabold tracking-[-0.03em] sm:text-[40px]">
        Отвечайте так, как происходит в реальных проектах
      </h1>

      <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[17px]">
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
    <div className="zone-doubt mx-auto flex min-h-dvh max-w-[42rem] flex-col justify-center px-5 py-12 sm:px-8">
      <h1 className="text-[26px] leading-[1.08] font-extrabold tracking-[-0.03em] sm:text-[36px]">
        Анализируем ваше окно сомнения
      </h1>

      <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
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
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px] leading-snug text-[var(--ink-soft)]">{s}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
