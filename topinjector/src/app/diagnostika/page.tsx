import type { Metadata } from "next";

import { Diagnostic } from "@/components/diagnostic/diagnostic";

export const metadata: Metadata = {
  title: "Диагностика: индекс окна сомнения SEO-клиента",
  description:
    "За три минуты оцените, насколько рано клиент начинает сомневаться в вашей работе и когда он получает первое убедительное подтверждение вашей экспертности. 12 вопросов, без регистрации.",
  alternates: { canonical: "/diagnostika" },
};

/*
  Персонализация надзаголовка под креатив РСЯ (п.24 ТЗ). Ключ берётся из
  utm_content: страница должна продолжать тезис объявления, а не начинать
  разговор заново, иначе переход из рекламы читается как попадание не туда.

  Неизвестное значение молча падает на общий вариант — опечатка в разметке
  кампании не должна оставлять страницу без надзаголовка.
*/
const KICKERS: Record<string, string> = {
  churn: "Оцените риск потери клиента до результата",
  visibility: "Проверьте, насколько быстро клиент видит вашу ценность",
  window: "Рассчитайте индекс окна сомнения",
  messages: "Узнайте, почему вопрос «Когда будут результаты?» появляется так рано",
};

const DEFAULT_KICKER = "Диагностика для частных SEO-специалистов";

export default async function DiagnosticPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = params.utm_content ?? params.creative;
  const key = Array.isArray(raw) ? raw[0] : raw;

  return <Diagnostic kicker={key ? (KICKERS[key] ?? DEFAULT_KICKER) : DEFAULT_KICKER} />;
}
