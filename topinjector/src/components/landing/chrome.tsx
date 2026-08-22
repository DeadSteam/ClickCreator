"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MenuButton, useMenuState } from "@/components/ui/mobile-menu";
import { track, type DiagnosticEvent } from "@/diagnostic/analytics";
import { botLink } from "@/landing/config";
import { EASE_HAPTIC } from "@/motion/tokens";
import { ordinal } from "@/format";

/** Пункт навигации шапки. Якорь обязан существовать на той странице, куда шапку поставили. */
export type NavLink = { label: string; href: string };

/*
  Набор /service. Он же остаётся значением по умолчанию — но именно как
  значение по умолчанию, а не как единственно возможный список: у /stack
  разделы другие, и раньше шапка вела оттуда на `#how`, которого на странице
  нет вовсе. Молчаливо мёртвая ссылка в шапке — это потерянный переход, а не
  косметика, поэтому список пришёл в пропсы.
*/
const NAV: readonly NavLink[] = [
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
export function LandingNav({
  links = NAV,
  cta,
}: {
  links?: readonly NavLink[];
  /**
   * Кнопка шапки. Страницам со сквозной атрибуцией (/stack, разд. 25.6 ТЗ)
   * нужна своя: общая уходит в Telegram по `?start=nav`, без
   * `attribution_id`, и рекламная цепочка на ней обрывается.
   */
  cta?: ReactNode;
} = {}) {
  const [stuck, setStuck] = useState(false);
  const { open, setOpen, toggle } = useMenuState();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 ${open ? "z-50" : "z-40"} ${
          stuck
            ? "border-b border-[var(--rule-soft)] bg-[color-mix(in_oklab,var(--page-bg)_88%,transparent)] backdrop-blur-md"
            : ""
        } [transition:background-color_var(--t-panel)_var(--ease-micro),border-color_var(--t-panel)_var(--ease-micro)]`}
      >
        <nav className="wrap flex h-[var(--head-h)] items-center justify-between gap-6">
          <Link href="/service" aria-label="TopInjector, наверх">
            <Logo idPrefix="landing-nav" />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
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

            {cta ?? (
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
            )}

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
              px-5 pt-24 pb-28 lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-[var(--rule-soft)] py-5"
                  >
                    <span className="num text-[11px] text-[var(--ink-faint)]">
                      {ordinal(i)}
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
 * Закреплённая нижняя кнопка мобильной версии (п.56B.11 мастер-промпта).
 *
 * Появляется не по факту скролла, а по факту контакта: только после того, как
 * пользователь хотя бы раз увидел настоящий CTA на странице (`TrialCta`,
 * помеченный `data-cta-marker`) — и прячется всякий раз, когда такой CTA снова
 * в кадре, чтобы не показывать две конкурирующие кнопки одновременно.
 *
 * На страницах без размеченных CTA (сервисные `/limits`, `/docs` и т.п.)
 * наблюдать нечего — панель ведёт себя по старому правилу «после 80% первого
 * экрана», чтобы не потерять кнопку там, где размётки ещё нет.
 */
export function MobileCta({
  cta,
}: {
  /**
   * Кнопка панели. По той же причине, что и у шапки: на /stack общая кнопка
   * уводила в Telegram по `?start=mobile_bar` без `attribution_id`, а разд.
   * 25.17 ТЗ прямо требует, чтобы рекламная идентичность дожила до передачи
   * в бота. Плюс разд. 21 задаёт там свою подпись.
   */
  cta?: ReactNode;
} = {}) {
  const [everSeenCta, setEverSeenCta] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-cta-marker]"));

    if (targets.length === 0) {
      const onScroll = () => setEverSeenCta(window.scrollY > window.innerHeight * 0.8);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    /*
      IntersectionObserver отдаёт в колбэк только изменившиеся записи, поэтому
      «виден ли сейчас хоть один CTA» держим сами — множеством пересекающих
      целей, а не последним событием.
    */
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            visible.add(e.target);
            setEverSeenCta(true);
          } else {
            visible.delete(e.target);
          }
        }
        setCtaInView(visible.size > 0);
      },
      { threshold: 0.2 },
    );

    for (const t of targets) io.observe(t);
    return () => io.disconnect();
  }, []);

  if (!everSeenCta || ctaInView) return null;

  return (
    /*
      Панель объявляет зону, а не выписывает цвета вручную: кнопка внутри берёт
      ту же фаску и то же кольцо фокуса, что и остальные кнопки на графите.
      Прежние захардкоженные oklch жили отдельно от токенов и потому не
      получали ни одного их изменения.
    */
    <div className="zone-settled fixed inset-x-0 bottom-0 z-30 border-t border-[var(--rule-soft)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      {cta ?? (
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
          Получить бесплатные лимиты
        </Button>
      )}
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
