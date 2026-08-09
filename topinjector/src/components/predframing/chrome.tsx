"use client";

import { useEffect, useState } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { pfClick, usePredframingAnalytics } from "@/predframing/analytics";
import { UNIVERSAL_ROUTE, type HypothesisId } from "@/predframing/hypotheses";

/*
  Обвязка предфрейминговой страницы.

  Главное ограничение ТЗ: до перехода в универсальную часть на странице не
  должно быть ни одной заметной кнопки. Поэтому шапка почти пустая, а действие
  появляется только после 60% прокрутки — там, где ТЗ разрешает предложить
  следующий шаг. Меню нет вообще: любая ссылка на продуктовую страницу здесь —
  ранняя продажа, которую ТЗ запрещает прямым текстом.
*/

/** Доля страницы, после которой можно предлагать переход. Требование п.12 ТЗ. */
const CTA_AFTER = 0.62;

function useScrolledPast(fraction: number) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPast(max > 0 && window.scrollY / max >= fraction);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [fraction]);

  return past;
}

export function PredframingHeader({ hypothesis }: { hypothesis: HypothesisId }) {
  const [stuck, setStuck] = useState(false);
  const showCta = useScrolledPast(CTA_AFTER);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 px-5 ${
        stuck
          ? "border-b border-[var(--rule-soft)] bg-[color-mix(in_oklab,var(--reading-bg)_88%,transparent)] backdrop-blur-md"
          : ""
      } [transition:background-color_var(--t-panel)_var(--ease-micro),border-color_var(--t-panel)_var(--ease-micro)]`}
    >
      {/* Высота держится в границах 64–72px, заданных п.12 ТЗ. */}
      <div className="mx-auto flex h-[68px] max-w-[76rem] items-center justify-between gap-4">
        <Logo />

        <div className="flex items-center gap-3">
          {/*
            Кнопка не выезжает и не всплывает: анимированное появление главного
            действия читается как всплывающее окно, а страница обязана
            оставаться исследованием. Она либо есть, либо её нет.
          */}
          {showCta && (
            <Button
              size="sm"
              href={UNIVERSAL_ROUTE}
              arrow
              className="hidden sm:inline-flex"
              onClick={() => pfClick("pf_continue_click", hypothesis, "header")}
            >
              Продолжить разбор
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

/** Крестик закрытия панели. SVG, а не типографский символ: это управляющий элемент. */
function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path
        d="M5 5 L15 15 M15 5 L5 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Нижняя панель мобильной версии. ТЗ (п.12) разрешает её только после 60–70%
 * страницы и требует, чтобы она легко закрывалась: раньше она перекрывала бы
 * текст ровно там, где идёт основное чтение.
 */
export function PredframingMobileCta({ hypothesis }: { hypothesis: HypothesisId }) {
  const show = useScrolledPast(CTA_AFTER);
  const [closed, setClosed] = useState(false);

  if (!show || closed) return null;

  return (
    <div className="zone-settled fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-[var(--rule-soft)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
      <Button
        block
        href={UNIVERSAL_ROUTE}
        arrow
        onClick={() => pfClick("pf_continue_click", hypothesis, "mobile_bar")}
      >
        Продолжить разбор
      </Button>

      <button
        type="button"
        onClick={() => setClosed(true)}
        aria-label="Скрыть панель перехода"
        className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-btn)] text-[var(--ink-faint)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

/** Подвал предфрейминга: только обязательное. Никаких переходов в продукт. */
export function PredframingFooter() {
  return (
    <footer className="mt-[136px] border-t border-[var(--rule-soft)] px-5 py-14">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <div className="flex flex-wrap gap-x-7 gap-y-2 text-[15px] text-[var(--ink-faint)]">
          <a
            href="/privacy"
            className="[transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
          >
            Политика конфиденциальности
          </a>
          <a
            href="/terms"
            className="[transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
          >
            Условия использования
          </a>
        </div>
      </div>
    </footer>
  );
}

/**
 * Единственная заметная кнопка страницы. Появляется только в конце, при
 * переходе в универсальную часть: раньше любое видное действие читалось бы как
 * продажа, а ТЗ разрешает продукт лишь после смены критерия оценки.
 */
export function PredframingContinue({
  hypothesis,
  label,
  reassurance,
}: {
  hypothesis: HypothesisId;
  label: string;
  reassurance: string[];
}) {
  return (
    <div className="mt-14">
      <Button
        href={UNIVERSAL_ROUTE}
        size="lg"
        arrow
        onClick={() => pfClick("pf_continue_click", hypothesis, "final")}
      >
        {label}
      </Button>

      <ul className="mt-7 flex flex-col gap-2.5">
        {reassurance.map((r) => (
          <li key={r} className="flex gap-3 text-[15px] text-[var(--ink-faint)] sm:text-[16px]">
            <span aria-hidden="true" className="num" style={{ color: "var(--positive)" }}>
              ✓
            </span>
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Счётчики страницы. Отдельным компонентом, чтобы сама страница осталась серверной. */
export function PredframingAnalytics({ hypothesis }: { hypothesis: HypothesisId }) {
  usePredframingAnalytics(hypothesis);
  return null;
}
