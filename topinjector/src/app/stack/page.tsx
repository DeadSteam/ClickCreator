import type { Metadata } from "next";

import { Schema } from "@/components/schema";
import { LandingNav, MobileCta, SIGNUP_URL } from "@/components/landing/chrome";
import { LandingFooter } from "@/components/landing/footer";
import { Appear, Cards, Chain, Head, Section, Steps } from "@/components/landing/sections";
import { Faq } from "@/components/landing/faq";
import { CompareTable } from "@/components/landing/universal-blocks";
import { AppPreview } from "@/components/landing/app-preview";
import { ReadingProgress } from "@/components/predframing/rail";
import { ManualInputInline, ManualInputPlaceholder } from "@/components/predframing/manual-input";
import {
  Aside,
  Breakout,
  Chapter,
  Heading,
  Ladder,
  Points,
  Statement,
  Text,
} from "@/components/predframing/prose";
import { StackHero } from "@/components/stack/hero";
import { StackCta } from "@/components/stack/cta";
import { StackCalculator } from "@/components/stack/calculator";
import { StackAnalytics } from "@/stack/analytics";
import { resolveHeroVariant } from "@/stack/hero-variants";
import {
  STACK_CASES,
  STACK_CASES_CONCLUSION,
  STACK_CASES_PENDING,
  STACK_COMPARE_ROWS,
  STACK_ECONOMICS_INTRO,
  STACK_FAQ,
  STACK_FINAL_HIGHLIGHT,
  STACK_FIT,
  STACK_MECHANIC,
  STACK_MECHANIC_HIGHLIGHT,
  STACK_MECHANIC_PENDING,
  STACK_PARALLEL_HIGHLIGHT,
  STACK_PARALLEL_INTRO,
  STACK_PRODUCT_INTRO,
  STACK_PRODUCT_POINTS,
  STACK_SAFETY_HIGHLIGHT,
  STACK_SAFETY_INTRO,
  STACK_SAFETY_QUESTIONS,
  STACK_TARIFF_COPY,
  STACK_TARIFF_PENDING_FIELDS,
  STACK_TARIFF_UNIT,
} from "@/stack/sale";
import { DISCLAIMER, PENDING, TELEGRAM } from "@/landing/config";

/*
  /stack — «Второй ПФ-инструмент» (ТЗ на лендинг ЦА ПФ-щики, Topinjector).

  Один маршрут, один продающий лендинг вместо системы из десяти отдельных
  страниц-гипотез (`predframing/*`, /loss, /ego, /fomo…): та архитектура здесь
  не используется и не трогается — разд. 6 этого ТЗ прямо требует «страница
  одна, меняется только входной Hero» через `?angle=`. Архитектура страницы
  всё равно повторяет уже проверенный паттерн /loss (Zone A — переменная часть
  до продукта, Zone B — универсальная продающая часть), потому что тот же
  паттерн буквально описан в разд. 20 «Общее ТЗ UX» этого документа.

  `searchParams` — Promise (Next 16, см. node_modules/next/dist/docs): угол
  рекламы читается на сервере, поэтому нет ни client-мерцания между fallback и
  настоящим Hero, ни риска рассинхронизации SSR/CSR.
*/

const DESCRIPTION =
  "Добавьте второй ПФ-инструмент к рабочему SEO-стеку и проверьте его на своих данных. 3000 тестовых кликов для controlled test — бесплатно, через Telegram.";

export const metadata: Metadata = {
  title: "Второй ПФ-инструмент для SEO — Topinjector",
  description: DESCRIPTION,
  alternates: { canonical: "/stack" },
  openGraph: {
    type: "website",
    title: "Второй ПФ-инструмент для SEO — Topinjector",
    description: DESCRIPTION,
    url: "/stack",
  },
};

const STACK_FAQ_FOR_SCHEMA = STACK_FAQ.slice(0, 6);

export default async function StackPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const rawAngle = typeof sp.angle === "string" ? sp.angle : undefined;
  const variant = resolveHeroVariant(rawAngle);

  return (
    <div className="brand-flat">
      <Schema
        faq={STACK_FAQ_FOR_SCHEMA}
        offers={null}
        service={{
          name: "Topinjector — второй ПФ-инструмент для controlled test",
          description: DESCRIPTION,
          url: "https://topinjector.ru/stack",
        }}
      />

      <StackAnalytics landingVariant={variant.angle} />
      <ReadingProgress />

      <div className="zone-doubt">
        <LandingNav />
      </div>

      <main id="main" tabIndex={-1}>
        {/* ══════════════════════════ ЗОНА A. ПЕРЕМЕННАЯ ЧАСТЬ ══════════════════════════ */}
        <div className="zone-doubt bg-[var(--reading-bg)]">
          <StackHero variant={variant} />

          <article className="mx-auto max-w-[46rem] px-5 pt-14 pb-4 2xl:max-w-[50rem]">
            {/* ── Блок 2. Новый критерий ─────────────────────────────────── */}
            <Chapter id="new-criterion" index={0} label="Новый критерий" peek>
              <Heading>
                Вопрос не в том, какой ПФ «лучший». Вопрос — какой инструмент полезен именно в
                вашем сценарии.
              </Heading>

              <Text lead>
                SEO-специалист редко строит весь рабочий процесс вокруг одного инструмента. Для
                аналитики могут использоваться несколько систем. Для ссылок — несколько
                источников. Для мониторинга — несколько решений.
              </Text>
              <Text>
                Но ПФ легко превращается в исключение: «Вот мой сервис. Я им пользуюсь». Пока
                всё работает, это не проблема. Проблема появляется, когда единственный рабочий
                сценарий перестаёт давать нужный результат — а другого проверенного варианта у
                вас просто нет.
              </Text>

              <Statement>
                Профессиональное преимущество — не в том, чтобы заранее найти один сервис
                «навсегда». А в том, чтобы понимать возможности нескольких инструментов и
                выбирать под задачу.
              </Statement>

              <Breakout>
                <p className="label mb-5 text-[var(--ink-faint)]">
                  один инструмент — и несколько проверенных
                </p>
                <div className="grid gap-10 sm:grid-cols-2">
                  <Ladder
                    steps={[
                      "Один инструмент",
                      "Один известный сценарий",
                      "Если подходит → используем",
                      "Если не подходит → ищем альтернативу",
                    ]}
                  />
                  <Ladder
                    markAt={5}
                    steps={[
                      "Несколько проверенных инструментов",
                      "Есть выбор",
                      "Проверяем ситуацию",
                      "Выбираем сценарий",
                      "Наблюдаем",
                      "Принимаем решение",
                    ]}
                  />
                </div>
              </Breakout>

              <Aside>
                Ваш текущий ПФ может быть хорошим инструментом. Второй инструмент нужен не
                потому, что первый плохой — а потому, что выбор сам по себе повышает
                управляемость.
              </Aside>

              <div className="mt-12 border border-[var(--rule-soft)] bg-[var(--inset)] p-6 sm:p-7">
                <p className="label text-[var(--ink-faint)]">как это подключается</p>
                <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                  Наш сервис можно добавить в стек именно так: не как миграцию, а как второй
                  инструмент, который сначала проходит ваш собственный тест.
                </p>
                <div className="mt-6">
                  <StackCta ctaId="new_criterion_teaser">Получить 3000 кликов</StackCta>
                </div>
              </div>
            </Chapter>

            {/* ── Блок 3. Практическое следствие ─────────────────────────── */}
            <Chapter id="practical-consequence" index={1} label="Что даёт второй сценарий" tight>
              <Heading>Вы получаете не ещё один кабинет. Вы получаете больше вариантов действия.</Heading>

              <Cards
                cols={2}
                items={[
                  {
                    t: "Не искать альтернативу в последний момент",
                    d: "Когда текущая схема перестаёт давать ожидаемую динамику, вы уже понимаете, как работает второй инструмент, какой у него интерфейс, как запускается проект и какие результаты вы видели на собственных данных.",
                  },
                  {
                    t: "Не привязывать результат к одному SaaS",
                    d: "Ваши возможности как SEO-специалиста не должны полностью совпадать с возможностями одного поставщика.",
                  },
                  {
                    t: "Сравнивать по собственному опыту",
                    d: "Не «коллега сказал, что сервис хороший». А «я проверял — вот где он дал мне полезный результат».",
                  },
                  {
                    t: "Использовать разные инструменты под разные ситуации",
                    d: "Новый сервис не обязан заменить текущий: он может быть полезен на части запросов, на отдельных проектах, как дополнительный слой процесса.",
                  },
                  {
                    t: "Повышать профессиональный контроль",
                    d: "Вместо «этот инструмент не дал нужной динамики, что теперь?» появляется «у меня есть следующий проверенный вариант».",
                  },
                ]}
              />

              <Statement>
                Хороший стек не обещает, что один инструмент решит всё. Он даёт специалисту
                больше решений.
              </Statement>
            </Chapter>

            {/* ── Блок 4. Product Bridge ──────────────────────────────────── */}
            <Chapter id="product-bridge" index={2} label="Проверить, а не переходить" tight>
              <Heading>Наш сервис сначала должен заслужить место в вашем SEO-стеке</Heading>

              <Text lead>
                Поэтому первый шаг — не миграция. И не попытка доказать что-то на максимально
                сложном запросе. Первый шаг: controlled test на задаче, где результат можно
                объективно измерить.
              </Text>

              <Ladder
                caption="как выглядит логика"
                markAt={5}
                steps={[
                  "Выберите измеримый запрос",
                  "Зафиксируйте baseline",
                  "Определите, что будете оценивать",
                  "Запустите тест",
                  "Наблюдайте динамику",
                  "Сделайте собственный вывод",
                ]}
              />

              <Statement>
                Новый инструмент не должен получать доверие авансом. Он должен его заработать на
                ваших данных.
              </Statement>

              <div className="mt-12">
                <StackCta ctaId="product_bridge">Получить 3000 кликов для теста</StackCta>
                <p className="mt-4 max-w-[52ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">
                  3000 тестовых кликов позволяют начать знакомство с продуктом без необходимости
                  сразу переводить на него рабочий объём.
                </p>
              </div>
            </Chapter>
          </article>
        </div>

        {/* ══════════════════════════ ЗОНА B. ПРОДУКТОВАЯ ЧАСТЬ ══════════════════════════ */}

        {/* Блок 5. Что даёт сервис. */}
        <Section id="product" zone="zone-signal" className="pb-16 sm:pb-20">
          <Head
            kicker="что именно даёт сервис"
            title="Второй ПФ-инструмент в вашем рабочем стеке"
            lead={STACK_PRODUCT_INTRO}
          />
          <Cards items={[...STACK_PRODUCT_POINTS]} cols={2} />
        </Section>

        {/* Блок 6. Как провести первый controlled test. */}
        <Section id="controlled-test" zone="zone-signal" className="pb-16 sm:pb-20">
          <Head
            kicker="controlled test"
            title="Сначала создайте условия, в которых вы действительно сможете оценить результат"
          />
          <Chain
            steps={["Задача", "Baseline", "Критерий", "Запуск", "Наблюдение", "Сравнение", "Решение"]}
            accentAt={6}
          />
          <Steps items={[...STACK_MECHANIC]} />

          <Appear delay={0.1}>
            <p className="mt-10 max-w-[58ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              {STACK_MECHANIC_HIGHLIGHT}
            </p>
          </Appear>

          <Appear delay={0.16}>
            <ManualInputInline>{STACK_MECHANIC_PENDING}</ManualInputInline>
          </Appear>
        </Section>

        {/* Блок 7. Реальный интерфейс. */}
        <Section id="interface" zone="zone-signal" className="pb-16 sm:pb-20">
          <Head
            kicker="рабочий инструмент"
            title="Посмотрите, как сервис выглядит до того, как запускать тест"
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
            <Appear className="flex flex-col gap-6">
              {[
                { t: "Специалист задаёт", d: "Проект, регион, группу запросов и объём теста." },
                { t: "Специалист контролирует", d: "Статус запуска и расходование тестовых кликов." },
                { t: "Специалист видит", d: "Позиции и динамику по дням." },
              ].map((a) => (
                <div key={a.t} className="border-t border-[var(--rule-soft)] pt-4">
                  <h3 className="text-[16px] font-semibold tracking-[-0.02em]">{a.t}</h3>
                  <p className="mt-1.5 max-w-[38ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">
                    {a.d}
                  </p>
                </div>
              ))}
            </Appear>

            <Appear delay={0.1}>
              <AppPreview />
            </Appear>
          </div>

          <Appear delay={0.16}>
            <ManualInputPlaceholder
              materialType="Скриншот"
              need="Четыре реальных экрана кабинета: создание проекта, работа с запросами, контроль расходования кликов / статусы, доступные данные / мониторинг. Показанный экран выше — иллюстративная схема, не скриншот."
              source="Продакшн-сборка Topinjector (личный кабинет)"
              mobile="Crop на ключевую часть экрана + tap → lightbox. Desktop-скриншот целиком до ширины телефона не сжимать."
              readyWhen="Все четыре экрана реальные, с рабочими данными, читаемость проверена на 390px"
              minHeight="8rem"
              className="mt-8"
            />
          </Appear>
        </Section>

        {/* Блок 8. 3000 тестовых кликов. */}
        <Section id="free-clicks" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            kicker="первый запуск без оплаты"
            title="Получите собственные данные до решения о покупке"
            lead="Бесплатный объём нужен не для того, чтобы собрать больше регистраций. Его функция — дать SEO-специалисту возможность познакомиться с рабочим циклом и провести первый измеримый тест."
          />

          <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-3">
            {[
              {
                t: "Запустите Telegram-бота",
                d: "Бот свяжет Telegram с вашим аккаунтом Topinjector.",
              },
              {
                t: "Подпишитесь на канал для SEO-специалистов",
                d: "В канале — кейсы, разборы удачных и неудачных запусков, рекомендации по выбору запросов.",
              },
              {
                t: "Получите 3000 тестовых кликов",
                d: "Бот проверит подписку и начислит бесплатный объём для первого controlled test.",
              },
            ].map((s, i) => (
              <Appear key={s.t} delay={i * 0.08} className="cell">
                <div className="h-full p-7 sm:p-8">
                  <span className="num text-[11px] text-[var(--accent)]">Шаг {i + 1}</span>
                  <h3 className="mt-5 max-w-[22ch] text-[19px] leading-snug font-semibold tracking-[-0.02em] sm:text-[21px]">
                    {s.t}
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                    {s.d}
                  </p>
                </div>
              </Appear>
            ))}
          </div>

          <Appear delay={0.16}>
            <div className="mt-12 border-t border-[var(--rule)] pt-8">
              <p className="label text-[var(--ink-faint)]">бесплатный тест — это не обещание результата, а</p>
              <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2.5">
                {[
                  "реальный опыт",
                  "реальные данные",
                  "понимание интерфейса",
                  "понимание рабочего сценария",
                  "основание решить, нужен ли вам второй инструмент",
                ].map((g) => (
                  <li key={g} className="flex gap-3 text-[16px] leading-snug text-[var(--ink-soft)]">
                    <span aria-hidden="true" className="num shrink-0" style={{ color: "var(--positive)" }}>
                      ✓
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </Appear>

          <Appear delay={0.22}>
            <div className="mt-10">
              <StackCta ctaId="free_clicks">Получить 3000 тестовых кликов</StackCta>
              <p className="mt-4 max-w-[52ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">
                Через Telegram-бота, после проверки подписки на канал {TELEGRAM.channelName}.
              </p>
            </div>
          </Appear>
        </Section>

        {/* Блок 9. Parallel use. */}
        <Section id="parallel-use" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            title="Текущий ПФ может остаться там, где уже работает"
            lead={STACK_PARALLEL_INTRO}
          />
          <Appear delay={0.14}>
            <p className="mt-10 max-w-[58ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              {STACK_PARALLEL_HIGHLIGHT}
            </p>
          </Appear>
          <Appear delay={0.2}>
            <div className="mt-10">
              <StackCta ctaId="parallel_use">Добавить второй инструмент</StackCta>
            </div>
          </Appear>
        </Section>

        {/* Блок 10. Контроль, риски и ограничения. */}
        <Section id="safety" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            kicker="вопрос до запуска, а не после"
            title="До запуска вы должны понимать не только потенциальный результат, но и ограничения"
            lead={STACK_SAFETY_INTRO}
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {STACK_SAFETY_QUESTIONS.map((q) => (
              <ManualInputPlaceholder key={q} materialType="Безопасность" need={q} className="h-full" />
            ))}
          </div>

          <Appear delay={0.16}>
            <p className="mt-10 max-w-[58ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              {STACK_SAFETY_HIGHLIGHT}
            </p>
          </Appear>
        </Section>

        {/* Блок 11. Реальные результаты. */}
        <Section id="cases" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            kicker="контекст важнее красивой цифры"
            title="Вот результаты, которые мы уже наблюдали"
            lead="Это не обещание, что любой новый тест повторит тот же путь. Эти кейсы нужны для другого — показать, что сервис способен давать значимую динамику в реальных задачах, а дальше нужны ваши собственные данные."
          />

          <Appear delay={0.08}>
            <div className="mt-14 grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
              {STACK_CASES.map((c) => (
                <div key={c.query} className="cell p-6 sm:p-7">
                  <p className="text-[15px] font-medium text-[var(--ink)]">{c.query}</p>
                  <dl className="mt-5 flex flex-col gap-2.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="label text-[var(--ink-faint)]">было</dt>
                      <dd className="text-right text-[14px] text-[var(--ink-soft)]">{c.before}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="label text-[var(--accent)]">стало</dt>
                      <dd className="text-right text-[15px] font-semibold text-[var(--ink)]">{c.after}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="label text-[var(--ink-faint)]">период</dt>
                      <dd className="text-right text-[14px] text-[var(--ink-soft)]">{c.period}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </Appear>

          <Appear delay={0.16}>
            <ManualInputInline>{STACK_CASES_PENDING}</ManualInputInline>
          </Appear>

          <Appear delay={0.2}>
            <p className="mt-10 max-w-[58ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
              {STACK_CASES_CONCLUSION}
            </p>
          </Appear>

          <Appear delay={0.26}>
            <div className="mt-10">
              <StackCta ctaId="cases">Получить 3000 кликов для собственного теста</StackCta>
            </div>
          </Appear>
        </Section>

        {/* Блок 12. Калькулятор. */}
        <Section id="calculator" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head kicker="оплата за клик" title="Посчитайте не «цену сервиса», а стоимость собственного сценария" lead={STACK_ECONOMICS_INTRO} />
          <StackCalculator />

          <Appear delay={0.12}>
            <div className="mt-14">
              <p className="label text-[var(--ink-faint)]">после первого теста сравните сами — цифры не заполняются за вас</p>
              <CompareTable rows={STACK_COMPARE_ROWS} />
            </div>
          </Appear>

          <Appear delay={0.2}>
            <div className="mt-10">
              <StackCta ctaId="calculator" above="Сначала протестировать бесплатно">
                Получить 3000 тестовых кликов
              </StackCta>
            </div>
          </Appear>
        </Section>

        {/* Блок 13. Тарифная логика. */}
        <Section id="pricing" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head kicker="тарифы" title="Понимайте заранее, за что платите после теста" />

          <Appear delay={0.06}>
            <p className="mt-10 max-w-[58ch] text-[17px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)]">
              {STACK_TARIFF_UNIT}
            </p>
          </Appear>

          <Appear delay={0.12}>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {STACK_TARIFF_PENDING_FIELDS.map((f) => (
                <ManualInputPlaceholder key={f} materialType="Тариф" need={f} className="h-full" />
              ))}
            </div>
          </Appear>

          <Appear delay={0.2}>
            <p className="mt-10 max-w-[58ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
              {STACK_TARIFF_COPY}
            </p>
          </Appear>
        </Section>

        {/* Блок 14. Для кого этот сервис. */}
        <Section id="fit" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head title="Этот сценарий подходит SEO-специалистам, которые хотят расширить стек — а не заменить мышление инструментом" />

          <Appear delay={0.08}>
            <div className="mt-14 border-t border-[var(--rule)] pt-8">
              <p className="label text-[var(--accent)]">подходит, если</p>
            </div>
          </Appear>
          <Points items={[...STACK_FIT]} />

          <Appear delay={0.2}>
            <ManualInputPlaceholder
              materialType="Fit"
              need="Реальные not-fit сценарии для этой страницы — продуктовая команда должна определить, кому сервис точно не подходит."
              className="mt-10"
            />
          </Appear>
        </Section>

        {/* Блок 15. FAQ. */}
        <Section id="faq" zone="zone-proof" className="pb-24 sm:pb-32">
          <Head kicker="вопросы" title="Вопросы перед первым тестом" />
          <Faq items={STACK_FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </Section>

        {/* Блок 16. Финальный CTA. */}
        <Section id="final" zone="zone-settled settle-in" className="pb-28 sm:pb-36">
          <Appear>
            <p className="label text-[var(--ink-faint)]">не миграция. собственный тест.</p>
            <h2 className="mt-7 max-w-[22ch] text-[30px] leading-[1.08] font-extrabold tracking-[-0.035em] sm:text-[44px]">
              Новый инструмент должен сначала доказать, что заслуживает места в вашем стеке
            </h2>
            <p className="mt-7 max-w-[58ch] text-[17px] leading-relaxed text-[var(--ink-soft)] sm:text-[19px]">
              Не переносите проекты. Не меняйте то, что уже работает. Не выбирайте самый сложный
              запрос ради «экзамена».
            </p>
            <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-[var(--ink)] sm:text-[19px]">
              Выберите измеримую задачу. Зафиксируйте исходную точку. Получите 3000 тестовых
              кликов. Запустите controlled test. И посмотрите, даёт ли этот инструмент вам ещё
              один рабочий сценарий.
            </p>
          </Appear>

          <Appear delay={0.1}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end">
              <StackCta ctaId="final">Получить 3000 тестовых кликов</StackCta>
              <a href="#calculator" className="btn btn-secondary btn-lg">
                Рассчитать стоимость моего объёма
              </a>
            </div>
          </Appear>

          <Appear delay={0.16}>
            <p className="mt-5 max-w-[56ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">
              {STACK_FINAL_HIGHLIGHT}
            </p>
          </Appear>

          {PENDING && (
            <Appear delay={0.22}>
              <p className="mt-14 max-w-[70ch] border-t border-[var(--rule-soft)] pt-6 text-[12px] leading-relaxed text-[var(--ink-faint)]">
                {DISCLAIMER}
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
