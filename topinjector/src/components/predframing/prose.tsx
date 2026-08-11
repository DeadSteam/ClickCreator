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
  tight = false,
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
  /**
   * Для глав, которые продолжают одну мысль без смены темы (56A.7
   * production-патча психологического спец-лендинга): полный отступ между
   * главами читается как «новая глава статьи» даже когда следующая мысль —
   * прямое продолжение предыдущей, а не новая тема.
   */
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      data-pf-block={id}
      className={peek ? "mt-14 sm:mt-16" : tight ? "mt-16 sm:mt-20" : "mt-28 sm:mt-40"}
    >
      <Fade>
        <header className="flex items-center gap-4 sm:gap-6">
          {/* `chapter-num` — метка для 56C.11 (`.conv-system .chapter-num`), инертна без `.conv-system` на странице. */}
          <span className="num chapter-num text-[26px] leading-none text-[var(--accent)] sm:text-[32px]">
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

/**
 * Акцентная подсветка ключевой фразы внутри абзаца.
 *
 * Заливка стоит на месте, а не выезжает при скролле: анимация через
 * `scaleX(0) → scaleX(1)` на абсолютно спозиционированном элементе однажды
 * уже приводила к зависшему обрезку — при нулевой ширине в начальном кадре
 * `IntersectionObserver` в части браузеров ни разу не засчитывал элемент
 * попавшим в кадр, и `whileInView` не срабатывал вовсе. Постоянная подсветка
 * не ломается в принципе — и это ближе к спокойному тону разбора, чем ещё одна
 * анимация на входе. Цвет берётся из `--accent` через `color-mix`, поэтому
 * подсветка не заводит собственный токен и остаётся акцентом на 3-4 фразы во
 * всём разборе, а не подчёркиванием через абзац.
 */
export function Mark({ children }: { children: ReactNode }) {
  return (
    <span
      className="rounded-[2px] px-[0.2em] py-[0.05em] font-medium text-[var(--ink)]"
      style={{ backgroundColor: "color-mix(in oklab, var(--accent) 16%, transparent)" }}
    >
      {children}
    </span>
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
 * Число, вынесенное из уже сказанного текста, крупным акцентным начертанием.
 * Не статистика и не новая цифра — редакционный приём «до перечисления»:
 * abзац только что назвал число пунктов словом («шесть опор»), `BigStat`
 * повторяет его же цифрой, чтобы перечисление читалось не как двадцать
 * пятое подряд Points, а как отдельный момент разбора.
 */
export function BigStat({ value, label }: { value: string; label: string }) {
  return (
    <Fade className={`${GAP_BLOCK} flex items-baseline gap-5`}>
      <span className="num text-[56px] leading-none font-bold text-[var(--accent)] sm:text-[72px]">
        {value}
      </span>
      <span className="max-w-[22ch] text-[15px] leading-snug text-[var(--ink-faint)] sm:text-[16px]">
        {label}
      </span>
    </Fade>
  );
}

/**
 * Голая крупная цитата — третий регистр реплики между `Aside` (реплика с
 * линейкой слева) и `Statement` (мысль в подложке). Без рамки и без фона:
 * просто крупный набор посреди колонки, чтобы уже сказанная фраза на секунду
 * стала единственным, что видно на экране. Держится редко — на главу с 30+
 * абзацами максимум один-два раза, иначе теряет вес паузы.
 */
export function Quote({ children }: { children: ReactNode }) {
  return (
    <Fade className={GAP_BLOCK}>
      <p className="max-w-[26ch] text-[26px] leading-[1.12] font-extrabold tracking-[-0.03em] text-[var(--ink)] sm:text-[32px] 2xl:text-[36px]">
        {children}
      </p>
    </Fade>
  );
}

/**
 * Орнаментальная пауза внутри главы — легче `Interlude` (тот уходит в
 * полноширинный графит и держит цитату), здесь только межстрочный вдох на
 * оси колонки. Нужна для очень длинных глав (A2-блоки на 30-50 абзацев),
 * где до следующего Statement/Aside ещё далеко: три точки останавливают
 * взгляд без нового смысла.
 */
export function Break() {
  return (
    <Fade className="my-14 flex justify-center gap-3 sm:my-16">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="block h-[3px] w-[3px] rounded-full bg-[var(--ink-faint)]"
          style={{ opacity: 0.5 + i * 0 }}
        />
      ))}
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
  /*
    Нечётное число пунктов иначе оставляет пустую ячейку рядом с последним —
    сквозь неё просвечивает фон секции, а не карточка. Одинокий последний
    пункт растягивается на всю строку вместо этого.
  */
  const lastAlone = items.length % 2 === 1;

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
            className={`cell flex items-start gap-5 p-6 sm:p-7 ${
              lastAlone && i === items.length - 1 ? "sm:col-span-2" : ""
            }`}
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
      {/*
        `key-insight` — чистая метка для CSS раздела 56C.13 нового
        мастер-промпта (`.conv-system .key-insight` в globals.css). Ничего не
        стилизует сама по себе на остальных девяти гипотезах — там класс
        `.conv-system` на странице отсутствует, и правило просто не совпадает.
      */}
      <div className="key-insight border-l-2 border-[var(--accent)] bg-[var(--inset)] p-6 sm:p-8">
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
 * Соединитель между ступенями цепочки. Дорисовывается сверху вниз при
 * попадании в кадр, а не стоит готовой линией: маршрут читается как
 * прочерченный на глазах у читателя, тем же приёмом, что уже открывает
 * главу (`ChapterRule`) — сверху вниз вместо слева направо.
 */
function LadderConnector() {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className="ml-[8px] block h-6 w-px origin-top bg-[var(--rule)]"
      initial={reduce ? false : { scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: APPEAR.reading.margin }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
    />
  );
}

/**
 * Вертикальная цепочка. `markAt` выделяет ступень, ради которой схема
 * нарисована: цепочка без отмеченной ступени — просто ещё один список.
 * Отмеченная точка держит слабое акцентное свечение — это и есть контрольная
 * точка маршрута, а не просто более тёмный кружок в том же списке.
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
            {i > 0 && <LadderConnector />}
            <span
              className={`inline-flex items-center gap-4 text-[17px] sm:text-[18px] ${
                on ? "font-semibold text-[var(--accent)]" : "text-[var(--ink-soft)]"
              }`}
            >
              <span
                aria-hidden="true"
                className="ml-[5px] block h-[7px] w-[7px] shrink-0 rounded-full"
                style={{
                  backgroundColor: on ? "var(--accent)" : "var(--ink-faint)",
                  boxShadow: on
                    ? "0 0 0 4px color-mix(in oklab, var(--accent) 20%, transparent)"
                    : "none",
                }}
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
      <div className="relative grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
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

        {/*
          Стрелка на стыке колонок — тот же узел, что уже держит переход
          «отзывы → свои данные» в `EvidenceShift`. Сравнение читается как
          переход слева направо, а не как две независимые карточки рядом.
          Только на развороте sm:grid-cols-2: в колонку стек не переносится,
          там переход и так линеен по вертикали.
        */}
        <span
          aria-hidden="true"
          className="num pointer-events-none absolute top-1/2 left-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--rule)] bg-[var(--reading-bg)] text-[13px] text-[var(--ink-faint)] sm:flex"
        >
          →
        </span>
      </div>

      {note && (
        <Fade delay={0.18}>
          <p className={`mt-4 text-[var(--ink-faint)] ${SMALL}`}>{note}</p>
        </Fade>
      )}
    </Breakout>
  );
}

/**
 * Развилка из двух путей принятия решения. Подсвечен только один — не как
 * «правильный выбор», а как более быстрый: оба пути ведут к результату, но
 * разными темпами. Изначально жил в схемах гипотезы №1 как `TwoPaths` с
 * зашитым текстом; вынесен сюда пропсами, когда тот же приём понадобился
 * гипотезе №2 — тот случай, когда переиспользование видно только на второй
 * гипотезе, а не заранее.
 */
export function Fork({
  paths,
}: {
  paths: { label: string; title: string; description: string; active?: boolean }[];
}) {
  return (
    <Breakout>
      <figure className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        {paths.map((p, i) => (
          <Fade key={p.title} delay={i * 0.2} className="cell">
            <div
              className={`h-full p-6 sm:p-8 ${
                p.active ? "border-l-2 border-[var(--accent)]" : "opacity-60"
              }`}
            >
              <p
                className="label"
                style={{ color: p.active ? "var(--accent)" : "var(--ink-faint)" }}
              >
                {p.label}
              </p>
              <p
                className={`mt-5 text-[19px] font-semibold tracking-[-0.02em] sm:text-[21px] ${
                  p.active ? "text-[var(--ink)]" : "text-[var(--ink-soft)]"
                }`}
              >
                {p.title}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)] sm:text-[16px]">
                {p.description}
              </p>
            </div>
          </Fade>
        ))}
      </figure>
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

/**
 * Два нейтральных элемента подают набор факторов в общий центр. Ни левый, ни
 * правый не подписан победителем — только центр получает акцент. Тот же
 * рисунок трижды складывался вручную в схемах гипотез (специалист/инструмент
 * в центре решения, два цикла, два маршрута), поэтому здесь он один на всех.
 */
export function Convergence({
  leftLabel,
  rightLabel,
  factors,
  centerCaption,
  centerLabel,
  ariaLabel,
}: {
  leftLabel: string;
  rightLabel: string;
  factors: string[];
  centerCaption: string;
  centerLabel: string;
  ariaLabel: string;
}) {
  return (
    <figure className="mt-12">
      <div role="img" aria-label={ariaLabel} className="grid grid-cols-2 gap-3 sm:gap-5">
        <Fade className="border border-[var(--rule-soft)] bg-[var(--inset)] p-4 text-center sm:p-6">
          <p className="text-[14px] leading-snug text-[var(--ink-soft)] sm:text-[15px]">{leftLabel}</p>
        </Fade>
        <Fade delay={0.08} className="border border-[var(--rule-soft)] bg-[var(--inset)] p-4 text-center sm:p-6">
          <p className="text-[14px] leading-snug text-[var(--ink-soft)] sm:text-[15px]">{rightLabel}</p>
        </Fade>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1 text-[12px] text-[var(--ink-faint)]">
        {factors.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>

      <div className="mt-3 flex justify-center">
        <span aria-hidden="true" className="block h-6 w-px bg-[var(--rule)]" />
      </div>

      <Fade delay={0.2}>
        <div className="border-l-2 border-[var(--accent)] bg-[var(--inset)] p-6 text-center sm:p-8">
          <p className="label text-[var(--accent)]">{centerCaption}</p>
          <p className="mt-3 text-[19px] font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[21px]">
            {centerLabel}
          </p>
        </div>
      </Fade>
    </figure>
  );
}

/**
 * Пара нейтральных карточек «до/после» — обе визуально равнозначны, ни одна
 * не подсвечена акцентом. В отличие от `Contrast` (там правая колонка всегда
 * сильнее — это сравнение убеждений), здесь до появления фактических данных
 * ни один вариант не может быть выигрышным, и часть ТЗ прямо это требует.
 */
export function NeutralPair({
  left,
  right,
}: {
  left: { title: string; items: string[] };
  right: { title: string; items: string[] };
}) {
  return (
    <Breakout>
      <div className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-2">
        {[left, right].map((col, i) => (
          <Fade key={col.title} delay={i * 0.1} className="cell">
            <div className="h-full p-6 sm:p-8">
              <p className="label text-[var(--ink-faint)]">{col.title}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {col.items.map((t) => (
                  <li key={t} className="text-[15px] leading-snug text-[var(--ink-soft)] sm:text-[16px]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Fade>
        ))}
      </div>
    </Breakout>
  );
}
