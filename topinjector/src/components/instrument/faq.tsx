import { Reveal } from "@/components/reveal";
import { ordinal } from "@/format";

/*
  Стопка вопросов системы `instrument.css`.

  Вопрос лежит на той же двенадцатиколонной сетке, что и остальная страница:
  номер в первой колонке, вопрос в десяти, плюс в последней. Ответ начинается
  со второй колонки — под вопросом, а не под номером, поэтому раскрытая
  карточка не разъезжает по горизонтали.

  Один компонент на две страницы: вопросы бизнеса и вопросы партнёров
  различаются только содержанием.
*/
export type FaqItem = {
  q: string;
  a: string;
};

export function Faq({
  items,
  className = "",
}: {
  items: readonly FaqItem[];
  className?: string;
}) {
  return (
    <div className={`wrap-bleed border-t border-[var(--line)] ${className}`}>
      {items.map((item, i) => (
        <Reveal key={item.q} delay={i * 0.04}>
          <details className="group inst-row border-b border-[var(--line)]">
            <summary className="grid cursor-pointer list-none grid-cols-12 items-baseline gap-x-6 px-6 py-6 sm:px-10">
              <span className="inst-idx col-span-1 hidden lg:block">{ordinal(i)}</span>
              <span className="col-span-11 text-[17px] leading-snug font-medium tracking-[-0.02em] transition-colors group-hover:text-[var(--amber)] sm:text-[19px] lg:col-span-10">
                {item.q}
              </span>
              <span
                aria-hidden="true"
                className="col-span-1 justify-self-end text-[18px] text-[var(--paper-3)] transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="grid grid-cols-12 gap-x-6 px-6 pb-7 sm:px-10">
              <p className="inst-body col-span-12 max-w-[68ch] lg:col-span-10 lg:col-start-2">
                {item.a}
              </p>
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
