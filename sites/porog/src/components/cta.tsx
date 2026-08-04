"use client";

import { track } from "@/lib/analytics";

/*
  Кнопка.

  Прямоугольник без единого скругления и без тени - на этом сайте прямой угол
  держит характер, и кнопка не имеет права быть исключением. Крупная: 54
  пикселя высоты вместо прежних 44. Главное действие страницы не должно
  выглядеть как элемент формы.

  Сигнальный жёлтый на кнопку не идёт: он занят отказом, и раскрасив им ещё и
  призыв, мы получим страницу, где предупреждение и приглашение выглядят
  одинаково.

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

  const base =
    "inline-flex min-h-[54px] cursor-pointer items-center justify-center px-8 " +
    "text-center text-[17px] font-medium tracking-[-0.015em] " +
    "[transition:color_var(--t-fast)_var(--ease-snap),background-color_var(--t-fast)_var(--ease-snap),border-color_var(--t-fast)_var(--ease-snap)]";

  const skin =
    variant === "solid"
      ? "bg-[var(--color-graphite)] text-[var(--color-sheet)] hover:bg-[oklch(0.32_0.008_255)]"
      : "border border-[var(--color-rule)] text-[var(--color-graphite)] hover:border-[var(--color-graphite)]";

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
