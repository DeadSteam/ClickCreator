"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { MenuButton, useMenuState } from "./ui/mobile-menu";
import { EASE_HAPTIC } from "@/motion/tokens";
import { ordinal } from "@/format";

export type NavLink = { label: string; href: string };

/*
  Волосяная линейка, уезжающая вместе со страницей. Не парящая стеклянная
  капсула: та читается как умолчание категории, а постоянную ориентацию уже
  несёт фиксированная рейка окна сомнения.
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
  const { open, setOpen, toggle } = useMenuState();
  const reduce = useReducedMotion();

  return (
    <>
      {/*
        При открытом меню шапка поднимается над оверлеем. Слой z-30 задаёт
        собственный контекст наложения, и кнопка закрытия внутри него не могла
        подняться выше соседнего оверлея с z-40, каким бы z-index ей ни задали:
        меню открывалось, а закрыть его нажатием было нечем.
      */}
      <header
        className={`relative px-5 sm:px-8 ${open ? "z-50" : "z-30"}`}
      >
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
            {/*
              Кнопка шапки стала такой же зелёной клавишей, как все остальные.
              Раньше она была графитовой заливкой — единственной на сайте, и
              человек, дошедший до нижнего CTA, встречал там другой цвет
              главного действия, чем тот, который запомнил наверху.
            */}
            <Button size="sm" href={ctaHref}>
              {ctaLabel}
            </Button>

            <ThemeToggle />
          </div>

          <div className="ml-auto flex items-center lg:hidden">
            <ThemeToggle />
          </div>

          <MenuButton open={open} onClick={toggle} className="lg:hidden" />
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_HAPTIC }}
            className="zone-settled fixed inset-0 z-40 overflow-y-auto overscroll-contain
              px-5 pt-24 pb-10 lg:hidden"
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
                    ease: EASE_HAPTIC,
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-[var(--rule-soft)] py-5"
                  >
                    <span className="num text-[11px] text-[var(--ink-faint)]">
                      {ordinal(i)}
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
