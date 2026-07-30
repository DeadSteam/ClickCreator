import Link from "next/link";
import type { ReactNode } from "react";

/*
  A milled control. Transitions name their properties rather than using `all`,
  land at press speed, and the press is a real scale so the control feels heard.
*/
export function Cta({
  href,
  children,
  tone = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "solid" | "outline";
  className?: string;
}) {
  const skin =
    tone === "solid"
      ? "bg-[var(--btn-bg)] text-[var(--btn-ink)] hover:bg-[var(--btn-bg-hover)]"
      : "border border-[var(--rule)] text-[var(--ink)] hover:border-[var(--ink)]";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-3 rounded-[var(--radius-pill)]
        px-6 py-3.5 text-[15px] font-semibold
        [transition:background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro),transform_var(--t-press)_var(--ease-out)]
        active:scale-[0.975] ${skin} ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="num text-[13px] [transition:transform_var(--t-hover)_var(--ease-micro)]
          group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="label flex items-center gap-2.5 text-[var(--ink-faint)]">
      <span className="h-px w-6 bg-[var(--rule)]" />
      {children}
    </span>
  );
}
