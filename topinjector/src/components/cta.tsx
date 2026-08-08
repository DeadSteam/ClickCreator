import type { ReactNode } from "react";

/*
  Кнопка отсюда уехала в `@/components/ui/button`: она была одной из двадцати
  разных реализаций одного и того же элемента, и держать её рядом с подписью
  секции больше незачем. Здесь остался кикер — это типографика, а не действие.
*/
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="label flex items-center gap-2.5 text-[var(--ink-faint)]">
      <span className="h-px w-6 bg-[var(--rule)]" />
      {children}
    </span>
  );
}
