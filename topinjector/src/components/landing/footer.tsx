import Link from "next/link";

import { Logo } from "@/components/logo";
import { BRAND } from "@/brand/brand";
import { DISCLAIMER, PENDING } from "@/landing/config";

/*
  Футер лендинга по п.21 ТЗ: четыре колонки и юридическая строка.

  Здесь только те адреса, за которыми стоит настоящая страница. «О сервисе» и
  «Обновления» из списка ТЗ убраны до появления содержимого: ссылка в подвале,
  ведущая в 404, обесценивает и остальные — читатель перестаёт им доверять
  ровно в том месте, где сайт обещает прозрачность.
*/

const COLUMNS = [
  {
    title: "Продукт",
    links: [
      { label: "Возможности", href: "#product" },
      { label: "Тарифы", href: "#pricing" },
      { label: "Кейсы", href: "#cases" },
      { label: "База знаний", href: "/docs" },
      { label: "Ограничения и риски", href: "/limits" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "Контакты", href: "mailto:hi@topinjector.ru" },
      { label: "Для бизнеса", href: "/" },
      { label: "Партнёрам и агентствам", href: "/pro" },
      { label: "Поддержка", href: "https://t.me/topinjector" },
    ],
  },
  {
    title: "Документы",
    links: [
      { label: "Пользовательское соглашение", href: "/terms" },
      { label: "Политика конфиденциальности", href: "/privacy" },
      { label: "Условия тестового периода", href: "/trial-terms" },
      { label: "Ограничения и риски", href: "/limits" },
    ],
  },
];

export function LandingFooter({ signupUrl }: { signupUrl: string }) {
  return (
    <footer className="zone-settled px-5 pt-16 pb-28 sm:px-8 lg:pb-16">
      <div className="mx-auto max-w-[76rem]">
        <div className="grid gap-10 border-t border-[var(--rule-soft)] pt-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-[13px] leading-relaxed text-[var(--ink-soft)]">
              Сервис раннего результата по целевым запросам в Яндексе.{" "}
              {BRAND.role}
            </p>
          </div>

          {COLUMNS.map((c) => (
            <nav key={c.title} className="flex flex-col gap-4">
              <span className="label text-[var(--ink-faint)]">{c.title}</span>
              {c.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="-my-1 py-1 text-[13px] leading-snug text-[var(--ink-soft)]
                    [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--rule-soft)] pt-6">
          <span className="label text-[var(--ink-faint)]">пользователь</span>
          <a
            href={`${signupUrl}?mode=login`}
            className="text-[13px] text-[var(--ink-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
          >
            Войти
          </a>
          <a
            href={signupUrl}
            className="text-[13px] text-[var(--ink-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
          >
            Создать аккаунт
          </a>
          <Link
            href="/docs"
            className="text-[13px] text-[var(--ink-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
          >
            База знаний
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--rule-soft)] pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          {/*
            Реквизиты юридического лица — часть критериев готовности (п.28).
            Заглушка стоит на видном месте, чтобы её нельзя было не заметить
            перед публикацией.
          */}
          <span className="num text-[11px] text-[var(--ink-faint)]">
            TOPINJECTOR 2026 · ООО «___», ИНН ___ · hi@topinjector.ru
          </span>
          {PENDING && (
            <span className="max-w-lg text-[11px] leading-relaxed text-[var(--ink-faint)]">
              {DISCLAIMER}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
