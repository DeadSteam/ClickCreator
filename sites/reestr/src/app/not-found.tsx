import { SITE } from "@/lib/site";

/*
  404 оформлена, а не отдана фреймворку: посетитель, упавший на дефолтный
  экран Next.js, ломает легенду издания в один щелчок.

  Кнопки здесь свои, а не общий Cta: тот шлёт событие в аналитику, и переход
  с ошибочного адреса засчитывался бы как клик по призыву со страницы.
*/
export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center px-6 py-24 sm:px-10">
      <div className="mx-auto w-full max-w-[46rem]">
        <p className="num text-[19px] text-[var(--color-stamp)]">404</p>

        <h1 className="mt-8 max-w-[16ch]">Такой записи в реестре нет</h1>

        <p className="mt-8 max-w-[48ch] text-[21px] leading-relaxed text-[var(--color-ink-soft)]">
          Адрес набран с ошибкой либо запись изъята из выпуска. Открытые записи
          собраны на главной.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/"
            className="inline-flex min-h-[54px] items-center justify-center bg-[var(--color-ink)]
              px-8 text-[18px] font-semibold text-[var(--color-paper)]
              [transition:background-color_var(--t-fast)_var(--ease-page)]
              hover:bg-[var(--color-stamp)]"
          >
            К реестру
          </a>
          <a
            href={SITE.telegram}
            rel="noopener"
            className="inline-flex min-h-[54px] items-center justify-center border
              border-[var(--color-rule)] px-8 text-[18px] font-semibold
              [transition:border-color_var(--t-fast)_var(--ease-page)]
              hover:border-[var(--color-ink)]"
          >
            Написать в Telegram
          </a>
        </div>
      </div>
    </main>
  );
}
