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
    "Оптовый доступ к усилению поведенческих сигналов для SEO-специалистов и агентств: проверка допуска по каждому проекту, своя наценка, отчёт без наших упоминаний.",
  alternates: { canonical: "/pro" },
};

const ROLES = [
  {
    who: "SEO-специалист на подряде",
    d: "Пять-десять проектов и потолок классической оптимизации. Сигналы добавляются к сделанному и закрывают разрыв между двадцатой позицией и пятой.",
  },
  {
    who: "Агентство полного цикла",
    d: "Нужен канал с движением в первый месяц, пока техническая часть разворачивается. Отдельный проект на клиента, общий баланс на всех.",
  },
  {
    who: "Директолог и таргетолог",
    d: "Клиент упёрся в стоимость заявки из платного трафика. Органика по тем же запросам обходится дешевле, а вы расширяете чек, не меняя специализацию.",
  },
  {
    who: "Владелец сетки сайтов",
    d: "Десятки доменов со своей семантикой. Массовая загрузка фраз, одна проверка допуска на пакет и один счёт.",
  },
] as const;

/*
  Что сказать клиенту. Аудит категории зафиксировал: ни один конкурент не
  объясняет специалисту, что тот скажет своему заказчику, если поисковик
  отреагирует. Именно этот незакрытый вопрос отпугивает грамотного партнёра
  сильнее цены, поэтому раздел стоит до денег, а не после.
*/
const SCRIPT = [
  {
    q: "Как назвать метод",
    a: "Усилением поведенческих сигналов. Это серая зона, и она не входит в число одобренных Яндексом методов. Формулировка «серый инструмент под контролем скорости» выдерживает уточняющие вопросы, формулировка «полностью белый метод» рассыпается на первом же.",
  },
  {
    q: "Что ответить на «а нас не забанят»",
    a: "Что гарантий не даёт никто, а риск снижается двумя вещами: распределением сессий и жёстким пределом их доли в общем трафике. Предел не рекомендация — кабинет физически не даст выбрать режим выше допустимого для этого сайта.",
  },
  {
    q: "Что делать, если позиции просели",
    a: "Останавливать подачу в кабинете. Она прекращается в течение часа, а не в конце оплаченного периода, остаток остаётся на вашем счёте и переставляется на другой проект. Сайт клиента остаётся в том состоянии, в каком был до подключения.",
  },
  {
    q: "Как показать результат",
    a: "Выгрузкой позиций по каждой фразе с датами, без наших логотипов и упоминаний. Мы не пишем вашему клиенту, не звоним ему и не появляемся в его переписке.",
  },
] as const;

const FAQ_PRO = [
  {
    q: "Зачем мне сервис, который отказывает моим клиентам?",
    a: "Затем, что отказ приходит от нас до оплаты, а не от вас после трёх месяцев без результата. Проверка допуска работает по каждому проекту отдельно и защищает вашу репутацию перед заказчиком, а не нашу перед вами.",
  },
  {
    q: "Клиент узнает, что работает через посредника?",
    a: "От нас — нет. Выгрузки и письма не содержат нашего имени, с конечным заказчиком мы не связываемся. Единственное, чего мы не делаем, — не запрещаем вам говорить правду, если считаете нужным.",
  },
  {
    q: "Какая минимальная закупка?",
    a: "Порога нет. Разница между специалистом с одним проектом и агентством с сорока только в скидке за объём: от 100 фраз 8 процентов, от 250 — 15.",
  },
  {
    q: "Что обещать клиенту по результату?",
    a: "Гарантии позиций мы не даём и вам не советуем: в этой нише её не может дать никто, а раздел про риск на главной написан именно об этом. Что у вас есть — проверка допуска до оплаты, остановка в течение часа и остаток, который не сгорает.",
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
        <section className="px-6 pt-20 pb-28 sm:px-10 sm:pt-28 sm:pb-36">
          <div className="mx-auto max-w-[62rem] text-center">
            <Reveal>
              <h1 className="mx-auto max-w-[17ch]">
                Мы откажем вашему клиенту раньше, чем это сделает поисковик
              </h1>
              <p className="mx-auto mt-10 max-w-[54ch] text-[21px] leading-relaxed text-[var(--color-graphite-soft)]">
                Оптовый доступ для тех, кто продаёт продвижение сам. Допуск
                проверяется по каждому проекту отдельно, наценку назначаете вы,
                отчёт уходит клиенту без упоминания нас.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Cta href={SITE.register} place="pro_hero">
                  Открыть кабинет
                </Cta>
                <Cta href="#margin" place="pro_hero_calc" variant="outline">
                  Пример расчёта
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
                  <p className="mt-4 max-w-[46ch] text-[18px] leading-relaxed text-[var(--color-graphite-soft)]">
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
              <p className="mt-6 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-graphite-soft)]">
                Четыре вопроса, которые вам зададут. Отвечать придётся вам, а не
                нам, поэтому ответы написаны заранее.
              </p>
            </Reveal>

            <dl className="mt-14 border-t-2 border-[var(--color-graphite)]">
              {SCRIPT.map((s, i) => (
                <Reveal key={s.q} delay={i * 0.04}>
                  <div className="grid gap-x-14 gap-y-3 border-b border-[var(--color-rule-soft)] py-8 md:grid-cols-[minmax(0,18rem)_1fr]">
                    <dt className="text-[21px] leading-snug font-bold tracking-[-0.025em]">
                      {s.q}
                    </dt>
                    <dd className="max-w-[62ch] text-[18px] leading-relaxed text-[var(--color-graphite-soft)]">
                      {s.a}
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
              <h2 className="max-w-[16ch]">Пример расчёта вознаграждения</h2>
              <p className="mt-6 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-graphite-soft)]">
                Разобрано на одном проекте среднего размера. Наценку вы
                назначаете сами, мы её не ограничиваем и не проверяем.
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
              <div className="panel px-8 py-20 text-center sm:px-14 sm:py-28">
                <h2 className="mx-auto max-w-[18ch]">
                  Первый проект проходит проверку без вашего баланса
                </h2>
                <p className="mx-auto mt-8 max-w-[54ch] text-[19px] leading-relaxed text-[var(--color-graphite-soft)]">
                  Заведите один проект, получите вердикт по допуску и семь суток
                  смотрите на позиции, прежде чем что-то обещать клиенту. Карта
                  не нужна, договор не нужен, отказаться можно молча.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
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
              <h2>Вопросы</h2>
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
