import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { Boot } from "@/components/boot";
import { Reveal } from "@/components/reveal";
import { Gate } from "@/components/gate";
import { Calc } from "@/components/calc";
import { Faq } from "@/components/faq";
import { SITE } from "@/lib/site";
import { ADMIT, CHAPTERS, FAQ, MODES, REFUSE } from "@/lib/content";
import { FaqSchema, OrganizationSchema, ServiceSchema } from "@/lib/seo";

const CROSS = { label: "Для агентств", href: "/pro" };

export default function Page() {
  return (
    <>
      <Boot page="hero_view" />
      <OrganizationSchema />
      <FaqSchema items={FAQ} />
      <ServiceSchema
        name="Усиление поведенческих сигналов для сайтов в ТОП-50 Яндекса"
        description={SITE.description}
        lowPrice={MODES[0].rate}
        highPrice={MODES[MODES.length - 1].rate}
      />

      <Nav cross={CROSS} />

      <main id="main" tabIndex={-1} className="doc">
        {/*
          Первый экран отдан проверке допуска, а не офферу. Заголовок говорит
          "мы берём не всех" и сразу уступает место анкете: посетитель должен
          на первом же экране понять, что здесь ему могут отказать.
        */}
        <section
          id="gate"
          className="grid-paper scroll-mt-4 border-b border-[var(--color-rule-soft)] px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-20"
        >
          <div className="mx-auto max-w-[84rem]">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
              <Reveal>
                <span className="mark">редакция {SITE.revision}</span>
                <h1 className="mt-6 max-w-[13ch] text-[38px] sm:text-[54px] lg:text-[60px]">
                  Мы берём не всех и говорим об этом до оплаты
                </h1>
                <p className="mt-6 max-w-[42ch] text-[16px] leading-relaxed text-[var(--color-graphite-soft)]">
                  Поведенческие сигналы двигают позицию, но не создают её.
                  Примерно каждому четвёртому обратившемуся мы отказываем -
                  проверьте себя за три вопроса, это бесплатно и без
                  регистрации.
                </p>

                {/*
                  Единица измерения вынесена из .num в основную гарнитуру.
                  В Cousine нет знака рубля, и внутри моноширинного класса он
                  подменяется системным шрифтом - кегль и начертание уезжают,
                  строка выглядит собранной из двух разных шрифтов.
                */}
                <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5 border-t border-[var(--color-rule-soft)] pt-6">
                  <div>
                    <dt className="mark">отказов</dt>
                    <dd className="mt-1.5 flex items-baseline gap-1.5">
                      <span className="num text-[26px] font-medium">24</span>
                      <span className="text-[15px] text-[var(--color-graphite-soft)]">
                        процента
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="mark">тест без списаний</dt>
                    <dd className="mt-1.5 flex items-baseline gap-1.5">
                      <span className="num text-[26px] font-medium">7</span>
                      <span className="text-[15px] text-[var(--color-graphite-soft)]">
                        суток
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="mark">ставка от</dt>
                    <dd className="mt-1.5 flex items-baseline gap-1.5">
                      <span className="num text-[26px] font-medium">4</span>
                      <span className="text-[15px] text-[var(--color-graphite-soft)]">
                        ₽ за фразу
                      </span>
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={0.1}>
                <Gate />
              </Reveal>
            </div>
          </div>
        </section>

        {/*
          Условия применения. Две колонки равной длины: перевес в сторону
          "подходит" мгновенно превратил бы регламент обратно в рекламу.
        */}
        <section className="px-5 pt-20 sm:px-8 sm:pt-24">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <h2 className="max-w-[17ch] text-[30px] sm:text-[42px]">
                Кому услуга помогает, а кому нет
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-px bg-[var(--color-rule-soft)] lg:grid-cols-2">
              <Reveal delay={0.05} className="bg-[var(--color-sheet-raise)]">
                <div className="h-full p-6 sm:p-8">
                  <span className="mark">берём в работу</span>
                  <ul className="mt-6 flex flex-col">
                    {ADMIT.map((t, i) => (
                      <li
                        key={t}
                        className="flex gap-5 border-t border-[var(--color-rule-hair)] py-4 first:border-t-0 first:pt-0"
                      >
                        <span className="num shrink-0 text-[11px] text-[var(--color-graphite-faint)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] leading-snug text-[var(--color-graphite-soft)]">
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="bg-[var(--color-sheet-raise)]">
                <div className="h-full p-6 sm:p-8">
                  {/* Лента отмечает отказную колонку. Второе и последнее место
                      на главной, где она появляется. */}
                  <div aria-hidden className="hazard mb-6 h-1.5" />
                  <span className="mark">откажем</span>
                  <ul className="mt-6 flex flex-col">
                    {REFUSE.map((t, i) => (
                      <li
                        key={t}
                        className="flex gap-5 border-t border-[var(--color-rule-hair)] py-4 first:border-t-0 first:pt-0"
                      >
                        <span className="num shrink-0 text-[11px] text-[var(--color-graphite-faint)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] leading-snug font-medium">
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

        {/* Технические условия. Нумерация ведётся счётчиками CSS. */}
        <section id="terms" className="scroll-mt-4 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="max-w-[15ch] text-[30px] sm:text-[42px]">
                  Технические условия
                </h2>
                <p className="max-w-[40ch] text-[15px] leading-relaxed text-[var(--color-graphite-soft)]">
                  Три раздела: как устроен метод, какой у него риск и что мы
                  берём на себя. Раздел про риск идёт вторым, а не спрятан в
                  примечания.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 flex flex-col gap-12">
              {CHAPTERS.map((ch, ci) => (
                <Reveal key={ch.title} delay={ci * 0.05} className="chapter">
                  <div className="border-t border-[var(--color-graphite)] pt-5">
                    <h3 className="flex items-baseline gap-4 text-[24px] sm:text-[28px]">
                      <span
                        aria-hidden
                        className="chapter-no num text-[13px] font-normal text-[var(--color-graphite-faint)]"
                      />
                      {ch.title}
                    </h3>

                    <ol className="mt-6">
                      {ch.clauses.map((c) => (
                        <li
                          key={c}
                          className="clause grid grid-cols-[3rem_1fr] items-baseline gap-x-4 border-b border-[var(--color-rule-hair)] py-4"
                        >
                          <span
                            aria-hidden
                            className="clause-no num text-[11px] text-[var(--color-graphite-faint)]"
                          />
                          <span className="max-w-[74ch] text-[15px] leading-relaxed text-[var(--color-graphite-soft)]">
                            {c}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Режимы. Отличаются скоростью и предельной долей подачи. */}
        <section id="modes" className="scroll-mt-4 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <h2 className="max-w-[20ch] text-[30px] sm:text-[42px]">
                Режимы отличаются скоростью и предельной долей подачи
              </h2>
            </Reveal>

            <div className="mt-12 border-t border-[var(--color-graphite)]">
              {MODES.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.05}>
                  <div className="grid items-baseline gap-x-8 gap-y-2 border-b border-[var(--color-rule-hair)] py-6 sm:grid-cols-[auto_1fr_auto_1fr_1.5fr]">
                    <span className="num text-[28px] leading-none font-medium sm:text-[34px]">
                      {m.rate}
                      <span className="rub ml-1 text-[13px]">₽</span>
                    </span>
                    <span className="text-[18px] font-medium tracking-[-0.02em]">
                      {m.name}
                    </span>
                    <span className="num text-[14px] text-[var(--color-graphite)]">
                      {m.share}
                    </span>
                    <span className="text-[14px] text-[var(--color-graphite-soft)]">
                      сдвиги через {m.window}
                    </span>
                    <span className="text-[14px] text-[var(--color-graphite-soft)]">
                      {m.who}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[62ch] text-[14px] leading-relaxed text-[var(--color-graphite-faint)]">
                Ставка указана за одну фразу в сутки. Третья колонка - предельная
                доля подаваемых сессий в общем трафике сайта: превысить её нельзя,
                кабинет не даст выбрать режим.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="calc" className="scroll-mt-4 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <h2 className="max-w-[18ch] text-[30px] sm:text-[42px]">
                Заявка на режим
              </h2>
              <p className="mt-5 max-w-[54ch] text-[16px] leading-relaxed text-[var(--color-graphite-soft)]">
                Заполните три поля и подайте форму. Мы посчитаем не только списание,
                но и долю подачи в вашем трафике, а на превышении предела
                откажем в заявленном режиме - до регистрации, а не после оплаты.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <Calc />
            </Reveal>
          </div>
        </section>

        <section className="px-5 pt-24 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <div className="border-t border-[var(--color-graphite)] pt-10">
                <h2 className="max-w-[17ch] text-[34px] sm:text-[50px]">
                  Подача останавливается за час
                </h2>
                <p className="mt-6 max-w-[56ch] text-[16px] leading-relaxed text-[var(--color-graphite-soft)] sm:text-[17px]">
                  Обязательство записано пунктом 3.3 технических условий выше. Кнопка
                  в кабинете прекращает сессии в течение часа, а не в конце
                  оплаченного периода. Неизрасходованный баланс не сгорает и
                  ждёт, пока он вам понадобится, - в том числе на другом проекте.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Cta href="#gate" place="final_gate">
                    Проверить допуск
                  </Cta>
                  <Cta href={SITE.telegram} place="final_tg" variant="outline">
                    Спросить в Telegram
                  </Cta>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="scroll-mt-4 px-5 pt-24 pb-24 sm:px-8 sm:pt-32 sm:pb-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <h2 className="text-[28px] sm:text-[36px]">Вопросы</h2>
            </Reveal>
            <div className="mt-10">
              <Faq items={FAQ} />
            </div>
          </div>
        </section>
      </main>

      <Footer cross={CROSS} />
    </>
  );
}
