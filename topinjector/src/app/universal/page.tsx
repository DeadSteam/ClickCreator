import type { Metadata } from "next";

import { UniversalNav } from "@/components/landing/universal-nav";
import { UniversalHeroCtas } from "@/components/landing/universal-hero-cta";
import { UniversalAnalytics } from "@/components/landing/universal-analytics";
import { LandingFooter } from "@/components/landing/footer";
import { SIGNUP_URL } from "@/components/landing/chrome";
import { Appear, Cards, Section, Head, Steps } from "@/components/landing/sections";
import { Faq } from "@/components/landing/faq";
import { Pricing } from "@/components/landing/pricing";
import { CompareTable, ProductScreens, SuitabilityGrid } from "@/components/landing/universal-blocks";
import { CaseGrid, FeaturedCase } from "@/components/landing/universal-cases";
import { RegistrationForm } from "@/components/landing/registration-form";
import { DISCLAIMER, PENDING } from "@/landing/config";
import {
  CASE_GRID,
  COMPARE_ROWS,
  FEATURED_CASE,
  GETS,
  GUARANTEES,
  MECHANICS_DISCLOSED,
  MECHANICS_FLOW,
  PRODUCT_SCREENS,
  RISK_ITEMS,
  SCENARIOS,
  SUITABILITY,
  TEST_STEPS,
  UNIVERSAL_FAQ,
  UNIVERSAL_PLANS,
} from "@/landing/universal";
import { ordinal } from "@/format";

/*
  Основной лендинг /universal — общая часть предфрейминговой системы.

  Источник — ТЗстраницы/3. ТЗ основной лендинг.docx (30 разделов). Приходят
  сюда после любой из десяти гипотез с параметром `?hyp=<slug>` (см.
  `universalRoute` в `@/predframing/hypotheses») — маршрут один на все
  гипотезы, поэтому позиционирование продолжает предфрейминг («проверьте
  гипотезу на своих данных, не отказываясь от текущего стека»), а не переходит
  на другой оффер /service («ТОП-3 за 3 дня»).

  Кейсы и тарифы — демо-данные с пометкой `DISCLAIMER` (тот же паттерн, что и
  на /service): п.13 ТЗ запрещает вымышленные результаты, а тариф — оферта,
  поэтому оба блока ждут фактических данных перед публикацией.
*/

export const metadata: Metadata = {
  title: "Проверьте новый сценарий SEO на своём проекте",
  description:
    "Запустите контролируемую проверку на одном проекте или группе запросов — без отказа от текущего SaaS и без переноса всего рабочего стека.",
  alternates: { canonical: "/universal" },
};

export default async function UniversalPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const hyp = params.hyp;
  const hypothesis = Array.isArray(hyp) ? hyp[0] : hyp;

  return (
    <div className="brand-flat">
      <UniversalAnalytics hypothesis={hypothesis} />

      <div className="zone-doubt">
        <UniversalNav hypothesis={hypothesis} />
      </div>

      <main id="main" tabIndex={-1}>
        {/* Блок 1. Hero. */}
        <section className="zone-doubt px-5 pt-12 pb-8 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-[54rem]">
            <Appear>
              <p className="label text-[var(--ink-faint)]">SaaS для контролируемой проверки SEO-гипотез</p>
            </Appear>

            <Appear delay={0.08}>
              <h1 className="mt-7 max-w-[20ch] text-[34px] leading-[1.06] font-extrabold tracking-[-0.035em] sm:text-[52px] lg:text-[58px]">
                Проверьте новый сценарий SEO-продвижения на своём проекте
              </h1>
            </Appear>

            <Appear delay={0.14}>
              <p className="mt-7 max-w-[54ch] text-[17px] leading-relaxed text-[var(--ink-soft)] sm:text-[19px]">
                Выберите сайт и ограниченную группу запросов. Зафиксируйте
                исходные позиции. Запустите проверку. Оцените динамику,
                скорость получения данных и объём ручной работы. Решение о
                дальнейшем использовании принимаете вы.
              </p>
            </Appear>

            <Appear delay={0.2}>
              <UniversalHeroCtas hypothesis={hypothesis} />
            </Appear>

            <Appear delay={0.26}>
              <ul className="mt-8 flex flex-col gap-2.5 border-t border-[var(--rule-soft)] pt-6 sm:flex-row sm:gap-8">
                {["Без переноса всех проектов", "Без отказа от текущего сервиса", "С заранее заданными критериями результата"].map((t) => (
                  <li key={t} className="flex items-baseline gap-2 text-[14px] leading-snug text-[var(--ink-soft)]">
                    <span aria-hidden="true" className="num shrink-0" style={{ color: "var(--positive)" }}>✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Appear>
          </div>
        </section>

        {/* Блок 2. Что это за сервис. */}
        <Section id="product" zone="zone-signal">
          <Head
            kicker="что это за сервис"
            title="Инструмент для контролируемой проверки SEO-гипотез"
            lead="Сервис помогает SEO-специалисту запускать продвижение выбранных запросов, отслеживать изменения и получать данные, необходимые для следующего профессионального решения."
          />

          <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-2">
            <Appear className="cell p-7 sm:p-8">
              <p className="label text-[var(--ink-faint)]">не заменяет</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {["SEO-стратегию", "анализ проекта", "выбор запросов", "техническую оптимизацию", "профессиональную интерпретацию"].map((t) => (
                  <li key={t} className="text-[15px] text-[var(--ink-soft)]">{t}</li>
                ))}
              </ul>
            </Appear>
            <Appear delay={0.1} className="cell p-7 sm:p-8">
              <p className="label text-[var(--accent)]">помогает усилить</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {["скорость запуска", "контроль", "измеримость", "повторяемость", "работу с выбранными запросами", "сравнение разных сценариев"].map((t) => (
                  <li key={t} className="text-[15px] font-medium text-[var(--ink)]">{t}</li>
                ))}
              </ul>
            </Appear>
          </div>

          <Appear delay={0.16}>
            <p className="mt-10 max-w-[58ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              Сервис не принимает решение за SEO-специалиста. Он помогает
              быстрее получить данные, на основании которых решение можно
              принять.
            </p>
          </Appear>
        </Section>

        {/* Блок 3. Сценарии применения. */}
        <Section id="scenarios" zone="zone-signal">
          <Head kicker="сценарии применения" title="В каких задачах использовать сервис" />
          <Cards items={SCENARIOS.map((s) => ({ t: s.t, d: s.d }))} cols={3} />
        </Section>

        {/* Блок 4. Как проходит проверка. */}
        <Section id="how" zone="zone-signal">
          <Head kicker="как проходит проверка" title="От проекта до профессионального вывода — по понятному сценарию" />
          <Steps items={TEST_STEPS.map((s) => ({ t: s.t, d: s.d }))} />
        </Section>

        {/* Блок 5. Что получает специалист. */}
        <Section zone="zone-signal">
          <Head kicker="что вы получаете" title="Не ещё один кабинет. Новый набор данных для решения" />
          <Cards items={GETS.map((g) => ({ t: g.t, d: g.d }))} cols={3} />
        </Section>

        {/* Блок 6. Механика работы. */}
        <Section zone="zone-signal">
          <Head kicker="механика работы" title="Что происходит после запуска" lead="Не раскрываем чувствительные технические детали, которые составляют ноу-хау — но показываем весь путь данных." />

          <Appear delay={0.08}>
            <ol className="mt-12 flex flex-col">
              {MECHANICS_FLOW.map((step, i) => (
                <li key={step} className="flex gap-5 border-t border-[var(--rule-soft)] py-4 first:border-t-0 first:pt-0">
                  <span className="num shrink-0 text-[11px] text-[var(--ink-faint)]">{ordinal(i)}</span>
                  <span className="text-[16px] leading-snug text-[var(--ink-soft)]">{step}</span>
                </li>
              ))}
            </ol>
          </Appear>

          <Appear delay={0.16}>
            <div className="mt-12 border-t border-[var(--rule)] pt-8">
              <p className="label text-[var(--ink-faint)]">обязательно раскрываем</p>
              <ul className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                {MECHANICS_DISCLOSED.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-snug text-[var(--ink-soft)]">
                    <span aria-hidden="true" className="num shrink-0 text-[var(--ink-faint)]">—</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Appear>
        </Section>

        {/* Блок 7. Кейсы. */}
        <Section id="cases" zone="zone-proof">
          <Head kicker="доказательства" title="Как проходит проверка на реальных проектах" />
          <FeaturedCase data={FEATURED_CASE} />
          <Appear delay={0.1}>
            <h3 className="mt-20 text-[22px] font-extrabold tracking-[-0.03em] sm:text-[28px]">
              Результаты на разных проектах и запросах
            </h3>
          </Appear>
          <CaseGrid items={CASE_GRID} />
          {PENDING && (
            <Appear delay={0.16}>
              <p className="mt-6 max-w-[64ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">{DISCLAIMER}</p>
            </Appear>
          )}
        </Section>

        {/* Блок 8. Ограничения и условия. */}
        <Section zone="zone-settled" className="pb-24 sm:pb-32">
          <Head
            kicker="ограничения и условия"
            title="Где сервис может быть полезен — и где не стоит ждать одинакового результата"
            lead="Мы не предлагаем считать сервис универсальным решением. Этот блок должен повышать доверие, а не снижать его."
          />
          <SuitabilityGrid data={SUITABILITY} />
        </Section>

        {/* Блок 9. Сравнение с текущим процессом. */}
        <Section zone="zone-proof">
          <Head kicker="сравнение" title="Не «мы против вашего SaaS». Два рабочих сценария по одинаковым критериям" />
          <CompareTable rows={COMPARE_ROWS} />
        </Section>

        {/* Блок 10. Интерфейс продукта. */}
        <Section zone="zone-proof">
          <Head kicker="интерфейс продукта" title="Все данные проверки — в одном рабочем пространстве" />
          <ProductScreens items={PRODUCT_SCREENS} />
          {PENDING && (
            <Appear delay={0.2}>
              <p className="mt-6 max-w-[64ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">
                Схемы экранов иллюстративные. Интерфейс может обновляться по мере развития продукта.
              </p>
            </Appear>
          )}
        </Section>

        {/* Блок 11. Тарифы. */}
        <Section id="pricing" zone="zone-proof">
          <Head kicker="тарифы" title="Выберите объём под первый осмысленный тест" />
          <Pricing plans={UNIVERSAL_PLANS} ctaHref="#start" trackEvent="universal_plan_select" />
          {PENDING && (
            <Appear delay={0.2}>
              <p className="mt-6 max-w-[64ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">{DISCLAIMER}</p>
            </Appear>
          )}
        </Section>

        {/* Блок 12. Снижение риска. */}
        <Section zone="zone-proof">
          <Head kicker="снижение риска" title="Проверка должна быть контролируемой на каждом этапе" />
          <Cards items={RISK_ITEMS.map((r) => ({ t: r.t, d: r.d }))} cols={3} />

          <Appear delay={0.16}>
            <div className="mt-14 border-t border-[var(--rule)] pt-8">
              <p className="label text-[var(--ink-faint)]">гарантии</p>
              <ul className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                {GUARANTEES.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-snug text-[var(--ink-soft)]">
                    <span aria-hidden="true" className="num shrink-0 text-[var(--accent)]">—</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Appear>
        </Section>

        {/* Блок 13. FAQ. */}
        <Section id="faq" zone="zone-proof">
          <Head kicker="вопросы" title="Вопросы, которые задаёт профессиональный SEO" />
          <Faq items={UNIVERSAL_FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </Section>

        {/* Блок 14 + 21. Финальный CTA и форма заявки. */}
        <Section id="start" zone="zone-settled" className="pb-28 sm:pb-36">
          <Appear>
            <p className="label text-[var(--ink-faint)]">финальный шаг</p>
            <h2 className="mt-7 max-w-[20ch] text-[30px] leading-[1.08] font-extrabold tracking-[-0.035em] sm:text-[44px]">
              Не принимайте решение по лендингу. Проверьте сервис на своих данных
            </h2>
            <p className="mt-7 max-w-[56ch] text-[17px] leading-relaxed text-[var(--ink-soft)] sm:text-[19px]">
              Выберите один проект, зафиксируйте исходные показатели и
              получите фактический материал для сравнения с текущим рабочим
              процессом.
            </p>
          </Appear>

          <Appear delay={0.1}>
            <ul className="mt-8 flex flex-col gap-2.5 border-t border-[var(--rule-soft)] pt-6 sm:flex-row sm:gap-8">
              {["Один проект для старта", "Текущий SaaS можно сохранить", "Решение принимается после получения данных"].map((t) => (
                <li key={t} className="flex items-baseline gap-2 text-[14px] leading-snug text-[var(--ink-soft)]">
                  <span aria-hidden="true" className="num shrink-0" style={{ color: "var(--positive)" }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </Appear>

          <RegistrationForm hypothesis={hypothesis} />
        </Section>
      </main>

      <LandingFooter signupUrl={SIGNUP_URL} />
    </div>
  );
}
