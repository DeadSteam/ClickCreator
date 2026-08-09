"use client";

import { Rise } from "./primitives";

/*
  Три схемы, ради которых статья написана. Остальные строятся из примитивов, а
  эти несут собственный смысл и потому нарисованы отдельно.
*/

/**
 * Таймлайн проекта. Главный визуальный объект статьи: окно сомнения занимает
 * около сорока процентов полосы, как задано в [VISUAL].
 *
 * Полоса горизонтальная, хотя ТЗ рисует цепочку сверху вниз. Здесь именно
 * время, а не последовательность шагов, и горизонталь читается как время без
 * пояснений. Вертикальная колонка из семи ступеней к тому же не дала бы увидеть
 * пропорцию — а вся суть схемы в том, какую долю проекта занимает окно.
 */
export function DoubtWindow() {
  return (
    <figure className="mt-10">
      <Rise>
        <div className="flex h-14 w-full overflow-hidden border border-[var(--rule)]">
          <div className="flex w-[26%] items-center justify-center border-r border-[var(--rule)] px-1">
            <span className="label text-center text-[var(--ink-faint)]">старт</span>
          </div>

          <div
            className="relative flex w-[40%] items-center justify-center border-r border-[var(--rule)] px-1"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--accent) 0 1px, transparent 1px 7px)",
            }}
          >
            {/* Подложка: поверх штриховки подпись иначе теряет контур. */}
            <span className="label bg-[var(--reading-bg)] px-2 py-1 text-center font-semibold text-[var(--ink)]">
              окно сомнения
            </span>
          </div>

          <div className="flex w-[34%] items-center justify-center px-1">
            <span className="label text-center text-[var(--ink-faint)]">доверие</span>
          </div>
        </div>
      </Rise>

      {/* Вехи. На узком экране встают в колонку, чтобы подписи не наезжали. */}
      <div className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-3">
        {[
          {
            t: "До окна",
            items: ["Подписание договора", "Начало работ", "Работа уже идёт"],
          },
          {
            t: "Внутри окна",
            items: [
              "Клиент заплатил",
              "Ожидания сформированы",
              "Доказательства ещё нет",
            ],
            accent: true,
          },
          {
            t: "После окна",
            items: [
              "Первые измеримые изменения",
              "Рост доверия",
              "Долгосрочный результат",
            ],
          },
        ].map((g, i) => (
          <Rise key={g.t} delay={i * 0.1}>
            <div>
              <p
                className="label"
                style={{ color: g.accent ? "var(--accent)" : "var(--ink-faint)" }}
              >
                {g.t}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {g.items.map((s) => (
                  <li key={s} className="text-[14px] leading-snug text-[var(--ink-soft)]">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Rise>
        ))}
      </div>

      <Rise delay={0.24}>
        <figcaption className="mt-7 max-w-[62ch] text-[15px] leading-relaxed text-[var(--ink-faint)]">
          Именно здесь теряется большинство клиентов. Не потому, что SEO плохое.
          А потому, что клиент пока не получил подтверждение правильности своего
          выбора.
        </figcaption>
      </Rise>
    </figure>
  );
}

/**
 * Тревога клиента и количество доказательств. Точка пересечения — главный
 * момент схемы, поэтому она единственная отмечена и подписана.
 */
export function CrossoverChart() {
  return (
    <figure className="mt-10">
      <Rise>
        <svg
          viewBox="0 0 640 300"
          className="h-auto w-full"
          role="img"
          aria-label="График: тревога клиента растёт и достигает максимума в середине окна сомнения, затем падает. Количество доказательств растёт с нуля. В точке их пересечения клиент начинает доверять."
        >
          <line x1="40" y1="16" x2="40" y2="248" stroke="var(--rule)" strokeWidth="1" />
          <line x1="40" y1="248" x2="620" y2="248" stroke="var(--rule)" strokeWidth="1" />

          {/* Тревога: растёт, пик в середине окна, затем резко падает. */}
          <path
            d="M40 214 C 130 206, 190 92, 268 62 C 320 44, 352 74, 392 138 C 430 198, 500 230, 620 240"
            fill="none"
            stroke="var(--color-risk-critical)"
            strokeWidth="2"
          />

          {/*
            Доказательства идут брендовым акцентом, а не статусным цветом
            шкалы: это та самая величина, ради которой существует продукт, и
            она должна читаться как его цвет.
          */}
          <path
            d="M40 246 C 160 244, 250 224, 330 174 C 410 124, 500 62, 620 34"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          {/* Точка пересечения. */}
          <circle cx="368" cy="156" r="5" fill="var(--ink)" />
          <line
            x1="368"
            y1="156"
            x2="368"
            y2="248"
            stroke="var(--ink)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />

          <text
            x="52"
            y="34"
            className="label"
            fill="var(--color-risk-critical)"
            style={{ fontSize: 10 }}
          >
            тревога клиента
          </text>
          <text
            x="470"
            y="24"
            className="label"
            fill="var(--accent)"
            style={{ fontSize: 10 }}
          >
            доказательства
          </text>
          <text
            x="380"
            y="150"
            className="label"
            fill="var(--ink)"
            style={{ fontSize: 10 }}
          >
            точка доверия
          </text>

          <text
            x="40"
            y="272"
            className="label"
            fill="var(--ink-faint)"
            style={{ fontSize: 9 }}
          >
            старт проекта
          </text>
          <text
            x="620"
            y="272"
            className="label"
            textAnchor="end"
            fill="var(--ink-faint)"
            style={{ fontSize: 9 }}
          >
            время
          </text>
        </svg>
      </Rise>

      <Rise delay={0.14}>
        <figcaption className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-[var(--ink-faint)]">
          Когда доказательств становится больше, чем тревоги, клиент начинает
          доверять.
        </figcaption>
      </Rise>
    </figure>
  );
}

/**
 * Две временные линии и то, что их соединяет. Главная мысль схемы: сервис не
 * заменяет SEO, он связывает график работ с графиком доверия.
 */
export function TwoTracks() {
  const track = (title: string, items: string[], color: string) => (
    <div>
      <p className="label" style={{ color }}>
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map((s) => (
          <li key={s} className="text-[15px] leading-snug text-[var(--ink-soft)]">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <figure className="mt-10">
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
        <Rise>
          {track(
            "системное SEO",
            [
              "Техническая оптимизация",
              "Контент",
              "Структура",
              "Коммерческие факторы",
              "Рост проекта",
            ],
            "var(--ink-faint)",
          )}
        </Rise>
        <Rise delay={0.12}>
          {track(
            "доверие клиента",
            ["Ожидание", "Сомнения", "Вопросы", "Недоверие"],
            "var(--color-risk-critical)",
          )}
        </Rise>
      </div>

      {/*
        Соединитель. Лежит поперёк обеих колонок именно потому, что схема
        утверждает: ранний результат не третья колонка, а связь между двумя
        существующими.
      */}
      <Rise delay={0.22}>
        <div className="mt-9 border-t-2 border-[var(--accent)] pt-5">
          <p className="text-[19px] leading-snug font-extrabold tracking-[-0.03em] sm:text-[23px]">
            Ранний измеримый результат
          </p>
          <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
            Соединяет две линии: пока системная работа набирает силу, доверие
            получает подтверждение и продолжает расти вместе с проектом.
          </p>
        </div>
      </Rise>
    </figure>
  );
}

/** Замкнутый круг объяснений. Цикл, а не цепочка: у него нет выхода. */
export function ExplanationLoop() {
  const steps = [
    "Объяснение",
    "Временное успокоение",
    "Новый вопрос",
    "Новое объяснение",
    "Ещё больше ожиданий",
    "Потеря доверия",
  ];

  return (
    <figure className="mt-10">
      <ol className="grid gap-px bg-[var(--rule-soft)] sm:grid-cols-3">
        {steps.map((s, i) => (
          <Rise key={s} delay={i * 0.08} className="bg-[var(--inset)]">
            <li className="flex h-full items-baseline gap-3.5 p-5">
              <span className="num shrink-0 text-[11px] text-[var(--ink-faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="text-[15px] leading-snug"
                style={
                  i === steps.length - 1
                    ? { color: "var(--color-risk-critical)", fontWeight: 600 }
                    : { color: "var(--ink-soft)" }
                }
              >
                {s}
              </span>
            </li>
          </Rise>
        ))}
      </ol>

      <Rise delay={0.5}>
        <p className="mt-5 flex items-center gap-3 text-[14px] text-[var(--ink-faint)]">
          <span aria-hidden="true" className="num">
            ↺
          </span>
          Круг замыкается: каждое объяснение возвращает разговор к ожиданию.
        </p>
      </Rise>
    </figure>
  );
}
