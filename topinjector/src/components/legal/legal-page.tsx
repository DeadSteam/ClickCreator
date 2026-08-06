import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "@/components/logo";

/*
  Оболочка юридических страниц. Одна на все документы: у них общий каркас, и
  разъезжающиеся друг с другом «Условия» и «Политика» читаются как собранные из
  разных источников — ровно то впечатление, которого документы должны избегать.

  Страницы стоят на графите: они не часть продающей дуги, и температурный фон
  под юридическим текстом выглядел бы неуместно.
*/
export function LegalPage({
  title,
  updated,
  intro,
  children,
  pending = true,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: ReactNode;
  pending?: boolean;
}) {
  return (
    <div className="zone-settled min-h-dvh px-5 py-8 sm:px-8">
      <header className="mx-auto max-w-[47rem]">
        <Link href="/service" aria-label="TopInjector, на страницу сервиса">
          <Logo />
        </Link>
      </header>

      <main id="main" tabIndex={-1} className="mx-auto max-w-[47rem] pt-16 pb-24 sm:pt-24">
        <h1 className="max-w-[22ch] text-[30px] leading-[1.08] font-extrabold tracking-[-0.035em] sm:text-[42px]">
          {title}
        </h1>

        <p className="label mt-6 text-[var(--ink-faint)]">
          редакция от {updated}
        </p>

        {pending && (
          /*
            Пометка обязательна, пока документ не прошёл юридическую проверку.
            Публиковать оферту или политику обработки данных «как есть» нельзя, и
            видимая плашка не даёт забыть об этом при выкладке.
          */
          <p className="mt-8 border-l-2 border-[var(--accent)] py-2 pl-5 text-[14px] leading-relaxed text-[var(--ink-soft)]">
            Документ подготовлен как рабочий каркас и требует юридической
            проверки до публикации. Разделы, отмеченные квадратными скобками,
            заполняются фактическими данными.
          </p>
        )}

        {intro && (
          <p className="mt-10 text-[17px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
            {intro}
          </p>
        )}

        <div className="mt-12 flex flex-col gap-10">{children}</div>

        <nav className="mt-20 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--rule-soft)] pt-8">
          {[
            { label: "Пользовательское соглашение", href: "/terms" },
            { label: "Политика конфиденциальности", href: "/privacy" },
            { label: "Условия тестового периода", href: "/trial-terms" },
            { label: "Ограничения и риски", href: "/limits" },
            { label: "База знаний", href: "/docs" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-[var(--ink-soft)]
                [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="num mt-8 text-[11px] text-[var(--ink-faint)]">
          TOPINJECTOR 2026 · ООО «___», ИНН ___ · hi@topinjector.ru
        </p>
      </main>
    </div>
  );
}

export function Clause({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-[20px] font-semibold tracking-[-0.02em] sm:text-[23px]">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </section>
  );
}

export function Para({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[68ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
      {children}
    </p>
  );
}

export function Items({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="flex max-w-[68ch] gap-3 text-[16px] leading-relaxed text-[var(--ink-soft)]"
        >
          <span aria-hidden="true" className="num shrink-0 text-[var(--ink-faint)]">
            —
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}
