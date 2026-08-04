/*
  Примечания.

  Это НЕ аккордеон, и это принципиально. Издание не прячет свои сноски за
  щелчком: примечания в конце публикации напечатаны целиком, их читают подряд
  или находят глазами. Складывающийся блок здесь был бы заимствованием из
  лендинга - то есть ровно тем, от чего этот вариант уходит.

  Побочная выгода серверная: без интерактива компонент остаётся серверным,
  не тянет ни грамма JavaScript, и весь текст ответов попадает в выдачу
  вместе с FAQ-разметкой, а не только в неё.

  Отсюда же отсутствие события faq_open: раскрывать нечего. Интерес к
  примечаниям меряется глубиной прокрутки, она уже считается в Boot.

  Из прежней версии убраны надстрочные номера сносок: они указывали на
  примечание, которого нигде больше нет, - то есть не указывали ни на что.
*/
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <dl className="border-t border-[var(--color-ink)]">
      {items.map((item) => (
        <div
          key={item.q}
          className="grid gap-x-14 gap-y-3 border-b border-[var(--color-rule-soft)] py-8 md:grid-cols-[minmax(0,20rem)_1fr]"
        >
          <dt className="text-[21px] leading-snug font-semibold tracking-[-0.015em]">
            {item.q}
          </dt>
          <dd className="max-w-[62ch] text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
            {item.a}
          </dd>
        </div>
      ))}
    </dl>
  );
}
