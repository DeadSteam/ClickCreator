"use client";

import { useEffect, useRef, useState } from "react";

import { MODES } from "@/lib/content";
import { track, trackOnView } from "@/lib/analytics";

/*
  Форма проверки режима.

  Здесь намеренно нет ползунков и нет живого пересчёта. Это заявка, которую
  заполняют и подают: два числовых поля, выбор режима, кнопка «Проверить» -
  и только после неё появляется заключение.

  Так сделано не ради разнообразия, а потому что это единственная модель
  взаимодействия, совместимая с жанром. Ползунок с непрерывным пересчётом
  говорит «поиграйте с бюджетом»; форма с подачей говорит «заявите параметры,
  и мы вынесем решение». Второе - ровно то, чем занимается весь этот сайт,
  который начинается с проверки допуска и умеет отказать.

  Побочная выгода: заключение можно сформулировать целым предложением с
  причиной отказа. У ползунка на это нет момента - он пересчитывается
  шестьдесят раз в секунду, и предложение читать некогда.
*/
const PER_PHRASE = [0.6, 1.4, 3.0] as const;
const LIMIT = [0.08, 0.2, 0.35] as const;

type Verdict = {
  ok: boolean;
  share: number;
  sessions: number;
  perDay: number;
};

const money = (n: number) => {
  const s = Math.round(n).toString();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += " ";
    out += s[i];
  }
  return out;
};

export function Calc() {
  const [phrases, setPhrases] = useState("80");
  const [ownTraffic, setOwnTraffic] = useState("120");
  const [mode, setMode] = useState(1);
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  useEffect(() => trackOnView(ref.current, "pricing_view"), []);

  const note = () => {
    if (touched.current) return;
    touched.current = true;
    track("calc_interact", { widget: "form" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    /*
      Number на пустой строке даёт 0, а не NaN, поэтому пустое поле трафика
      читается как «трафика нет» - это осмысленный ответ, а не ошибка ввода.
      Отрицательные значения отсекаем: минус фраз не бывает.
    */
    const p = Math.max(0, Number(phrases) || 0);
    const own = Math.max(0, Number(ownTraffic) || 0);

    const sessions = p * PER_PHRASE[mode];
    const share = sessions > 0 ? sessions / (own + sessions) : 0;
    const perDay = p * MODES[mode].rate;
    const ok = share <= LIMIT[mode];

    setVerdict({ ok, share, sessions, perDay });
    track("calc_result", {
      widget: "form",
      phrases: p,
      own_traffic: own,
      mode: MODES[mode].name,
      share: Math.round(share * 100),
      blocked: !ok,
      per_day: Math.round(perDay),
    });
  };

  return (
    <div ref={ref} className="panel">
      <form onSubmit={submit}>
        <div className="grid gap-px bg-[var(--color-rule-soft)] md:grid-cols-3">
          <label className="flex flex-col gap-2 bg-[var(--color-sheet-raise)] p-5 sm:p-6">
            <span className="mark">фраз в работе</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={10}
              value={phrases}
              onChange={(e) => {
                setPhrases(e.target.value);
                note();
              }}
              className="sink num min-h-[44px] w-full px-3 py-2 text-[20px] text-[var(--color-graphite)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-graphite)]"
            />
          </label>

          <label className="flex flex-col gap-2 bg-[var(--color-sheet-raise)] p-5 sm:p-6">
            <span className="mark">свой трафик из поиска, в сутки</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={10}
              value={ownTraffic}
              onChange={(e) => {
                setOwnTraffic(e.target.value);
                note();
              }}
              className="sink num min-h-[44px] w-full px-3 py-2 text-[20px] text-[var(--color-graphite)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-graphite)]"
            />
          </label>

          <label className="flex flex-col gap-2 bg-[var(--color-sheet-raise)] p-5 sm:p-6">
            <span className="mark">заявленный режим</span>
            {/*
              Нативный select: на телефоне открывает системный барабан - самый
              привычный способ выбора, какой есть, и его не нужно учиться
              закрывать. Самописное меню здесь дало бы ноль пользы.
            */}
            <select
              value={mode}
              onChange={(e) => {
                setMode(Number(e.target.value));
                note();
              }}
              className="sink min-h-[44px] w-full cursor-pointer px-3 py-2 text-[17px] text-[var(--color-graphite)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-graphite)]"
            >
              {MODES.map((m, i) => (
                <option key={m.name} value={i}>
                  {m.name} — {m.rate} ₽ за фразу
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--color-rule)] px-5 py-4 sm:px-6">
          <button
            type="submit"
            className="min-h-[44px] cursor-pointer bg-[var(--color-graphite)] px-6 py-3 text-[15px] font-medium text-[var(--color-sheet)] [transition:background-color_var(--t-hover)_var(--ease-micro)] hover:bg-[oklch(0.32_0.008_255)]"
          >
            Проверить режим
          </button>
          <p className="max-w-[42ch] text-[13px] leading-snug text-[var(--color-graphite-faint)]">
            Заключение появится ниже. Оно может оказаться отказом в заявленном
            режиме.
          </p>
        </div>
      </form>

      {/*
        Область заключения держит высоту всегда: блок, возникающий из ничего,
        толкает вниз всё, что под ним, и на телефоне это читается как сбой
        вёрстки, а не как ответ.
      */}
      <div aria-live="polite" className="min-h-[8.5rem] border-t border-[var(--color-rule)]">
        {verdict && !verdict.ok ? (
          <div aria-hidden className="hazard h-1.5" />
        ) : null}

        {verdict ? (
          <div className="px-5 py-5 sm:px-6">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="mark">заключение</span>
              <p className="text-[19px] leading-snug font-medium tracking-[-0.02em] sm:text-[21px]">
                {verdict.ok
                  ? "Режим доступен"
                  : "В этом режиме мы вам откажем"}
              </p>
            </div>

            <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-[var(--color-graphite-soft)]">
              {verdict.ok ? (
                <>
                  Подача составит{" "}
                  <span className="num">{Math.round(verdict.share * 100)}</span>{" "}
                  процентов трафика при пределе{" "}
                  <span className="num">{Math.round(LIMIT[mode] * 100)}</span>.
                  Это примерно <span className="num">{Math.round(verdict.sessions)}</span>{" "}
                  сессий в сутки и{" "}
                  <span className="num">{money(verdict.perDay)}</span> рублей
                  списания. Сдвиги в этом режиме обычно видны через{" "}
                  {MODES[mode].window}.
                </>
              ) : (
                <>
                  Подача составит{" "}
                  <span className="num">{Math.round(verdict.share * 100)}</span>{" "}
                  процентов всего трафика сайта при пределе{" "}
                  <span className="num">{Math.round(LIMIT[mode] * 100)}</span>{" "}
                  для этого режима. Такая доля видна в статистике без всякого
                  анализа. Кабинет не даст выбрать режим: снизьте скорость или
                  количество фраз и подайте заявку заново.
                </>
              )}
            </p>
          </div>
        ) : (
          <p className="px-5 py-5 text-[14px] text-[var(--color-graphite-faint)] sm:px-6">
            Заполните поля и подайте форму. Предел доли подачи проверяется до
            регистрации, а не после оплаты.
          </p>
        )}
      </div>
    </div>
  );
}
