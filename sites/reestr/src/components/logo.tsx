/*
  Знак реестра: столбец записей, одна из которых удостоверена.

  Рисуется кодом, а не картинкой. Файл пришлось бы грузить отдельным запросом
  ради двадцати байт геометрии, а инлайновый SVG красится currentColor и потому
  сам подстраивается под тёмную шапку и светлый подвал без второго ассета.
*/
export function Mark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      focusable="false"
    >
      {/* Корешок подшивки. */}
      <path d="M3.5 2.5v19" strokeLinecap="square" />
      {/* Строки реестра. Третья короче: запись ещё не закрыта. */}
      <path d="M7.5 6h13M7.5 10.5h13M7.5 15h8.5M7.5 19.5h13" strokeLinecap="square" />
      {/* Отметка сверки на незакрытой строке. */}
      <path d="M18 13.4l1.6 1.6 2.6-3" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function Wordmark({ issue }: { issue: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <Mark className="h-[22px] w-[22px]" />
      <span className="flex items-baseline gap-2">
        {/* Словесная часть набрана шрифтом, а не картинкой: остаётся резкой
            на любом экране и читается поисковиками как текст. */}
        <span className="text-[19px] leading-none font-semibold tracking-[-0.02em]">
          Реестр
        </span>
        <span className="field">вып. {issue}</span>
      </span>
    </span>
  );
}
