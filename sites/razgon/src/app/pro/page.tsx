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
        <section className="px-6 pt-16 pb-28 sm:px-10 sm:pt-24 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <p className="text-[19px] text-[var(--color-mark-soft)]">
                Для тех, кто продаёт сам
              </p>
              <h1 className="mt-6 max-w-[13ch]">
                Расписание, которое можно переслать клиенту
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
                <p className="max-w-[44ch] text-[21px] leading-relaxed text-[var(--color-mark-soft)]">
                  В нём нет ни одного обещания, за которое вам потом придётся
                  оправдываться, и нет упоминаний о нас. Наценку назначаете вы,
                  скидка считается по суммарному объёму фраз на счёте.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
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

        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[14ch]">Кому это подходит</h2>
            </Reveal>

            <div className="mt-14 grid gap-x-16 gap-y-14 sm:grid-cols-2">
              {ROLES.map((r, i) => (
                <Reveal key={r.who} delay={i * 0.05}>
                  <h3 className="max-w-[22ch]">{r.who}</h3>
                  <p className="mt-4 max-w-[46ch] text-[18px] leading-relaxed text-[var(--color-mark-soft)]">
                    {r.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Разговор о риске идёт до разговора о деньгах. */}
        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[14ch]">Что говорить клиенту</h2>
              <p className="mt-8 max-w-[52ch] text-[19px] leading-relaxed text-[var(--color-mark-soft)]">
                Три вопроса, которые вам зададут. Отвечать придётся вам, а не
                нам, поэтому ответы написаны заранее.
              </p>
            </Reveal>

            <dl className="mt-14 border-t border-[var(--color-mark)]">
              {SCRIPT.map((s, i) => (
                <Reveal key={s.q} delay={i * 0.05}>
                  <div className="grid gap-x-14 gap-y-3 border-b border-[var(--color-rule-soft)] py-8 md:grid-cols-[minmax(0,18rem)_1fr]">
                    <dt className="text-[21px] leading-snug font-bold tracking-[-0.02em]">
                      {s.q}
                    </dt>
                    <dd className="max-w-[62ch] text-[18px] leading-relaxed text-[var(--color-mark-soft)]">
                      {s.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section id="margin" className="scroll-mt-10 px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[14ch]">Сколько остаётся вам</h2>
              <p className="mt-8 max-w-[52ch] text-[19px] leading-relaxed text-[var(--color-mark-soft)]">
                Наценку мы не ограничиваем и не проверяем.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-14">
              <Margin />
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <div className="border-t border-[var(--color-mark)] pt-14">
                <h2 className="max-w-[15ch]">Первый проект без баланса</h2>
                <p className="mt-10 max-w-[52ch] text-[21px] leading-relaxed text-[var(--color-mark-soft)]">
                  Заведите один проект и семь суток смотрите на позиции, прежде
                  чем что-то обещать клиенту. Карта не нужна, договор не нужен,
                  отказаться можно молча.
                </p>
                <div className="mt-12 flex flex-col gap-4 sm:flex-row">
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

        <section className="px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 className="max-w-[12ch]">Вопросы</h2>
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
