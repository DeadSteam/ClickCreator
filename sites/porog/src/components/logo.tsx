/*
  Знак: порог в разрезе. Линия идёт ровно, поднимается на ступень и идёт
  дальше - ровно то, что делает позиция сайта, и ровно то, через что не
  перешагнуть, если не дорос.

  Рисуется кодом: двадцать байт геометрии не стоят отдельного запроса, а
  currentColor красит знак под тёмную шапку и светлый подвал без второго файла.
*/
export function Mark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      focusable="false"
    >
      {/* Профиль порога. Углы прямые, без скруглений: это разрез, а не иконка. */}
      <path d="M2 17h7v-5h6V7h7" strokeLinecap="square" strokeLinejoin="miter" />
      {/* Отметка уровня под нижней полкой. */}
      <path d="M2 21h20" strokeLinecap="square" opacity="0.35" />
    </svg>
  );
}

export function Wordmark({ revision }: { revision: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <Mark className="h-[22px] w-[22px]" />
      <span className="flex items-baseline gap-2">
        {/* Набрано шрифтом, а не картинкой: остаётся резким и читается роботами. */}
        <span className="text-[19px] leading-none font-bold tracking-[-0.03em]">
          Порог
        </span>
        <span className="mark">ту {revision}</span>
      </span>
    </span>
  );
}
