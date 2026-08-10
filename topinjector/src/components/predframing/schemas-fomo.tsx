"use client";

import { Breakout, Fade } from "./prose";

/*
  Схемы гипотезы №7 «FOMO профессионала».

  Источник метафор — ТЗстраницы/2_7_..._FOMO.docx. Красный запрещён нигде на
  этой странице (ТЗ прямо текстом), окно максимального потенциала — холодный
  синий, а не золотой и не красный. Ни один путь/исход не подписан победителем:
  «проверить» и «оставить в наблюдении» — равнозначные исходы, не выбор
  правильного и неправильного. Везде Fade, не FadeItem вне списков.
*/

/**
 * Главный образ обложки: несколько параллельных маршрутов движутся в одном
 * направлении, один уже отклонился через контрольную точку. Без финиша,
 * победы или явного преимущества — только признак ранней проверки.
 */
export function EarlyDeviation() {
  const total = 6;
  const deviatedIndex = 3;

  return (
    <figure className="border border-[var(--rule-soft)] bg-[var(--reading-bg)] p-6 sm:p-8">
      <p className="label text-[var(--ink-faint)]">один маршрут уже проходит первую проверку</p>

      <div
        role="img"
        aria-label="Шесть параллельных маршрутов движутся в одном направлении. Один уже отклонился в сторону и проходит через контрольную точку «первая проверка» — без финиша или явной победы."
        className="mt-7 flex flex-col gap-2.5"
      >
        {Array.from({ length: total }).map((_, i) => {
          const deviated = i === deviatedIndex;
          return (
            <Fade key={i} delay={Math.min(i, 5) * 0.05}>
              <svg viewBox="0 0 200 16" className="h-auto w-full">
                {deviated ? (
                  <>
                    <path d="M2 8 L120 8 L150 3" fill="none" stroke="var(--accent)" strokeWidth="2" />
                    <circle cx="150" cy="3" r="3" fill="var(--accent)" />
                  </>
                ) : (
                  <path d="M2 8 L198 8" fill="none" stroke="var(--rule)" strokeWidth="1.4" />
                )}
              </svg>
            </Fade>
          );
        })}
      </div>

      <figcaption className="mt-7 border-t border-[var(--rule-soft)] pt-6">
        <p className="max-w-[46ch] text-[14px] leading-relaxed text-[var(--ink-faint)] sm:text-[15px]">
          Преимущество появляется не в момент, когда все поняли ценность
          новой технологии. Оно появляется в момент, когда небольшая группа
          специалистов решила проверить её раньше.
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * «Жизненный цикл профессионального преимущества» — первый экран после
 * скролла. Семь этапов, зона максимального потенциала выделена холодным
 * синим (не золотым и не красным) между «Первыми проверками» и «Рабочими
 * сценариями» — именно так требует ТЗ.
 */
export function AdvantageLifecycle() {
  const steps = ["Слабый сигнал", "Первые проверки", "Собственные данные", "Рабочие сценарии", "Профессиональное обсуждение", "Массовое внедрение", "Новый стандарт"];
  const windowStart = 1;
  const windowEnd = 3;

  return (
    <figure className="mt-12">
      <Fade>
        <p className="label text-[var(--ink-faint)]">жизненный цикл профессионального преимущества</p>
      </Fade>

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
                    backgroundColor: i > windowStart && i <= windowEnd ? "var(--accent)" : "var(--rule)",
                  }}
                />
              )}
              <span
                className={`inline-flex items-center gap-4 text-[17px] sm:text-[18px] ${
                  inWindow ? "font-semibold text-[var(--accent)]" : "text-[var(--ink-soft)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="ml-[5px] block h-[7px] w-[7px] shrink-0 rounded-full"
                  style={{ backgroundColor: inWindow ? "var(--accent)" : "var(--ink-faint)" }}
                />
                {s}
              </span>
            </li>
          );
        })}
      </ol>

      <Fade delay={0.5}>
        <div className="mt-9 border-l-2 border-[var(--accent)] bg-[var(--inset)] p-6 sm:p-7">
          <p className="label text-[var(--accent)]">зона максимального потенциального преимущества</p>
          <p className="mt-4 text-[19px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[22px]">
            Между первыми проверками и рабочими сценариями
          </p>
        </div>
      </Fade>
    </figure>
  );
}

/**
 * Поток сигналов проходит через профессиональный фильтр — на выходе
 * остаются только три карточки, а не всё, что вошло.
 */
export function SignalFilter() {
  const input = ["Статьи", "Кейсы", "Сервисы", "Мнения", "Обновления"];
  const output = ["Измеримый эффект", "Ограниченный риск", "Быстрый собственный вывод"];

  return (
    <Breakout>
      <figure>
        <Fade>
          <p className="label text-[var(--ink-faint)]">поток сигналов проходит через профессиональный фильтр</p>
        </Fade>

        <div className="mt-5 flex flex-wrap gap-2">
          {input.map((t, i) => (
            <Fade key={t} delay={i * 0.05} className="inline-flex">
              <span className="border border-[var(--rule-soft)] bg-[var(--inset)] px-3 py-1.5 text-[13px] text-[var(--ink-faint)] opacity-70">
                {t}
              </span>
            </Fade>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <span aria-hidden="true" className="num text-[var(--ink-faint)]">↓ фильтр ↓</span>
        </div>

        <div className="mt-4 grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
          {output.map((t, i) => (
            <Fade key={t} delay={0.3 + i * 0.1} className="cell border-l-2 border-[var(--accent)] p-5 text-center sm:p-6">
              <p className="text-[15px] leading-snug font-medium text-[var(--ink)] sm:text-[16px]">{t}</p>
            </Fade>
          ))}
        </div>

        <Fade delay={0.6}>
          <p className="mt-5 max-w-[52ch] text-[14px] leading-relaxed text-[var(--ink-faint)] sm:text-[15px]">
            Проверки заслуживает не всё новое. Только то, что проходит
            профессиональный фильтр.
          </p>
        </Fade>
      </figure>
    </Breakout>
  );
}

/** Одна карточка признака сильной гипотезы. */
function SignCard({ index, title, description }: { index: number; title: string; description: string }) {
  return (
    <Fade delay={index * 0.06} className="cell">
      <div className="h-full p-6 sm:p-7">
        <p className="label text-[var(--ink-faint)]">признак {index + 1}</p>
        <p className="mt-4 text-[18px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[19px]">
          {title}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-soft)] sm:text-[15px]">{description}</p>
      </div>
    </Fade>
  );
}

/** Пять признаков гипотезы, которую стоит проверить сейчас. */
export function FomoSigns() {
  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
        <SignCard index={0} title="Понятная рабочая ценность" description="Ясно, какую конкретную часть процесса гипотеза способна усилить." />
        <SignCard index={1} title="Измеримый результат" description="До запуска определены стартовая точка, показатель, срок, критерий продолжения и отказа." />
        <SignCard index={2} title="Ограниченный риск" description="Без переноса всего портфеля, без отказа от текущего инструмента, без критичного проекта." />
        <SignCard index={3} title="Достаточно короткий цикл" description="Первые полезные данные появляются быстро — чем короче путь, тем ниже цена ошибки." />
        <SignCard index={4} title="Применимость к реальным задачам" description="Гипотеза проверяется в условиях, похожих на ежедневную работу, а не в идеальном сценарии." />
      </div>
    </Breakout>
  );
}

/**
 * Хаотичный поток информации слева, спокойная контролируемая проверка в
 * центре, спокойный собственный вывод справа с четырьмя возможными
 * состояниями — ни одно из них не окрашено как проигрыш.
 */
export function TurmoilToClarity() {
  return (
    <figure className="mt-12">
      <div
        role="img"
        aria-label="Слева — хаотичный поток статей, отзывов, обсуждений и уведомлений. В центре — контролируемая проверка. Справа — спокойный собственный вывод: работает, не работает, работает при условиях, нужны дополнительные данные."
        className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5"
      >
        <div className="flex flex-wrap gap-1.5 opacity-60">
          {["статьи", "отзывы", "обсуждения", "уведомления"].map((t, i) => (
            <Fade key={t} delay={i * 0.04} className="inline-flex">
              <span className="border border-[var(--rule-soft)] bg-[var(--inset)] px-2 py-1 text-[11px] text-[var(--ink-faint)]">
                {t}
              </span>
            </Fade>
          ))}
        </div>

        <span aria-hidden="true" className="num text-[var(--ink-faint)]">→</span>

        <Fade delay={0.15} className="border-l-2 border-[var(--accent)] bg-[var(--inset)] p-4 text-center sm:p-5">
          <p className="text-[13px] leading-snug text-[var(--ink)] sm:text-[14px]">Собственный вывод</p>
        </Fade>
      </div>

      <div className="mt-4 flex justify-center">
        <span aria-hidden="true" className="block h-5 w-px bg-[var(--rule)]" />
      </div>

      <Fade delay={0.1}>
        <div className="border border-[var(--rule-soft)] bg-[var(--inset)] p-5 text-center sm:p-6">
          <p className="label text-[var(--ink-faint)]">контролируемая проверка</p>
        </div>
      </Fade>

      <div className="mt-5 grid grid-cols-2 gap-px bg-[var(--rule-soft)] sm:grid-cols-4">
        {["Работает", "Не работает", "Работает при условиях", "Нужны данные"].map((t, i) => (
          <Fade key={t} delay={0.2 + i * 0.06} className="cell p-3 text-center sm:p-4">
            <p className="text-[12px] leading-snug text-[var(--ink-soft)] sm:text-[13px]">{t}</p>
          </Fade>
        ))}
      </div>
    </figure>
  );
}
