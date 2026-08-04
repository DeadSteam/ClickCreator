/*
  Денежное число.

  Формат разрядов пишем руками, а не через Intl.NumberFormat: Node и браузер
  расходятся в том, какой пробел ставить для ru-RU, серверная отрисовка не
  совпадает с клиентской, и React перерисовывает поддерево с предупреждением.

  Разделитель разрядов - узкий неразрывный пробел (U+202F), а не обычный:
  обычный переносится на новую строку и рвёт число пополам.

  Отдельно нужен Amount. В моноширинном начертании любой пробел занимает целую
  ячейку, и на кегле в восемьдесят пунктов между разрядами открывается дыра в
  полсантиметра - число читается как два. Поэтому крупные суммы набираются
  группами с явным отступом в четверть кегля, а не пробелом.
*/

export const NBSP_THIN = " ";

export function money(n: number) {
  const s = Math.round(n).toString();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += NBSP_THIN;
    out += s[i];
  }
  return out;
}

export function Amount({
  value,
  className = "",
  style,
}: {
  value: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const groups = money(value).split(NBSP_THIN);

  return (
    <span className={className} style={style}>
      {groups.map((g, i) => (
        <span key={i} className={i ? "ml-[0.24em]" : undefined}>
          {g}
        </span>
      ))}
    </span>
  );
}
