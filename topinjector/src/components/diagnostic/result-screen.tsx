"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { GOAL_OUTCOMES } from "@/diagnostic/questions";
import {
  RISK_VERDICTS,
  SEGMENTS,
  handoffQuery,
  type Result,
  type SegmentId,
} from "@/diagnostic/scoring";
import { track } from "@/diagnostic/analytics";

/*
  Цвет уровня риска. Строится из сегмента, а не из числа: сегмент — то, что
  пользователь видит словом, и расхождение между словом и цветом читалось бы
  как ошибка расчёта.
*/
const RISK_COLOR: Record<SegmentId, string> = {
  low: "var(--color-risk-low)",
  medium: "var(--color-risk-medium)",
  high: "var(--color-risk-high)",
  critical: "var(--color-risk-critical)",
};

const LOSSES = [
  {
    t: "Доверие",
    d: "Чем дольше нет понятного результата, тем чаще клиент проверяет специалиста и сомневается в его решениях.",
  },
  {
    t: "Время",
    d: "Дополнительные отчёты, созвоны и объяснения отнимают часы, которые не оплачиваются отдельно.",
  },
  {
    t: "Стоимость услуги",
    d: "Пока экспертность приходится объяснять, клиенту проще сравнивать специалистов только по цене.",
  },
  {
    t: "Продление договора",
    d: "Клиент может отказаться от сотрудничества до того, как правильная стратегия успеет показать потенциал.",
  },
  {
    t: "Рекомендации",
    d: "Клиенты рекомендуют не процессы. Они рекомендуют момент, когда почувствовали: «Я выбрал правильного специалиста».",
  },
];

const STORY_POINTS = [
  "что происходит в голове клиента после оплаты",
  "почему отчёты и объяснения не всегда снимают сомнения",
  "почему быстрое доказательство не заменяет системное SEO",
  "какой новый подход помогает сохранить доверие в первые дни проекта",
];

/** Шкала индекса. Четыре зоны ТЗ плюс метка на позиции результата. */
function Gauge({ index, segment }: { index: number; segment: SegmentId }) {
  const reduce = useReducedMotion();

  const zones: { id: SegmentId; width: number }[] = [
    { id: "low", width: 25 },
    { id: "medium", width: 25 },
    { id: "high", width: 25 },
    { id: "critical", width: 25 },
  ];

  return (
    <div className="mt-8">
      <div className="flex h-2 w-full overflow-hidden">
        {zones.map((z) => (
          <span
            key={z.id}
            style={{
              width: `${z.width}%`,
              backgroundColor: RISK_COLOR[z.id],
              opacity: z.id === segment ? 1 : 0.28,
            }}
          />
        ))}
      </div>

      {/*
        Метка светлая, а не в цвете зоны: на собственной заливке она сливалась
        с ней ровно в тот момент, когда должна показать точное положение.
      */}
      <div className="relative h-6">
        <motion.span
          className="absolute top-0 block h-3 w-[2px] bg-[var(--ink)]"
          initial={reduce ? false : { left: "0%" }}
          animate={{ left: `${index}%` }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        />
      </div>

      <div className="flex justify-between">
        {[0, 25, 50, 75, 100].map((n) => (
          <span key={n} className="num text-[10px] text-[var(--ink-faint)]">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

function ContactForm({ result }: { result: Result }) {
  const [value, setValue] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    /*
      Одно поле принимает и почту, и телеграм — так требует ТЗ. Значит и
      проверка одна: либо адрес с собакой и точкой в домене, либо ник.
    */
    const v = value.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    const isTelegram = /^@?[a-zA-Z0-9_]{4,32}$/.test(v);

    if (!isEmail && !isTelegram) {
      setError("Проверьте адрес электронной почты.");
      return;
    }
    if (!agreed) {
      setError("Подтвердите согласие на обработку данных.");
      return;
    }

    setError(null);
    setBusy(true);

    try {
      const res = await fetch("/api/diagnostic/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: v,
          index: result.index,
          segment: result.segment,
          risk: result.risk,
          goals: result.goals,
          source: typeof window !== "undefined" ? window.location.search : "",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));

      setSent(true);
      track("result_contact_submitted", { segment: result.segment });
    } catch {
      setError("Не удалось сохранить ответ. Проверьте соединение и попробуйте ещё раз.");
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <p className="mt-6 text-[15px] leading-relaxed text-[var(--ink-soft)]">
        Отправили. Копия результата и ссылка на следующий материал придут в
        течение нескольких минут.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 max-w-[34rem]">
      <label htmlFor="contact" className="label block text-[var(--ink-faint)]">
        email или telegram
      </label>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id="contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="you@studio.ru или @nickname"
          className="min-h-[48px] flex-1 rounded-[var(--radius-panel)] border
            border-[var(--rule)] bg-transparent px-4 py-3 text-[16px]
            text-[var(--ink)] placeholder:text-[var(--ink-faint)]
            [transition:border-color_var(--t-hover)_var(--ease-micro)]
            focus:border-[var(--ink)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="min-h-[48px] rounded-[var(--radius-pill)] bg-[var(--btn-bg)] px-6
            text-[15px] font-semibold text-[var(--btn-ink)]
            [transition:background-color_var(--t-hover)_var(--ease-micro),opacity_var(--t-hover)_var(--ease-micro),transform_var(--t-press)_var(--ease-out)]
            enabled:active:scale-[0.975] disabled:opacity-50"
        >
          {busy ? "Отправляем" : "Отправить результат"}
        </button>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-[var(--ink-soft)]">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
        />
        <span>
          Согласен на обработку персональных данных в соответствии с{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-[var(--ink)]">
            политикой обработки
          </a>
          .
        </span>
      </label>

      {error && (
        <p role="alert" className="mt-3 text-[14px] text-[var(--color-risk-critical)]">
          {error}
        </p>
      )}
    </form>
  );
}

export function ResultScreen({ result, onRestart }: { result: Result; onRestart: () => void }) {
  const seg = SEGMENTS[result.segment];
  const verdict = RISK_VERDICTS[result.risk];
  const reduce = useReducedMotion();

  const outcomes = result.goals
    .map((g) => GOAL_OUTCOMES[g])
    .filter((x): x is string => Boolean(x));

  const storyHref = `/istoriya?${handoffQuery(result)}`;

  return (
    <div className="zone-settled min-h-dvh px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-[52rem]">
        {/* Блок 1. Итог. */}
        <section>
          <span className="label text-[var(--ink-faint)]">ваш индекс окна сомнения</span>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="num text-[72px] leading-none font-semibold sm:text-[104px]"
            >
              {result.index}
              <span className="text-[32px] sm:text-[44px]">%</span>
            </motion.p>

            <p
              className="text-[20px] font-semibold tracking-[-0.02em] sm:text-[24px]"
              style={{ color: RISK_COLOR[result.segment] }}
            >
              {seg.risk} риск
            </p>
          </div>

          <Gauge index={result.index} segment={result.segment} />

          <h1 className="mt-10 max-w-[24ch] text-[28px] leading-[1.08] font-extrabold tracking-[-0.03em] sm:text-[42px]">
            {seg.title}
          </h1>

          <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-[var(--ink-soft)]">
            {seg.subtitle}
          </p>
        </section>

        {/* Блок 2. Персональный вывод по максимальному подиндексу. */}
        <section className="mt-16 border-t border-[var(--rule)] pt-10">
          <h2 className="text-[24px] font-extrabold tracking-[-0.03em] sm:text-[30px]">
            Что происходит в ваших проектах
          </h2>

          <p className="mt-5 max-w-[64ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
            {verdict.body}
          </p>

          {seg.body.map((p) => (
            <p
              key={p}
              className="mt-4 max-w-[64ch] text-[16px] leading-relaxed text-[var(--ink-soft)]"
            >
              {p}
            </p>
          ))}

          <ul className="mt-10 grid gap-px border-t border-[var(--rule-soft)] bg-[var(--rule-soft)] sm:grid-cols-3">
            {(Object.keys(RISK_VERDICTS) as (keyof typeof RISK_VERDICTS)[]).map((k) => (
              <li key={k} className="bg-[var(--inset)] p-5">
                <p className="label text-[var(--ink-faint)]">{RISK_VERDICTS[k].label}</p>
                <p className="num mt-3 text-[28px] leading-none font-semibold">
                  {result.sub[k]}
                  <span className="text-[14px]">%</span>
                </p>
                <div className="mt-3 h-1 w-full bg-[var(--rule)]">
                  <span
                    className="block h-1"
                    style={{
                      width: `${result.sub[k]}%`,
                      backgroundColor: k === result.risk ? RISK_COLOR[result.segment] : "var(--ink-faint)",
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-l-2 border-[var(--accent)] pl-5">
            <p className="label text-[var(--accent)]">главная рекомендация</p>
            <p className="mt-3 max-w-[58ch] text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              {seg.advice}
            </p>
          </div>
        </section>

        {/* Блок 12. Цена текущего сценария. */}
        <section className="mt-16 border-t border-[var(--rule)] pt-10">
          <h2 className="max-w-[24ch] text-[24px] font-extrabold tracking-[-0.03em] sm:text-[30px]">
            Цена окна сомнения — не только один недовольный клиент
          </h2>

          <ul className="mt-8 border-t border-[var(--rule-soft)]">
            {LOSSES.map((l, i) => (
              <li
                key={l.t}
                className="grid gap-2 border-b border-[var(--rule-soft)] py-5 sm:grid-cols-[auto_1fr_2fr] sm:gap-8"
              >
                <span className="num text-[11px] text-[var(--ink-faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[17px] font-semibold tracking-[-0.02em]">{l.t}</h3>
                <p className="max-w-[54ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                  {l.d}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Блок 13. Персональное желаемое будущее из вопроса 12. */}
        {outcomes.length > 0 && (
          <section className="mt-16 border-t border-[var(--rule)] pt-10">
            <h2 className="text-[24px] font-extrabold tracking-[-0.03em] sm:text-[30px]">
              Что изменится, если сократить окно сомнения
            </h2>

            <ul className="mt-8 flex flex-col gap-4">
              {outcomes.map((o) => (
                <li
                  key={o}
                  className="flex max-w-[62ch] gap-4 text-[16px] leading-relaxed text-[var(--ink-soft)]"
                >
                  <span aria-hidden="true" className="num shrink-0 text-[var(--accent)]">
                    →
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Блоки 14, 15 и 28. Один переход, одно действие. */}
        <section className="mt-16 border-t border-[var(--rule)] pt-10">
          <span className="label text-[var(--ink-faint)]">следующий шаг</span>

          <h2 className="mt-6 max-w-[26ch] text-[26px] leading-[1.1] font-extrabold tracking-[-0.03em] sm:text-[36px]">
            {result.segment === "low"
              ? "Даже при низком риске ранний результат можно превратить в системное преимущество"
              : "Ваш клиент не видит всей сложности вашей работы. Он видит момент, когда появился результат."}
          </h2>

          <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
            Ваш результат показывает не качество вашей SEO-стратегии, а разрыв
            между моментом, когда клиент начинает оценивать работу, и моментом,
            когда он получает убедительное доказательство её ценности.
          </p>

          {/*
            Название следующего материала (п.14 ТЗ). Заголовок статьи стоит
            отдельно от подводки: он и есть обещание перехода, а без него блок
            зовёт «дальше» и не говорит, куда именно.
          */}
          <p className="mt-8 border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em] sm:text-[19px]">
            Почему даже сильные SEO теряют клиентов до появления результата — и
            как специалисты начали сокращать окно сомнения
          </p>

          <p className="mt-6 max-w-[62ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
            В следующем материале вы увидите:
          </p>

          <ul className="mt-4 flex flex-col gap-2">
            {STORY_POINTS.map((p) => (
              <li
                key={p}
                className="flex max-w-[62ch] gap-3 text-[15px] leading-relaxed text-[var(--ink-soft)]"
              >
                <span aria-hidden="true" className="num shrink-0 text-[var(--ink-faint)]">
                  —
                </span>
                {p}
              </li>
            ))}
          </ul>

          <a
            href={storyHref}
            onClick={() =>
              track("story_cta_clicked", {
                segment: result.segment,
                index: result.index,
              })
            }
            className="mt-9 inline-flex min-h-[48px] items-center gap-3 rounded-[var(--radius-pill)]
              bg-[var(--btn-bg)] px-7 text-[16px] font-semibold text-[var(--btn-ink)]
              [transition:background-color_var(--t-hover)_var(--ease-micro),transform_var(--t-press)_var(--ease-out)]
              hover:bg-[var(--btn-bg-hover)] active:scale-[0.975]"
          >
            {result.segment === "low" ? "Узнать, как это делают другие SEO" : seg.cta}
            <span aria-hidden="true" className="num text-[13px]">
              →
            </span>
          </a>

          <p className="mt-4 text-[13px] text-[var(--ink-faint)]">
            Время чтения: 7–10 минут.
          </p>
        </section>

        {/* Блок 16. Контакт запрашивается после результата и не блокирует переход. */}
        <section className="mt-16 border-t border-[var(--rule)] pt-10">
          <h2 className="text-[20px] font-semibold tracking-[-0.02em] sm:text-[24px]">
            Сохранить результат диагностики
          </h2>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
            Получите копию результата, рекомендации и ссылку на следующий
            материал.
          </p>

          <ContactForm result={result} />
        </section>

        <footer className="mt-16 border-t border-[var(--rule-soft)] pt-6">
          {/*
            Дисклеймер из п.26. Стоит рядом с результатом, а не в подвале сайта:
            индекс оценивает риск, и выдавать его за прогноз поведения
            конкретного клиента нельзя.
          */}
          <p className="max-w-[70ch] text-[12px] leading-relaxed text-[var(--ink-faint)]">
            Результат носит информационный характер и рассчитывается на основе
            ваших ответов. Он оценивает потенциальный разрыв между ожиданиями
            клиента и скоростью появления видимого результата, но не
            прогнозирует поведение конкретного клиента.
          </p>

          <button
            type="button"
            onClick={onRestart}
            className="label mt-6 -ml-2 px-2 py-2 text-[var(--ink-faint)]
              [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
          >
            Пройти заново
          </button>
        </footer>
      </div>
    </div>
  );
}
