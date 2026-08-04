/*
  Таблица маржи.

  Здесь, как и в прайсе на главной, нет ползунков. Причина та же: реестр -
  публикация, а не инструмент, и агентство должно иметь возможность
  распечатать страницу и положить её в папку с расчётами.

  Матрица, а не калькулятор: специалист редко знает точную закупку заранее,
  зато сразу видит порядок цифры на своей строке и на соседних. Ползунок
  показал бы одно значение и спрятал остальные.

  Компонент серверный: в браузер уезжает готовая таблица без грамма
  JavaScript, и она целиком попадает в поисковую выдачу.
*/
const BUY = [10000, 25000, 50000, 100000, 200000] as const;
const MARKUP = [1.5, 2, 3] as const;

/*
  Формат вручную, а не через Intl.NumberFormat: Node и браузер разводят
  разделитель разрядов для ru-RU, и серверная отрисовка перестаёт совпадать с
  клиентской. Разделитель - узкий неразрывный пробел: обычный переносится на
  новую строку и рвёт число пополам.
*/
const money = (n: number) => {
  const s = Math.round(n).toString();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += " ";
    out += s[i];
  }
  return out;
};

export function Margin() {
  return (
    <div>
      {/*
        Прокрутка живёт на обёртке таблицы, а не на странице: четыре колонки
        на узком экране неизбежно шире 375 пикселей, но ехать горизонтально
        должна таблица, а не весь документ.
      */}
      <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="border-t border-b border-[var(--color-ink)]">
              <th
                scope="col"
                className="py-5 pr-10 text-[17px] font-normal text-[var(--color-ink-soft)]"
              >
                Закупка в месяц
              </th>
              {MARKUP.map((m) => (
                <th
                  key={m}
                  scope="col"
                  className="py-5 pr-10 text-right text-[17px] font-normal text-[var(--color-ink-soft)] last:pr-0"
                >
                  наценка ×{String(m).replace(".", ",")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {BUY.map((b) => (
              <tr
                key={b}
                className="row-hover border-b border-[var(--color-rule-soft)]"
              >
                <th
                  scope="row"
                  className="num py-6 pr-10 text-[18px] font-normal text-[var(--color-ink-soft)]"
                >
                  {money(b)}
                </th>
                {MARKUP.map((m) => (
                  <td
                    key={m}
                    className="num py-6 pr-10 text-right text-[24px] last:pr-0"
                  >
                    {money(b * m - b)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 max-w-[60ch] text-[18px] leading-relaxed text-[var(--color-ink-soft)]">
        В ячейках — ваша прибыль в месяц, рублей. Закупка списывается за
        фактические переходы, поэтому в месяц с недоработкой вы платите меньше,
        а чек клиенту выставляете прежний. Наценку мы не ограничиваем и не
        проверяем: множители в шапке распространены на рынке, а не предписаны
        нами.
      </p>
    </div>
  );
}
