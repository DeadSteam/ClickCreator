"use client";

import { useEffect, useState } from "react";

/*
  Мобильное меню: состояние и кнопка.

  Обе шапки — сайта и лендинга — держали свои копии одного и того же: тот же
  флаг, тот же эффект блокировки прокрутки, те же две полоски с одинаковыми
  трансформациями вплоть до пикселя. Копии уже начали расходиться: в шапке
  сайта был обработчик Escape, в шапке лендинга — нет, и закрыть меню с
  клавиатуры там было нечем.

  Разметка самого списка ссылок остаётся в шапках: у сайта это переходы между
  страницами с нумерацией, у лендинга — якоря плюс «Войти». Общее здесь —
  поведение, а не содержимое, и попытка обобщить ещё и список превратила бы
  компонент в конфигуратор с восемью пропсами.
*/

export function useMenuState() {
  const [open, setOpen] = useState(false);

  /*
    Прокрутка страницы под открытым оверлеем. Без блокировки палец листает не
    меню, а страницу за ним — на телефоне это выглядит поломкой.
  */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape закрывает: оверлей перекрывает страницу целиком, выход обязателен. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return { open, setOpen, toggle: () => setOpen((v) => !v) };
}

/**
 * Кнопка меню. Две полоски складываются в крест: форма сообщает, что кнопка
 * закрывает то же, что открыла, — подмена иконки на «×» этой связи не даёт.
 */
export function MenuButton({
  open,
  onClick,
  className = "",
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
}) {
  /*
    В открытом состоянии полоски лежат на поверхности оверлея, а не на фоне
    страницы, поэтому берут её чернила. Раньше здесь стоял литеральный oklch —
    ровно тот случай, из-за которого страницы не переключались вместе с темой.
  */
  const bar =
    "absolute left-0 block h-[1.5px] w-5 [transition:top_var(--t-panel)_var(--ease-haptic),transform_var(--t-panel)_var(--ease-haptic),background-color_var(--t-panel)_var(--ease-haptic)]";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={open}
      className={`relative z-50 -mr-2 flex h-11 w-11 items-center justify-center ${className}`}
    >
      <span className="relative block h-3 w-5">
        <span
          className={`${bar} ${
            open
              ? "top-[5px] rotate-45 bg-[var(--settled-ink)]"
              : "top-0 bg-[var(--ink)]"
          }`}
        />
        <span
          className={`${bar} ${
            open
              ? "top-[5px] -rotate-45 bg-[var(--settled-ink)]"
              : "top-[10px] bg-[var(--ink)]"
          }`}
        />
      </span>
    </button>
  );
}
