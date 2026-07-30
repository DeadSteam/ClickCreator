"use client";

import Link from "next/link";
import { useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";

const TOP = 47;
const BOTTOM = 1;

/*
  The page's spine. Scroll position IS search position: you enter the page at 47
  and arrive at 1. The device is structural, not decorative, so it earns the
  fixed real estate it takes.

  State updates only when the integer changes, so this re-renders 46 times over
  the whole document rather than once per frame.
*/
export function RankRail({ ctaHref, ctaLabel }: { ctaHref: string; ctaLabel: string }) {
  const { scrollYProgress } = useScroll();
  const [rank, setRank] = useState(TOP);
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.max(BOTTOM, Math.round(TOP - p * (TOP - BOTTOM)));
    setRank((prev) => (prev === next ? prev : next));
  });

  const pct = ((TOP - rank) / (TOP - BOTTOM)) * 100;

  return (
    <>
      {/* Desktop: a milled rail down the left margin. */}
      <aside
        className="pointer-events-none fixed top-1/2 left-6 z-30 hidden -translate-y-1/2
          flex-col items-start gap-3 xl:flex"
        aria-hidden="true"
      >
        <span className="label text-[var(--ink-faint)]">позиция</span>

        <span className="num text-[44px] leading-none font-medium text-[var(--ink)]">
          {String(rank).padStart(2, "0")}
        </span>

        <div className="relative mt-1 h-[38vh] w-px bg-[var(--rule)]">
          <div
            className="absolute inset-x-0 top-0 bg-[var(--hot)]"
            style={{
              height: `${pct}%`,
              transition: reduce ? "none" : "height 220ms var(--ease-haptic)",
            }}
          />
          <span
            className="absolute -left-[3px] block h-px w-[7px] bg-[var(--hot)]"
            style={{
              top: `${pct}%`,
              transition: reduce ? "none" : "top 220ms var(--ease-haptic)",
            }}
          />
        </div>

        <span className="num text-[11px] text-[var(--ink-faint)]">01</span>
      </aside>

      {/* Mobile: the action stays reachable, carrying the same readout. */}
      <div className="fixed inset-x-0 bottom-0 z-40 xl:hidden">
        <div className="flex items-stretch border-t border-[oklch(0.955_0.012_60/0.14)] bg-[oklch(0.155_0.038_32)]">
          <div className="flex shrink-0 flex-col justify-center px-4 py-2.5">
            <span className="label text-[9px] text-[oklch(0.605_0.028_50)]">позиция</span>
            <span className="num text-[19px] leading-none font-medium text-[oklch(0.955_0.012_60)]">
              {String(rank).padStart(2, "0")}
            </span>
          </div>

          <div className="relative w-px shrink-0 bg-[oklch(0.955_0.012_60/0.14)]" />

          <Link
            href={ctaHref}
            className="flex flex-1 items-center justify-center bg-[var(--color-ember)]
              px-4 py-3.5 text-[15px] font-semibold text-[oklch(0.155_0.038_32)]
              [transition:background-color_var(--t-hover)_var(--ease-micro),transform_var(--t-press)_var(--ease-out)] active:scale-[0.99] active:bg-[var(--color-ember-hot)]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </>
  );
}
