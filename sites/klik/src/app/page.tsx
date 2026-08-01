import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { Boot } from "@/components/boot";
import { Reveal } from "@/components/reveal";
import { Meter } from "@/components/meter";
import { Faq } from "@/components/faq";
import { SITE } from "@/lib/site";
import { FAQ, INCLUDED, SPEEDS } from "@/lib/content";
import { FaqSchema, OrganizationSchema, ServiceSchema } from "@/lib/seo";

const CROSS = { label: "Для агентств", href: "/pro" };

export default function Page() {
  return (
    <>
      <Boot page="hero_view" />
      <OrganizationSchema />
      <FaqSchema items={FAQ} />
      <ServiceSchema
        name="Продвижение сайта в Яндексе поведенческими сигналами"
        description={SITE.description}
        lowPrice={SPEEDS[0].rate}
        highPrice={SPEEDS[SPEEDS.length - 1].rate}
      />

      <Nav cross={CROSS} />

      <main id="main" tabIndex={-1}>
        {/*
          Первый экран - счётчик, и только он. Заголовка над ним нет намеренно:
          заголовок объяснял бы, что сейчас будет, вместо того чтобы дать
          посчитать. Вся содержательная часть сайта живёт ниже, после того как
          посетитель получил свою цифру.
        */}
        <section id="meter" className="scroll-mt-4 px-5 pt-8 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-[84rem]">
            <Meter />
          </div>
        </section>

        {/*
          Заявление идёт после расчёта, а не до. Это и есть гипотеза варианта:
          человек, увидевший свою цену, читает следующий абзац иначе, чем
          человек, которому эту цену ещё только обещают показать.
        */}
        <section className="px-5 pt-20 sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-[84rem]">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
              <Reveal>
                <h1 className="max-w-[17ch] text-[34px] sm:text-[50px] lg:text-[58px]">
                  Цену продвижения в Яндексе вы посчитали. Теперь о том, что
                  за ней стоит
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="max-w-[46ch] text-[16px] leading-relaxed text-[var(--color-read-soft)] sm:text-[17px]">
                  Мы поднимаем позиции сайта в Яндексе за счёт поведенческих
                  сигналов и берём деньги за фактические переходы. Ни абонентской
                  платы, ни сгорающего баланса, ни расчёта по звонку.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Cta href={SITE.register} place="lead">
                    Открыть счёт
                  </Cta>
                  <Cta href="#included" place="lead_included" variant="outline">
                    Что входит в переход
                  </Cta>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* За что списываются деньги. Прямой ответ на главное возражение
            категории: "непонятно, за что именно платишь". */}
        <section id="included" className="scroll-mt-4 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <h2 className="max-w-[16ch] text-[30px] sm:text-[42px]">
                Что вы покупаете за один переход
              </h2>
            </Reveal>

            <div className="mt-12 grid border-t border-[var(--color-rule)] lg:grid-cols-2">
              {INCLUDED.map((item, i) => (
                <Reveal
                  key={item.t}
                  delay={i * 0.05}
                  className={`border-b border-[var(--color-rule-hair)] py-7 lg:py-9 ${
                    i % 2 === 1
                      ? "lg:border-l lg:border-l-[var(--color-rule-soft)] lg:pl-8"
                      : "lg:pr-8"
                  }`}
                >
                  <span className="read text-[11px] text-[var(--color-read-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 max-w-[24ch] text-[21px] sm:text-[23px]">
                    {item.t}
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[var(--color-read-soft)]">
                    {item.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Скорость. Три режима строками прайс-листа, а не тремя карточками. */}
        <section id="speeds" className="scroll-mt-4 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="max-w-[18ch] text-[30px] sm:text-[42px]">
                  Ставка отличается только скоростью
                </h2>
                <p className="max-w-[38ch] text-[15px] leading-relaxed text-[var(--color-read-soft)]">
                  Набор возможностей у всех режимов одинаковый. Разница в том,
                  сколько сессий в сутки приходится на одну фразу.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 border-t border-[var(--color-rule)]">
              {SPEEDS.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.05}>
                  <div className="grid items-baseline gap-x-8 gap-y-2 border-b border-[var(--color-rule-hair)] py-6 sm:grid-cols-[auto_1fr_auto_1fr_1.4fr]">
                    <span className="read text-[28px] font-medium sm:text-[34px]">
                      {s.rate}
                      <span className="ml-1 text-[13px]">₽</span>
                    </span>
                    <span className="text-[18px] font-medium tracking-[-0.03em]">
                      {s.name}
                    </span>
                    <span className="read text-[14px] text-[var(--color-read)]">
                      {s.perPhrase} сес/фраза
                    </span>
                    <span className="text-[14px] text-[var(--color-read-soft)]">
                      сдвиги через {s.shift}
                    </span>
                    <span className="text-[14px] text-[var(--color-read-soft)]">
                      {s.who}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[62ch] text-[14px] leading-relaxed text-[var(--color-read-faint)]">
                Ставка указана за одну фразу в сутки до объёмной скидки. Третья
                колонка - сколько сессий в сутки приходится на фразу в этом
                режиме: от неё зависит и скорость роста, и заметность подачи.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-5 pt-24 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <div className="border-t border-[var(--color-rule)] pt-10">
                <h2 className="max-w-[16ch] text-[34px] sm:text-[50px]">
                  Счётчик останавливается за час
                </h2>
                <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-[var(--color-read-soft)] sm:text-[17px]">
                  Кнопка в кабинете прекращает списание в течение часа, а не в конце
                  оплаченного периода. Неизрасходованный баланс не сгорает и
                  лежит на счёте сколько угодно: неудачный проект не сжигает
                  бюджет, а освобождает его под следующий.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Cta href={SITE.register} place="final">
                    Открыть счёт
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
