import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/*
  Универсальная часть предфрейминговой системы: доказательства, механизм
  проверки, кейсы, роль продукта, FAQ и финальный CTA. По ТЗ она одна на все
  десять гипотез, и её содержание приходит отдельным документом.

  Пока это заглушка, а не страница. Маршрут существует с самого начала, потому
  что на него уже ведут кнопки предфрейминговых страниц: адрес зафиксирован в
  `UNIVERSAL_ROUTE`, и заменить заглушку содержимым можно будет, не трогая ни
  одну из десяти версий.

  Индексация закрыта: пустой раздел в выдаче — потерянный сигнал качества для
  всего домена.
*/

export const metadata: Metadata = {
  title: "Как проверить рабочую гипотезу",
  description:
    "Универсальная часть разбора: методика объективной проверки инструмента на собственных данных.",
  alternates: { canonical: "/universal" },
  robots: { index: false, follow: true },
};

export default function UniversalPage() {
  return (
    <div className="zone-doubt flex min-h-dvh flex-col bg-[var(--reading-bg)]">
      <header className="mx-auto flex h-[68px] w-full max-w-[76rem] items-center justify-between px-5 sm:px-8">
        <Logo />
        <ThemeToggle />
      </header>

      <main
        id="main"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-[68ch] grow flex-col justify-center px-5 py-24 sm:px-8"
      >
        <p className="label text-[var(--ink-faint)]">следующая часть разбора</p>

        <h1 className="mt-7 max-w-[16ch] text-[30px] leading-[1.08] font-extrabold tracking-[-0.035em] sm:text-[42px]">
          Методика проверки готовится
        </h1>

        <p className="mt-8 max-w-[54ch] text-[19px] leading-[1.55] text-[var(--ink-soft)] sm:text-[21px]">
          Здесь будет то, о чём шла речь: как построить объективную проверку,
          какие данные имеют значение, почему сравнивать нужно рабочие
          результаты, а не списки функций, и какое место в этой системе занимает
          сервис.
        </p>

        <p className="mt-10 text-[17px] leading-[1.65] text-[var(--ink-faint)] sm:text-[18px]">
          <Link
            href="/loss"
            className="underline decoration-[var(--rule)] underline-offset-4
              [transition:color_var(--t-hover)_var(--ease-micro)] hover:text-[var(--ink)]"
          >
            Вернуться к разбору
          </Link>
        </p>
      </main>
    </div>
  );
}
