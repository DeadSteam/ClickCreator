"use client";

import { useEffect, useRef, useState } from "react";

/*
  Появление строки документа.

  Своя реализация вместо анимационной библиотеки: весь эффект - это два
  свойства и один IntersectionObserver, а библиотека потянула бы в бандл
  десятки килобайт ради того же самого.

  Сдвиг маленький (6px) намеренно. Больше - и появление читается как выезд
  элемента, а показания не выезжают, они проявляются.
*/
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /*
      Без IntersectionObserver показываем сразу. Скрытый по умолчанию контент
      без запасного пути - это пустая страница у части посетителей.
    */
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          io.disconnect();
        }
      },
      /* rootMargin снизу: строка проявляется до того, как упрётся в край экрана. */
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(6px)",
        transition: `opacity 420ms var(--ease-read) ${delay}s, transform 420ms var(--ease-read) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
