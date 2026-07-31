import type { Metadata } from "next";
import Link from "next/link";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta, Kicker } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { MarginCalc } from "@/components/margin-calc";
import { RankRail } from "@/components/rank-rail";

export const metadata: Metadata = {
  title: "Партнёрам: продвижение под вашим брендом",
  description:
    "Подключайте клиентов к поведенческим сигналам под своим брендом. Закупка по оптовой цене, ваш чек и ваша маржа, отчёты без упоминания сервиса.",
};

const NAV_LINKS = [
  { label: "Экономика", href: "#economics" },
  { label: "Инструменты", href: "#tools" },
  { label: "Риски", href: "#risks" },
  { label: "Вопросы", href: "#faq" },
];

const AUDIENCE = [
  {
    role: "SEO-специалисты",
    body: "Добавляете к своей работе рычаг, который двигает позиции за дни, и удерживаете клиента дольше первого квартала.",
    figure: "×2",
    note: "средний срок жизни клиента",
  },
  {
    role: "Агентства и веб-студии",
    body: "Продаёте новую услугу текущей базе без найма людей и без переписывания договоров.",
    figure: "00",
    note: "новых сотрудников в штат",
  },
  {
    role: "Директологи и маркетологи",
    body: "Приводите клиенту органику рядом с платным трафиком и снимаете зависимость от роста ставок.",
    figure: "68",
    note: "процентов маржи в среднем",
  },
];

const TOOLS = [
  {
    t: "Клиент не видит сервис",
    d: "Никаких упоминаний TopInjector в кабинете клиента, письмах и выгрузках. Договор и счета остаются между вами и заказчиком.",
  },
  {
    t: "Отчёты под вашим логотипом",
    d: "Выгрузка динамики позиций в PDF и XLSX с вашими цветами и подписью. Готово к отправке заказчику без правок.",
  },
  {
    t: "Один кабинет на всех клиентов",
    d: "Проекты разделены, бюджеты и лимиты отдельно по каждому. Доступ команде выдаётся по ролям.",
  },
];

const RISKS = [
  {
    t: "Говорите про метод честно",
    d: "Поведенческие сигналы, быстрый эффект, серая зона. Обтекаемые формулировки про продвижение по технологии ИИ рушат доверие, когда клиент гуглит термин.",
  },
  {
    t: "Не продавайте это как всё SEO",
    d: "Позиционируйте как ускоритель поверх базовой оптимизации. Если убрать инструмент, часть позиций откатится, и клиент должен знать это заранее.",
  },
  {
    t: "Фиксируйте ожидания письменно",
    d: "Диапазон сроков, а не точная дата ТОП-1. В кабинете есть шаблон формулировок для коммерческого предложения.",
  },
];

const FAQ = [
  {
    q: "Что говорить клиенту про метод?",
    a: "Мы рекомендуем говорить прямо: это работа с поведенческими сигналами, она относится к серым методам и даёт быстрый, но поддерживаемый результат. Опыт партнёров показывает, что заказчики спокойнее реагируют на честное объяснение, чем на обтекаемое продвижение по технологии ИИ. В кабинете есть готовая формулировка для коммерческого предложения.",
  },
  {
    q: "Какие риски я беру на себя?",
    a: "Основной риск в том, что поисковик может не засчитать часть сигналов, и тогда рост окажется медленнее обещанного клиенту. Санкции за поведенческие факторы обычно затрагивают отдельные запросы, а не весь сайт, но полностью исключить реакцию нельзя. Поэтому мы советуем не строить клиенту весь прогноз только на нашем инструменте и держать классическое SEO рядом.",
  },
  {
    q: "Какая закупочная цена?",
    a: "Зависит от суммарного объёма по всем вашим проектам: чем больше переходов в месяц, тем ниже ставка. Первый уровень доступен сразу после регистрации, дальше цена снижается автоматически. Точную сетку присылаем после короткого разговора о ваших объёмах.",
  },
  {
    q: "Нужен ли доступ к сайту клиента?",
    a: "Нет. Достаточно домена и списка запросов. Это снимает часть согласований с заказчиком и позволяет запуститься в тот же день.",
  },
  {
    q: "Как оплачивать, если я работаю с юрлицами?",
    a: "Работаем по безналу с закрывающими документами. Баланс общий на все проекты, распределяете его между клиентами сами.",
  },
];

export default function ProLanding() {
  return (
    <div className="heat-ramp">
      <RankRail ctaHref="#start" ctaLabel="Стать партнёром" />

      <div className="zone-cold">
        <Nav
          links={NAV_LINKS}
          crossLink={{ label: "Для бизнеса", href: "/" }}
          ctaLabel="Стать партнёром"
          ctaHref="#start"
        />
      </div>

      <main id="main" tabIndex={-1}>
        {/* COLD. Type-led opening, deliberately unlike the business page. */}
        <section className="zone-cold px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <Kicker>партнёрская программа</Kicker>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 max-w-[14ch] text-[42px] sm:text-[64px] lg:text-[80px]">
                Продавайте позиции <span className="text-[var(--hot)]">под своим</span> брендом
              </h1>
            </Reveal>

            <div className="mt-12 grid gap-10 border-t border-[var(--rule)] pt-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
              <Reveal delay={0.12}>
                <p className="max-w-[46ch] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
                  Закупаете по оптовой цене, продаёте по своей. Клиент видит ваш отчёт
                  и ваш логотип, а не наш.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Cta href="#start">Стать партнёром</Cta>
                  <Link
                    href="#economics"
                    className="rounded-[var(--radius-pill)] border border-[var(--rule)] px-6
                      py-3.5 text-center text-[15px] font-semibold text-[var(--ink)]
                      [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro)] hover:border-[var(--ink)]"
                  >
                    Посчитать маржу
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.18} className="shrink-0">
                <div className="flex items-baseline gap-3">
                  <span className="num text-[64px] leading-none font-semibold sm:text-[84px]">
                    68
                  </span>
                  <span className="num text-[24px] text-[var(--hot)]">%</span>
                </div>
                <p className="label mt-3 text-[var(--ink-faint)]">
                  средняя маржа партнёра
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Roles as a bank of readings. */}
        <section className="zone-warm px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[16ch] text-[32px] sm:text-[46px]">Кому это считается</h2>
            </Reveal>

            <div className="mt-16 border-t border-[var(--rule)]">
              {AUDIENCE.map((a, i) => (
                <Reveal key={a.role} delay={i * 0.06}>
                  <article className="grid items-baseline gap-4 border-b border-[var(--rule-soft)] py-8 sm:grid-cols-[auto_1fr_1.5fr] sm:gap-10">
                    <div>
                      <span className="num text-[34px] leading-none font-semibold sm:text-[42px]">
                        {a.figure}
                      </span>
                      <p className="label mt-2 max-w-[16ch] text-[var(--ink-faint)]">
                        {a.note}
                      </p>
                    </div>
                    <h3 className="text-[20px] font-semibold tracking-[-0.02em] sm:text-[22px]">
                      {a.role}
                    </h3>
                    <p className="max-w-[52ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      {a.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="economics" className="zone-warm scroll-mt-8 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <Kicker>экономика</Kicker>
              <h2 className="mt-7 max-w-[18ch] text-[32px] sm:text-[46px]">
                Сколько остаётся у вас
              </h2>
              <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
                Мы не диктуем вашу цену для заказчика. Вы платите за фактические
                переходы, а разницу между закупкой и своим чеком оставляете себе.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <MarginCalc />
            </Reveal>
          </div>
        </section>

        <section id="tools" className="zone-hot scroll-mt-8 px-5 pt-16 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[20ch] text-[32px] sm:text-[46px]">
                Что видит клиент, и чего он не видит
              </h2>
            </Reveal>

            <div className="mt-16 border-t border-[var(--rule)]">
              {TOOLS.map((t, i) => (
                <Reveal key={t.t} delay={i * 0.06}>
                  <div className="grid gap-3 border-b border-[var(--rule-soft)] py-8 sm:grid-cols-[auto_1fr_1.5fr] sm:gap-10">
                    <span className="num text-[11px] text-[var(--ink-soft)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[19px] leading-snug font-semibold tracking-[-0.02em]">
                      {t.t}
                    </h3>
                    <p className="max-w-[56ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      {t.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/*
          The section every competitor omits. It is the reason a professional
          reseller trusts the offer, so it gets the hottest ground on the page.
        */}
        <section id="risks" className="zone-hot scroll-mt-8 px-5 pt-24 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <Kicker>риски</Kicker>
              <h2 className="mt-7 max-w-[18ch] text-[36px] sm:text-[58px]">
                Что сказать клиенту, если спросит
              </h2>
              <p className="mt-7 max-w-[56ch] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
                Вы перепродаёте инструмент, который относится к серым методам. Прятать
                это от заказчика невыгодно вам самим: вопрос всё равно возникнет, и
                лучше, если ответ будет готов заранее.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-px border-t border-[var(--rule-soft)] bg-[var(--rule-soft)] lg:grid-cols-3">
              {RISKS.map((r, i) => (
                <Reveal
                  key={r.t}
                  delay={i * 0.06}
                  className="zone-burn bg-[oklch(0.155_0.038_32)]"
                >
                  <div className="h-full p-7 lg:p-8">
                    <span className="num text-[11px] text-[var(--hot)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-[19px] leading-snug font-semibold tracking-[-0.02em]">
                      {r.t}
                    </h3>
                    <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">
                      {r.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="zone-burn scroll-mt-8 px-5 pt-24 pb-20 sm:px-8 sm:pt-32 sm:pb-24">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="text-[28px] sm:text-[36px]">Вопросы партнёров</h2>
            </Reveal>

            <div className="mt-12 border-t border-[var(--rule-soft)]">
              {FAQ.map((item, i) => (
                <Reveal key={item.q} delay={i * 0.04}>
                  <details className="group border-b border-[var(--rule-soft)]">
                    <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6">
                      <span className="num shrink-0 text-[11px] text-[var(--ink-faint)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[17px] leading-snug font-semibold tracking-[-0.02em] [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro)] group-hover:text-[var(--hot)] sm:text-[19px]">
                        {item.q}
                      </span>
                      <span className="num shrink-0 text-[16px] text-[var(--ink-faint)] [transition:transform_var(--t-hover)_var(--ease-micro)] group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="max-w-[68ch] pb-7 pl-9 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      {item.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="start" className="zone-burn scroll-mt-8 px-5 pb-28 sm:px-8 sm:pb-32">
          <div className="mx-auto max-w-[76rem] border-t border-[var(--rule)] pt-16">
            <Reveal>
              <h2 className="max-w-[16ch] text-[34px] sm:text-[52px]">
                Заведите первый проект бесплатно
              </h2>
              <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
                Тест на одном клиенте, без договора и предоплаты. Оптовую сетку
                открываем после первого объёма.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Cta href="https://lk.topinjector.ru/register">Стать партнёром</Cta>
                <a
                  href="https://t.me/topinjector"
                  className="rounded-[var(--radius-pill)] border border-[var(--rule)] px-6
                    py-3.5 text-center text-[15px] font-semibold text-[var(--ink)]
                    [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro)] hover:border-[var(--ink)]"
                >
                  Обсудить объёмы в Telegram
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer links={NAV_LINKS} crossHref="/" crossLabel="Для бизнеса" />
    </div>
  );
}
