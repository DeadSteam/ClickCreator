/*
  Вопросы.

  Не аккордеон. Вся страница построена на крупном узком капслоке и на том,
  что содержание видно сразу, - складывающиеся ящики противоречат и тому, и
  другому. Здесь вопрос набран тем же начертанием, что и сутки в расписании,
  а ответ стоит под ним: тот же ритм, что у всей страницы, а не отдельный
  виджет, приехавший из другого сайта.

  Раскладка в две колонки на широком экране: при таком кегле заголовков
  одноколоночный список ушёл бы вниз на три экрана, и до последнего вопроса
  никто бы не добрался.

  Компонент серверный: ни грамма JavaScript, весь текст ответов попадает в
  поисковую выдачу, а не только в разметку. Событие faq_open отсутствует за
  отсутствием раскрытия - интерес меряется глубиной прокрутки, она считается
  в Boot.
*/
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="grid gap-x-14 gap-y-10 border-t border-[var(--color-mark)] pt-10 lg:grid-cols-2">
      {items.map((item, i) => (
        <div key={item.q}>
          <div className="flex items-baseline gap-4">
            <span
              aria-hidden
              className="day shrink-0 text-[13px] text-[var(--color-blaze)]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-[family-name:var(--font-tight)] text-[26px] leading-[0.92] font-extrabold uppercase tracking-[-0.01em] sm:text-[30px]">
              {item.q}
            </h3>
          </div>

          {/* Отбивка слева ровно на ширину номера с зазором: ответы стоят
              в одной колонке и читаются как продолжение заголовка. */}
          <p className="mt-4 max-w-[54ch] pl-[2.25rem] text-[16px] leading-relaxed text-[var(--color-mark-soft)]">
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}
