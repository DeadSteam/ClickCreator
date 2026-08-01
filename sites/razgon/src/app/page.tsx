import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { Boot } from "@/components/boot";
import { Reveal } from "@/components/reveal";
import { Timeline } from "@/components/timeline";
import { Faq } from "@/components/faq";
import { SITE } from "@/lib/site";
import { FAQ, SPEEDS, STAGES, YOURS } from "@/lib/content";
import { FaqSchema, OrganizationSchema, ServiceSchema } from "@/lib/seo";

const CROSS = { label: "Для агентств", href: "/pro" };

export default function Page() {
  const first = STAGES.find((s) => s.day === 3);
  const last = STAGES[STAGES.length - 1];

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
          Первый экран заявляет скорость размером, а не обещанием. Заголовок
          говорит про расписание, а не про топ: вся ставка варианта в том, что
          конкретный срок продаёт сильнее круглого обещания, которому никто
          в этой нише уже не верит.
        */}
        <section className="px-5 pt-12 sm:px-8 sm:pt-16">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <span className="plate">не обещание, а расписание</span>
              <h1 className="mt-5 max-w-[11ch] text-[68px] sm:text-[110px] lg:text-[150px]">
                Двадцать одни сутки
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 grid gap-8 border-t border-[var(--color-mark)] pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                <p className="max-w-[46ch] text-[18px] leading-relaxed text-[var(--color-mark-soft)] sm:text-[19px]">
                  Столько занимает путь от подключения до закреплённых позиций.
                  Ниже расписано, что происходит на каждых сутках и,
                  что важнее, чего на них точно не происходит.
                </p>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Cta href={SITE.register} place="hero">
                      Запустить
                    </Cta>
                    <Cta href="#schedule" place="hero_schedule" variant="outline">
                      Смотреть расписание
                    </Cta>
                  </div>
                  <p className="text-[15px] leading-snug text-[var(--color-mark-faint)]">
                    Подключение занимает десять минут, доступ к сайту не нужен.
                    Семь суток без списаний и без привязки карты.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Показания. Взяты прямо из расписания, чтобы не разойтись с ним. */}
        <section className="px-5 pt-16 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-[84rem]">
            <dl className="grid grid-cols-2 border-t border-[var(--color-rule)] lg:grid-cols-4">
              {/*
                Все показания печатаются двумя знаками. Без выравнивания
                разряда "3" рядом с "07" и "21" читается как опечатка, а
                полоса показаний перестаёт выглядеть шкалой.
              */}
              {[
                { v: String(first?.day ?? 3).padStart(2, "0"), u: "сутки", n: "до первых сдвигов на быстром режиме" },
                { v: "07", u: "суток", n: "до контрольного съёма позиций" },
                { v: String(last.day).padStart(2, "0"), u: "суток", n: "до закрепления позиций" },
                { v: "10", u: "минут", n: "на подключение, без доступа к сайту" },
              ].map((m, i) => (
                <Reveal
                  key={m.n}
                  delay={i * 0.05}
                  className={`border-b border-[var(--color-rule-hair)] py-6
                    ${i % 2 === 1 ? "border-l border-l-[var(--color-rule-hair)] pl-6" : "pr-6"}
                    lg:border-b-0 lg:border-l lg:px-7 lg:first:border-l-0 lg:first:pl-0`}
                >
                  <dt className="flex flex-wrap items-baseline gap-x-2">
                    <span className="day text-[40px] sm:text-[56px]">{m.v}</span>
                    <span className="plate">{m.u}</span>
                  </dt>
                  <dd className="mt-3 max-w-[24ch] text-[14px] leading-snug text-[var(--color-mark-soft)]">
                    {m.n}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* Само расписание. Прокрутка по нему двигает счётчик суток слева. */}
        <section id="schedule" className="scroll-mt-4 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Timeline />
          </div>
        </section>

        {/* Что в это время делаете вы. Ответ на «а что требуется от меня». */}
        <section className="px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <h2 className="max-w-[12ch] text-[42px] sm:text-[62px]">
                Что делаете вы
              </h2>
            </Reveal>

            <ul className="mt-10 grid border-t border-[var(--color-mark)] lg:grid-cols-2">
              {YOURS.map((y, i) => (
                <Reveal
                  key={y}
                  delay={i * 0.05}
                  className={`border-b border-[var(--color-rule-hair)] py-6 lg:py-7 ${
                    i % 2 === 1
                      ? "lg:border-l lg:border-l-[var(--color-rule-hair)] lg:pl-8"
                      : "lg:pr-8"
                  }`}
                >
                  <li className="flex gap-5">
                    <span className="day shrink-0 text-[13px] text-[var(--color-mark-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="max-w-[44ch] text-[17px] leading-snug">
                      {y}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Режимы. Скорость и есть товар, поэтому цена подписана скоростью. */}
        <section id="speeds" className="scroll-mt-4 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="max-w-[12ch] text-[42px] sm:text-[62px]">
                  Три скорости
                </h2>
                <p className="max-w-[40ch] text-[16px] leading-relaxed text-[var(--color-mark-soft)]">
                  Расписание выше построено для самого быстрого режима. На двух
                  других те же события наступают в два-три раза позже.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 border-t border-[var(--color-mark)]">
              {SPEEDS.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.05}>
                  <div className="grid items-baseline gap-x-8 gap-y-2 border-b border-[var(--color-rule-hair)] py-7 sm:grid-cols-[auto_1fr_1fr_1.3fr]">
                    <span className="day text-[40px] sm:text-[52px]">
                      {s.rate}
                      <span className="ml-1 text-[16px]">₽</span>
                    </span>
                    <span className="font-[family-name:var(--font-tight)] text-[28px] leading-none font-extrabold uppercase sm:text-[34px]">
                      {s.name}
                    </span>
                    <span className="text-[15px] text-[var(--color-mark-soft)]">
                      первые сдвиги через {s.first}
                    </span>
                    <span className="text-[15px] text-[var(--color-mark-soft)]">
                      {s.who}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[60ch] text-[14px] leading-relaxed text-[var(--color-mark-faint)]">
                Ставка за одну фразу в сутки. Абонентской платы нет, неизрасходованный
                баланс не сгорает. От 100 фраз действует скидка 8 процентов,
                от 250 - 15.
              </p>
            </Reveal>
          </div>
        </section>

        {/*
          Выключатель вынесен в отдельный экран. Сайт заявляет предельную
          скорость, и ровно поэтому обязан так же крупно заявить, как её
          прекратить: громкое обещание без видимого стоп-крана - главный
          признак несерьёзности в этой категории.
        */}
        <section className="px-5 pt-24 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <div className="border-t border-[var(--color-mark)] pt-10">
                <span className="plate">на любых сутках</span>
                <h2 className="mt-5 max-w-[13ch] text-[52px] sm:text-[86px] lg:text-[104px]">
                  Стоп-кран у вас
                </h2>
                <p className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-[var(--color-mark-soft)] sm:text-[19px]">
                  Кнопка в кабинете прекращает подачу в течение часа, а не в конце
                  оплаченного периода, и работает на любых сутках расписания, а
                  не только на контрольных. Неизрасходованный баланс не сгорает
                  и ждёт на счёте - в том числе под другой проект.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Cta href={SITE.register} place="guarantee">
                    Запустить
                  </Cta>
                  <Cta href={SITE.telegram} place="guarantee_tg" variant="outline">
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
              <h2 className="max-w-[12ch] text-[42px] sm:text-[56px]">Вопросы</h2>
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
