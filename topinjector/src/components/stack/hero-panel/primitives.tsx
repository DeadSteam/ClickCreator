import type { ReactNode } from "react";

import { HeroOfferFooter } from "../hero-offer-footer";

export function HeroFrame({
  kicker,
  title,
  tag,
  children,
}: {
  kicker: string;
  title: string;
  tag: string;
  children: ReactNode;
}) {
  return (
    <div className="surf hp p-7 sm:p-8">
      <header className="hp-head">
        <div className="hp-head-in">
          <p className="hp-kicker">{kicker}</p>
          <h2 className="hp-title">{title}</h2>
        </div>
        <span className="tag tag-mute shrink-0">{tag}</span>
      </header>
      <div className="hp-body">{children}</div>
      <div className="hp-offer">
        <HeroOfferFooter />
      </div>
    </div>
  );
}

export function HeroCanvas({ children, tight }: { children: ReactNode; tight?: boolean }) {
  return <div className={`hp-canvas${tight ? " hp-canvas-tight" : ""}`}>{children}</div>;
}

export function HeroInsight({ children }: { children: ReactNode }) {
  return <p className="hp-insight">{children}</p>;
}

export function HeroFootnote({ children }: { children: ReactNode }) {
  return <p className="hp-footnote">{children}</p>;
}

export function StatusDot({ tone }: { tone: "grn" | "amb" | "mute" }) {
  return <span className={`hp-dot hp-dot-${tone}`} aria-hidden="true" />;
}

export function StackRow({
  title,
  sub,
  tag,
  tone,
}: {
  title: string;
  sub: string;
  tag: string;
  tone: "grn" | "amb" | "mute";
}) {
  return (
    <div className="hp-row">
      <StatusDot tone={tone} />
      <div className="hp-row-in">
        <span className="hp-row-title">{title}</span>
        <span className="hp-row-sub">{sub}</span>
      </div>
      <span className={`tag shrink-0 ${tone === "grn" ? "tag-grn" : tone === "amb" ? "" : "tag-mute"}`}>
        {tag}
      </span>
    </div>
  );
}

export function StackRows({ children }: { children: ReactNode }) {
  return <div className="hp-rows">{children}</div>;
}

export function MetricTile({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone?: "grn" | "amb" | "default";
}) {
  return (
    <div className="hp-metric">
      <p className="hp-metric-label">{label}</p>
      <p
        className={`hp-metric-value${
          tone === "grn" ? " hp-metric-value-grn" : tone === "amb" ? " hp-metric-value-amb" : ""
        }`}
      >
        {value}
      </p>
      <p className="hp-metric-note">{note}</p>
    </div>
  );
}

export function MetricGrid({ children }: { children: ReactNode }) {
  return <div className="hp-metric-grid">{children}</div>;
}

export function ChipRow({ children }: { children: ReactNode }) {
  return <div className="hp-chip-row">{children}</div>;
}

export function ProtocolRail({
  steps,
}: {
  steps: { n: number; title: string; sub: string; pending?: boolean }[];
}) {
  return (
    <ol className="rail flex flex-col gap-5">
      {steps.map((step) => (
        <li key={step.n} className="rail-i">
          <span className={`idx mr-2.5 ${step.pending ? "text-[var(--amb)]" : ""}`}>{step.n}</span>
          <div className="min-w-0">
            <p className={`hp-protocol-title ${step.pending ? "text-[var(--amb)]" : ""}`}>{step.title}</p>
            <p className="hp-protocol-sub">{step.sub}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function LayerStack({
  layers,
}: {
  layers: { label: string; title: string; accent?: boolean }[];
}) {
  return (
    <div className="hp-layer-stack">
      {layers.map((layer) => (
        <div key={layer.title} className={`hp-layer ${layer.accent ? "hp-layer-accent" : ""}`}>
          <span className="hp-layer-label">{layer.label}</span>
          <span className="hp-layer-title">{layer.title}</span>
        </div>
      ))}
    </div>
  );
}

export function QueryTable({
  rows,
}: {
  rows: { q: string; baseline: string; status: string; state: "active" | "muted" | "crossed" }[];
}) {
  return (
    <div className="hp-table">
      <div className="hp-table-meta">
        <span className="hp-table-meta-k">проект</span>
        <span className="hp-table-meta-v">stjazhka-kazan.ru</span>
        <span className="hp-table-meta-k ml-auto">регион</span>
        <span className="hp-table-meta-v">казань</span>
      </div>
      <div className="hp-table-head">
        <span>запрос</span>
        <span className="text-right">baseline</span>
        <span className="text-right">статус</span>
      </div>
      {rows.map((row) => (
        <div
          key={row.q}
          className={`hp-table-row ${
            row.state === "active"
              ? "hp-table-row-active"
              : row.state === "crossed"
                ? "hp-table-row-muted"
                : ""
          }`}
        >
          <span className={`hp-table-q ${row.state === "crossed" ? "hp-table-q-crossed" : ""}`}>{row.q}</span>
          <span className={`hp-table-num ${row.state === "active" ? "hp-table-num-amb" : ""}`}>
            {row.baseline}
          </span>
          <span className="text-right">
            {row.state === "active" ? (
              <span className="tag">для теста</span>
            ) : (
              <span className="stk-sm text-[12px]">{row.status}</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SpecBlock({
  rows,
}: {
  rows: { k: string; v: string }[];
}) {
  return (
    <dl className="hp-spec">
      {rows.map((row, i) => (
        <div key={row.k} className="spec">
          <dt className="spec-k">
            <span>
              <span className="idx mr-4">{i + 1}</span>
              {row.k}
            </span>
          </dt>
          <dd className="stk-sm text-[15px] text-[var(--amb)]">{row.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CompareCard({
  muted,
  kicker,
  title,
  note,
}: {
  muted?: boolean;
  kicker: string;
  title: string;
  note: string;
}) {
  return (
    <div className={`hp-compare-card${muted ? " hp-compare-card-muted" : ""}`}>
      <p className="hp-kicker">{kicker}</p>
      <p className="hp-compare-title">{title}</p>
      <p className="hp-metric-note">{note}</p>
    </div>
  );
}
