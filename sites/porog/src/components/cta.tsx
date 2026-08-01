"use client";

import { track } from "@/lib/analytics";

/*
  Одна формулировка на одно действие: все кнопки, ведущие в кабинет, подписаны
  одинаково. Разные глаголы на одну ссылку читаются как разные предложения и
  заставляют перечитывать страницу.

  place обязателен. Без него в отчёте видно, что по кнопке кликнули, но не
  видно, по какой из шести, и оптимизировать нечего.
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
      ? "bg-[var(--color-graphite)] text-[var(--color-sheet)] hover:bg-[oklch(0.32_0.008_255)]"
      : "border border-[var(--color-rule)] text-[var(--color-graphite)] hover:border-[var(--color-graphite)] hover:bg-[var(--color-sheet-sink)]";

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
