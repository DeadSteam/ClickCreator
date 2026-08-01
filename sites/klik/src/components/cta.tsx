"use client";

import { track } from "@/lib/analytics";

/*
  Кнопка прибора.

  Сигнальный цвет здесь намеренно не используется - ни в заливке, ни в ховере.
  На этом сайте он означает ровно одно: показание сейчас пересчитывается.
  Покрасив им кнопку, мы бы обесценили единственный смысловой цвет страницы
  ради украшения одного элемента.

  Поэтому основная кнопка - инверсия: белая плашка на графите. На тёмном фоне
  это самый сильный контраст, который вообще есть в палитре.

  place обязателен: без него видно, что по кнопке кликнули, но не видно, по
  какой из шести, и оптимизировать нечего.
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

  const base =
    "inline-flex min-h-[44px] cursor-pointer items-center justify-center px-6 py-3 " +
    "text-center text-[15px] font-medium tracking-[-0.01em] " +
    "[transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro),transform_var(--t-press)_var(--ease-micro)] " +
    "active:scale-[0.985]";

  const skin =
    variant === "solid"
      ? "bg-[var(--color-read)] text-[var(--color-case)] hover:bg-[var(--color-read-soft)]"
      : "border border-[var(--color-rule)] text-[var(--color-read)] hover:border-[var(--color-read)] hover:bg-[var(--color-case-raise)]";

  return (
    <a
      href={href}
      className={`${base} ${skin}`}
      {...(external ? { rel: "noopener" } : {})}
      onClick={() => {
        track("cta_click", { place });
        if (external) track("register_outbound", { place });
      }}
    >
      {children}
    </a>
  );
}
