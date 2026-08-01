/*
  Вопросы к техническим условиям.

  Это НЕ аккордеон, и это следует из жанра. Регламент не прячет свои пункты
  за щелчком: если условие спрятано, оно перестаёт быть условием. Вся страница
  построена на том, что мы говорим неприятное вслух и до оплаты, - складывать
  неприятное в закрытый ящик было бы ровно противоположным жестом.

  Оформлено сплошной нумерацией и двумя колонками, как продолжение разделов
  выше: вопрос слева, ответ справа. Читатель видит объём написанного целиком
  и понимает, что от него ничего не прячут.

  Компонент серверный: без интерактива в браузер не уезжает ни грамма
  JavaScript, а весь текст ответов попадает в выдачу, а не только в разметку.
  Событие faq_open здесь отсутствует за отсутствием раскрытия: интерес
  меряется глубиной прокрутки, она считается в Boot.
*/
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <dl className="chapter border-t border-[var(--color-graphite)]">
      {items.map((item) => (
        <div
          key={item.q}
          className="clause grid items-baseline gap-x-8 gap-y-2 border-b border-[var(--color-rule-hair)] py-6 md:grid-cols-[3rem_minmax(0,26ch)_1fr]"
        >
          <span
            aria-hidden
            className="clause-no num text-[11px] text-[var(--color-graphite-faint)]"
          />
          <dt className="text-[17px] leading-snug font-medium tracking-[-0.02em] sm:text-[18px]">
            {item.q}
          </dt>
          <dd className="max-w-[70ch] text-[15px] leading-relaxed text-[var(--color-graphite-soft)]">
            {item.a}
          </dd>
        </div>
      ))}
    </dl>
  );
}
