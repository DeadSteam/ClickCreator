import { Appear } from "@/motion/appear";

/*
  Шапка раздела: подпись, заголовок, подводка.

  Три страницы держали три копии одного компонента с именем `Head` — на
  /stack, на /service и на /universal через общий модуль секций лендинга.
  Совпадало в них всё, кроме типографики: где-то подпись была прописной
  11 px вразрядку, где-то строчной 16 px, заголовок — где-то двумя жёсткими
  ступенями `30 → 44`, где-то текучим `clamp`. Читателю это не давало
  ничего: он видел не два решения, а несобранный сайт.

  Оставлено решение /stack (см. `.eyebrow`/`.h-sec` в `globals.css`).
  Главная живёт на своей системе `.inst` с двенадцатиколоночной шапкой и в
  этот компонент намеренно не сведена: там у заголовка есть слот `aside` и
  собственная сетка, и слияние было бы не переиспользованием, а отказом от
  второй системы — решение другого масштаба.
*/
export type SectionHeadProps = {
  /** Подпись раздела строчными. Называет раздел, не кричит. */
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Снимает меру 26ch: ширину задаёт колонка, а не сам заголовок. */
  full?: boolean;
  className?: string;
};

export function SectionHead({
  eyebrow,
  title,
  lead,
  full = false,
  className,
}: SectionHeadProps) {
  return (
    <Appear className={className}>
      {eyebrow ? <p className="eyebrow mb-6">{eyebrow}</p> : null}
      <h2 className={`h-sec ${full ? "h-sec-full" : ""}`}>{title}</h2>
      {lead ? (
        <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
          {lead}
        </p>
      ) : null}
    </Appear>
  );
}
