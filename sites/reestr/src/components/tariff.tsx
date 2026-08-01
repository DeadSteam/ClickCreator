import { RATES, VOLUME, rateAt } from "@/lib/content";

/*
  Выписка из прайс-листа.

  Здесь нет ни ползунков, ни кнопок, ни пересчёта - и это осознанный отказ,
  а не упрощение. На четырёх других сайтах цену считают интерактивно, потому
  что там расчёт и есть предложение. Реестр же продаёт публикацию, а у
  публикации прайс напечатан: его читают глазами, находят свою строку и при
  необходимости распечатывают.

  Практическое следствие: компонент серверный, в браузер уезжает готовая
  таблица без грамма JavaScript, и она целиком попадает в поисковую выдачу.
  Ползунок отдал бы роботу пустой блок.

  Матрица, а не список: по вертикали объём, по горизонтали скорость. Так
  видно сразу обе оси решения, а не одна.
*/
const fmt = (n: number) => {
  const [whole, frac] = n.toFixed(2).split(".");

  /*
    Разряды разделяем пробелом вручную, а не через Intl.NumberFormat: Node и
    браузер расходятся для ru-RU в самом символе разделителя (узкий неразрывный
    пробел против обычного), и серверная отрисовка перестаёт совпадать с
    клиентской. На странице, где таблица ставок и есть предложение, такое
    расхождение недопустимо.
  */
  let out = "";
  for (let i = 0; i < whole.length; i++) {
    if (i > 0 && (whole.length - i) % 3 === 0) out += " ";
    out += whole[i];
  }

  /* Копейки печатаем, только если они есть: "4,00" в прайсе выглядит опиской. */
  return frac === "00" ? out : `${out},${frac}`;
};

export function Tariff() {
  return (
    <div>
      {/*
        Прокрутка живёт на обёртке таблицы, а не на странице: четыре колонки
        на узком экране неизбежно шире 375 пикселей, но горизонтально ехать
        должна таблица, а не весь документ.
      */}
      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="mb-4 text-left">
            <span className="field">ставка за одну фразу в сутки, рублей</span>
          </caption>

          <thead>
            <tr className="border-t border-b border-[var(--color-ink)]">
              <th scope="col" className="field py-3 pr-6 font-normal">
                фраз в записи
              </th>
              {/*
                Подпись обёрнута в span намеренно. Класс .field гасит трекинг
                после последней буквы отрицательным margin-right, но у ячейки
                таблицы поля игнорируются (display: table-cell), и у правой
                колонки без padding этот «хвост» вылезает за край - таблица
                получает лишний пиксель ширины и вечную полосу прокрутки.
                На инлайновом span margin работает как задумано.
              */}
              {RATES.map((r) => (
                <th
                  key={r.plan}
                  scope="col"
                  className="py-3 pr-6 text-right font-normal"
                >
                  <span className="field">{r.plan}</span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {VOLUME.map((v) => (
              <tr
                key={v.from}
                className="row-hover border-b border-[var(--color-rule-hair)]"
              >
                <th
                  scope="row"
                  className="num py-4 pr-6 text-[14px] font-normal text-[var(--color-ink)]"
                >
                  {v.to ? `${v.from}-${v.to}` : `${v.from} и больше`}
                  {v.off > 0 ? (
                    <span className="field ml-3 text-[var(--color-stamp)]">
                      &minus;{Math.round(v.off * 100)} %
                    </span>
                  ) : null}
                </th>

                {RATES.map((r) => (
                  <td
                    key={r.plan}
                    className="num py-4 pr-6 text-right text-[17px]"
                  >
                    {fmt(rateAt(r.rate, v.off))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*
        Разобранный пример вместо калькулятора. Одна посчитанная строка
        снимает вопрос "а сколько это у меня" не хуже ползунка, а прочитать
        её можно за секунду и не трогая мышь.
      */}
      <div className="mt-8 grid gap-x-10 gap-y-4 border-t border-[var(--color-rule)] pt-6 md:grid-cols-[minmax(0,20rem)_1fr]">
        <p className="field">пример расчёта</p>
        <p className="max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
          Запись на <span className="num">120</span>{" "}
          фраз в режиме &laquo;Стандарт&raquo; попадает во вторую ступень
          объёма: ставка{" "}
          <span className="num">{fmt(rateAt(RATES[1].rate, VOLUME[1].off))}</span>{" "}
          рубля вместо <span className="num">{RATES[1].rate}</span>, то есть{" "}
          <span className="num">
            {fmt(rateAt(RATES[1].rate, VOLUME[1].off) * 120)}
          </span>{" "}
          рублей в сутки при полном расходе. Списывается по факту переходов:
          в сутки с недобором вы платите меньше.
        </p>
      </div>
    </div>
  );
}
