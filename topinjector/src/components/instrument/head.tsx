import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";

/*
  Шапки разделов системы `instrument.css`. Живут отдельным модулем, потому что
  их используют и главная, и `/pro`: вторая копия этих двадцати строк — ровно
  та копипаста секций между страницами, которую регламент запрещает.
*/

/** Подпись раздела. Стоит над заголовком и всегда с чертой — отметка на полях. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inst-label flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-8 bg-[var(--amber)]" />
      {children}
    </span>
  );
}

/**
 * Шапка раздела: заголовок ведёт семь колонок, пояснение занимает пять.
 *
 * Раньше заголовок и подводка шли стопкой, и между ними и содержимым
 * оставалось по 64 пикселя пустоты — блок распадался на три несвязанных
 * куска. Рядом они читаются одним высказыванием.
 */
export function Head({
  eyebrow,
  title,
  lede,
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
        <div className="col-span-12 lg:col-span-7">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className={`inst-d2 ${eyebrow ? "mt-5" : ""}`}>{title}</h2>
        </div>
        {lede ? (
          <p className="inst-body col-span-12 max-w-[46ch] lg:col-span-5">{lede}</p>
        ) : null}
        {aside}
      </div>
    </Reveal>
  );
}
