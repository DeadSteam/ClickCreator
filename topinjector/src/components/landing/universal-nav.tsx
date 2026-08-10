"use client";

import { useEffect, useState } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { track } from "@/diagnostic/analytics";

/*
  Шапка /universal. Не переиспользует `LandingNav` с /service: там навигация и
  CTA завязаны на Telegram-бота (п.4 предфрейминга это прямо запрещает —
  «без искусственного дефицита, без обещаний секретного доступа»), здесь
  единственное действие — прокрутка к форме на этой же странице.
*/

const NAV = [
  { label: "Сценарии", href: "#scenarios" },
  { label: "Кейсы", href: "#cases" },
  { label: "Тарифы", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function UniversalNav({ hypothesis }: { hypothesis?: string }) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 px-5 sm:px-8 ${
        stuck
          ? "border-b border-[var(--rule-soft)] bg-[color-mix(in_oklab,var(--page-bg)_88%,transparent)] backdrop-blur-md"
          : ""
      } [transition:background-color_var(--t-panel)_var(--ease-micro),border-color_var(--t-panel)_var(--ease-micro)]`}
    >
      <nav className="mx-auto flex h-[68px] max-w-[76rem] items-center justify-between gap-6">
        <Logo />

        <div className="hidden items-center gap-7 lg:flex">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-[var(--ink-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
            >
              {l.label}
            </a>
          ))}

          <Button
            size="sm"
            href="#start"
            arrow
            onClick={() => track("universal_hero_cta_click", { place: "nav", hypothesis })}
          >
            Запустить проверку
          </Button>

          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <Button size="sm" href="#start" onClick={() => track("universal_hero_cta_click", { place: "nav_mobile", hypothesis })}>
            Проверка
          </Button>
        </div>
      </nav>
    </header>
  );
}
