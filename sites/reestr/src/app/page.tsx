import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { Boot } from "@/components/boot";
import { Reveal } from "@/components/reveal";
import { BeforeAfter } from "@/components/before-after";
import { Budget } from "@/components/budget";
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
  РЕЕСТР. Издательский разворот.

  Порядок блоков здесь тот же, что на всех пяти вариантах, - это условие
  теста. Различается только подача: крупный сериф, широкие поля, нулевые
  скругления, одна штемпельная краска. Страница должна читаться как хорошо
  набранное издание, а не как страница компании.
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
        <section className="px-6 pt-16 pb-24 sm:px-10 sm:pt-24 sm:pb-32">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h1 className="max-w-[17ch]">
                Выводим сайт на первую строку Яндекса
              </h1>
              <p className="mt-10 max-w-[50ch] text-[21px] leading-relaxed text-[var(--color-ink-soft)]">
                Первые сдвиги приходят на вторые-третьи сутки. Платите за
                состоявшиеся переходы, а не за отчёты и заверения.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
              <dl className="mt-20 grid gap-x-14 gap-y-10 border-t border-[var(--color-ink)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
                {METRICS.map((m) => (
                  <div key={m.n}>
                    <dt className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="num text-[clamp(40px,4.6vw,56px)] leading-none font-medium">
                        {m.v}
                      </span>
                      <span className="text-[18px] text-[var(--color-ink-soft)]">
                        {m.u}
                      </span>
                    </dt>
                    <dd className="mt-4 max-w-[22ch] text-[18px] leading-snug text-[var(--color-ink-soft)]">
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
              <h2 className="max-w-[16ch]">Сайт существует, а заявок из поиска нет</h2>
              <p className="mt-8 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-ink-soft)]">
                Классическая оптимизация приводит сайт в технический порядок.
                Однако Яндекс ранжирует не порядок, а поведение посетителей.
                Нет поведения — нет и перемещения.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-x-16 gap-y-14 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <h3 className="-ml-4 inline-block px-4 py-2">Как сейчас</h3>
                <ul className="mt-4 border-t-2 border-[var(--color-ink)]">
                  {COLD.map((t) => (
                    <li
                      key={t}
                      className="border-b border-[var(--color-rule-soft)] py-5 text-[18px] leading-snug text-[var(--color-ink-soft)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                {/* Единственная закрашенная плашка на главной: штемпельная
                    краска отмечает то, что сайт утверждает от своего имени. */}
                <h3 className="-ml-4 inline-block bg-[var(--color-stamp)] px-4 py-2 text-[var(--color-paper)]">
                  Как с нами
                </h3>
                <ul className="mt-4 border-t-2 border-[var(--color-ink)]">
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
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[14ch]">Три такта и десять минут</h2>
            </Reveal>

            <div className="mt-16 grid gap-x-14 gap-y-14 sm:grid-cols-3">
              {PHASES.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.06}>
                  <h3>{p.t}</h3>
                  <p className="mt-4 max-w-[38ch] text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
                    {p.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Расчёт бюджета. Напечатан, а не посчитан ползунком. */}
        <section id="budget" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[16ch]">Прикиньте бюджет для своего сайта</h2>
              <p className="mt-8 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-ink-soft)]">
                По вертикали объём, по горизонтали скорость. Режимы отличаются
                только ею: набор возможностей у всех одинаковый.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-14">
              <Budget />
            </Reveal>
          </div>
        </section>

        {/* 6. До и после на одном проекте. */}
        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[16ch]">
                {BAND_QUERIES} запросов: до и после
              </h2>
              <p className="mt-8 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-ink-soft)]">
                Сколько фраз одного проекта занимало каждый диапазон позиций до
                подключения и как они распределились спустя {BAND_WEEKS} недель.
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
                <h2 className="max-w-[14ch]">Чего добились другие</h2>
                <p className="text-[17px] text-[var(--color-ink-soft)]">
                  данные демонстрационные
                </p>
              </div>
            </Reveal>

            <div className="mt-14 border-t border-[var(--color-ink)]">
              {CASES.map((c, i) => (
                <Reveal key={c.niche} delay={i * 0.05}>
                  <article className="grid items-center gap-x-12 gap-y-4 border-b border-[var(--color-rule-soft)] py-8 sm:grid-cols-[1.3fr_1fr_auto]">
                    <div>
                      <h3>{c.niche}</h3>
                      <p className="mt-1.5 text-[17px] text-[var(--color-ink-soft)]">
                        {c.city}, {c.note}
                      </p>
                    </div>

                    <div>
                      <span className="flex h-3 w-full overflow-hidden bg-[var(--color-paper-deep)]">
                        <span
                          className="block bg-[var(--color-ink)]"
                          style={{ width: `${c.was}%` }}
                        />
                        <span
                          className="block bg-[var(--color-stamp)]"
                          style={{ width: `${c.top - c.was}%` }}
                        />
                      </span>
                      <p className="mt-3 text-[17px] text-[var(--color-ink-soft)]">
                        было {c.was}, стало {c.top} процентов в ТОП-10
                      </p>
                    </div>

                    <p className="num text-[38px] leading-none font-medium sm:text-right">
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
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[14ch]">Говорят те, кто за это платит</h2>
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
              <h2 className="max-w-[16ch]">Между режимами одна разница — скорость</h2>
            </Reveal>

            <div className="mt-14 border-t border-[var(--color-ink)]">
              {RATES.map((r, i) => (
                <Reveal key={r.plan} delay={i * 0.05}>
                  <div className="grid gap-x-12 gap-y-2 border-b border-[var(--color-rule-soft)] py-8 sm:grid-cols-[5rem_minmax(0,22rem)_1fr] sm:items-baseline">
                    <span className="num text-[34px] leading-none font-medium">
                      {r.rate}
                      <span className="ml-1.5 text-[18px] text-[var(--color-ink-soft)]">
                        ₽
                      </span>
                    </span>
                    <span>
                      <span className="block text-[21px] font-semibold tracking-[-0.015em]">
                        {r.plan}
                      </span>
                      <span className="mt-1 block text-[18px] text-[var(--color-ink-soft)]">
                        {r.who}
                      </span>
                    </span>
                    <span className="text-[18px] text-[var(--color-ink-soft)]">
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
                  <p className="mt-4 max-w-[42ch] text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
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
          стороне». Возврат обсуждали и сняли - в серой нише обещание вернуть
          деньги требует доверия, которого странице ещё не выдали.
        */}
        <section id="start" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <div className="inset px-8 py-20 sm:px-14 sm:py-28">
                <h2 className="max-w-[15ch]">Остановка занимает час</h2>
                <p className="mt-10 max-w-[52ch] text-[21px] leading-relaxed text-[var(--color-ink-soft)]">
                  Кнопка в кабинете останавливает подачу в течение часа, а не по
                  окончании оплаченного периода. Остаток не сгорает и хранится
                  на счёте сколько угодно: неудачный проект высвобождает
                  бюджет, а не расходует его впустую.
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
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2>Ответы без обиняков</h2>
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
