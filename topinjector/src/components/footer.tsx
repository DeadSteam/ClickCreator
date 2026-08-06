import Link from "next/link";
import { Logo } from "./logo";
import { BRAND, DEMO_DISCLAIMER } from "@/brand/brand";

/*
  Подвал принимает список соседних разделов, а не один переход.

  Разделов у сайта три — бизнес, агентства и частные SEO-специалисты, — и с
  одной кросс-ссылкой лендинг ветки специалистов оставался недостижимым:
  попасть на него можно было только из рекламы через диагностику и статью.
  Мастер-документ запрещает смешивать сегменты в основной коммуникации, но
  строка в подвале — это навигация, а не смешивание.
*/
export function Footer({
  links,
  cross,
}: {
  links: { label: string; href: string }[];
  cross: { label: string; href: string }[];
}) {
  return (
    <footer className="zone-settled px-5 pt-16 pb-28 sm:px-8 xl:pb-16">
      <div className="mx-auto max-w-[76rem]">
        <div className="grid gap-10 border-t border-[var(--rule-soft)] pt-10 sm:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-[13px] leading-relaxed text-[var(--ink-soft)]">
              Сервис раннего результата по целевым запросам в Яндексе.{" "}
              {BRAND.role}
            </p>
          </div>

          <nav className="flex flex-col gap-4">
            <span className="label text-[var(--ink-faint)]">сервис</span>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="-my-1 py-1 text-[13px] text-[var(--ink-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
              >
                {l.label}
              </Link>
            ))}
            {cross.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="-my-1 py-1 text-[13px] text-[var(--ink-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
              >
                {c.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="label text-[var(--ink-faint)]">связь</span>
            <a
              href="https://t.me/topinjector"
              className="-my-1 py-1 text-[13px] text-[var(--ink-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
            >
              Telegram
            </a>
            <a
              href="mailto:hi@topinjector.ru"
              className="-my-1 py-1 text-[13px] text-[var(--ink-soft)] [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
            >
              hi@topinjector.ru
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--rule-soft)] pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <span className="num text-[11px] text-[var(--ink-faint)]">TOPINJECTOR 2026</span>
          <span className="max-w-lg text-[11px] leading-relaxed text-[var(--ink-faint)]">
            {DEMO_DISCLAIMER}
          </span>
        </div>
      </div>
    </footer>
  );
}
