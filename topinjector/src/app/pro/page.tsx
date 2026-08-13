import type { Metadata } from "next";
import Link from "next/link";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Kicker } from "@/components/cta";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { MarginCalc } from "@/components/margin-calc";
import { DoubtRail } from "@/components/doubt-rail";
import { CLAIM } from "@/brand/brand";
import { ordinal } from "@/format";

export const metadata: Metadata = {
  title: "Партнёрам: продвижение под вашим брендом",
  description:
    "Подключайте клиентов к раннему результату по целевым запросам под своим брендом. Закупка по оптовой цене, ваш чек и ваша маржа, отчёты без упоминания сервиса.",
};

const NAV_LINKS = [
  { label: "Экономика", href: "#economics" },
  { label: "Инструменты", href: "#tools" },
  { label: "Границы", href: "#limits" },
  { label: "Вопросы", href: "#faq" },
];

/*
  Неосновные сегменты бренда. Частные SEO-специалисты сюда сознательно не
  включены: мастер-документ запрещает смешивать основной сегмент с этими в
  одной коммуникации, и у него есть собственная ветка.
*/
const AUDIENCE = [
  {
    role: "Агентства",
    body: "Продаёте новую услугу текущей базе без найма людей и без переписывания договоров.",
    figure: "0",
    note: "новых сотрудников в штат",
  },
  {
    role: "Веб-студии",
    body: "Добавляете к разработке услугу, которая показывает заказчику измеримое движение в первые недели после сдачи сайта.",
    figure: "0",
    note: "доступов к сайту клиента",
  },
  {
    role: "Директологи и маркетологи",
    body: "Приводите клиенту органику рядом с платным трафиком и снимаете зависимость от роста ставок.",
    figure: "1",
    note: "кабинет на все проекты",
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

/*
  Раздел, который конкуренты опускают. Прежняя версия называла метод «серой
  зоной» — формулировка честная по намерению, но она сама создаёт образ
  сомнительной схемы, чего критерий качества п.29 не допускает. Честность
  сохранена там, где она реально работает: в условиях, границах и разделении
  ответственности.
*/
const LIMITS = [
  {
    t: "Говорите о механике, а не о чуде",
    d: "Работа с поведенческими факторами, оценка применимости, наблюдение за динамикой. Обтекаемое «продвижение по технологии ИИ» рушит доверие, как только заказчик гуглит термин.",
  },
  {
    t: "Не продавайте это как всё SEO",
    d: "Позиционируйте как дополнительный слой поверх базовой оптимизации. Если убрать инструмент, часть позиций откатится, и клиент должен знать это заранее.",
  },
  {
    t: "Фиксируйте ожидания письменно",
    d: "Диапазон сроков и условия применимости, а не точная дата. В кабинете есть шаблон формулировок для коммерческого предложения.",
  },
];

const FAQ = [
  {
    q: "Что говорить клиенту про метод?",
    a: "Прямо и по механике: сервис работает с поведенческими факторами ранжирования, применимость проверяется заранее, результат отслеживается по дням. Опыт партнёров показывает, что заказчики спокойнее реагируют на конкретное объяснение с границами, чем на обтекаемое «продвижение по технологии ИИ». В кабинете есть готовая формулировка для коммерческого предложения.",
  },
  {
    q: "Какие риски я беру на себя?",
    a: "Основной риск в том, что часть сигналов может не сработать, и рост окажется медленнее обещанного клиенту. Полностью исключить реакцию поисковика нельзя, и мы не заявляем обратного. Поэтому советуем не строить клиенту весь прогноз только на этом инструменте, держать классическое SEO рядом и фиксировать в договоре диапазон, а не дату.",
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
    <div className="brand-ramp">
      <DoubtRail ctaHref="#start" ctaLabel="Стать партнёром" />

      <div className="zone-doubt">
        <Nav
          links={NAV_LINKS}
          crossLink={{ label: "Для бизнеса", href: "/" }}
          ctaLabel="Стать партнёром"
          ctaHref="#start"
        />
      </div>

      <main id="main" tabIndex={-1}>
        {/* Открытие на типографике, сознательно непохожее на страницу для бизнеса. */}
        <section className="zone-doubt px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <Kicker>партнёрская программа</Kicker>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 max-w-[15ch] text-[42px] sm:text-[64px] lg:text-[80px]">
                Продавайте результат <span className="text-[var(--accent)]">под своим</span> брендом
              </h1>
            </Reveal>

            <div className="mt-12 grid gap-10 border-t border-[var(--rule)] pt-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
              <Reveal delay={0.12}>
                <p className="max-w-[46ch] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
                  Закупаете по оптовой цене, продаёте по своей. Клиент видит ваш
                  отчёт и ваш логотип, а не наш.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="#start" size="lg" arrow>
                    Стать партнёром
                  </Button>
                  <Button href="#economics" size="lg" variant="secondary">
                    Посчитать маржу
                  </Button>
                </div>
              </Reveal>

              {/*
                Здесь стояла крупная «68 % средняя маржа партнёра». Подтвердить
                эту величину нечем, а маржу вообще задаёт сам партнёр своей
                ценой, так что цифра была не показанием, а обещанием. Осталась
                механика расчёта — она верна всегда.
              */}
              <Reveal delay={0.18} className="shrink-0">
                <dl className="border-t border-[var(--rule)] pt-4">
                  <div className="flex items-baseline justify-between gap-8 border-b border-[var(--rule-soft)] py-2.5">
                    <dt className="label text-[var(--ink-faint)]">ваша цена</dt>
                    <dd className="num text-[15px] text-[var(--ink-soft)]">задаёте вы</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-8 border-b border-[var(--rule-soft)] py-2.5">
                    <dt className="label text-[var(--ink-faint)]">минус закупка</dt>
                    <dd className="num text-[15px] text-[var(--ink-soft)]">по объёму</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-8 py-2.5">
                    <dt className="label text-[var(--accent)]">равно маржа</dt>
                    <dd className="num text-[15px] font-semibold text-[var(--ink)]">
                      остаётся у вас
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Роли как банк показаний. */}
        <section className="zone-signal px-5 pt-24 sm:px-8 sm:pt-32">
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

        <section id="economics" className="zone-signal scroll-mt-8 px-5 pt-24 sm:px-8 sm:pt-32">
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

        <section id="tools" className="zone-proof scroll-mt-8 px-5 pt-24 sm:px-8 sm:pt-32">
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
                      {ordinal(i)}
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
          Границы применимости получают самый заметный участок страницы: именно
          они, а не обещания, дают профессиональному перепродавцу основание
          доверять офферу.
        */}
        <section id="limits" className="zone-proof scroll-mt-8 px-5 pt-24 pb-24 sm:px-8 sm:pt-32 sm:pb-32">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <Kicker>границы и ответственность</Kicker>
              <h2 className="mt-7 max-w-[18ch] text-[36px] sm:text-[58px]">
                Что сказать клиенту, если спросит
              </h2>
              <p className="mt-7 max-w-[56ch] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
                Вы перепродаёте инструмент с понятной механикой и понятными
                ограничениями. Вопрос о методе всё равно возникнет, и лучше,
                если ответ будет готов заранее.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-px border-t border-[var(--rule-soft)] bg-[var(--rule-soft)] lg:grid-cols-3">
              {LIMITS.map((r, i) => (
                <Reveal
                  key={r.t}
                  delay={i * 0.06}
                  className="zone-settled"
                >
                  <div className="h-full p-7 lg:p-8">
                    <span className="num text-[11px] text-[var(--accent)]">
                      {ordinal(i)}
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

            <Reveal delay={0.2}>
              <ul className="mt-12 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {CLAIM.limits.map((l) => (
                  <li
                    key={l}
                    className="flex gap-3 border-t border-[var(--rule-soft)] pt-3 text-[14px] leading-snug text-[var(--ink-soft)]"
                  >
                    <span aria-hidden="true" className="num text-[var(--ink-faint)]">
                      —
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section
          id="faq"
          className="zone-settled settle-in scroll-mt-8 px-5 pt-24 pb-16 sm:px-8 sm:pt-32 sm:pb-20"
        >
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
                        {ordinal(i)}
                      </span>
                      <span className="flex-1 text-[17px] leading-snug font-semibold tracking-[-0.02em] [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro)] group-hover:text-[var(--accent)] sm:text-[19px]">
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

        <section id="start" className="zone-settled scroll-mt-8 px-5 pb-28 sm:px-8 sm:pb-36">
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
                <Button href="https://lk.topinjector.ru/register" size="lg" arrow>
                  Стать партнёром
                </Button>
                <Button href="https://t.me/topinjector" size="lg" variant="secondary">
                  Обсудить объёмы в Telegram
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer
        links={NAV_LINKS}
        cross={[
          { label: "Для SEO-специалистов", href: "/service" },
          { label: "Для бизнеса", href: "/" },
        ]}
      />
    </div>
  );
}
