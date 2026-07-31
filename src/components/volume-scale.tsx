/*
  Progressive volume pricing, drawn as a descending scale rather than a table.
  The competitor audit flagged this as a real conversion lever: it turns the
  price list into an upsell the visitor can see, instead of a flat rate card.
*/
const TIERS = [
  { from: "0", rate: "12,00", cut: "" },
  { from: "60к", rate: "11,50", cut: "4%" },
  { from: "120к", rate: "9,20", cut: "23%" },
  { from: "230к", rate: "7,70", cut: "36%" },
  { from: "580к", rate: "5,80", cut: "52%" },
  { from: "1 млн", rate: "4,20", cut: "65%" },
];

export function VolumeScale() {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[38rem] items-end gap-px">
        {TIERS.map((t, i) => {
          const h = 100 - i * 13;
          return (
            <div key={t.from} className="flex-1">
              <p className="num mb-2 text-[15px] font-semibold text-[var(--ink)] sm:text-[17px]">
                {t.rate}
              </p>
              <div
                className="w-full border-t-2 border-[var(--hot)] bg-[var(--inset)]"
                style={{ height: `${h}px` }}
              />
              <p className="num mt-2 text-[11px] text-[var(--ink-faint)]">от {t.from}</p>
              <p className="num text-[11px] text-[var(--hot)]">{t.cut || " "}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-5 max-w-[62ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">
        Ставка за переход падает автоматически по сумме пополнений за месяц.
        Считается по всем проектам сразу, поэтому агентствам выгоднее вести
        клиентов на одном балансе.
      </p>
    </div>
  );
}
