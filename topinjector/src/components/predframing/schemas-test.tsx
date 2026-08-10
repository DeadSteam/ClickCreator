"use client";

import { Breakout, Fade } from "./prose";

/*
  Схемы гипотезы №8 «Проверка собственной правоты».

  Источник — ТЗстраницы/2_8_..._Проверка.docx. Цветовая логика ТЗ прямая:
  графитовый/белый — нейтральные условия и тезисы; холодный синий — проверенные
  данные и профессиональный вывод; приглушённый янтарный (--accent) —
  неподтверждённая гипотеза; зелёный (--positive) держится строго за фактически
  подтверждённый результат — на этой странице такого результата ещё нет,
  поэтому зелёный здесь не используется вовсе. Красный запрещён ТЗ текстом.
  Холодный синий берётся из уже существующего токена `--color-azure`
  («холодный акцент с синего языка логотипа», globals.css) — страница не
  заводит новый цвет, а достаёт уже узаконенный редкий акцент.
  Везде Fade, не FadeItem вне настоящих <ul>/<ol>.
*/

const AZURE = "var(--color-azure)";

/**
 * Главный образ обложки: два одинаковых прозрачных лабораторных модуля с
 * одинаковыми контрольными параметрами, сходящиеся в нейтральную карточку
 * вывода. Ни один модуль не выигрывает — оба получают одинаковый вес.
 */
export function TwinModules() {
  const params = ["стартовая точка", "период", "метрики", "условия оценки"];

  return (
    <figure className="border border-[var(--rule-soft)] bg-[var(--reading-bg)] p-6 sm:p-8">
      <p className="label text-[var(--ink-faint)]">один и тот же проект в двух модулях</p>

      <div
        role="img"
        aria-label="Два одинаковых прозрачных модуля с одним и тем же условным проектом. У обоих одинаковые контрольные параметры: стартовая точка, период, метрики, условия оценки. Внизу — нейтральный вывод: сравниваем не обещания, сравниваем данные."
        className="mt-7 grid grid-cols-2 gap-3 sm:gap-5"
      >
        {["Текущий инструмент", "Новый инструмент"].map((title, i) => (
          <Fade key={title} delay={i * 0.1} className="border border-[var(--rule-soft)] p-4 sm:p-6">
            <p className="label text-[var(--ink-faint)]">{title}</p>
            <ul className="mt-4 flex flex-col gap-1.5">
              {params.map((p) => (
                <li key={p} className="text-[12px] leading-snug text-[var(--ink-soft)] sm:text-[13px]">
                  {p}
                </li>
              ))}
            </ul>
          </Fade>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <span aria-hidden="true" className="block h-6 w-px bg-[var(--rule)]" />
      </div>

      <Fade delay={0.25}>
        <div className="border-l-2 p-5 text-center sm:p-6" style={{ borderColor: AZURE }}>
          <p className="text-[14px] leading-snug font-medium text-[var(--ink)] sm:text-[15px]">
            Сравниваем не обещания. Сравниваем данные.
          </p>
        </div>
      </Fade>

      <figcaption className="mt-7 border-t border-[var(--rule-soft)] pt-6">
        <p className="max-w-[46ch] text-[14px] leading-relaxed text-[var(--ink-faint)] sm:text-[15px]">
          Пользователь не должен выбирать, кому поверить. Он должен увидеть,
          как создать условия, в которых результат можно сравнить
          самостоятельно.
        </p>
      </figcaption>
    </figure>
  );
}

/** Одна ступень нейтральной цепочки внутри {@link EvidenceVsOwnCheck}. */
function ChainStep({ step, i, accent }: { step: string; i: number; accent: boolean }) {
  return (
    <li className="w-full">
      {i > 0 && (
        <span
          aria-hidden="true"
          className="ml-[8px] block h-5 w-px"
          style={{ backgroundColor: accent ? AZURE : "var(--rule)" }}
        />
      )}
      <span
        className={`inline-flex items-center gap-3 text-[14px] leading-snug sm:text-[15px] ${
          accent ? "font-medium text-[var(--ink)]" : "text-[var(--ink-faint)]"
        }`}
      >
        <span
          aria-hidden="true"
          className="block h-[6px] w-[6px] shrink-0 rounded-full"
          style={{ backgroundColor: accent ? AZURE : "var(--ink-faint)" }}
        />
        {step}
      </span>
    </li>
  );
}

/**
 * Две последовательности рядом: что даёт чужое доказательство (обрывается на
 * «не подтверждает результат в ваших условиях») и что даёт собственная
 * проверка (доходит до профессионального вывода). Левая — нейтрально-серая,
 * правая держит холодный синий как знак проверенных данных.
 */
export function EvidenceVsOwnCheck() {
  const foreign = ["Кейс", "Подтверждает возможность", "Но не подтверждает результат в ваших условиях"];
  const own = ["Ваш проект", "Заранее заданные условия", "Собственные данные", "Профессиональный вывод"];

  return (
    <Breakout>
      <div
        role="img"
        aria-label="Слева: чужое доказательство — кейс подтверждает возможность, но не подтверждает результат в ваших условиях. Справа: собственная проверка — ваш проект, заранее заданные условия, собственные данные, профессиональный вывод."
        className="grid gap-8 sm:grid-cols-2"
      >
        <div>
          <Fade>
            <p className="label text-[var(--ink-faint)]">что может дать чужое доказательство</p>
          </Fade>
          <ol className="mt-5 flex flex-col items-start">
            {foreign.map((s, i) => (
              <ChainStep key={s} step={s} i={i} accent={false} />
            ))}
          </ol>
        </div>

        <div>
          <Fade delay={0.15}>
            <p className="label" style={{ color: AZURE }}>что даёт собственная проверка</p>
          </Fade>
          <ol className="mt-5 flex flex-col items-start">
            {own.map((s, i) => (
              <ChainStep key={s} step={s} i={i} accent />
            ))}
          </ol>
        </div>
      </div>
    </Breakout>
  );
}

/**
 * Слабая проверка против профессиональной проверки — та же двойная цепочка,
 * что и {@link EvidenceVsOwnCheck}, но с другим текстом: ТЗ прямо требует
 * выделить вторую последовательность холодным синим, первую оставить
 * нейтрально-серой, красный не использовать нигде.
 */
export function WeakVsProfessionalCheck() {
  const weak = ["Запуск", "Результат", "Интерпретация задним числом", "Субъективный вывод"];
  const professional = ["Гипотеза", "Критерии", "Запуск", "Данные", "Заранее определённый вывод"];

  return (
    <Breakout>
      <div
        role="img"
        aria-label="Слева: слабая проверка — запуск, результат, интерпретация задним числом, субъективный вывод. Справа: профессиональная проверка — гипотеза, критерии, запуск, данные, заранее определённый вывод."
        className="grid gap-8 sm:grid-cols-2"
      >
        <div>
          <Fade>
            <p className="label text-[var(--ink-faint)]">слабая проверка</p>
          </Fade>
          <ol className="mt-5 flex flex-col items-start">
            {weak.map((s, i) => (
              <ChainStep key={s} step={s} i={i} accent={false} />
            ))}
          </ol>
        </div>

        <div>
          <Fade delay={0.15}>
            <p className="label" style={{ color: AZURE }}>профессиональная проверка</p>
          </Fade>
          <ol className="mt-5 flex flex-col items-start">
            {professional.map((s, i) => (
              <ChainStep key={s} step={s} i={i} accent />
            ))}
          </ol>
        </div>
      </div>
    </Breakout>
  );
}

/** Одна опора объективной проверки внутри {@link SixPillars}. */
function PillarCard({ index, title, items }: { index: number; title: string; items: string[] }) {
  return (
    <Fade delay={index * 0.05} className="cell">
      <div className="h-full p-6 sm:p-7">
        <p className="num text-[13px] text-[var(--ink-faint)]">{String(index + 1).padStart(2, "0")}</p>
        <p className="mt-3 text-[16px] leading-snug font-semibold tracking-[-0.01em] text-[var(--ink)] sm:text-[17px]">
          {title}
        </p>
        <ul className="mt-3 flex flex-col gap-1">
          {items.map((t) => (
            <li key={t} className="text-[13px] leading-snug text-[var(--ink-soft)] sm:text-[14px]">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Fade>
  );
}

/** Шесть опор, на которых держится объективная проверка. Все видны сразу, без табов. */
export function SixPillars() {
  const pillars: { title: string; items: string[] }[] = [
    { title: "Одна рабочая гипотеза", items: ["Полезный сигнал раньше", "Меньше ручных действий", "Быстрее следующее решение"] },
    { title: "Зафиксированная стартовая точка", items: ["Текущие показатели", "Дата и регион", "Состояние проекта"] },
    { title: "Одинаковые критерии", items: ["Время до сигнала", "Качество данных", "Стоимость цикла"] },
    { title: "Заданный период", items: ["Срок наблюдения", "Момент первичного вывода", "Не меняется задним числом"] },
    { title: "Несколько допустимых исходов", items: ["Преимущество текущего", "Преимущество нового", "Недостаток данных"] },
    { title: "Заранее определённое решение", items: ["Оставить или повторить", "Добавить в сценарий", "Отказаться от гипотезы"] },
  ];

  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
        {pillars.map((p, i) => (
          <PillarCard key={p.title} index={i} title={p.title} items={p.items} />
        ))}
      </div>
    </Breakout>
  );
}

/** Пять равнозначных исходов проверки. Ни один не подписан победителем. */
export function OutcomeScenarios() {
  const scenarios = [
    { title: "Текущий инструмент сильнее", text: "Проверка подтверждает, что привычный сервис остаётся оптимальным для выбранной задачи." },
    { title: "Новый инструмент сильнее", text: "Появляется основание добавить его в рабочий процесс или расширить тест." },
    { title: "Результаты сопоставимы", text: "Решение принимается по вторичным критериям: стоимости, удобству, масштабируемости, поддержке, риску." },
    { title: "Инструменты сильны в разных задачах", text: "Формируется комбинированный стек, где каждый сервис используется в своём сильном сценарии." },
    { title: "Данных недостаточно", text: "Проверка уточняется, повторяется или переносится на более подходящий проект." },
  ];

  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
        {scenarios.map((s, i) => (
          <Fade key={s.title} delay={i * 0.06} className="cell">
            <div className="h-full p-6 sm:p-7">
              <p className="label text-[var(--ink-faint)]">сценарий {i + 1}</p>
              <p className="mt-3 text-[15px] leading-snug font-semibold tracking-[-0.01em] text-[var(--ink)] sm:text-[16px]">
                {s.title}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--ink-soft)] sm:text-[14px]">{s.text}</p>
            </div>
          </Fade>
        ))}
      </div>
    </Breakout>
  );
}

/**
 * Неопределённость в центре разрешается в один из пяти ясных выводов. Все
 * пять исходов поданы равнозначно — ни один не зелёный и не «выигрышный».
 */
export function UncertaintyResolve() {
  const outcomes = ["Оставить", "Добавить", "Разделить сценарии", "Повторить", "Отказаться"];

  return (
    <figure className="mt-12">
      <div
        role="img"
        aria-label="В центре — неопределённость. После прохождения через проверку она разрешается в один из пяти ясных выводов: оставить, добавить, разделить сценарии, повторить, отказаться."
      >
        <Fade className="mx-auto max-w-[16rem] border border-[var(--rule-soft)] bg-[var(--inset)] p-5 text-center sm:p-6">
          <p className="label text-[var(--ink-faint)]">неопределённость</p>
        </Fade>

        <div className="mt-4 flex justify-center">
          <span aria-hidden="true" className="num text-[var(--ink-faint)]">↓ проверка ↓</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-px bg-[var(--rule-soft)] sm:grid-cols-5">
          {outcomes.map((t, i) => (
            <Fade key={t} delay={0.2 + i * 0.06} className="cell p-4 text-center sm:p-5">
              <p className="text-[13px] leading-snug text-[var(--ink)] sm:text-[14px]">{t}</p>
            </Fade>
          ))}
        </div>
      </div>
    </figure>
  );
}
