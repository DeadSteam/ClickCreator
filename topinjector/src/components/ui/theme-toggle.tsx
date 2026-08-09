"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/*
  Выбор темы.

  Две позиции, а не одна переключающая кнопка: кнопка с одной иконкой всегда
  двусмысленна — непонятно, показывает она текущее состояние или то, куда
  переключит. Сегмент показывает оба варианта сразу и отмечает активный.

  Отметка ездит, а не перекрашивается. Переключатель — единственный элемент
  шапки, который меняет весь сайт, и мгновенная смена подсветки читалась как
  срабатывание фильтра. Клавиша, переехавшая под другую иконку, читается как
  переключённый тумблер: движение сообщает, что состояние именно переключили.

  Третьей позиции «системная» нет намеренно. Тема и так стартует от системной и
  следует за ней, пока выбор не сделан руками; ещё одна кнопка ради состояния,
  которое уже работает по умолчанию, только удлиняет ряд в шапке.
*/

export const THEME_KEY = "topinjector-theme";

/*
  Скрипт выполняется до первой отрисовки, поэтому светлой вспышки перед тёмной
  темой нет.
*/
export const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)});var t=s==='dark'||s==='light'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t;}catch(e){}})();`;

type Theme = "light" | "dark";

const read = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

const apply = (t: Theme) => {
  document.documentElement.dataset.theme = t;
};

/**
 * Держит тему согласованной во всех открытых вкладках и на всех страницах.
 *
 * Стоит в корневой разметке, а не внутри переключателя: страница может не иметь
 * шапки вообще, а тема на ней всё равно обязана совпадать с выбранной. Без
 * этого вкладка, открытая до переключения, оставалась в прежней теме — и,
 * что хуже, могла разойтись сама с собой, когда часть слоёв читает тему при
 * монтировании.
 */
export function ThemeSync() {
  useEffect(() => {
    /* Другая вкладка записала выбор — событие приходит только сюда, не в неё. */
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_KEY) return;
      if (e.newValue === "dark" || e.newValue === "light") apply(e.newValue);
    };
    window.addEventListener("storage", onStorage);

    /* Пока выбора нет, тема идёт за системой — без перезагрузки страницы. */
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_KEY)) return;
      apply(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onSystem);

    return () => {
      window.removeEventListener("storage", onStorage);
      mq.removeEventListener("change", onSystem);
    };
  }, []);

  return null;
}

function Sun() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[15px] w-[15px]">
      <circle cx="10" cy="10" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line
          key={a}
          x1="10"
          y1="1.9"
          x2="10"
          y2="4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          transform={`rotate(${a} 10 10)`}
        />
      ))}
    </svg>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[15px] w-[15px]">
      <path
        d="M16 12.4A7 7 0 0 1 7.6 4a6.4 6.4 0 1 0 8.4 8.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const OPTIONS: { id: Theme; label: string; icon: React.ReactNode }[] = [
  { id: "light", label: "Светлая тема", icon: <Sun /> },
  { id: "dark", label: "Тёмная тема", icon: <Moon /> },
];

export function ThemeToggle({ className = "" }: { className?: string }) {
  /*
    До монтирования темы нет: разметку отдаёт сервер, где сохранённого выбора не
    видно. Поэтому активная позиция появляется после первого кадра, а до него
    сегмент выглядит ровным — не мигает выбранной не той половиной.
  */
  const [theme, setTheme] = useState<Theme | null>(null);
  const reduce = useReducedMotion();

  /*
    Вид кнопки следует за атрибутом, а не за собственным состоянием. Тему может
    сменить другая вкладка или система, и переключатель, помнящий только свои
    нажатия, показывал бы не то, что на экране.
  */
  useEffect(() => {
    setTheme(read());
    const watch = new MutationObserver(() => setTheme(read()));
    watch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => watch.disconnect();
  }, []);

  const choose = (next: Theme) => {
    apply(next);
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* Приватный режим: тема останется до перезагрузки, и это лучше отказа. */
    }
  };

  const index = theme === "dark" ? 1 : 0;

  return (
    <div
      role="group"
      aria-label="Тема оформления"
      className={`relative inline-flex shrink-0 rounded-[var(--radius-btn)] border
        border-[var(--rule-soft)] bg-[var(--inset)] p-[3px] ${className}`}
    >
      {/*
        Клавиша одна на обе позиции и просто едет по горизонтали. Общий layoutId
        делал бы то же самое, но при появлении элемента motion добавляет к нему
        перекрёстное затухание — и клавиша, впервые возникающая уже после
        первого кадра (тему до монтирования знать неоткуда), застревала с
        нулевой непрозрачностью. Смещение на известную ширину сегмента такой
        неопределённости не имеет.

        До монтирования клавиша скрыта: пока тема неизвестна, отметить одну из
        позиций значило бы угадать и в половине случаев мигнуть не той.
      */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute top-[3px] left-[3px] h-8 w-10 rounded-[4px]
          bg-[var(--raised-bg)] shadow-[0_1px_0_var(--rule-soft)]"
        initial={false}
        animate={{ x: index * 40, opacity: theme ? 1 : 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 520, damping: 38, mass: 0.7 }
        }
      />

      {OPTIONS.map((o) => {
        const on = theme === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => choose(o.id)}
            aria-pressed={on}
            title={o.label}
            className="relative flex h-8 w-10 items-center justify-center rounded-[4px]"
          >
            <span
              className={`relative z-10 [transition:color_var(--t-hover)_var(--ease-micro)] ${
                on ? "text-[var(--ink)]" : "text-[var(--ink-faint)] hover:text-[var(--ink-soft)]"
              }`}
            >
              {o.icon}
            </span>
            <span className="sr-only">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
