type HeroMotifProps = {
  angle: string;
  className?: string;
};

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Графический мотив Hero-панели (разд. 19 ТЗ «VISUAL MESSAGE MATCH»).
 *
 * Для 7 angle ТЗ (разд. 9/19) описывает не только текст-подпись, но и форму
 * мотива — flat line, развилка, цепочка узлов, пара инструментов, primary/
 * reserve. Здесь эти формы нарисованы буквально, без добавления смысла,
 * которого нет в тексте самого accent (разд. 9 ТЗ).
 *
 * У остальных angle отдельного мотива в ТЗ нет — тогда рисуется базовая
 * метафора блока (разд. «HERO VISUAL» ТЗ): специалист → несколько
 * инструментов → измеримая задача → данные, приглушённым цветом.
 */
export function HeroMotif({ angle, className = "" }: HeroMotifProps) {
  const accent = {
    ...STROKE,
    viewBox: "0 0 120 40",
    className: `h-16 w-auto text-[var(--amb)] ${className}`,
    "aria-hidden": true,
  };

  switch (angle) {
    case "second_move":
      // ПФ #1 → ? → ПФ #2 — разд. 9 ТЗ, без изображения победителя.
      return (
        <svg {...accent}>
          <rect x="4" y="10" width="28" height="20" rx="4" />
          <rect x="88" y="10" width="28" height="20" rx="4" />
          <path d="M32 20 L50 20 M70 20 L88 20" />
          <text x="60" y="25" textAnchor="middle" fontSize="15" fill="currentColor" stroke="none">
            ?
          </text>
        </svg>
      );

    case "one_tool_dependency":
      // 1 инструмент = 1 путь, против 2 инструмента = развилка (иллюстративный тезис, не формула — разд. 9 ТЗ).
      return (
        <svg {...accent}>
          <circle cx="8" cy="20" r="3" fill="currentColor" stroke="none" />
          <path d="M12 20 L36 20" />
          <circle cx="40" cy="20" r="3" fill="currentColor" stroke="none" />
          <circle cx="76" cy="20" r="3" fill="currentColor" stroke="none" />
          <path d="M80 20 L100 8 M80 20 L100 32" />
          <circle cx="104" cy="8" r="3" fill="currentColor" stroke="none" />
          <circle cx="104" cy="32" r="3" fill="currentColor" stroke="none" />
        </svg>
      );

    case "position_stuck":
      // Клики растут, позиция выходит на плато — «небольшой flat line», разд. 19 ТЗ.
      return (
        <svg {...accent}>
          <path d="M6 32 L34 32 L52 14 L114 14" />
          <circle cx="114" cy="14" r="3" fill="currentColor" stroke="none" />
        </svg>
      );

    case "query_or_tool":
      // Развилка «запрос / инструмент» — разд. 19 ТЗ.
      return (
        <svg {...accent}>
          <path d="M6 20 L48 20" />
          <path d="M48 20 L112 6" />
          <path d="M48 20 L112 34" />
          <circle cx="48" cy="20" r="3" fill="currentColor" stroke="none" />
        </svg>
      );

    case "prove_it":
      // Baseline → Test → ? — разд. 19 ТЗ.
      return (
        <svg {...accent}>
          <path d="M20 20 L52 20 M68 20 L92 20" />
          <circle cx="14" cy="20" r="7" fill="currentColor" stroke="none" />
          <circle cx="60" cy="20" r="7" fill="currentColor" stroke="none" />
          <circle cx="104" cy="20" r="7" strokeDasharray="3 3" />
          <text x="104" y="24" textAnchor="middle" fontSize="10" fill="currentColor" stroke="none">
            ?
          </text>
        </svg>
      );

    case "second_tool":
      // Инструмент A + Инструмент B — разд. 19 ТЗ.
      return (
        <svg {...accent}>
          <rect x="4" y="8" width="34" height="24" rx="4" />
          <rect x="82" y="8" width="34" height="24" rx="4" />
          <path d="M54 20 L66 20 M60 14 L60 26" />
        </svg>
      );

    case "backup_tool":
      // Primary / Reserve — разд. 19 ТЗ: сплошной активный ряд и пунктирный резервный.
      return (
        <svg {...accent}>
          <rect x="4" y="6" width="90" height="11" rx="3" fill="currentColor" stroke="none" />
          <rect x="4" y="23" width="90" height="11" rx="3" strokeDasharray="3 3" />
        </svg>
      );

    default: {
      // Базовая метафора блока (разд. HERO VISUAL ТЗ): специалист → инструменты → задача → данные.
      const base = {
        ...STROKE,
        viewBox: "0 0 140 32",
        className: `h-12 w-auto text-[var(--t-2)] ${className}`,
        "aria-hidden": true,
      };
      return (
        <svg {...base}>
          <circle cx="8" cy="16" r="4" fill="currentColor" stroke="none" />
          <path d="M16 16 L34 16" />
          <rect x="36" y="10" width="10" height="10" rx="2" />
          <rect x="44" y="14" width="10" height="10" rx="2" />
          <path d="M62 16 L80 16" />
          <circle cx="88" cy="16" r="6" />
          <circle cx="88" cy="16" r="2" fill="currentColor" stroke="none" />
          <path d="M96 16 L112 16" />
          <path d="M118 24 L118 12 M124 24 L124 8 M130 24 L130 16" />
        </svg>
      );
    }
  }
}
