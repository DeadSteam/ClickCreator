"use client";

import { useEffect, useRef, useState } from "react";

import { RATES, VOLUME, discountFor } from "@/lib/content";
import { track, trackOnView } from "@/lib/analytics";

/*
  Прокрутка к заключению после подачи.

  Замер на экране 375x812 показал: кнопка подачи стоит на 699 пикселях, а
  заключение начинается на 810 - то есть ровно за кромкой. Человек нажимал
  кнопку и не видел, что вообще что-то произошло. Для формы, весь смысл
  которой в выдаче ответа, это худшая из возможных поломок.

  Прокручиваем мягко и только если блок действительно не виден: на широком
  экране он попадает в кадр сам, и дёргать страницу там незачем.

  Уважаем prefers-reduced-motion: при нём прыжок делается мгновенным, а не
  плавным, но всё равно делается - это ориентация, а не украшение.
*/
function revealIfOffscreen(el: HTMLElement | null) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  const visible = r.top >= 0 && r.bottom <= window.innerHeight;
  if (visible) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
}

/*
  Расчёт бюджета.

  Здесь намеренно нет ползунка и нет живого пересчёта. Это заявка, которую
  заполняют и подают: поле, выбор режима, кнопка - и только после неё
  появляется ответ.

  Так сделано не ради разнообразия, а потому что это единственная модель
  взаимодействия, совместимая с характером сайта. Ползунок с непрерывным
  пересчётом говорит «поиграйте с бюджетом»; форма с подачей говорит
  «заявите параметры, и мы посчитаем». Второе - ровно та интонация, на
  которой держится весь этот вариант.

  Побочная выгода: ответ можно сформулировать целым предложением. У ползунка
  на это нет момента - он пересчитывается шестьдесят раз в секунду, и
  предложение читать некогда.
*/
type Result = {
  phrases: number;
  mode: number;
  perDay: number;
  perMonth: number;
  off: number;
};

/* Разделитель разрядов - узкий неразрывный пробел: обычный переносится на
   новую строку и рвёт число пополам. */
const money = (n: number) => {
  const s = Math.round(n).toString();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += " ";
    out += s[i];
  }
  return out;
};

export function Calc() {
  const [phrases, setPhrases] = useState("150");
  const [mode, setMode] = useState(1);
  const [result, setResult] = useState<Result | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
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
      Number на пустой строке даёт 0, а не NaN, поэтому пустое поле читается
      как «фраз нет» - осмысленный ответ, а не ошибка ввода. Отрицательные
      значения отсекаем: минус фраз не бывает.
    */
    const p = Math.max(0, Number(phrases) || 0);
    const off = discountFor(p);
    const perDay = p * RATES[mode].rate * (1 - off);

    setResult({ phrases: p, mode, perDay, perMonth: perDay * 30, off });
    track("calc_result", {
      widget: "form",
      phrases: p,
      mode: RATES[mode].plan,
      per_day: Math.round(perDay),
    });

    /*
      Ждём кадр: ответ появляется этим же setState, и до перерисовки блок
      ещё пуст, а значит и не на своём месте. requestAnimationFrame отдаёт
      управление после отрисовки.
    */
    requestAnimationFrame(() => revealIfOffscreen(resultRef.current));
  };

  const field =
    "sink min-h-[54px] w-full border border-[var(--color-rule-soft)] px-4 " +
    "text-[19px] text-[var(--color-graphite)] outline-none " +
    "focus-visible:border-[var(--color-graphite)]";

  const next = VOLUME.find((v) => v.from > (result?.phrases ?? 0));

  return (
    <div ref={ref}>
      <form onSubmit={submit}>
        <div className="grid gap-8 md:grid-cols-2">
          <label className="flex flex-col gap-3">
            <span className="text-[17px] text-[var(--color-graphite-soft)]">
              Фраз в работе
            </span>
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
              className={`num ${field}`}
            />
          </label>

          <label className="flex flex-col gap-3">
            <span className="text-[17px] text-[var(--color-graphite-soft)]">
              Режим
            </span>
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
              className={`${field} cursor-pointer`}
            >
              {RATES.map((r, i) => (
                <option key={r.plan} value={i}>
                  {r.plan}, {r.rate} ₽ за фразу
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <button
            type="submit"
            className="min-h-[54px] cursor-pointer bg-[var(--color-graphite)] px-8 text-[17px] font-medium text-[var(--color-sheet)] [transition:background-color_var(--t-fast)_var(--ease-snap)] hover:bg-[oklch(0.32_0.008_255)]"
          >
            Посчитать
          </button>
          <p className="max-w-[40ch] text-[17px] leading-snug text-[var(--color-graphite-soft)]">
            Скидка за объём применяется сама, запрашивать её не нужно.
          </p>
        </div>
      </form>

      {/*
        Область ответа держит высоту всегда: блок, возникающий из ничего,
        толкает вниз всё, что под ним, и на телефоне это читается как сбой
        вёрстки, а не как ответ.
      */}
      <div
        ref={resultRef}
        aria-live="polite"
        className="panel mt-12 min-h-[11rem] scroll-mt-6"
      >
        {result ? (
          <div className="px-7 py-9 sm:px-10 sm:py-11">
            <p className="flex flex-wrap items-baseline gap-x-4">
              <span className="num text-[clamp(44px,6vw,64px)] leading-none font-bold">
                {money(result.perDay)}
              </span>
              <span className="text-[19px] text-[var(--color-graphite-soft)]">
                ₽ в сутки
              </span>
            </p>

            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-[var(--color-graphite-soft)]">
              Это {money(result.perMonth)} ₽ за месяц при полном расходе.
              Списывается за фактические переходы, поэтому в месяц с недобором
              выйдет меньше. Первые сдвиги в режиме «
              {RATES[result.mode].plan.toLowerCase()}» обычно видны через{" "}
              {RATES[result.mode].window}.
              {result.off > 0
                ? ` Скидка за объём ${Math.round(result.off * 100)} процентов уже учтена.`
                : ""}
              {next
                ? ` От ${next.from} фраз скидка составит ${Math.round(next.off * 100)} процентов.`
                : ""}
            </p>
          </div>
        ) : (
          <p className="max-w-[46ch] px-7 py-9 text-[17px] leading-relaxed text-[var(--color-graphite-soft)] sm:px-10 sm:py-11">
            Укажите объём и режим, затем подайте форму. Ответ появится здесь.
          </p>
        )}
      </div>
    </div>
  );
}
