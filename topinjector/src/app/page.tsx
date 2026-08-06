import Link from "next/link";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta, Kicker } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { WipeReveal } from "@/components/wipe-reveal";
import { LightSurface } from "@/components/light-surface";
import { BeforeAfter } from "@/components/before-after";
import { Voices } from "@/components/voices";
import { VolumeScale } from "@/components/volume-scale";
import { Schema } from "@/components/schema";
import { RankClimb } from "@/components/rank-climb";
import { Calculator } from "@/components/calculator";
import { DoubtRail } from "@/components/doubt-rail";
import { CLAIM, MECHANISM } from "@/brand/brand";

const NAV_LINKS = [
  { label: "Как работает", href: "#how" },
  { label: "Расчёт", href: "#calc" },
  { label: "Результаты", href: "#cases" },
  { label: "Отзывы", href: "#voices" },
  { label: "Вопросы", href: "#faq" },
];

/*
  Показания, а не достижения. Прежние «1430 проектов» и «92% продлевают»
  выглядели убедительнее, но подтвердить их нечем, а п.23 мастер-документа
  запрещает неподтверждённые цифры прямо. Здесь остались только те величины,
  которые задаёт сам сервис и которые проверяются в кабинете за минуту.
*/
const METRICS = [
  { v: "2-3", u: "дня", n: "до первых сдвигов по подходящим запросам" },
  { v: "07", u: "дней", n: "тест идёт без списаний" },
  { v: "00", u: "доступов", n: "к сайту и хостингу не требуется" },
  { v: "100", u: "%", n: "остатка возвращается, если сдвигов нет" },
];

const NOW = [
  "Подрядчик просит полгода и присылает отчёты вместо позиций",
  "Бюджет на Директ растёт, а стоимость заявки вместе с ним",
  "Конкуренты стоят выше по вашим же коммерческим запросам",
  "Непонятно, за что именно списываются деньги",
];

const WITH_SERVICE = [
  "Движение по позициям видно на третий день, а не в конце квартала",
  "Платите за переходы, остаток всегда можно забрать",
  "Запускается за 10 минут, доступ к сайту не требуется",
  "Каждая фраза с ценой и динамикой на одном экране",
];

/*
  Кейсы даны в структуре п.25: ниша, регион, исходная позиция, срок наблюдения.
  Голого процента недостаточно — именно отсутствие контекста делает чужие
  скриншоты в этой категории бесполезными.
*/
const CASES = [
  {
    niche: "Полусухая стяжка пола",
    city: "Казань",
    top: 51,
    was: 4,
    scope: "667 запросов",
    watch: "6 недель наблюдения",
  },
  {
    niche: "Ремонт техники Apple",
    city: "Москва",
    top: 74,
    was: 11,
    scope: "перегретая ниша",
    watch: "9 недель наблюдения",
  },
  {
    niche: "Аренда спецтехники",
    city: "Екатеринбург",
    top: 63,
    was: 9,
    scope: "ВЧ-запрос вышел с 41 на 4",
    watch: "5 недель наблюдения",
  },
  {
    niche: "Оптовые поставки крепежа",
    city: "Новосибирск",
    top: 88,
    was: 23,
    scope: "заявка дешевле Директа в 5 раз",
    watch: "11 недель наблюдения",
  },
];

const RATES = [
  { plan: "Экономный", rate: "04", win: "14 до 30 дней", who: "Региональные ниши без конкуренции" },
  { plan: "Стандарт", rate: "12", win: "7 до 14 дней", who: "Большинство коммерческих сайтов" },
  { plan: "Ускоренный", rate: "28", win: "2 до 3 дней", who: "Перегретые ниши и сезонный спрос" },
];

/*
  Правило работы со страхом (п.18): сначала признать его рациональность, затем
  показать условия, границы и ответственность. Отрицание страха читается как
  продажа, а не как ответ.
*/
const FAQ = [
  {
    q: "Это безопасно для сайта?",
    a: "Полностью безрисковых методов быстрого продвижения не существует, и обещать обратное было бы нечестно. Что мы делаем с риском: распределяем сессии по регионам и времени, подбираем скорость под возраст и трафик сайта, показываем ограничения до запуска, а не после. Что мы не делаем: не заявляем, что реакция поисковика исключена, и не советуем строить весь прогноз только на этом инструменте.",
  },
  {
    q: "Через сколько будет результат?",
    a: "Сначала проводится оценка применимости: без неё срок назвать нельзя. Для подходящих проектов первые сдвиги обычно видны через 2-3 дня на ускоренном тарифе и через 1-2 недели на экономном, закрепление занимает от трёх недель. Это наблюдаемые средние, а не обязательство: в перегретых нишах дольше, в региональных быстрее.",
  },
  {
    q: "Подойдёт ли сервису мой сайт?",
    a: "Нужно, чтобы сайт уже находился в ТОП-50 по продвигаемым запросам. Если его там нет, поведенческие сигналы не помогут: сначала нужна базовая оптимизация. Проверить позиции можно бесплатно в кабинете до первого пополнения — это и есть предварительная оценка.",
  },
  {
    q: "Что будет, если отключить сервис?",
    a: "Позиции держатся, пока сайт продолжает получать нормальный трафик и работает классическое SEO. Если продвижение держалось только на нас, часть позиций постепенно откатится. Мы дополнительный слой к системной работе, а не её замена, и это стоит учитывать в планировании заранее.",
  },
  {
    q: "Как устроена оплата?",
    a: "Пополняете баланс, деньги списываются за фактические переходы. Абонентской платы нет, неизрасходованное не сгорает. Если за первую неделю позиции по вашим запросам не сдвинулись, возвращаем остаток.",
  },
];

export default function BusinessLanding() {
  return (
    <div className="brand-ramp">
      <Schema
        faq={FAQ}
        service={{
          name: "Быстрое продвижение целевых запросов в Яндексе",
          description:
            "Сервис раннего результата по целевым запросам в Яндексе. Оценка применимости до запуска, оплата за фактические переходы, тест семь дней, возврат остатка при отсутствии роста.",
          url: "https://topinjector.ru/",
        }}
      />

      <DoubtRail ctaHref="#start" ctaLabel="Проверить применимость" />

      <div className="zone-doubt">
        <Nav
          links={NAV_LINKS}
          crossLink={{ label: "Для агентств", href: "/pro" }}
          ctaLabel="Проверить применимость"
          ctaHref="#start"
        />
      </div>

      <main id="main" tabIndex={-1}>
        {/*
          Открытый край окна сомнения: работа идёт, но заказчику она пока не
          видна. Заголовок называет ожидание, а не обещает позицию — обещание
          без условий в самом заметном месте страницы запрещено п.24.
        */}
        <section className="zone-doubt relative isolate overflow-hidden px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
          <LightSurface className="[mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]" />
          <div className="relative mx-auto grid max-w-[76rem] items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <Reveal>
                <Kicker>дополнительный слой к системному SEO</Kicker>
              </Reveal>

              <WipeReveal delay={0.1}>
                <h1 className="mt-7 text-[34px] sm:text-[56px] lg:text-[72px]">
                  Не ждите квартал,
                  <br className="hidden sm:block" /> чтобы понять,{" "}
                  <span className="text-[var(--accent)]">работает ли SEO</span>
                </h1>
              </WipeReveal>

              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[42ch] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
                  Целевые запросы начинают двигаться в первые дни. Применимость
                  проверяется до первого списания, динамика видна по каждой фразе.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Cta href="#start">Проверить применимость</Cta>
                  <Link
                    href="#calc"
                    className="rounded-[var(--radius-pill)] border border-[var(--rule)]
                      px-6 py-3.5 text-center text-[15px] font-semibold text-[var(--ink)]
                      [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro)] hover:border-[var(--ink)]"
                  >
                    Рассчитать бюджет
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.24}>
              <RankClimb />
            </Reveal>
          </div>
        </section>

        {/* Показания, набранные шкалой, а не четырьмя коробками. */}
        <section className="zone-doubt px-5 sm:px-8">
          <div className="mx-auto grid max-w-[76rem] grid-cols-2 border-t border-[var(--rule)] lg:grid-cols-4">
            {METRICS.map((m, i) => (
              <Reveal
                key={m.n}
                delay={i * 0.05}
                className={`border-b border-[var(--rule-soft)] py-7
                  ${i % 2 === 1 ? "border-l pl-6" : "pr-6"}
                  lg:border-b-0 lg:border-l lg:px-7 lg:first:border-l-0 lg:first:pl-0`}
              >
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="num text-[26px] leading-none font-semibold text-[var(--ink)] sm:text-[40px]">
                    {m.v}
                  </span>
                  <span className="label text-[var(--ink-faint)]">{m.u}</span>
                </p>
                <p className="mt-3 text-[13px] leading-snug text-[var(--ink-soft)]">{m.n}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/*
          Две колонки, две стороны одного решения. Прежде правая заливалась
          сплошным оранжевым: акцент на половине секции перестаёт быть акцентом
          и читается как крик, чего спокойный B2B-тон бренда не допускает.
          Теперь разница держится весом текста и утопленным фоном.
        */}
        <section className="zone-signal px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[16ch] text-[32px] sm:text-[46px]">
                Сайт есть, а заявок из поиска нет
              </h2>
              <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
                Классическая оптимизация делает сайт технически правильным. Но
                Яндекс ранжирует не правильность, а то, как люди на сайте себя
                ведут. Нет сигналов, нет движения.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-2">
              <Reveal delay={0.06} className="bg-[var(--inset)]">
                <div className="h-full p-7 sm:p-8">
                  <span className="label text-[var(--ink-faint)]">сейчас</span>
                  <ul className="mt-7 flex flex-col">
                    {NOW.map((t, i) => (
                      <li
                        key={t}
                        className="flex gap-5 border-t border-[var(--rule-soft)] py-4 first:border-t-0 first:pt-0"
                      >
                        <span className="num shrink-0 text-[11px] text-[var(--ink-faint)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] leading-snug text-[var(--ink-soft)]">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.12} className="bg-[var(--inset)]">
                <div className="h-full border-l-2 border-[var(--accent)] p-7 sm:p-8">
                  <span className="label text-[var(--accent)]">с сервисом</span>
                  <ul className="mt-7 flex flex-col">
                    {WITH_SERVICE.map((t, i) => (
                      <li
                        key={t}
                        className="flex gap-5 border-t border-[var(--rule-soft)] py-4 first:border-t-0 first:pt-0"
                      >
                        <span className="num shrink-0 text-[11px] text-[var(--ink-faint)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] leading-snug font-semibold text-[var(--ink)]">
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/*
          Механика берётся из бренд-слоя, а не переписывается на каждой странице.
          Прежние названия тактов («Подача», «Впрыск», «Прогрев») звучали как
          техническая магия; словарь п.14 требует обратного.
        */}
        <section id="how" className="zone-signal scroll-mt-8 px-5 pt-16 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[18ch] text-[32px] sm:text-[46px]">
                {MECHANISM.name}
              </h2>
              <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
                Четыре шага, десять минут на запуск. Остановить и возобновить
                можно на любом из них.
              </p>
            </Reveal>

            <div className="mt-16 grid border-t border-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
              {MECHANISM.steps.map((p, i) => (
                <Reveal
                  key={p.t}
                  delay={i * 0.07}
                  className="border-b border-[var(--rule-soft)] py-8 sm:border-l sm:px-6
                    sm:py-10 sm:odd:border-l-0 sm:odd:pl-0 lg:border-l lg:odd:border-l
                    lg:odd:pl-6 lg:first:border-l-0 lg:first:pl-0"
                >
                  <span className="num text-[11px] text-[var(--ink-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-[20px] sm:text-[23px]">{p.t}</h3>
                  <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                    {p.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="calc" className="zone-signal scroll-mt-8 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <Kicker>прозрачная цена</Kicker>
              <h2 className="mt-7 max-w-[18ch] text-[32px] sm:text-[46px]">
                Посчитайте бюджет под свой сайт
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <Calculator />
            </Reveal>
          </div>
        </section>

        {/*
          Развёртка во всю ширину. Аудит категории показал, что явное «до и
          после» бьёт абстрактные проценты, поэтому блок получает самую широкую
          рамку на странице и ломает ритм стопки, которому подчинено всё
          остальное.
        */}
        <section className="zone-signal px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Kicker>один проект, шесть недель</Kicker>
                  <h2 className="mt-7 max-w-[16ch] text-[32px] sm:text-[46px]">
                    667 запросов, до и после
                  </h2>
                </div>
                <p className="max-w-[34ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                  Сколько запросов стояло в каждом диапазоне позиций до
                  подключения и что стало через шесть недель.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-14">
              <BeforeAfter />
            </Reveal>
          </div>
        </section>

        {/* Результаты читаются как банк показаний. */}
        <section id="cases" className="zone-proof scroll-mt-8 px-5 pt-16 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="max-w-[14ch] text-[32px] sm:text-[46px]">
                  Что получилось у других
                </h2>
                <span className="label border border-[var(--rule)] px-2.5 py-1.5 text-[var(--ink-soft)]">
                  демо-данные
                </span>
              </div>
            </Reveal>

            <div className="mt-16 border-t border-[var(--rule)]">
              {CASES.map((c, i) => (
                <Reveal key={c.niche} delay={i * 0.05}>
                  <article className="grid items-center gap-4 border-b border-[var(--rule-soft)] py-7 sm:grid-cols-[1.3fr_1fr_auto] sm:gap-8">
                    <div>
                      <h3 className="text-[19px] leading-tight font-semibold tracking-[-0.02em]">
                        {c.niche}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-[var(--ink-soft)]">
                        {c.city}, {c.scope}
                      </p>
                      <p className="label mt-2 text-[var(--ink-faint)]">{c.watch}</p>
                    </div>

                    <div>
                      <div className="flex h-2 w-full overflow-hidden bg-[var(--rule-soft)]">
                        <span
                          className="block bg-[var(--ink)]"
                          style={{ width: `${c.was}%` }}
                          title={`было ${c.was}%`}
                        />
                        <span
                          className="block bg-[var(--ink)] opacity-30"
                          style={{ width: `${c.top - c.was}%` }}
                        />
                      </div>
                      <p className="label mt-2.5 text-[var(--ink-soft)]">
                        было {c.was}, стало {c.top} процентов в ТОП-10
                      </p>
                    </div>

                    <p className="num text-right text-[30px] leading-none font-semibold sm:text-[36px]">
                      {c.top}
                      <span className="text-[16px]">%</span>
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/*
          Названное доказательство. Анонимные восторженные цитаты — определяющий
          разрыв доверия в этой категории, и п.25 их прямо запрещает.
        */}
        <section id="voices" className="zone-proof scroll-mt-8 px-5 pt-16 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[14ch] text-[32px] sm:text-[46px]">
                Говорят те, кто платит
              </h2>
            </Reveal>

            <div className="mt-14">
              <Voices />
            </div>
          </div>
        </section>

        <section id="pricing" className="zone-proof scroll-mt-8 px-5 pt-24 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[18ch] text-[32px] sm:text-[46px]">
                Тарифы отличаются только скоростью
              </h2>
            </Reveal>

            <div className="mt-16 border-t border-[var(--rule)]">
              {RATES.map((r, i) => (
                <Reveal key={r.plan} delay={i * 0.05}>
                  <div className="grid items-baseline gap-3 border-b border-[var(--rule-soft)] py-7 sm:grid-cols-[auto_1fr_1fr_1.4fr] sm:gap-8">
                    <span className="num text-[32px] leading-none font-semibold sm:text-[38px]">
                      {r.rate}
                      <span className="ml-1 text-[14px]">₽</span>
                    </span>
                    <span className="text-[18px] font-semibold tracking-[-0.02em]">{r.plan}</span>
                    <span className="text-[14px] text-[var(--ink-soft)]">
                      сдвиги от {r.win}
                    </span>
                    <span className="text-[14px] text-[var(--ink-soft)]">{r.who}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[60ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">
                Цена указана за одну фразу в день. Абонентской платы нет, баланс не
                сгорает, тест на семь дней идёт без привязки карты. Срок выхода
                зависит от исходных условий проекта и определяется на оценке
                применимости.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-20">
              <h3 className="max-w-[20ch] text-[24px] font-extrabold tracking-[-0.03em] sm:text-[30px]">
                Чем больше объём, тем дешевле переход
              </h3>
              <div className="mt-10">
                <VolumeScale />
              </div>
            </Reveal>

            {/* Два рычага, которые аудит нашёл работающими у других и отсутствующими здесь. */}
            <Reveal delay={0.2}>
              <div className="mt-16 grid gap-px border-t border-[var(--rule)] bg-[var(--rule-soft)] sm:grid-cols-2">
                <div className="bg-[var(--inset)] p-7 sm:p-8">
                  <span className="label text-[var(--ink-faint)]">переход от конкурента</span>
                  <p className="mt-5 max-w-[34ch] text-[17px] leading-snug font-semibold tracking-[-0.02em]">
                    Удвоим первое пополнение, если приходите от другого сервиса
                  </p>
                  <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">
                    Достаточно скриншота кабинета с расходом за последний месяц.
                    Семантику переносим сами.
                  </p>
                </div>
                <div className="bg-[var(--inset)] p-7 sm:p-8">
                  <span className="label text-[var(--ink-faint)]">реферальная программа</span>
                  <p className="mt-5 max-w-[34ch] text-[17px] leading-snug font-semibold tracking-[-0.02em]">
                    10 процентов с пополнений тех, кого привели
                  </p>
                  <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">
                    Начисляется постоянно, не разово. Выводится на баланс или на
                    расчётный счёт.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/*
          Одно обещание, одно действие. Обещание скорости стоит здесь вместе с
          условиями применения, а не отдельно от них: п.24 разрешает эту
          формулировку только в такой паре.
        */}
        <section
          id="start"
          className="zone-settled settle-in scroll-mt-8 px-5 pt-24 pb-20 sm:px-8 sm:pt-44 sm:pb-28"
        >
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <Kicker>что мы обещаем и на каких условиях</Kicker>
              <h2 className="mt-7 max-w-[17ch] text-[38px] sm:text-[62px]">
                Не сдвинулись за неделю, вернём остаток
              </h2>
              <p className="mt-7 max-w-[52ch] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
                {CLAIM.headline}. Если за первые семь дней позиции по вашим
                запросам не изменились, возвращаем неизрасходованный баланс —
                одной кнопкой в кабинете, без переписки и объяснений.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-10 grid gap-px border-t border-[var(--rule)] bg-[var(--rule-soft)] sm:grid-cols-2">
                {CLAIM.conditions.map((c, i) => (
                  <li key={c} className="flex gap-4 bg-[var(--inset)] p-6">
                    <span className="num shrink-0 text-[11px] text-[var(--ink-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14px] leading-snug text-[var(--ink-soft)]">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Cta href="https://lk.topinjector.ru/register">Проверить применимость</Cta>
                <a
                  href="https://t.me/topinjector"
                  className="rounded-[var(--radius-pill)] border border-[var(--rule)] px-6
                    py-3.5 text-center text-[15px] font-semibold text-[var(--ink)]
                    [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro)] hover:border-[var(--ink)]"
                >
                  Задать вопрос в Telegram
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="zone-settled scroll-mt-8 px-5 pt-16 pb-24 sm:px-8 sm:pt-20 sm:pb-32">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="text-[28px] sm:text-[36px]">Честные ответы</h2>
            </Reveal>

            <div className="mt-12 border-t border-[var(--rule-soft)]">
              {FAQ.map((item, i) => (
                <Reveal key={item.q} delay={i * 0.04}>
                  <details className="group border-b border-[var(--rule-soft)]">
                    <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6">
                      <span className="num shrink-0 text-[11px] text-[var(--ink-faint)]">
                        {String(i + 1).padStart(2, "0")}
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
      </main>

      <Footer
        links={NAV_LINKS}
        cross={[
          { label: "Для SEO-специалистов", href: "/service" },
          { label: "Для агентств", href: "/pro" },
        ]}
      />
    </div>
  );
}
