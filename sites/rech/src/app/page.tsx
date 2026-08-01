import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { Boot } from "@/components/boot";
import { Reveal } from "@/components/reveal";
import { Estimate } from "@/components/estimate";
import { Faq } from "@/components/faq";
import { SITE } from "@/lib/site";
import { BODY, DECLINED, FAQ, NOTES, OPENING, RATES, REFUSALS } from "@/lib/content";
import { FaqSchema, OrganizationSchema, ServiceSchema } from "@/lib/seo";

const CROSS = { label: "Если вы агентство", href: "/pro" };

/*
  Врезка на поле.

  На широком экране уходит влево от колонки текста и выравнивается по правому
  краю, чтобы примыкать к основному тексту. На узком становится обычным
  абзацем с охряной чертой слева: втискивать поле в 375 пикселей значит
  сделать нечитаемыми и врезку, и текст.
*/
function Note({ children }: { children: React.ReactNode }) {
  return (
    <aside className="aside-note cap mt-8 max-w-[30ch] text-[14px] leading-relaxed xl:absolute xl:right-[calc(100%+3rem)] xl:mt-2 xl:w-[16rem] xl:max-w-none">
      {children}
    </aside>
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
        {/*
          Первый экран: портрет и начало письма. Кнопки нет, и это условие
          варианта, а не недоделка. Она появится ниже, после списка отказов.
        */}
        <section className="px-5 pt-14 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-[72rem]">
            <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
              <Reveal>
                <figure className="max-w-[20rem]">
                  {/*
                    ЗАМЕНИТЬ на настоящий портрет: положите файл в
                    public/portrait.jpg и раскомментируйте img ниже. Весь этот
                    вариант проверяет гипотезу "человек продаёт лучше сервиса",
                    и без лица он проверяет что-то другое.
                  */}
                  <div className="portrait aspect-[4/5] w-full" />
                  <figcaption className="cap mt-3">
                    {SITE.author}, {SITE.city}. Здесь будет фотография.
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="cap">
                  Письмо от {SITE.updated}
                </p>

                <h1 className="mt-5 max-w-[17ch] text-[38px] sm:text-[52px] lg:text-[60px]">
                  Здравствуйте. Сейчас объясню, чем я занимаюсь
                </h1>

                <div className="mt-8 flex max-w-[54ch] flex-col gap-5 text-[18px] leading-relaxed sm:text-[19px]">
                  {OPENING.map((p) => (
                    <p key={p}>{p.replace("{author}", SITE.author)}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Продолжение письма. Колонка чтения, врезки уходят на поля. */}
        <section id="work" className="scroll-mt-6 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[72rem]">
            {/*
              Та же сетка, что в первом экране, с пустой первой колонкой.
              Раньше здесь был отступ через calc от процента ширины, и он
              промахивался: доля 0.34 у грид-колонки считается от ширины
              за вычетом gap, а calc считал от полной. Колонка текста
              уезжала на два десятка пикселей относительно первого экрана.
            */}
            <div className="grid lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
              <div aria-hidden className="hidden lg:block" />
              <div className="relative max-w-[58ch]">
                {BODY.map((chapter, ci) => (
                  <Reveal key={chapter.h} delay={ci * 0.05} className="mt-16 first:mt-0">
                    <h2 className="max-w-[20ch] text-[28px] sm:text-[36px]">
                      {chapter.h}
                    </h2>
                    <div className="mt-6 flex flex-col gap-5 text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
                      {chapter.p.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>

                    {ci === 0 ? <Note>{NOTES.potolok}</Note> : null}
                    {ci === 1 ? <Note>{NOTES.vozvrat}</Note> : null}
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/*
          Отказы. Самый сильный блок письма и единственное место, где список
          оформлен списком: перечисление того, чего человек не делает, читается
          только перечислением.
        */}
        <section id="refusals" className="scroll-mt-6 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[72rem]">
            {/*
              Та же сетка, что в первом экране, с пустой первой колонкой.
              Раньше здесь был отступ через calc от процента ширины, и он
              промахивался: доля 0.34 у грид-колонки считается от ширины
              за вычетом gap, а calc считал от полной. Колонка текста
              уезжала на два десятка пикселей относительно первого экрана.
            */}
            <div className="grid lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
              <div aria-hidden className="hidden lg:block" />
              <div className="max-w-[58ch]">
                <Reveal>
                  <h2 className="max-w-[18ch] text-[28px] sm:text-[36px]">
                    Чего я не делаю ни за какие деньги
                  </h2>
                </Reveal>

                <dl className="mt-10 border-t border-[var(--color-rule-soft)]">
                  {REFUSALS.map((r, i) => (
                    <Reveal key={r.t} delay={i * 0.04}>
                      <div className="border-b border-[var(--color-rule-hair)] py-6">
                        <dt className="font-[family-name:var(--font-display)] text-[21px] leading-snug font-bold tracking-[-0.015em] sm:text-[23px]">
                          {r.t}
                        </dt>
                        <dd className="mt-2.5 text-[17px] leading-relaxed text-[var(--color-ink-soft)]">
                          {r.d}
                        </dd>
                      </div>
                    </Reveal>
                  ))}
                </dl>

                {/*
                  Первая кнопка на странице. Всё, что до неё, - объяснение,
                  а не продажа.
                */}
                <Reveal delay={0.1}>
                  <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Cta href={SITE.register} place="after_refusals">
                      Хорошо, давайте попробуем
                    </Cta>
                    <p className="max-w-[28ch] text-[15px] leading-snug text-[var(--color-ink-faint)]">
                      Семь дней без списаний и без привязки карты.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Кому отказал в этом месяце. Конкретика вместо утверждения о честности. */}
        <section className="px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[72rem]">
            {/*
              Та же сетка, что в первом экране, с пустой первой колонкой.
              Раньше здесь был отступ через calc от процента ширины, и он
              промахивался: доля 0.34 у грид-колонки считается от ширины
              за вычетом gap, а calc считал от полной. Колонка текста
              уезжала на два десятка пикселей относительно первого экрана.
            */}
            <div className="grid lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
              <div aria-hidden className="hidden lg:block" />
              <div className="relative max-w-[58ch]">
                <Reveal>
                  <h2 className="max-w-[20ch] text-[28px] sm:text-[36px]">
                    Кому я отказал за последний месяц
                  </h2>
                </Reveal>

                <Reveal delay={0.05}>
                  <ul className="mt-9 border-t border-[var(--color-rule-soft)]">
                    {DECLINED.map((d) => (
                      <li
                        key={`${d.niche}-${d.city}`}
                        className="grid gap-x-6 gap-y-1 border-b border-[var(--color-rule-hair)] py-4 sm:grid-cols-[1fr_1.1fr]"
                      >
                        <span className="text-[17px]">
                          {d.niche}
                          <span className="text-[var(--color-ink-faint)]">
                            , {d.city}
                          </span>
                        </span>
                        <span className="text-[16px] text-[var(--color-ink-soft)]">
                          {d.why}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Note>{NOTES.otkaz}</Note>
              </div>
            </div>
          </div>
        </section>

        {/* Деньги. Прикидка встроена в предложение, а не выделена в панель. */}
        <section id="money" className="scroll-mt-6 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[72rem]">
            {/*
              Та же сетка, что в первом экране, с пустой первой колонкой.
              Раньше здесь был отступ через calc от процента ширины, и он
              промахивался: доля 0.34 у грид-колонки считается от ширины
              за вычетом gap, а calc считал от полной. Колонка текста
              уезжала на два десятка пикселей относительно первого экрана.
            */}
            <div className="grid lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
              <div aria-hidden className="hidden lg:block" />
              <div className="max-w-[58ch]">
                <Reveal>
                  <h2 className="max-w-[16ch] text-[28px] sm:text-[36px]">
                    Сколько это стоит
                  </h2>
                  <p className="mt-6 text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
                    Я беру за фразу в сутки, а не за проект и не за месяц.
                    Посчитайте прямо здесь.
                  </p>
                </Reveal>

                <Reveal delay={0.08} className="mt-10">
                  <Estimate />
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-12 border-t border-[var(--color-rule-soft)]">
                    {RATES.map((r) => (
                      <div
                        key={r.plan}
                        className="grid items-baseline gap-x-6 gap-y-1 border-b border-[var(--color-rule-hair)] py-4 sm:grid-cols-[auto_1fr_1.4fr]"
                      >
                        <span className="fig text-[20px] font-semibold">
                          {r.rate} ₽
                        </span>
                        <span className="text-[17px]">{r.plan}</span>
                        <span className="text-[16px] text-[var(--color-ink-soft)]">
                          сдвиги через {r.window}, {r.who}
                        </span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Обещание. Единственное, которое я даю. */}
        <section className="px-5 pt-24 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-[72rem]">
            {/*
              Та же сетка, что в первом экране, с пустой первой колонкой.
              Раньше здесь был отступ через calc от процента ширины, и он
              промахивался: доля 0.34 у грид-колонки считается от ширины
              за вычетом gap, а calc считал от полной. Колонка текста
              уезжала на два десятка пикселей относительно первого экрана.
            */}
            <div className="grid lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
              <div aria-hidden className="hidden lg:block" />
              <div className="max-w-[58ch]">
                <Reveal>
                  <h2 className="max-w-[18ch] text-[32px] sm:text-[44px]">
                    Что вы контролируете
                  </h2>
                  <p className="mt-6 text-[18px] leading-relaxed text-[var(--color-ink-soft)] sm:text-[19px]">
                    Что вы можете остановить меня в любой момент одной кнопкой в
                    кабинете. Подача прекратится в течение часа, а не в конце
                    оплаченного месяца, и неизрасходованный баланс останется
                    вашим - он не сгорает. Ни первой позиции, ни ТОП-10, ни &laquo;роста в
                    несколько раз&raquo; я не обещаю: этого не может обещать
                    никто, и вы это знаете не хуже меня. Зато выключатель
                    находится на вашей стороне, а не на моей.
                  </p>
                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Cta href={SITE.register} place="promise">
                      Хорошо, давайте попробуем
                    </Cta>
                    <Cta href={SITE.telegram} place="promise_tg" variant="quiet">
                      Сначала поговорить
                    </Cta>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-6 px-5 pt-24 pb-24 sm:px-8 sm:pt-32 sm:pb-32">
          <div className="mx-auto max-w-[72rem]">
            {/*
              Та же сетка, что в первом экране, с пустой первой колонкой.
              Раньше здесь был отступ через calc от процента ширины, и он
              промахивался: доля 0.34 у грид-колонки считается от ширины
              за вычетом gap, а calc считал от полной. Колонка текста
              уезжала на два десятка пикселей относительно первого экрана.
            */}
            <div className="grid lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
              <div aria-hidden className="hidden lg:block" />
              <div className="max-w-[58ch]">
                <Reveal>
                  <h2 className="text-[26px] sm:text-[34px]">
                    Что меня обычно спрашивают
                  </h2>
                </Reveal>
                <div className="mt-8">
                  <Faq items={FAQ} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer cross={CROSS} />
    </>
  );
}
