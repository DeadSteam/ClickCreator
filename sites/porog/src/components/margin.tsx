import { MODES } from "@/lib/content";

/*
  Пример расчёта вознаграждения.

  Без единого органа управления. На главной этого сайта уже стоит форма с
  подачей, и второй интерактивный расчёт на соседней странице был бы просто
  повторением приёма - а повторённый приём перестаёт быть приёмом.

  Здесь работает жанр: регламент не даёт калькулятор, он приводит пример
  расчёта отдельным пунктом. Специалисту этого достаточно, он умножает в уме
  лучше, чем аудитория, для которой обычно пишут калькуляторы.

  Компонент серверный: ни грамма JavaScript в браузер, весь текст попадает
  в поисковую выдачу.
*/
const money = (n: number) => {
  const s = Math.round(n).toString();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += " ";
    out += s[i];
  }
  return out;
};

/*
  Расчёт ведётся от ставки стандартного режима, чтобы пример не разошёлся с
  таблицей режимов на главной при правке тарифа.
*/
const RATE = MODES[1].rate;
const PHRASES = 150;
const DAYS = 30;
/* Скидка второй ступени объёма: 150 фраз попадает именно в неё. */
const OFF = 0.08;

export function Margin() {
  const buy = PHRASES * RATE * (1 - OFF) * DAYS;

  const CLAUSES = [
    {
      t: "Исходные данные",
      d: `Один проект клиента: ${PHRASES} фраз в стандартном режиме, ставка ${RATE} рублей за фразу в сутки, скидка за объём ${Math.round(OFF * 100)} процентов.`,
    },
    {
      t: "Ваша закупка за месяц",
      d: `${money(buy)} рублей при полном расходе. Списание идёт за фактические переходы, поэтому в месяц с недобором сумма выходит меньше, а чек клиенту вы выставляете прежний.`,
    },
    {
      t: "Ваше вознаграждение",
      d: `При наценке вдвое клиент платит ${money(buy * 2)} рублей, у вас остаётся ${money(buy)}. При наценке втрое - ${money(buy * 3)} и ${money(buy * 2)} соответственно. Верхнюю границу наценки мы не устанавливаем и не проверяем.`,
    },
    {
      t: "На нескольких проектах",
      d: "Скидка считается по суммарному количеству фраз на счёте, а не по каждому проекту отдельно: двадцать проектов по тридцать фраз дают ступень шестисот, а не двадцать ступеней по тридцать.",
    },
  ];

  return (
    <div className="panel chapter">
      <div className="border-b border-[var(--color-rule)] px-5 py-4 sm:px-7">
        <span className="mark">пример расчёта вознаграждения</span>
      </div>

      <ol className="px-5 py-2 sm:px-7">
        {CLAUSES.map((c) => (
          <li
            key={c.t}
            className="clause grid items-baseline gap-x-6 gap-y-2 border-b border-[var(--color-rule-hair)] py-5 last:border-b-0 md:grid-cols-[3rem_minmax(0,20ch)_1fr]"
          >
            <span
              aria-hidden
              className="clause-no num text-[11px] text-[var(--color-graphite-faint)]"
            />
            <span className="text-[16px] font-medium tracking-[-0.02em]">
              {c.t}
            </span>
            <span className="max-w-[64ch] text-[15px] leading-relaxed text-[var(--color-graphite-soft)]">
              {c.d}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
