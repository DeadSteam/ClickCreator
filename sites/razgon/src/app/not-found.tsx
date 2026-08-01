import { SITE } from "@/lib/site";

/*
  404 оформлена, а не отдана фреймворку. Сайт про расписание, роняющий
  посетителя на дефолтный экран Next.js, ломает собственную легенду за один
  щелчок.
*/
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[52rem] flex-col justify-center px-5 py-20 sm:px-8">
      <span className="plate">{SITE.domain}</span>

      <p className="day mt-8 text-[110px] text-[var(--color-blaze)] sm:text-[150px]">
        404
      </p>

      <h1 className="mt-6 max-w-[14ch] text-[42px] sm:text-[64px]">
        Таких суток в расписании нет
      </h1>

      <p className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-[var(--color-mark-soft)]">
        Страница не найдена: либо в адресе опечатка, либо раздел убран. Полное
        расписание от нулевых до двадцать первых суток лежит на главной.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href="/"
          className="inline-flex min-h-[48px] items-center justify-center bg-[var(--color-blaze)]
            px-7 py-3 font-[family-name:var(--font-tight)] text-[18px] font-extrabold
            uppercase text-[var(--color-field)]
            [transition:background-color_var(--t-hover)_var(--ease-micro)]
            hover:bg-[var(--color-mark)]"
        >
          К расписанию
        </a>
        <a
          href={SITE.telegram}
          rel="noopener"
          className="inline-flex min-h-[48px] items-center justify-center border-2
            border-[var(--color-mark)] px-7 py-3 font-[family-name:var(--font-tight)]
            text-[18px] font-extrabold uppercase
            [transition:background-color_var(--t-hover)_var(--ease-micro)]
            hover:bg-[var(--color-field-edge)]"
        >
          Написать в Telegram
        </a>
      </div>
    </main>
  );
}
