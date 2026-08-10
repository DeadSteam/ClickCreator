"use client";

import { Breakout, Fade, FadeItem } from "./prose";

/*
  Схемы гипотезы №2 «Информационное преимущество».

  Источник метафор — ТЗстраницы/2_2_..._Информационное.docx, разделы «ТЗ дизайнеру»
  и «ВИЗУАЛ БЛОКА N». Правило то же, что в schemas.tsx гипотезы №1: акцент
  размечает данные, второй ряд — приглушённые чернила, зелёный на схемах не
  появляется. Иконок нет нигде, хотя ТЗ их упоминает («Цель», «Метрика», «Таймер») —
  на остальной странице их тоже нет, а заводить их ради одной схемы значило бы
  ввести новый визуальный язык posередине системы.
*/

/**
 * Главный образ обложки: тёмная комната одинаковых мониторов. На всех — одна и
 * та же плоская линия. Только один, в углу, показывает едва заметное отклонение
 * от общей траектории — то, что через месяцы станет новым направлением рынка.
 */
export function MonitorField() {
  const cols = 4;
  const rows = 3;
  const total = cols * rows;
  const oddIndex = 9; // третья строка, вторая колонка — не центр и не угол, взгляд находит не сразу

  return (
    <figure className="border border-[var(--rule-soft)] bg-[var(--reading-bg)] p-6 sm:p-8">
      <p className="label text-[var(--ink-faint)]">мониторы аналитического центра</p>

      <div
        role="img"
        aria-label="Сетка из двенадцати одинаковых мониторов с плоской линией. Один монитор, ничем не выделенный на первый взгляд, показывает едва заметное отклонение траектории вверх."
        className="mt-7 grid grid-cols-4 gap-2.5"
      >
        {Array.from({ length: total }).map((_, i) => {
          const odd = i === oddIndex;
          return (
            <Fade
              key={i}
              delay={Math.min(i, 8) * 0.04}
              className={`aspect-[4/3] border p-2 ${
                odd
                  ? "border-[var(--accent)] bg-[var(--inset)]"
                  : "border-[var(--rule-soft)] bg-[var(--inset)] opacity-60"
              }`}
            >
              <svg viewBox="0 0 40 24" className="h-full w-full" aria-hidden="true">
                {odd ? (
                  <path
                    d="M2 18 C 12 18, 20 17, 28 11 C 33 7, 36 5, 38 4"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                  />
                ) : (
                  <path d="M2 15 L38 15" fill="none" stroke="var(--ink-faint)" strokeWidth="1.4" />
                )}
              </svg>
            </Fade>
          );
        })}
      </div>

      <figcaption className="mt-7 border-t border-[var(--rule-soft)] pt-6">
        <p className="max-w-[44ch] text-[14px] leading-relaxed text-[var(--ink-faint)] sm:text-[15px]">
          Разница пока почти незаметна. Именно она станет новым направлением
          движения рынка.
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * «Как появляются профессиональные преимущества» — первый экран после скролла.
 * Пять этапов, но выделен не один из них, а промежуток между вторым и третьим:
 * ТЗ прямо требует подсветить именно окно между «первыми проверками» и «первыми
 * результатами», а не саму точку.
 */
export function AdvantageWindow() {
  const steps = ["Новая идея", "Первые проверки", "Первые результаты", "Профессиональное обсуждение", "Массовое распространение"];
  const windowAfter = 1; // подсветка идёт сразу после этого индекса

  return (
    <figure className="mt-12">
      <Fade>
        <p className="label text-[var(--ink-faint)]">как появляются профессиональные преимущества</p>
      </Fade>

      <ol className="mt-5 flex flex-col items-start">
        {steps.map((s, i) => (
          <FadeItem key={s} delay={Math.min(i, 6) * 0.07} className="w-full">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="ml-[8px] block h-6 w-px"
                style={{
                  backgroundColor: i - 1 === windowAfter ? "var(--accent)" : "var(--rule)",
                  width: i - 1 === windowAfter ? "2px" : "1px",
                  marginLeft: i - 1 === windowAfter ? "7px" : "8px",
                }}
              />
            )}
            <span className="inline-flex items-center gap-4 text-[17px] text-[var(--ink-soft)] sm:text-[18px]">
              <span
                aria-hidden="true"
                className="ml-[5px] block h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--ink-faint)]"
              />
              {s}
            </span>
          </FadeItem>
        ))}
      </ol>

      <Fade delay={0.5}>
        <div className="mt-9 border-l-2 border-[var(--accent)] bg-[var(--inset)] p-6 sm:p-7">
          <p className="label text-[var(--accent)]">здесь находится самое большое преимущество</p>
          <p className="mt-4 text-[19px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[22px]">
            Между первыми проверками и первыми результатами
          </p>
        </div>
      </Fade>
    </figure>
  );
}

/**
 * Фильтр информационного потока: карточки идут одна за одной и гаснут, кроме
 * одной — она проходит фильтр и становится акцентной. Метафора блока 1
 * («Не собрать больше информации. Отобрать то, что стоит проверить»).
 */
export function InfoFilter() {
  const items = ["Новая методика", "Кейс конкурента", "Обновление алгоритма", "Мнение в чате", "Вебинар", "Гипотеза для проверки"];
  const passIndex = 5;

  return (
    <Breakout>
      <figure>
        <Fade>
          <p className="label text-[var(--ink-faint)]">поток информации</p>
        </Fade>

        <div className="mt-5 grid grid-cols-2 gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
          {items.map((t, i) => {
            const pass = i === passIndex;
            return (
              <Fade
                key={t}
                delay={i * 0.08}
                className={`cell p-5 sm:p-6 ${pass ? "border-l-2 border-[var(--accent)]" : "opacity-55"}`}
              >
                <p
                  className={`text-[15px] leading-snug sm:text-[16px] ${
                    pass ? "font-medium text-[var(--ink)]" : "text-[var(--ink-faint)]"
                  }`}
                >
                  {t}
                </p>
              </Fade>
            );
          })}
        </div>

        <Fade delay={0.5}>
          <p className="mt-5 max-w-[52ch] text-[14px] leading-relaxed text-[var(--ink-faint)] sm:text-[15px]">
            Не собрать больше информации. Отобрать то, что стоит проверить.
          </p>
        </Fade>
      </figure>
    </Breakout>
  );
}

/** Одна карточка признака сильной гипотезы. */
function CriteriaCard({
  index,
  question,
  detail,
}: {
  index: number;
  question: string;
  detail: string;
}) {
  return (
    <Fade delay={index * 0.08} className="cell">
      <div className="h-full p-6 sm:p-7">
        <p className="label text-[var(--ink-faint)]">признак {index + 1}</p>
        <p className="mt-4 text-[18px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[19px]">
          {question}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-soft)] sm:text-[15px]">
          {detail}
        </p>
      </div>
    </Fade>
  );
}

/**
 * Четыре признака сильной гипотезы — плоская сетка карточек, а не карусель:
 * ТЗ прямо требует, чтобы вся логика была видна сразу.
 */
export function CriteriaGrid() {
  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2 sm:grid-rows-2">
        <CriteriaCard
          index={0}
          question="Что именно должно измениться?"
          detail="Не «работать станет лучше», а «сократится время до первой заметной динамики» или «снизится количество ручных действий»."
        />
        <CriteriaCard
          index={1}
          question="Как это будет измеряться?"
          detail="Стартовая точка, период наблюдения, динамика, стоимость результата, итоговый вывод — без измерения гипотеза остаётся впечатлением."
        />
        <CriteriaCard
          index={2}
          question="Насколько быстро можно получить ответ?"
          detail="Чем дольше длится проверка, тем дороже обходится ошибка."
        />
        <CriteriaCard
          index={3}
          question="Можно ли проверить это без разрушения текущей системы?"
          detail="Без отказа от привычного инструмента, без переноса всех проектов, без смены процессов до получения результата."
        />
      </div>
    </Breakout>
  );
}
