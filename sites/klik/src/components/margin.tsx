"use client";

import { useEffect, useRef, useState } from "react";

import { track, trackOnView } from "@/lib/analytics";
import { Amount, money } from "./amount";

/*
  Расчёт маржи для агентства.

  Считается от закупки, а не от продажи: специалист знает, во что ему
  обходится проект, и хочет увидеть, сколько выставить клиенту. Обратный
  порядок заставлял бы его делить в уме, а на лендинге это делает калькулятор.

  Построен по той же грамматике, что и счётчик на главной: одно крупное
  число, два ползунка, две строки подписи. Человек, пришедший сюда с главной,
  узнаёт орган управления и не учится заново.
*/

function useLive(value: number) {
  const [live, setLive] = useState(false);
  const first = useRef(true);

  useEffect(() => {
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

export function Margin() {
  const [buy, setBuy] = useState(18000);
  const [markup, setMarkup] = useState(120);
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  useEffect(() => trackOnView(ref.current, "pricing_view"), []);

  const sell = buy * (1 + markup / 100);
  const profit = sell - buy;

  const live = useLive(Math.round(profit));

  const note = () => {
    if (touched.current) return;
    touched.current = true;
    track("calc_interact", { widget: "margin" });
  };

  return (
    <div ref={ref} className="panel px-7 py-8 sm:px-10 sm:py-10">
      <p className="flex flex-wrap items-baseline gap-x-4">
        <Amount
          value={profit}
          className={`num text-[clamp(52px,8vw,80px)] leading-none font-medium ${
            live ? "text-[var(--color-accent)]" : ""
          }`}
          style={{ transition: "color var(--t-base) var(--ease-soft)" }}
        />
        <span className="text-[19px] text-[var(--color-text-muted)]">
          ₽ вашей прибыли в месяц
        </span>
      </p>

      <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-[var(--color-text-muted)]">
        Клиенту вы выставляете {money(sell)} ₽. Закупка списывается за
        фактические переходы, поэтому в месяц с недоработкой вы платите меньше,
        а чек остаётся прежним.
      </p>

      <div className="mt-10 flex flex-col gap-9">
        <div>
          <div className="flex items-baseline justify-between gap-6">
            <label htmlFor="mg-buy" className="text-[16px] text-[var(--color-text-muted)]">
              Закупка в месяц, ₽
            </label>
            <output htmlFor="mg-buy" className="num text-[24px] font-medium">
              <Amount value={buy} />
            </output>
          </div>
          <input
            id="mg-buy"
            type="range"
            min={5000}
            max={200000}
            step={1000}
            value={buy}
            onChange={(e) => {
              setBuy(Number(e.target.value));
              note();
            }}
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-6">
            <label htmlFor="mg-markup" className="text-[16px] text-[var(--color-text-muted)]">
              Ваша наценка, процентов
            </label>
            <output htmlFor="mg-markup" className="num text-[24px] font-medium">
              {markup}
            </output>
          </div>
          <input
            id="mg-markup"
            type="range"
            min={20}
            max={400}
            step={10}
            value={markup}
            onChange={(e) => {
              setMarkup(Number(e.target.value));
              note();
            }}
          />
        </div>
      </div>
    </div>
  );
}
