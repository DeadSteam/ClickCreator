"use client";

import { Breakout, Fade } from "./prose";

/*
  Схемы гипотезы №10 «Закрытое преимущество».

  Источник — ТЗстраницы/2_10_..._Закрытое.docx. Цветовая логика ТЗ: графитовый
  — неизвестная возможность, приглушённый янтарный (--accent) — гипотеза без
  достаточного подтверждения, синий — контролируемая проверка и собственные
  данные, зелёный (--positive) — только повторяемый подтверждённый сценарий.
  На этой странице подтверждённого повторяемого сценария ещё нет (речь о
  методике до проверки), поэтому зелёный не используется вовсе. Красный
  запрещён ТЗ текстом. Холодный синий — уже существующий токен
  `--color-azure`, не новый цвет. Никакой эксклюзивности: ни закрытых клубов,
  ни таймеров, ни счётчиков мест, ни корон и пьедесталов — ТЗ прямо это
  запрещает, а окно преимущества показывается без обратного отсчёта.
*/

const AZURE = "var(--color-azure)";

/**
 * Жизненный цикл технологии с окном максимального потенциального
 * преимущества. Используется дважды: в Hero (шесть этапов, обложка) и в
 * Блоке 1 Части C (другая шкала зрелости) — оба раза окно между двумя
 * этапами подсвечено холодным синим, а не янтарным и не зелёным.
 */
export function LifecycleWindow({
  steps,
  windowStart,
  windowEnd,
  windowCaption,
  caption,
}: {
  steps: string[];
  windowStart: number;
  windowEnd: number;
  windowCaption: string;
  caption?: string;
}) {
  return (
    <figure className="mt-12">
      {caption && (
        <Fade>
          <p className="label text-[var(--ink-faint)]">{caption}</p>
        </Fade>
      )}

      <ol className="mt-5 flex flex-col items-start">
        {steps.map((s, i) => {
          const inWindow = i >= windowStart && i <= windowEnd;
          return (
            <li key={s} className="w-full">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="block h-6 w-px"
                  style={{
                    marginLeft: i > windowStart && i <= windowEnd ? "7px" : "8px",
                    width: i > windowStart && i <= windowEnd ? "2px" : "1px",
                    backgroundColor: i > windowStart && i <= windowEnd ? AZURE : "var(--rule)",
                  }}
                />
              )}
              <span
                className={`inline-flex items-center gap-4 text-[17px] sm:text-[18px] ${
                  inWindow ? "font-semibold text-[var(--ink)]" : "text-[var(--ink-soft)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="ml-[5px] block h-[7px] w-[7px] shrink-0 rounded-full"
                  style={{ backgroundColor: inWindow ? AZURE : "var(--ink-faint)" }}
                />
                {s}
              </span>
            </li>
          );
        })}
      </ol>

      <Fade delay={0.5}>
        <div className="mt-9 border-l-2 p-6 sm:p-7" style={{ borderColor: AZURE, backgroundColor: "var(--inset)" }}>
          <p className="label" style={{ color: AZURE }}>потенциальное окно преимущества</p>
          <p className="mt-4 text-[19px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[22px]">
            {windowCaption}
          </p>
        </div>
      </Fade>
    </figure>
  );
}

/** Одна ступень цепочки внутри {@link TechnologyVsAdvantage} и {@link AccessVsExperience}. */
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
 * Технология и преимущество живут по разным законам: технология продолжает
 * распространяться и после массового внедрения, а преимущество к этому
 * моменту уже исчезает.
 */
export function TechnologyVsAdvantage() {
  const tech = ["Может продолжать работать", "Становится понятнее", "Распространяется", "Превращается в стандарт"];
  const advantage = ["Возникает при ранней проверке", "Усиливается собственным опытом", "Снижается при массовом внедрении", "Исчезает, когда подход используют одинаково хорошо"];

  return (
    <Breakout>
      <div
        role="img"
        aria-label="Технология: может продолжать работать, становится понятнее, распространяется, превращается в стандарт. Преимущество: возникает при ранней проверке, усиливается собственным опытом, снижается при массовом внедрении, исчезает, когда подход используют одинаково хорошо."
        className="grid gap-8 sm:grid-cols-2"
      >
        <div>
          <Fade>
            <p className="label text-[var(--ink-faint)]">технология</p>
          </Fade>
          <ol className="mt-5 flex flex-col items-start">
            {tech.map((s, i) => (
              <ChainStep key={s} step={s} i={i} accent={false} />
            ))}
          </ol>
        </div>

        <div>
          <Fade delay={0.15}>
            <p className="label" style={{ color: AZURE }}>преимущество</p>
          </Fade>
          <ol className="mt-5 flex flex-col items-start">
            {advantage.map((s, i) => (
              <ChainStep key={s} step={s} i={i} accent />
            ))}
          </ol>
        </div>
      </div>
    </Breakout>
  );
}

/**
 * «Что на самом деле является закрытым преимуществом» — не доступ к сервису,
 * а сумма практических факторов, недоступная за один клик.
 */
export function AdvantageEquation() {
  const factors = ["Собственные данные", "Практика", "Понимание ограничений", "Готовые сценарии", "Раннее решение"];

  return (
    <Breakout>
      <figure>
        <Fade>
          <p className="label text-[var(--ink-faint)] opacity-70">не доступ к сервису</p>
        </Fade>

        <Fade delay={0.15}>
          <p className="mt-2 label" style={{ color: AZURE }}>а:</p>
        </Fade>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {factors.map((f, i) => (
            <Fade key={f} delay={0.2 + i * 0.08} className="inline-flex items-center gap-3">
              <span className="border-l-2 bg-[var(--inset)] px-3 py-1.5 text-[13px] font-medium text-[var(--ink)]" style={{ borderColor: AZURE }}>
                {f}
              </span>
              {i < factors.length - 1 && (
                <span aria-hidden="true" className="num text-[var(--ink-faint)]">+</span>
              )}
            </Fade>
          ))}
        </div>
      </figure>
    </Breakout>
  );
}

/** Одна карточка признака зрелой гипотезы внутри {@link MaturitySigns}. */
function SignCard({ index, title, description }: { index: number; title: string; description: string }) {
  return (
    <Fade delay={index * 0.05} className="cell">
      <div className="h-full p-6 sm:p-7">
        <p className="num text-[13px] text-[var(--ink-faint)]">{String(index + 1).padStart(2, "0")}</p>
        <p className="mt-3 text-[16px] leading-snug font-semibold tracking-[-0.01em] text-[var(--ink)] sm:text-[17px]">
          {title}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-[var(--ink-soft)] sm:text-[14px]">{description}</p>
      </div>
    </Fade>
  );
}

/** Шесть признаков зрелой гипотезы для ранней проверки. Все видны сразу, без табов. */
export function MaturitySigns() {
  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
        <SignCard index={0} title="Понятная причинная логика" description="Ясно, за счёт какого изменения подход способен усилить работу — не просто «это новая технология»." />
        <SignCard index={1} title="Измеримый эффект" description="До запуска можно определить, что должно измениться: время, действия, скорость, стоимость, повторяемость." />
        <SignCard index={2} title="Ограниченный масштаб" description="Проверку можно провести на одном проекте, без переноса портфеля и без необратимого решения." />
        <SignCard index={3} title="Короткий цикл получения данных" description="Первые полезные выводы появляются достаточно быстро." />
        <SignCard index={4} title="Несколько допустимых исходов" description="Подтверждение, частичное подтверждение, отсутствие преимущества, уточнение условий, отказ." />
        <SignCard index={5} title="Возможность накопить повторяемый опыт" description="Можно повторить тест, увидеть устойчивые условия, сформировать рабочий сценарий." />
      </div>
    </Breakout>
  );
}

/**
 * Доступ и опыт — два уровня. Первый уровень не показан бесполезным, он
 * начало пути; второй выделен синим как более зрелое состояние.
 */
export function AccessVsExperience() {
  const access = ["Регистрация", "Знакомство", "Первый запуск", "Первый результат"];
  const experience = ["Повторяемость", "Ограничения", "Сценарии", "Интерпретация", "Уверенное решение"];

  return (
    <Breakout>
      <div
        role="img"
        aria-label="Уровень первый: доступ — регистрация, знакомство, первый запуск, первый результат. Уровень второй: опыт — повторяемость, ограничения, сценарии, интерпретация, уверенное решение."
        className="grid gap-8 sm:grid-cols-2"
      >
        <div>
          <Fade>
            <p className="label text-[var(--ink-faint)]">уровень 1 — доступ</p>
          </Fade>
          <ol className="mt-5 flex flex-col items-start">
            {access.map((s, i) => (
              <ChainStep key={s} step={s} i={i} accent={false} />
            ))}
          </ol>
        </div>

        <div>
          <Fade delay={0.15}>
            <p className="label" style={{ color: AZURE }}>уровень 2 — опыт</p>
          </Fade>
          <ol className="mt-5 flex flex-col items-start">
            {experience.map((s, i) => (
              <ChainStep key={s} step={s} i={i} accent />
            ))}
          </ol>
        </div>
      </div>
    </Breakout>
  );
}

/**
 * Импульсивное раннее внедрение против контролируемого накопления опыта.
 * ТЗ прямо запрещает красный/зелёный здесь — левая колонка графитовая,
 * правая синяя, цель показать разницу логики, а не осудить один из подходов.
 */
export function ImplementationCompare() {
  const impulsive = ["Решение принимается до данных.", "Новый инструмент сразу встраивается в процессы.", "Масштаб проверки слишком велик.", "Отказ становится дорогим.", "Новизна воспринимается как преимущество сама по себе."];
  const controlled = ["Сначала задаются критерии.", "Тест ограничен.", "Текущий стек сохраняется.", "Данные собираются до решения.", "Масштабирование начинается после повторяемости."];

  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        <Fade className="cell">
          <div className="h-full p-6 sm:p-8">
            <p className="label text-[var(--ink-faint)]">импульсивное раннее внедрение</p>
            <ul className="mt-6 flex flex-col gap-3">
              {impulsive.map((t) => (
                <li key={t} className="text-[15px] leading-snug text-[var(--ink-soft)] sm:text-[16px]">{t}</li>
              ))}
            </ul>
          </div>
        </Fade>

        <Fade delay={0.15} className="cell">
          <div className="h-full border-l-2 p-6 sm:p-8" style={{ borderColor: AZURE }}>
            <p className="label" style={{ color: AZURE }}>контролируемое накопление опыта</p>
            <ul className="mt-6 flex flex-col gap-3">
              {controlled.map((t) => (
                <li key={t} className="text-[15px] leading-snug font-medium text-[var(--ink)] sm:text-[16px]">{t}</li>
              ))}
            </ul>
          </div>
        </Fade>
      </div>
    </Breakout>
  );
}
