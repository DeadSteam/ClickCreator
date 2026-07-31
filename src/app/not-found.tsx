import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { Cta } from "@/components/cta";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

/*
  A designed dead end rather than the framework default. The joke writes itself
  for a ranking service, so the copy takes the position language seriously
  instead of reaching for a 404 pun.
*/
export default function NotFound() {
  return (
    <div className="zone-burn flex min-h-dvh flex-col bg-[oklch(0.155_0.038_32)] px-5 py-8 sm:px-8">
      <header>
        <Link href="/" aria-label="TopInjector, на главную">
          <Logo />
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-[76rem] flex-1 flex-col justify-center py-16">
        <span className="num text-[76px] leading-[0.85] font-semibold text-[var(--hot)] sm:text-[120px]">
          404
        </span>

        <h1 className="mt-8 max-w-[16ch] text-[32px] sm:text-[48px]">
          Такой страницы в выдаче нет
        </h1>

        <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
          Ссылка ведёт в никуда: адрес изменился или в нём опечатка. Позиции ваших
          страниц это никак не затрагивает.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Cta href="/">На главную</Cta>
          <Link
            href="/pro"
            className="rounded-[var(--radius-pill)] border border-[var(--rule)] px-6 py-3.5
              text-center text-[15px] font-semibold text-[var(--ink)]
              [transition:border-color_var(--t-hover)_var(--ease-micro)]
              hover:border-[var(--ink)]"
          >
            Раздел для агентств
          </Link>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-[76rem] border-t border-[var(--rule-soft)] pt-6">
        <span className="num text-[11px] text-[var(--ink-faint)]">TOPINJECTOR 2026</span>
      </footer>
    </div>
  );
}
