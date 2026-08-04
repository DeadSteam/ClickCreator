import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { Boot } from "@/components/boot";
import { Reveal } from "@/components/reveal";
import { Budget } from "@/components/budget";
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
  РАЗГОН. Скорость размером и ритмом.

  Порядок блоков здесь тот же, что на всех пяти вариантах, - это условие
  теста. Различается подача: сверхузкий гротеск капслоком на предельном
  кегле, дорожная разметка вместо линеек, алый ровно на действии и на главном
  числе, никаких бегущих строк и параллакса. Мельтешение читалось бы как
  дешёвый шаблон, что в этой нише смертельно.
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
        {/* 1. Первый экран. */}
        <section className="px-6 pt-16 pb-28 sm:px-10 sm:pt-24 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <p className="text-[19px] text-[var(--color-mark-soft)]">
                Усилитель SEO, а не замена
              </p>
              <h1 className="mt-6 max-w-[13ch]">
                Разгоняем сайт до первой строки Яндекса
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
                <p className="max-w-[44ch] text-[21px] leading-relaxed text-[var(--color-mark-soft)]">
                  Первое движение — вторые-третьи сутки. Списывается за
                  состоявшиеся переходы, а не за отчёты и обещания.
                </p>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Cta href={SITE.register} place="hero">
                      Запустить тест
                    </Cta>
                    <Cta href="#budget" place="hero_budget" variant="outline">
                      Рассчитать бюджет
                    </Cta>
                  </div>
                  <p className="max-w-[40ch] text-[17px] leading-snug text-[var(--color-mark-soft)]">
                    Подключение занимает десять минут, доступ к сайту не нужен.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* 2. Показания. Печатаются как есть, кроме двузначных суток. */}
            <Reveal delay={0.12}>
              <dl className="mt-20 grid gap-x-14 gap-y-10 border-t border-[var(--color-mark)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
                {METRICS.map((m) => (
                  <div key={m.n}>
                    <dt className="flex flex-wrap items-baseline gap-x-3">
                      <span className="day text-[clamp(44px,5vw,64px)]">
                        {m.v}
                      </span>
                      <span className="text-[18px] text-[var(--color-mark-soft)]">
                        {m.u}
                      </span>
                    </dt>
                    <dd className="mt-4 max-w-[22ch] text-[18px] leading-snug text-[var(--color-mark-soft)]">
                      {m.n}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* 3. Боль и выгода. */}
        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[16ch]">Сайт на ходу, а заявок нет</h2>
              <p className="mt-10 max-w-[52ch] text-[19px] leading-relaxed text-[var(--color-mark-soft)]">
                Оптимизация приводит сайт в технический порядок. Но места в
                выдаче Яндекс раздаёт не за порядок, а за поведение живых
                людей. Нет поведения — стоим на месте.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-x-16 gap-y-14 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <h3 className="text-[var(--color-mark-soft)]">Как сейчас</h3>
                <ul className="mt-5 border-t border-[var(--color-rule-soft)]">
                  {COLD.map((t) => (
                    <li
                      key={t}
                      className="border-b border-[var(--color-rule-soft)] py-5 text-[18px] leading-snug text-[var(--color-mark-soft)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <h3>Как с нами</h3>
                <ul className="mt-5 border-t-2 border-[var(--color-blaze)]">
                  {HOT.map((t) => (
                    <li
                      key={t}
                      className="border-b border-[var(--color-rule-soft)] py-5 text-[18px] leading-snug font-semibold"
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
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[14ch]">Три такта за десять минут</h2>
            </Reveal>

            <div className="mt-16 grid gap-x-16 gap-y-14 sm:grid-cols-3">
              {PHASES.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.06}>
                  {/* Номер такта набран той же гарнитурой, что и сутки:
                      это единственная нумерация на странице, и она несёт
                      порядок, а не украшает. */}
                  <p className="day text-[30px] text-[var(--color-blaze)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5">{p.t}</h3>
                  <p className="mt-4 max-w-[38ch] text-[18px] leading-relaxed text-[var(--color-mark-soft)]">
                    {p.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Расчёт бюджета. Ступени, а не ползунок. */}
        <section id="budget" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[16ch]">Прикиньте бюджет</h2>
              <p className="mt-10 max-w-[52ch] text-[19px] leading-relaxed text-[var(--color-mark-soft)]">
                Выберите объём и скорость. Режимы отличаются только ею: набор
                возможностей у всех одинаковый.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-14">
              <Budget />
            </Reveal>
          </div>
        </section>

        {/* 6. До и после на одном проекте. */}
        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[16ch]">
                {BAND_QUERIES} фраз: старт и финиш
              </h2>
              <p className="mt-10 max-w-[52ch] text-[19px] leading-relaxed text-[var(--color-mark-soft)]">
                Один проект: откуда стартовали фразы и куда доехали за
                {BAND_WEEKS} недель.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-14">
              <BeforeAfter />
            </Reveal>
          </div>
        </section>

        {/* 7. Результаты по нишам. */}
        <section id="cases" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-6">
                <h2 className="max-w-[14ch]">До чего разогнались другие</h2>
                <p className="text-[17px] text-[var(--color-mark-soft)]">
                  цифры демо
                </p>
              </div>
            </Reveal>

            <div className="mt-14 border-t border-[var(--color-mark)]">
              {CASES.map((c, i) => (
                <Reveal key={c.niche} delay={i * 0.05}>
                  <article className="grid items-center gap-x-12 gap-y-4 border-b border-[var(--color-rule-soft)] py-8 sm:grid-cols-[1.3fr_1fr_auto]">
                    <div>
                      <h3>{c.niche}</h3>
                      <p className="mt-1.5 text-[17px] text-[var(--color-mark-soft)]">
                        {c.city}, {c.note}
                      </p>
                    </div>

                    <div>
                      <span className="flex h-3 w-full overflow-hidden bg-[var(--color-field-edge)]">
                        <span
                          className="block bg-[var(--color-mark)]"
                          style={{ width: `${c.was}%` }}
                        />
                        <span
                          className="block bg-[var(--color-blaze)]"
                          style={{ width: `${c.top - c.was}%` }}
                        />
                      </span>
                      <p className="mt-3 text-[17px] text-[var(--color-mark-soft)]">
                        было {c.was}, стало {c.top} процентов в ТОП-10
                      </p>
                    </div>

                    <p className="day text-[44px] sm:text-right">
                      {c.top}
                      <span className="ml-1 text-[19px]">%</span>
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Именные отзывы. */}
        <section id="voices" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[14ch]">Слово плательщикам</h2>
            </Reveal>
            <div className="mt-14">
              <Voices />
            </div>
          </div>
        </section>

        {/* 9. Режимы и два рычага. */}
        <section id="speeds" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[13ch]">Три передачи</h2>
            </Reveal>

            <div className="mt-14 border-t border-[var(--color-mark)]">
              {RATES.map((r, i) => (
                <Reveal key={r.plan} delay={i * 0.05}>
                  <div className="grid gap-x-12 gap-y-3 border-b border-[var(--color-rule-soft)] py-8 sm:grid-cols-[6rem_minmax(0,20rem)_1fr] sm:items-baseline">
                    <span className="day text-[46px]">
                      {r.rate}
                      <span className="ml-1 text-[18px]">₽</span>
                    </span>
                    <span>
                      <span className="block font-[family-name:var(--font-tight)] text-[30px] leading-none font-extrabold uppercase">
                        {r.plan}
                      </span>
                      <span className="mt-2 block text-[18px] text-[var(--color-mark-soft)]">
                        {r.who}
                      </span>
                    </span>
                    <span className="text-[18px] text-[var(--color-mark-soft)]">
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
                  <p className="mt-4 max-w-[42ch] text-[18px] leading-relaxed text-[var(--color-mark-soft)]">
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
          другое и намеренно: сайт заявляет предельную скорость и обязан так
          же крупно заявить, как её прекратить. Громкое обещание без видимого
          стоп-крана - главный признак несерьёзности в этой категории.
        */}
        <section id="start" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <div className="border-t border-[var(--color-mark)] pt-14">
                <h2 className="max-w-[13ch]">Стоп-кран в ваших руках</h2>
                <p className="mt-10 max-w-[52ch] text-[21px] leading-relaxed text-[var(--color-mark-soft)]">
                  Кнопка в кабинете тормозит подачу за час, а не в конце
                  оплаченного периода. Остаток не сгорает и лежит на счёте — в
                  том числе под следующий проект.
                </p>
                <div className="mt-12 flex flex-col gap-4 sm:flex-row">
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
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[14ch]">Отвечаем начистоту</h2>
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
