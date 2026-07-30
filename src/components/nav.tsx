"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "./logo";

export type NavLink = { label: string; href: string };

/*
  A hairline bar that scrolls away with the page. Not a floating glass pill:
  that reads as the category default, and the fixed rank rail already carries
  persistent orientation.
*/
export function Nav({
  links,
  crossLink,
  ctaLabel,
  ctaHref,
}: {
  links: NavLink[];
  crossLink: NavLink;
  ctaLabel: string;
  ctaHref: string;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="relative z-30 px-5 sm:px-8">
        <nav className="mx-auto flex max-w-[76rem] items-center justify-between gap-6 border-b border-[var(--rule-soft)] py-5">
          <Link href="/" aria-label="TopInjector, на главную">
            <Logo />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[14px] text-[var(--ink-soft)]
                  [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={crossLink.href}
              className="label border-b border-[var(--rule)] pb-0.5 text-[var(--ink-faint)]
                [transition:color_var(--t-hover)_var(--ease-micro),background-color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
            >
              {crossLink.label}
            </Link>
            <Link
              href={ctaHref}
              className="rounded-[var(--radius-pill)] bg-[var(--ink)] px-5 py-2.5 text-[14px]
                font-semibold text-[var(--color-steel-100)]
                [transition:opacity_var(--t-hover)_var(--ease-micro),transform_var(--t-press)_var(--ease-out)]
                hover:opacity-85 active:scale-[0.975]"
            >
              {ctaLabel}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className="relative z-50 flex h-9 w-9 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-[1.5px] w-5 [transition:top_var(--t-panel)_var(--ease-haptic),transform_var(--t-panel)_var(--ease-haptic),background-color_var(--t-panel)_var(--ease-haptic)] ${
                    open
                      ? "top-[5px] rotate-45 bg-[oklch(0.955_0.012_60)]"
                      : "top-0 bg-[var(--ink)]"
                  }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-5 [transition:top_var(--t-panel)_var(--ease-haptic),transform_var(--t-panel)_var(--ease-haptic),background-color_var(--t-panel)_var(--ease-haptic)] ${
                    open
                      ? "top-[5px] -rotate-45 bg-[oklch(0.955_0.012_60)]"
                      : "top-[10px] bg-[var(--ink)]"
                  }`}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="zone-burn fixed inset-0 z-40 bg-[oklch(0.155_0.038_32)] px-5 pt-24 pb-10 lg:hidden"
          >
            <ul className="flex flex-col">
              {[...links, crossLink].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.04 + i * 0.04,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-[var(--rule-soft)] py-5"
                  >
                    <span className="num text-[11px] text-[var(--ink-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[24px] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
                      {l.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
