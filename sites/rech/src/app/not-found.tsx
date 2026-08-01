import { SITE } from "@/lib/site";

/*
  404 оформлена, а не отдана фреймворку. Письмо от конкретного человека,
  роняющее посетителя на дефолтный экран Next.js, в этот момент перестаёт быть
  письмом от конкретного человека.
*/
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[46rem] flex-col justify-center px-5 py-20 sm:px-8">
      <p className="cap">{SITE.domain}</p>

      <h1 className="mt-8 max-w-[18ch] text-[34px] sm:text-[46px]">
        Такой страницы у меня нет
      </h1>

      <p className="mt-6 max-w-[52ch] text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
        Либо в адресе опечатка, либо я убрал этот раздел и забыл поставить
        переадресацию. Второе - моя вина, напишите, поправлю. Само письмо
        целиком лежит на главной.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a
          href="/"
          className="inline-flex min-h-[46px] items-center justify-center bg-[var(--color-ink)]
            px-7 py-3 text-[16px] text-[var(--color-leaf)]
            [transition:background-color_var(--t-hover)_var(--ease-micro)]
            hover:bg-[var(--color-ochre)]"
        >
          К началу письма
        </a>
        <a
          href={SITE.telegram}
          rel="noopener"
          className="inline-flex min-h-[46px] items-center justify-center border
            border-[var(--color-ochre)] px-7 py-3 text-[16px]
            [transition:background-color_var(--t-hover)_var(--ease-micro)]
            hover:bg-[var(--color-leaf-edge)]"
        >
          Написать мне
        </a>
      </div>
    </main>
  );
}
