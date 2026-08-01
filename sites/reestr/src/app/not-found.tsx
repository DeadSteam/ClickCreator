import { SITE } from "@/lib/site";
import { Mark } from "@/components/logo";

/*
  404 оформлена, а не отдана фреймворку. Страница-реестр, роняющая посетителя
  на дефолтный чёрный экран Next.js, ломает собственную легенду в один щелчок.
*/
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[46rem] flex-col justify-center px-5 py-20 sm:px-8">
      <span className="flex items-center gap-2.5 text-[var(--color-ink-faint)]">
        <Mark className="h-5 w-5" />
        <span className="field">{SITE.domain}</span>
      </span>

      <p className="num mt-10 text-[64px] leading-none font-medium text-[var(--color-stamp)] sm:text-[88px]">
        404
      </p>

      <h1 className="mt-6 max-w-[20ch] text-[30px] sm:text-[40px]">
        Такой записи в реестре нет
      </h1>

      <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-[var(--color-ink-soft)]">
        Страница не найдена: адрес набран с ошибкой либо запись была изъята из
        выпуска. Открытые записи собраны на главной.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <a
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center bg-[var(--color-ink)]
            px-6 py-3 text-[15px] font-semibold text-[var(--color-paper)]
            [transition:background-color_var(--t-hover)_var(--ease-micro)]
            hover:bg-[var(--color-stamp)]"
        >
          К реестру
        </a>
        <a
          href={SITE.telegram}
          rel="noopener"
          className="inline-flex min-h-[44px] items-center justify-center border
            border-[var(--color-rule)] px-6 py-3 text-[15px] font-semibold
            [transition:border-color_var(--t-hover)_var(--ease-micro)]
            hover:border-[var(--color-ink)]"
        >
          Написать в Telegram
        </a>
      </div>
    </main>
  );
}
