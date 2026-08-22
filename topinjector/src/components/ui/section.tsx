import type { ReactNode } from "react";

/**
 * Как нарисована граница раздела.
 *
 * `line` — волосяная черта по низу полосы: страница читается разграфлённым
 * листом. `sticky` — та же граница, но прилипающая под шапкой: пока раздел
 * идёт, его верхний край стоит на месте и отвечает на вопрос «где я».
 * `none` — для разделов, которые несут собственную заливку и разделяются ею.
 */
type SectionEdge = "line" | "sticky" | "none";

/**
 * Вертикальный ритм. `default` — симметричный, для страниц с нарисованной
 * границей раздела. `top` — только сверху, для страниц, где границу держит
 * смена заливки и вторая отбивка сложилась бы с чужой в двойную пустоту.
 * `tight` — там, где два блока принадлежат одной мысли.
 */
type SectionPad = "default" | "top" | "tight" | "none";

export type SectionProps = {
  id?: string;
  edge?: SectionEdge;
  pad?: SectionPad;
  /** Боковые края листа. Ставится там, где страница набрана разграфлённой. */
  ruled?: boolean;
  /** Классы оболочки: заливка, изоляция, обрезка. */
  className?: string;
  /** Классы внутренней полосы: сетка, выравнивание. */
  innerClassName?: string;
  children: ReactNode;
};

const PAD: Record<SectionPad, string> = {
  default: "sec-pad",
  top: "sec-pad-top",
  tight: "sec-pad-tight",
  none: "",
};

/**
 * Раздел страницы.
 *
 * Оболочка без полей плюс внутренняя полоса с полями — разделение
 * обязательное, а не стилистическое: граница раздела должна лежать на самой
 * границе, а внутри элемента с `padding-block` любой потомок начинается уже
 * на восемьдесят пикселей ниже неё.
 *
 * `data-pf-block` инертен везде, кроме предфрейминговых маршрутов: там
 * `usePredframingAnalytics` слушает этот атрибут, чтобы мерить просмотр и
 * время по блокам. Ставится по `id`, а не отдельным пропсом — второй источник
 * правды для одного идентификатора расходится быстрее, чем успевает
 * пригодиться.
 */
export function Section({
  id,
  edge = "line",
  pad = "default",
  ruled = false,
  className = "",
  innerClassName = "",
  children,
}: SectionProps) {
  const shell = ["sec", edge === "line" ? "sec-edge" : "", className]
    .filter(Boolean)
    .join(" ");
  const inner = ["wrap", ruled ? "wrap-ruled" : "", PAD[pad], innerClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} data-pf-block={id} className={shell}>
      {edge === "sticky" ? (
        <div className="sec-edge-sticky" aria-hidden="true" />
      ) : null}
      <div className={inner}>{children}</div>
    </section>
  );
}
