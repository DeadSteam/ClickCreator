"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Fade } from "./prose";
import { pfClick } from "@/predframing/analytics";
import { READING_MINUTES, type HypothesisId } from "@/predframing/hypotheses";

/*
  Обложка предфрейминговой страницы.

  Состав задан п.7 ТЗ UX-дизайнеру и одинаков для всех десяти гипотез: кикер,
  заголовок, подзаголовок, главный CTA, вторичная ссылка, микротекст и одна
  смысловая иллюстрация. Меняется только содержимое — поэтому оно приходит
  пропсами, а не переписывается в разметке на каждой версии.

  Обложка — отдельный слой страницы, а не первый абзац статьи: своя подложка,
  своя ширина, своя нижняя граница. Поэтому её сетка шире колонки чтения и не
  обязана стоять на той же оси — читатель видит титул документа, а под ним
  начинается сам документ. Ширина совпадает с рельсом глав: обложка и рельс
  образуют внешнюю рамку страницы, текст живёт внутри неё.

  Верхняя линейка набрана как строка выходных данных: слева — кому адресован
  разбор, справа — сколько он занимает. Это первое обещание страницы, и оно
  должно быть выполнимым: на длинном материале честно названное время чтения
  снижает отказы сильнее любого призыва.

  Кнопка вторичная, а не главная. Главное действие страницы одно, оно стоит в
  самом конце и ведёт в универсальную часть; яркая клавиша на обложке
  превратила бы разбор в обычный лендинг ещё до первого абзаца.
*/

/** Якорь первого смыслового блока. Обе ссылки обложки ведут сюда. */
export const RAZBOR_ANCHOR = "razbor";

/** Id обложки. По нему рельс глав узнаёт, что она ещё видна, и не встаёт поверх неё. */
export const HERO_ID = "pf-hero";

export function PredframingHero({
  hypothesis,
  kicker,
  title,
  subtitle,
  cta,
  micro,
  visual,
  /** Время чтения своё у каждого ТЗ (5–7 у гипотезы №1, 6 у №2 и так далее). */
  readingMinutes = READING_MINUTES,
}: {
  hypothesis: HypothesisId;
  kicker: string;
  title: string;
  /** Абзацы подзаголовка списком: ТЗ требует коротких абзацев, а не полотна. */
  subtitle: ReactNode[];
  cta: string;
  micro: string[];
  visual: ReactNode;
  readingMinutes?: string;
}) {
  return (
    /*
      Обложка намеренно не занимает окно целиком: ТЗ требует, чтобы читатель
      увидел продолжение. Высота набирается содержимым и отступами, а не
      задаётся числом, — иначе на низком ноутбуке CTA уезжает за сгиб, а на
      большом мониторе под текстом остаётся пустое поле.
    */
    <section id={HERO_ID} className="border-b border-[var(--rule)] bg-[var(--inset)]">
      <div className="mx-auto max-w-[88rem] px-5 pt-8 pb-16 sm:pt-10 sm:pb-20">
        <Fade>
          <div className="flex items-center gap-5">
            <p className="label shrink-0 text-[var(--ink-faint)]">{kicker}</p>
            <span aria-hidden="true" className="h-px min-w-4 flex-1 bg-[var(--rule)]" />
            <p className="label hidden shrink-0 text-[var(--ink-faint)] sm:block">
              {readingMinutes} чтения
            </p>
          </div>
        </Fade>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
          <div>
            {/*
              Кегль подобран под длину заголовка из ТЗ: он требует не более 3–4
              строк на десктопе и 5–6 на телефоне, а строка в русском наборе
              короче английской.
            */}
            <Fade>
              <h1 className="text-[30px] leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-[38px] lg:text-[42px] 2xl:text-[48px]">
                {title}
              </h1>
            </Fade>

            <div className="mt-8 flex max-w-[54ch] flex-col gap-4">
              {subtitle.map((p, i) => (
                <Fade key={i} delay={0.1 + i * 0.08}>
                  <p className="text-[17px] leading-[1.6] text-[var(--ink-soft)] sm:text-[18px]">
                    {p}
                  </p>
                </Fade>
              ))}
            </div>

            <Fade delay={0.32}>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Button
                  href={`#${RAZBOR_ANCHOR}`}
                  variant="secondary"
                  size="lg"
                  arrow
                  onClick={() => pfClick("pf_hero_cta_click", hypothesis, "hero")}
                >
                  {cta}
                </Button>

                <a
                  href={`#${RAZBOR_ANCHOR}`}
                  onClick={() => pfClick("pf_secondary_click", hypothesis, "hero")}
                  className="text-[15px] text-[var(--ink-soft)] underline decoration-[var(--rule)] underline-offset-4
                    [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
                >
                  Читать исследование ({readingMinutes})
                </a>
              </div>
            </Fade>

            {/*
              Микротекст набран строкой выходных данных, а не столбиком галочек:
              это снятие возражений, а не список преимуществ, и вес ему не нужен.
            */}
            <Fade delay={0.42}>
              <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--rule-soft)] pt-5">
                {micro.map((m, i) => (
                  <li
                    key={m}
                    className="flex items-center gap-3 text-[14px] text-[var(--ink-faint)] sm:text-[15px]"
                  >
                    {i > 0 && (
                      <span aria-hidden="true" className="block h-[3px] w-[3px] rounded-full bg-[var(--rule)]" />
                    )}
                    {m}
                  </li>
                ))}
              </ul>
            </Fade>
          </div>

          <Fade delay={0.24}>{visual}</Fade>
        </div>
      </div>
    </section>
  );
}
