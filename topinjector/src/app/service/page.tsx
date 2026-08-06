import type { Metadata } from "next";

import { Schema } from "@/components/schema";
import { LandingNav, LandingAnalytics, MobileCta, SIGNUP_URL } from "@/components/landing/chrome";
import { AppPreview } from "@/components/landing/app-preview";
import { DemoLink } from "@/components/landing/demo-link";
import { LossCalc } from "@/components/landing/loss-calc";
import { Faq } from "@/components/landing/faq";
import { Appear, Cards, Chain, Contrast, Head, Section } from "@/components/landing/sections";
import { LandingFooter } from "@/components/landing/footer";
import { TrialCta } from "@/components/landing/trial-cta";
import { CaseStudy, ProofGrid } from "@/components/landing/proof";
import { Pricing } from "@/components/landing/pricing";
import { DISCLAIMER, PENDING, TRIAL } from "@/landing/config";
import { orderOutcomes, personalParams, riskLine } from "@/landing/personal";
import { CLAIM, DRIVERS } from "@/brand/brand";

export const metadata: Metadata = {
  title: "Сервис раннего SEO-результата для частных специалистов",
  description:
    "Продвигайте подходящие целевые запросы в Яндексе и показывайте клиенту измеримый результат в первые дни проекта. Оценка применимости до запуска, контроль динамики, прозрачные ограничения.",
  alternates: { canonical: "/service" },
};

const FAQ_FOR_SCHEMA = [
  {
    q: "Это заменяет классическое SEO?",
    a: "Нет. Сервис используется как дополнительный инструмент раннего результата. Техническая оптимизация, структура, контент и аналитика остаются необходимыми.",
  },
  {
    q: "Любой ли запрос можно вывести в ТОП-3 за три дня?",
    a: "Нет. Возможность и срок зависят от проекта, запроса, региона, исходной позиции и других условий. Перед запуском необходимо оценить применимость.",
  },
];

const PRODUCT_CARDS = [
  {
    t: "Управление проектами",
    d: "Добавляйте клиентские сайты, группируйте запросы и отслеживайте результаты в одном кабинете.",
  },
  {
    t: "Продвижение запросов",
    d: "Запускайте подходящие целевые запросы и наблюдайте изменение позиций.",
  },
  {
    t: "Контроль динамики",
    d: "Сравнивайте исходные и текущие позиции, сроки и историю изменений.",
  },
  {
    t: "Результат для клиента",
    d: "Используйте понятные данные в отчётах, созвонах и обсуждении следующих этапов.",
  },
];

const STEPS = [
  {
    t: "Добавьте проект",
    d: "Укажите сайт, регион продвижения и основные параметры проекта.",
  },
  {
    t: "Загрузите запросы",
    d: "Добавьте ключевые фразы, по которым хотите получить раннюю измеримую динамику.",
  },
  {
    t: "Запустите продвижение",
    d: "Выберите подходящие запросы и начните контролируемый запуск.",
  },
  {
    t: "Покажите результат клиенту",
    d: "Отслеживайте позиции и используйте динамику как доказательство движения проекта.",
  },
];

const FITS = [
  {
    t: "Частным SEO-специалистам",
    d: "Которые самостоятельно ведут проекты, отчётность и коммуникацию с клиентами.",
  },
  {
    t: "Специалистам с несколькими проектами",
    d: "Которым важно быстро показывать ценность без роста количества ручной работы.",
  },
  {
    t: "SEO с долгим циклом результата",
    d: "Которые хотят добавить к системной стратегии раннее измеримое подтверждение.",
  },
  {
    t: "Специалистам, работающим на репутацию",
    d: "Которым важны удержание, рекомендации и профессиональное доверие.",
  },
  {
    t: "Тем, кто тестирует гипотезы",
    d: "Кто принимает решения на основе данных, а не громких обещаний.",
  },
];

const NOT_FOR = [
  "тем, кто ищет полную замену SEO одной кнопкой",
  "тем, кто ожидает одинаковый результат на любом сайте",
  "тем, кто не готов учитывать ограничения",
  "тем, кто хочет гарантии без анализа проекта",
  "тем, кто не работает с реальными сайтами и запросами",
];

const SAFETY = [
  {
    t: "Не каждый запрос одинаков",
    d: "Возможность и срок результата зависят от исходной позиции, региона, конкуренции и других параметров.",
  },
  {
    t: "Результат не равен гарантии навсегда",
    d: "Позиции в поисковой выдаче могут изменяться. В кейсах всегда указывается период наблюдения.",
  },
  {
    t: "Сервис не отменяет основное SEO",
    d: "Техническая оптимизация, структура, контент и другие элементы стратегии остаются необходимыми.",
  },
  {
    t: "Использование требует профессионального решения",
    d: "SEO-специалист самостоятельно определяет, где и как применять инструмент.",
  },
];

const DECISIONS = [
  "какой проект брать",
  "какие запросы выбирать",
  "как интерпретировать динамику",
  "как сочетать результат с основной стратегией",
  "что показывать клиенту",
  "когда масштабировать",
  "когда остановить запуск",
];

export default async function ServiceLanding({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const one = (k: string) => {
    const v = params[k];
    return Array.isArray(v) ? v[0] : v;
  };

  const personal = {
    score: one("score"),
    segment: one("segment"),
    risk: one("risk"),
    goal: one("goal"),
  };

  const line = riskLine(personal.risk);
  const outcomes = orderOutcomes(personal.goal);

  return (
    <div className="brand-flat">
      <Schema
        faq={FAQ_FOR_SCHEMA}
        service={{
          name: "Сервис раннего SEO-результата для частных специалистов",
          description:
            "Продвижение подходящих целевых запросов в Яндексе с оценкой применимости до запуска, контролем динамики и возможностью показать клиенту измеримый результат в первые дни проекта.",
          url: "https://topinjector.ru/service",
        }}
      />

      <LandingAnalytics personal={personalParams(personal)} />

      <div className="zone-doubt">
        <LandingNav />
      </div>

      <main id="main" tabIndex={-1}>
        {/* ЭКРАН 1. Результат, боль и следующий шаг сразу. */}
        <section className="zone-doubt px-5 pt-12 pb-8 sm:px-8 sm:pt-20">
          <div className="mx-auto grid max-w-[76rem] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Appear>
                <p className="label text-[var(--ink-faint)]">
                  SaaS-сервис для частных SEO-специалистов
                </p>
              </Appear>

              <Appear delay={0.08}>
                <h1 className="mt-7 max-w-[18ch] text-[34px] leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-[52px] lg:text-[60px]">
                  Покажите клиенту измеримый SEO-результат уже в первые дни
                  работы
                </h1>
              </Appear>

              <Appear delay={0.14}>
                <p className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-[var(--ink-soft)] sm:text-[19px]">
                  Продвигайте подходящие целевые запросы в ТОП-3 Яндекса и
                  делайте свою экспертность видимой раньше, чем ожидание
                  превратится в сомнение.
                </p>
              </Appear>

              {/*
                Уточнение стоит вплотную к обещанию, а не в сноске внизу
                страницы: п.24 мастер-документа разрешает эту формулировку
                только рядом с условиями применения.
              */}
              <Appear delay={0.18}>
                <p className="mt-4 max-w-[52ch] text-[14px] leading-relaxed text-[var(--ink-faint)]">
                  Для проектов и запросов, соответствующих условиям сервиса.
                  Срок и результат зависят от исходных данных.
                </p>
              </Appear>

              {line && (
                <Appear delay={0.22}>
                  <p className="mt-7 border-l-2 border-[var(--accent)] py-1 pl-5 text-[15px] leading-snug text-[var(--ink-soft)]">
                    {line}
                  </p>
                </Appear>
              )}

              <Appear delay={0.26}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <TrialCta event="hero_trial_click" place="hero">
                    Начать бесплатный тест
                  </TrialCta>
                  <DemoLink place="hero">Посмотреть, как это работает</DemoLink>
                </div>
              </Appear>

              <Appear delay={0.3}>
                <p className="mt-4 text-[13px] text-[var(--ink-faint)]">
                  Без оплаты на старте. Регистрация за 1 минуту. Помощь с первым
                  запуском.
                </p>
              </Appear>

              <Appear delay={0.34}>
                <ul className="mt-10 grid gap-x-8 gap-y-3 border-t border-[var(--rule)] pt-6 sm:grid-cols-3">
                  {[
                    "Ранний измеримый результат",
                    "Контроль динамики запросов",
                    "Не заменяет системное SEO",
                  ].map((t) => (
                    <li key={t} className="text-[14px] leading-snug text-[var(--ink-soft)]">
                      {t}
                    </li>
                  ))}
                </ul>
              </Appear>
            </div>

            <Appear delay={0.2}>
              <AppPreview />
            </Appear>
          </div>
        </section>

        {/* ЭКРАН 2. Продолжение «Эврики». */}
        <Section zone="zone-doubt">
          <Head
            title="Клиент не видит всей сложности вашей работы. Он видит момент, когда появился результат."
            lead="Вы можете провести аудит, собрать семантику, исправить технические ошибки и подготовить сильную стратегию. Но пока клиент не видит измеримого изменения, ваша ценность остаётся для него обещанием будущего."
          />

          <Contrast
            left={{
              title: "пока раннего результата нет",
              items: [
                "Клиент спрашивает о сроках",
                "Приходится объяснять процесс",
                "Отчёты не снимают сомнения",
                "Растёт количество созвонов",
                "Появляются дополнительные бесплатные задачи",
                "Специалист зависит от терпения клиента",
              ],
            }}
            right={{
              title: "когда результат появляется раньше",
              items: [
                "Разговор строится вокруг фактов",
                "Клиент видит движение",
                "Основная стратегия получает время",
                "Снижается количество тревожных вопросов",
                "Легче обсуждать продолжение работы",
                "Экспертность становится заметной",
              ],
            }}
            footer="Быстрый результат не заменяет системное SEO. Он даёт ему время сработать."
          />

          <Chain
            steps={[
              "Старт проекта",
              "Ранний результат",
              "Доверие",
              "Системная работа",
              "Устойчивый рост",
            ]}
            accentAt={1}
          />
        </Section>

        {/* ЭКРАН 3. Что это за продукт. */}
        <Section id="product" zone="zone-signal">
          <Head
            kicker="что это за продукт"
            title="Профессиональный инструмент раннего SEO-результата"
            lead="Сервис помогает частным SEO-специалистам продвигать подходящие ключевые запросы в Яндексе, отслеживать динамику и показывать клиенту измеримый результат уже в начале сотрудничества. Вы сохраняете контроль над стратегией, выбираете проекты и запросы и решаете, где масштабировать применение."
          />

          <Cards items={PRODUCT_CARDS} cols={2} />

          <Appear delay={0.16}>
            <p className="mt-10 max-w-[58ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              Сервис не принимает стратегические решения за вас. Он даёт вам
              дополнительный профессиональный рычаг.
            </p>
          </Appear>
        </Section>

        {/* ЭКРАН 4. Как это работает. */}
        <Section id="how" zone="zone-signal">
          <Head
            kicker="как это работает"
            title="От первого проекта до измеримого результата — четыре шага"
          />

          <div className="mt-14 grid border-t border-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Appear
                key={s.t}
                delay={i * 0.07}
                className="border-b border-[var(--rule-soft)] py-8 sm:border-l sm:px-6 sm:py-10
                  sm:odd:border-l-0 sm:odd:pl-0 lg:border-l lg:odd:border-l lg:odd:pl-6
                  lg:first:border-l-0 lg:first:pl-0"
              >
                <span className="num text-[11px] text-[var(--ink-faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[20px] leading-snug sm:text-[22px]">{s.t}</h3>
                <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                  {s.d}
                </p>
              </Appear>
            ))}
          </div>

          <Appear delay={0.2}>
            <div className="mt-12">
              <TrialCta event="hero_trial_click" place="how">
                Попробовать на своём проекте
              </TrialCta>
              <p className="mt-4 max-w-[52ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">
                Бесплатный тест позволяет изучить интерфейс и пройти первый
                сценарий использования.
              </p>
            </div>
          </Appear>
        </Section>

        {/* ЭКРАН 5. Основной результат. Порядок карточек зависит от диагностики. */}
        <Section zone="zone-signal">
          <Head
            kicker="что вы получаете"
            title="Вы получаете больше, чем изменение позиций"
          />
          <Cards items={outcomes} />
        </Section>

        {/* ЭКРАНЫ 6 и 7. Кейс и серия доказательств. */}
        <Section id="cases" zone="zone-proof">
          <Head
            kicker="доказательства"
            title="Как частный SEO показал клиенту первую измеримую динамику в начале проекта"
          />
          <CaseStudy />
          <ProofGrid />
        </Section>

        {/* ЭКРАН 8. Демонстрация интерфейса. */}
        <Section zone="zone-proof">
          <Head
            kicker="демонстрация"
            title="Вся динамика — в одном рабочем кабинете"
          />

          <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-[1fr_1fr]">
            <Appear className="bg-[var(--inset)] p-7 sm:p-8">
              <ul className="flex flex-col">
                {[
                  { t: "Проекты", d: "Список клиентских сайтов, статусы и количество активных запросов." },
                  { t: "Запросы", d: "Исходные позиции, текущие позиции, изменения и даты запуска." },
                  { t: "Динамика", d: "История движения каждого запроса." },
                  { t: "Отчёты", d: "Данные, которые можно использовать в работе с клиентом." },
                  { t: "Уведомления", d: "Сигналы об изменениях и завершении этапов." },
                ].map((b) => (
                  <li
                    key={b.t}
                    className="border-t border-[var(--rule-soft)] py-4 first:border-t-0 first:pt-0"
                  >
                    <h3 className="text-[16px] font-semibold tracking-[-0.02em]">{b.t}</h3>
                    <p className="mt-1.5 max-w-[44ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">
                      {b.d}
                    </p>
                  </li>
                ))}
              </ul>
            </Appear>

            <Appear delay={0.1} className="bg-[var(--inset)] p-7 sm:p-8">
              <AppPreview />
            </Appear>
          </div>

          <Appear delay={0.16}>
            <p className="mt-6 text-[13px] leading-relaxed text-[var(--ink-faint)]">
              Запись демонстрации интерфейса добавляется до публикации.
              Интерфейс может обновляться по мере развития продукта.
            </p>
          </Appear>
        </Section>

        {/* ЭКРАН 9. Для кого подходит. */}
        <Section zone="zone-proof">
          <Head
            kicker="для кого"
            title="Сервис создан для SEO-специалистов, которые отвечают перед клиентом лично"
          />

          <Cards items={FITS} />

          <Appear delay={0.16}>
            <div className="mt-14 border-t border-[var(--rule)] pt-8">
              <p className="label text-[var(--ink-faint)]">не подходит</p>
              <ul className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                {NOT_FOR.map((t) => (
                  <li
                    key={t}
                    className="flex gap-3 text-[15px] leading-snug text-[var(--ink-soft)]"
                  >
                    <span aria-hidden="true" className="num shrink-0 text-[var(--ink-faint)]">
                      —
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-[46ch] text-[19px] leading-snug font-extrabold tracking-[-0.03em] sm:text-[23px]">
                Это инструмент для специалиста, а не замена специалисту.
              </p>
            </div>
          </Appear>
        </Section>

        {/* ЭКРАН 10. Безопасность и ограничения. */}
        <Section id="safety" zone="zone-settled" className="pb-24 sm:pb-32">
          <Head
            kicker="условия и ограничения"
            title="Сильное обещание требует прозрачных условий"
            lead="Мы не предлагаем применять сервис вслепую. Перед запуском важно оценить проект, запросы и сценарий использования."
          />

          <Cards items={SAFETY} cols={2} />

          <Appear delay={0.16}>
            <div className="mt-14 border-t border-[var(--rule)] pt-8">
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] sm:text-[24px]">
                Где сервис может не подойти
              </h3>
              <ul className="mt-6 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                {[
                  "проект не соответствует техническим условиям",
                  "запросы не подходят для выбранного сценария",
                  "пользователь ожидает безусловный результат",
                  "отсутствует системная работа с сайтом",
                  "результат оценивается только по заявкам за несколько дней",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex gap-3 text-[15px] leading-snug text-[var(--ink-soft)]"
                  >
                    <span aria-hidden="true" className="num shrink-0 text-[var(--ink-faint)]">
                      —
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <ul className="mt-10 grid gap-x-10 gap-y-2.5 border-t border-[var(--rule-soft)] pt-8 sm:grid-cols-2">
                {CLAIM.limits.map((t) => (
                  <li
                    key={t}
                    className="flex gap-3 text-[15px] leading-snug text-[var(--ink-soft)]"
                  >
                    <span aria-hidden="true" className="num shrink-0 text-[var(--accent)]">
                      —
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <a
                href="/limits"
                className="mt-10 inline-flex min-h-[48px] items-center rounded-[var(--radius-pill)]
                  border border-[var(--rule)] px-6 text-[15px] font-semibold text-[var(--ink)]
                  [transition:border-color_var(--t-hover)_var(--ease-micro)] hover:border-[var(--ink)]"
              >
                Изучить полные условия применения
              </a>
            </div>
          </Appear>
        </Section>

        {/* ЭКРАН 11. Сохранение экспертности. */}
        <Section zone="zone-proof">
          <Head
            kicker="ваша роль"
            title="Сервис делает вашу экспертизу заметнее, а не заменяет её"
            lead="Клиент платит не за нажатие кнопки. Он платит за решения."
          />

          <Appear delay={0.1}>
            <ul className="mt-12 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {DECISIONS.map((d, i) => (
                <li key={d} className="flex gap-4 border-t border-[var(--rule-soft)] pt-3">
                  <span className="num shrink-0 text-[11px] text-[var(--ink-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-snug text-[var(--ink-soft)]">{d}</span>
                </li>
              ))}
            </ul>
          </Appear>

          <Appear delay={0.16}>
            <blockquote className="mt-14 max-w-[24ch] text-[26px] leading-[1.12] font-extrabold tracking-[-0.035em] sm:text-[40px]">
              Сильного SEO определяет не отсутствие инструментов, а качество
              решений.
            </blockquote>
          </Appear>
        </Section>

        {/* ЭКРАН 12. Бесплатный тестовый период. */}
        <Section zone="zone-proof">
          <Head
            kicker="бесплатный тест"
            title="Проверьте сервис на собственном проекте"
            lead="Создайте аккаунт, изучите интерфейс и пройдите первый сценарий использования без оплаты на старте."
          />

          <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-[1fr_1fr]">
            <Appear className="bg-[var(--inset)] p-7 sm:p-8">
              <p className="label text-[var(--ink-faint)]">что входит</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {TRIAL.includes.map((t) => (
                  <li
                    key={t}
                    className="flex gap-3 text-[15px] leading-snug text-[var(--ink-soft)]"
                  >
                    <span
                      aria-hidden="true"
                      className="num shrink-0"
                      style={{ color: "var(--color-risk-low)" }}
                    >
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Appear>

            <Appear delay={0.1} className="bg-[var(--inset)] p-7 sm:p-8">
              <dl className="flex flex-col">
                {[
                  ["Длительность", `${TRIAL.days} дней бесплатного доступа`],
                  ["Лимиты", `до ${TRIAL.projects} проекта и ${TRIAL.queries} запросов`],
                  [
                    "Банковская карта",
                    TRIAL.cardRequired ? "требуется" : "не требуется",
                  ],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-[var(--rule-soft)] py-3.5 first:border-t-0 first:pt-0"
                  >
                    <dt className="label text-[var(--ink-faint)]">{k}</dt>
                    <dd className="text-[15px] font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 text-[14px] leading-relaxed text-[var(--ink-soft)]">
                {TRIAL.afterTrial}
              </p>

              <div className="mt-8">
                <TrialCta event="final_trial_click" place="trial">
                  Начать бесплатный тест
                </TrialCta>
                <p className="mt-4 text-[13px] text-[var(--ink-faint)]">
                  Регистрация занимает около одной минуты.
                </p>
              </div>
            </Appear>
          </div>
        </Section>

        {/* ЭКРАН 13. Тарифы. */}
        <Section id="pricing" zone="zone-proof">
          <Head
            kicker="тарифы"
            title="Выберите объём под количество ваших проектов"
          />
          <Pricing />
        </Section>

        {/* ЭКРАН 14. Экономика продукта. */}
        <Section zone="zone-proof">
          <Head
            kicker="экономика"
            title="Сколько стоит ещё один непродлённый SEO-проект?"
            lead="Стоимость сервиса стоит сравнивать не только с другими инструментами, но и с последствиями периода, в котором клиент не видит результата: потерянный ежемесячный платёж, время на поиск нового заказчика, бесплатные дополнительные работы, снижение стоимости услуги и отсутствие рекомендаций."
          />

          <LossCalc />

          <Appear delay={0.16}>
            <p className="mt-10 max-w-[50ch] text-[19px] leading-snug font-extrabold tracking-[-0.03em] sm:text-[23px]">
              Даже один сохранённый проект может изменить экономику
              использования инструмента.
            </p>
          </Appear>
        </Section>

        {/* ЭКРАН 15. Отзывы. */}
        <Section zone="zone-proof">
          <Head
            kicker="отзывы"
            title="Что говорят частные SEO-специалисты"
          />

          <Appear delay={0.08}>
            <div className="mt-14 border border-[var(--rule-soft)] bg-[var(--inset)] p-7 sm:p-9">
              <blockquote className="max-w-[58ch] text-[19px] leading-snug tracking-[-0.02em] sm:text-[23px]">
                «Сначала я скептически отнёсся к обещанию быстрого результата.
                Протестировал сервис на одном проекте, увидел динамику по
                запросам и использовал её на созвоне с клиентом. Самое ценное —
                не только позиции, а то, что разговор перестал строиться вокруг
                ожидания».
              </blockquote>
              <p className="mt-7 text-[14px] text-[var(--ink-soft)]">
                Артём Гусельников, частный SEO, 7 лет опыта
              </p>
            </div>
          </Appear>

          <Appear delay={0.14}>
            <p className="mt-6 max-w-[64ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">
              До публикации раздел заполняется отзывами с именем, опытом,
              количеством проектов, исходным сомнением и ссылкой на кейс.
              Анонимные отзывы, стоковые фотографии и тексты без конкретики не
              используются.
            </p>
          </Appear>
        </Section>

        {/* ЭКРАН 16. FAQ. */}
        <Section id="faq" zone="zone-proof">
          <Head
            kicker="вопросы"
            title="Вопросы, которые задаёт профессиональный SEO"
          />
          <Faq />
        </Section>

        {/*
          Эмоциональные драйверы (п.17 мастер-документа). Стоят последними перед
          оффером: к этому месту рациональные возражения уже сняты механикой,
          кейсами и ограничениями, и остаётся назвать то, ради чего всё это
          нужно. Формулировки взяты из бренд-слоя дословно.
        */}
        <Section zone="zone-proof">
          <Head
            kicker="что меняется на самом деле"
            title="Не только позиции"
          />

          <div className="mt-14 grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2 lg:grid-cols-3">
            {DRIVERS.map((d, i) => (
              <Appear key={d.id} delay={Math.min(i, 5) * 0.06} className="bg-[var(--inset)]">
                <div className="h-full p-6 sm:p-7">
                  <p className="label text-[var(--accent)]">{d.t}</p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {d.lines.map((l) => (
                      <li
                        key={l}
                        className="text-[16px] leading-snug text-[var(--ink-soft)]"
                      >
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </Appear>
            ))}
          </div>
        </Section>

        {/* ЭКРАН 17. Финальный оффер. */}
        <Section zone="zone-settled settle-in" className="pb-28 sm:pb-36">
          <Appear>
            <p className="label text-[var(--ink-faint)]">ваша экспертность уже есть</p>
            <h2 className="mt-7 max-w-[20ch] text-[34px] leading-[1.06] font-extrabold tracking-[-0.035em] sm:text-[54px]">
              Сделайте её видимой раньше, чем клиент начнёт сомневаться
            </h2>
            <p className="mt-7 max-w-[56ch] text-[17px] leading-relaxed text-[var(--ink-soft)] sm:text-[19px]">
              Добавьте к системному SEO раннее измеримое доказательство, которое
              помогает укрепить доверие, сократить количество объяснений и дать
              основной стратегии время сработать.
            </p>
          </Appear>

          <Appear delay={0.1}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <TrialCta event="final_trial_click" place="final">
                Начать бесплатный тест
              </TrialCta>
              <DemoLink place="final">Посмотреть демонстрацию</DemoLink>
            </div>
          </Appear>

          <Appear delay={0.14}>
            <p className="mt-4 text-[13px] text-[var(--ink-faint)]">
              {TRIAL.days} дней бесплатно. Карта{" "}
              {TRIAL.cardRequired ? "требуется" : "не требуется"}. Первый проект
              можно добавить сразу после регистрации.
            </p>
          </Appear>

          <Appear delay={0.2}>
            <p className="mt-14 max-w-[24ch] text-[24px] leading-tight font-extrabold tracking-[-0.03em] text-[var(--accent)] sm:text-[34px]">
              Не продавайте ожидание, когда можете показывать движение.
            </p>
          </Appear>

          {PENDING && (
            <Appear delay={0.24}>
              <p className="mt-14 max-w-[70ch] border-t border-[var(--rule-soft)] pt-6 text-[12px] leading-relaxed text-[var(--ink-faint)]">
                {DISCLAIMER}{" "}
                {CLAIM.headline.toLowerCase()} — {CLAIM.conditions[0].toLowerCase()}.
              </p>
            </Appear>
          )}
        </Section>
      </main>

      <LandingFooter signupUrl={SIGNUP_URL} />
      <MobileCta />
    </div>
  );
}
