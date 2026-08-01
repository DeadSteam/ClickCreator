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
    "Оптовая закупка поведенческих сигналов для SEO-специалистов и агентств: своя наценка, скидка за объём до 22 процентов, отчёт без наших упоминаний.",
  alternates: { canonical: "/pro" },
};

const ROLES = [
  {
    who: "SEO-специалист на подряде",
    d: "Пять-десять проектов и потолок классической оптимизации. Сигналы добавляются к сделанному и закрывают разрыв между двадцатой позицией и пятой.",
  },
  {
    who: "Агентство полного цикла",
    d: "Нужен канал с движением в первый месяц, пока техническая часть разворачивается. Отдельный проект на клиента, один баланс на всех.",
  },
  {
    who: "Директолог и таргетолог",
    d: "Клиент упёрся в стоимость заявки из платного трафика. Органика по тем же фразам обходится дешевле, а вы расширяете чек, не меняя специализацию.",
  },
  {
    who: "Владелец сетки сайтов",
    d: "Десятки доменов со своей семантикой. Массовая загрузка фраз, один счёт, скидка считается по суммарному объёму.",
  },
] as const;

/*
  Ответы на вопросы клиента. Аудит категории зафиксировал: ни один конкурент
  не объясняет специалисту, что тот скажет заказчику, если поисковик
  отреагирует. Именно это отпугивает грамотного партнёра сильнее цены, поэтому
  блок стоит до расчёта маржи, а не после.
*/
const SCRIPT = [
  {
    q: "Как назвать метод",
    a: "Усилением поведенческих сигналов. Это серая зона, не входящая в число одобренных Яндексом методов. Формулировка «серый инструмент под контролем скорости» выдерживает уточняющие вопросы, формулировка «полностью белый метод» рассыпается на первом же.",
  },
  {
    q: "Что делать, если позиции просели",
    a: "Останавливать подачу в кабинете. Она прекращается в течение часа, а не в конце оплаченного периода, неизрасходованный баланс остаётся на вашем счёте и переставляется на другой проект. Сайт клиента остаётся в том состоянии, в каком был до подключения.",
  },
  {
    q: "Как показать результат",
    a: "Выгрузкой позиций по каждой фразе с датами, без наших логотипов и упоминаний. С вашим заказчиком мы не связываемся ни при каких условиях.",
  },
] as const;

const FAQ_PRO = [
  {
    q: "Скидка считается по каждому проекту или по всем сразу?",
    a: "По суммарному количеству фраз на счёте. Агентство с двадцатью проектами по тридцать фраз получает скидку за шестьсот, а не двадцать раз по тридцать. Это единственное, чем оптовая закупка отличается от розничной.",
  },
  {
    q: "Клиент узнает, что работает через посредника?",
    a: "От нас - нет. Выгрузки и письма не содержат нашего имени. Единственное, чего мы не делаем, - не запрещаем вам говорить правду, если считаете нужным.",
  },
  {
    q: "Есть ли минимальная закупка?",
    a: "Нет. Разница между специалистом с одним проектом и агентством с сорока только в скидке за объём, а не в доступе.",
  },
  {
    q: "Что обещать клиенту по результату?",
    a: "Гарантии позиций мы не даём и вам не советуем: в этой нише её не может дать никто. Что у вас есть - прозрачная цена перехода, остановка в течение часа и баланс, который не сгорает, поэтому неудачный проект освобождает бюджет вместо того, чтобы его сжечь.",
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
        {/* Как и на главной, первым идёт расчёт, а не заявление. */}
        <section className="px-5 pt-8 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-[84rem]">
            <Margin />
          </div>
        </section>

        <section className="px-5 pt-20 sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-[84rem]">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
              <Reveal>
                <h1 className="max-w-[17ch] text-[34px] sm:text-[50px] lg:text-[56px]">
                  Наценку назначаете вы, мы её не проверяем
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="max-w-[46ch] text-[16px] leading-relaxed text-[var(--color-read-soft)] sm:text-[17px]">
                  Оптовая закупка для тех, кто продаёт продвижение сам. Скидка
                  считается по суммарному объёму фраз на счёте, отчёт уходит
                  клиенту без единого упоминания нас.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Cta href={SITE.register} place="pro_lead">
                    Открыть счёт
                  </Cta>
                  <Cta href={SITE.telegram} place="pro_lead_tg" variant="outline">
                    Спросить в Telegram
                  </Cta>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <h2 className="max-w-[16ch] text-[30px] sm:text-[42px]">
                Кому это закрывает задачу
              </h2>
            </Reveal>

            <div className="mt-12 grid border-t border-[var(--color-rule)] lg:grid-cols-2">
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
                  <span className="read text-[11px] text-[var(--color-read-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[21px]">{r.who}</h3>
                  <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[var(--color-read-soft)]">
                    {r.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="max-w-[18ch] text-[30px] sm:text-[42px]">
                  Что вы скажете клиенту
                </h2>
                <p className="max-w-[40ch] text-[15px] leading-relaxed text-[var(--color-read-soft)]">
                  Три вопроса, которые вам зададут. Отвечать придётся вам, а не
                  нам, поэтому ответы написаны заранее.
                </p>
              </div>
            </Reveal>

            <dl className="mt-12 border-t border-[var(--color-rule)]">
              {SCRIPT.map((s, i) => (
                <Reveal key={s.q} delay={i * 0.05}>
                  <div className="grid items-baseline gap-x-8 gap-y-3 border-b border-[var(--color-rule-hair)] py-6 md:grid-cols-[2.5rem_minmax(0,18rem)_1fr]">
                    <span className="read text-[11px] text-[var(--color-read-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <dt className="text-[18px] leading-snug font-medium tracking-[-0.03em]">
                      {s.q}
                    </dt>
                    <dd className="max-w-[66ch] text-[15px] leading-relaxed text-[var(--color-read-soft)]">
                      {s.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
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
