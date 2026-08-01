/*
  Знак: риска на шкале. Три деления, среднее длиннее - отметка, на которой
  прибор стоит сейчас. Ровно то, чем занимается сайт: показывает, где вы
  находитесь по шкале цены.

  Рисуется кодом. Двадцать байт геометрии не стоят отдельного запроса, а
  currentColor красит знак под любой фон без второго файла.
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
      {/* Дорожка шкалы. */}
      <path d="M2 16h20" strokeLinecap="square" opacity="0.4" />
      {/* Деления. Среднее выше остальных: текущая отметка. */}
      <path d="M5 16v-4M12 16V4M19 16v-4" strokeLinecap="square" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <Mark className="h-[22px] w-[22px]" />
      {/* Набрано шрифтом, а не картинкой: остаётся резким и читается роботами. */}
      <span className="text-[19px] leading-none font-semibold tracking-[-0.04em]">
        Клик
      </span>
    </span>
  );
}
