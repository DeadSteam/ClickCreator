"use client";

import { Breakout, Fade } from "./prose";

/*
  Схемы гипотезы №9 «Переход на следующий уровень».

  Источник — ТЗстраницы/2_9_..._Переход.docx. Цветовая логика ТЗ: графитовый —
  текущая система, белый — основные показатели, холодный синий — ясность и
  управляемость, приглушённый янтарный (--accent) — узкое место и ожидание,
  зелёный (--positive) — только фактически подтверждённый системный эффект.
  На этой странице подтверждённого эффекта ещё нет (речь о диагностике до
  проверки), поэтому зелёный не используется вовсе. Красный запрещён ТЗ
  текстом. Холодный синий — уже существующий токен `--color-azure`, не новый
  цвет. ТЗ прямо запрещает подписи «плохой»/«хороший» — обе ветви сравнения
  поданы фактами, без ярлыков победителя.
*/

const AZURE = "var(--color-azure)";

/**
 * Главный образ обложки: поток проектов идёт через несколько этапов, один
 * участок сужается и задерживает всё, что идёт следом. Подпись — «Ограничение
 * системы», не «потолок специалиста».
 */
export function BottleneckFlow() {
  const stages = ["Новый проект", "Сбор данных", "Проверка", "Решение"];
  const narrowIndex = 2;

  return (
    <figure className="border border-[var(--rule-soft)] bg-[var(--reading-bg)] p-6 sm:p-8">
      <p className="label text-[var(--ink-faint)]">карта рабочего процесса</p>

      <div
        role="img"
        aria-label="Поток проектов проходит через четыре этапа: новый проект, сбор данных, проверка, решение. На этапе «проверка» маршрут сужается и задерживает все последующие задачи — это ограничение системы, а не недостаток специалиста."
        className="mt-7 flex items-stretch gap-1.5 sm:gap-2"
      >
        {stages.map((s, i) => {
          const narrow = i === narrowIndex;
          return (
            <Fade key={s} delay={i * 0.08} className={narrow ? "flex-[0.7]" : "flex-1"}>
              <div
                className={`flex h-full flex-col justify-between border p-3 sm:p-4 ${
                  narrow ? "border-[var(--accent)]" : "border-[var(--rule-soft)]"
                }`}
              >
                <span
                  className={`text-[11px] leading-tight sm:text-[12px] ${
                    narrow ? "font-medium text-[var(--ink)]" : "text-[var(--ink-faint)]"
                  }`}
                >
                  {s}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-4 block h-[3px] w-full"
                  style={{ backgroundColor: narrow ? "var(--accent)" : "var(--rule)" }}
                />
              </div>
            </Fade>
          );
        })}
      </div>

      <Fade delay={0.35}>
        <p className="mt-4 label" style={{ color: "var(--accent)" }}>
          ↑ ограничение системы
        </p>
      </Fade>

      <figcaption className="mt-7 border-t border-[var(--rule-soft)] pt-6">
        <p className="max-w-[46ch] text-[14px] leading-relaxed text-[var(--ink-faint)] sm:text-[15px]">
          Следующий уровень может быть заблокирован не нехваткой
          профессионализма, а ограничением внутри текущего рабочего процесса.
        </p>
      </figcaption>
    </figure>
  );
}

/** Одна ступень цепочки внутри {@link GrowthTypesCompare} и {@link ToolImpactCompare}. */
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
 * Два типа роста рядом: линейный (нагрузка растёт вместе с проектами) и
 * системный (нагрузка растёт медленнее результата). ТЗ прямо требует не
 * обещать отсутствие роста нагрузки — только снижение прямой зависимости,
 * поэтому системная цепочка заканчивается не нулём, а более медленным ростом.
 */
export function GrowthTypesCompare() {
  const linear = ["Больше проектов", "Больше ручной работы", "Больше часов", "Больше нагрузки"];
  const systemic = ["Больше проектов", "Быстрее закрываются рабочие циклы", "Меньше ручных возвратов", "Нагрузка растёт медленнее результата"];

  return (
    <Breakout>
      <div
        role="img"
        aria-label="Линейный рост: больше проектов — больше ручной работы — больше часов — больше нагрузки. Системный рост: больше проектов — быстрее закрываются рабочие циклы — меньше ручных возвратов — нагрузка растёт медленнее результата."
        className="grid gap-8 sm:grid-cols-2"
      >
        <div>
          <Fade>
            <p className="label text-[var(--ink-faint)]">линейный рост</p>
          </Fade>
          <ol className="mt-5 flex flex-col items-start">
            {linear.map((s, i) => (
              <ChainStep key={s} step={s} i={i} accent={false} />
            ))}
          </ol>
        </div>

        <div>
          <Fade delay={0.15}>
            <p className="label" style={{ color: AZURE }}>системный рост</p>
          </Fade>
          <ol className="mt-5 flex flex-col items-start">
            {systemic.map((s, i) => (
              <ChainStep key={s} step={s} i={i} accent />
            ))}
          </ol>
        </div>
      </div>
    </Breakout>
  );
}

/**
 * Где может находиться потолок: семь факторов. Первые три — нейтральные
 * (компетенции, клиенты, цена, инструменты), последние четыре объединены в
 * «Ограничения рабочей системы» и получают акцент — ТЗ прямо разводит их так.
 */
export function CeilingMap() {
  const neutral = ["Компетенции", "Клиенты", "Цена", "Инструменты"];
  const systemic = ["Скорость данных", "Ручные касания", "Количество открытых циклов"];

  return (
    <Breakout>
      <figure>
        <p className="label text-[var(--ink-faint)]">где может находиться потолок</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {neutral.map((t, i) => (
            <Fade key={t} delay={i * 0.05} className="inline-flex">
              <span className="border border-[var(--rule-soft)] bg-[var(--inset)] px-3 py-1.5 text-[13px] text-[var(--ink-faint)] opacity-80">
                {t}
              </span>
            </Fade>
          ))}
        </div>

        <Fade delay={0.25}>
          <p className="mt-5 label" style={{ color: "var(--accent)" }}>ограничения рабочей системы</p>
        </Fade>
        <div className="mt-3 flex flex-wrap gap-2">
          {systemic.map((t, i) => (
            <Fade key={t} delay={0.3 + i * 0.06} className="inline-flex">
              <span className="border-l-2 border-[var(--accent)] bg-[var(--inset)] px-3 py-1.5 text-[13px] font-medium text-[var(--ink)]">
                {t}
              </span>
            </Fade>
          ))}
        </div>
      </figure>
    </Breakout>
  );
}

/** Одна карточка измеримого признака внутри {@link FiveSystemSigns}. */
function SignCard({ index, title, description }: { index: number; title: string; description: string }) {
  return (
    <Fade delay={index * 0.06} className="cell">
      <div className="h-full p-6 sm:p-7">
        <p className="label text-[var(--ink-faint)]">признак {index + 1}</p>
        <p className="mt-4 text-[16px] leading-snug font-semibold tracking-[-0.01em] text-[var(--ink)] sm:text-[17px]">
          {title}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-[var(--ink-soft)] sm:text-[14px]">{description}</p>
      </div>
    </Fade>
  );
}

/** Пять измеримых признаков системного потолка. */
export function FiveSystemSigns() {
  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
        <SignCard index={0} title="Длина рабочего цикла" description="Сколько времени проходит от запуска гипотезы до следующего обоснованного решения." />
        <SignCard index={1} title="Количество ручных возвратов" description="Сколько раз нужно повторно открыть проект, перепроверить данные, скорректировать настройки." />
        <SignCard index={2} title="Количество открытых циклов" description="Сколько проектов одновременно в состоянии ожидания, недостатка данных, незавершённой проверки." />
        <SignCard index={3} title="Зависимость от личного внимания" description="Какие этапы невозможно пройти без непосредственного участия специалиста." />
        <SignCard index={4} title="Рост нагрузки на новый проект" description="Насколько увеличиваются ручная работа, коммуникация, контроль при добавлении клиента." />
      </div>
    </Breakout>
  );
}

/**
 * Инструмент, который добавляет слой, против инструмента, который снимает
 * ограничение. ТЗ прямо запрещает подписи «плохой»/«хороший» — обе ветви
 * называют факты, не ярлыки.
 */
export function ToolImpactCompare() {
  const addsLayer = ["Текущий процесс", "Новый сервис", "Дополнительная настройка", "Дополнительный контроль", "Та же пропускная способность"];
  const removesConstraint = ["Текущий процесс", "Новый сервис", "Главное узкое место", "Короче цикл", "Выше пропускная способность"];

  return (
    <Breakout>
      <div
        role="img"
        aria-label="Вариант А: инструмент добавляет слой — текущий процесс, новый сервис, дополнительная настройка, дополнительный контроль, та же пропускная способность. Вариант Б: инструмент снимает ограничение — текущий процесс, новый сервис, главное узкое место, короче цикл, выше пропускная способность."
        className="grid gap-8 sm:grid-cols-2"
      >
        <div>
          <Fade>
            <p className="label text-[var(--ink-faint)]">инструмент добавляет слой</p>
          </Fade>
          <ol className="mt-5 flex flex-col items-start">
            {addsLayer.map((s, i) => (
              <ChainStep key={s} step={s} i={i} accent={false} />
            ))}
          </ol>
        </div>

        <div>
          <Fade delay={0.15}>
            <p className="label" style={{ color: AZURE }}>инструмент снимает ограничение</p>
          </Fade>
          <ol className="mt-5 flex flex-col items-start">
            {removesConstraint.map((s, i) => (
              <ChainStep key={s} step={s} i={i} accent />
            ))}
          </ol>
        </div>
      </div>
    </Breakout>
  );
}

/**
 * Панель диагностики: пять входных показателей сходятся в «Главное
 * ограничение», из которого расходятся четыре равнозначных исхода проверки.
 */
export function DiagnosticPanel() {
  const inputs = ["Время цикла", "Возвраты", "Открытые процессы", "Личное участие", "Нагрузка на новый проект"];
  const outcomes = ["Ограничение не изменилось", "Локальное улучшение", "Повторяемое улучшение", "Системное влияние"];

  return (
    <figure className="mt-12">
      <div
        role="img"
        aria-label="Пять входных показателей — время цикла, возвраты, открытые процессы, личное участие, нагрузка на новый проект — сходятся в «главное ограничение». После проверки оно разрешается в один из четырёх исходов: ограничение не изменилось, локальное улучшение, повторяемое улучшение, системное влияние."
      >
        <div className="flex flex-wrap justify-center gap-2">
          {inputs.map((t, i) => (
            <Fade key={t} delay={i * 0.05} className="inline-flex">
              <span className="border border-[var(--rule-soft)] bg-[var(--inset)] px-3 py-1.5 text-[12px] text-[var(--ink-faint)]">
                {t}
              </span>
            </Fade>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <span aria-hidden="true" className="block h-6 w-px bg-[var(--rule)]" />
        </div>

        <Fade delay={0.3}>
          <div className="mx-auto max-w-[16rem] border-l-2 border-[var(--accent)] bg-[var(--inset)] p-5 text-center sm:p-6">
            <p className="label" style={{ color: "var(--accent)" }}>главное ограничение</p>
          </div>
        </Fade>

        <div className="mt-4 flex justify-center">
          <span aria-hidden="true" className="num text-[var(--ink-faint)]">↓ проверка ↓</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-px bg-[var(--rule-soft)] sm:grid-cols-4">
          {outcomes.map((t, i) => (
            <Fade key={t} delay={0.45 + i * 0.06} className="cell p-4 text-center sm:p-5">
              <p className="text-[12px] leading-snug text-[var(--ink)] sm:text-[13px]">{t}</p>
            </Fade>
          ))}
        </div>
      </div>
    </figure>
  );
}
