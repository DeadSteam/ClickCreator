import type { Metadata } from "next";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { Boot } from "@/components/boot";
import { Reveal } from "@/components/reveal";
import { Margin } from "@/components/margin";
import { Faq } from "@/components/faq";
import { SITE } from "@/lib/site";
import { BreadcrumbSchema, FaqSchema } from "@/lib/seo";

const CROSS = { label: "Для бизнеса", href: "/" };

export const metadata: Metadata = {
  title: "Для агентств и специалистов",
  description:
    "Оптовый доступ к поведенческим сигналам для SEO-специалистов и агентств: своя наценка, отдельный кабинет под каждого клиента, выгрузка отчёта под вашим брендом.",
  alternates: { canonical: "/pro" },
};

/*
  Кому и сколько. Сегментация идёт по профессии, а не по нише клиента: аудит
  показал, что специалист узнаёт себя в списке "директолог, таргетолог,
  фрилансер", а не в списке "стоматология, грузоперевозки".
*/
const ROLES = [
  {
    who: "SEO-специалист на подряде",
    d: "Ведёте пять-десять проектов и упираетесь в потолок классической оптимизации. Сигналы добавляются к тому, что уже сделано, и закрывают разрыв между двадцатой и пятой позицией.",
  },
  {
    who: "Агентство полного цикла",
    d: "Нужен канал, который показывает движение в первый месяц, пока техническая часть только разворачивается. Отдельный кабинет на каждого клиента, общий баланс на всех.",
  },
  {
    who: "Директолог и таргетолог",
    d: "Клиент упирается в стоимость заявки из платного трафика. Органика по тем же запросам обходится дешевле, а вы расширяете чек, не меняя специализацию.",
  },
  {
    who: "Владелец сетки сайтов",
    d: "Десятки доменов, у каждого своя семантика. Массовая загрузка фраз и один счёт вместо ручного заведения каждого проекта.",
  },
] as const;

/*
  Самый важный блок страницы. Аудит зафиксировал, что ни один конкурент не
  объясняет специалисту, что тот скажет своему клиенту, если поисковик
  отреагирует. Именно этот незакрытый вопрос отпугивает грамотного партнёра
  сильнее, чем цена, поэтому раздел стоит выше тарифов, а не в примечаниях.
*/
const RISK = [
  {
    q: "Что вы скажете клиенту про метод",
    a: "Правду в удобной формулировке: усиление поведенческих сигналов. Это не входит в число одобренных Яндексом методов, и мы не советуем говорить клиенту обратное. Формулировка «серый инструмент под контролем» держится, а формулировка «полностью белый метод» рассыпается на первом же вопросе.",
  },
  {
    q: "Что делать, если позиции просели",
    a: "Останавливаете подачу в кабинете одной кнопкой. Сигналы прекращаются в течение часа, а не в конце оплаченного периода, неизрасходованный баланс остаётся при вас и переставляется на другой проект. У клиента остаётся сайт в том состоянии, в каком он был до подключения.",
  },
  {
    q: "Как показать клиенту результат",
    a: "Выгрузка позиций по каждой фразе с датами, без наших логотипов и упоминаний. Отчёт уходит клиенту как ваш. Мы не пишем клиенту, не звоним ему и не появляемся в его переписке.",
  },
] as const;

const FAQ_PRO = [
  {
    q: "Клиент узнает, что работает через посредника?",
    a: "От нас - нет. Мы не связываемся с конечным клиентом, а выгрузки и письма не содержат нашего имени. Единственное, чего мы не делаем, - не запрещаем вам говорить правду, если вы считаете нужным.",
  },
  {
    q: "Какая минимальная закупка?",
    a: "Порога нет. Разница между специалистом с одним проектом и агентством с сорока только в скидке за объём: от 100 фраз 8 процентов, от 250 - 15. Одинаковая ставка для всех была бы удобнее нам и хуже вам.",
  },
  {
    q: "Что обещать клиенту по результату?",
    a: "Формальной гарантии позиций мы не даём и вам не советуем: в этой нише её не может дать никто. Что у вас есть - это остановка в течение часа и баланс, который не сгорает, поэтому неудачный проект не сжигает бюджет, а освобождает его под следующий.",
  },
  {
    q: "Проекты попадают в публичный реестр?",
    a: "Только с вашего согласия и без указания, что проект агентский. По умолчанию записи агентств закрыты и видны в вашем кабинете.",
  },
] as const;

export default function ProPage() {
  return (
    <>
      <Boot page="pro_view" />
      <FaqSchema items={FAQ_PRO} />
      <BreadcrumbSchema
        trail={[
          { name: "Главная", path: "/" },
          { name: "Для агентств", path: "/pro" },
        ]}
      />

      <Nav cross={CROSS} />

      <main id="main" tabIndex={-1}>
        <section className="px-5 pt-14 pb-4 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-[86rem]">
            <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
              <Reveal>
                <h1 className="max-w-[18ch] text-[36px] sm:text-[54px] lg:text-[62px]">
                  Тот же реестр, но записи заводите вы
                </h1>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="max-w-[44ch] text-[16px] leading-relaxed text-[var(--color-ink-soft)] sm:text-[17px]">
                  Оптовый доступ для тех, кто продаёт продвижение сам. Своя
                  наценка, отдельный кабинет под каждого клиента, отчёт без
                  наших упоминаний.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Cta href={SITE.register} place="pro_hero">
                    Открыть кабинет
                  </Cta>
                  <Cta href="#margin" place="pro_hero_calc" variant="outline">
                    Таблица маржи
                  </Cta>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-5 pt-20 sm:px-8 sm:pt-24">
          <div className="mx-auto max-w-[86rem]">
            <Reveal>
              <h2 className="max-w-[16ch] text-[30px] sm:text-[42px]">
                Кому это закрывает задачу
              </h2>
            </Reveal>

            <div className="mt-12 grid border-t border-[var(--color-ink)] lg:grid-cols-2">
              {ROLES.map((r, i) => (
                <Reveal
                  key={r.who}
                  delay={i * 0.05}
                  className={`border-b border-[var(--color-rule-hair)] py-7
                    lg:py-9 ${i % 2 === 1 ? "lg:border-l lg:border-l-[var(--color-rule-soft)] lg:pl-8" : "lg:pr-8"}`}
                >
                  <span className="num text-[11px] text-[var(--color-ink-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[22px]">{r.who}</h3>
                  <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                    {r.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Разговор о риске идёт до разговора о деньгах. */}
        <section className="px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[86rem]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="max-w-[17ch] text-[30px] sm:text-[42px]">
                  Что вы скажете клиенту
                </h2>
                <p className="max-w-[40ch] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                  Три вопроса, которые вам зададут. Ни один конкурент на них не
                  отвечает, а отвечать придётся вам, а не нам.
                </p>
              </div>
            </Reveal>

            <dl className="mt-12 border-t border-[var(--color-ink)]">
              {RISK.map((r, i) => (
                <Reveal key={r.q} delay={i * 0.05}>
                  <div className="grid items-baseline gap-x-8 gap-y-3 border-b border-[var(--color-rule-hair)] py-7 md:grid-cols-[2.5rem_minmax(0,20rem)_1fr]">
                    <span className="num text-[11px] text-[var(--color-ink-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <dt className="text-[19px] leading-snug font-semibold tracking-[-0.02em]">
                      {r.q}
                    </dt>
                    <dd className="max-w-[64ch] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                      {r.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section id="margin" className="scroll-mt-6 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[86rem]">
            <Reveal>
              <h2 className="max-w-[18ch] text-[30px] sm:text-[42px]">
                Таблица маржи
              </h2>
              <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-[var(--color-ink-soft)]">
                Найдите свою строку. Наценку вы назначаете сами, мы её не ограничиваем и не проверяем.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <Margin />
            </Reveal>
          </div>
        </section>

        <section className="px-5 pt-24 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-[86rem]">
            <Reveal>
              <div className="grid gap-10 border-t border-[var(--color-ink)] pt-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
                <div>
                  <h2 className="max-w-[17ch] text-[34px] sm:text-[52px]">
                    Первый проект идёт без вашего баланса
                  </h2>
                  <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-[var(--color-ink-soft)] sm:text-[17px]">
                    Заводите один проект и семь суток смотрите, как двигаются
                    позиции, прежде чем что-то обещать клиенту. Карта не нужна,
                    договор не нужен, отказаться можно молча.
                  </p>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Cta href={SITE.register} place="pro_final">
                      Открыть кабинет
                    </Cta>
                    <Cta href={SITE.telegram} place="pro_final_tg" variant="outline">
                      Спросить в Telegram
                    </Cta>
                  </div>
                </div>

                <div className="flex items-start lg:justify-end">
                  <span className="stamp flex flex-col items-center gap-1 px-6 py-5">
                    <span className="field text-[var(--color-stamp)]">
                      первый проект
                    </span>
                    <span className="num text-[38px] leading-none font-medium">
                      00
                    </span>
                    <span className="field text-[var(--color-stamp)]">₽</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-5 pt-24 pb-24 sm:px-8 sm:pt-32 sm:pb-32">
          <div className="mx-auto max-w-[86rem]">
            <Reveal>
              <h2 className="text-[28px] sm:text-[36px]">Примечания</h2>
            </Reveal>
            <div className="mt-10">
              <Faq items={FAQ_PRO} />
            </div>
          </div>
        </section>
      </main>

      <Footer cross={CROSS} />
    </>
  );
}
