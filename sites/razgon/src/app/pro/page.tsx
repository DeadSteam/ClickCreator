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
    "Оптовый доступ к поведенческим сигналам для SEO-специалистов и агентств: расписание по суткам, которое можно показать клиенту, своя наценка, отчёт без наших упоминаний.",
  alternates: { canonical: "/pro" },
};

const ROLES = [
  {
    who: "SEO-специалист на подряде",
    d: "Пять-десять проектов и потолок классической оптимизации. Расписание по суткам можно показать клиенту вместо расплывчатого «работаем, ждите».",
  },
  {
    who: "Агентство полного цикла",
    d: "Нужен канал с движением в первый месяц, пока техническая часть разворачивается. Отдельный проект на клиента, один баланс на всех.",
  },
  {
    who: "Директолог и таргетолог",
    d: "Клиент упёрся в стоимость заявки из платного трафика. Органика по тем же фразам дешевле, а вы расширяете чек, не меняя специализацию.",
  },
  {
    who: "Владелец сетки сайтов",
    d: "Десятки доменов со своей семантикой. Массовая загрузка фраз, один счёт, скидка по суммарному объёму.",
  },
] as const;

/*
  Разговор с клиентом. Аудит категории зафиксировал: ни один конкурент не
  объясняет специалисту, что тот скажет заказчику, если поисковик отреагирует.
  Именно это отпугивает грамотного партнёра сильнее цены, поэтому блок стоит
  до денег, а не после.
*/
const SCRIPT = [
  {
    q: "Что обещать по срокам",
    a: "Ровно то, что написано в расписании на главной, и ни днём меньше. Первые сдвиги на третьи сутки, первая десятка от двух недель, закрепление от трёх. Обещание «топ за три дня» разваливается на четвёртые сутки, и разваливается оно под вами.",
  },
  {
    q: "Как назвать метод",
    a: "Усилением поведенческих сигналов. Серый инструмент под контролем скорости. Не белый метод: эта формулировка не выдерживает ни одного уточняющего вопроса.",
  },
  {
    q: "Что делать, если позиции просели",
    a: "Останавливать подачу в кабинете. Она прекратится в течение часа, а не в конце оплаченного периода, а неизрасходованный баланс останется у вас и переставится на другой проект. Сайт клиента останется таким, каким был до подключения.",
  },
] as const;

const FAQ_PRO = [
  {
    q: "Можно показывать клиенту ваше расписание?",
    a: "Нужно. Оно и написано так, чтобы его можно было переслать: там нет ни одного обещания, за которое вам потом придётся оправдываться. Про наш домен в нём тоже ничего нет.",
  },
  {
    q: "Скидка считается по каждому проекту или по всем сразу?",
    a: "По суммарному количеству фраз на счёте. Агентство с двадцатью проектами по тридцать фраз получает скидку за шестьсот, а не двадцать раз по тридцать.",
  },
  {
    q: "Клиент узнает, что работает через посредника?",
    a: "От нас - нет. Выгрузки и письма не содержат нашего имени, с конечным заказчиком мы не связываемся.",
  },
  {
    q: "Что обещать клиенту по результату?",
    a: "Только расписание с этой страницы и ничего сверх него. Гарантий позиций мы не даём и вам не советуем. Что у вас есть - контрольный съём на седьмые сутки, остановка в течение часа и баланс, который не сгорает, поэтому неудачный проект освобождает бюджет вместо того, чтобы его сжечь.",
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
        <section className="px-5 pt-12 sm:px-8 sm:pt-16">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <span className="plate">для тех, кто продаёт сам</span>
              <h1 className="mt-5 max-w-[13ch] text-[54px] sm:text-[92px] lg:text-[118px]">
                Расписание, которое можно переслать клиенту
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 grid gap-8 border-t border-[var(--color-mark)] pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                <p className="max-w-[46ch] text-[18px] leading-relaxed text-[var(--color-mark-soft)]">
                  В нём нет ни одного обещания, за которое вам потом придётся
                  оправдываться, и нет упоминаний о нас. Наценку назначаете вы,
                  скидка считается по суммарному объёму фраз на счёте.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Cta href={SITE.register} place="pro_hero">
                    Открыть счёт
                  </Cta>
                  <Cta href="#margin" place="pro_hero_calc" variant="outline">
                    Посчитать маржу
                  </Cta>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <h2 className="max-w-[14ch] text-[42px] sm:text-[62px]">
                Кому это подходит
              </h2>
            </Reveal>

            <div className="mt-10 grid border-t border-[var(--color-mark)] lg:grid-cols-2">
              {ROLES.map((r, i) => (
                <Reveal
                  key={r.who}
                  delay={i * 0.05}
                  className={`border-b border-[var(--color-rule-hair)] py-7 lg:py-9 ${
                    i % 2 === 1
                      ? "lg:border-l lg:border-l-[var(--color-rule-hair)] lg:pl-8"
                      : "lg:pr-8"
                  }`}
                >
                  <span className="day text-[13px] text-[var(--color-mark-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[22px]">{r.who}</h3>
                  <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-[var(--color-mark-soft)]">
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
                <h2 className="max-w-[14ch] text-[42px] sm:text-[62px]">
                  Что говорить клиенту
                </h2>
                <p className="max-w-[40ch] text-[16px] leading-relaxed text-[var(--color-mark-soft)]">
                  Три вопроса, которые вам зададут. Отвечать придётся вам, а не
                  нам, поэтому ответы написаны заранее.
                </p>
              </div>
            </Reveal>

            <dl className="mt-10 border-t border-[var(--color-mark)]">
              {SCRIPT.map((s, i) => (
                <Reveal key={s.q} delay={i * 0.05}>
                  <div className="grid items-baseline gap-x-8 gap-y-3 border-b border-[var(--color-rule-hair)] py-7 md:grid-cols-[3rem_minmax(0,18rem)_1fr]">
                    <span className="day text-[13px] text-[var(--color-mark-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <dt className="text-[19px] leading-snug font-bold tracking-[-0.02em]">
                      {s.q}
                    </dt>
                    <dd className="max-w-[66ch] text-[16px] leading-relaxed text-[var(--color-mark-soft)]">
                      {s.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section id="margin" className="scroll-mt-4 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-[84rem]">
            <Reveal>
              <h2 className="max-w-[14ch] text-[42px] sm:text-[62px]">
                Сколько остаётся вам
              </h2>
              <p className="mt-6 max-w-[50ch] text-[16px] leading-relaxed text-[var(--color-mark-soft)]">
                Наценку мы не ограничиваем и не проверяем.
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
              <div className="border-t border-[var(--color-mark)] pt-10">
                <h2 className="max-w-[14ch] text-[48px] sm:text-[80px] lg:text-[96px]">
                  Первый проект бесплатно
                </h2>
                <p className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-[var(--color-mark-soft)] sm:text-[19px]">
                  Возьмите один свой проект и пройдите по расписанию семь суток,
                  прежде чем что-то обещать клиенту. Карта не нужна, договор не
                  нужен, отказаться можно молча.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Cta href={SITE.register} place="pro_final">
                    Открыть счёт
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
              <h2 className="max-w-[12ch] text-[42px] sm:text-[56px]">Вопросы</h2>
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
