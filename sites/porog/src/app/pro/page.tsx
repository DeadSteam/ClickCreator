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
    d: "Ведёте пять-десять проектов и упираетесь в потолок классической оптимизации. Сигналы добавляются к сделанному и закрывают разрыв между двадцатой позицией и пятой.",
  },
  {
    who: "Агентство полного цикла",
    d: "Нужен канал, показывающий движение в первый месяц, пока техническая часть разворачивается. Отдельный проект на каждого клиента, общий баланс на всех.",
  },
  {
    who: "Директолог и таргетолог",
    d: "Клиент упёрся в стоимость заявки из платного трафика. Органика по тем же запросам обходится дешевле, а вы расширяете чек, не меняя специализацию.",
  },
  {
    who: "Владелец сетки сайтов",
    d: "Десятки доменов со своей семантикой у каждого. Массовая загрузка фраз, одна проверка допуска на пакет и один счёт.",
  },
] as const;

/*
  Регламент разговора с клиентом. Аудит категории зафиксировал: ни один
  конкурент не объясняет специалисту, что тот скажет своему заказчику, если
  поисковик отреагирует. Именно этот незакрытый вопрос отпугивает грамотного
  партнёра сильнее цены, поэтому раздел стоит до денег, а не после.
*/
const SCRIPT = [
  {
    q: "Как назвать метод",
    a: "Усилением поведенческих сигналов. Это серая зона, и она не входит в число одобренных Яндексом методов. Формулировка «серый инструмент под контролем скорости» выдерживает уточняющие вопросы, формулировка «полностью белый метод» рассыпается на первом же.",
  },
  {
    q: "Что ответить на «а нас не забанят»",
    a: "Что гарантий не даёт никто, а риск снижается двумя вещами: распределением сессий и жёстким пределом их доли в общем трафике. Предел не рекомендация - кабинет физически не даст выбрать режим выше допустимого для этого сайта.",
  },
  {
    q: "Что делать, если позиции просели",
    a: "Останавливать подачу в кабинете. Она прекращается в течение часа, а не в конце оплаченного периода, неизрасходованный баланс остаётся на вашем счёте и переставляется на другой проект. Сайт клиента остаётся в том состоянии, в каком был до подключения.",
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
    a: "От нас - нет. Выгрузки и письма не содержат нашего имени, с конечным заказчиком мы не связываемся. Единственное, чего мы не делаем, - не запрещаем вам говорить правду, если считаете нужным.",
  },
  {
    q: "Какая минимальная закупка?",
    a: "Порога нет. Разница между специалистом с одним проектом и агентством с сорока только в скидке за объём: от 100 фраз 8 процентов, от 250 - 15.",
  },
  {
    q: "Что обещать клиенту по результату?",
    a: "Гарантии позиций мы не даём и вам не советуем: в этой нише её не может дать никто, а раздел «Риск» на главной написан именно об этом. Что у вас есть - проверка допуска до оплаты, остановка в течение часа и баланс, который не сгорает.",
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

      <main id="main" tabIndex={-1} className="doc">
        <section className="grid-paper border-b border-[var(--color-rule-soft)] px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-20">
          <div className="mx-auto max-w-[84rem]">
            <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
              <Reveal>
                <span className="mark">редакция {SITE.revision}</span>
                <h1 className="mt-6 max-w-[16ch] text-[36px] sm:text-[52px] lg:text-[58px]">
                  Мы откажем вашему клиенту раньше, чем это сделает поисковик
                </h1>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="max-w-[44ch] text-[16px] leading-relaxed text-[var(--color-graphite-soft)]">
                  Оптовый доступ для тех, кто продаёт продвижение сам. Допуск
                  проверяется по каждому проекту отдельно, наценку назначаете вы,
                  отчёт уходит клиенту без упоминания нас.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Cta href={SITE.register} place="pro_hero">
                    Открыть кабинет
                  </Cta>
                  <Cta href="#margin" place="pro_hero_calc" variant="outline">
                    Пример расчёта
                  </Cta>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-5 pt-20 sm:px-8 sm:pt-24">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <h2 className="max-w-[16ch] text-[30px] sm:text-[42px]">
                Кому это закрывает задачу
              </h2>
            </Reveal>

            <div className="mt-12 grid border-t border-[var(--color-graphite)] lg:grid-cols-2">
              {ROLES.map((r, i) => (
                <Reveal
                  key={r.who}
                  delay={i * 0.05}
                  className={`border-b border-[var(--color-rule-hair)] py-7 lg:py-9 ${
                    i % 2 === 1
                      ? "lg:border-l lg:border-l-[var(--color-rule-soft)] lg:pl-8"
                      : "lg:pr-8"
                  }`}
                >
                  <span className="num text-[11px] text-[var(--color-graphite-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[22px]">{r.who}</h3>
                  <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[var(--color-graphite-soft)]">
                    {r.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Разговор о риске идёт до разговора о деньгах. */}
        <section className="px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="max-w-[18ch] text-[30px] sm:text-[42px]">
                  Регламент разговора с клиентом
                </h2>
                <p className="max-w-[40ch] text-[15px] leading-relaxed text-[var(--color-graphite-soft)]">
                  Четыре вопроса, которые вам зададут. Отвечать на них придётся
                  вам, а не нам, поэтому ответы написаны заранее.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 chapter">
              <dl className="border-t border-[var(--color-graphite)]">
                {SCRIPT.map((s) => (
                  <Reveal key={s.q}>
                    <div className="clause grid items-baseline gap-x-6 gap-y-3 border-b border-[var(--color-rule-hair)] py-6 md:grid-cols-[3rem_minmax(0,18rem)_1fr]">
                      <span
                        aria-hidden
                        className="clause-no num text-[11px] text-[var(--color-graphite-faint)]"
                      />
                      <dt className="text-[18px] leading-snug font-medium tracking-[-0.02em]">
                        {s.q}
                      </dt>
                      <dd className="max-w-[66ch] text-[15px] leading-relaxed text-[var(--color-graphite-soft)]">
                        {s.a}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="margin" className="scroll-mt-4 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <h2 className="max-w-[18ch] text-[30px] sm:text-[42px]">
                Пример расчёта вознаграждения
              </h2>
              <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-[var(--color-graphite-soft)]">
                Разобрано пунктами на одном проекте среднего размера. Наценку вы
                назначаете сами, мы её не ограничиваем и не проверяем.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <Margin />
            </Reveal>
          </div>
        </section>

        <section className="px-5 pt-24 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <div className="border-t border-[var(--color-graphite)] pt-10">
                <h2 className="max-w-[18ch] text-[34px] sm:text-[50px]">
                  Первый проект проходит проверку без вашего баланса
                </h2>
                <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-[var(--color-graphite-soft)] sm:text-[17px]">
                  Заведите один проект, получите вердикт по допуску и семь суток
                  смотрите на позиции, прежде чем что-то обещать клиенту. Карта
                  не нужна, договор не нужен, отказаться можно молча.
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
            </Reveal>
          </div>
        </section>

        <section className="px-5 pt-24 pb-24 sm:px-8 sm:pt-32 sm:pb-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <h2 className="text-[28px] sm:text-[36px]">Вопросы</h2>
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
