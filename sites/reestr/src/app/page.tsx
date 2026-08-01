import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { Boot } from "@/components/boot";
import { Reveal } from "@/components/reveal";
import { Registry } from "@/components/registry";
import { Tariff } from "@/components/tariff";
import { Faq } from "@/components/faq";
import { SITE } from "@/lib/site";
import { ENROLL, ENTRIES, FAQ, LEGEND, PROTOCOL, RATES } from "@/lib/content";
import { FaqSchema, OrganizationSchema, ServiceSchema } from "@/lib/seo";

const CROSS = { label: "Для агентств", href: "/pro" };

/*
  Показания считаются из самой таблицы, а не проставляются руками.

  Так цифры в шапке физически не могут разойтись с реестром под ними: замена
  данных пересчитает и то, и другое. Расхождение между обещанием сверху и
  таблицей снизу - ровно та ошибка, за которую аудит разнёс половину
  конкурентов, и здесь она закрыта устройством кода, а не внимательностью.
*/
function readings() {
  const grown = ENTRIES.filter((e) => e.to < e.from);
  const stopped = ENTRIES.filter((e) => e.status === "остановлен");

  const shifts = grown.map((e) => e.from - e.to).sort((a, b) => a - b);
  const mid = shifts.length
    ? shifts[Math.floor(shifts.length / 2)]
    : 0;

  const inTop10 = ENTRIES.filter((e) => e.to <= 10).length;

  return [
    { v: String(ENTRIES.length), u: "записей", n: "в выпуске, включая неудачные" },
    { v: String(mid), u: "позиций", n: "медианный сдвиг по выросшим записям" },
    { v: String(inTop10), u: "в ТОП-10", n: "на дату последней сверки" },
    {
      v: String(stopped.length),
      u: "без роста",
      n: "остановлены, подача прекращена",
    },
  ];
}

export default function Page() {
  const METRICS = readings();

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
          Первый экран отдан не обещанию, а данным. Заголовок занимает узкую
          полосу сверху и сразу уступает место таблице: страница должна с
          первого взгляда читаться как реестр, который зачем-то снабдили
          предисловием, а не как лендинг, к которому приложили таблицу.
        */}
        <section className="px-5 pt-14 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-[86rem]">
            <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
              <Reveal>
                <h1 className="max-w-[19ch] text-[36px] sm:text-[54px] lg:text-[64px]">
                  Мы не рассказываем о результатах. Мы их публикуем.
                </h1>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="max-w-[44ch] text-[16px] leading-relaxed text-[var(--color-ink-soft)] sm:text-[17px]">
                  Ниже открытый реестр проектов на поведенческих сигналах: домен,
                  запрос, позиция до и после, дата. С остановленными записями,
                  по которым роста не случилось и деньги вернулись.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Cta href={SITE.register} place="hero">
                    Завести запись
                  </Cta>
                  <Cta href="#calc" place="hero_calc" variant="outline">
                    Рассчитать бюджет
                  </Cta>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Сам реестр. Полная ширина: это главный объект страницы. */}
        <section id="registry" className="scroll-mt-6 px-5 pt-14 sm:px-8 sm:pt-16">
          <div className="mx-auto max-w-[86rem]">
            <Reveal>
              <Registry />
            </Reveal>
          </div>
        </section>

        {/* Показания выпуска. Пересчитываются из таблицы выше. */}
        <section className="px-5 pt-20 sm:px-8 sm:pt-24">
          <div className="mx-auto grid max-w-[86rem] grid-cols-2 border-t border-[var(--color-ink)] lg:grid-cols-4">
            {METRICS.map((m, i) => (
              <Reveal
                key={m.n}
                delay={i * 0.05}
                className={`border-b border-[var(--color-rule-hair)] py-6
                  ${i % 2 === 1 ? "border-l border-l-[var(--color-rule-soft)] pl-6" : "pr-6"}
                  lg:border-b-0 lg:border-l lg:px-7 lg:first:border-l-0 lg:first:pl-0`}
              >
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="num text-[30px] leading-none font-medium sm:text-[42px]">
                    {m.v}
                  </span>
                  <span className="field">{m.u}</span>
                </p>
                <p className="mt-3 max-w-[24ch] text-[13px] leading-snug text-[var(--color-ink-soft)]">
                  {m.n}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Легенда. Объясняет колонки и заодно сам продукт. */}
        <section id="legend" className="scroll-mt-6 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[86rem]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="max-w-[15ch] text-[30px] sm:text-[42px]">
                  Как читать реестр
                </h2>
                <p className="max-w-[38ch] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                  Пять колонок, за каждой стоит одно решение. Разобравшись с
                  ними, вы понимаете и как устроена сама услуга.
                </p>
              </div>
            </Reveal>

            <dl className="mt-12 border-t border-[var(--color-ink)]">
              {LEGEND.map((l, i) => (
                <Reveal key={l.col} delay={i * 0.04}>
                  <div className="grid items-baseline gap-x-8 gap-y-2 border-b border-[var(--color-rule-hair)] py-6 md:grid-cols-[2.5rem_minmax(0,12rem)_1fr]">
                    <span className="num text-[11px] text-[var(--color-ink-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <dt className="text-[18px] font-semibold tracking-[-0.02em]">
                      {l.col}
                    </dt>
                    <dd className="max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                      {l.d}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* Протокол работы. Три такта, нумерованные как пункты. */}
        <section className="px-5 pt-24 sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-[86rem]">
            <Reveal>
              <h2 className="max-w-[16ch] text-[30px] sm:text-[42px]">
                Как запись попадает в таблицу
              </h2>
            </Reveal>

            <div className="mt-12 grid border-t border-[var(--color-ink)] lg:grid-cols-3">
              {PROTOCOL.map((p, i) => (
                <Reveal
                  key={p.t}
                  delay={i * 0.06}
                  className="border-b border-[var(--color-rule-hair)] py-7 lg:border-b-0
                    lg:border-l lg:border-l-[var(--color-rule-soft)] lg:px-8 lg:py-9
                    lg:first:border-l-0 lg:first:pl-0"
                >
                  <span className="num text-[11px] text-[var(--color-ink-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[24px]">{p.t}</h3>
                  <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                    {p.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/*
          Прайс напечатан таблицей, а не считается ползунком.

          Это отказ по жанру, а не экономия: на четырёх других сайтах расчёт
          интерактивен, потому что там он и есть предложение. Реестр продаёт
          публикацию, а у публикации прайс печатают - его читают глазами,
          находят свою строку и распечатывают бухгалтеру. Живой пересчёт
          вернул бы страницу в жанр лендинга.
        */}
        <section id="rates" className="scroll-mt-6 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[86rem]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="max-w-[18ch] text-[30px] sm:text-[42px]">
                  Выписка из прайс-листа
                </h2>
                <p className="max-w-[38ch] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                  Две оси решения сразу: по вертикали объём записи, по
                  горизонтали скорость. Ступень объёма применяется сама, ничего
                  запрашивать не нужно.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-12">
              <Tariff />
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-14 border-t border-[var(--color-ink)]">
                {RATES.map((r) => (
                  <div
                    key={r.plan}
                    className="grid items-baseline gap-x-8 gap-y-2 border-b border-[var(--color-rule-hair)] py-5 sm:grid-cols-[minmax(0,12rem)_1fr_1.4fr]"
                  >
                    <span className="text-[17px] font-semibold tracking-[-0.02em]">
                      {r.plan}
                    </span>
                    <span className="text-[14px] text-[var(--color-ink-soft)]">
                      сдвиги через {r.window}
                    </span>
                    <span className="text-[14px] text-[var(--color-ink-soft)]">
                      {r.who}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/*
          Закрывающий раздел - порядок заведения записи, а не обещание.

          Здесь стоит единственный штамп на всей странице: он удостоверяет
          факт (запись заводится за десять минут), а не гарантию. Штамп под
          обещанием обесценил бы и штамп, и обещание.
        */}
        <section id="start" className="scroll-mt-6 px-5 pt-24 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-[86rem]">
            <Reveal>
              <div className="grid gap-10 border-t border-[var(--color-ink)] pt-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
                <div>
                  <h2 className="max-w-[16ch] text-[34px] sm:text-[52px]">
                    Как завести запись
                  </h2>

                  <ol className="mt-9 border-t border-[var(--color-rule-soft)]">
                    {ENROLL.map((e, i) => (
                      <li
                        key={e.t}
                        className="grid items-baseline gap-x-6 gap-y-1.5 border-b border-[var(--color-rule-hair)] py-5 sm:grid-cols-[2.5rem_minmax(0,16ch)_1fr]"
                      >
                        <span className="num text-[11px] text-[var(--color-ink-faint)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[16px] font-semibold tracking-[-0.02em]">
                          {e.t}
                        </span>
                        <span className="max-w-[52ch] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                          {e.d}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Cta href={SITE.register} place="enroll">
                      Завести запись
                    </Cta>
                    <Cta href={SITE.telegram} place="enroll_tg" variant="outline">
                      Спросить в Telegram
                    </Cta>
                  </div>
                </div>

                <div className="flex items-start lg:justify-end">
                  <span className="stamp flex flex-col items-center gap-1 px-6 py-5">
                    <span className="field text-[var(--color-stamp)]">
                      заведение записи
                    </span>
                    <span className="num text-[38px] leading-none font-medium">
                      10
                    </span>
                    <span className="field text-[var(--color-stamp)]">минут</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Примечания к реестру. */}
        <section id="faq" className="scroll-mt-6 px-5 pt-24 pb-24 sm:px-8 sm:pt-32 sm:pb-32">
          <div className="mx-auto max-w-[86rem]">
            <Reveal>
              <h2 className="text-[28px] sm:text-[36px]">Примечания</h2>
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
