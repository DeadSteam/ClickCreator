"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { track, type DiagnosticEvent } from "@/diagnostic/analytics";
import { botLink } from "@/landing/config";

const NAV = [
  { label: "Как работает", href: "#how" },
  { label: "Кейсы", href: "#cases" },
  { label: "Возможности", href: "#product" },
  { label: "Безопасность", href: "#safety" },
  { label: "Тарифы", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const SIGNUP_URL = "https://lk.topinjector.ru/register";

/*
  Шапка закрепляется после прокрутки первого экрана, а не висит с самого начала:
  на первом экране она отнимала бы высоту у заголовка ровно там, где ТЗ требует
  показать результат сразу.
*/
export function LandingNav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 px-5 sm:px-8 ${
          stuck
            ? "border-b border-[var(--rule-soft)] bg-[color-mix(in_oklab,var(--page-bg)_88%,transparent)] backdrop-blur-md"
            : ""
        } [transition:background-color_var(--t-panel)_var(--ease-micro),border-color_var(--t-panel)_var(--ease-micro)]`}
      >
        <nav className="mx-auto flex max-w-[76rem] items-center justify-between gap-6 py-4">
          <Link href="/service" aria-label="TopInjector, наверх">
            <Logo />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] text-[var(--ink-soft)]
                  [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
              >
                {l.label}
              </a>
            ))}

            <a
              href={`${SIGNUP_URL}?mode=login`}
              className="text-[14px] text-[var(--ink-faint)]
                [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
            >
              Войти
            </a>

            <Button
              size="sm"
              href={botLink("nav")}
              target="_blank"
              rel="noopener"
              onClick={() => {
                track("tg_cta_click", { place: "nav" });
                track("tg_bot_open", { place: "nav" });
              }}
            >
              Получить лимиты
            </Button>

            <ThemeToggle />
          </div>

          <div className="ml-auto flex items-center lg:hidden">
            <ThemeToggle />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className="relative z-50 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-[1.5px] w-5 [transition:top_var(--t-panel)_var(--ease-haptic),transform_var(--t-panel)_var(--ease-haptic),background-color_var(--t-panel)_var(--ease-haptic)] ${
                  open
                    ? "top-[5px] rotate-45 bg-[oklch(0.962_0.004_250)]"
                    : "top-0 bg-[var(--ink)]"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-5 [transition:top_var(--t-panel)_var(--ease-haptic),transform_var(--t-panel)_var(--ease-haptic),background-color_var(--t-panel)_var(--ease-haptic)] ${
                  open
                    ? "top-[5px] -rotate-45 bg-[oklch(0.962_0.004_250)]"
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
            className="zone-settled fixed inset-0 z-40 overflow-y-auto overscroll-contain
              px-5 pt-24 pb-28 lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((l, i) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-[var(--rule-soft)] py-5"
                  >
                    <span className="num text-[11px] text-[var(--ink-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
                      {l.label}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`${SIGNUP_URL}?mode=login`}
                  className="flex items-baseline gap-4 border-b border-[var(--rule-soft)] py-5 text-[16px] text-[var(--ink-soft)]"
                >
                  Войти
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Закреплённая нижняя кнопка мобильной версии. Появляется после первого экрана:
 * пока основной CTA виден сам, дублировать его снизу незачем — панель только
 * отнимала бы высоту у контента. Ведёт в бота, как и все кнопки теста.
 */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    /*
      Панель объявляет зону, а не выписывает цвета вручную: кнопка внутри берёт
      ту же фаску и то же кольцо фокуса, что и остальные кнопки на графите.
      Прежние захардкоженные oklch жили отдельно от токенов и потому не
      получали ни одного их изменения.
    */
    <div className="zone-settled fixed inset-x-0 bottom-0 z-30 border-t border-[var(--rule-soft)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <Button
        block
        href={botLink("mobile_bar")}
        target="_blank"
        rel="noopener"
        onClick={() => {
          track("tg_cta_click", { place: "mobile_bar" });
          track("tg_bot_open", { place: "mobile_bar" });
        }}
      >
        Получить лимиты в Telegram
      </Button>
    </div>
  );
}

/**
 * События лендинга (п.26 ТЗ). Секции отмечаются одним наблюдателем, а не
 * пятью отдельными: список целей задаётся данными, и добавить экран потом —
 * это одна строка, а не ещё один хук.
 */
const WATCHED: { id: string; event: DiagnosticEvent }[] = [
  { id: "how", event: "how_it_works_view" },
  { id: "cases", event: "case_view" },
  { id: "safety", event: "safety_view" },
  { id: "pricing", event: "pricing_view" },
];

export function LandingAnalytics({ personal }: { personal: Record<string, string> }) {
  const fired = useRef<Set<string>>(new Set());
  const startedAt = useRef(Date.now());
  const depth = useRef(0);

  useEffect(() => {
    const once = (name: DiagnosticEvent, params?: Record<string, unknown>) => {
      if (fired.current.has(name)) return;
      fired.current.add(name);
      track(name, { ...personal, ...params });
    };

    once("landing_view");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const hit = WATCHED.find((w) => w.id === e.target.id);
          if (hit) once(hit.event);
        }
      },
      { threshold: 0.25 },
    );

    for (const w of WATCHED) {
      const el = document.getElementById(w.id);
      if (el) io.observe(el);
    }

    /*
      Глубина просмотра и время на странице — обязательные параметры событий
      (п.26 ТЗ). Глубина копится по максимуму достигнутого: иначе возврат
      наверх обнуляет её, и отчёт сообщает, что до низа не дошёл никто.
    */
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      depth.current = Math.max(depth.current, Math.round((window.scrollY / max) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onHide = () => {
      if (document.visibilityState !== "hidden") return;
      track("landing_leave", {
        ...personal,
        depth_pct: depth.current,
        seconds: Math.round((Date.now() - startedAt.current) / 1000),
      });
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [personal]);

  return null;
}
