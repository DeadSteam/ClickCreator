"use client";

import { useEffect, useState, type ReactNode } from "react";

import type { DiagnosticEvent } from "@/diagnostic/analytics";
import { TELEGRAM } from "@/landing/config";
import { attributionBotLink, ensureAttribution, stackTrack } from "@/stack/attribution";
import { resolveHeroVariant } from "@/stack/hero-variants";

/*
  Главное действие /stack — «Получить 3000 тестовых кликов» (разд. 4/17 ТЗ).
  Ведёт в Telegram-бота, как и `TrialCta` на остальном сайте: 3000 тестовых
  кликов выдаются тем же способом (подписка на канал), Telegram-flow этой
  страницы отдельно ⚠ не подтверждён (разд. 8/31 ТЗ) — до подтверждения
  используется тот же бот, что и у остальной воронки.

  Разд. 27 ТЗ называет только два клика по CTA: `hero_cta_click` (Hero,
  формулировка меняется по angle) и `free_clicks_cta_click` (все остальные
  шесть точек CTA-архитектуры из разд. 17 — Product Bridge, Controlled Test,
  Parallel Use, Кейсы, Калькулятор, Финал). Поэтому у компонента одно и то же
  событие по умолчанию, а Hero передаёт `event="hero_cta_click"` явно.

  ССЫЛКА СЧИТАЕТСЯ В ДВА ШАГА, а не читается из `localStorage` прямо в JSX.
  На SSR атрибуции нет вовсе; на клиенте у вернувшегося посетителя она уже
  лежит в `localStorage` до первого рендера — тогда серверный и клиентский
  markup разошлись бы на первом же кадре, и React пометил бы это как
  hydration mismatch (что и происходило до этой правки). Поэтому первый рендер
  — что на сервере, что на клиенте до монтирования — всегда один и тот же
  нейтральный `start=stack_{ctaId}` без сессии; реальная, сессия-осознанная
  ссылка подставляется `useEffect`-ом уже после монтирования, где расхождение
  с сервером не отслеживается.
*/
function neutralHref(ctaId: string): string {
  return `${TELEGRAM.bot}?start=stack_${ctaId}`;
}

export function StackCta({
  ctaId,
  children,
  event = "free_clicks_cta_click",
  size = "lg",
  above,
  className = "",
}: {
  /** Разд. 24.13 ТЗ: каждый CTA обязан нести свой `cta_id` (hero, product_bridge, controlled_test, cases, calculator, final...). */
  ctaId: string;
  children: ReactNode;
  event?: DiagnosticEvent;
  size?: "sm" | "md" | "lg";
  /** Короткая подпись над кнопкой — как у `TrialCta`. */
  above?: string;
  className?: string;
}) {
  const [href, setHref] = useState(() => neutralHref(ctaId));
  /** Вариант, реально показанный на этой загрузке — см. комментарий в `stack/analytics.tsx` о том, почему это не то же самое, что замороженный на first touch `attribution.landingVariant`. */
  const [currentVariant, setCurrentVariant] = useState<string | null>(null);

  useEffect(() => {
    const angle = new URLSearchParams(window.location.search).get("angle");
    const variant = resolveHeroVariant(angle).angle;
    ensureAttribution(variant);
    setCurrentVariant(variant);
    setHref(attributionBotLink(ctaId));
  }, [ctaId]);

  const link = (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      data-cta-marker=""
      aria-label={above ? `${above} в Telegram` : undefined}
      onClick={() => {
        const extra = currentVariant ? { landing_variant: currentVariant } : {};
        stackTrack(event, ctaId, extra);
        stackTrack("telegram_open", ctaId, extra);
      }}
      className={`btn btn-primary btn-${size} btn-arrow ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="btn-arrow num text-[0.85em] leading-none">
        →
      </span>
    </a>
  );

  if (!above) return link;

  return (
    <div className="flex flex-col items-start gap-2.5">
      <span className="flex items-center gap-2.5 text-[15px] leading-snug font-semibold tracking-[-0.01em] text-[var(--ink)]">
        <span aria-hidden="true" className="h-px w-5 bg-[var(--accent)]" />
        {above}
      </span>
      {link}
    </div>
  );
}
