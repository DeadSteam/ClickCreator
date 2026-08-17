import type { Metadata } from "next";
import type { ReactNode } from "react";

import { plural } from "@/format";
import { Appear } from "@/motion/appear";
import { Schema } from "@/components/schema";
import { LandingNav, MobileCta, SIGNUP_URL } from "@/components/landing/chrome";
import { LandingFooter } from "@/components/landing/footer";
import { Faq } from "@/components/landing/faq";
import { CompareTable } from "@/components/landing/universal-blocks";
import { AppPreview } from "@/components/landing/app-preview";
import { ReadingProgress } from "@/components/predframing/rail";
import { StackCta } from "@/components/stack/cta";
import { StackCalculator } from "@/components/stack/calculator";
import { StackAnalytics } from "@/stack/analytics";
import { resolveHeroVariant, HERO_MICRO, HERO_OFFER_NOTE } from "@/stack/hero-variants";
import {
  STACK_CASES,
  STACK_CASES_CONCLUSION,
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
  ═══════════════════════════════════════════════════════════════════════════
  /stack — второй ПФ-инструмент. Оболочка собрана на `stack.css`.
  ═══════════════════════════════════════════════════════════════════════════

  Содержимое и порядок блоков — из `@/stack/sale`, без изменений.

  Что задаёт форму страницы.

  Форму выбирает содержимое, а не шаблон секции. Последовательность идёт
  рельсой, показания — крупным числом с названной величиной, тариф и вопросы
  безопасности — спецификацией, предложение — единственным выделенным блоком.
  Разделы с длинным перечнем держат заголовок липкой колонкой, поэтому при
  прокрутке видно, к чему относится то, что читаешь.

  Нумерация — без ведущих нулей. Липкие колонки закрепляются по единой точке
  `--stick`, а не каждая по своей.

  `searchParams` — Promise (Next 16): угол рекламы читается на сервере,
  поэтому нет ни мерцания между fallback и настоящим Hero, ни риска
  рассинхронизации SSR/CSR.
*/

const DESCRIPTION =
  "Добавьте второй ПФ-инструмент к рабочему SEO-стеку и проверьте его на своих данных. 3000 тестовых кликов для контрольного теста — бесплатно, через Telegram.";

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

/* ─────────────────────────── ФОРМЫ СТРАНИЦЫ ─────────────────────────── */

/*
  Секция. `data-pf-block` инертен везде, кроме предфрейминговых маршрутов:
  там `usePredframingAnalytics` слушает этот атрибут, чтобы мерить просмотр и
  время по блокам. Ставится по `id`, а не отдельным пропсом — второй источник
  правды для одного идентификатора расходится быстрее, чем успевает
  пригодиться.
*/
function Sec({
  id,
  sink,
  className = "",
  children,
}: {
  id?: string;
  sink?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} data-pf-block={id} className={`stk-sec ${sink ? "stk-sink" : ""} ${className}`}>
      {/* Липнет под шапкой граница раздела, а не его заголовок. */}
      <div className="stk-edge" aria-hidden="true" />
      <div className="stk-w stk-sec-in">{children}</div>
    </section>
  );
}

/**
 * Заголовок раздела.
 *
 * Мера заголовка задана в `.stk-h2` и равна 26 знакам в строке. Прежние
 * `max-w-[20ch]` в разметке ломали двенадцать заголовков в четыре рваные
 * строки: мера должна ограничивать длину строки, а не гнать заголовок вниз.
 * `col` снимает меру там, где ширину и без того держит узкая колонка.
 */
function Head({
  eyebrow,
  title,
  col,
}: {
  eyebrow?: string;
  title: string;
  col?: boolean;
}) {
  return (
    <Appear>
      {eyebrow && <p className="stk-eyebrow mb-6">{eyebrow}</p>}
      <h2 className={`stk-h2 ${col ? "stk-h2-col" : ""}`}>{title}</h2>
    </Appear>
  );
}

/**
 * Показание: подпись, крупное число, названная величина вплотную к нему.
 *
 * `right` выравнивает подпись и число по одной правой оси. Без него показание
 * у правого края панели съезжало: подпись длиннее числа, и «0 ₽» повисало под
 * левым краем слов «стоимость теста».
 */
function Rd({
  cap,
  n,
  u,
  size = 48,
  tone,
  right,
}: {
  cap: string;
  n: string;
  u?: string;
  size?: number;
  tone?: string;
  right?: boolean;
}) {
  return (
    <div className={right ? "rd-r" : undefined}>
      <p className="rd" style={{ ["--rd" as string]: `${size}px`, color: tone }}>
        <span className="rd-n">{n}</span>
        {u && <span className="rd-u">{u}</span>}
      </p>
      <span className="rd-cap">{cap}</span>
    </div>
  );
}

/**
 * Знак подтверждения.
 *
 * Рисуется разметкой, а не символом «✓». В гарнитуре страницы этого символа
 * нет, браузер подставлял его из первого попавшегося системного шрифта — с
 * чужим весом, наклоном и базовой линией. Здесь у него та же толщина штриха,
 * что у остальной графики страницы.
 */
function Tick() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
      <path
        d="M6 10.2 8.8 13 14 7.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Пункт на рельсе процесса. */
function RailItem({ n, t, d }: { n: number; t: string; d?: string }) {
  return (
    <li className="rail-i">
      <span className="idx">{n}</span>
      <h3 className="stk-h3 mt-2">{t}</h3>
      {d && <p className="stk-sm mt-2.5 max-w-[46ch] leading-relaxed">{d}</p>}
    </li>
  );
}

/* ─────────────────────────── СТРАНИЦА ─────────────────────────── */

export default async function StackPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const rawAngle = typeof sp.angle === "string" ? sp.angle : undefined;
  const v = resolveHeroVariant(rawAngle);

  return (
    <div className="stk">
      <Schema
        faq={STACK_FAQ_FOR_SCHEMA}
        offers={null}
        service={{
          name: "Topinjector — второй ПФ-инструмент для контрольного теста",
          description: DESCRIPTION,
          url: "https://topinjector.ru/stack",
        }}
      />

      <StackAnalytics landingVariant={v.angle} />
      <ReadingProgress />
      <LandingNav />

      <main id="main" tabIndex={-1}>
        {/* ─────────────────── 1. ПЕРВЫЙ ЭКРАН ─────────────────── */}
        <section className="stk-w pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <Appear>
                {/*
                  Кикер варианта приходит из бренд-констант прописными. Здесь
                  он приводится к строчным: прописная разрядка — самый
                  узнаваемый почерк шаблонного лендинга, а назвать раздел
                  строчная метка умеет ничуть не хуже.
                */}
                <p className="stk-eyebrow mb-7">{v.eyebrow.toLowerCase()}</p>
                <h1 className="stk-h1">{v.h1}</h1>
                <p className="stk-lead mt-8">{v.subtitle}</p>
              </Appear>

              <Appear delay={0.08}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <StackCta ctaId="hero" event="hero_cta_click">
                    {v.cta}
                  </StackCta>
                  <a
                    href="#controlled-test"
                    className="text-[18px] font-medium text-[var(--t-1)] underline
                      decoration-[var(--hair-2)] underline-offset-[6px] transition-colors
                      hover:text-[var(--t-0)] hover:decoration-[var(--t-2)]"
                  >
                    Посмотреть, как проходит тест
                  </a>
                </div>
                <p className="stk-sm mt-7 max-w-[44ch] text-[17px] leading-relaxed">{HERO_MICRO}</p>
              </Appear>
            </div>

            {/*
              ПАНЕЛЬ ВМЕСТО ИЛЛЮСТРАЦИИ.

              Утверждение заголовка показано состоянием стека: первое
              помечено рабочим, второе — на проверке, рядом стоит бесплатный
              объём как число с названной величиной.

              Метки состояния стоят в отдельной колонке фиксированной ширины
              и растянуты на неё целиком. Раньше каждая метка сжималась по
              своему тексту, «работает» выходила уже, чем «на проверке», и
              правый край строк ходил туда-сюда — три соседние строки одной
              таблицы читались как три разных элемента.
            */}
            <Appear delay={0.14}>
              <div className="surf p-7 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[17px] font-medium text-[var(--t-0)]">
                    SEO-стек специалиста
                  </span>
                  <span className="tag tag-mute">схема</span>
                </div>

                <ul className="mt-7 flex flex-col gap-3">
                  {[
                    { t: "Текущий ПФ-инструмент", s: "остаётся в рабочих задачах", tag: "работает", grn: true },
                    { t: "Аналитика, ссылки, мониторинг", s: "не меняются", tag: "работает", grn: true },
                    { t: "TopInjector", s: "ограниченный контрольный тест", tag: "на проверке", grn: false },
                  ].map((row) => (
                    <li
                      key={row.t}
                      className="well grid grid-cols-[1fr_7.5rem] items-center gap-4 px-5 py-4"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[17px] font-medium text-[var(--t-0)]">
                          {row.t}
                        </span>
                        <span className="stk-sm mt-1 block truncate text-[15px]">{row.s}</span>
                      </span>
                      <span className={`tag w-full ${row.grn ? "tag-grn" : ""}`}>{row.tag}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[var(--hair)] pt-7">
                  <Rd cap="на первый тест" n="3000" u="кликов" size={42} />
                  <Rd cap="стоимость теста" n="0" u="₽" size={42} tone="var(--grn)" right />
                </div>

                <p className="caveat mt-6">{HERO_OFFER_NOTE}</p>
              </div>
            </Appear>
          </div>
        </section>

        {/* ─────────────────── 2. НОВЫЙ КРИТЕРИЙ ─────────────────── */}
        <Sec id="new-criterion" sink>
          <Head
            eyebrow="новый критерий"
            title="Вопрос не в том, какой ПФ «лучший». Вопрос — какой полезен в вашем сценарии."
          />

          <div className="mt-14 grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <Appear delay={0.06}>
              <p className="stk-p">
                SEO-специалист редко строит весь рабочий процесс вокруг одного инструмента. Для
                аналитики могут использоваться несколько систем. Для ссылок — несколько
                источников. Для мониторинга — несколько решений.
              </p>
              <p className="stk-p mt-6">
                Но ПФ легко превращается в исключение: «Вот мой сервис. Я им пользуюсь». Пока всё
                работает, это не проблема. Проблема появляется, когда единственный рабочий сценарий
                перестаёт давать нужный результат — а другого проверенного варианта у вас просто
                нет.
              </p>
              <p className="claim mt-9">
                Преимущество не в том, чтобы заранее найти один сервис «навсегда», а в том, чтобы
                выбирать инструмент под задачу.
              </p>
            </Appear>

            {/*
              ДВА СЦЕНАРИЯ РЯДОМ, А НЕ ДВЕ ОДИНАКОВЫЕ КОЛОНКИ.

              Смысл блока — что у второго пути есть развилка, а у первого её
              нет: левая цепочка обрывается вынужденным поиском, правая
              доходит до решения и помечена янтарём.

              Замечание под парой набрано на всю ширину пары. Раньше оно
              стояло по левому краю левой карточки и обрывалось задолго до
              правого края — читалось подписью к одной карточке, хотя
              относится к обеим.
            */}
            <Appear delay={0.12}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="surf p-7">
                  <p className="stk-eyebrow mb-7">один инструмент</p>
                  <ol className="rail flex flex-col gap-5">
                    {[
                      "Один известный сценарий",
                      "Подходит — используем",
                      "Не подходит — ищем альтернативу срочно",
                    ].map((s, i) => (
                      <li key={s} className="rail-i text-[16px] leading-snug text-[var(--t-1)]">
                        <span className="idx mr-2.5">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="surf p-7">
                  <p className="stk-eyebrow mb-7">несколько проверенных</p>
                  <ol className="rail flex flex-col gap-5">
                    {[
                      "Есть выбор",
                      "Проверяем ситуацию",
                      "Выбираем сценарий",
                      "Наблюдаем",
                      "Принимаем решение",
                    ].map((s, i, arr) => (
                      <li
                        key={s}
                        className={`rail-i text-[16px] leading-snug ${
                          i === arr.length - 1
                            ? "font-medium text-[var(--amb)]"
                            : "text-[var(--t-1)]"
                        }`}
                      >
                        <span className="idx mr-2.5">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <p className="stk-sm mt-7 text-[17px] leading-relaxed">
                Ваш текущий ПФ может быть хорошим инструментом. Второй нужен не потому, что первый
                плохой, — а потому, что выбор сам по себе повышает управляемость.
              </p>
            </Appear>
          </div>
        </Sec>

        {/* ─────────────────── 3. ЧТО ДАЁТ ВТОРОЙ СЦЕНАРИЙ ─────────────────── */}
        <Sec id="practical-consequence">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            {/* Заголовок держится, пока идёт перечень: видно, к чему относится
                то, что читаешь. Точка закрепления общая для всей страницы. */}
            <div className="stk-stick">
              <Head eyebrow="что даёт второй сценарий" title="Вы получаете не ещё один кабинет, а больше вариантов действия" col />
              <Appear delay={0.06}>
                <p className="claim mt-9">
                  Хороший стек не обещает, что один инструмент решит всё. Он даёт специалисту больше
                  решений.
                </p>
              </Appear>
            </div>

            <ol className="flex flex-col">
              {[
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
              ].map((c, i) => (
                <Appear key={c.t} delay={Math.min(i, 4) * 0.05}>
                  <li className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-[var(--hair)] py-7">
                    <span className="idx pt-1.5">{i + 1}</span>
                    <div>
                      <h3 className="stk-h3 text-[22px]">{c.t}</h3>
                      <p className="stk-sm mt-3 max-w-[52ch] text-[17px] leading-relaxed">{c.d}</p>
                    </div>
                  </li>
                </Appear>
              ))}
            </ol>
          </div>
        </Sec>

        {/* ─────────────────── 4. ПРОВЕРИТЬ, А НЕ ПЕРЕХОДИТЬ ─────────────────── */}
        <Sec id="product-bridge" sink>
          <Head
            eyebrow="проверить, а не переходить"
            title="Сервис сначала должен заслужить место в вашем стеке"
          />

          {/* Обе колонки выровнены по верхней линии: раньше правая карточка
              центрировалась по высоте левой и её верхний край висел ниже
              первой строки текста. */}
          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Appear delay={0.06}>
              <p className="stk-lead">
                Первый шаг — не миграция. И не попытка доказать что-то на максимально сложном
                запросе. Первый шаг: контрольный тест на задаче, где результат можно объективно
                измерить.
              </p>
              <p className="claim mt-9">
                Новый инструмент не должен получать доверие авансом. Он должен его заработать на
                ваших данных.
              </p>
              <div className="mt-10">
                <StackCta ctaId="product_bridge">Получить 3000 кликов для теста</StackCta>
                {/* Подпись говорит, что этого объёма хватает на конкретное
                    действие, а не пересказывает слово «бесплатно». */}
                <p className="stk-sm mt-5 max-w-[42ch] text-[17px] leading-relaxed">
                  Этого объёма хватает на полный цикл: выбрать запрос, запустить и увидеть динамику
                  по дням.
                </p>
              </div>
            </Appear>

            <Appear delay={0.12}>
              <div className="surf p-7 sm:p-9">
                <p className="stk-eyebrow mb-8">как выглядит логика</p>
                <ol className="rail flex flex-col gap-6">
                  {[
                    "Выберите измеримый запрос",
                    "Зафиксируйте baseline",
                    "Определите, что будете оценивать",
                    "Запустите тест",
                    "Наблюдайте динамику",
                    "Сделайте собственный вывод",
                  ].map((s, i, arr) => (
                    <li
                      key={s}
                      className={`rail-i text-[17px] leading-snug ${
                        i === arr.length - 1
                          ? "font-medium text-[var(--amb)]"
                          : "text-[var(--t-1)]"
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </Appear>
          </div>
        </Sec>

        {/* ─────────────────── 5. ЧТО ИМЕННО ДАЁТ СЕРВИС ─────────────────── */}
        <Sec id="product">
          <Head eyebrow="что именно даёт сервис" title="Второй ПФ-инструмент в вашем рабочем стеке" />
          <Appear delay={0.06}>
            <p className="stk-p mt-8">{STACK_PRODUCT_INTRO}</p>
          </Appear>

          {/*
            ПОДСЕТКА ВЫРАВНИВАЕТ ЯРУСЫ КАРТОЧЕК.

            У первой карточки заголовок в две строки, у второй — в одну, и
            описания под ними стояли на разной высоте: четыре карточки в ряд
            читались съехавшими. `grid-template-rows: subgrid` заставляет
            номер, заголовок и описание всех четырёх карточек стоять на общих
            горизонталях — независимо от того, сколько строк занял заголовок.
          */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_1fr]">
            {STACK_PRODUCT_POINTS.map((c, i) => (
              <Appear key={c.t} delay={i * 0.06} className="lg:row-span-3 lg:grid lg:grid-rows-subgrid">
                <div className="surf surf-i grid h-full grid-rows-[auto_auto_1fr] gap-y-4 p-7 lg:row-span-3 lg:grid-rows-subgrid">
                  <span className="idx">{i + 1}</span>
                  <h3 className="stk-h3 text-[20px]">{c.t}</h3>
                  <p className="stk-sm text-[16px] leading-relaxed">{c.d}</p>
                </div>
              </Appear>
            ))}
          </div>
        </Sec>

        {/* ─────────────────── 6. КОНТРОЛЬНЫЙ ТЕСТ ─────────────────── */}
        <Sec id="controlled-test" sink>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="stk-stick">
              <Head
                eyebrow="контрольный тест"
                title="Сначала создайте условия, в которых результат можно оценить"
                col
              />
              <Appear delay={0.06}>
                {/* Тире из исходной фразы убрано: на этой мере оно вставало в
                    конец строки и разрывало утверждение пополам. */}
                <p className="claim mt-9">{STACK_MECHANIC_HIGHLIGHT.replace(" — ", ". ")}</p>
                <p className="todo mt-8">{STACK_MECHANIC_PENDING}</p>
              </Appear>
            </div>

            <Appear delay={0.1}>
              <ol className="rail flex flex-col gap-8">
                {STACK_MECHANIC.map((s, i) => (
                  <RailItem key={s.t} n={i + 1} t={s.t} d={s.d} />
                ))}
              </ol>
            </Appear>
          </div>
        </Sec>

        {/* ─────────────────── 7. ИНТЕРФЕЙС ─────────────────── */}
        <Sec id="interface">
          <Head
            eyebrow="рабочий инструмент"
            title="Посмотрите на сервис до того, как запускать тест"
          />

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
            <Appear className="flex flex-col">
              {[
                { t: "Специалист задаёт", d: "Проект, регион, группу запросов и объём теста." },
                { t: "Специалист контролирует", d: "Статус запуска и расходование тестовых кликов." },
                { t: "Специалист видит", d: "Позиции и динамику по дням." },
              ].map((a) => (
                <div key={a.t} className="border-t border-[var(--hair)] py-6">
                  <h3 className="stk-h3">{a.t}</h3>
                  <p className="stk-sm mt-2.5 max-w-[34ch] text-[17px] leading-relaxed">{a.d}</p>
                </div>
              ))}
              <p className="todo mt-8">
                Показанный экран — иллюстративная схема, не скриншот. Четыре реальных экрана
                кабинета ждут продакшн-сборки.
              </p>
            </Appear>

            <Appear delay={0.1}>
              <AppPreview />
            </Appear>
          </div>
        </Sec>

        {/* ─────────────────── 8. 3000 КЛИКОВ ─────────────────── */}
        {/*
          ЕДИНСТВЕННЫЙ ВЫДЕЛЕННЫЙ БЛОК СТРАНИЦЫ. Пересобран заново.

          Что было не так. Двухколоночная раскладка ставила кнопку по левому
          краю своей ячейки, а перечень справа — по своему; между двумя
          короткими строками шага и следующим шагом зияла четверть экрана,
          и три ячейки одинаковой ширины при разной длине текста читались
          дырявыми. Плюс зелёная полоса по ребру, которая называла блок
          выделенным вместо того, чтобы он им был.

          Что стало. Одна ось: всё выключено влево от одной вертикали.
          Наверху — само предложение одной фразой, «3000 кликов за 0 ₽»,
          крупнейшим кеглем страницы: два отдельных показания рядом читались
          двумя независимыми фактами, и бесплатность приходилось складывать
          самому. Под ней действие. Ниже — три шага плотной строкой и то, что
          тест даёт на самом деле, двумя колонками равной высоты.
        */}
        <Sec id="free-clicks">
          <Appear>
            <div className="offer p-8 sm:p-10 lg:p-14">
              <p className="stk-eyebrow mb-8">первый запуск без оплаты</p>

              <p
                className="rd"
                style={{ ["--rd" as string]: "clamp(46px, 5.4vw, 82px)" }}
              >
                <span className="rd-n text-[var(--grn)]">3000</span>
                <span className="rd-u text-[var(--grn)]">кликов</span>
                <span className="rd-sep">за</span>
                <span className="rd-n">0</span>
                <span className="rd-u">₽</span>
              </p>

              <p className="stk-lead mt-9 max-w-[54ch]">
                Бесплатный объём нужен не для того, чтобы собрать больше регистраций. Его функция —
                дать возможность познакомиться с рабочим циклом и провести первый измеримый тест.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <StackCta ctaId="free_clicks">Получить 3000 тестовых кликов</StackCta>
                <p className="stk-sm max-w-[34ch] text-[17px] leading-relaxed">
                  Через Telegram-бота, после проверки подписки на канал {TELEGRAM.channelName}.
                </p>
              </div>

              {/* Три шага плотной строкой: номер и заголовок в одну линию,
                  пояснение под ними. Прежние ячейки с большими полями
                  растягивали два слова на четверть экрана. */}
              <ol className="mt-14 grid gap-x-10 gap-y-8 border-t border-[var(--hair)] pt-10 sm:grid-cols-3">
                {[
                  {
                    t: "Запустите Telegram-бота",
                    d: "Бот свяжет Telegram с вашим аккаунтом TopInjector.",
                  },
                  {
                    t: "Подпишитесь на канал",
                    d: "Кейсы, разборы удачных и неудачных запусков, рекомендации по выбору запросов.",
                  },
                  {
                    t: "Получите 3000 кликов",
                    d: "Бот проверит подписку и начислит бесплатный объём для первого теста.",
                  },
                ].map((s2, i) => (
                  <li key={s2.t}>
                    <h3 className="stk-h3 flex items-baseline gap-3 text-[20px]">
                      <span className="idx">{i + 1}</span>
                      {s2.t}
                    </h3>
                    <p className="stk-sm mt-2.5 text-[17px] leading-relaxed">{s2.d}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-12 border-t border-[var(--hair)] pt-10">
                <p className="stk-sm mb-1 text-[17px]">
                  Бесплатный тест — это не обещание результата, а:
                </p>
                {/* Один столбец. В двух пять пунктов ложились через строку —
                    первый слева, второй справа, третий снова слева, — и
                    линейки соседних столбцов вставали на разной высоте: пять
                    строк одного перечня читались двумя разными списками. */}
                <ul>
                  {[
                    "реальный опыт",
                    "реальные данные",
                    "понимание интерфейса",
                    "понимание рабочего сценария",
                    "основание решить, нужен ли второй инструмент",
                  ].map((g) => (
                    <li key={g} className="tick">
                      <Tick />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Appear>
        </Sec>

        {/* ─────────────────── 9. ПАРАЛЛЕЛЬНОЕ ИСПОЛЬЗОВАНИЕ ─────────────────── */}
        {/*
          Короткий блок собран одной осью по центру.

          Было хуже всего именно смешение: заголовок по центру, абзац влево,
          утверждение с янтарной чертой слева — эта черта работает врезкой
          внутри текстовой колонки, а посреди центрованного блока читалась
          ярлыком, приклеенным сбоку. Здесь врезки нет: выделение делает кегль,
          вес и основные чернила, и вся секция стоит на одной вертикальной оси.
        */}
        <Sec id="parallel-use" sink>
          <div className="mx-auto flex max-w-[60ch] flex-col items-center text-center">
            <Appear>
              <h2 className="stk-h2 stk-h2-col">
                Текущий ПФ может остаться там, где уже работает
              </h2>
              <p className="stk-p mx-auto mt-9 max-w-[58ch]">{STACK_PARALLEL_INTRO}</p>
            </Appear>
            <Appear delay={0.08}>
              <p className="stk-lead mx-auto mt-10 max-w-[46ch] font-medium text-[var(--t-0)]">
                {STACK_PARALLEL_HIGHLIGHT}
              </p>
              <div className="mt-11 flex justify-center">
                <StackCta ctaId="parallel_use">Добавить второй инструмент</StackCta>
              </div>
            </Appear>
          </div>
        </Sec>

        {/* ─────────────────── 10. КОНТРОЛЬ И ОГРАНИЧЕНИЯ ─────────────────── */}
        <Sec id="safety">
          <Head
            eyebrow="вопрос до запуска, а не после"
            title="До запуска нужно понимать не только результат, но и ограничения"
          />

          <Appear delay={0.06}>
            <p className="stk-p mt-8">{STACK_SAFETY_INTRO}</p>
          </Appear>

          {/*
            ПЕРЕЧЕНЬ ВОПРОСОВ, А НЕ СЕМЬ ЗАГЛУШЕК.

            Раньше справа стояло «ответ готовится» — строка, которая ничего не
            объясняла: непонятно, кто готовит и почему ответа нет. Теперь
            состояние поля названо тем, чем оно является («формулируем»), а
            над списком стоит фраза, которая объясняет, почему семь вопросов
            опубликованы раньше ответов. Открыто показать, что именно не
            зафиксировано, — часть того же обещания честности, ради которого
            написана вся страница.
          */}
          <Appear delay={0.12}>
            <p className="stk-sm mt-9 max-w-[62ch] text-[17px] leading-relaxed">
              Вот вопросы, на которые специалист обязан получить ответ до первого запуска.
              Формулировки согласуются с продуктовой командой — мы публикуем их только тогда, когда
              за каждой стоит проверенное поведение сервиса.
            </p>
            <dl className="mt-8 border-t border-[var(--hair-2)]">
              {STACK_SAFETY_QUESTIONS.map((q, i) => (
                <div key={q} className="spec">
                  <dt className="spec-k">
                    <span>
                      <span className="idx mr-4">{i + 1}</span>
                      {q}
                    </span>
                  </dt>
                  <dd className="stk-sm text-[15px] text-[var(--amb)]">формулируем</dd>
                </div>
              ))}
            </dl>
          </Appear>

          <Appear delay={0.18}>
            <p className="claim mt-12">{STACK_SAFETY_HIGHLIGHT}</p>
          </Appear>
        </Sec>

        {/* ─────────────────── 11. НАБЛЮДАЕМЫЕ РЕЗУЛЬТАТЫ ─────────────────── */}
        <Sec id="cases" sink>
          <Head
            eyebrow="контекст важнее красивой цифры"
            title="Результаты, которые мы уже наблюдали"
          />
          <Appear delay={0.06}>
            <p className="stk-p mt-8">
              Это не обещание, что любой новый тест повторит тот же путь. Кейсы нужны для другого —
              показать, что сервис способен давать значимую динамику в реальных задачах. Дальше
              нужны ваши собственные данные.
            </p>
          </Appear>

          {/*
            КЕЙС ЧИТАЕТСЯ КАК ПОКАЗАНИЕ.

            Измеряемая величина — срок: именно его продаёт продукт («ранний
            результат»), именно он подтверждается наблюдением. Он набран
            крупно, с названной единицей и склонением по числу.

            Движение позиции показано парой: откуда — мелко и приглушённо,
            куда — крупно и белым. Раньше обе половины стояли одним кеглем, и
            «ТОП-1» — самая громкая и наименее проверяемая часть — терялась
            рядом с «за пределами ТОП-20».

            Оговорка стоит внутри карточки, у числа, а не абзацем ниже: приём
            Our World in Data, где подпись несёт выборку и её границы, поэтому
            порядок чтения перестаёт решать за читателя, во что верить.
          */}
          <div className="mt-14 grid gap-4 sm:grid-cols-3 sm:grid-rows-[auto_auto_auto_1fr]">
            {STACK_CASES.map((c, i) => (
              <Appear key={c.query} delay={i * 0.07} className="sm:row-span-4 sm:grid sm:grid-rows-subgrid">
                <div className="surf surf-i grid h-full grid-rows-[auto_auto_auto_1fr] gap-y-7 p-7 sm:row-span-4 sm:grid-rows-subgrid">
                  <p className="text-[17px] leading-snug font-medium text-[var(--t-0)]">{c.query}</p>

                  <Rd
                    cap="результат получен за"
                    n={String(c.days)}
                    u={plural(c.days, "день", "дня", "дней")}
                    size={52}
                    tone="var(--amb)"
                  />

                  {/*
                    Стрелка направлена ВВЕРХ. Позиция «за пределами ТОП-20 →
                    ТОП-1» — это рост, а вниз ехало число в таблице: стрелка
                    вниз читалась падением ровно там, где показан лучший
                    результат страницы.

                    Нарисована разметкой, а не символом «↑»: этого знака нет в
                    гарнитуре страницы, браузер подставлял его из системного
                    шрифта — с чужой толщиной и высотой.
                  */}
                  <div className="well px-5 py-4">
                    <p className="stk-sm text-[15px]">{c.before}</p>
                    <p className="mt-2 flex items-center gap-2.5">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-[var(--amb)]"
                      >
                        <path
                          d="M8 13.5v-11M3.5 6.5 8 2l4.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[28px] leading-none font-bold tracking-[-0.03em] text-[var(--t-0)]">
                        {c.after}
                      </span>
                    </p>
                  </div>

                  <p className="caveat self-end">Уточняются: {c.unconfirmed}.</p>
                </div>
              </Appear>
            ))}
          </div>

          <Appear delay={0.24}>
            <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <p className="stk-p max-w-[52ch]">{STACK_CASES_CONCLUSION}</p>
              <div className="shrink-0">
                <StackCta ctaId="cases">Получить 3000 кликов для своего теста</StackCta>
              </div>
            </div>
          </Appear>
        </Sec>

        {/* ─────────────────── 12. ЭКОНОМИКА ─────────────────── */}
        <Sec id="calculator">
          <Head
            eyebrow="оплата за клик"
            title="Считайте не «цену сервиса», а стоимость собственного сценария"
          />
          <Appear delay={0.06}>
            <p className="stk-p mt-8">{STACK_ECONOMICS_INTRO}</p>
          </Appear>

          <div className="mt-14">
            <StackCalculator />
          </div>

          {/*
            Сравнение после теста — часть предложения, а не служебная таблица.
            Поэтому оно стоит на поднятой поверхности с собственным
            заголовком, а не безымянной подписью над сеткой.
          */}
          <Appear delay={0.12}>
            <div className="surf mt-14 p-8 sm:p-10">
              <h3 className="stk-h3 text-[24px]">После первого теста сравните сами</h3>
              <p className="stk-sm mt-3 max-w-[54ch] text-[17px] leading-relaxed">
                Цифры не заполняются за вас: в правый столбец вы вносите то, что показал ваш
                собственный запуск.
              </p>
              <CompareTable rows={STACK_COMPARE_ROWS} />
            </div>
          </Appear>

          <Appear delay={0.18}>
            <div className="mt-12">
              <StackCta ctaId="calculator" above="Сначала протестировать бесплатно">
                Получить 3000 тестовых кликов
              </StackCta>
            </div>
          </Appear>
        </Sec>

        {/* ─────────────────── 13. ТАРИФНАЯ ЛОГИКА ─────────────────── */}
        {/*
          Спецификация вынесена под заголовок на всю ширину. В двух колонках
          её первая линейка вставала вровень с верхом заголовка, и левый
          столбец с «единицей оплаты» читался подписью к первой строке
          таблицы, а не отдельным утверждением.
        */}
        <Sec id="pricing" sink>
          <Head eyebrow="тарифы" title="Понимайте заранее, за что платите после теста" />

          <Appear delay={0.06}>
            <p className="claim mt-9">{STACK_TARIFF_UNIT}</p>
            <p className="stk-p mt-7">{STACK_TARIFF_COPY}</p>
          </Appear>

          <Appear delay={0.12}>
            <dl className="mt-12 border-t border-[var(--hair-2)]">
              {STACK_TARIFF_PENDING_FIELDS.map((f, i) => (
                <div key={f} className="spec">
                  <dt className="spec-k">
                    <span>
                      <span className="idx mr-4">{i + 1}</span>
                      {f}
                    </span>
                  </dt>
                  <dd className="stk-sm text-[15px] text-[var(--amb)]">уточняется</dd>
                </div>
              ))}
            </dl>
          </Appear>
        </Sec>

        {/* ─────────────────── 14. ДЛЯ КОГО ─────────────────── */}
        {/*
          Пять пунктов в одну колонку. В двух колонках слева оказывалось три
          пункта, справа два, и пустая ячейка внизу справа читалась дырой в
          вёрстке. Нечётное число пунктов — это свойство содержимого, и проще
          принять его, чем растягивать последний пункт на две колонки.
        */}
        <Sec id="fit">
          <div className="grid gap-12 lg:grid-cols-[0.66fr_1.34fr] lg:gap-16">
            <div className="stk-stick">
              <Head title="Кому этот сценарий подходит" col />
            </div>

            <div>
              <ul className="border-b border-[var(--hair)]">
                {STACK_FIT.map((t, i) => (
                  <Appear key={t} delay={Math.min(i, 5) * 0.05}>
                    <li className="tick">
                      <Tick />
                      {t}
                    </li>
                  </Appear>
                ))}
              </ul>

              <Appear delay={0.2}>
                <p className="todo mt-10">
                  Сценарии, в которых сервис не подходит, ещё не зафиксированы продуктовой
                  командой.
                </p>
              </Appear>
            </div>
          </div>
        </Sec>

        {/* ─────────────────── 15. FAQ ─────────────────── */}
        <Sec id="faq" sink>
          <div className="grid gap-12 lg:grid-cols-[0.66fr_1.34fr] lg:gap-16">
            <div className="stk-stick">
              <Head eyebrow="вопросы" title="Перед первым тестом" col />
            </div>
            <Faq items={STACK_FAQ.map((f) => ({ q: f.q, a: f.a }))} plain />
          </div>
        </Sec>

        {/* ─────────────────── 16. ФИНАЛ ─────────────────── */}
        {/*
          Финал собран одной осью по центру — как и блок параллельного
          использования, потому что задача у него та же: одно утверждение и
          одно действие.

          Прежняя раскладка ставила заголовок во всю ширину, два абзаца в
          левую колонку, а две кнопки — в правую, на высоте первой строки
          текста. Кнопки оказывались не под тем, что они завершают, а сбоку от
          середины абзаца, и между ними и заголовком висела пустая половина
          полосы.
        */}
        <Sec id="final" className="pb-32 sm:pb-40">
          <div className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
            <Appear>
              <p className="stk-eyebrow mb-7">не миграция. собственный тест.</p>
              <h2 className="stk-h1 stk-h1-col">
                Новый инструмент должен доказать, что заслуживает места в стеке
              </h2>
            </Appear>

            <Appear delay={0.06}>
              <p className="stk-lead mx-auto mt-10 max-w-[54ch]">
                Не переносите проекты. Не меняйте то, что уже работает. Не выбирайте самый сложный
                запрос ради «экзамена».
              </p>
              <p className="stk-lead mx-auto mt-7 max-w-[54ch] text-[var(--t-0)]">
                Выберите измеримую задачу. Зафиксируйте исходную точку. Получите 3000 тестовых
                кликов. Запустите тест.
              </p>
            </Appear>

            <Appear delay={0.12}>
              <div className="mt-11 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <StackCta ctaId="final">Получить 3000 тестовых кликов</StackCta>
                <a href="#calculator" className="btn btn-secondary btn-lg">
                  Рассчитать стоимость объёма
                </a>
              </div>
              <p className="stk-sm mx-auto mt-8 max-w-[52ch] text-[17px] leading-relaxed">
                {STACK_FINAL_HIGHLIGHT}
              </p>
            </Appear>
          </div>

          {PENDING && (
            <Appear delay={0.2}>
              <p className="caveat mt-20 border-t border-[var(--hair)] pt-7 text-center">
                {DISCLAIMER}
              </p>
            </Appear>
          )}
        </Sec>
      </main>

      <LandingFooter signupUrl={SIGNUP_URL} />
      <MobileCta />
    </div>
  );
}
