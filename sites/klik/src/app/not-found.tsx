import { SITE } from "@/lib/site";
import { Mark } from "@/components/logo";

/*
  404 оформлена, а не отдана фреймворку. Прибор, роняющий посетителя на
  дефолтный экран Next.js, перестаёт быть прибором ровно в этот момент.
*/
export default function NotFound() {
  return (
    <main className="screen mx-auto flex min-h-dvh max-w-[46rem] flex-col justify-center px-5 py-20 sm:px-8">
      <span className="flex items-center gap-2.5 text-[var(--color-read-faint)]">
        <Mark className="h-5 w-5" />
        <span className="tag">{SITE.domain}</span>
      </span>

      <p className="read mt-10 text-[72px] font-medium sm:text-[96px]">404</p>

      <h1 className="mt-6 max-w-[20ch] text-[30px] sm:text-[40px]">
        Шкала здесь заканчивается
      </h1>

      <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-[var(--color-read-soft)]">
        Страница не найдена: адрес набран с ошибкой либо раздел убран. Счётчик
        стоит на главной, считать можно без регистрации.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <a
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center bg-[var(--color-read)]
            px-6 py-3 text-[15px] font-medium text-[var(--color-case)]
            [transition:background-color_var(--t-hover)_var(--ease-micro)]
            hover:bg-[var(--color-read-soft)]"
        >
          К счётчику
        </a>
        <a
          href={SITE.telegram}
          rel="noopener"
          className="inline-flex min-h-[44px] items-center justify-center border
            border-[var(--color-rule)] px-6 py-3 text-[15px] font-medium
            [transition:border-color_var(--t-hover)_var(--ease-micro)]
            hover:border-[var(--color-read)]"
        >
          Написать в Telegram
        </a>
      </div>
    </main>
  );
}
