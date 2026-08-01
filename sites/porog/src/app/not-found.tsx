import { SITE } from "@/lib/site";
import { Mark } from "@/components/logo";

/*
  404 оформлена, а не отдана фреймворку. Сайт, целиком построенный на строгом
  документе, роняющий посетителя на дефолтный чёрный экран Next.js, ломает
  собственную легенду одним щелчком.
*/
export default function NotFound() {
  return (
    <main className="grid-paper mx-auto flex min-h-dvh max-w-[46rem] flex-col justify-center px-5 py-20 sm:px-8">
      <span className="flex items-center gap-2.5 text-[var(--color-graphite-faint)]">
        <Mark className="h-5 w-5" />
        <span className="mark">{SITE.domain}</span>
      </span>

      <div aria-hidden className="hazard mt-10 h-1.5 w-24" />

      <p className="num mt-6 text-[64px] leading-none font-medium sm:text-[88px]">
        404
      </p>

      <h1 className="mt-6 max-w-[20ch] text-[30px] sm:text-[40px]">
        Такого пункта в условиях нет
      </h1>

      <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-[var(--color-graphite-soft)]">
        Страница не найдена: адрес набран с ошибкой либо раздел выведен из
        редакции {SITE.revision}. Действующие условия целиком собраны на главной.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <a
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center bg-[var(--color-graphite)]
            px-6 py-3 text-[15px] font-medium text-[var(--color-sheet)]
            [transition:background-color_var(--t-hover)_var(--ease-micro)]
            hover:bg-[oklch(0.32_0.008_255)]"
        >
          К техническим условиям
        </a>
        <a
          href={SITE.telegram}
          rel="noopener"
          className="inline-flex min-h-[44px] items-center justify-center border
            border-[var(--color-rule)] px-6 py-3 text-[15px] font-medium
            [transition:border-color_var(--t-hover)_var(--ease-micro)]
            hover:border-[var(--color-graphite)]"
        >
          Написать в Telegram
        </a>
      </div>
    </main>
  );
}
