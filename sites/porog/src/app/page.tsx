import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { Boot } from "@/components/boot";
import { Reveal } from "@/components/reveal";
import { Calc } from "@/components/calc";
import { BeforeAfter } from "@/components/before-after";
import { Voices } from "@/components/voices";
import { Faq } from "@/components/faq";
import { SITE } from "@/lib/site";
import {
  BAND_QUERIES,
  BAND_WEEKS,
  CASES,
  COLD,
  FAQ,
  HOT,
  METRICS,
  OFFERS,
  PHASES,
  RATES,
} from "@/lib/content";
import { FaqSchema, OrganizationSchema, ServiceSchema } from "@/lib/seo";

const CROSS = { label: "Для агентств", href: "/pro" };

/*
  ПОРОГ. Холодный белый, тяжёлый узкий гротеск, прямые углы.

  Порядок блоков здесь тот же, что на всех пяти вариантах, - это условие
  теста. Различается подача: композиция первого экрана по центру (единственный
  из шести сайтов), одна гарнитура на всё, нулевые скругления и сигнальный
  жёлтый ровно в двух местах.
*/
export default function Page() {
  return (
    <>
      <Boot page="hero_view" />
      <OrganizationSchema />
      <FaqSchema items={FAQ} />
      <ServiceSchema
        name="Продвижение сайта в Яндексе поведенческими сигналами"
        description={SITE.description}
        lowPrice={RATES[0].rate}
        highPrice={RATES[RATES.length - 1].rate}
      />

      <Nav cross={CROSS} />

      <main id="main" tabIndex={-1}>
        {/*
          1. Первый экран.

          Композиция по центру выбрана намеренно и только здесь: остальные
          пять сайтов выровнены влево. Центр - это поза заявления, а не
          рассказа.
        */}
        <section className="px-6 pt-20 pb-28 sm:px-10 sm:pt-28 sm:pb-36">
          <div className="mx-auto max-w-[62rem] text-center">
            <Reveal>
              <h1 className="mx-auto max-w-[16ch]">
                Ставим сайт на первую строку Яндекса
              </h1>
              <p className="mx-auto mt-10 max-w-[52ch] text-[21px] leading-relaxed text-[var(--color-graphite-soft)]">
                Первое движение — вторые-третьи сутки. Платите за переходы,
                а не за отчёты и обещания.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Cta href={SITE.register} place="hero">
                  Запустить тест
                </Cta>
                <Cta href="#budget" place="hero_budget" variant="outline">
                  Рассчитать бюджет
                </Cta>
              </div>
            </Reveal>

            {/* 2. Показания. */}
            <Reveal delay={0.1}>
              <dl className="mt-20 grid gap-x-14 gap-y-10 border-t border-[var(--color-graphite)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
                {METRICS.map((m) => (
                  <div key={m.n}>
                    <dt className="flex flex-wrap items-baseline justify-center gap-x-2.5">
                      <span className="num text-[clamp(38px,4.4vw,54px)] leading-none font-bold tracking-[-0.045em]">
                        {m.v}
                      </span>
                      <span className="text-[18px] font-normal text-[var(--color-graphite-soft)]">
                        {m.u}
                      </span>
                    </dt>
                    <dd className="mx-auto mt-4 max-w-[22ch] text-[18px] leading-snug text-[var(--color-graphite-soft)]">
                      {m.n}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* 3. Боль и выгода. Две колонки равной длины. */}
        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[16ch]">Сайт есть. Заявок из поиска нет</h2>
              <p className="mt-8 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-graphite-soft)]">
                Оптимизация приводит сайт в технический порядок. Яндекс считает
                не порядок, а поведение людей на сайте. Нет поведения — нет
                движения.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-x-16 gap-y-14 lg:grid-cols-2">
              {/*
                Оба заголовка набраны плашкой одного размера, и только одна из
                них закрашена сигнальным. Так линейки под ними встают на одну
                высоту: без общей плашки жёлтый прямоугольник опускал правый
                список на шестнадцать пикселей, и колонки переставали читаться
                как пара. Отрицательный отступ слева возвращает текст на общий
                край колонки.
              */}
              <Reveal delay={0.05}>
                <h3 className="-ml-4 inline-block px-4 py-2">Как сейчас</h3>
                <ul className="mt-4 flex flex-col border-t-2 border-[var(--color-graphite)]">
                  {COLD.map((t) => (
                    <li
                      key={t}
                      className="border-b border-[var(--color-rule-soft)] py-5 text-[18px] leading-snug text-[var(--color-graphite-soft)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                {/* Сигнальная плашка. Первое из двух мест на главной, где
                    появляется этот цвет. */}
                <h3 className="warn -ml-4 inline-block px-4 py-2">Как с нами</h3>
                <ul className="mt-4 flex flex-col border-t-2 border-[var(--color-graphite)]">
                  {HOT.map((t) => (
                    <li
                      key={t}
                      className="border-b border-[var(--color-rule-soft)] py-5 text-[18px] leading-snug font-medium"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. Три такта. */}
        <section id="how" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[14ch]">Три шага. Десять минут</h2>
            </Reveal>

            <div className="mt-16 grid gap-x-14 gap-y-14 sm:grid-cols-3">
              {PHASES.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.06}>
                  <h3>{p.t}</h3>
                  <p className="mt-4 max-w-[38ch] text-[18px] leading-relaxed text-[var(--color-graphite-soft)]">
                    {p.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Расчёт бюджета. Форма с подачей, а не ползунок. */}
        <section id="budget" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[16ch]">Посчитайте свой бюджет</h2>
              <p className="mt-8 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-graphite-soft)]">
                Укажите объём и режим. Между режимами меняется только скорость:
                возможности у всех одни и те же.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-14">
              <Calc />
            </Reveal>
          </div>
        </section>

        {/* 6. До и после на одном проекте. */}
        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[16ch]">
                {BAND_QUERIES} фраз. До и после
              </h2>
              <p className="mt-8 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-graphite-soft)]">
                Один проект. Где стояли фразы до подключения и где оказались
                через {BAND_WEEKS} недель.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-14">
              <BeforeAfter />
            </Reveal>
          </div>
        </section>

        {/* 7. Результаты по нишам. */}
        <section id="cases" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-6">
                <h2 className="max-w-[14ch]">Что вышло у других</h2>
                <p className="text-[17px] text-[var(--color-graphite-soft)]">
                  данные демо
                </p>
              </div>
            </Reveal>

            <div className="mt-14 border-t-2 border-[var(--color-graphite)]">
              {CASES.map((c, i) => (
                <Reveal key={c.niche} delay={i * 0.05}>
                  <article className="grid items-center gap-x-12 gap-y-4 border-b border-[var(--color-rule-soft)] py-8 sm:grid-cols-[1.3fr_1fr_auto]">
                    <div>
                      <h3>{c.niche}</h3>
                      <p className="mt-1.5 text-[17px] text-[var(--color-graphite-soft)]">
                        {c.city}, {c.note}
                      </p>
                    </div>

                    <div>
                      <span className="flex h-3 w-full overflow-hidden bg-[var(--color-sheet-sink)]">
                        <span
                          className="block bg-[var(--color-graphite)] opacity-40"
                          style={{ width: `${c.was}%` }}
                        />
                        <span
                          className="block bg-[var(--color-graphite)]"
                          style={{ width: `${c.top - c.was}%` }}
                        />
                      </span>
                      <p className="mt-3 text-[17px] text-[var(--color-graphite-soft)]">
                        было {c.was}, стало {c.top} процентов в ТОП-10
                      </p>
                    </div>

                    <p className="num text-[38px] leading-none font-bold sm:text-right">
                      {c.top}
                      <span className="ml-1 text-[19px] font-normal">%</span>
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Именные отзывы. */}
        <section id="voices" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[14ch]">Говорят плательщики</h2>
            </Reveal>
            <div className="mt-14">
              <Voices />
            </div>
          </div>
        </section>

        {/* 9. Режимы и два рычага. */}
        <section id="rates" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[16ch]">Режимы различаются скоростью. И только</h2>
            </Reveal>

            <div className="mt-14 border-t-2 border-[var(--color-graphite)]">
              {RATES.map((r, i) => (
                <Reveal key={r.plan} delay={i * 0.05}>
                  <div className="grid gap-x-12 gap-y-2 border-b border-[var(--color-rule-soft)] py-8 sm:grid-cols-[5rem_minmax(0,22rem)_1fr] sm:items-baseline">
                    <span className="num text-[34px] leading-none font-bold">
                      {r.rate}
                      <span className="ml-1.5 text-[18px] font-normal text-[var(--color-graphite-soft)]">
                        ₽
                      </span>
                    </span>
                    <span>
                      <span className="block text-[21px] font-bold tracking-[-0.025em]">
                        {r.plan}
                      </span>
                      <span className="mt-1 block text-[18px] font-normal text-[var(--color-graphite-soft)]">
                        {r.who}
                      </span>
                    </span>
                    <span className="text-[18px] text-[var(--color-graphite-soft)]">
                      сдвиги через {r.window}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-16 grid gap-x-16 gap-y-12 sm:grid-cols-2">
              {OFFERS.map((o, i) => (
                <Reveal key={o.t} delay={i * 0.06}>
                  <h3 className="max-w-[24ch]">{o.t}</h3>
                  <p className="mt-4 max-w-[42ch] text-[18px] leading-relaxed text-[var(--color-graphite-soft)]">
                    {o.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/*
          10. Снятие последнего возражения.

          На месте, где у TopInjector стоит возврат остатка. Здесь обещание
          другое и намеренно: не «вернём деньги», а «выключатель на вашей
          стороне».
        */}
        <section id="start" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <div className="panel px-8 py-20 text-center sm:px-14 sm:py-28">
                <h2 className="mx-auto max-w-[15ch]">Стоп за один час</h2>
                <p className="mx-auto mt-8 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-graphite-soft)]">
                  Кнопка в кабинете гасит подачу за час, а не в конце оплаченного
                  периода. Остаток не сгорает и ждёт своего часа — в том числе
                  на другом проекте.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Cta href={SITE.register} place="final">
                    Запустить тест
                  </Cta>
                  <Cta href={SITE.telegram} place="final_tg" variant="outline">
                    Задать вопрос в Telegram
                  </Cta>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 11. Вопросы. */}
        <section id="faq" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2>Отвечаем прямо</h2>
            </Reveal>
            <div className="mt-12">
              <Faq items={FAQ} />
            </div>
          </div>
        </section>
      </main>

      <Footer cross={CROSS} />
    </>
  );
}
