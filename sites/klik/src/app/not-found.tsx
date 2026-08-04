import { SITE } from "@/lib/site";

/*
  404 оформлена, а не отдана фреймворку: посетитель, упавший на дефолтный
  экран Next.js, видит не сайт, а стройку.

  Кнопки здесь свои, а не общий Cta: тот шлёт событие в аналитику, и переход
  с ошибочного адреса засчитывался бы как клик по призыву со страницы.
*/
export default function NotFound() {
  return (
    <main className="glow flex min-h-dvh items-center px-6 py-24 sm:px-10">
      <div className="mx-auto w-full max-w-[46rem]">
        <p className="num text-[19px] text-[var(--color-text-muted)]">404</p>

        <h1 className="mt-8 max-w-[16ch]">Такой страницы здесь нет</h1>

        <p className="mt-8 max-w-[48ch] text-[19px] leading-relaxed text-[var(--color-text-muted)]">
          Адрес набран с ошибкой либо раздел убран. Счётчик стоит на главной,
          посчитать цену можно без регистрации.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/"
            className="inline-flex min-h-[52px] items-center justify-center rounded-[var(--radius-control)]
              bg-[var(--color-text)] px-8 text-[17px] font-medium text-[var(--color-ink)]
              [transition:background-color_var(--t-fast)_var(--ease-soft)]
              hover:bg-[var(--color-text-muted)]"
          >
            К счётчику
          </a>
          <a
            href={SITE.telegram}
            rel="noopener"
            className="inline-flex min-h-[52px] items-center justify-center rounded-[var(--radius-control)]
              border border-[var(--color-line)] px-8 text-[17px] font-medium
              [transition:background-color_var(--t-fast)_var(--ease-soft)]
              hover:bg-[var(--color-surface)]"
          >
            Написать в Telegram
          </a>
        </div>
      </div>
    </main>
  );
}
