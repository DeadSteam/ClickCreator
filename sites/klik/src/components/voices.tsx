import { VOICES } from "@/lib/content";
import { Reveal } from "./reveal";

/*
  Именные отзывы.

  Аудит категории зафиксировал: почти все конкуренты либо не показывают
  отзывов вовсе, либо публикуют анонимные, и это главный провал по доверию во
  всей нише. Анонимный отзыв здесь воспроизвёл бы ровно ту слабость, против
  которой построено позиционирование.

  Раскладка нарочно неровная: одна крупная цитата и две поменьше со сдвигом.
  Три одинаковые карточки в ряд читаются как набор, а не как люди.
*/
export function Voices() {
  const [lead, ...rest] = VOICES;

  return (
    <div>
      <Reveal>
        <figure className="panel px-7 py-10 sm:px-12 sm:py-14 lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          <blockquote className="max-w-[26ch] text-[clamp(24px,3vw,36px)] leading-[1.22] font-semibold tracking-[-0.025em]">
            {lead.quote}
          </blockquote>
          <figcaption className="mt-10 flex items-end justify-between gap-10 lg:mt-0 lg:block">
            <div>
              <p className="text-[18px] font-medium">{lead.name}</p>
              <p className="mt-1.5 max-w-[24ch] text-[17px] leading-snug text-[var(--color-text-muted)]">
                {lead.role}, {lead.org}
              </p>
            </div>
            <div className="shrink-0 text-right lg:mt-10 lg:text-left">
              <p className="num text-[32px] leading-none font-medium text-[var(--color-accent)]">
                {lead.figure}
              </p>
              <p className="mt-2 text-[17px] text-[var(--color-text-muted)]">
                {lead.note}
              </p>
            </div>
          </figcaption>
        </figure>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {rest.map((v, i) => (
          <Reveal key={v.name} delay={0.06 + i * 0.06} className={i === 1 ? "lg:mt-12" : ""}>
            <figure className="h-full border-t border-[var(--color-line)] pt-8">
              <blockquote className="max-w-[44ch] text-[18px] leading-relaxed text-[var(--color-text-muted)]">
                {v.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-baseline justify-between gap-8">
                <div>
                  <p className="text-[17px] font-medium">{v.name}</p>
                  <p className="mt-0.5 text-[16px] text-[var(--color-text-muted)]">
                    {v.role}, {v.org}
                  </p>
                </div>
                <p className="num shrink-0 text-[18px] text-[var(--color-accent)]">
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
