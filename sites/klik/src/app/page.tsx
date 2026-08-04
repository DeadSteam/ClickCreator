import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { Boot } from "@/components/boot";
import { Reveal } from "@/components/reveal";
import { Meter } from "@/components/meter";
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
  VOLUME,
} from "@/lib/content";
import { FaqSchema, OrganizationSchema, ServiceSchema } from "@/lib/seo";

const CROSS = { label: "Для агентств", href: "/pro" };

/*
  КЛИК. Спокойный тёмный продукт.

  Порядок блоков здесь тот же, что на всех пяти вариантах, - это условие
  теста: при одинаковом содержании разница в конверсии наконец относится к
  дизайну, а не к тексту. Различается подача: тёмная сцена, мягкие панели,
  круглые органы управления, один мятный акцент на всю страницу.
*/
export default function Page() {
  const maxOff = Math.round(Math.max(...VOLUME.map((v) => v.off)) * 100);

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

          Три блока - заголовок, счётчик, кнопки - разложены по сетке явно, а
          не порядком в разметке. На широком экране счётчик занимает вторую
          колонку целиком, на узком встаёт между заголовком и кнопками.
          Порядок чтения при этом один и тот же, поэтому клавиатуре и
          скринридеру ничего доопределять не нужно.
        */}
        <section className="glow px-6 pt-32 pb-24 sm:px-10 sm:pt-40 sm:pb-32">
          <div className="mx-auto grid max-w-[72rem] items-center gap-y-12 lg:grid-cols-[1fr_0.9fr] lg:gap-x-20 lg:gap-y-10">
            <Reveal className="lg:col-start-1 lg:row-start-1">
              <h1 className="max-w-[15ch]">
                Поднимаем сайт в Яндексе на первую строку
              </h1>
              <p className="mt-8 max-w-[44ch] text-[19px] leading-relaxed text-[var(--color-text-muted)]">
                Позиции трогаются на вторые-третьи сутки. Платите за
                состоявшиеся переходы, а не за отчёты и обещания.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <Meter />
            </Reveal>

            <Reveal delay={0.08} className="lg:col-start-1 lg:row-start-2">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Cta href={SITE.register} place="hero">
                  Запустить тест
                </Cta>
                <Cta href="#how" place="hero_how" variant="ghost">
                  Как это работает
                </Cta>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. Показания. */}
        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <dl className="grid gap-x-14 gap-y-10 border-t border-[var(--color-line)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
                {METRICS.map((m) => (
                  <div key={m.n}>
                    <dt className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="num text-[clamp(38px,4.4vw,54px)] leading-none font-medium">
                        {m.v}
                      </span>
                      <span className="text-[17px] text-[var(--color-text-muted)]">
                        {m.u}
                      </span>
                    </dt>
                    <dd className="mt-4 max-w-[22ch] text-[17px] leading-snug text-[var(--color-text-muted)]">
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
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <h2 className="max-w-[16ch]">Сайт работает, а заявок из поиска нет</h2>
              <p className="mt-8 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-text-muted)]">
                Обычная оптимизация приводит сайт в технический порядок. Только
                Яндекс расставляет места не по порядку в коде, а по тому, как
                посетители себя ведут. Нет поведения — нет и движения.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <div className="h-full px-1">
                  <h3 className="text-[var(--color-text-muted)]">Как сейчас</h3>
                  <ul className="mt-6">
                    {COLD.map((t) => (
                      <li
                        key={t}
                        className="border-t border-[var(--color-line-soft)] py-5 text-[18px] leading-snug text-[var(--color-text-muted)]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                {/* Единственная поднятая панель в этом блоке. Разница по
                    материалу читается быстрее, чем разница по цвету. */}
                <div className="panel h-full px-7 py-8 sm:px-9">
                  <h3>Как с нами</h3>
                  <ul className="mt-6">
                    {HOT.map((t) => (
                      <li
                        key={t}
                        className="border-t border-[var(--color-line-soft)] py-5 text-[18px] leading-snug"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. Три такта. */}
        <section id="how" className="scroll-mt-24 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <h2 className="max-w-[14ch]">Три шага и десять минут</h2>
            </Reveal>

            <div className="mt-16 grid gap-x-16 gap-y-14 sm:grid-cols-3">
              {PHASES.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.06}>
                  <h3>{p.t}</h3>
                  <p className="mt-4 max-w-[38ch] text-[17px] leading-relaxed text-[var(--color-text-muted)]">
                    {p.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. До и после. Счётчик из блока 5 стоит в первом экране. */}
        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <h2 className="max-w-[16ch]">
                {BAND_QUERIES} фраз: что было и что стало
              </h2>
              <p className="mt-8 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-text-muted)]">
                Где стояли фразы одного проекта до подключения и куда они
                разошлись за {BAND_WEEKS} недель.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-14">
              <BeforeAfter />
            </Reveal>
          </div>
        </section>

        {/* 7. Результаты по нишам. */}
        <section id="cases" className="scroll-mt-24 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-6">
                <h2 className="max-w-[14ch]">Чем это кончилось у других</h2>
                <p className="text-[17px] text-[var(--color-text-muted)]">
                  цифры демонстрационные
                </p>
              </div>
            </Reveal>

            <div className="mt-14 border-t border-[var(--color-line)]">
              {CASES.map((c, i) => (
                <Reveal key={c.niche} delay={i * 0.05}>
                  <article className="grid items-center gap-x-12 gap-y-4 border-b border-[var(--color-line-soft)] py-8 sm:grid-cols-[1.3fr_1fr_auto]">
                    <div>
                      <h3>{c.niche}</h3>
                      <p className="mt-1.5 text-[17px] text-[var(--color-text-muted)]">
                        {c.city}, {c.note}
                      </p>
                    </div>

                    <div>
                      <span className="flex h-3 w-full overflow-hidden rounded-[var(--radius-control)] bg-[var(--color-surface-2)]">
                        <span
                          className="block bg-[var(--color-text-muted)]"
                          style={{ width: `${c.was}%` }}
                        />
                        <span
                          className="block bg-[var(--color-accent)]"
                          style={{ width: `${c.top - c.was}%` }}
                        />
                      </span>
                      <p className="mt-3 text-[17px] text-[var(--color-text-muted)]">
                        было {c.was}, стало {c.top} процентов в ТОП-10
                      </p>
                    </div>

                    <p className="num text-[36px] leading-none font-medium sm:text-right">
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
        <section id="voices" className="scroll-mt-24 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <h2 className="max-w-[14ch]">Слово тем, кто платит</h2>
            </Reveal>
            <div className="mt-14">
              <Voices />
            </div>
          </div>
        </section>

        {/* 9. Режимы и два рычага. */}
        <section id="price" className="scroll-mt-24 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <h2 className="max-w-[15ch]">Режимы различает одна скорость</h2>
            </Reveal>

            <div className="mt-14 border-t border-[var(--color-line-soft)]">
              {RATES.map((r, i) => (
                <Reveal key={r.plan} delay={i * 0.05}>
                  <div className="grid items-baseline gap-x-12 gap-y-2 border-b border-[var(--color-line-soft)] py-8 sm:grid-cols-[5rem_minmax(0,22rem)_1fr]">
                    <span className="num text-[34px] leading-none font-medium">
                      {r.rate}
                      <span className="ml-1.5 text-[17px] text-[var(--color-text-muted)]">
                        ₽
                      </span>
                    </span>
                    <span>
                      <span className="block text-[21px] font-semibold tracking-[-0.02em]">
                        {r.plan}
                      </span>
                      <span className="mt-1 block text-[17px] text-[var(--color-text-muted)]">
                        {r.who}
                      </span>
                    </span>
                    <span className="text-[17px] text-[var(--color-text-muted)]">
                      сдвиги через {r.window}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-[var(--color-text-muted)]">
                Цена указана за одну фразу в сутки до скидки за объём. Скидка
                доходит до {maxOff} процентов и считается автоматически.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-x-16 gap-y-12 sm:grid-cols-2">
              {OFFERS.map((o, i) => (
                <Reveal key={o.t} delay={i * 0.06}>
                  <h3 className="max-w-[24ch]">{o.t}</h3>
                  <p className="mt-4 max-w-[42ch] text-[17px] leading-relaxed text-[var(--color-text-muted)]">
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
        <section id="start" className="scroll-mt-24 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <div className="panel flex flex-col items-center px-7 py-20 text-center sm:px-10 sm:py-28">
                <h2 className="max-w-[14ch]">Выключается за час</h2>
                <p className="mt-8 max-w-[50ch] text-[19px] leading-relaxed text-[var(--color-text-muted)]">
                  Кнопка в кабинете гасит подачу за час, а не по завершении
                  оплаченного периода. Остаток никуда не девается и лежит на
                  счёте сколько нужно: неудачный проект возвращает вам бюджет,
                  а не сжигает его.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Cta href={SITE.register} place="final">
                    Запустить тест
                  </Cta>
                  <Cta href={SITE.telegram} place="final_tg" variant="ghost">
                    Задать вопрос в Telegram
                  </Cta>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 11. Вопросы. */}
        <section id="faq" className="scroll-mt-24 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <h2>Отвечаем без уловок</h2>
            </Reveal>
            <div className="mt-12 max-w-[58rem] border-t border-[var(--color-line-soft)]">
              <Faq items={FAQ} />
            </div>
          </div>
        </section>
      </main>

      <Footer cross={CROSS} />
    </>
  );
}
