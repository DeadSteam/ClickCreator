import type { Metadata } from "next";
import Link from "next/link";

import { Clause, LegalPage, Para } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "База знаний",
  description:
    "Инструкции по работе с сервисом: добавление проекта, выбор запросов, оценка применимости, чтение динамики и работа с результатом.",
  alternates: { canonical: "/docs" },
};

/*
  Оглавление базы знаний. Разделы соответствуют реальному пути пользователя из
  ТЗ на лендинг, а не выдуманной структуре: первый запуск, выбор запросов,
  чтение динамики, работа с клиентом, ограничения.

  Пока статей нет, страница честно говорит об этом и уводит туда, где ответ уже
  есть. Ссылка из подвала на пустой раздел без объяснения выглядит как
  сломанный сайт.
*/

const SECTIONS = [
  {
    t: "Первый запуск",
    items: [
      "Как добавить проект и указать регион",
      "Как загрузить запросы и сгруппировать их",
      "Как пройти оценку применимости до первого списания",
      "Что происходит после запуска и когда появляются данные",
    ],
  },
  {
    t: "Выбор запросов",
    items: [
      "Какие запросы подходят под сценарий раннего результата",
      "Почему исходная позиция важнее частотности",
      "Как выбрать запросы, значимые для бизнеса клиента",
      "Когда запускать не стоит",
    ],
  },
  {
    t: "Чтение динамики",
    items: [
      "Как читать историю движения запроса",
      "Что считать результатом, а что колебанием выдачи",
      "Как фиксировать исходную точку и период наблюдения",
    ],
  },
  {
    t: "Работа с клиентом",
    items: [
      "Как показать динамику без длинных объяснений",
      "Как связать ранний результат с основной стратегией",
      "Формулировки для коммерческого предложения",
    ],
  },
];

export default function DocsPage() {
  return (
    <LegalPage
      title="База знаний"
      updated="февраля 2026"
      pending={false}
      intro="Инструкции по работе с сервисом. Раздел наполняется вместе с продуктом: ниже — структура и то, что уже доступно."
    >
      <Clause title="Что уже доступно">
        <Para>
          Условия применения, границы сценария и известные риски описаны на
          странице{" "}
          <Link href="/limits" className="underline underline-offset-2 hover:text-[var(--ink)]">
            «Ограничения и риски»
          </Link>
          . Условия бесплатного доступа — на странице{" "}
          <Link
            href="/trial-terms"
            className="underline underline-offset-2 hover:text-[var(--ink)]"
          >
            «Условия тестового периода»
          </Link>
          .
        </Para>
        <Para>
          Помощь при первом запуске входит в тестовый период: напишите в
          Telegram{" "}
          <a
            href="https://t.me/topinjector"
            className="underline underline-offset-2 hover:text-[var(--ink)]"
          >
            @topinjector
          </a>
          .
        </Para>
      </Clause>

      {SECTIONS.map((s) => (
        <Clause key={s.t} title={s.t}>
          <ul className="flex flex-col">
            {s.items.map((i) => (
              <li
                key={i}
                className="flex items-baseline gap-4 border-t border-[var(--rule-soft)] py-3 text-[16px] leading-snug text-[var(--ink-soft)] first:border-t-0 first:pt-0"
              >
                <span className="flex-1">{i}</span>
                <span className="label shrink-0 text-[var(--ink-faint)]">
                  готовится
                </span>
              </li>
            ))}
          </ul>
        </Clause>
      ))}
    </LegalPage>
  );
}
