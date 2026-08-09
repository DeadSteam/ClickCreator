"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Appear } from "@/motion/appear";
import { APPEAR, EASE_OUT } from "@/motion/tokens";
import { ordinal } from "@/format";

/*
  Текстовый слой предфрейминговых страниц.

  ОСЬ. Колонка чтения центрирована по окну, а не прижата к левому полю. Это
  меняет всё остальное: полноширинный разворот теперь считается от центра
  колонки (`50% - 50vw`) и уходит за оба края экрана, а не за один; поля слева
  и справа одинаковы, поэтому текст перестаёт выглядеть сдвинутым на широком
  мониторе. Левое поле занято рельсом глав, правое — ремарками.

  ШИРИНА не одна на всю страницу, а три. Абзац идёт по колонке (~65–70 знаков,
  предел комфортного чтения), схемы и сравнения выходят за её поля `Breakout`,
  тёмная пауза идёт во всю ширину окна. Ритм ширины — то, что отличает
  разбор от сплошного текстового полотна.

  ТИПОГРАФИКА живёт константами ниже, а не выписывается в каждом компоненте.
  Ступени идут по модульной шкале, последняя включается на очень широком
  мониторе: на 2560 текст в 17 пикселей превращается в узкую ленту.

  ОТСТУПЫ идут одним набором `GAP_*` по шкале 24/32/48/64/96. Правило одно:
  расстояние между группами больше расстояния внутри группы. Отступ ставится
  на обёртку появления, а не на сам абзац, — тогда соседние отступы схлопываются
  по обычным правилам потока, и после блока не возникает двойного провала.
*/

const BODY = "text-[17px] leading-[1.72] sm:text-[18px] 2xl:text-[19px]";
const LEAD = "text-[20px] leading-[1.5] sm:text-[22px] 2xl:text-[24px]";
const VOICE = "text-[19px] leading-[1.45] sm:text-[21px] 2xl:text-[23px]";
const SMALL = "text-[14px] leading-relaxed sm:text-[15px]";

/** Между абзацами. */
const GAP_TEXT = "mt-6";
/** Вокруг реплики и вокруг подписи к схеме. */
const GAP_ASIDE = "my-8";
/** Вокруг блока: перечисления, сравнения, схемы, выделенной мысли. */
const GAP_BLOCK = "my-12";
/** Перед заголовком внутри главы. Первый заголовок главы отступа не получает. */
const GAP_HEAD = "mt-16 first:mt-0";
/** Вокруг тёмной паузы: она обязана стоять в пустоте, иначе не читается паузой. */
const GAP_PAUSE = "my-24 sm:my-32";

/**
 * Полноширинный разворот из колонки чтения.
 *
 * `50%` в полях считается от ширины колонки, `50vw` — от окна: вместе они
 * выносят блок ровно на края экрана, где бы колонка ни стояла. Обратный отступ
 * в `padding` возвращает содержимое на ось текста с точностью до пикселя — без
 * него внутренний блок пришлось бы центрировать заново и он разъезжался бы с
 * колонкой на ширину полосы прокрутки.
 */
const BLEED = "mx-[calc(50%-50vw)] w-screen";
const BLEED_INSET = "pl-[calc(50vw-50%)] pr-5";

/** Появление в темпе чтения: сдвиг на 16px и затухание, без слайдов. */
export function Fade({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Appear speed="reading" delay={delay} className={className}>
      {children}
    </Appear>
  );
}

/**
 * То же появление, но самим элементом списка.
 *
 * Общий `Fade` — это `div`, и обёрнутый в него `<li>` перестаёт быть прямым
 * потомком списка: разметка ломается, а скринридер перестаёт объявлять число
 * пунктов. Механика и токены те же, меняется только тег.
 */
export function FadeItem({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { duration, y, margin } = APPEAR.reading;

  return (
    <motion.li
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.li>
  );
}

/**
 * Блок шире колонки: схемы, сравнения, карточки.
 *
 * Схема, набранная по ширине абзаца, читается как ещё один абзац. Выход за
 * поля отделяет её от текста, не разрывая чтения. Ширина выхода растёт вместе
 * с окном, но никогда не доходит до рельса глав слева.
 */
export function Breakout({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${GAP_BLOCK} -mx-2 sm:-mx-6 xl:-mx-16 2xl:-mx-24 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Линейка в шапке главы. Растёт слева направо, а не появляется целиком:
 * прочерк, проведённый на глазах у читателя, открывает раздел; готовая линия
 * читается фоном.
 */
function ChapterRule() {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className="block h-px min-w-4 flex-1 origin-left bg-[var(--rule)]"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: APPEAR.reading.margin }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    />
  );
}

/**
 * Глава разбора.
 *
 * Номер набран крупно и моноширинным: длинный материал без точек входа
 * читается как одно полотно, и вернуться к нужному месту невозможно. По этим
 * же идентификаторам работают рельс слева и счётчики доскролла.
 */
export function Chapter({
  id,
  index,
  label,
  children,
  peek = false,
}: {
  id: string;
  /** Порядковый номер главы. Показывается в шапке и в рельсе. */
  index: number;
  /** Короткое имя главы: чем она занята. Не заголовок. */
  label: string;
  children: ReactNode;
  /*
    Первая глава стоит ближе к обложке: ТЗ требует, чтобы её начало выглядывало
    из-под сгиба на 80–160px. С общим отступом начало уезжает за границу окна, и
    первый экран читается как конец страницы.
  */
  peek?: boolean;
}) {
  return (
    <section
      id={id}
      data-pf-block={id}
      className={peek ? "mt-14 sm:mt-16" : "mt-28 sm:mt-40"}
    >
      <Fade>
        <header className="flex items-center gap-4 sm:gap-6">
          <span className="num text-[26px] leading-none text-[var(--accent)] sm:text-[32px]">
            {ordinal(index)}
          </span>
          <ChapterRule />
          <span className="label shrink-0 text-[var(--ink-faint)]">{label}</span>
        </header>
      </Fade>

      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return (
    <Fade className={GAP_HEAD}>
      <h2 className="max-w-[20ch] text-[28px] leading-[1.06] font-extrabold tracking-[-0.03em] sm:text-[36px] 2xl:text-[40px]">
        {children}
      </h2>
    </Fade>
  );
}

/** Абзац. `lead` — первый абзац главы: он держит мысль, ради которой она написана. */
export function Text({ children, lead = false }: { children: ReactNode; lead?: boolean }) {
  return (
    <Fade className={GAP_TEXT}>
      <p className={lead ? `text-[var(--ink)] ${LEAD}` : `text-[var(--ink-soft)] ${BODY}`}>
        {children}
      </p>
    </Fade>
  );
}

/**
 * Внутренний вопрос читателя или реплика в кавычках. Отделена линейкой, а не
 * курсивом: курсив в длинном кириллическом тексте читается хуже прямого
 * начертания, а вопрос обязан останавливать взгляд.
 */
export function Aside({ children }: { children: ReactNode }) {
  return (
    <Fade className={GAP_ASIDE}>
      <p className={`border-l-2 border-[var(--rule)] pl-6 text-[var(--ink)] ${VOICE}`}>
        {children}
      </p>
    </Fade>
  );
}

/**
 * Перечисление карточками, а не абзацем со списком.
 *
 * Пять пунктов подряд обычным текстом сливаются с окружающими абзацами и
 * теряются: именно из-за этого страница читается как полотно. Сетка на общей
 * подложке даёт им собственный вес; `cell` — материал карточек всего сайта, со
 * своим бликом по кромке и акцентной засечкой на наведение.
 */
export function Points({ items, caption }: { items: string[]; caption?: string }) {
  return (
    <Breakout>
      {caption && (
        <Fade>
          <p className="label mb-5 text-[var(--ink-faint)]">{caption}</p>
        </Fade>
      )}

      <ul className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        {items.map((t, i) => (
          <FadeItem
            key={t}
            delay={Math.min(i, 6) * 0.05}
            className="cell flex items-start gap-5 p-6 sm:p-7"
          >
            <span className="num shrink-0 text-[15px] leading-[1.5] tabular-nums text-[var(--ink-faint)]">
              {ordinal(i)}
            </span>
            <span className="text-[16px] leading-snug text-[var(--ink-soft)] sm:text-[17px]">
              {t}
            </span>
          </FadeItem>
        ))}
      </ul>
    </Breakout>
  );
}

/**
 * Одна мысль, которую ТЗ требует выделить внутри блока.
 *
 * Раньше она была набрана акцентным цветом целиком. На кегле в двадцать
 * пунктов оранжевый перестаёт быть пунктуацией и становится заливкой, а
 * страница получает пять кричащих реплик подряд. Вес держит подложка и полоса
 * слева, текст остаётся чернилами.
 */
export function Statement({ children }: { children: ReactNode }) {
  return (
    <Fade className={GAP_BLOCK}>
      <div className="border-l-2 border-[var(--accent)] bg-[var(--inset)] p-6 sm:p-8">
        <p className={`font-semibold tracking-[-0.02em] text-[var(--ink)] ${VOICE}`}>
          {children}
        </p>
      </div>
    </Fade>
  );
}

/**
 * Ремарка на поле.
 *
 * На широком мониторе справа от колонки остаётся пустое поле. Короткие
 * замечания уходят туда: текст перестаёт быть монолитом, а поле начинает
 * работать. Ширина ремарки и её вынос подобраны так, чтобы на 1280 — самом
 * узком экране, где поле вообще появляется, — она не доходила до края окна.
 * На узком экране ремарка встаёт в поток обычной сноской.
 */
export function Margin({ children }: { children: ReactNode }) {
  return (
    <Fade className="my-8 xl:my-0 xl:-mr-[15rem] xl:ml-8 xl:w-[13rem] xl:float-right xl:clear-right">
      <p className="border-t border-[var(--rule)] pt-4 text-[14px] leading-relaxed text-[var(--ink-faint)] xl:mt-2">
        {children}
      </p>
    </Fade>
  );
}

/**
 * Пауза на графите — визуальная остановка, которой ТЗ требует между смысловыми
 * блоками: чтение упирается в тёмный разворот и на секунду прекращается.
 *
 * Разворот идёт от края до края окна и держит текст на оси колонки, но даёт ему
 * больше ширины: на паузе строка длиннее, потому что читается она не как абзац,
 * а как реплика. Ширина набрана полями, а не `translate`: сдвиг создаёт слой и
 * заставляет браузер перерисовывать разворот при каждой прокрутке.
 */
export function Interlude({ lines, note }: { lines: string[]; note?: string }) {
  return (
    <aside
      /* Метка для рельса: проезжая под графитом, он перекрашивается в светлые чернила. */
      data-pf-pause=""
      className={`zone-settled ${GAP_PAUSE} ${BLEED} ${BLEED_INSET} py-20 sm:py-28`}
    >
      <div className="max-w-[44rem]">
        <Fade>
          {/* Засечка вместо служебной подписи: разворот не нуждается в заголовке. */}
          <span aria-hidden="true" className="block h-[2px] w-14 bg-[var(--accent)]" />
        </Fade>

        <blockquote className="mt-10">
          {lines.map((l, i) => (
            /* Строки собираются по одной: цитата дочитывается как мысль, а не появляется плашкой. */
            <Fade key={l} delay={i * 0.14}>
              <p
                className={`text-[25px] leading-[1.16] font-extrabold tracking-[-0.035em] text-[var(--ink)] sm:text-[34px] 2xl:text-[40px] ${
                  i > 0 ? "mt-3" : ""
                }`}
              >
                {l}
              </p>
            </Fade>
          ))}
        </blockquote>

        {note && (
          <Fade delay={lines.length * 0.14 + 0.1}>
            <p className={`mt-8 max-w-[56ch] text-[var(--ink-faint)] ${SMALL}`}>{note}</p>
          </Fade>
        )}
      </div>
    </aside>
  );
}

/**
 * Вертикальная цепочка. `markAt` выделяет ступень, ради которой схема
 * нарисована: цепочка без отмеченной ступени — просто ещё один список.
 *
 * Подпись — часть схемы, а не отдельный компонент над ней. Пока она стояла
 * отдельно, расстояние между подписью и цепочкой задавалось двумя отступами
 * сразу и получалось больше, чем расстояние до предыдущего абзаца: подпись
 * читалась концом прошлой мысли, а не заголовком следующей.
 */
export function Ladder({
  steps,
  markAt,
  caption,
}: {
  steps: string[];
  markAt?: number;
  caption?: string;
}) {
  return (
    <div className={GAP_BLOCK}>
      {caption && (
        <Fade>
          <p className="label mb-5 text-[var(--ink-faint)]">{caption}</p>
        </Fade>
      )}

      <ol className="flex flex-col items-start">
      {steps.map((s, i) => {
        const on = i === markAt;
        return (
          <FadeItem key={s} delay={Math.min(i, 6) * 0.06} className="w-full">
            {/* Соединитель встаёт по оси маркера: маркер шириной 7 сдвинут на 5. */}
            {i > 0 && (
              <span aria-hidden="true" className="ml-[8px] block h-6 w-px bg-[var(--rule)]" />
            )}
            <span
              className={`inline-flex items-center gap-4 text-[17px] sm:text-[18px] ${
                on ? "font-semibold text-[var(--accent)]" : "text-[var(--ink-soft)]"
              }`}
            >
              <span
                aria-hidden="true"
                className="ml-[5px] block h-[7px] w-[7px] shrink-0 rounded-full"
                style={{ backgroundColor: on ? "var(--accent)" : "var(--ink-faint)" }}
              />
              {s}
            </span>
          </FadeItem>
        );
      })}
      </ol>
    </div>
  );
}

/**
 * Сравнение в две колонки. Правая — та, ради которой сравнение существует,
 * поэтому она контрастнее: одинаково набранные колонки читаются как
 * нейтральное перечисление, а не как выбор.
 */
export function Contrast({
  left,
  right,
  note,
}: {
  left: { title: string; items: string[] };
  right: { title: string; items: string[]; conclusion?: string };
  note?: string;
}) {
  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        <Fade className="cell">
          <div className="h-full p-6 sm:p-8">
            <p className="label text-[var(--ink-faint)]">{left.title}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {left.items.map((t) => (
                <li
                  key={t}
                  className="text-[15px] leading-snug text-[var(--ink-soft)] sm:text-[16px]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Fade>

        {/* Правая выходит на четверть секунды позже: она читается как ответ на левую. */}
        <Fade delay={0.25} className="cell">
          <div className="h-full border-l-2 border-[var(--accent)] p-6 sm:p-8">
            <p className="label text-[var(--accent)]">{right.title}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {right.items.map((t) => (
                <li
                  key={t}
                  className="text-[15px] leading-snug font-medium text-[var(--ink)] sm:text-[16px]"
                >
                  {t}
                </li>
              ))}
            </ul>
            {right.conclusion && (
              <p className="mt-8 text-[20px] leading-tight font-extrabold tracking-[-0.03em] text-[var(--ink)] sm:text-[24px]">
                {right.conclusion}
              </p>
            )}
          </div>
        </Fade>
      </div>

      {note && (
        <Fade delay={0.18}>
          <p className={`mt-4 text-[var(--ink-faint)] ${SMALL}`}>{note}</p>
        </Fade>
      )}
    </Breakout>
  );
}

/** Короткие наблюдения карточками. Без иконок: акцент принадлежит тексту. */
export function Cards({ caption, items }: { caption: string; items: string[] }) {
  return (
    <Breakout>
      <p className="label text-[var(--ink-faint)]">{caption}</p>
      <div className="mt-5 grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        {items.map((t, i) => (
          <Fade key={t} delay={i * 0.12} className="cell">
            <p className="h-full p-6 text-[17px] leading-snug text-[var(--ink)] sm:p-8 sm:text-[18px]">
              {t}
            </p>
          </Fade>
        ))}
      </div>
    </Breakout>
  );
}
