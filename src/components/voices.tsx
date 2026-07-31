import { Reveal } from "./reveal";

/*
  Named proof. The market audit that preceded this build found that almost every
  competitor either omits testimonials or runs them anonymously, which is the
  single biggest credibility gap in the category. Anonymous quotes here would
  reproduce the exact weakness the positioning attacks.

  Layout is deliberately off-grid: one lead quote spanning wide, two supporting
  ones offset below, so the section does not repeat the page's stacked rhythm.
*/
const VOICES = [
  {
    quote:
      "Держали позиции по трём городам полгода классикой и почти не двигались. Через месяц здесь ВЧ по Казани встал в тройку. Осадок только от того, что клиенту пришлось честно объяснять метод.",
    name: "Артём Гусельников",
    role: "руководитель отдела маркетинга",
    org: "сеть сервисов «Полсухо»",
    figure: "ТОП-3",
    note: "по главному ВЧ",
    lead: true,
  },
  {
    quote:
      "Веду 14 клиентов. Взял ради скорости отчётов, остался ради маржи: закупка ушла на второй уровень через два месяца.",
    name: "Дина Хайруллина",
    role: "SEO-специалист на аутсорсе",
    org: "Екатеринбург",
    figure: "14",
    note: "проектов в кабинете",
    lead: false,
  },
  {
    quote:
      "Первую неделю сдвигов не было вообще, вернули остаток без единого вопроса. Вторую попытку запускали уже на другом тарифе, и вот там пошло.",
    name: "Сергей Плетнёв",
    role: "владелец интернет-магазина",
    org: "крепёж оптом, Новосибирск",
    figure: "возврат",
    note: "по первой неделе",
    lead: false,
  },
];

export function Voices() {
  const [lead, ...rest] = VOICES;

  return (
    <div>
      <Reveal>
        <figure className="border-t border-[var(--rule)] pt-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          <blockquote className="max-w-[30ch] text-[24px] leading-[1.25] font-semibold tracking-[-0.025em] sm:text-[32px] lg:max-w-[24ch] lg:text-[38px]">
            {lead.quote}
          </blockquote>
          <figcaption className="mt-8 flex items-end justify-between gap-8 lg:mt-0 lg:block">
            <div>
              <p className="text-[15px] font-semibold">{lead.name}</p>
              <p className="mt-1 max-w-[24ch] text-[13px] leading-snug text-[var(--ink-soft)]">
                {lead.role}, {lead.org}
              </p>
            </div>
            <div className="shrink-0 text-right lg:mt-8 lg:text-left">
              <p className="num text-[30px] leading-none font-semibold text-[var(--hot)] sm:text-[38px]">
                {lead.figure}
              </p>
              <p className="label mt-2 text-[var(--ink-faint)]">{lead.note}</p>
            </div>
          </figcaption>
        </figure>
      </Reveal>

      <div className="mt-4 grid gap-4 lg:mt-6 lg:grid-cols-2 lg:gap-6">
        {rest.map((v, i) => (
          <Reveal key={v.name} delay={0.06 + i * 0.06} className={i === 1 ? "lg:mt-12" : ""}>
            <figure className="h-full border-t border-[var(--rule-soft)] pt-6">
              <blockquote className="max-w-[44ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
                {v.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-baseline justify-between gap-6">
                <div>
                  <p className="text-[14px] font-semibold">{v.name}</p>
                  <p className="mt-0.5 text-[12px] text-[var(--ink-faint)]">
                    {v.role}, {v.org}
                  </p>
                </div>
                <p className="num shrink-0 text-[15px] text-[var(--hot)]">{v.figure}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
