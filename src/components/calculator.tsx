"use client";

import { useState } from "react";
import { Cta } from "./cta";

const SPEEDS = [
  { id: "eco", label: "Экономный", rate: 4, window: "14 до 30 дней" },
  { id: "std", label: "Стандарт", rate: 12, window: "7 до 14 дней" },
  { id: "fast", label: "Ускоренный", rate: 28, window: "2 до 3 дней" },
] as const;

const money = (n: number) => new Intl.NumberFormat("ru-RU").format(Math.round(n));

/* Answers the question every competitor makes you phone a manager for. */
export function Calculator() {
  const [phrases, setPhrases] = useState(50);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]["id"]>("std");

  const tier = SPEEDS.find((s) => s.id === speed)!;
  const monthly = phrases * tier.rate * 30;

  return (
    <div className="grid border border-[var(--rule)] lg:grid-cols-[1fr_20rem]">
      <div className="p-6 sm:p-8">
        <label htmlFor="phrases" className="flex items-baseline justify-between gap-4">
          <span className="label text-[var(--ink-faint)]">ключевых фраз</span>
          <span className="num text-[22px] leading-none font-medium text-[var(--ink)]">
            {phrases}
          </span>
        </label>
        <input
          id="phrases"
          type="range"
          min={10}
          max={300}
          step={5}
          value={phrases}
          onChange={(e) => setPhrases(Number(e.target.value))}
          className="mt-4 h-1 w-full cursor-pointer appearance-none bg-[var(--rule)]
            accent-[var(--hot)]"
        />
        <div className="ticks mt-2 h-2" aria-hidden="true" />
        <div className="mt-1 flex justify-between">
          <span className="num text-[10px] text-[var(--ink-faint)]">10</span>
          <span className="num text-[10px] text-[var(--ink-faint)]">300</span>
        </div>

        <fieldset className="mt-9">
          <legend className="label text-[var(--ink-faint)]">скорость выхода</legend>
          <div className="mt-4 grid divide-y divide-[var(--rule-soft)] border border-[var(--rule-soft)]">
            {SPEEDS.map((s) => {
              const active = s.id === speed;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSpeed(s.id)}
                  aria-pressed={active}
                  className={`flex items-baseline justify-between gap-4 px-4 py-3.5 text-left
                    [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro)] ${
                      active ? "bg-[var(--ink)]" : "hover:bg-[var(--inset)]"
                    }`}
                >
                  <span
                    className={`text-[15px] font-semibold ${
                      active ? "text-[var(--color-steel-100)]" : "text-[var(--ink-soft)]"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span
                    className={`num text-[13px] ${
                      active ? "text-[var(--color-ember-hot)]" : "text-[var(--ink-faint)]"
                    }`}
                  >
                    {s.rate} ₽/день
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col justify-between gap-8 border-t border-[var(--rule)] bg-[var(--inset)] p-6 sm:p-8 lg:border-t-0 lg:border-l">
        <div>
          <span className="label text-[var(--ink-faint)]">бюджет в месяц</span>
          <p className="num mt-3 text-[38px] leading-none font-medium text-[var(--ink)]">
            {money(monthly)}
            <span className="ml-1.5 text-[18px] text-[var(--ink-faint)]">₽</span>
          </p>
          <p className="mt-5 text-[13px] leading-relaxed text-[var(--ink-soft)]">
            Первые сдвиги от {tier.window}. Списывается за фактические переходы,
            неизрасходованное остаётся на балансе.
          </p>
        </div>

        <Cta href="#start" className="w-full">
          Запустить тест
        </Cta>
      </div>
    </div>
  );
}
