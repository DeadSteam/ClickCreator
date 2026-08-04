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
  показал, что специалист узнаёт себя в списке «директолог, таргетолог,
  фрилансер», а не в списке «стоматология, грузоперевозки».
*/
const ROLES = [
  {
    who: "SEO-специалист на подряде",
    d: "Пять-десять проектов и потолок классической оптимизации. Сигналы добавляются к сделанному и закрывают разрыв между двадцатой позицией и пятой.",
  },
  {
    who: "Агентство полного цикла",
    d: "Нужен канал с движением в первый месяц, пока техническая часть разворачивается. Отдельный кабинет на клиента, общий баланс на всех.",
  },
  {
    who: "Директолог и таргетолог",
    d: "Клиент упёрся в стоимость заявки из платного трафика. Органика по тем же запросам обходится дешевле, а вы расширяете чек, не меняя специализацию.",
  },
  {
    who: "Владелец сетки сайтов",
    d: "Десятки доменов со своей семантикой. Массовая загрузка фраз и один счёт вместо ручного заведения каждого проекта.",
  },
] as const;

/*
  Самый важный блок страницы. Аудит зафиксировал, что ни один конкурент не
  объясняет специалисту, что тот скажет своему клиенту, если поисковик
  отреагирует. Именно этот незакрытый вопрос отпугивает грамотного партнёра
  сильнее цены, поэтому раздел стоит до разговора о деньгах.
*/
const RISK = [
  {
    q: "Что вы скажете клиенту про метод",
    a: "Правду в удобной формулировке: усиление поведенческих сигналов. Это не входит в число одобренных Яндексом методов, и мы не советуем говорить клиенту обратное. Формулировка «серый инструмент под контролем» держится, а формулировка «полностью белый метод» рассыпается на первом же вопросе.",
  },
  {
    q: "Что делать, если позиции просели",
    a: "Останавливаете подачу в кабинете одной кнопкой. Сигналы прекращаются в течение часа, а не в конце оплаченного периода, остаток остаётся при вас и переставляется на другой проект. У клиента остаётся сайт в том состоянии, в каком он был до подключения.",
  },
  {
    q: "Как показать клиенту результат",
    a: "Выгрузка позиций по каждой фразе с датами, без наших логотипов и упоминаний. Отчёт уходит клиенту как ваш. Мы не пишем клиенту, не звоним ему и не появляемся в его переписке.",
  },
] as const;

const FAQ_PRO = [
  {
    q: "Клиент узнает, что работает через посредника?",
    a: "От нас — нет. Мы не связываемся с конечным клиентом, а выгрузки и письма не содержат нашего имени. Единственное, чего мы не делаем, — не запрещаем вам говорить правду, если вы считаете нужным.",
  },
  {
    q: "Какая минимальная закупка?",
    a: "Порога нет. Разница между специалистом с одним проектом и агентством с сорока только в скидке за объём: от 100 фраз 8 процентов, от 250 — 15. Одинаковая ставка для всех была бы удобнее нам и хуже вам.",
  },
  {
    q: "Что обещать клиенту по результату?",
    a: "Формальной гарантии позиций мы не даём и вам не советуем: в этой нише её не может дать никто. Что у вас есть — остановка в течение часа и остаток, который не сгорает, поэтому неудачный проект не сжигает бюджет, а освобождает его под следующий.",
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
        <section className="px-6 pt-16 pb-24 sm:px-10 sm:pt-24 sm:pb-32">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h1 className="max-w-[15ch]">
                Тот же реестр, но записи заводите вы
              </h1>
              <p className="mt-10 max-w-[52ch] text-[21px] leading-relaxed text-[var(--color-ink-soft)]">
                Оптовый доступ для тех, кто продаёт продвижение сам. Своя
                наценка, отдельный кабинет под каждого клиента, отчёт без наших
                упоминаний.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Cta href={SITE.register} place="pro_hero">
                  Открыть кабинет
                </Cta>
                <Cta href="#margin" place="pro_hero_calc" variant="outline">
                  Таблица маржи
                </Cta>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[15ch]">Кому это закрывает задачу</h2>
            </Reveal>

            <div className="mt-16 grid gap-x-16 gap-y-14 sm:grid-cols-2">
              {ROLES.map((r, i) => (
                <Reveal key={r.who} delay={i * 0.05}>
                  <h3 className="max-w-[22ch]">{r.who}</h3>
                  <p className="mt-4 max-w-[46ch] text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
                    {r.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Разговор о риске идёт до разговора о деньгах. */}
        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[15ch]">Что вы скажете клиенту</h2>
              <p className="mt-6 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-ink-soft)]">
                Три вопроса, которые вам зададут. Ни один конкурент на них не
                отвечает, а отвечать придётся вам, а не нам.
              </p>
            </Reveal>

            <dl className="mt-14 border-t border-[var(--color-ink)]">
              {RISK.map((r, i) => (
                <Reveal key={r.q} delay={i * 0.05}>
                  <div className="grid gap-x-14 gap-y-3 border-b border-[var(--color-rule-soft)] py-8 md:grid-cols-[minmax(0,20rem)_1fr]">
                    <dt className="text-[21px] leading-snug font-semibold tracking-[-0.015em]">
                      {r.q}
                    </dt>
                    <dd className="max-w-[62ch] text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
                      {r.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section id="margin" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2 className="max-w-[15ch]">Таблица маржи</h2>
              <p className="mt-6 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-ink-soft)]">
                Найдите свою строку. Наценку вы назначаете сами, мы её не
                ограничиваем и не проверяем.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-14">
              <Margin />
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <div className="inset px-8 py-20 sm:px-14 sm:py-28">
                <h2 className="max-w-[16ch]">
                  Первый проект идёт без вашего баланса
                </h2>
                <p className="mt-8 max-w-[52ch] text-[19px] leading-relaxed text-[var(--color-ink-soft)]">
                  Заводите один проект и семь суток смотрите, как двигаются
                  позиции, прежде чем что-то обещать клиенту. Карта не нужна,
                  договор не нужен, отказаться можно молча.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Cta href={SITE.register} place="pro_final">
                    Открыть кабинет
                  </Cta>
                  <Cta href={SITE.telegram} place="pro_final_tg" variant="outline">
                    Спросить в Telegram
                  </Cta>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[74rem]">
            <Reveal>
              <h2>Примечания</h2>
            </Reveal>
            <div className="mt-12">
              <Faq items={FAQ_PRO} />
            </div>
          </div>
        </section>
      </main>

      <Footer cross={CROSS} />
    </>
  );
}
