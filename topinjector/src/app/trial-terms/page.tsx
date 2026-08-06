import type { Metadata } from "next";

import { Clause, Items, LegalPage, Para } from "@/components/legal/legal-page";
import { TRIAL } from "@/landing/config";

export const metadata: Metadata = {
  title: "Условия тестового периода",
  description:
    "Длительность бесплатного доступа, лимиты, необходимость банковской карты и что происходит после окончания периода.",
  alternates: { canonical: "/trial-terms" },
};

/*
  Условия теста тянутся из того же конфига, что и лендинг. Иначе цифры на
  странице продажи и в условиях расходятся при первой же правке, а расхождение
  между обещанием и документом — самый дорогой вид ошибки на этом сайте.
*/
export default function TrialTermsPage() {
  return (
    <LegalPage
      title="Условия тестового периода"
      updated="февраля 2026"
      intro="Тестовый период даёт возможность изучить интерфейс и пройти первый сценарий использования на собственном проекте."
    >
      <Clause title="Основные параметры">
        <dl className="flex flex-col">
          {[
            ["Длительность", `${TRIAL.days} дней с момента регистрации`],
            [
              "Лимиты",
              `до ${TRIAL.projects} проекта и ${TRIAL.queries} запросов`,
            ],
            [
              "Банковская карта",
              TRIAL.cardRequired ? "требуется при регистрации" : "не требуется",
            ],
            ["Стоимость", "бесплатно"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-[var(--rule-soft)] py-3 first:border-t-0 first:pt-0"
            >
              <dt className="label text-[var(--ink-faint)]">{k}</dt>
              <dd className="text-[16px] font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </Clause>

      <Clause title="Что входит">
        <Items items={[...TRIAL.includes]} />
      </Clause>

      <Clause title="Что ограничено">
        <Para>
          В тестовом периоде действуют лимиты по количеству проектов и запросов,
          указанные выше. [Перечислить функции, недоступные в тестовом периоде,
          и отличия от платных тарифов.]
        </Para>
      </Clause>

      <Clause title="Окончание периода">
        <Para>{TRIAL.afterTrial}</Para>
        <Para>
          По окончании тестового периода запущенные сценарии останавливаются,
          доступ к данным сохраняется в течение [X] дней. Для продолжения работы
          выбирается тариф.
        </Para>
      </Clause>

      <Clause title="Автоматическое списание">
        <Para>
          {TRIAL.cardRequired
            ? "[Указать условия и сроки автоматического списания после окончания периода, а также порядок отказа.]"
            : "Автоматическое списание после тестового периода не производится: банковская карта на этапе регистрации не требуется."}
        </Para>
      </Clause>

      <Clause title="Ограничения применения">
        <Para>
          Тестовый период не отменяет условий применения сервиса. Перед запуском
          проводится оценка применимости: если проект или запросы не подходят
          под сценарий, продвижение не начинается. Подробнее — на странице
          ограничений и рисков.
        </Para>
      </Clause>
    </LegalPage>
  );
}
