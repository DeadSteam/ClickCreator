"use client";

import { Faq } from "@/components/landing/faq";
import { stackTrack } from "@/stack/attribution";

/*
  Обёртка над общим `Faq` (используется несколькими страницами). `faq_open`
  обязан нести сквозную атрибуцию /stack — angle/session_id/landing_variant/
  cta_id (разд. 27 ТЗ «ЦА ПФ-щики»), которую общий компонент не знает и
  знать не должен: остальные страницы используют его без /stack-атрибуции.
  Клиентская обёртка нужна потому, что `StackPage` — серверный компонент, а
  функцию-колбэк через границу сервер/клиент передать нельзя.
*/
export function StackFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Faq
      items={items}
      plain
      onOpen={(question) => stackTrack("faq_open", "faq", { question })}
    />
  );
}
