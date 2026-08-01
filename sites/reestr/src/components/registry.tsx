"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ENTRIES, type Entry, type Status } from "@/lib/content";
import { track, trackOnView } from "@/lib/analytics";

const FILTERS: readonly { id: "все" | Status; label: string }[] = [
  { id: "все", label: "все записи" },
  { id: "работает", label: "работает" },
  { id: "завершён", label: "завершён" },
  { id: "остановлен", label: "остановлен" },
];

/*
  Позиция печатается двумя знаками с ведущим нулём. Без выравнивания разряда
  колонка "было - стало" превращается в лесенку, и глаз перестаёт сравнивать
  числа между строками - а сравнение здесь и есть весь смысл таблицы.
*/
const pad = (n: number) => String(n).padStart(2, "0");

function Delta({ from, to }: { from: number; to: number }) {
  const grew = to < from;

  return (
    <span className="num inline-flex items-baseline gap-1.5 whitespace-nowrap">
      <span className="text-[var(--color-ink-faint)]">{pad(from)}</span>
      <span aria-hidden className="text-[var(--color-ink-faint)]">
        &rarr;
      </span>
      <span
        className={
          grew
            ? "font-medium text-[var(--color-ink)]"
            : "font-medium text-[var(--color-stamp)]"
        }
      >
        {pad(to)}
      </span>
      {/* Стрелка и цвет - это два способа сказать одно и то же, но оба
          визуальные. Слепому читателю нужен третий, словами. */}
      <span className="sr-only">
        {grew
          ? `выросла с ${from} на ${to} позицию`
          : `не выросла: с ${from} на ${to}`}
      </span>
    </span>
  );
}

function StatusMark({ status }: { status: Status }) {
  if (status === "остановлен") {
    return (
      <span className="field border-b border-[var(--color-stamp)] pb-0.5 text-[var(--color-stamp)]">
        остановлен
      </span>
    );
  }

  return (
    <span className="field">
      {status}
    </span>
  );
}

function Row({ entry }: { entry: Entry }) {
  return (
    <article
      className="row-hover grid grid-cols-[2rem_1fr] items-baseline gap-x-4 gap-y-1
        border-b border-[var(--color-rule-hair)] py-3.5
        md:grid-cols-[2.25rem_minmax(0,1.5fr)_minmax(0,1.5fr)_minmax(0,1.9fr)_auto_3rem_5.5rem_6rem]
        md:gap-x-5 md:py-2.5"
    >
      <span
        aria-hidden
        className="row-no num self-start text-[11px] text-[var(--color-ink-faint)] md:self-baseline"
      />

      <span className="num truncate text-[13px] text-[var(--color-ink)] md:text-[13px]">
        {entry.domain}
      </span>

      <span className="col-start-2 text-[14px] leading-snug text-[var(--color-ink-soft)] md:col-start-auto">
        {entry.niche}
        <span className="text-[var(--color-ink-faint)]">, {entry.city}</span>
      </span>

      <span className="col-start-2 text-[14px] leading-snug text-[var(--color-ink-soft)] md:col-start-auto">
        {entry.query}
      </span>

      <span className="col-start-2 text-[13px] md:col-start-auto">
        <Delta from={entry.from} to={entry.to} />
      </span>

      <span className="col-start-2 hidden text-[12px] md:col-start-auto md:block">
        <span className="num text-[var(--color-ink-faint)]">{entry.days}</span>
      </span>

      <span className="col-start-2 hidden md:col-start-auto md:block">
        <span className="num text-[11px] text-[var(--color-ink-faint)]">
          {entry.date}
        </span>
      </span>

      <span className="col-start-2 md:col-start-auto">
        <StatusMark status={entry.status} />
        {entry.note ? (
          <span className="mt-1 block text-[12px] leading-snug text-[var(--color-ink-faint)] italic">
            {entry.note}
          </span>
        ) : null}
      </span>
    </article>
  );
}

export function Registry() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"все" | Status>("все");
  const sectionRef = useRef<HTMLDivElement>(null);
  /* Событие вовлечения шлём один раз: иначе каждая набранная буква - отдельный хит. */
  const touched = useRef(false);

  useEffect(() => trackOnView(sectionRef.current, "proof_view"), []);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return ENTRIES.filter((e) => {
      if (filter !== "все" && e.status !== filter) return false;
      if (!needle) return true;

      return (
        e.domain.toLowerCase().includes(needle) ||
        e.niche.toLowerCase().includes(needle) ||
        e.city.toLowerCase().includes(needle) ||
        e.query.toLowerCase().includes(needle)
      );
    });
  }, [query, filter]);

  const noted = () => {
    if (touched.current) return;
    touched.current = true;
    track("calc_interact", { widget: "registry" });
  };

  return (
    <div ref={sectionRef}>
      {/* Фильтры бланка. Поле поиска и переключатели статуса на одной линейке. */}
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-b border-[var(--color-rule)] pb-4">
        <div className="w-full max-w-[22rem]">
          <label htmlFor="reg-search" className="field block">
            поиск по реестру
          </label>
          <input
            id="reg-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              noted();
            }}
            placeholder="ниша, город, домен или запрос"
            className="slot mt-2 w-full px-3 py-2.5 font-[family-name:var(--font-mono)]
              text-[13px] text-[var(--color-ink)] outline-none
              placeholder:text-[var(--color-ink-faint)]
              focus-visible:border-[var(--color-stamp)]"
          />
        </div>

        <div role="radiogroup" aria-label="Фильтр по статусу записи" className="flex flex-wrap items-center gap-x-1 gap-y-2">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  setFilter(f.id);
                  noted();
                }}
                /*
                  min-h обязателен: подпись набрана десятым кеглем, и без
                  явной высоты кнопка выходит около тридцати двух пикселей -
                  ниже минимальной зоны нажатия пальцем.
                */
                className={`field flex min-h-[44px] cursor-pointer items-center border px-3
                  [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro)]
                  ${
                    active
                      ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                      : "border-[var(--color-rule)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]"
                  }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Шапка таблицы. Скрыта на телефоне: там строка сама себя подписывает. */}
      <div
        aria-hidden
        className="hidden border-b border-[var(--color-rule)] py-2
          md:grid md:grid-cols-[2.25rem_minmax(0,1.5fr)_minmax(0,1.5fr)_minmax(0,1.9fr)_auto_3rem_5.5rem_6rem] md:gap-x-5"
      >
        <span className="field">№</span>
        <span className="field">домен</span>
        <span className="field">ниша, город</span>
        <span className="field">запрос</span>
        <span className="field">было / стало</span>
        <span className="field">сут</span>
        <span className="field">запись</span>
        <span className="field">статус</span>
      </div>

      <div className="registry" role="list">
        {rows.map((e) => (
          <Row key={`${e.domain}-${e.query}`} entry={e} />
        ))}
      </div>

      {/* Строка итога. Пустой результат нельзя оставлять молчаливым. */}
      <p
        aria-live="polite"
        className="field mt-4 flex flex-wrap items-baseline gap-x-2"
      >
        {rows.length === 0 ? (
          <span className="text-[var(--color-stamp)]">
            по этому запросу записей нет
          </span>
        ) : (
          <>
            <span>показано</span>
            <span className="num text-[13px] tracking-normal text-[var(--color-ink)]">
              {rows.length}
            </span>
            <span>из</span>
            <span className="num text-[13px] tracking-normal text-[var(--color-ink)]">
              {ENTRIES.length}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
