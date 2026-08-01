"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { CPC_CONTEXT, SPEEDS, TIERS, discountFor, nextTier } from "@/lib/content";
import { SITE } from "@/lib/site";
import { track, trackOnView } from "@/lib/analytics";
import { Cta } from "./cta";

/*
  Счётчик. Первый экран сайта целиком.

  Число форматируем вручную, а не через Intl.NumberFormat: Node и браузер
  разводят разделитель разрядов для ru-RU (узкий неразрывный пробел против
  обычного), серверная отрисовка не совпадает с клиентской, и React
  перерисовывает поддерево с предупреждением в консоли. Для сайта, где число -
  это главный объект первого экрана, такое расхождение недопустимо.
*/
const money = (n: number) => {
  const s = Math.round(n).toString();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += " ";
    out += s[i];
  }
  return out;
};

/**
 * Подсветка живого показания.
 *
 * Значение горит сигнальным цветом, пока меняется, и гаснет через 600мс после
 * последнего изменения. Таймер сбрасывается на каждом изменении, поэтому при
 * протаскивании ползунка показание горит непрерывно, а не мигает на каждом
 * шаге - мигание читалось бы как сбой прибора.
 */
function useLive(value: number) {
  const [live, setLive] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    /* Первый проход - это отрисовка, а не изменение. Без этой проверки
       показание вспыхивает при каждой загрузке страницы. */
    if (first.current) {
      first.current = false;
      return;
    }
    setLive(true);
    const id = setTimeout(() => setLive(false), 600);
    return () => clearTimeout(id);
  }, [value]);

  return live;
}

export function Meter() {
  const [phrases, setPhrases] = useState(120);
  const [speed, setSpeed] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  useEffect(() => trackOnView(ref.current, "pricing_view"), []);

  const calc = useMemo(() => {
    const mode = SPEEDS[speed];
    const off = discountFor(phrases);
    const perDay = phrases * mode.rate * (1 - off);
    const clicks = phrases * mode.perPhrase;
    return {
      off,
      perDay,
      perMonth: perDay * 30,
      clicks,
      /* Цена одного перехода. Главное число для сравнения с контекстом. */
      perClick: clicks > 0 ? perDay / clicks : 0,
      next: nextTier(phrases),
      mode,
    };
  }, [phrases, speed]);

  const live = useLive(Math.round(calc.perDay));

  const note = () => {
    if (touched.current) return;
    touched.current = true;
    track("calc_interact", { widget: "meter" });
  };

  useEffect(() => {
    if (!touched.current) return;
    const id = setTimeout(
      () =>
        track("calc_result", {
          widget: "meter",
          phrases,
          speed: calc.mode.name,
          per_day: Math.round(calc.perDay),
          per_click: Math.round(calc.perClick * 100) / 100,
        }),
      700,
    );
    return () => clearTimeout(id);
  }, [phrases, calc.mode.name, calc.perDay, calc.perClick]);

  /* Во сколько раз переход дешевле контекстного. Одна цифра вместо абзаца. */
  const cheaper = calc.perClick > 0 ? CPC_CONTEXT / calc.perClick : 0;

  return (
    <div ref={ref} className="panel">
      {/* Верхняя строка прибора: что именно он показывает. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-[var(--color-rule-soft)] px-5 py-3.5 sm:px-7">
        <span className="tag">расход в сутки</span>
        <span className="tag">
          {calc.mode.name} &middot; сдвиги через {calc.mode.shift}
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        {/* Показание. Занимает столько места, сколько занимал бы заголовок
            на обычном лендинге - в этом и есть заявление сайта. */}
        {/*
          Колонка тянется по высоте соседней и распределяет содержимое по краям.
          Без этого при более высокой колонке управления экран заканчивал
          содержимое на середине и оставлял снизу двести пикселей пустой сетки -
          это читается как незагрузившийся блок, а не как поле прибора.
        */}
        <div className="screen flex flex-col justify-between gap-8 border-b border-[var(--color-rule-soft)] px-5 py-8 sm:px-7 sm:py-10 lg:border-r lg:border-b-0">
          <p className="flex flex-wrap items-baseline gap-x-3">
            <span
              className={`read read-xl text-[clamp(56px,11vw,116px)] font-medium ${live ? "live" : ""}`}
            >
              {money(calc.perDay)}
            </span>
            <span className="text-[18px] text-[var(--color-read-soft)]">
              ₽ в сутки
            </span>
          </p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[var(--color-rule-hair)] pt-6 sm:grid-cols-3">
            <div>
              <dt className="tag">за 30 суток</dt>
              <dd className="read mt-2 text-[24px] sm:text-[28px]">
                {money(calc.perMonth)}
              </dd>
            </div>
            <div>
              <dt className="tag">переходов в сутки</dt>
              <dd className="read mt-2 text-[24px] sm:text-[28px]">
                {Math.round(calc.clicks)}
              </dd>
            </div>
            <div>
              <dt className="tag">цена перехода</dt>
              <dd className="read mt-2 text-[24px] sm:text-[28px]">
                {calc.perClick.toFixed(1)}
              </dd>
            </div>
          </dl>

          {/*
            Сравнение с контекстом. Две полосы одной шкалы, а не два числа
            рядом: длину видно, разницу между "9,6" и "78" ещё надо прочитать.
          */}
          <div className="border-t border-[var(--color-rule-hair)] pt-6">
            <div className="flex items-baseline justify-between gap-4">
              <span className="tag">переход из органики</span>
              <span className="read text-[15px]">
                {calc.perClick.toFixed(1)} ₽
              </span>
            </div>
            <div className="mt-2 h-2.5 w-full bg-[var(--color-case-sink)]">
              <div
                className="h-full bg-[var(--color-live)]"
                style={{
                  width: `${Math.min(100, (calc.perClick / CPC_CONTEXT) * 100)}%`,
                  transition: "width var(--t-panel) var(--ease-read)",
                }}
              />
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4">
              <span className="tag">клик в Директе, нижняя оценка</span>
              <span className="read text-[15px] text-[var(--color-read-soft)]">
                {CPC_CONTEXT} ₽
              </span>
            </div>
            <div className="mt-2 h-2.5 w-full bg-[var(--color-case-sink)]">
              <div className="h-full w-full bg-[var(--color-read-faint)]" />
            </div>

            <p className="mt-4 max-w-[46ch] text-[13px] leading-relaxed text-[var(--color-read-faint)]">
              Дешевле примерно в {cheaper.toFixed(0)} раз при текущих настройках.
              Контекст приводит посетителя сразу, органика - позицию, которая
              работает и после отключения бюджета.
            </p>
          </div>
        </div>

        {/* Органы управления. */}
        <div className="flex flex-col gap-7 px-5 py-8 sm:px-7 sm:py-10">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="m-phrases" className="tag">
                фраз в работе
              </label>
              <output htmlFor="m-phrases" className="read text-[26px]">
                {phrases}
              </output>
            </div>
            <input
              id="m-phrases"
              type="range"
              min={10}
              max={800}
              step={10}
              value={phrases}
              onChange={(e) => {
                setPhrases(Number(e.target.value));
                note();
              }}
            />
            <div className="tag flex justify-between">
              <span>10</span>
              <span>800</span>
            </div>
          </div>

          <div>
            <span className="tag block">скорость</span>
            <div className="mt-3 flex flex-col gap-px bg-[var(--color-rule-soft)]">
              {SPEEDS.map((s, i) => {
                const active = i === speed;
                return (
                  <button
                    key={s.name}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setSpeed(i);
                      note();
                    }}
                    className={`flex min-h-[44px] cursor-pointer items-baseline justify-between gap-4 px-4 py-3 text-left
                      [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro)]
                      ${
                        active
                          ? "bg-[var(--color-read)] text-[var(--color-case)]"
                          : "bg-[var(--color-case-raise)] text-[var(--color-read-soft)] hover:bg-[var(--color-case-sink)]"
                      }`}
                  >
                    <span className="text-[15px]">{s.name}</span>
                    <span className="read text-[15px]">{s.rate} ₽</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Скидка. Показана всегда, а не всплывает при достижении порога. */}
          <div className="border-t border-[var(--color-rule-hair)] pt-5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="tag">скидка за объём</span>
              <span
                className={`read text-[20px] ${calc.off > 0 ? "live" : "text-[var(--color-read-faint)]"}`}
              >
                {calc.off > 0 ? `−${Math.round(calc.off * 100)} %` : "0 %"}
              </span>
            </div>

            <ol className="mt-4 flex flex-col gap-1.5">
              {[...TIERS]
                .filter((t) => t.from > 0)
                .sort((a, b) => a.from - b.from)
                .map((t) => {
                  const reached = phrases >= t.from;
                  return (
                    <li
                      key={t.from}
                      className={`flex items-baseline justify-between gap-4 text-[13px] ${
                        reached
                          ? "text-[var(--color-read)]"
                          : "text-[var(--color-read-faint)]"
                      }`}
                    >
                      <span className="read">от {t.from} фраз</span>
                      <span className="read">−{Math.round(t.off * 100)} %</span>
                    </li>
                  );
                })}
            </ol>

            {calc.next ? (
              <p className="mt-4 text-[13px] leading-snug text-[var(--color-read-faint)]">
                Ещё {calc.next.from - phrases} фраз до скидки{" "}
                {Math.round(calc.next.off * 100)} процентов.
              </p>
            ) : (
              <p className="mt-4 text-[13px] leading-snug text-[var(--color-read-faint)]">
                Максимальная скидка достигнута.
              </p>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-[var(--color-rule-hair)] pt-6">
            <Cta href={SITE.register} place="meter">
              Запустить с этими настройками
            </Cta>
            <p className="text-[13px] leading-relaxed text-[var(--color-read-faint)]">
              Семь суток без привязки карты. Остановить можно в любой момент,
              баланс не сгорает.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
