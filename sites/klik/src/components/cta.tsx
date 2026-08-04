"use client";

import { track } from "@/lib/analytics";

/*
  Кнопка.

  Полностью круглая и крупная: 52 пикселя высоты вместо прежних 44. Главное
  действие страницы не должно выглядеть как элемент формы, и лишние восемь
  пикселей стоят дешевле любого текста, который пытается его продать.

  Основная - светлая заливка на тёмном. Это самый сильный контраст, какой
  вообще есть в палитре, и он достаётся бесплатно. Акцентный цвет на кнопку
  не идёт: он занят живым числом в расчёте, и раскрасив им ещё и кнопку,
  мы получим два одинаково ярких пятна и ни одного главного.

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
  variant?: "solid" | "ghost";
}) {
  const external = href.startsWith("http");

  const base =
    "inline-flex min-h-[52px] cursor-pointer items-center justify-center " +
    "rounded-[var(--radius-control)] px-8 text-[17px] font-medium " +
    "[transition:background-color_var(--t-fast)_var(--ease-soft),color_var(--t-fast)_var(--ease-soft),border-color_var(--t-fast)_var(--ease-soft),transform_var(--t-fast)_var(--ease-soft)] " +
    "active:scale-[0.98]";

  const skin =
    variant === "solid"
      ? "bg-[var(--color-text)] text-[var(--color-ink)] hover:bg-[var(--color-text-muted)]"
      : "border border-[var(--color-line)] text-[var(--color-text)] hover:bg-[var(--color-surface)]";

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
