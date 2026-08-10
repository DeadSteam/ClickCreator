"use client";

import { Breakout, Fade } from "./prose";

/*
  Схемы гипотезы №5 «Статус».

  Источник метафор — ТЗстраницы/2_5_..._Статус.docx. Главное отличие от других
  гипотез: акцент здесь не оранжевый-как-обычно, а работает на доверие, а не на
  «зону сомнения» — ТЗ прямо разрешает один приглушённый золотой акцент только
  для ключевого сообщения. Токен --accent в этой палитре и есть тот приглушённый
  тёплый цвет, поэтому нового не заводим — используем его для сигналов доверия.

  Правило FadeItem только внутри <ul>/<ol> соблюдено — везде Fade.
*/

/**
 * Главный образ обложки: смартфон с сообщением-рекомендацией. Рядом —
 * закрытый ноутбук: ТЗ прямо требует НЕ показывать демонстрацию занятости.
 */
export function RecommendationPhone() {
  return (
    <figure className="border border-[var(--rule-soft)] bg-[var(--reading-bg)] p-6 sm:p-8">
      <p className="label text-[var(--ink-faint)]">статус проявляется в том, как приходят другие</p>

      <div className="mt-7 flex items-end gap-4">
        {/* Смартфон с коротким сообщением. */}
        <div className="w-[62%] rounded-[10px] border border-[var(--rule-soft)] bg-[var(--inset)] p-4 sm:p-5">
          <p className="label text-[var(--ink-faint)]">новое сообщение</p>
          <p className="mt-3 text-[15px] leading-snug font-medium text-[var(--ink)] sm:text-[16px]">
            «Мне вас порекомендовали. Когда сможете начать?»
          </p>
        </div>

        {/* Закрытый ноутбук — плоская фигура, никакой демонстрации занятости. */}
        <div className="flex-1" aria-hidden="true">
          <svg viewBox="0 0 100 60" className="h-auto w-full">
            <path d="M10 46 L90 46 L96 54 L4 54 Z" fill="var(--inset)" stroke="var(--rule)" strokeWidth="1" />
            <path d="M16 46 L84 46 L84 12 L16 12 Z" fill="none" stroke="var(--rule)" strokeWidth="1.4" />
          </svg>
        </div>
      </div>

      <figcaption className="mt-7 border-t border-[var(--rule-soft)] pt-6">
        <p className="max-w-[46ch] text-[14px] leading-relaxed text-[var(--ink-faint)] sm:text-[15px]">
          Статус проявляется не в том, что специалист говорит о себе. А в том,
          как к нему приходят другие.
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * «Из чего клиент собирает ощущение профессионализма» — первый экран после
 * скролла. Пять сигналов складываются в доверие, доверие раскрывается в три
 * практических исхода.
 */
export function TrustBuild() {
  const signals = ["Результат", "Скорость обратной связи", "Ясность объяснений", "Ощущение контроля", "Предсказуемость"];
  const outcomes = ["Продление", "Рекомендация", "Отказ от сравнения по цене"];

  return (
    <figure className="mt-12">
      <Fade>
        <p className="label text-[var(--ink-faint)]">из чего клиент собирает ощущение профессионализма</p>
      </Fade>

      <div className="mt-6 flex flex-col gap-px bg-[var(--rule-soft)]">
        {signals.map((s, i) => (
          <Fade key={s} delay={i * 0.07} className="bg-[var(--inset)]">
            <div
              className="flex items-center py-3 pl-4 text-[14px] leading-snug text-[var(--ink-soft)] sm:text-[15px]"
              style={{ width: `${45 + i * 11}%` }}
            >
              {s}
            </div>
          </Fade>
        ))}
      </div>

      <Fade delay={0.45}>
        <div className="mt-3 border-l-2 border-[var(--accent)] bg-[var(--inset)] p-5 sm:p-6">
          <p className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[17px]">
            = профессиональное доверие
          </p>
        </div>
      </Fade>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
        {outcomes.map((o, i) => (
          <Fade key={o} delay={0.5 + i * 0.08} className="inline-flex">
            <span className="border border-[var(--rule-soft)] bg-[var(--inset)] px-3 py-1.5 text-[13px] text-[var(--ink-soft)]">
              {o}
            </span>
          </Fade>
        ))}
      </div>
    </figure>
  );
}

/** Одна карточка рабочего сигнала доверия. */
function SignalCard({ index, title, description }: { index: number; title: string; description: string }) {
  return (
    <Fade delay={index * 0.06} className="cell">
      <div className="h-full p-6 sm:p-7">
        <p className="label text-[var(--ink-faint)]">сигнал {index + 1}</p>
        <p className="mt-4 text-[18px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[19px]">
          {title}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-soft)] sm:text-[15px]">{description}</p>
      </div>
    </Fade>
  );
}

/** Пять рабочих сигналов доверия — плоская сетка, все видны сразу. */
export function TrustSignals() {
  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
        <SignalCard
          index={0}
          title="Своевременность"
          description="Клиент получает информацию до того, как неопределённость превращается в тревогу."
        />
        <SignalCard
          index={1}
          title="Ясность"
          description="Сложная ситуация объясняется простыми словами, без перегрузки терминами."
        />
        <SignalCard
          index={2}
          title="Управляемость"
          description="У проекта понятная логика: следующий шаг, критерий оценки, точка контроля."
        />
        <SignalCard
          index={3}
          title="Подтверждённость"
          description="Решения опираются не только на опыт специалиста, но и на фактические данные проекта."
        />
        <SignalCard
          index={4}
          title="Предсказуемость"
          description="Клиент понимает, что происходит сейчас, когда появятся новые данные и какие сценарии возможны."
        />
      </div>
    </Breakout>
  );
}

/**
 * «Специалист в центре системы»: технологический слой снизу (данные,
 * автоматизация, контроль, измерение), результат сверху (ясное решение,
 * понятная коммуникация, спокойствие клиента). Сервис не в центре — ТЗ прямо
 * запрещает изображать его как главный объект.
 */
export function SpecialistCenter() {
  return (
    <figure className="mt-12">
      <div
        role="img"
        aria-label="В центре — SEO-специалист. Сверху виден результат его работы: ясное решение, понятная коммуникация, спокойствие клиента. Снизу — незаметный технологический слой: данные, автоматизация, контроль, измерение."
      >
        <Fade delay={0.1}>
          <div className="border-l-2 border-[var(--rule)] bg-[var(--inset)] p-5 text-center sm:p-6">
            <p className="label text-[var(--ink-faint)]">видимый результат</p>
            <p className="mt-2 text-[14px] leading-snug text-[var(--ink-soft)] sm:text-[15px]">
              Ясное решение · понятная коммуникация · спокойствие клиента
            </p>
          </div>
        </Fade>

        <div className="flex justify-center py-2">
          <span aria-hidden="true" className="block h-5 w-px bg-[var(--rule)]" />
        </div>

        <Fade>
          <div className="border-l-2 border-[var(--accent)] bg-[var(--inset)] p-6 text-center sm:p-8">
            <p className="text-[19px] font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[21px]">
              SEO-специалист
            </p>
          </div>
        </Fade>

        <div className="flex justify-center py-2">
          <span aria-hidden="true" className="block h-5 w-px bg-[var(--rule)]" />
        </div>

        <Fade delay={0.2}>
          <div className="border border-[var(--rule-soft)] bg-[var(--inset)] p-5 text-center opacity-70 sm:p-6">
            <p className="label text-[var(--ink-faint)]">незаметный технологический слой</p>
            <p className="mt-2 text-[14px] leading-snug text-[var(--ink-faint)] sm:text-[15px]">
              Данные · автоматизация · контроль · измерение
            </p>
          </div>
        </Fade>
      </div>
    </figure>
  );
}
