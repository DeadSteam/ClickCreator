"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { RATES } from "@/lib/content";
import { track, trackOnView } from "@/lib/analytics";

/*
  Прикидка.

  Целиком помещается в одно предложение. Ползунка здесь нет и быть не может:
  ползунок - это прибор, а в письме приборов не бывает. Автор считает при вас
  вслух, и вы меняете в его фразе два слова, как поправили бы собеседника.

  Поэтому оба органа управления - нативные select, вшитые прямо в строку.
  Собственная рамка и стрелка убраны: поле должно читаться как подчёркнутое
  слово, а не как виджет из другой системы. На телефоне нативный select
  открывает системный барабан, самый привычный способ выбора, какой есть.

  Подчёркнуты они пунктиром (.stroke-pick), а не сплошной чертой (.stroke),
  которой отмечен результат. Сначала оба были сплошными, и в одной строке
  изменяемое было неотличимо от неизменяемого: разницу выдавал только курсор,
  которого на тапе нет. Пунктир - постоянный признак, видимый без мыши.

  Число форматируем вручную, а не через Intl.NumberFormat: Node и браузер
  разводят разделитель разрядов для ru-RU, серверная отрисовка перестаёт
  совпадать с клиентской, и React перерисовывает поддерево с предупреждением.
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

/*
  Ступени объёма вместо непрерывного ползунка. Их четыре, они названы словами
  и покрывают реальные размеры проектов: точность до одной фразы здесь никому
  не нужна, а выбор из четырёх пунктов делается одним движением.
*/
const SIZES = [
  { label: "три десятка фраз", phrases: 30, off: 0 },
  { label: "сотня фраз", phrases: 100, off: 0.08 },
  { label: "две с половиной сотни", phrases: 250, off: 0.15 },
  { label: "пять сотен", phrases: 500, off: 0.15 },
] as const;

export function Estimate() {
  const [size, setSize] = useState(1);
  const [plan, setPlan] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  useEffect(() => trackOnView(ref.current, "pricing_view"), []);

  const calc = useMemo(() => {
    const s = SIZES[size];
    const perDay = s.phrases * RATES[plan].rate * (1 - s.off);
    return { perDay, perMonth: perDay * 30, off: s.off };
  }, [size, plan]);

  const note = () => {
    if (touched.current) return;
    touched.current = true;
    track("calc_interact", { widget: "estimate" });
  };

  useEffect(() => {
    if (!touched.current) return;
    const id = setTimeout(
      () =>
        track("calc_result", {
          widget: "estimate",
          phrases: SIZES[size].phrases,
          plan: RATES[plan].plan,
          per_day: Math.round(calc.perDay),
          per_month: Math.round(calc.perMonth),
        }),
      700,
    );
    return () => clearTimeout(id);
  }, [size, plan, calc.perDay, calc.perMonth]);

  /*
    Поле выбора внутри строки текста.

    Ширина select по умолчанию равна ширине самого длинного варианта, поэтому
    подчёркивание тянулось далеко за текущее слово и разрывало фразу пустотой.

    Одной сетки для этого мало: даже в общей ячейке select продолжает
    отдавать в расчёт свою собственную ширину, и колонка растёт под него.
    Поэтому select выводится из потока абсолютным позиционированием и
    растягивается по обёртке, а ширину задаёт невидимый образец с текущим
    значением. Теперь подчёркивание ровно по выбранному слову.
  */
  const Field = ({
    label,
    value,
    onChange,
    options,
    text,
  }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    options: readonly string[];
    text: string;
  }) => (
    <span className="stroke-pick relative inline-block align-baseline">
      <span aria-hidden className="whitespace-pre">
        {text}
      </span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => {
          onChange(Number(e.target.value));
          note();
        }}
        /*
          Прозрачный текст, а не opacity-0: элемент должен оставаться видимым
          для программ чтения с экрана и получать фокус, поэтому скрываем
          только глиф, а сам select остаётся на месте и полностью кликабелен.
        */
        className="absolute inset-0 w-full cursor-pointer appearance-none bg-transparent text-transparent outline-none"
      >
        {options.map((o, i) => (
          <option key={o} value={i} className="text-[var(--color-ink)]">
            {o}
          </option>
        ))}
      </select>
    </span>
  );

  return (
    <div ref={ref}>
      <p className="max-w-[26ch] font-[family-name:var(--font-display)] text-[28px] leading-[1.4] font-bold tracking-[-0.015em] sm:text-[34px]">
        Если у вас{" "}
        <Field
          label="Размер проекта"
          value={size}
          onChange={setSize}
          options={SIZES.map((s) => s.label)}
          text={SIZES[size].label}
        />{" "}
        и мы идём{" "}
        <Field
          label="Скорость работы"
          value={plan}
          onChange={setPlan}
          options={RATES.map((r) => r.tempo)}
          text={RATES[plan].tempo}
        />{" "}
        темпом, выйдет{" "}
        <span className="stroke whitespace-nowrap">
          <span className="fig">{money(calc.perDay)}</span> ₽
        </span>{" "}
        в сутки.
      </p>

      <p className="mt-7 max-w-[54ch] text-[16px] leading-relaxed text-[var(--color-ink-soft)]">
        Это <span className="fig">{money(calc.perMonth)}</span> ₽ за месяц.{" "}
        {calc.off > 0 ? (
          <>
            Скидку за объём в{" "}
            <span className="fig">{Math.round(calc.off * 100)}</span> процентов я
            уже вычел.
          </>
        ) : (
          <>
            От <span className="fig">100</span> фраз я снимаю{" "}
            <span className="fig">8</span> процентов, от{" "}
            <span className="fig">250</span> - <span className="fig">15</span>.
          </>
        )}{" "}
        Списывается за фактические переходы, абонентской платы нет, остаток не
        сгорает и ждёт вас на балансе.
      </p>
    </div>
  );
}
