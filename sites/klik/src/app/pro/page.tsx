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
  блок стоит до вопросов и сразу после того, кому это подходит.
*/
const SCRIPT = [
  {
    q: "Как назвать метод",
    a: "Усилением поведенческих сигналов. Это серая зона, не входящая в число одобренных Яндексом методов. Формулировка «серый инструмент под контролем скорости» выдерживает уточняющие вопросы, формулировка «полностью белый метод» рассыпается на первом же.",
  },
  {
    q: "Что делать, если позиции просели",
    a: "Останавливать подачу в кабинете. Она прекращается в течение часа, а не в конце оплаченного периода, остаток переставляется на другой проект. Сайт клиента остаётся в том состоянии, в каком был до подключения.",
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
    a: "От нас — нет. Выгрузки и письма не содержат нашего имени. Единственное, чего мы не делаем, — не запрещаем вам говорить правду, если считаете нужным.",
  },
  {
    q: "Есть ли минимальная закупка?",
    a: "Нет. Разница между специалистом с одним проектом и агентством с сорока только в скидке за объём, а не в доступе.",
  },
  {
    q: "Что обещать клиенту по результату?",
    a: "Гарантии позиций мы не даём и вам не советуем: в этой нише её не может дать никто. Что у вас есть — прозрачная цена перехода, остановка в течение часа и остаток, который не сгорает, поэтому неудачный проект освобождает бюджет вместо того, чтобы его сжечь.",
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
        {/* Тот же первый экран, что и на главной: утверждение и расчёт рядом. */}
        <section className="glow px-6 pt-32 pb-24 sm:px-10 sm:pt-40 sm:pb-32">
          <div className="mx-auto grid max-w-[72rem] items-center gap-y-12 lg:grid-cols-[1fr_0.9fr] lg:gap-x-20 lg:gap-y-10">
            <Reveal className="lg:col-start-1 lg:row-start-1">
              <h1 className="max-w-[15ch]">
                Наценку назначаете вы, мы её не проверяем
              </h1>
              <p className="mt-8 max-w-[44ch] text-[19px] leading-relaxed text-[var(--color-text-muted)]">
                Оптовая закупка для тех, кто продаёт продвижение сам. Скидка
                считается по суммарному объёму фраз на счёте, отчёт уходит
                клиенту без единого упоминания нас.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <Margin />
            </Reveal>

            <Reveal delay={0.08} className="lg:col-start-1 lg:row-start-2">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Cta href={SITE.register} place="pro_lead">
                  Открыть счёт
                </Cta>
                <Cta href={SITE.telegram} place="pro_lead_tg" variant="ghost">
                  Спросить в Telegram
                </Cta>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-6 py-28 sm:px-10 sm:py-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <h2 className="max-w-[15ch]">Кому это закрывает задачу</h2>
            </Reveal>

            <div className="mt-16 grid gap-x-16 gap-y-14 sm:grid-cols-2 lg:mt-20">
              {ROLES.map((r, i) => (
                <Reveal key={r.who} delay={i * 0.05}>
                  <h3 className="max-w-[22ch]">{r.who}</h3>
                  <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-[var(--color-text-muted)]">
                    {r.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/*
          Разговор с заказчиком. Раньше это была сетка из трёх колонок с
          номерами; осталось определение и ответ - два уровня вместо четырёх.
        */}
        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <h2 className="max-w-[15ch]">Что вы скажете клиенту</h2>
              <p className="mt-6 max-w-[52ch] text-[19px] leading-relaxed text-[var(--color-text-muted)]">
                Три вопроса, которые вам зададут. Отвечать придётся вам, а не
                нам, поэтому ответы написаны заранее.
              </p>
            </Reveal>

            <dl className="mt-14 border-t border-[var(--color-line-soft)]">
              {SCRIPT.map((s, i) => (
                <Reveal key={s.q} delay={i * 0.05}>
                  <div className="grid gap-x-16 gap-y-3 border-b border-[var(--color-line-soft)] py-8 md:grid-cols-[minmax(0,18rem)_1fr]">
                    <dt className="text-[21px] leading-snug font-semibold tracking-[-0.02em]">
                      {s.q}
                    </dt>
                    <dd className="max-w-[60ch] text-[17px] leading-relaxed text-[var(--color-text-muted)]">
                      {s.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <h2>Вопросы</h2>
            </Reveal>
            <div className="mt-12 max-w-[58rem] border-t border-[var(--color-line-soft)]">
              <Faq items={FAQ_PRO} />
            </div>
          </div>
        </section>
      </main>

      <Footer cross={CROSS} />
    </>
  );
}
