/** Показание Hero-панели: число + названная величина (общий примитив /stack). */
export function HeroReadout({
  cap,
  n,
  u,
  size = 42,
  tone,
  right,
}: {
  cap: string;
  n: string;
  u?: string;
  size?: number;
  tone?: string;
  right?: boolean;
}) {
  return (
    <div className={right ? "rd-r" : undefined}>
      <p className="rd" style={{ ["--rd" as string]: `${size}px`, color: tone }}>
        <span className="rd-n">{n}</span>
        {u && <span className="rd-u">{u}</span>}
      </p>
      <span className="rd-cap">{cap}</span>
    </div>
  );
}
