"use client";

import { track } from "@/lib/analytics";

/*
  Управляющий элемент бланка.

  Это не кнопка лендинга, а графа документа: двойная рамка, моноширинная
  подпись капителью и служебная отметка слева, как в поле «подпись
  ответственного». Заливка появляется только на наведении - напечатанный
  бланк не бывает чёрной плашкой, он становится ею, когда его заполняют.

  Форма выбрана намеренно непохожей на прямоугольную плашку остальных пяти
  сайтов: одинаковые кнопки выдают общее происхождение быстрее, чем
  одинаковые цвета, потому что кнопку рассматривают в упор.

  place обязателен: без него видно, что кликнули, но не видно, по какой из
  кнопок, и оптимизировать нечего.
*/
export function Cta({
  href,
  place,
  children,
  variant = "solid",
}: {
  href: string;
  place: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      className={`group inline-flex min-h-[46px] cursor-pointer items-center gap-3 px-5 py-3
        [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro)]
        ${
          variant === "solid"
            ? "border-2 border-double border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
            : "border border-[var(--color-rule)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
        }`}
      {...(external ? { rel: "noopener" } : {})}
      onClick={() => {
        track("cta_click", { place });
        if (external) track("register_outbound", { place });
      }}
    >
      {/*
        Отметка графы. Меняет только цвет: любое смещение при наведении
        превратило бы строгий бланк в анимированный виджет.
      */}
      <span
        aria-hidden
        className="num text-[13px] text-[var(--color-stamp)] [transition:color_var(--t-hover)_var(--ease-micro)] group-hover:text-[var(--color-paper)]"
      >
        &rarr;
      </span>
      <span className="field text-[11px] tracking-[0.12em] text-current">
        {children}
      </span>
    </a>
  );
}

/*
  Подпись-кикер. На всю страницу их максимум три: капсовая надпись над каждой
  секцией читается как шаблон, а не как система.
*/
export function Kicker({ children }: { children: React.ReactNode }) {
  return <span className="field block">{children}</span>;
}
