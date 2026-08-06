"use client";

import type { ReactNode } from "react";

import { track, type DiagnosticEvent } from "@/diagnostic/analytics";
import { SIGNUP_URL } from "./chrome";

/*
  Кнопка регистрации. Открывается в новой вкладке, как требует ТЗ: пользователь
  не должен терять лендинг, если решит вернуться и дочитать.

  Событие приходит вместе с местом клика — иначе четыре кнопки на странице
  сливаются в одну цифру, и непонятно, какой блок довёл до регистрации.
*/
export function TrialCta({
  children,
  event,
  place,
}: {
  children: ReactNode;
  event: DiagnosticEvent;
  place: string;
}) {
  return (
    <a
      href={SIGNUP_URL}
      target="_blank"
      rel="noopener"
      onClick={() => {
        track(event, { place });
        track("signup_start", { place });
      }}
      className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[var(--radius-pill)]
        bg-[var(--btn-bg)] px-7 text-[16px] font-semibold text-[var(--btn-ink)]
        [transition:background-color_var(--t-hover)_var(--ease-micro),transform_var(--t-press)_var(--ease-out)]
        hover:bg-[var(--btn-bg-hover)] active:scale-[0.975]"
    >
      {children}
      <span aria-hidden="true" className="num text-[13px]">
        →
      </span>
    </a>
  );
}
