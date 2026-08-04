import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { Boot } from "@/components/boot";
import { Reveal } from "@/components/reveal";
import { Estimate } from "@/components/estimate";
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

const CROSS = { label: "Если вы агентство", href: "/pro" };

/*
  ПРЯМАЯ РЕЧЬ. Письмо от конкретного человека.

  Порядок блоков здесь тот же, что на всех пяти вариантах, - это условие
  теста. Различается голос и способ набора: тёплая бумага, крупный сериф в
  заголовках, гротеск в тексте, одна колонка чтения и врезки на полях.

  Все утверждения от первого лица. Это не украшение: гипотеза варианта в том,
  что человек продаёт лучше сервиса, и «мы» здесь сломало бы её на первой же
  строке.
*/

/*
  Врезка на поле.

  На широком экране уходит влево от колонки текста и выравнивается по правому
  краю, чтобы примыкать к основному тексту. На узком становится обычным
  абзацем с охряной чертой слева: втискивать поле в 375 пикселей значит
  сделать нечитаемыми и врезку, и текст.
*/
function Note({ children }: { children: React.ReactNode }) {
  return (
    <aside className="aside-note cap mt-10 max-w-[32ch] xl:absolute xl:right-[calc(100%+3rem)] xl:mt-2 xl:w-[17rem] xl:max-w-none">
      {children}
    </aside>
  );
}

/*
  Колонка чтения. Та же сетка, что в первом экране, с пустой первой колонкой.

  Раньше отступ задавался через calc от процента ширины и промахивался: доля
  0.34 у грид-колонки считается от ширины за вычетом gap, а calc считал от
  полной, и колонка текста уезжала на два десятка пикселей.
*/
function Column({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[72rem]">
      <div className="grid lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
        <div aria-hidden className="hidden lg:block" />
        <div className="relative max-w-[58ch]">{children}</div>
      </div>
    </div>
  );
}

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
        {/* 1. Первый экран: портрет и начало письма. */}
        <section className="px-6 pt-16 sm:px-10 sm:pt-24">
          <div className="mx-auto max-w-[72rem]">
            <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
              <Reveal>
                <figure className="max-w-[20rem]">
                  {/*
                    ЗАМЕНИТЬ на настоящий портрет: положите файл в
                    public/portrait.jpg. Весь этот вариант проверяет гипотезу
                    «человек продаёт лучше сервиса», и без лица он проверяет
                    что-то другое.
                  */}
                  <div className="portrait aspect-[4/5] w-full" />
                  <figcaption className="cap mt-4">
                    {SITE.author}, {SITE.city}. Здесь будет фотография.
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="cap">Письмо от {SITE.updated}</p>

                <h1 className="mt-6 max-w-[16ch]">
                  Вывожу ваш сайт на первую строку Яндекса
                </h1>

                <p className="mt-8 max-w-[46ch] text-[21px] leading-relaxed">
                  Позиции трогаются на вторые-третьи сутки. Платите мне за
                  состоявшиеся переходы, а не за отчёты и обещания. Ниже
                  расскажу, как это устроено и на что я не соглашаюсь.
                </p>

                <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                  <Cta href={SITE.register} place="hero">
                    Запустить тест
                  </Cta>
                  <Cta href="#money" place="hero_money" variant="quiet">
                    Во что это обойдётся
                  </Cta>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 2. Показания. */}
        <section className="px-6 pt-28 sm:px-10 sm:pt-36">
          <Column>
            <Reveal>
              <dl className="grid gap-x-12 gap-y-10 border-t border-[var(--color-rule)] pt-8 sm:grid-cols-2">
                {METRICS.map((m) => (
                  <div key={m.n}>
                    <dt className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="fig font-[family-name:var(--font-display)] text-[40px] leading-none font-bold">
                        {m.v}
                      </span>
                      <span className="text-[18px] text-[var(--color-ink-soft)]">
                        {m.u}
                      </span>
                    </dt>
                    <dd className="mt-3 max-w-[24ch] text-[18px] leading-snug text-[var(--color-ink-soft)]">
                      {m.n}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Column>
        </section>

        {/* 3. Боль и выгода. */}
        <section id="work" className="scroll-mt-6 px-6 pt-28 sm:px-10 sm:pt-36">
          <Column>
            <Reveal>
              <h2 className="max-w-[18ch]">Сайт у вас есть, а заявок из поиска нет</h2>
              <p className="mt-8 text-[19px] leading-relaxed text-[var(--color-ink-soft)]">
                Обычная оптимизация приводит сайт в технический порядок. Но
                Яндекс смотрит не на порядок, а на то, как ведут себя люди.
                Нет поведения — нет и движения.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-12 sm:grid-cols-2">
              <Reveal delay={0.05}>
                <h3>Как сейчас</h3>
                <ul className="mt-5">
                  {COLD.map((t) => (
                    <li
                      key={t}
                      className="border-t border-[var(--color-rule-soft)] py-4 text-[17px] leading-snug text-[var(--color-ink-soft)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <h3>Как со мной</h3>
                <ul className="mt-5">
                  {HOT.map((t) => (
                    <li
                      key={t}
                      className="stroke-none border-t border-[var(--color-rule)] py-4 text-[17px] leading-snug font-medium"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Column>
        </section>

        {/* 4. Три такта. */}
        <section className="px-6 pt-28 sm:px-10 sm:pt-36">
          <Column>
            <Reveal>
              <h2 className="max-w-[16ch]">Как я это делаю</h2>
            </Reveal>

            <div className="mt-12 flex flex-col gap-10">
              {PHASES.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.06}>
                  <h3>{p.t}</h3>
                  <p className="mt-3 text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
                    {p.d}
                  </p>
                </Reveal>
              ))}
            </div>

            <Note>
              Ни доступа к сайту, ни установки кода, ни договора. Если вам
              обещают «интеграцию» — это не про поведенческие сигналы.
            </Note>
          </Column>
        </section>

        {/* 5. Расчёт. Прикидка встроена в предложение, а не в панель. */}
        <section id="money" className="scroll-mt-6 px-6 pt-28 sm:px-10 sm:pt-36">
          <Column>
            <Reveal>
              <h2 className="max-w-[16ch]">Во что это обойдётся</h2>
              <p className="mt-8 text-[19px] leading-relaxed text-[var(--color-ink-soft)]">
                Я беру за фразу в сутки, а не за проект и не за месяц.
                Посчитайте прямо здесь.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-12">
              <Estimate />
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-14 border-t border-[var(--color-rule)]">
                {RATES.map((r) => (
                  <div
                    key={r.plan}
                    /*
                      Ширины колонок заданы явно, а не через auto. Каждая
                      строка - собственная сетка, и auto считает ширину внутри
                      своей строки: «4 ₽» получал одну ширину, «28 ₽» другую,
                      и названия режимов вставали лесенкой.
                    */
                    className="grid items-baseline gap-x-8 gap-y-1 border-b border-[var(--color-rule-soft)] py-5 sm:grid-cols-[4.5rem_minmax(0,10rem)_1fr]"
                  >
                    <span className="fig text-[21px] font-semibold">
                      {r.rate} ₽
                    </span>
                    <span className="text-[18px]">{r.plan}</span>
                    <span className="text-[17px] text-[var(--color-ink-soft)]">
                      сдвиги через {r.window}, {r.who.toLowerCase()}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </Column>
        </section>

        {/* 6. До и после на одном проекте. */}
        <section className="px-6 pt-28 sm:px-10 sm:pt-36">
          <Column>
            <Reveal>
              <h2 className="max-w-[18ch]">
                {BAND_QUERIES} фраз: как было и как стало
              </h2>
              <p className="mt-8 text-[19px] leading-relaxed text-[var(--color-ink-soft)]">
                Мой проект. Где стояли фразы до подключения и куда они разошлись
                за {BAND_WEEKS} недель.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-12">
              <BeforeAfter />
            </Reveal>
          </Column>
        </section>

        {/* 7. Результаты по нишам. */}
        <section id="cases" className="scroll-mt-6 px-6 pt-28 sm:px-10 sm:pt-36">
          <Column>
            <Reveal>
              <h2 className="max-w-[16ch]">Что вышло у моих клиентов</h2>
              <p className="mt-8 text-[19px] leading-relaxed text-[var(--color-ink-soft)]">
                Какая часть фраз проекта встала в первую десятку. Цифры пока
                демонстрационные.
              </p>
            </Reveal>

            <div className="mt-12 border-t border-[var(--color-rule)]">
              {CASES.map((c, i) => (
                <Reveal key={c.niche} delay={i * 0.05}>
                  <article className="border-b border-[var(--color-rule-soft)] py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                      <h3>{c.niche}</h3>
                      <p className="fig font-[family-name:var(--font-display)] text-[28px] leading-none font-bold text-[var(--color-ochre)]">
                        {c.top} %
                      </p>
                    </div>
                    <p className="mt-2 text-[17px] text-[var(--color-ink-soft)]">
                      {c.city}, {c.note}. Было {c.was} процентов в ТОП-10.
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Column>
        </section>

        {/* 8. Именные отзывы. */}
        <section id="voices" className="scroll-mt-6 px-6 pt-28 sm:px-10 sm:pt-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <h2 className="max-w-[16ch]">Что говорят те, кто платит</h2>
            </Reveal>
            <div className="mt-12">
              <Voices />
            </div>
          </div>
        </section>

        {/* 9. Два рычага. Режимы напечатаны выше, рядом с прикидкой. */}
        <section className="px-6 pt-28 sm:px-10 sm:pt-36">
          <Column>
            <Reveal>
              <h2 className="max-w-[18ch]">Когда деньги идут в обратную сторону</h2>
            </Reveal>

            <div className="mt-12 flex flex-col gap-10">
              {OFFERS.map((o, i) => (
                <Reveal key={o.t} delay={i * 0.06}>
                  <h3 className="max-w-[26ch]">{o.t}</h3>
                  <p className="mt-3 text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
                    {o.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </Column>
        </section>

        {/*
          10. Снятие последнего возражения.

          На месте, где у TopInjector стоит возврат остатка. Здесь обещание
          другое и намеренно: не «верну деньги», а «выключатель на вашей
          стороне».
        */}
        <section className="px-6 pt-28 sm:px-10 sm:pt-40">
          <Column>
            <Reveal>
              <h2 className="max-w-[18ch]">Что остаётся под вашим контролем</h2>
              <p className="mt-8 text-[19px] leading-relaxed text-[var(--color-ink-soft)]">
                То, что можете остановить меня в любой момент одной кнопкой в
                кабинете. Подача прекратится в течение часа, а не в конце
                оплаченного месяца, и неизрасходованный остаток останется вашим —
                он не сгорает. Ни первой позиции, ни ТОП-10, ни «роста в
                несколько раз» я не обещаю: этого не может обещать никто, и вы
                знаете это не хуже меня. Зато выключатель находится на вашей
                стороне, а не на моей.
              </p>
              <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                <Cta href={SITE.register} place="promise">
                  Запустить тест
                </Cta>
                <Cta href={SITE.telegram} place="promise_tg" variant="quiet">
                  Сначала поговорить
                </Cta>
              </div>
            </Reveal>
          </Column>
        </section>

        {/* 11. Вопросы. */}
        <section
          id="faq"
          className="scroll-mt-6 px-6 pt-28 pb-28 sm:px-10 sm:pt-36 sm:pb-36"
        >
          <Column>
            <Reveal>
              <h2>О чём меня чаще всего спрашивают</h2>
            </Reveal>
            <div className="mt-10">
              <Faq items={FAQ} />
            </div>
          </Column>
        </section>
      </main>

      <Footer cross={CROSS} />
    </>
  );
}
