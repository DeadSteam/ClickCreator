/*
  Примечания к реестру.

  Это НЕ аккордеон, и это принципиально. Документ не прячет свои сноски за
  щелчком: примечания в конце публикации напечатаны целиком, их читают подряд
  или находят по номеру. Складывающийся блок здесь был бы заимствованием из
  лендинга, то есть ровно тем, от чего этот вариант уходит.

  Побочная выгода серверная: без интерактива компонент остаётся серверным,
  не тянет ни грамма JavaScript, и весь текст ответов сразу попадает в
  выдачу вместе с FAQ-разметкой, а не только в неё.

  Отсюда же отсутствие события faq_open: раскрывать нечего. Интерес к
  примечаниям меряется глубиной прокрутки, она уже считается в Boot.
*/
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <ol className="border-t border-[var(--color-ink)]">
      {items.map((item, i) => (
        <li
          key={item.q}
          className="grid items-baseline gap-x-8 gap-y-2 border-b border-[var(--color-rule-hair)] py-7 md:grid-cols-[3rem_minmax(0,26ch)_1fr]"
        >
          {/*
            Номер сноски набран надстрочным, как в печатном тексте: он
            указывает на примечание, а не нумерует список задач.
          */}
          <span className="num text-[12px] text-[var(--color-stamp)]">
            <sup>{i + 1}</sup>
          </span>

          <p className="text-[17px] leading-snug font-semibold tracking-[-0.02em] sm:text-[18px]">
            {item.q}
          </p>

          <p className="max-w-[68ch] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
            {item.a}
          </p>
        </li>
      ))}
    </ol>
  );
}
