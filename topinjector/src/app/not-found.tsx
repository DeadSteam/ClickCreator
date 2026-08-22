import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

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
    <div className="stk flex min-h-dvh flex-col py-8">
      <header className="wrap">
        <Link href="/" aria-label="TopInjector, на главную">
          <Logo idPrefix="not-found" />
        </Link>
      </header>

      <main className="wrap flex flex-1 flex-col justify-center py-16">
        <span className="num text-[76px] leading-[0.85] font-semibold text-[var(--accent)] sm:text-[120px]">
          404
        </span>

        <h1 className="stk-h1 mt-8">Такой страницы в выдаче нет</h1>

        <p className="stk-p mt-6">
          Ссылка ведёт в никуда: адрес изменился или в нём опечатка. Позиции ваших
          страниц это никак не затрагивает.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" arrow>
            На главную
          </Button>
          <Button href="/pro" variant="secondary">
            Раздел для агентств
          </Button>
        </div>
      </main>

      <footer className="wrap border-t border-[var(--rule-soft)] pt-6">
        <span className="num text-[11px] text-[var(--ink-faint)]">TOPINJECTOR 2026</span>
      </footer>
    </div>
  );
}
