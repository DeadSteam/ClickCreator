"use client";

import { track } from "@/lib/analytics";

/*
  Кнопка. Алая заливка - единственное место, кроме отметки текущих суток, где
  на странице появляется цвет. Это осознанно: и то и другое означает "здесь
  происходит движение".

  Форма прямоугольная без скруглений и без тени, подпись капслоком тем же
  узким начертанием, что и заголовки: кнопка должна читаться как часть
  разметки полосы, а не как виджет из другой системы.

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
    "inline-flex min-h-[48px] cursor-pointer items-center justify-center px-7 py-3 " +
    "font-[family-name:var(--font-tight)] text-[18px] font-extrabold uppercase tracking-[0.01em] " +
    "[transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro),transform_var(--t-press)_var(--ease-micro)] " +
    "active:scale-[0.985]";

  const skin =
    variant === "solid"
      ? "bg-[var(--color-blaze)] text-[var(--color-field)] hover:bg-[var(--color-mark)]"
      : "border-2 border-[var(--color-mark)] text-[var(--color-mark)] hover:bg-[var(--color-field-edge)]";

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
