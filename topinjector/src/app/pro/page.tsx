import type { Metadata } from "next";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { WipeReveal } from "@/components/wipe-reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Head } from "@/components/instrument/head";
import { NumberedRows } from "@/components/instrument/numbered-rows";
import { Faq } from "@/components/instrument/faq";
import { MarginCalc } from "@/components/margin-calc";
import { DoubtRail } from "@/components/doubt-rail";
import { CLAIM } from "@/brand/brand";
import { ordinal } from "@/format";

/*
  СТРАНИЦА ДЛЯ ПАРТНЁРОВ. Набрана той же системой `instrument.css`, что и
  главная: почти-чёрная земля, янтарь на данные, зелёный на действие,
  волосяная линия вместо подложек.

  Три правила системы действуют здесь без исключений.

  ПЕРВОЕ: ни одной карточки. Раздел «границы» раньше стоял тремя плашками
  `p-7` в ряд — та самая карточка, ради ухода от которой всё затевалось. Здесь
  это решётка, где сам зазор в пиксель и есть линейка.

  ВТОРОЕ: ни одной равной раскладки. `lg:grid-cols-3` под границами заявлял,
  что все три предупреждения весят одинаково, — но первое из них решает исход
  разговора с заказчиком, а третье уточняет формальность. Доли неравны.

  ТРЕТЬЕ: числа набраны как величины. «0 новых сотрудников в штат» — это
  показание, а не подпись: подпись сверху, число под ней.

  Кегль между разделами не меняется: вес даёт композиция, а не размер шрифта.
  Поэтому самый заметный участок страницы — границы применимости — получает
  не крупный заголовок, а самую широкую структуру.
*/

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
  Здесь стояла крупная «68 % средняя маржа партнёра». Подтвердить эту величину
  нечем, а маржу вообще задаёт сам партнёр своей ценой, так что цифра была не
  показанием, а обещанием. Осталась механика расчёта — она верна всегда.
*/
const MARGIN_FORMULA = [
  { t: "ваша цена", d: "задаёте вы" },
  { t: "минус закупка", d: "по объёму" },
  { t: "равно маржа", d: "остаётся у вас", result: true },
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
    <div className="inst inst-ground">
      <DoubtRail ctaHref="#start" ctaLabel="Стать партнёром" />

      <Nav
        links={NAV_LINKS}
        crossLink={{ label: "Для бизнеса", href: "/" }}
        ctaLabel="Стать партнёром"
        ctaHref="#start"
      />

      <main id="main" tabIndex={-1}>
        {/*
          ПЕРВЫЙ ЭКРАН. Слово ведёт семь колонок, формула маржи занимает пять.

          На главной справа стоит панель продукта — снимок кабинета. Здесь
          продукт другой: партнёр покупает не интерфейс, а разницу между двумя
          ценами. Поэтому справа не окно программы, а сама формула, набранная
          тремя строками на волосяных линиях. Рамки у неё нет намеренно:
          плашка вернула бы карточку в первый же экран.
        */}
        <Section pad="tight" ruled>
          <div className="grid grid-cols-12 items-end gap-x-8 gap-y-12">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <Eyebrow>партнёрская программа</Eyebrow>
              </Reveal>

              <WipeReveal delay={0.08}>
                <h1 className="inst-d1 mt-7 max-w-[15ch]">
                  Продавайте результат{" "}
                  <span className="text-[var(--amber)]">под своим</span> брендом
                </h1>
              </WipeReveal>

              <Reveal delay={0.12}>
                <p className="inst-lead mt-7 max-w-[46ch]">
                  Закупаете по оптовой цене, продаёте по своей. Клиент видит ваш
                  отчёт и ваш логотип, а не наш.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a href="#start" className="inst-btn inst-btn-primary">
                    Стать партнёром
                    <span aria-hidden="true">→</span>
                  </a>
                  <a href="#economics" className="inst-btn inst-btn-ghost">
                    Посчитать маржу
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="col-span-12 lg:col-span-5">
              <dl>
                {MARGIN_FORMULA.map((row) => (
                  <div
                    key={row.t}
                    className="flex items-baseline justify-between gap-8 border-t border-[var(--line)] py-4 last:border-b"
                  >
                    <dt className={row.result ? "inst-label inst-label-amber" : "inst-label"}>
                      {row.t}
                    </dt>
                    <dd
                      className={
                        row.result
                          ? "text-[15px] leading-snug font-medium text-[var(--paper)]"
                          : "text-[15px] leading-snug text-[var(--paper-2)]"
                      }
                    >
                      {row.d}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Section>

        {/*
          РОЛИ. Величина стоит в конце строки, как цена в прайсе.

          На главной номер такта висит слева от текста; здесь показание —
          итог роли, а не её порядковый номер, поэтому оно уходит вправо и
          читается после того, как роль названа.
        */}
        <Section ruled>
          <Head title="Кому это считается" />

          <div className="wrap-bleed mt-14 border-t border-[var(--line)]">
            {AUDIENCE.map((a, i) => (
              <Reveal key={a.role} delay={i * 0.06}>
                <article className="inst-row grid grid-cols-12 items-start gap-x-8 gap-y-6 border-b border-[var(--line)] px-6 py-10 sm:px-10">
                  <h3 className="inst-d3 col-span-12 lg:col-span-4">{a.role}</h3>
                  <p className="inst-body col-span-12 max-w-[52ch] lg:col-span-5">{a.body}</p>
                  <div className="inst-metric col-span-12 lg:col-span-3 lg:justify-items-end lg:text-right">
                    <span className="inst-label max-w-[24ch]">{a.note}</span>
                    <span className="inst-metric-body">
                      <span className="inst-metric-n">{a.figure}</span>
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="economics" ruled>
          <Head
            eyebrow="экономика"
            title="Сколько остаётся у вас"
            lede="Мы не диктуем вашу цену для заказчика. Вы платите за фактические переходы, а разницу между закупкой и своим чеком оставляете себе."
          />

          <Reveal delay={0.1} className="mt-12 block">
            <MarginCalc />
          </Reveal>
        </Section>

        <Section id="tools" ruled>
          <Reveal>
            <h2 className="inst-d2 max-w-[20ch]">Что видит клиент, и чего он не видит</h2>
          </Reveal>

          <NumberedRows items={TOOLS} className="mt-16" />
        </Section>

        {/*
          ГРАНИЦЫ ПРИМЕНИМОСТИ. Самый широкий участок страницы: именно
          границы, а не обещания, дают профессиональному перепродавцу
          основание доверять офферу.

          Доли неравны и это значит ровно то, что написано: первое
          предупреждение решает исход разговора с заказчиком, два других
          уточняют условия.
        */}
        <Section id="limits" ruled>
          <Head
            eyebrow="границы и ответственность"
            title="Что сказать клиенту, если спросит"
            lede="Вы перепродаёте инструмент с понятной механикой и понятными ограничениями. Вопрос о методе всё равно возникнет, и лучше, если ответ будет готов заранее."
          />

          <div className="inst-grid wrap-bleed mt-14 grid-cols-1 lg:grid-cols-[4fr_3fr_3fr]">
            {LIMITS.map((r, i) => (
              <Reveal key={r.t} delay={0.06 + i * 0.06}>
                <span className="inst-label inst-label-amber">{ordinal(i)}</span>
                <h3 className="inst-d3 mt-5">{r.t}</h3>
                <p className="inst-body mt-3 max-w-[42ch] text-[14px]">{r.d}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24}>
            <ul className="mt-14 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {CLAIM.limits.map((l) => (
                <li
                  key={l}
                  className="inst-body flex gap-3 border-t border-[var(--line)] pt-3 text-[14px]"
                >
                  <span aria-hidden="true" className="text-[var(--paper-4)]">
                    —
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section id="faq" ruled>
          <Head title="Вопросы партнёров" />

          <Faq items={FAQ} className="mt-14" />
        </Section>

        {/*
          Одно обещание, одно действие. Закрытие получает единственный на
          странице кегль первого экрана: после него читать больше нечего.
        */}
        <Section id="start" ruled className="settle-in">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-8">
              <Reveal>
                <h2 className="inst-d1 max-w-[16ch]">Заведите первый проект бесплатно</h2>
                <p className="inst-lead mt-7 max-w-[48ch]">
                  Тест на одном клиенте, без договора и предоплаты. Оптовую сетку
                  открываем после первого объёма.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://lk.topinjector.ru/register"
                    className="inst-btn inst-btn-primary"
                  >
                    Стать партнёром
                    <span aria-hidden="true">→</span>
                  </a>
                  <a href="https://t.me/topinjector" className="inst-btn inst-btn-ghost">
                    Обсудить объёмы в Telegram
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>
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
