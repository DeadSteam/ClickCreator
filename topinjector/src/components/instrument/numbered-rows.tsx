import { Reveal } from "@/components/reveal";
import { ordinal } from "@/format";

/*
  Стопка нумерованных полос системы `instrument.css`.

  Номер такта набран как графика и стоит вне текстовой колонки: он размером с
  заголовок и цветом линии, поэтому работает разделителем и отметкой порядка
  одновременно, а текст идёт рядом с ним, а не под. Подпись кеглем одиннадцать
  на этом месте существовала бы формально и ничего не держала.

  Один компонент на две страницы: механика на главной и набор инструментов на
  `/pro` — это одна и та же полоса с разными данными.
*/
export type NumberedRow = {
  /** Заголовок такта. */
  t: string;
  /** Пояснение. */
  d: string;
};

export function NumberedRows({
  items,
  className = "",
}: {
  items: readonly NumberedRow[];
  className?: string;
}) {
  return (
    <div className={`wrap-bleed border-t border-[var(--line)] ${className}`}>
      {items.map((row, i) => (
        <Reveal key={row.t} delay={i * 0.06}>
          <div className="inst-row grid grid-cols-12 items-start gap-x-8 gap-y-4 border-b border-[var(--line)] px-6 py-10 sm:px-10">
            <span className="inst-step-n col-span-12 lg:col-span-2">{ordinal(i)}</span>
            <h3 className="inst-d3 col-span-12 lg:col-span-4">{row.t}</h3>
            <p className="inst-body col-span-12 max-w-[58ch] lg:col-span-6">{row.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
