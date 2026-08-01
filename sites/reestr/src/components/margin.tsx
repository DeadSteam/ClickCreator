/*
  Таблица маржи.

  Здесь, как и в прайсе на главной, нет ползунков. Причина та же: реестр -
  публикация, а не инструмент, и агентство должно иметь возможность
  распечатать эту страницу и положить её в папку с расчётами.

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
  разделитель разрядов для ru-RU (узкий неразрывный пробел против обычного),
  и серверная отрисовка перестаёт совпадать с клиентской.
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

export function Margin() {
  return (
    <div>
      {/*
        Прокрутка живёт на обёртке таблицы, а не на странице: четыре колонки
        на узком экране неизбежно шире 375 пикселей, но ехать горизонтально
        должна таблица, а не весь документ.
      */}
      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <caption className="field mb-4 text-left">
            ваша прибыль в месяц, рублей
          </caption>

          <thead>
            <tr className="border-t border-b border-[var(--color-ink)]">
              <th scope="col" className="field py-3 pr-6 font-normal">
                закупка в месяц
              </th>
              {MARKUP.map((m) => (
                <th
                  key={m}
                  scope="col"
                  className="field py-3 pr-6 text-right font-normal last:pr-0"
                >
                  наценка &times;{String(m).replace(".", ",")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {BUY.map((b) => (
              <tr
                key={b}
                className="row-hover border-b border-[var(--color-rule-hair)]"
              >
                <th
                  scope="row"
                  className="num py-4 pr-6 text-[14px] font-normal text-[var(--color-ink)]"
                >
                  {money(b)}
                </th>
                {MARKUP.map((m) => (
                  <td
                    key={m}
                    className="num py-4 pr-6 text-right text-[17px] last:pr-0"
                  >
                    {money(b * m - b)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
        Закупка списывается за фактические переходы, поэтому в месяц с
        недоработкой вы платите меньше, а чек клиенту выставляете прежний.
        Наценку мы не ограничиваем и не проверяем: цифры в шапке -
        распространённые на рынке, а не предписанные нами.
      </p>
    </div>
  );
}
