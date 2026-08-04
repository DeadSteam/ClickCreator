import { RATES, VOLUME } from "@/lib/content";

/*
  Расчёт бюджета.

  На этом сайте он напечатан, а не считается ползунком. Это отказ по жанру, а
  не экономия: остальные четыре варианта считают вживую, потому что там расчёт
  и есть предложение. Здесь предложение - публикация, а у публикации цену
  печатают: её читают глазами, находят свою строку и распечатывают бухгалтеру.

  По вертикали объём, по горизонтали скорость. Две оси решения сразу: ползунок
  показал бы одно значение и спрятал остальные, а таблица даёт увидеть и
  соседние - в том числе следующую ступень скидки, ради которой имеет смысл
  добавить фраз.

  Компонент серверный: ни грамма JavaScript в браузер, вся таблица попадает
  в поисковую выдачу.
*/
const rateAt = (base: number, off: number) =>
  Math.round(base * (1 - off) * 100) / 100;

const price = (n: number) =>
  Number.isInteger(n) ? String(n) : n.toFixed(2).replace(".", ",");

export function Budget() {
  return (
    <div>
      {/*
        Прокрутка живёт на обёртке таблицы, а не на странице: четыре колонки
        на узком экране неизбежно шире 375 пикселей, но ехать горизонтально
        должна таблица, а не вся полоса.
      */}
      <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="border-t border-b border-[var(--color-ink)]">
              <th
                scope="col"
                className="py-5 pr-10 text-[17px] font-normal text-[var(--color-ink-soft)]"
              >
                Фраз в работе
              </th>
              {RATES.map((r) => (
                <th
                  key={r.plan}
                  scope="col"
                  className="py-5 pr-10 text-right text-[17px] font-normal text-[var(--color-ink-soft)] last:pr-0"
                >
                  {r.plan}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {VOLUME.map((v) => (
              <tr
                key={v.from}
                className="row-hover border-b border-[var(--color-rule-soft)]"
              >
                <th
                  scope="row"
                  className="py-6 pr-10 text-[18px] font-normal text-[var(--color-ink-soft)]"
                >
                  <span className="num">
                    {v.from}
                    {v.to ? `–${v.to}` : " и больше"}
                  </span>
                  {v.off > 0 ? (
                    <span className="ml-3 text-[var(--color-stamp)]">
                      −{Math.round(v.off * 100)} %
                    </span>
                  ) : null}
                </th>
                {RATES.map((r) => (
                  <td
                    key={r.plan}
                    className="num py-6 pr-10 text-right text-[24px] last:pr-0"
                  >
                    {price(rateAt(r.rate, v.off))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 max-w-[60ch] text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
        В ячейках — цена одной фразы в сутки, рублей, со скидкой за объём.
        Скидка применяется сама, запрашивать её не нужно. Пример: 250 фраз в
        стандартном режиме — это{" "}
        <span className="num">{price(rateAt(RATES[1].rate, VOLUME[2].off))}</span>{" "}
        ₽ за фразу и{" "}
        <span className="num">
          {Math.round(250 * rateAt(RATES[1].rate, VOLUME[2].off))}
        </span>{" "}
        ₽ в сутки на весь проект.
      </p>
    </div>
  );
}
