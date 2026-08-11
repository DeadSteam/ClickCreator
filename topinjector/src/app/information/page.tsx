import type { Metadata } from "next";
import { Fragment } from "react";

import { Schema } from "@/components/schema";
import { LandingNav, MobileCta, SIGNUP_URL } from "@/components/landing/chrome";
import { LandingFooter } from "@/components/landing/footer";
import { Appear, Cards, Chain, Head, Section, Steps } from "@/components/landing/sections";
import { Faq } from "@/components/landing/faq";
import { CompareTable } from "@/components/landing/universal-blocks";
import { TelegramSteps } from "@/components/landing/telegram";
import { TrialCta } from "@/components/landing/trial-cta";
import { AppPreview } from "@/components/landing/app-preview";
import { ReadingProgress } from "@/components/predframing/rail";
import { PredframingAnalytics } from "@/components/predframing/chrome";
import { PredframingHero, RAZBOR_ANCHOR } from "@/components/predframing/hero";
import { RouteSplit, ConsumptionVsProduction, CriteriaFive } from "@/components/predframing/schemas-information";
import { PlanCalculator } from "@/components/predframing/plan-calculator";
import {
  CasePlaceholder,
  ManualInputInline,
  ManualInputPlaceholder,
  TariffPlaceholder,
} from "@/components/predframing/manual-input";
import {
  Aside,
  Chapter,
  Heading,
  Points,
  Statement,
  Text,
} from "@/components/predframing/prose";
import { hypothesisId } from "@/predframing/hypotheses";
import {
  INFORMATION_COMPARE_ROWS,
  INFORMATION_FAQ,
  INFORMATION_FIT,
  INFORMATION_MECHANIC,
  INFORMATION_NOT_FIT,
  INFORMATION_SAFETY,
  INFORMATION_TARIFF_LOGIC,
} from "@/predframing/information-sale";
import { DISCLAIMER, PENDING, TELEGRAM, TRIAL } from "@/landing/config";

/*
  Гипотеза №2 «Информационное преимущество» — полный психологический
  спец-лендинг, той же архитектуры, что и /loss.

  Источник: ТЗредактирование/NEW_Психологический_спец_лендинг_Topinjector_
  гипотеза_№2_Информационное.docx. Заменяет прежнюю версию страницы (статья
  без продукта до перехода на /universal) — по той же причине, что и у
  гипотезы №1: новая архитектура требует продукт и бесплатные лимиты в
  первой трети страницы, а не единственную кнопку в конце.

  Универсальная часть (блоки 5-16) переиспользует те же реальные данные и
  компоненты `@/landing/*`, что и /loss, — тарифы, кейсы, Telegram-механику,
  интерфейс. Копирайт самих блоков — свой, из ТЗ гипотезы №2, но продуктовые
  факты (механика, безопасность, тарифная логика) совпадают с /loss почти
  дословно: это один и тот же продукт, а не десять разных.
*/

const HYPOTHESIS = hypothesisId("information");

const DESCRIPTION =
  "Профессиональной информации сегодня достаточно. Но знать о новой возможности и иметь собственный проверенный вывод — не одно и то же. Проверьте Topinjector на одной ограниченной SEO-задаче — бесплатно, через Telegram, без обязательной смены текущего стека.";

export const metadata: Metadata = {
  title: "В SEO все узнают новости одновременно. Преимущество — у того, кто раньше проверяет",
  description: DESCRIPTION,
  alternates: { canonical: "/information" },
  openGraph: {
    type: "website",
    title: "В SEO все узнают новости одновременно. Преимущество — у того, кто раньше проверяет",
    description: DESCRIPTION,
    url: "/information",
  },
};

const INFORMATION_FAQ_FOR_SCHEMA = INFORMATION_FAQ.slice(0, 6);

export default function InformationPage() {
  return (
    <div className="brand-flat">
      <Schema
        faq={INFORMATION_FAQ_FOR_SCHEMA}
        service={{
          name: "Topinjector — проверка рабочей SEO-гипотезы на собственных данных",
          description: DESCRIPTION,
          url: "https://topinjector.ru/information",
        }}
      />

      <PredframingAnalytics hypothesis={HYPOTHESIS} />
      <ReadingProgress />

      <div className="zone-doubt">
        <LandingNav />
      </div>

      <main id="main" tabIndex={-1}>
        {/* ══════════════════════════ ЗОНА A. ПЕРЕМЕННАЯ ЧАСТЬ ══════════════════════════ */}
        <div className="zone-doubt bg-[var(--reading-bg)]">
          <PredframingHero
            hypothesis={HYPOTHESIS}
            kicker="Для SEO-специалистов, которые и так следят за рынком"
            title="В SEO все узнают новости примерно одновременно. Преимущество появляется у того, кто раньше проверяет их на практике."
            subtitle={[
              "Профессиональной информации сегодня достаточно. Новые гипотезы, кейсы, сервисы и изменения рынка становятся публичными очень быстро.",
              <Fragment key="q">
                Но знать о новой возможности и иметь собственный проверенный вывод —{" "}
                <strong className="font-semibold text-[var(--ink)]">не одно и то же</strong>.
              </Fragment>,
              "Topinjector можно использовать как один из инструментов такой проверки: на ограниченной SEO-задаче, без обязательной смены текущего стека.",
            ]}
            cta="Получить бесплатные лимиты Topinjector →"
            primaryAction={
              <TrialCta event="hero_cta_click" place="hero">
                Получить бесплатные лимиты
              </TrialCta>
            }
            secondaryLabel="Посмотреть, где возникает информационное преимущество ↓"
            micro={[
              "Через Telegram-бота, не форма регистрации",
              "Подписка на канал — обязательное условие лимитов",
              TRIAL.cardRequired ? "Карта требуется" : "Карта не требуется",
            ]}
            visual={<RouteSplit />}
          />

          <div className="mx-auto max-w-[88rem] px-5 pb-16 sm:px-8">
            <Appear delay={0.4}>
              <p className="max-w-[46ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[18px] leading-snug font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[21px]">
                Информация становится преимуществом не тогда, когда вы её
                получили. А тогда, когда она раньше рынка превратилась для вас
                в собственный вывод.
              </p>
            </Appear>
          </div>

          <article className="mx-auto max-w-[46rem] px-5 pb-4 2xl:max-w-[50rem]">
            {/* ── Блок 2. Новый критерий ─────────────────────────────────── */}
            <Chapter id={RAZBOR_ANCHOR} index={0} label="Новый критерий" peek>
              <Heading>
                Сегодня выигрывает не тот, кто знает больше. А тот, кто быстрее
                превращает новое знание в собственный опыт.
              </Heading>

              <Text lead>
                Ещё несколько лет назад доступ к информации действительно мог
                быть преимуществом. Кто-то раньше находил рабочую методику.
                Раньше узнавал об изменении. Раньше получал доступ к новому
                инструменту. Сегодня ситуация другая.
              </Text>
              <Text>
                Одно крупное изменение в SEO за несколько дней порождает:
                десятки постов, обсуждения, разборы, кейсы, видео, чужие
                выводы. Через короткое время большинство активных специалистов
                уже знает, что произошло.
              </Text>
              <Text>Но знание само по себе не отвечает на главный профессиональный вопрос:</Text>
              <Aside>«Работает ли это в моих условиях?»</Aside>

              <Text>
                И здесь начинается реальная разница. Один специалист
                заканчивает цикл на «Я прочитал и понял». Другой идёт дальше:
                «Я выбрал ограниченную задачу и проверил».
              </Text>
              <Text>
                Через некоторое время оба могут знать примерно одно и то же.
                Но только у одного есть собственные данные.
              </Text>

              <ConsumptionVsProduction />

              <Statement>
                Информация доступна рынку. Опыт появляется только после
                проверки.
              </Statement>

              {/*
                Ранний product teaser: в ТЗ гипотезы №2 он уже заложен прямо в
                Блоке 2, а не добавлен production-патчем поверх, как в /loss.
                Тот же визуальный приём — компактная вставка, не отдельная
                большая секция.
              */}
              <div className="mt-12 border border-[var(--rule-soft)] bg-[var(--inset)] p-6 sm:p-7">
                <p className="label text-[var(--ink-faint)]">
                  проверить сигнал можно до того, как он станет частью вашего стека
                </p>
                <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                  Topinjector не нужно внедрять во все проекты. Можно взять одну
                  подходящую задачу и посмотреть, какие данные даст новый
                  рабочий сценарий.
                </p>
                <div className="mt-6">
                  <TrialCta event="hero_cta_click" place="teaser">
                    Получить бесплатные лимиты
                  </TrialCta>
                </div>
              </div>
            </Chapter>

            {/* ── Блок 3. Практическое следствие ─────────────────────────── */}
            <Chapter id="posledstviya" index={1} label="Практическое следствие" tight>
              <Heading>
                Сильный SEO-фильтр сегодня отвечает не на вопрос «что нового?»,
                а на вопрос «что стоит проверить?»
              </Heading>

              <Text lead>
                Проверять всё подряд невозможно. Каждый день появляется
                слишком много методик, сервисов, кейсов, идей, обещаний, новых
                трактовок старых подходов. Если тестировать каждую новинку,
                информационное преимущество быстро превратится в операционный
                хаос.
              </Text>
              <Text>Поэтому сильный процесс состоит из двух разных навыков.</Text>
              <Aside>
                Первый — отбор: какая гипотеза действительно способна
                изменить рабочий процесс?
              </Aside>
              <Aside>
                Второй — проверка: можно ли быстро получить собственный ответ
                без большого риска и перестройки всей системы?
              </Aside>

              <Heading>Пять критериев гипотезы, которую имеет смысл проверить</Heading>
              <CriteriaFive />

              <Statement>
                Секрет информационного преимущества не в том, чтобы раньше
                всех услышать новую идею. А в том, чтобы раньше других
                превратить сильный сигнал в проверенный вывод.
              </Statement>

              <Text>
                Именно поэтому новый SEO-инструмент имеет смысл оценивать не
                по количеству функций и не по громкости кейсов. Первый вопрос
                другой:
              </Text>
              <Statement>
                «Какую рабочую гипотезу он позволяет мне проверить быстрее
                или управляемее?»
              </Statement>
            </Chapter>

            {/* ── Блок 4. Product Bridge ──────────────────────────────────── */}
            <Chapter id="product-bridge" index={2} label="Topinjector" tight>
              <Heading>Вот где имеет смысл проверить Topinjector</Heading>

              <Text lead>
                Мы не предлагаем считать Topinjector сильным инструментом
                только потому, что вы прочитали об этом на этой странице. И
                не предлагаем менять привычный стек. Более профессиональный
                сценарий проще.
              </Text>

              <Points
                caption="профессиональный сценарий проверки"
                items={[
                  "Выберите одну рабочую SEO-задачу.",
                  "Определите, что именно хотите проверить.",
                  "Запустите поддерживаемый сценарий в Topinjector.",
                  "Посмотрите на данные.",
                  "И только после этого решите, заслуживает ли этот инструмент постоянного места в вашей работе.",
                ]}
              />

              <Points
                caption="4 вопроса проверки"
                items={[
                  "Какую конкретную гипотезу я проверяю?",
                  "Что фиксирую до старта?",
                  "Какие данные будут иметь значение?",
                  "При каком результате продолжаю — а при каком отказываюсь?",
                ]}
              />

              <Statement>
                Topinjector — не источник «секретной SEO-информации». Это
                инструмент, который можно использовать, чтобы быстрее
                превратить одну выбранную гипотезу в собственный рабочий
                вывод.
              </Statement>

              <div className="my-12 -mx-2 sm:-mx-6 xl:-mx-16 2xl:-mx-24">
                <AppPreview />
                <div className="mt-8 grid gap-6 px-2 sm:grid-cols-3 sm:px-6 xl:px-16 2xl:px-24">
                  {[
                    { t: "Где специалист задаёт сценарий", d: "Проект, регион, группу запросов и рабочий объём." },
                    { t: "Где контролирует происходящее", d: "Статус запуска и объём проверки." },
                    { t: "Где получает данные для решения", d: "Позиции и динамику по дням." },
                  ].map((a, i) => (
                    <div key={a.t}>
                      <span className="num text-[11px] text-[var(--ink-faint)]">{String(i + 1).padStart(2, "0")}</span>
                      <p className="mt-2 text-[14px] font-medium text-[var(--ink)]">{a.t}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-[var(--ink-soft)]">{a.d}</p>
                    </div>
                  ))}
                </div>
                {/* п.53A.10A: даже на самом сильном визуальном моменте страницы схема не выдаётся за скриншот молча. */}
                <div className="mt-6 px-2 sm:px-6 xl:px-16 2xl:px-24">
                  <ManualInputInline>
                    Иллюстративная схема интерфейса, не скриншот. Заменить на
                    реальный экран Topinjector перед публикацией.
                  </ManualInputInline>
                </div>
              </div>

              <div className="mt-12">
                <TrialCta event="product_bridge_cta_click" place="product_bridge" above="Проверить Topinjector на своей задаче">
                  Получить бесплатные лимиты
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

        {/* Блок 5. Роль Topinjector. */}
        <Section id="product" zone="zone-signal" className="pb-16 sm:pb-20">
          <Head
            kicker="инструмент не заменяет профессиональный фильтр"
            title="Вы решаете, что стоит проверять. Topinjector помогает провести саму проверку"
            lead="Информационное преимущество начинается не с автоматизации мышления. Главное решение остаётся за специалистом: какой сигнал заслуживает внимания, какой проект подходит для проверки, какие запросы использовать, какой риск допустим. Topinjector подключается после этого — к поддерживаемой продуктом части рабочего процесса."
          />

          <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-2">
            <Appear className="cell p-7 sm:p-8">
              <p className="label text-[var(--ink-faint)]">SEO-специалист</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {["Отбор гипотезы", "Проект", "Запросы", "Критерии", "Интерпретация", "Решение"].map((t) => (
                  <li key={t} className="text-[15px] text-[var(--ink-soft)]">{t}</li>
                ))}
              </ul>
            </Appear>
            <Appear delay={0.1} className="cell p-7 sm:p-8">
              <p className="label text-[var(--accent)]">Topinjector</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {["Поддерживаемый сценарий", "Запуск", "Контроль", "Доступные данные", "Динамика", "История"].map((t) => (
                  <li key={t} className="text-[15px] font-medium text-[var(--ink)]">{t}</li>
                ))}
              </ul>
            </Appear>
          </div>

          <Appear delay={0.16}>
            <p className="mt-10 max-w-[58ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              Сильный инструмент не должен решать, чему вам верить. Он должен
              помогать быстрее получить данные, на основании которых вы
              решите сами.
            </p>
          </Appear>
        </Section>

        {/* Блок 6. Как работает Topinjector. */}
        <Section id="how" zone="zone-signal" className="pb-16 sm:pb-20">
          <Head
            kicker="как работает Topinjector"
            title="От рабочей гипотезы до собственного вывода"
          />
          <Chain steps={["Сигнал", "Отбор", "Тест", "Данные", "Вывод"]} accentAt={4} />
          <Steps items={INFORMATION_MECHANIC.map((s) => ({ t: s.t, d: s.d }))} />
        </Section>

        {/* Блок 7. Интерфейс. */}
        <Section id="interface" zone="zone-signal" className="pb-16 sm:pb-20">
          <Head
            kicker="не теория. реальный рабочий продукт"
            title="Посмотрите, как Topinjector превращает проверку в наблюдаемый процесс"
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
            <ManualInputPlaceholder
              materialType="Скриншот"
              need="Реальные экраны кабинета: создание проекта, управление запуском, история изменений. Показанный экран выше — иллюстративная схема, а не скриншот."
              source="Продакшн-сборка Topinjector (personal cabinet)"
              readyWhen="Минимум 4–6 реальных экранов, каждый с рабочими данными"
              minHeight="8rem"
              className="mt-8"
            />
          </Appear>
        </Section>

        {/* Блок 8. Бесплатные лимиты. */}
        <Section id="free-limits" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            kicker="проверка до покупки"
            title="Получите бесплатные лимиты и превратите интерес к Topinjector в собственный опыт"
            lead="Не нужно покупать большой рабочий объём только для того, чтобы понять механику сервиса. Используйте бесплатные лимиты для первого ограниченного сценария."
          />
          <TelegramSteps />
        </Section>

        {/* Блок 9. Параллельная проверка. */}
        <Section id="parallel-test" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            title="Новый вывод не требует нового стека целиком"
            lead="Информационное преимущество не возникает из постоянной смены инструментов. Если каждый новый сигнал заканчивается миграцией процессов, специалист быстро теряет больше времени, чем получает. Поэтому Topinjector разумнее сначала использовать рядом с текущей системой."
          />
          <CompareTable rows={INFORMATION_COMPARE_ROWS} />
          <Appear delay={0.18}>
            <p className="mt-8 max-w-[58ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              Информационное преимущество — не новый инструмент сам по себе.
              Это более ранний собственный вывод о том, нужен вам этот
              инструмент или нет.
            </p>
          </Appear>
        </Section>

        {/*
          Блок 10. Безопасность и контроль.
          `zone-proof`, не `zone-settled` — то же правило, что на /loss:
          `zone-settled` зарезервирован за финальным блоком 16.
        */}
        <Section id="safety" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            kicker="ранний тест не должен означать необдуманный риск"
            title="Что нужно знать до проверки Topinjector на проекте?"
            lead={INFORMATION_SAFETY.intro}
          />
          <Cards items={INFORMATION_SAFETY.rows.map((r) => ({ t: r.t, d: r.d }))} cols={2} />
          <Appear delay={0.1}>
            <ManualInputPlaceholder
              materialType="Безопасность"
              need={`Как остановить сценарий: ${INFORMATION_SAFETY.pending.need}`}
              source={INFORMATION_SAFETY.pending.source}
              readyWhen={INFORMATION_SAFETY.pending.readyWhen}
              className="mt-6"
            />
          </Appear>
          <Appear delay={0.16}>
            <p className="mt-10 max-w-[58ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              Профессиональное преимущество создаётся не скоростью любой
              ценой. А скоростью получения данных при контролируемом риске.
            </p>
          </Appear>
        </Section>

        {/* Блок 11. Реальные кейсы. */}
        <Section id="cases" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            kicker="чужой опыт — фильтр, а не доказательство за вас"
            title="На каких задачах Topinjector уже проверяли другие SEO-специалисты"
            lead="Кейсы полезны не потому, что позволяют скопировать чужой вывод. Они помогают понять: заслуживает ли гипотеза вашей собственной проверки."
          />
          {/*
            п.56A.10: подтверждённых кейсов ещё нет. Показывать демо-данные,
            похожие на реальный кейс, запрещено — вместо этого три явно
            промаркированные заглушки.
          */}
          <Appear delay={0.08}>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <CasePlaceholder index={1} />
              <CasePlaceholder index={2} />
              <CasePlaceholder index={3} />
            </div>
          </Appear>
          <Appear delay={0.18}>
            <p className="mt-10 max-w-[58ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
              Чужой кейс отвечает на вопрос «есть ли основания проверить».
              Ваш проект отвечает на вопрос «подходит ли это мне».
            </p>
          </Appear>
          <Appear delay={0.22}>
            <div className="mt-10">
              <TrialCta event="free_limits_cta_click" place="cases">
                Проверить самому
              </TrialCta>
            </div>
          </Appear>
        </Section>

        {/* Блок 12. Калькулятор. */}
        <Section id="calculator" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            kicker="проверка должна иметь понятную цену"
            title="Сколько будет стоить ваш рабочий объём в Topinjector?"
          />
          <PlanCalculator />
          <Appear delay={0.2}>
            <div className="mt-10">
              <p className="max-w-[46ch] text-[15px] leading-snug text-[var(--ink-soft)]">
                Сначала хотите получить собственный опыт?
              </p>
              <div className="mt-5">
                <TrialCta event="free_limits_cta_click" place="calculator">
                  Получить бесплатные лимиты
                </TrialCta>
              </div>
            </div>
          </Appear>
        </Section>

        {/* Блок 13. Прозрачная тарифная логика + тарифы. */}
        <Section id="pricing" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head
            kicker="тарифы"
            title="Понятно, сколько стоит перейти от проверки к регулярному использованию"
          />

          <Appear delay={0.08}>
            <ul className="mt-12 flex flex-col gap-4">
              {INFORMATION_TARIFF_LOGIC.map((item) => (
                <li key={item.q} className="grid gap-1.5 border-t border-[var(--rule-soft)] pt-4 sm:grid-cols-[18rem_1fr] sm:gap-8">
                  <span className="label text-[var(--ink-faint)]">{item.q}</span>
                  <span className="max-w-[62ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">{item.a}</span>
                </li>
              ))}
            </ul>
          </Appear>

          <Appear delay={0.14}>
            <p className="mt-10 max-w-[58ch] border-l-2 border-[var(--accent)] py-1 pl-5 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
              Сначала определите, есть ли ценность. Потом определяйте рабочий
              объём.
            </p>
          </Appear>

          {/* п.53A.4: три тарифа существуют, но не подтверждены для этой страницы — не показываем их как готовую цену. */}
          <Appear delay={0.2}>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              <TariffPlaceholder slot="Старт" />
              <TariffPlaceholder slot="Профессиональный" />
              <TariffPlaceholder slot="Команда" />
            </div>
          </Appear>
        </Section>

        {/* Блок 14. Для кого подходит. */}
        <Section id="fit" zone="zone-proof" className="pb-16 sm:pb-20">
          <Head title="Topinjector стоит проверять не потому, что он новый" />

          <Appear delay={0.08}>
            <div className="mt-14 border-t border-[var(--rule)] pt-8">
              <p className="label text-[var(--accent)]">стоит проверить, если вы</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {INFORMATION_FIT.map((t) => (
                  <li key={t} className="max-w-[62ch] text-[15px] leading-snug font-medium text-[var(--ink)]">{t}</li>
                ))}
              </ul>
            </div>
          </Appear>

          <Appear delay={0.14}>
            <div className="mt-10 border-t border-[var(--rule-soft)] pt-8">
              <p className="label text-[var(--ink-faint)]">не стоит начинать, если вы</p>
              <ul className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                {INFORMATION_NOT_FIT.map((t) => (
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
          <Head kicker="вопросы" title="Что стоит выяснить до первой проверки" />
          <Faq items={INFORMATION_FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </Section>

        {/* Блок 16. Финальный CTA. */}
        <Section id="final" zone="zone-settled settle-in" className="pb-28 sm:pb-36">
          <Appear>
            <p className="label text-[var(--ink-faint)]">не ещё одна SEO-новость</p>
            <h2 className="mt-7 max-w-[24ch] text-[30px] leading-[1.08] font-extrabold tracking-[-0.035em] sm:text-[44px]">
              Превратите информацию о Topinjector в собственный вывод
            </h2>
            <p className="mt-7 max-w-[58ch] text-[17px] leading-relaxed text-[var(--ink-soft)] sm:text-[19px]">
              Вы уже знаете, что Topinjector существует. Но само знание ничего
              не меняет. Можно дождаться большего количества чужих кейсов,
              обзоров и мнений. А можно выбрать одну подходящую SEO-задачу и
              получить собственные данные.
            </p>
            <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-[var(--ink)] sm:text-[19px]">
              Не тот получает информационное преимущество, кто раньше услышал
              о новом инструменте. А тот, кто раньше получил качественный
              собственный ответ.
            </p>
          </Appear>

          <Appear delay={0.1}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end">
              <TrialCta event="final_cta_click" place="final">
                Получить бесплатные лимиты
              </TrialCta>
              <a href="#calculator" className="btn btn-secondary btn-lg">
                Рассчитать стоимость рабочего объёма
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
