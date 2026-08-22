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

  Разд. 28 ТЗ называет только два клика по CTA: `hero_cta_click` (Hero,
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
  нейтральный `start=stack_{ctaId}` без идентификатора; реальная,
  attribution-осознанная ссылка подставляется `useEffect`-ом уже после
  монтирования, где расхождение с сервером не отслеживается.
*/
function neutralHref(ctaId: string): string {
  return `${TELEGRAM.bot}?start=stack_${ctaId}`;
}

export function StackCta({
  ctaId,
  children,
  event = "free_clicks_cta_click",
  size = "lg",
  marker = true,
  className = "",
}: {
  /** Разд. 24.13/25.13 ТЗ: каждый CTA обязан нести свой `cta_id` (hero, product_bridge, controlled_test, cases, calculator, final...). */
  ctaId: string;
  children: ReactNode;
  event?: DiagnosticEvent;
  size?: "sm" | "md" | "lg";
  /**
   * Метка `data-cta-marker` для липкой мобильной панели. Снимается у самой
   * панели и у кнопки в шапке: панель считает по этой метке, показалась ли
   * пользователю настоящая кнопка в потоке страницы, и считать саму себя
   * (или всегда доступную шапку) она не должна.
   */
  marker?: boolean;
  className?: string;
}) {
  const [href, setHref] = useState(() => neutralHref(ctaId));
  /** Вариант и аудитория, реально показанные на этой загрузке — см. комментарий в `stack/analytics.tsx` о том, почему это не то же самое, что замороженные на first touch значения. */
  const [current, setCurrent] = useState<Record<string, string>>({});

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const variant = resolveHeroVariant(p.get("angle")).angle;
    const audience = p.get("audience");

    ensureAttribution(variant);
    setCurrent(audience ? { landing_variant: variant, audience } : { landing_variant: variant });
    setHref(attributionBotLink(ctaId));
  }, [ctaId]);

  const link = (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      data-cta-marker={marker ? "" : undefined}
      onClick={() => {
        stackTrack(event, ctaId, current);
        stackTrack("telegram_open", ctaId, current);
      }}
      /*
        Без стрелки: она стояла на всех семи кнопках страницы одинаково,
        независимо от того, куда ведёт нажатие, — то есть была декорацией в
        единственном месте, где декорации быть не должно.
      */
      className={`btn btn-primary btn-${size} ${className}`}
    >
      <span>{children}</span>
    </a>
  );

  return link;
}
