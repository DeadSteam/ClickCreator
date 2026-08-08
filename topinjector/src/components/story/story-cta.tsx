"use client";

import { Button } from "@/components/ui/button";
import { track } from "@/diagnostic/analytics";
import { Flow, Rise } from "./primitives";

/*
  Единственный переход на всей странице. [CTA] запрещает любые призывы до
  финального блока, поэтому кнопка здесь одна и появляется только после
  эмоционального пика.

  Ни тарифов, ни перечня функций, ни давления: после «Эврики» продажа
  разрушила бы состояние, ради которого написана статья.
*/
export function StoryCta({ query = "" }: { query?: string }) {
  return (
    <section className="zone-settled px-5 pb-28 sm:px-8 sm:pb-36">
      <div className="mx-auto max-w-[47rem]">
        <Rise>
          <p className="label text-[var(--ink-faint)]">следующий шаг</p>
        </Rise>

        <Rise delay={0.1}>
          <p className="mt-7 text-[19px] leading-[1.6] text-[var(--ink-soft)] sm:text-[21px]">
            Именно пытаясь решить эту проблему, мы создали SaaS-сервис для
            SEO-специалистов: он помогает получать раннюю измеримую динамику по
            подходящим целевым запросам и показывать клиенту результат уже в
            первые дни проекта.
          </p>
        </Rise>

        <Rise delay={0.16}>
          <p className="mt-5 text-[17px] leading-[1.65] text-[var(--ink-soft)]">
            Сервис не заменяет вашу стратегию. Он добавляет к ней то, чего обычно
            не хватает в начале сотрудничества: быстрое и понятное
            доказательство, что клиент выбрал правильного специалиста.
          </p>
        </Rise>

        <Flow
          steps={[
            "Проблема",
            "Понимание",
            "Новая модель",
            "Инструмент",
            "Первый результат",
          ]}
          accentAt={4}
        />

        <Rise delay={0.2}>
          <p className="mt-12 text-[15px] leading-relaxed text-[var(--ink-faint)]">
            На следующей странице: как работает сервис, для каких проектов он
            подходит, как выбираются запросы, какие результаты получали другие
            специалисты, какие существуют ограничения и как начать бесплатный
            тест.
          </p>
        </Rise>

        <Rise delay={0.26}>
          {/*
            Параметры диагностики едут дальше по воронке: лендинг персонализирует
            по ним первый экран и порядок карточек результата. Обрывать цепочку
            здесь значило бы потерять её на последнем шаге.
          */}
          <Button
            size="lg"
            arrow
            href={query ? `/service?${query}` : "/service"}
            onClick={() => track("story_cta_clicked", { from: "story" })}
            className="mt-9"
          >
            Посмотреть, как сократить окно сомнения
          </Button>
        </Rise>

        <Rise delay={0.3}>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-relaxed text-[var(--ink-faint)]">
            Не нужно верить обещанию. Изучите механику, условия и реальные
            результаты.
          </p>
        </Rise>
      </div>
    </section>
  );
}
