import { VOICES } from "@/lib/content";
import { Reveal } from "./reveal";

/*
  Именные отзывы.

  Аудит категории зафиксировал: почти все конкуренты либо не показывают
  отзывов вовсе, либо публикуют анонимные, и это главный провал по доверию во
  всей нише. Анонимный отзыв здесь воспроизвёл бы ровно ту слабость, против
  которой построено позиционирование, поэтому имя, должность и город стоят
  рядом с каждой репликой.

  Раскладка нарочно неровная: одна крупная цитата на всю ширину и две
  поменьше со сдвигом под ней. Три одинаковые карточки в ряд - это шаблон,
  который читается как набор, а не как люди.
*/
export function Voices() {
  const [lead, ...rest] = VOICES;

  return (
    <div>
      <Reveal>
        <figure className="border-t border-[var(--color-ink)] pt-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-20">
          <blockquote className="max-w-[26ch] text-[clamp(28px,3.4vw,42px)] leading-[1.18] font-semibold tracking-[-0.02em]">
            {lead.quote}
          </blockquote>
          <figcaption className="mt-10 flex items-end justify-between gap-10 lg:mt-0 lg:block">
            <div>
              <p className="text-[19px] font-semibold">{lead.name}</p>
              <p className="mt-1.5 max-w-[24ch] text-[17px] leading-snug text-[var(--color-ink-soft)]">
                {lead.role}, {lead.org}
              </p>
            </div>
            <div className="shrink-0 text-right lg:mt-10 lg:text-left">
              <p className="num text-[34px] leading-none font-medium text-[var(--color-ochre)]">
                {lead.figure}
              </p>
              <p className="mt-2 text-[17px] text-[var(--color-ink-soft)]">
                {lead.note}
              </p>
            </div>
          </figcaption>
        </figure>
      </Reveal>

      <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-2">
        {rest.map((v, i) => (
          <Reveal key={v.name} delay={0.06 + i * 0.06} className={i === 1 ? "lg:mt-14" : ""}>
            <figure className="h-full border-t border-[var(--color-rule-soft)] pt-8">
              <blockquote className="max-w-[44ch] text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
                {v.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-baseline justify-between gap-8">
                <div>
                  <p className="text-[18px] font-semibold">{v.name}</p>
                  <p className="mt-0.5 text-[17px] text-[var(--color-ink-soft)]">
                    {v.role}, {v.org}
                  </p>
                </div>
                <p className="num shrink-0 text-[19px] text-[var(--color-ochre)]">
                  {v.figure}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
