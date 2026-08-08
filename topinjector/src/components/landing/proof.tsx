"use client";

import { Button } from "@/components/ui/button";
import { track } from "@/diagnostic/analytics";
import { FEATURED_CASE, PROOFS } from "@/landing/config";
import { Appear } from "./sections";

/*
  Кейс и серия доказательств.

  Каждая карточка обязательно несёт дату, исходную позицию, регион и период
  наблюдения: п.7 ТЗ прямо запрещает публиковать кейс без них, а мастер-документ
  считает скриншот без контекста бесполезным. Тип `Proof` требует эти поля, так
  что забыть их молча нельзя.
*/

export function CaseStudy() {
  const c = FEATURED_CASE;

  return (
    <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-[1fr_1fr]">
      <Appear className="cell p-7 sm:p-8">
        <p className="label text-[var(--ink-faint)]">ситуация</p>
        <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
          Частный SEO-специалист начал работу с проектом в нише «{c.niche}».
          Клиент ожидал первых признаков движения в начале сотрудничества и
          регулярно спрашивал о сроках.
        </p>

        <dl className="mt-8 flex flex-col border-t border-[var(--rule-soft)] pt-5">
          {[
            ["Специалист", `${c.author}, ${c.experience}`],
            ["Регион", c.region],
            ["Запрос", c.query],
            ["Стартовая позиция", String(c.start)],
            ["Дата запуска", c.launched],
            ["Период наблюдения", c.watched],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-[var(--rule-soft)] py-2.5 first:border-t-0 first:pt-0"
            >
              <dt className="label text-[var(--ink-faint)]">{k}</dt>
              <dd className="max-w-[24ch] text-right text-[14px] text-[var(--ink-soft)]">{v}</dd>
            </div>
          ))}
        </dl>
      </Appear>

      <Appear delay={0.1} className="cell p-7 sm:p-8">
        <p className="label text-[var(--ink-faint)]">динамика по дням</p>

        <ul className="mt-6 flex flex-col">
          {c.dynamics.map((d, i) => (
            <li
              key={d.day}
              className="flex items-center gap-5 border-t border-[var(--rule-soft)] py-3 first:border-t-0 first:pt-0"
            >
              <span className="label w-[7ch] shrink-0 text-[var(--ink-faint)]">{d.day}</span>
              <span className="h-1.5 flex-1 bg-[var(--rule-soft)]">
                <span
                  className="block h-1.5"
                  style={{
                    width: `${100 - (d.pos / c.start) * 100 + 6}%`,
                    backgroundColor:
                      i === c.dynamics.length - 1 ? "var(--accent)" : "var(--ink-faint)",
                  }}
                />
              </span>
              <span className="num w-[3ch] shrink-0 text-right text-[16px] font-semibold">
                {d.pos}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[16px] leading-relaxed text-[var(--ink-soft)]">
          Запрос достиг{" "}
          <span className="num font-semibold text-[var(--ink)]">{c.final}</span>{" "}
          позиции. После появления результата специалист использовал динамику на
          созвоне: обсуждение перешло от ожидания первых результатов к
          расширению списка запросов.
        </p>

        <blockquote className="mt-8 border-l-2 border-[var(--accent)] pl-5 text-[16px] leading-snug text-[var(--ink)]">
          «{c.quote}»
        </blockquote>

        <p className="mt-8 border-t border-[var(--rule-soft)] pt-5 text-[13px] leading-relaxed text-[var(--ink-faint)]">
          Ограничения кейса: {c.limits} Приведённый результат относится к
          конкретному проекту. Сроки и позиции зависят от исходных условий.
        </p>
      </Appear>
    </div>
  );
}

export function ProofGrid() {
  return (
    <div className="mt-20">
      <Appear>
        <h3 className="text-[24px] font-extrabold tracking-[-0.03em] sm:text-[30px]">
          Результаты на разных проектах и запросах
        </h3>
      </Appear>

      <div className="mt-10 grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        {PROOFS.map((p, i) => (
          <Appear key={p.query} delay={Math.min(i, 4) * 0.06} className="cell">
            <article className="h-full p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="text-[17px] font-semibold tracking-[-0.02em]">{p.niche}</h4>
                <span className="label text-[var(--ink-faint)]">{p.region}</span>
              </div>

              <p className="mt-3 text-[14px] text-[var(--ink-soft)]">{p.query}</p>

              <p className="mt-6 flex items-baseline gap-3">
                <span className="num text-[26px] leading-none text-[var(--ink-faint)]">
                  {p.from}
                </span>
                <span aria-hidden="true" className="num text-[var(--ink-faint)]">
                  →
                </span>
                <span className="num text-[32px] leading-none font-semibold text-[var(--accent)]">
                  {p.to}
                </span>
              </p>

              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-[var(--rule-soft)] pt-4">
                {[
                  ["срок", p.days],
                  ["наблюдение", p.watched],
                  ["запуск", p.date],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="label text-[var(--ink-faint)]">{k}</dt>
                    <dd className="mt-1 text-[13px] text-[var(--ink-soft)]">{v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Appear>
        ))}
      </div>

      <Appear delay={0.16}>
        <Button
          variant="secondary"
          href="#cases"
          onClick={() => track("case_detail_click", { place: "proof_grid" })}
          className="mt-10"
        >
          Смотреть все кейсы
        </Button>
      </Appear>
    </div>
  );
}
