"use client";

import { Faq } from "@/components/landing/faq";
import { stackTrack } from "@/stack/attribution";

/*
  Обёртка над общим `Faq` (используется несколькими страницами). `faq_open`
  обязан нести сквозную атрибуцию /stack — angle/session_id/landing_variant/
  attribution_id (разд. 28 ТЗ «ЦА ПФ-щики»), которую общий компонент не знает
  и знать не должен: остальные страницы используют его без /stack-атрибуции.
  Клиентская обёртка нужна потому, что `StackPage` — серверный компонент, а
  функцию-колбэк через границу сервер/клиент передать нельзя.

  Блок передаётся полем `block`, а не `cta_id`: словарь `cta_id` в разд. 25.13
  закрыт точками CTA, и FAQ в него не входит.
*/
export function StackFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Faq
      items={items}
      plain
      onOpen={(question) => stackTrack("faq_open", undefined, { block: "faq", question })}
    />
  );
}
