/*
  Вопросы.

  Это НЕ аккордеон, и это следует из замысла. Вся страница построена на том,
  что мы говорим неприятное вслух и до оплаты; складывать неприятное в
  закрытый ящик было бы ровно противоположным жестом.

  Компонент серверный: без интерактива в браузер не уезжает ни грамма
  JavaScript, а весь текст ответов попадает в выдачу, а не только в разметку.
  Событие faq_open отсутствует за отсутствием раскрытия: интерес меряется
  глубиной прокрутки, она считается в Boot.

  Из прежней версии убрана сквозная нумерация счётчиком: номер пункта помогает
  ссылаться на него в переписке, но ни один посетитель этого не делает.
*/
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <dl className="border-t border-[var(--color-graphite)]">
      {items.map((item) => (
        <div
          key={item.q}
          className="grid gap-x-14 gap-y-3 border-b border-[var(--color-rule-soft)] py-8 md:grid-cols-[minmax(0,20rem)_1fr]"
        >
          <dt className="text-[21px] leading-snug font-bold tracking-[-0.025em]">
            {item.q}
          </dt>
          <dd className="max-w-[62ch] text-[17px] leading-relaxed text-[var(--color-graphite-soft)]">
            {item.a}
          </dd>
        </div>
      ))}
    </dl>
  );
}
