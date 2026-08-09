import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DocNav } from "./doc-nav";

/*
  Оболочка документов. Одна на все: у них общий каркас, и разъезжающиеся друг с
  другом «Условия» и «Политика» читаются как собранные из разных источников —
  ровно то впечатление, которого документы должны избегать.

  Страницы стоят на самой плотной зоне, а не на графите: графит держится за
  светлую тему и не переключался вместе с ней — человек выбирал светлую тему и
  всё равно получал тёмное соглашение.

  Документ — не статья. Его не читают подряд, в него приходят с вопросом, и
  каркас построен под это: оглавление рядом с текстом, нумерованные разделы с
  собственными адресами, мера строки под сканирование. До этого страницы были
  одной колонкой сплошного текста — формально полной и практически бесполезной.
*/
export function LegalPage({
  title,
  updated,
  intro,
  children,
  pending = true,
  kicker = "документ",
  toc = true,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: ReactNode;
  pending?: boolean;
  kicker?: string;
  /**
   * Оглавление рядом с текстом. Выключается для страниц-указателей: там разделов
   * два-три, и содержание из двух пунктов только отнимает у контента половину
   * ширины, ничего не давая взамен.
   */
  toc?: boolean;
}) {
  return (
    <div className="zone-proof min-h-dvh px-5 py-8 sm:px-8">
      <header className="mx-auto flex max-w-[76rem] items-center justify-between gap-4">
        <Link href="/service" aria-label="TopInjector, на страницу сервиса">
          <Logo />
        </Link>
        <ThemeToggle />
      </header>

      {/*
        Титул идёт во всю ширину, а колонки начинаются под ним: оглавление,
        поднятое до заголовка, читалось бы как навигация сайта, а не как
        содержание этого документа.
      */}
      <div className="mx-auto max-w-[76rem] pt-14 sm:pt-20">
        <p className="label text-[var(--ink-faint)]">{kicker}</p>

        <h1 className="mt-5 max-w-[20ch] text-[32px] leading-[1.06] font-extrabold tracking-[-0.035em] sm:text-[48px]">
          {title}
        </h1>

        {intro && (
          <p className="mt-7 max-w-[62ch] text-[17px] leading-relaxed text-[var(--ink-soft)] sm:text-[19px]">
            {intro}
          </p>
        )}

        <p className="label mt-8 border-t border-[var(--rule-soft)] pt-5 text-[var(--ink-faint)]">
          редакция от {updated}
        </p>
      </div>

      {/*
        Колонка текста фиксированной ширины, оглавление занимает остаток. Мера
        строки держится в районе семидесяти знаков: на всю ширину экрана глаз
        теряет начало следующей строки, и юридический текст становится ещё
        тяжелее, чем он есть.
      */}
      <div
        className={`mx-auto grid max-w-[76rem] gap-x-16 pt-12 pb-24 ${
          toc ? "lg:grid-cols-[minmax(0,44rem)_1fr]" : ""
        }`}
      >
        <main id="main" tabIndex={-1} className="min-w-0">
          {pending && (
            /*
              Пометка обязательна, пока документ не прошёл юридическую проверку.
              Публиковать оферту или политику обработки данных «как есть»
              нельзя, и видимая плашка не даёт забыть об этом при выкладке.
            */
            <p className="mb-12 border-l-2 border-[var(--accent)] bg-[var(--inset)] py-4 pr-5 pl-5 text-[14px] leading-relaxed text-[var(--ink-soft)]">
              Документ подготовлен как рабочий каркас и требует юридической
              проверки до публикации. Разделы, отмеченные квадратными скобками,
              заполняются фактическими данными.
            </p>
          )}

          {/*
            Счётчик разделов ведёт CSS: номер не хранится в разметке и не может
            разойтись с порядком. Ручная нумерация пережила бы ровно одну
            вставку раздела в середину.
          */}
          <div className="flex flex-col gap-14 [counter-reset:clause]">{children}</div>

          <Neighbours />
        </main>

        {toc && (
          <div className="row-start-1 lg:row-auto">
            <DocNav />
          </div>
        )}
      </div>
    </div>
  );
}

const DOCS = [
  { label: "Пользовательское соглашение", href: "/terms", note: "права и обязанности сторон" },
  { label: "Политика конфиденциальности", href: "/privacy", note: "какие данные и зачем" },
  { label: "Условия тестового периода", href: "/trial-terms", note: "что входит в бесплатный доступ" },
  { label: "Ограничения и риски", href: "/limits", note: "где сервис не сработает" },
  { label: "База знаний", href: "/docs", note: "как работать с сервисом" },
];

/*
  Соседние документы карточками, а не строкой ссылок. Из соглашения человек
  почти всегда идёт в другой документ — за условиями возврата, за политикой
  данных — и подпись под названием отвечает на вопрос «мне туда?» до перехода.
*/
function Neighbours() {
  return (
    <nav className="mt-20 border-t border-[var(--rule)] pt-10">
      <p className="label text-[var(--ink-faint)]">другие документы</p>

      <div className="mt-6 grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        {DOCS.map((d) => (
          <Link key={d.href} href={d.href} className="cell block p-5">
            <span className="block text-[15px] font-semibold tracking-[-0.01em]">
              {d.label}
            </span>
            <span className="mt-1.5 block text-[13px] leading-snug text-[var(--ink-soft)]">
              {d.note}
            </span>
          </Link>
        ))}
      </div>

      <p className="num mt-10 text-[11px] text-[var(--ink-faint)]">
        TOPINJECTOR 2026 · ООО «___», ИНН ___ · hi@topinjector.ru
      </p>
    </nav>
  );
}

/*
  Транслитерация для якорей. Русский заголовок в адресе превращается в
  процентную кашу на сорок символов — такую ссылку нельзя ни прочитать, ни
  переслать, а ссылка на пункт договора существует именно чтобы её пересылали.
*/
const MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export function slugify(text: string) {
  return text
    .toLowerCase()
    .split("")
    .map((c) => (c in MAP ? MAP[c] : c))
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

/**
 * Раздел документа. Получает собственный адрес, поэтому на любой пункт можно
 * сослаться — поддержке это нужнее, чем читателю.
 */
export function Clause({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  const anchor = id ?? slugify(title);

  return (
    <section id={anchor} className="scroll-mt-8 [counter-increment:clause]">
      {/*
        Номер стоит в псевдоэлементе: он декоративный, и в оглавление,
        поиск по странице или буфер обмена ему попадать незачем.
      */}
      <h2
        data-title={title}
        className="flex items-baseline gap-4 text-[21px] font-semibold tracking-[-0.02em] sm:text-[25px]
          before:num before:shrink-0 before:text-[13px] before:font-normal before:text-[var(--ink-faint)]
          before:content-[counter(clause)]"
      >
        {title}
      </h2>

      <div className="mt-5 flex flex-col gap-4 border-t border-[var(--rule-soft)] pt-5">
        {children}
      </div>
    </section>
  );
}

export function Para({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[68ch] text-[16px] leading-[1.65] text-[var(--ink-soft)]">
      {children}
    </p>
  );
}

export function Items({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((t) => (
        <li
          key={t}
          className="flex max-w-[68ch] gap-3.5 text-[16px] leading-[1.6] text-[var(--ink-soft)]"
        >
          <span aria-hidden="true" className="num shrink-0 text-[var(--ink-faint)]">
            —
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * Пары «понятие — значение». Определения, сроки, лимиты: то, что в сплошном
 * абзаце приходится вылавливать глазами, а в двух колонках находится сразу.
 */
export function Defs({ items }: { items: { t: string; d: string }[] }) {
  return (
    <dl className="flex flex-col">
      {items.map((x) => (
        <div
          key={x.t}
          className="grid gap-1 border-t border-[var(--rule-soft)] py-3.5 first:border-t-0 first:pt-0 sm:grid-cols-[13rem_1fr] sm:gap-6"
        >
          <dt className="text-[15px] font-semibold tracking-[-0.01em]">{x.t}</dt>
          <dd className="max-w-[56ch] text-[15px] leading-[1.6] text-[var(--ink-soft)]">
            {x.d}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Выделенное условие. Для того, что человек обязан заметить: сроки возврата,
 * основания отказа, что происходит при отписке.
 */
export function Note({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "danger" }) {
  const color = tone === "danger" ? "var(--color-risk-critical)" : "var(--accent)";

  return (
    <p
      className="max-w-[64ch] border-l-2 bg-[var(--inset)] py-3.5 pr-5 pl-5 text-[15px] leading-[1.6] font-medium text-[var(--ink)]"
      style={{ borderColor: color }}
    >
      {children}
    </p>
  );
}
