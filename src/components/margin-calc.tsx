"use client";

import { useState } from "react";
import { Cta } from "./cta";

const money = (n: number) => new Intl.NumberFormat("ru-RU").format(Math.round(n));

/* Partner buys at cost and resells at their own rate. Ratio is illustrative. */
const COST_SHARE = 0.32;

export function MarginCalc() {
  const [clients, setClients] = useState(6);
  const [check, setCheck] = useState(35000);

  const revenue = clients * check;
  const cost = revenue * COST_SHARE;
  const margin = revenue - cost;
  const marginPct = Math.round((margin / revenue) * 100);

  return (
    <div className="grid border border-[var(--rule)] lg:grid-cols-[1fr_20rem]">
      <div className="p-6 sm:p-8">
        <label htmlFor="clients" className="flex items-baseline justify-between gap-4">
          <span className="label text-[var(--ink-faint)]">клиентов на продвижении</span>
          <span className="num text-[22px] leading-none font-semibold text-[var(--ink)]">
            {String(clients).padStart(2, "0")}
          </span>
        </label>
        <input
          id="clients"
          type="range"
          min={1}
          max={30}
          value={clients}
          onChange={(e) => setClients(Number(e.target.value))}
          className="mt-1 w-full"
        />

        <label htmlFor="check" className="mt-10 flex items-baseline justify-between gap-4">
          <span className="label text-[var(--ink-faint)]">ваш чек за клиента</span>
          <span className="num text-[22px] leading-none font-semibold text-[var(--ink)]">
            {money(check)} ₽
          </span>
        </label>
        <input
          id="check"
          type="range"
          min={15000}
          max={120000}
          step={5000}
          value={check}
          onChange={(e) => setCheck(Number(e.target.value))}
          className="mt-1 w-full"
        />

        {/* The split, shown as one bar rather than two separate figures. */}
        <div className="mt-11">
          <div className="flex h-3 w-full overflow-hidden border border-[var(--rule-soft)]">
            <span
              className="block bg-[var(--ink)] opacity-25"
              style={{ width: `${COST_SHARE * 100}%` }}
            />
            <span className="block flex-1 bg-[var(--hot)]" />
          </div>
          <dl className="mt-4 flex justify-between gap-6">
            <div>
              <dt className="label text-[var(--ink-faint)]">закупка</dt>
              <dd className="num mt-1.5 text-[16px] text-[var(--ink-soft)]">
                {money(cost)} ₽
              </dd>
            </div>
            <div className="text-right">
              <dt className="label text-[var(--ink-faint)]">выручка</dt>
              <dd className="num mt-1.5 text-[16px] text-[var(--ink-soft)]">
                {money(revenue)} ₽
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 border-t border-[var(--rule)] bg-[var(--inset)] p-6 sm:p-8 lg:border-t-0 lg:border-l">
        <div>
          <span className="label text-[var(--ink-faint)]">ваша маржа в месяц</span>
          <p className="num mt-3 text-[38px] leading-none font-semibold text-[var(--ink)]">
            {money(margin)}
            <span className="ml-1.5 text-[18px] text-[var(--ink-faint)]">₽</span>
          </p>
          <p className="num mt-2 text-[13px] text-[var(--hot)]">{marginPct}% от чека</p>
          <p className="mt-5 text-[13px] leading-relaxed text-[var(--ink-soft)]">
            Остаётся у вас после закупки. Клиент видит только ваш бренд и ваш отчёт,
            сервис в переписке не участвует.
          </p>
        </div>

        <Cta href="#start" className="w-full">
          Стать партнёром
        </Cta>
      </div>
    </div>
  );
}
