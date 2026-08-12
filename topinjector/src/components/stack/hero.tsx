import { Appear } from "@/motion/appear";
import { StackCta } from "./cta";
import {
  HERO_MICRO,
  HERO_OFFER,
  HERO_OFFER_NOTE,
  HERO_SECONDARY_LABEL,
  type HeroVariant,
} from "@/stack/hero-variants";

/*
  Динамический Hero /stack — разд. «Блок 1. Hero» + разд. 9/19 ТЗ.

  Серверный компонент: `angle` уже разрешён в конкретный `HeroVariant` на
  сервере (`resolveHeroVariant` в page.tsx, по `searchParams`), поэтому здесь
  нет ни client-мерцания между fallback и настоящим вариантом, ни хука на
  чтение URL — та же причина, по которой /loss не читает свой Hero из query.

  Задача блока по ТЗ: за первые секунды дать три ответа — «это про мой
  SEO-стек», «меня не просят признать текущий сервис плохим», «мне предлагают
  больше контроля». Поэтому оффер и микротекст остаются общими для всех
  angle (разд. 18 ТЗ: «Message match после Hero» — меняется только Hero, не
  вся страница), а H1/eyebrow/CTA/визуальный мотив приходят из `variant`.
*/

/**
 * Базовая метафора Hero (разд. «HERO VISUAL» ТЗ): SEO-специалист → несколько
 * инструментов → одна измеримая задача → данные. Не «сломанный сервис → наш
 * сервис → магический рост» — поэтому здесь нет ни одного «против», только
 * последовательность.
 */
function StackHeroVisual({ accent }: { accent?: string[] }) {
  return (
    <figure className="w-full">
      <div className="panel p-6 sm:p-7">
        <p className="label text-[var(--ink-faint)]">SEO-специалист</p>

        <div className="mt-5 grid grid-cols-2 gap-px bg-[var(--rule-soft)]">
          <div className="cell p-4 text-center sm:p-5">
            <p className="text-[13px] leading-snug text-[var(--ink-soft)] sm:text-[14px]">
              ПФ-инструмент №1
            </p>
          </div>
          <div className="cell border-l-2 border-[var(--accent)] p-4 text-center sm:p-5">
            <p className="text-[13px] leading-snug font-medium text-[var(--ink)] sm:text-[14px]">
              ПФ-инструмент №2
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <span aria-hidden="true" className="block h-6 w-px bg-[var(--rule)]" />
        </div>

        <div className="flex items-center justify-center gap-3 text-center text-[12px] text-[var(--ink-faint)] sm:text-[13px]">
          <span>Измеримая задача</span>
          <span aria-hidden="true" className="num">
            →
          </span>
          <span>Данные</span>
          <span aria-hidden="true" className="num">
            →
          </span>
          <span className="font-medium text-[var(--ink)]">Решение</span>
        </div>

        {accent && accent.length > 0 && (
          <div className="mt-6 border-t border-[var(--rule-soft)] pt-5">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
              {accent.map((line) => (
                <span
                  key={line}
                  className="num text-[13px] leading-snug text-[var(--accent)] sm:text-[14px]"
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}

export function StackHero({ variant }: { variant: HeroVariant }) {
  return (
    <>
      <section
        id="hero"
        data-pf-block="hero"
        className="border-b border-[var(--rule)] bg-[var(--inset)]"
      >
        <div className="mx-auto max-w-[88rem] px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
            <div className="flex flex-col">
              <Appear speed="calm">
                <p className="label text-[var(--ink-faint)]">{variant.eyebrow}</p>
              </Appear>

              <Appear speed="calm" delay={0.06}>
                <h1 className="mt-6 text-[32px] leading-[1.06] font-extrabold tracking-[-0.035em] sm:text-[42px] lg:text-[48px] 2xl:text-[54px]">
                  {variant.h1}
                </h1>
              </Appear>

              <Appear speed="calm" delay={0.14}>
                <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.6] text-[var(--ink-soft)] sm:text-[18px]">
                  {variant.subtitle}
                </p>
              </Appear>

              <Appear speed="calm" delay={0.2}>
                <div className="mt-8 border-l-2 border-[var(--accent)] py-1 pl-5">
                  <p className="text-[17px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[19px]">
                    {HERO_OFFER}
                  </p>
                  <p className="mt-2 max-w-[46ch] text-[14px] leading-relaxed text-[var(--ink-faint)]">
                    {HERO_OFFER_NOTE}
                  </p>
                </div>
              </Appear>

              <Appear speed="calm" delay={0.28}>
                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <StackCta ctaId="hero" event="hero_cta_click">
                    {variant.cta}
                  </StackCta>
                  <a
                    href="#controlled-test"
                    className="text-[15px] text-[var(--ink-soft)] underline decoration-[var(--rule)] underline-offset-4
                      [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
                  >
                    {HERO_SECONDARY_LABEL}
                  </a>
                </div>
              </Appear>

              <Appear speed="calm" delay={0.36}>
                <p className="mt-8 max-w-[54ch] border-t border-[var(--rule-soft)] pt-5 text-[13px] leading-relaxed text-[var(--ink-faint)]">
                  {HERO_MICRO}
                </p>
              </Appear>
            </div>

            <Appear speed="calm" delay={0.18}>
              <StackHeroVisual accent={variant.accent} />
            </Appear>
          </div>
        </div>
      </section>

      {variant.highlight && (
        <div className="mx-auto max-w-[88rem] px-5 pt-10 sm:px-8">
          <Appear speed="reading">
            <p className="max-w-[46ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[18px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[21px]">
              {variant.highlight}
            </p>
          </Appear>
        </div>
      )}
    </>
  );
}
