import Link from "next/link";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta, Kicker } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { HeatReveal } from "@/components/heat-reveal";
import { HeatSurface } from "@/components/heat-surface";
import { BeforeAfter } from "@/components/before-after";
import { Voices } from "@/components/voices";
import { VolumeScale } from "@/components/volume-scale";
import { Schema } from "@/components/schema";
import { RankClimb } from "@/components/rank-climb";
import { Calculator } from "@/components/calculator";
import { RankRail } from "@/components/rank-rail";

const NAV_LINKS = [
  { label: "Как работает", href: "#how" },
  { label: "Расчёт", href: "#calc" },
  { label: "Результаты", href: "#cases" },
  { label: "Отзывы", href: "#voices" },
  { label: "Вопросы", href: "#faq" },
];

const METRICS = [
  { v: "2-3", u: "дня", n: "до первых сдвигов позиций" },
  { v: "1430", u: "проектов", n: "прошли через сервис" },
  { v: "92", u: "%", n: "продлевают после теста" },
  { v: "07", u: "дней", n: "тест без списаний" },
];

const COLD = [
  "Подрядчик просит полгода и присылает отчёты вместо позиций",
  "Бюджет на Директ растёт, а стоимость заявки вместе с ним",
  "Конкуренты стоят выше по вашим же коммерческим запросам",
  "Непонятно, за что именно списываются деньги",
];

const HOT = [
  "Движение по позициям видно на третий день, а не в конце квартала",
  "Платите за переходы, остаток всегда можно забрать",
  "Запускается за 10 минут, доступ к сайту не требуется",
  "Каждая фраза с ценой и динамикой на одном экране",
];

const PHASES = [
  {
    t: "Подача",
    d: "Добавляете домен и список фраз. Собрать семантику можно прямо в кабинете. Доступ к сайту не нужен.",
  },
  {
    t: "Впрыск",
    d: "Профили находят сайт по вашему запросу и ведут себя как заинтересованные посетители: читают, кликают, возвращаются.",
  },
  {
    t: "Прогрев",
    d: "Позиции ползут вверх, расход виден по каждой фразе. Останавливаете и запускаете когда угодно.",
  },
];

const CASES = [
  { niche: "Полусухая стяжка пола", city: "Казань", top: 51, note: "667 запросов в работе", was: 4 },
  { niche: "Ремонт техники Apple", city: "Москва", top: 74, note: "перегретая ниша", was: 11 },
  { niche: "Аренда спецтехники", city: "Екатеринбург", top: 63, note: "ВЧ вышел с 41 на 4", was: 9 },
  { niche: "Оптовые поставки крепежа", city: "Новосибирск", top: 88, note: "заявка дешевле Директа в 5 раз", was: 23 },
];

const RATES = [
  { plan: "Экономный", rate: "04", win: "14 до 30 дней", who: "Региональные ниши без конкуренции" },
  { plan: "Стандарт", rate: "12", win: "7 до 14 дней", who: "Большинство коммерческих сайтов" },
  { plan: "Ускоренный", rate: "28", win: "2 до 3 дней", who: "Перегретые ниши и сезонный спрос" },
];

const FAQ = [
  {
    q: "Это безопасно для сайта?",
    a: "Мы работаем в серой зоне поисковой оптимизации и говорим об этом прямо. Риск снижаем объёмами: сессии распределены по регионам и времени, скорость подбирается под возраст и трафик сайта. Гарантировать полное отсутствие реакции поисковика не может никто, и обещать обратное было бы нечестно.",
  },
  {
    q: "Через сколько будет результат?",
    a: "Первые сдвиги обычно видны через 2-3 дня на ускоренном тарифе и через 1-2 недели на экономном. Закрепление в ТОП-10 занимает от 3 недель. Это средние цифры: в перегретых нишах дольше, в региональных быстрее.",
  },
  {
    q: "Подойдёт ли сервису мой сайт?",
    a: "Нужно, чтобы сайт уже находился в ТОП-50 по продвигаемым запросам. Если его там нет, поведенческие сигналы не помогут: сначала нужна базовая оптимизация. Проверить позиции можно бесплатно в кабинете до первого пополнения.",
  },
  {
    q: "Что будет, если отключить сервис?",
    a: "Позиции держатся, пока сайт продолжает получать нормальный трафик и работает классическое SEO. Если продвижение держалось только на нас, часть позиций постепенно откатится. Мы усилитель, а не замена оптимизации.",
  },
  {
    q: "Как устроена оплата?",
    a: "Пополняете баланс, деньги списываются за фактические переходы. Абонентской платы нет, неизрасходованное не сгорает. Если за первую неделю позиции не сдвинулись, возвращаем остаток.",
  },
];

export default function BusinessLanding() {
  return (
    <div className="heat-ramp">
      <Schema
        faq={FAQ}
        service={{
          name: "Продвижение сайта в Яндексе поведенческими сигналами",
          description:
            "Усиление поведенческих сигналов для роста позиций сайта в Яндексе. Оплата за фактические переходы, тест семь дней, возврат остатка при отсутствии роста.",
          url: "https://topinjector.ru/",
        }}
      />

      <RankRail ctaHref="#start" ctaLabel="Запустить тест" />

      <div className="zone-cold">
        <Nav
          links={NAV_LINKS}
          crossLink={{ label: "Для агентств", href: "/pro" }}
          ctaLabel="Запустить тест"
          ctaHref="#start"
        />
      </div>

      <main id="main" tabIndex={-1}>
        {/* COLD. The site sits at 47 and nothing is moving. */}
        <section className="zone-cold relative isolate overflow-hidden px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
          <HeatSurface className="[mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]" />
          <div className="relative mx-auto grid max-w-[76rem] items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <Reveal>
                <Kicker>усилитель SEO, не замена</Kicker>
              </Reveal>

              <HeatReveal delay={0.1}>
                <h1 className="mt-7 text-[34px] sm:text-[56px] lg:text-[72px]">
                  Разогреваем сайт
                  <br className="hidden sm:block" />{" "}
                  до <span className="text-[var(--hot)]">ТОП-1</span> Яндекса
                </h1>
              </HeatReveal>

              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[40ch] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
                  Первые сдвиги за 2-3 дня. Оплата за фактические переходы, а не за
                  отчёты и обещания.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Cta href="#start">Запустить тест</Cta>
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

        {/* Readings, set as a scale rather than four boxes. */}
        <section className="zone-cold px-5 sm:px-8">
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

        {/* WARMING. Two columns, opposite temperatures. */}
        <section className="zone-warm px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[16ch] text-[32px] sm:text-[46px]">
                Сайт есть, а заявок из поиска нет
              </h2>
              <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
                Классическая оптимизация делает сайт технически правильным. Но Яндекс
                ранжирует не правильность, а то, как люди на сайте себя ведут. Нет
                сигналов, нет движения.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-2">
              <Reveal delay={0.06} className="bg-[var(--inset)]">
                <div className="h-full p-7 sm:p-8">
                  <span className="label text-[var(--ink-faint)]">холодно</span>
                  <ul className="mt-7 flex flex-col">
                    {COLD.map((t, i) => (
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

              <Reveal delay={0.12} className="bg-[var(--color-ember)]">
                <div className="zone-hot h-full p-7 sm:p-8">
                  <span className="label text-[var(--ink-soft)]">горячо</span>
                  <ul className="mt-7 flex flex-col">
                    {HOT.map((t, i) => (
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

        {/* Phases named after the mechanism the brand is named for. */}
        <section id="how" className="zone-warm scroll-mt-8 px-5 pt-16 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[14ch] text-[32px] sm:text-[46px]">
                Три такта, десять минут
              </h2>
            </Reveal>

            <div className="mt-16 grid border-t border-[var(--rule)] lg:grid-cols-3">
              {PHASES.map((p, i) => (
                <Reveal
                  key={p.t}
                  delay={i * 0.07}
                  className="border-b border-[var(--rule-soft)] py-8 lg:border-b-0
                    lg:border-l lg:px-8 lg:py-10 lg:first:border-l-0 lg:first:pl-0"
                >
                  <span className="num text-[11px] text-[var(--ink-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-[24px] sm:text-[28px]">{p.t}</h3>
                  <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                    {p.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="calc" className="zone-warm scroll-mt-8 px-5 pt-24 sm:px-8 sm:pt-32">
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
          Full-bleed scrub. The market audit found that an explicit before and
          after beats abstract percentages, so this gets the widest frame on the
          page and breaks the stacked rhythm everything else follows.
        */}
        <section className="zone-warm px-5 pt-24 sm:px-8 sm:pt-32">
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

        {/* HOT. Results read as a gauge bank. */}
        <section id="cases" className="zone-hot scroll-mt-8 px-5 pt-16 sm:px-8 sm:pt-20">
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
                        {c.city}, {c.note}
                      </p>
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
          Named proof. Anonymous quotes are the category's defining credibility
          gap, so shipping them anonymously here would undercut the whole pitch.
        */}
        <section id="voices" className="zone-hot scroll-mt-8 px-5 pt-16 sm:px-8 sm:pt-20">
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

        <section id="pricing" className="zone-hot scroll-mt-8 px-5 pt-24 sm:px-8 sm:pt-40">
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
                сгорает, тест на семь дней идёт без привязки карты.
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

            {/* Two levers the audit found working elsewhere and nowhere here. */}
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

        {/* COMBUSTION. One promise, one action. */}
        <section id="start" className="zone-hot scroll-mt-8 px-5 pt-24 pb-20 sm:px-8 sm:pt-44 sm:pb-28">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <Kicker>гарантия</Kicker>
              <h2 className="mt-7 max-w-[15ch] text-[38px] sm:text-[62px]">
                Не сдвинулись за неделю, вернём остаток
              </h2>
              <p className="mt-7 max-w-[52ch] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
                Если за первые семь дней позиции по вашим запросам не изменились,
                возвращаем неизрасходованный баланс. Одной кнопкой в кабинете, без
                переписки и объяснений.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Cta href="https://lk.topinjector.ru/register">Запустить тест</Cta>
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

        <section id="faq" className="zone-burn scroll-mt-8 px-5 pt-16 pb-24 sm:px-8 sm:pt-20 sm:pb-32">
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
      </main>

      <Footer links={NAV_LINKS} crossHref="/pro" crossLabel="Для агентств" />
    </div>
  );
}
