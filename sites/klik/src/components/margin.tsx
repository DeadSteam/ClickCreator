"use client";

import { useEffect, useRef, useState } from "react";

import { track, trackOnView } from "@/lib/analytics";

/*
  Расчёт маржи для агентства.

  Считается от закупки, а не от продажи: специалист знает, во что ему обходится
  проект, и хочет увидеть, сколько выставить клиенту. Обратный порядок
  (сначала цена клиента) заставлял бы его делить в уме, а на лендинге это
  делает калькулятор.
*/
const money = (n: number) => {
  const s = Math.round(n).toString();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += " ";
    out += s[i];
  }
  return out;
};

export function Margin() {
  const [buy, setBuy] = useState(18000);
  const [markup, setMarkup] = useState(120);
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  useEffect(() => trackOnView(ref.current, "pricing_view"), []);

  const sell = buy * (1 + markup / 100);
  const profit = sell - buy;
  /* Доля прибыли в чеке клиента: агентство мыслит именно этой цифрой. */
  const share = sell > 0 ? (profit / sell) * 100 : 0;

  const note = () => {
    if (touched.current) return;
    touched.current = true;
    track("calc_interact", { widget: "margin" });
  };

  return (
    <div ref={ref} className="grid gap-px bg-[var(--color-rule-soft)] lg:grid-cols-2">
      <div className="panel flex flex-col gap-8 p-6 sm:p-8">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="m-buy" className="tag">
              закупка в месяц, ₽
            </label>
            <output htmlFor="m-buy" className="read text-[22px] font-medium">
              {money(buy)}
            </output>
          </div>
          <input
            id="m-buy"
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
          <div className="tag flex justify-between">
            <span>5 000</span>
            <span>200 000</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="m-markup" className="tag">
              наценка, %
            </label>
            <output htmlFor="m-markup" className="read text-[22px] font-medium">
              {markup}
            </output>
          </div>
          <input
            id="m-markup"
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
          <div className="tag flex justify-between">
            <span>20</span>
            <span>400</span>
          </div>
        </div>
      </div>

      <div className="panel flex flex-col justify-between gap-8 p-6 sm:p-8">
        <div>
          <span className="tag">ваша прибыль в месяц</span>
          <p className="mt-5 flex items-baseline gap-2">
            <span className="read text-[42px] leading-none font-medium sm:text-[52px]">
              {money(profit)}
            </span>
            <span className="tag">₽</span>
          </p>

          <dl className="mt-8 flex flex-col border-t border-[var(--color-rule-soft)]">
            <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-rule-hair)] py-3">
              <dt className="text-[14px] text-[var(--color-read-soft)]">
                чек клиента
              </dt>
              <dd className="read text-[16px]">{money(sell)} ₽</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-[14px] text-[var(--color-read-soft)]">
                доля прибыли в чеке
              </dt>
              <dd className="read text-[16px] text-[var(--color-live)]">
                {Math.round(share)} %
              </dd>
            </div>
          </dl>
        </div>

        <p className="max-w-[34ch] text-[13px] leading-relaxed text-[var(--color-read-faint)]">
          Закупка списывается за фактические переходы, поэтому в месяц с
          недоработкой вы платите меньше, а чек клиенту выставляете прежний.
        </p>
      </div>
    </div>
  );
}
