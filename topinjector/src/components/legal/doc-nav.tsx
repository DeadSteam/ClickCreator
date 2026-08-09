"use client";

import { useEffect, useState } from "react";

/*
  Оглавление документа.

  Соглашение и политика — это не текст, который читают подряд. В них приходят с
  вопросом: что с моими данными, когда спишутся деньги, что будет при отказе.
  Сплошная колонка на две тысячи слов такого читателя не обслуживает: чтобы
  найти нужный пункт, ему приходится прокручивать весь документ и держать
  структуру в голове.

  Оглавление собирается из самого документа, а не задаётся списком рядом с ним.
  Второй список пришлось бы править вместе с каждым разделом, и он разошёлся бы
  с текстом на первой же правке — а разошедшееся оглавление хуже, чем никакого.

  Приём с подсветкой активного раздела взят из разбора table-of-contents в
  каталоге 21st.dev. Он отвечает на вопрос «где я сейчас», который в длинном
  документе возникает раньше, чем «что здесь есть».
*/

type Item = { id: string; title: string };

export function DocNav() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const found = [...document.querySelectorAll<HTMLElement>("main section[id] > h2")];
    const list = found
      .map((h) => ({ id: h.parentElement?.id ?? "", title: h.dataset.title ?? h.textContent ?? "" }))
      .filter((x) => x.id);

    setItems(list);
    if (list.length) setActive(list[0].id);

    /*
      Активным считается верхний раздел, пересекающий верхнюю треть экрана.
      Отметка по «последнему вошедшему» ведёт себя неверно при прокрутке вверх:
      подсветка отстаёт на раздел, потому что вход сверху и вход снизу дают
      одно и то же событие.
    */
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 },
    );

    for (const { id } of list) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  if (items.length < 3) return null;

  return (
    <>
      {/* Широкий экран: оглавление стоит рядом и едет вместе с чтением. */}
      <nav
        aria-label="Разделы документа"
        className="sticky top-8 hidden max-h-[calc(100dvh-6rem)] overflow-x-clip overflow-y-auto lg:block"
      >
        <p className="label text-[var(--ink-faint)]">разделы</p>
        <ol className="mt-4 flex flex-col border-l border-[var(--rule-soft)]">
          {items.map((it, i) => {
            const on = it.id === active;
            return (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`-ml-px flex gap-3 border-l py-2 pl-4 text-[13px] leading-snug
                    [transition:color_var(--t-hover)_var(--ease-micro),border-color_var(--t-hover)_var(--ease-micro)]
                    ${
                      on
                        ? "border-[var(--accent)] font-semibold text-[var(--ink)]"
                        : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
                    }`}
                >
                  <span className="num shrink-0 text-[11px] text-[var(--ink-faint)]">
                    {i + 1}
                  </span>
                  {it.title}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/*
        Узкий экран: то же оглавление, но свёрнутое. Развёрнутый список из
        двенадцати пунктов отодвинул бы начало документа за пределы экрана —
        человек открыл бы страницу и не увидел ни строчки текста.
      */}
      <details className="group mb-10 border-y border-[var(--rule-soft)] lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4">
          <span className="label text-[var(--ink-faint)]">
            разделы · {items.length}
          </span>
          <span
            aria-hidden="true"
            className="num text-[13px] text-[var(--ink-faint)] [transition:transform_var(--t-panel)_var(--ease-out)] group-open:rotate-180"
          >
            ↓
          </span>
        </summary>
        <ol className="flex flex-col pb-4">
          {items.map((it, i) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className="flex gap-3 py-2 text-[15px] leading-snug text-[var(--ink-soft)]"
              >
                <span className="num shrink-0 text-[11px] text-[var(--ink-faint)]">
                  {i + 1}
                </span>
                {it.title}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </>
  );
}
