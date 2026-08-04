"use client";

import { track } from "@/lib/analytics";

/*
  Кнопка.

  Прежняя была графой бланка: двойная рамка, стрелка слева, подпись
  моноширинной капителью одиннадцатым кеглем. Читалась как поле для заполнения,
  а не как действие, и нажать её никому не приходило в голову.

  Здесь прямоугольник с плотной заливкой и подписью тем же серифом, что и
  весь текст, - тот же приём, каким в печатном издании набирают купон. Углы
  прямые: это единственная форма, которая держит страницу в издательском мире.
  Ни один из остальных пяти сайтов прямых углов на кнопке не имеет.

  Штемпельная краска на кнопку не идёт: она занята упавшими позициями в
  реестре, а два одинаково красных пятна на экране обесценивают оба.

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
    "text-[18px] font-semibold tracking-[-0.01em] " +
    "[transition:background-color_var(--t-fast)_var(--ease-page),color_var(--t-fast)_var(--ease-page),border-color_var(--t-fast)_var(--ease-page)]";

  const skin =
    variant === "solid"
      ? "bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-stamp)]"
      : "border border-[var(--color-rule)] text-[var(--color-ink)] hover:border-[var(--color-ink)]";

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
