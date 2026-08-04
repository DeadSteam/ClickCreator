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

const CROSS = { label: "Если вы владелец сайта", href: "/" };

export const metadata: Metadata = {
  title: "Если вы агентство",
  description:
    "Письмо специалистам и агентствам: оптовый доступ к поведенческим сигналам, своя наценка, отчёт без моих упоминаний и честный разговор о том, что сказать клиенту.",
  alternates: { canonical: "/pro" },
};

/* Продолжение того же письма, но к другому адресату. Голос не меняется. */
const OPENING = [
  "Если вы читаете эту страницу, вы, скорее всего, сами продаёте продвижение и думаете, стоит ли добавлять к нему сигналы. Отвечу как коллега коллеге, без продающих оборотов.",
  "Я работаю с полутора десятками агентств и специалистов. Они покупают у меня переходы оптом и продают своим клиентам со своей наценкой. Наценку я не ограничиваю, в переписку с вашим клиентом не лезу и в отчётах не появляюсь.",
] as const;

const SCRIPT = [
  {
    q: "Как назвать метод вашему клиенту",
    a: "Усилением поведенческих сигналов. Серый инструмент под контролем скорости. Не белый метод: эта формулировка рассыпается на первом уточняющем вопросе, и рассыпается она под вами, а не подо мной.",
  },
  {
    q: "Что делать, если позиции просели",
    a: "Останавливать подачу в кабинете. Она прекратится в течение часа, а не в конце оплаченного периода, а неизрасходованный баланс останется у вас и переставится на другой проект. Сайт клиента останется таким, каким был до подключения.",
  },
  {
    q: "Что показывать как результат",
    a: "Выгрузку позиций по каждой фразе с датами. В ней нет ни моего имени, ни домена этого сайта. Отчёт уходит клиенту как ваш, и меня это устраивает.",
  },
  {
    q: "Что я скажу, если клиент выйдет на меня напрямую",
    a: "Что работаю через вас и что цена для него будет та же, что у вас. Переманивать чужих клиентов - самый быстрый способ остаться без партнёров, и я это уже проходил.",
  },
] as const;

const FAQ_PRO = [
  {
    q: "Сколько агентств вы ведёте?",
    a: "Пятнадцать-восемнадцать одновременно, и это потолок. Дальше я перестаю успевать разбирать проекты руками, а без разбора руками вы можете купить то же самое у любого сервиса дешевле.",
  },
  {
    q: "Есть минимальная закупка?",
    a: "Нет. Разница между специалистом с одним проектом и агентством с сорока только в скидке за объём: от ста фраз я снимаю восемь процентов, от двухсот пятидесяти - пятнадцать.",
  },
  {
    q: "Вы будете отказывать моим клиентам?",
    a: "Буду, по тем же правилам, что и всем: вне ТОП-50, младше полугода, медицина и финансы в чувствительных темах. Отказ придёт от меня до оплаты, а не от поисковика через три месяца, и это защищает вашу репутацию, а не мою.",
  },
  {
    q: "Что обещать клиенту по результату?",
    a: "Ничего не обещать. Я сам не обещаю позиций и вам не советую: на этом рынке обещания раздают все, и именно поэтому им никто не верит. Что у вас есть - остановка в течение часа и баланс, который не сгорает, поэтому неудачный проект не сжигает деньги клиента, а освобождает их под следующий.",
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
          { name: "Если вы агентство", path: "/pro" },
        ]}
      />

      <Nav cross={CROSS} />

      <main id="main" tabIndex={-1}>
        <section className="px-6 pt-16 sm:px-10 sm:pt-24">
          <div className="mx-auto max-w-[72rem]">
            <div className="max-w-[58ch]">
              <Reveal>
                <p className="cap">Письмо коллегам</p>
                <h1 className="mt-5 max-w-[18ch] text-[36px] sm:text-[50px] lg:text-[56px]">
                  Продавайте моё под своим именем
                </h1>
                <div className="mt-8 flex flex-col gap-5 text-[18px] leading-relaxed sm:text-[19px]">
                  {OPENING.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-6 pt-28 sm:px-10 sm:pt-36">
          <div className="mx-auto max-w-[72rem]">
            <div className="max-w-[58ch]">
              <Reveal>
                <h2 className="max-w-[20ch]">
                  Четыре вопроса, которые вам зададут
                </h2>
                <p className="mt-6 text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
                  Отвечать на них будете вы, а не я, поэтому ответы я написал
                  заранее. Ни у одного сервиса в этой нише такого раздела нет, и
                  это, по-моему, главная причина, по которой грамотные
                  специалисты обходят её стороной.
                </p>
              </Reveal>

              <dl className="mt-10 border-t border-[var(--color-rule-soft)]">
                {SCRIPT.map((s, i) => (
                  <Reveal key={s.q} delay={i * 0.04}>
                    <div className="border-b border-[var(--color-rule-soft)] py-6">
                      <dt className="font-[family-name:var(--font-display)] text-[21px] leading-snug font-bold tracking-[-0.015em] sm:text-[23px]">
                        {s.q}
                      </dt>
                      <dd className="mt-2.5 text-[17px] leading-relaxed text-[var(--color-ink-soft)]">
                        {s.a}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="margin" className="scroll-mt-6 px-6 pt-28 sm:px-10 sm:pt-36">
          <div className="mx-auto max-w-[72rem]">
            <Reveal>
              <div className="max-w-[58ch]">
                <h2 className="max-w-[18ch]">
                  Сколько на этом зарабатывают
                </h2>
                <p className="mt-6 text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
                  Наценку ставите вы. Я вижу только закупку и не спрашиваю, за
                  сколько вы это продали.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <Margin />
            </Reveal>
          </div>
        </section>

        <section className="px-6 pt-28 sm:px-10 sm:pt-40">
          <div className="mx-auto max-w-[72rem]">
            <div className="max-w-[58ch]">
              <Reveal>
                <h2 className="max-w-[20ch]">
                  Первый проект я веду бесплатно
                </h2>
                <p className="mt-6 text-[18px] leading-relaxed text-[var(--color-ink-soft)] sm:text-[19px]">
                  Возьмите один свой проект и посмотрите неделю, прежде чем
                  что-то обещать клиенту. Карта не нужна, договор не нужен,
                  отказаться можно молча - я не пишу вдогонку.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Cta href={SITE.register} place="pro_final">
                    Взять первый проект
                  </Cta>
                  <Cta href={SITE.telegram} place="pro_final_tg" variant="quiet">
                    Сначала поговорить
                  </Cta>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-6 pt-28 pb-28 sm:px-10 sm:pt-36 sm:pb-36">
          <div className="mx-auto max-w-[72rem]">
            <div className="max-w-[58ch]">
              <Reveal>
                <h2 className="text-[26px] sm:text-[34px]">
                  Что меня спрашивают коллеги
                </h2>
              </Reveal>
              <div className="mt-8">
                <Faq items={FAQ_PRO} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer cross={CROSS} />
    </>
  );
}
