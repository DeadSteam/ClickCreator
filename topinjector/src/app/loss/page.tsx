import type { Metadata } from "next";
import { Fragment } from "react";

import { Schema } from "@/components/schema";
import { LandingNav, MobileCta, SIGNUP_URL } from "@/components/landing/chrome";
import { LandingFooter } from "@/components/landing/footer";
import { Appear, Cards, Chain, Head, Section, Steps } from "@/components/landing/sections";
import { Faq } from "@/components/landing/faq";
import { Pricing } from "@/components/landing/pricing";
import { CompareTable } from "@/components/landing/universal-blocks";
import { FeaturedCase, CaseGrid } from "@/components/landing/universal-cases";
import { TelegramSteps } from "@/components/landing/telegram";
import { TrialCta } from "@/components/landing/trial-cta";
import { AppPreview } from "@/components/landing/app-preview";
import { ReadingProgress } from "@/components/predframing/rail";
import { PredframingAnalytics } from "@/components/predframing/chrome";
import { PredframingHero, RAZBOR_ANCHOR } from "@/components/predframing/hero";
import { HeroCompare, ProblemSearch } from "@/components/predframing/schemas";
import { PlanCalculator } from "@/components/predframing/plan-calculator";
import {
  Aside,
  Chapter,
  Heading,
  Interlude,
  Ladder,
  Points,
  Statement,
  Text,
} from "@/components/predframing/prose";
import { hypothesisId } from "@/predframing/hypotheses";
import {
  LOSS_COMPARE_ROWS,
  LOSS_FAQ,
  LOSS_FIT,
  LOSS_MECHANIC,
  LOSS_NOT_FIT,
  LOSS_SAFETY,
  LOSS_TARIFF_LOGIC,
} from "@/predframing/loss-sale";
import { DISCLAIMER, PENDING, TELEGRAM, TRIAL } from "@/landing/config";
import { FEATURED_CASE, CASE_GRID } from "@/landing/universal";

/*
  Гипотеза №1 «Потеря преимущества» — полный психологический спец-лендинг.

  Источники: мастер-промпт и ТЗ 1.1/1.2 (ТЗредактирование/), файл гипотезы
  «Психологический_спец_лендинг_Topinjector_гипотеза_№1_Потеря_преимущества.docx».
  Новая архитектура отменяет прежнюю: страница больше не статья с единственной
  кнопкой в конце, ведущей на /universal, — это самостоятельный продающий
  лендинг. Переменная часть (Hero → новый критерий → практическое следствие →
  Product Bridge) занимает первую треть и раскрывает Topinjector рано;
  универсальная продающая часть подключена на той же странице и ведёт прямо к
  бесплатным лимитам через Telegram-бота.

  Универсальная часть переиспользует реальные данные и компоненты /service и
  /universal (`@/landing/*`) — тарифы, кейсы, Telegram-механику, интерфейс —
  вместо повторной выдумки фактов на десятой странице воронки.
*/

const HYPOTHESIS = hypothesisId("loss");

const DESCRIPTION =
  "Ваш SEO SaaS может оставаться отличным инструментом и при этом больше не быть оптимальным вариантом для текущей задачи. Проверьте это на своём проекте — бесплатно, через Telegram, без отказа от текущего сервиса.";

export const metadata: Metadata = {
  title: "Ваш SEO-инструмент всё ещё даёт максимальное преимущество?",
  description: DESCRIPTION,
  alternates: { canonical: "/loss" },
  openGraph: {
    type: "website",
    title: "Ваш SEO-инструмент всё ещё даёт максимальное преимущество?",
    description: DESCRIPTION,
    url: "/loss",
  },
};

const LOSS_FAQ_FOR_SCHEMA = LOSS_FAQ.slice(0, 6);

export default function LossPage() {
  return (
    <div className="brand-flat">
      <Schema
        faq={LOSS_FAQ_FOR_SCHEMA}
        service={{
          name: "Topinjector — проверка альтернативного SEO-сценария на своих данных",
          description: DESCRIPTION,
          url: "https://topinjector.ru/loss",
        }}
      />

      <PredframingAnalytics hypothesis={HYPOTHESIS} />
      <ReadingProgress />

      <div className="zone-doubt">
        <LandingNav />
      </div>

      <main id="main" tabIndex={-1}>
        {/*
          ══════════════════════════ ЗОНА A. ПЕРЕМЕННАЯ ЧАСТЬ ══════════════════════════
          `zone-doubt` — та же зона, что держит все десять предфрейминговых
          страниц: Chapter/Ladder/Interlude из `prose.tsx` настроены под её
          токены (--ink, --accent, --rule-soft), и без явной зоны здесь они
          получили бы значения по умолчанию из `.brand-flat`, а не тот же тон,
          что на остальной странице.
        */}
        <div className="zone-doubt bg-[var(--reading-bg)]">
          <PredframingHero
            hypothesis={HYPOTHESIS}
            kicker="Для SEO-специалистов, у которых уже есть рабочий стек"
            title="Хороший SEO-инструмент редко становится плохим. Он просто может перестать быть лучшим для вашей текущей задачи."
            subtitle={[
              "Если привычный SEO SaaS продолжает работать, причин менять его действительно немного.",
              <Fragment key="q">
                Но есть другой вопрос: когда вы в последний раз проверяли, остаётся ли
                ваш текущий рабочий сценарий оптимальным по{" "}
                <strong className="font-semibold text-[var(--ink)]">
                  скорости, контролю и объёму вашего внимания?
                </strong>
              </Fragment>,
              "Topinjector можно проверить параллельно — без обязательного отказа от текущего сервиса.",
            ]}
            cta="Получить бесплатные лимиты Topinjector →"
            primaryAction={
              <TrialCta event="hero_cta_click" place="hero">
                Telegram
              </TrialCta>
            }
            secondaryLabel="Сначала разобраться, что именно сравнивать ↓"
            micro={[
              "Через Telegram-бота, не форма регистрации",
              "Подписка на канал — обязательное условие лимитов",
              TRIAL.cardRequired ? "Карта требуется" : "Карта не требуется",
            ]}
            visual={<HeroCompare />}
          />

          {/*
            Highlight Quote Hero — есть в ТЗ гипотезы №1 отдельным элементом
            между Hero и Блоком 2, а не частью подзаголовка: это отдельная
            мысль, которая держит страницу, пока читатель не дошёл до Блока 2.
          */}
          <div className="mx-auto max-w-[88rem] px-5 pb-16 sm:px-8">
            <Appear delay={0.4}>
              <p className="max-w-[46ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[18px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[21px]">
                Вопрос не в том, работает ли ваш текущий сервис. Вопрос —
                когда вы в последний раз проверяли, остаётся ли он лучшим
                рабочим вариантом именно для вас.
              </p>
            </Appear>
          </div>

          {/*
            Шире, чем на десяти читающих страницах (38rem): там колонка
            рассчитана на 30-80 абзацев подряд, здесь — на три коротких
            блока. Узкая колонка на короткой странице выглядит случайным
            сжатием, а не выбором ради чтения.
          */}
          <article className="mx-auto max-w-[46rem] px-5 pb-4 2xl:max-w-[50rem]">
            {/* ── Блок 2. Новый критерий ─────────────────────────────────── */}
            <Chapter id={RAZBOR_ANCHOR} index={0} label="Новый критерий" peek>
              <Heading>Проблема начинается не тогда, когда инструмент перестаёт работать</Heading>

              <Text lead>
                Когда SEO-проект замедляется, мы естественно начинаем проверять
                привычные причины. Алгоритмы. Конкурентов. Ссылки. Контент.
                Техническое состояние. Бюджет. И это логично.
              </Text>

              <ProblemSearch />

              <Text>
                Но рабочий инструмент часто остаётся вне проверки именно потому,
                что уже много раз доказал свою полезность. В этом и возникает
                ловушка.
              </Text>
              <Text>
                Хороший SaaS не обязан однажды резко стать плохим. Он может
                продолжать выполнять свою функцию — просто рынок, процессы и
                альтернативные инструменты постепенно меняются вокруг него.
              </Text>
              <Text>
                Поэтому профессиональный вопрос сегодня не обязательно звучит:
                «Нужно ли мне менять сервис?» Более точный вопрос:
              </Text>
              <Aside>
                «На каких актуальных данных основан мой вывод, что текущий
                сценарий по-прежнему оптимален?»
              </Aside>

              <Interlude
                lines={[
                  "То, что инструмент продолжает работать, подтверждает его работоспособность.",
                  "Но не обязательно подтверждает, что альтернативный рабочий цикл не окажется сильнее для части ваших задач.",
                ]}
              />

              <Text>
                Если текущий SaaS действительно остаётся лучшим вариантом —
                объективная проверка это только подтвердит. Но если нет,
                разница обычно проявляется не в количестве красивых функций.
                Она проявляется в ежедневной работе.
              </Text>
            </Chapter>

            {/* ── Блок 3. Практическое следствие ─────────────────────────── */}
            <Chapter id="posledstviya" index={1} label="Практическое следствие">
              <Heading>
                Самая дорогая разница может выглядеть как несколько лишних
                действий каждый день
              </Heading>

              <Text lead>
                Потеря преимущества редко выглядит как катастрофа. Проекты
                продолжают работать. Клиенты остаются. Привычный процесс
                выполняет свою задачу.
              </Text>

              <Points
                caption="изменения появляются в мелочах"
                items={[
                  "Одну задачу приходится проверить ещё раз.",
                  "По другой дольше ждать данных.",
                  "Третий проект требует дополнительного ручного возврата.",
                  "Часть информации приходится держать в голове.",
                  "Следующее решение принимается немного позже.",
                ]}
              />

              <Text>
                Каждый эпизод сам по себе кажется несущественным. Но рабочий
                инструмент используется не один раз. Он проходит через десятки
                запросов, проектов и повторяющихся циклов. И тогда небольшая
                разница начинает умножаться на весь портфель.
              </Text>

              <Points
                caption="4 практических критерия"
                items={[
                  "Время до полезного сигнала — когда после запуска появляется информация, достаточная для следующего действия?",
                  "Количество ручных возвратов — сколько раз специалисту нужно снова открывать задачу и проверять происходящее?",
                  "Контроль процесса — понятно ли, что происходит сейчас и когда требуется вмешательство?",
                  "Скорость профессиональной проверки — насколько быстро инструмент позволяет перейти от гипотезы к собственному выводу?",
                ]}
              />

              <Statement>
                Профессиональное преимущество создаётся не количеством
                инструментов. Оно появляется там, где один и тот же специалист
                быстрее получает достаточно данных для следующего правильного
                решения.
              </Statement>

              <Text>
                Именно поэтому сравнивать два SEO-инструмента только по
                интерфейсу, количеству функций или цене недостаточно. Нужно
                увидеть, как отличается сам рабочий цикл.
              </Text>
            </Chapter>

            {/* ── Блок 4. Product Bridge ──────────────────────────────────── */}
            <Chapter id="product-bridge" index={2} label="Topinjector">
              <Heading>Вот где имеет смысл посмотреть Topinjector</Heading>

              <Text lead>
                Мы не предлагаем вам решить, что Topinjector лучше вашего
                текущего SaaS. Для такого вывода у вас пока нет собственных
                данных.
              </Text>
              <Text>
                Предлагаем другое. Оставьте текущий рабочий стек. Выберите одну
                подходящую SEO-задачу. Запустите её в Topinjector в рамках
                поддерживаемого сценария.
              </Text>

              <Points
                caption="и посмотрите на параметры, которые действительно имеют значение"
                items={[
                  "Сколько действий потребовалось.",
                  "Насколько понятен процесс.",
                  "Какие данные доступны.",
                  "Как выглядит динамика.",
                  "Сколько внимания требует контроль.",
                  "Насколько быстро вы получаете основание для следующего решения.",
                ]}
              />

              <Text>После этого у вас будет не рекламное сравнение. А собственный рабочий опыт.</Text>

              <Statement>
                Topinjector — дополнительный SEO-инструмент, который можно
                сначала проверить на ограниченной задаче и только потом
                решать, какое место он должен занимать в вашем стеке.
              </Statement>

              {/*
                Первое крупное появление реального интерфейса — п.17 ТЗ 1.1:
                визуальная система переходит от метафор к продукту именно здесь.
              */}
              <div className="my-12 -mx-2 sm:-mx-6 xl:-mx-16 2xl:-mx-24">
                <AppPreview />
              </div>

              <Ladder
                caption="ваш текущий SaaS остаётся на месте"
                steps={["Текущий SaaS + Topinjector", "Одна задача", "Собственные данные", "Решение"]}
                markAt={3}
              />

              <div className="mt-12">
                <TrialCta
                  event="product_bridge_cta_click"
                  place="product_bridge"
                  above="Получить бесплатные лимиты и проверить Topinjector"
                >
                  Telegram
                </TrialCta>
                <p className="mt-4 max-w-[52ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">
                  Лимиты выдаются через Telegram-бота после проверки подписки на
                  канал / группу Topinjector: {TRIAL.projects} проект и{" "}
                  {TRIAL.queries} запросов — бесплатно.{" "}
                  {TRIAL.cardRequired ? "" : "Карта не требуется."}
                </p>
              </div>
            </Chapter>
          </article>
        </div>

        {/* ══════════════════════════ ЗОНА B. УНИВЕРСАЛЬНАЯ ПРОДАЮЩАЯ ЧАСТЬ ══════════════════════════ */}

        {/* Блок 5. Что даёт Topinjector. */}
        <Section id="product" zone="zone-signal" className="pb-16 sm:pb-20">
          <Head
            kicker="что именно даёт Topinjector"
            title="SEO-решение остаётся за вами. Topinjector помогает пройти рабочий цикл до данных"
            lead="Сервис не решает за SEO-специалиста, какой проект продвигать, какие запросы считать приоритетными, какую стратегию выбрать и что считать достаточным результатом. Это профессиональная зона специалиста. Topinjector подключается к поддерживаемому рабочему сценарию после того, как задача уже определена."
          />

          <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-2">
            <Appear className="cell p-7 sm:p-8">
              <p className="label text-[var(--ink-faint)]">SEO-специалист</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {["Стратегия", "Проект", "Запросы", "Критерии", "Интерпретация", "Решение"].map((t) => (
                  <li key={t} className="text-[15px] text-[var(--ink-soft)]">{t}</li>
                ))}
              </ul>
            </Appear>
            <Appear delay={0.1} className="cell p-7 sm:p-8">
              <p className="label text-[var(--accent)]">Topinjector</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {["Поддерживаемый процесс", "Запуск", "Контроль", "Доступные данные", "Динамика", "История"].map((t) => (
                  <li key={t} className="text-[15px] font-medium text-[var(--ink)]">{t}</li>
                ))}
              </ul>
            </Appear>
          </div>

          <Appear delay={0.16}>
            <p className="mt-10 max-w-[58ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              Не «сервис делает SEO вместо вас». Вы задаёте направление.
              Инструмент помогает контролируемо пройти свою часть процесса.
            </p>
          </Appear>
        </Section>

        {/* Блок 6. Как работает Topinjector. */}
        <Section id="how" zone="zone-signal" className="pb-16 sm:pb-20">
          <Head
            kicker="как работает Topinjector"
            title="От задачи до следующего решения — по понятному сценарию"
          />
          <Chain steps={["Задача", "Запуск", "Контроль", "Данные", "Решение"]} accentAt={4} />
          <Steps items={LOSS_MECHANIC.map((s) => ({ t: s.t, d: s.d }))} />
        </Section>

        {/* Блок 7. Интерфейс. */}
        <Section id="interface" zone="zone-signal" className="pb-16 sm:pb-20">
          <Head
            kicker="реальный продукт"
            title="Посмотрите, с чем именно будете работать"
            lead="Проект, группа запросов, исходная и текущая позиция, динамика по дням — то, что нужно, чтобы принять следующее решение, а не обещание результата."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
            <Appear className="flex flex-col gap-6">
              {[
                { t: "Проект и запросы", d: "Какой сайт и какая группа запросов участвуют в проверке." },
                { t: "Было / стало", d: "Исходная позиция зафиксирована — без неё сравнивать «до» и «после» нечем." },
                { t: "Динамика по дням", d: "Появился ли сигнал, достаточный для следующего действия, или ещё рано делать вывод." },
              ].map((s) => (
                <div key={s.t} className="border-t border-[var(--rule-soft)] pt-4">
                  <h3 className="text-[16px] font-semibold tracking-[-0.02em]">{s.t}</h3>
                  <p className="mt-1.5 max-w-[38ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">
                    {s.d}
                  </p>
                </div>
              ))}
            </Appear>

            <Appear delay={0.1}>
              <AppPreview />
            </Appear>
          </div>

          <Appear delay={0.16}>
            <p className="mt-8 max-w-[62ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">
              Больше экранов кабинета (создание проекта, управление запуском,
              история изменений) добавляются по мере готовности реальных
              скриншотов интерфейса.
            </p>
          </Appear>
        </Section>

        {/* Блок 8. Бесплатные лимиты. */}
        <Section id="free-limits" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            kicker="первый запуск без оплаты"
            title="Не покупайте Topinjector до знакомства с продуктом"
            lead="Получите бесплатный стартовый объём и посмотрите, как сервис работает на подходящей SEO-задаче."
          />
          <TelegramSteps />
        </Section>

        {/* Блок 9. Параллельная проверка. */}
        <Section id="parallel-test" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            title="Текущий SaaS можно оставить. Именно так сравнение становится полезнее"
            lead="Не переносите весь портфель. Не меняйте привычный процесс сразу. Выберите ограниченный сценарий и сравнивайте Topinjector рядом с тем, как работаете сейчас."
          />
          <CompareTable rows={LOSS_COMPARE_ROWS} />
          <Appear delay={0.18}>
            <p className="mt-8 max-w-[58ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              Не нужно, чтобы Topinjector оказался лучше во всём. Достаточно
              понять, существует ли сценарий, в котором он даёт вам
              дополнительное практическое преимущество.
            </p>
          </Appear>
        </Section>

        {/*
          Блок 10. Безопасность и контроль.
          `zone-proof`, не `zone-settled`: последняя — это финальный «свет» в
          самом конце дуги (см. Блок 16). Если поставить его здесь, посреди
          страницы, дуга «светлеет» раньше времени и снова темнеет в блоках
          11-15 — на стыке получается жёсткий, ничем не смягчённый скачок
          тона, из-за которого текст на границе секций теряет контраст.
        */}
        <Section id="safety" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            kicker="вопрос до запуска, а не после"
            title="Что именно происходит с проектом при использовании Topinjector?"
            lead={LOSS_SAFETY.intro}
          />
          <Cards items={LOSS_SAFETY.rows.map((r) => ({ t: r.t, d: r.d }))} cols={2} />
          <Appear delay={0.16}>
            <p className="mt-10 max-w-[58ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              Профессиональная безопасность — это не обещание отсутствия
              риска. Это понимание механики, границ и того, чем именно вы
              управляете.
            </p>
          </Appear>
        </Section>

        {/* Блок 11. Реальные кейсы. */}
        <Section id="cases" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            kicker="контекст важнее красивой цифры"
            title="Что происходило в реальных сценариях Topinjector"
            lead="Чужой кейс не отвечает на вопрос, что произойдёт именно на вашем проекте. Но хороший кейс позволяет понять, в каких условиях результат вообще был получен."
          />
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
          <Appear delay={0.2}>
            <div className="mt-14">
              <TrialCta event="free_limits_cta_click" place="cases" above="Получить бесплатные лимиты и проверить самому">
                Telegram
              </TrialCta>
            </div>
          </Appear>
        </Section>

        {/* Блок 12. Калькулятор. */}
        <Section id="calculator" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            kicker="цена без заявки и созвона"
            title="Сколько будет стоить ваш рабочий объём в Topinjector?"
          />
          <PlanCalculator />
          <Appear delay={0.2}>
            <div className="mt-10">
              <p className="max-w-[46ch] text-[15px] leading-snug text-[var(--ink-soft)]">
                Хотите сначала проверить продукт? Получите бесплатные лимиты
                до покупки рабочего объёма.
              </p>
              <div className="mt-5">
                <TrialCta event="free_limits_cta_click" place="calculator" above="Получить бесплатные лимиты">
                  Telegram
                </TrialCta>
              </div>
            </div>
          </Appear>
        </Section>

        {/* Блок 13. Прозрачная тарифная логика + тарифы. */}
        <Section id="pricing" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head kicker="тарифы" title="Понятно, за что списывается каждый лимит" />

          <Appear delay={0.08}>
            <ul className="mt-12 flex flex-col gap-4">
              {LOSS_TARIFF_LOGIC.map((item) => (
                <li key={item.q} className="grid gap-1.5 border-t border-[var(--rule-soft)] pt-4 sm:grid-cols-[18rem_1fr] sm:gap-8">
                  <span className="label text-[var(--ink-faint)]">{item.q}</span>
                  <span className="max-w-[62ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">{item.a}</span>
                </li>
              ))}
            </ul>
          </Appear>

          <Pricing />
          {PENDING && (
            <Appear delay={0.2}>
              <p className="mt-6 max-w-[64ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">{DISCLAIMER}</p>
            </Appear>
          )}
        </Section>

        {/* Блок 14. Для кого подходит. */}
        <Section id="fit" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head title="Topinjector имеет смысл не в каждом SEO-сценарии" />

          <Appear delay={0.08}>
            <div className="mt-14 border-t border-[var(--rule)] pt-8">
              <p className="label text-[var(--accent)]">стоит проверить, если</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {LOSS_FIT.map((t) => (
                  <li key={t} className="max-w-[62ch] text-[15px] leading-snug font-medium text-[var(--ink)]">{t}</li>
                ))}
              </ul>
            </div>
          </Appear>

          <Appear delay={0.14}>
            <div className="mt-10 border-t border-[var(--rule-soft)] pt-8">
              <p className="label text-[var(--ink-faint)]">не стоит ожидать от Topinjector</p>
              <ul className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                {LOSS_NOT_FIT.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-snug text-[var(--ink-soft)]">
                    <span aria-hidden="true" className="num shrink-0 text-[var(--ink-faint)]">—</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Appear>
        </Section>

        {/* Блок 15. FAQ. */}
        <Section id="faq" zone="zone-proof" className="pb-24 sm:pb-32">
          <Head kicker="вопросы" title="Что стоит уточнить до первой проверки" />
          <Faq items={LOSS_FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </Section>

        {/* Блок 16. Финальный CTA. */}
        <Section id="final" zone="zone-settled settle-in" className="pb-28 sm:pb-36">
          <Appear>
            <p className="label text-[var(--ink-faint)]">один вопрос лучше закрыть собственными данными</p>
            <h2 className="mt-7 max-w-[22ch] text-[30px] leading-[1.08] font-extrabold tracking-[-0.035em] sm:text-[44px]">
              Ваш текущий SEO-инструмент всё ещё даёт вам максимальное преимущество?
            </h2>
            <p className="mt-7 max-w-[58ch] text-[17px] leading-relaxed text-[var(--ink-soft)] sm:text-[19px]">
              Мы не можем ответить на этот вопрос за вас. И реклама другого
              SaaS тоже не может. Но его можно проверить.
            </p>
            <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-[var(--ink)] sm:text-[19px]">
              Оставьте текущий рабочий стек. Выберите подходящую задачу.
              Получите бесплатные лимиты Topinjector. Посмотрите на процесс и
              собственные данные. Если Topinjector даст практическое
              преимущество — у вас появится объективная причина использовать
              его дальше. Если нет — вы сохраните текущий подход, но уже будете
              знать, что проверили альтернативу.
            </p>
          </Appear>

          <Appear delay={0.1}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end">
              <TrialCta event="final_cta_click" place="final" above="Получить бесплатные лимиты Topinjector">
                Telegram
              </TrialCta>
              <a
                href="#calculator"
                className="btn btn-secondary btn-lg"
              >
                Рассчитать стоимость моего объёма
              </a>
            </div>
          </Appear>

          <Appear delay={0.16}>
            <p className="mt-5 max-w-[56ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">
              Бесплатные лимиты выдаются через Telegram-бота после проверки
              подписки на канал / группу Topinjector.{" "}
              {TRIAL.cardRequired ? "" : "Карта не требуется. "}
              Автоматической оплаты после бесплатного объёма нет — бот проверит
              подписку на {TELEGRAM.channelName} и начислит пакет автоматически.
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
