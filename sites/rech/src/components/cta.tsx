"use client";

import { track } from "@/lib/analytics";

/*
  Целевое действие письма.

  Это не кнопка, а подчёркнутая фраза. Прямоугольная плашка с заливкой -
  элемент интерфейса, а в письме интерфейса нет: там есть текст, часть
  которого можно нажать. Ровно поэтому здесь нет ни рамки, ни фона, ни
  скруглений, а подчёркивание то же самое, каким в тексте выше выделены
  цифры - класс .stroke.

  Форма выбрана намеренно непохожей на плашки остальных пяти сайтов.
  Одинаковые кнопки выдают общее происхождение быстрее, чем одинаковые
  цвета: кнопку рассматривают в упор и нажимают, а фон видят краем глаза.

  Зона нажатия при этом честные 46 пикселей по высоте: то, что элемент
  выглядит как текст, не освобождает от попадания пальцем.

  place обязателен: без него видно, что кликнули, но не видно, по какой из
  фраз, и оптимизировать нечего.
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
  variant?: "solid" | "quiet";
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      className={`group inline-flex min-h-[46px] cursor-pointer items-center gap-2.5
        font-[family-name:var(--font-display)] font-bold tracking-[-0.015em]
        [transition:color_var(--t-hover)_var(--ease-micro)]
        hover:text-[var(--color-ochre)]
        ${variant === "solid" ? "text-[22px] sm:text-[25px]" : "text-[19px] text-[var(--color-ink-soft)] sm:text-[20px]"}`}
      {...(external ? { rel: "noopener" } : {})}
      onClick={() => {
        track("cta_click", { place });
        if (external) track("register_outbound", { place });
      }}
    >
      <span className={variant === "solid" ? "stroke" : "stroke"}>
        {children}
      </span>

      {/*
        Стрелка сдвигается на волос при наведении. Это единственное движение
        на всей странице, и оно уместно ровно здесь: указатель направления
        должен указывать. Сдвиг в три пикселя, потому что больше читалось бы
        как анимация, а письмо не анимируется.
      */}
      <span
        aria-hidden
        className="[transition:transform_var(--t-hover)_var(--ease-micro)] group-hover:translate-x-[3px]"
      >
        &rarr;
      </span>
    </a>
  );
}
