/** Сценарные блоки Hero — понятные мини-истории вместо абстрактных схем. */

export function ScenarioRail({
  steps,
}: {
  steps: {
    label: string;
    title: string;
    sub?: string;
    tone?: "grn" | "amb" | "mute" | "default";
  }[];
}) {
  return (
    <ol className="rail flex flex-col gap-5">
      {steps.map((step, i) => (
        <li key={step.title} className="rail-i">
          <span className="idx mr-2.5">{i + 1}</span>
          <div className="min-w-0 flex-1">
            <p className="hp-scenario-label">{step.label}</p>
            <p
              className={`hp-scenario-title ${
                step.tone === "grn"
                  ? "text-[var(--grn)]"
                  : step.tone === "amb"
                    ? "text-[var(--amb)]"
                    : step.tone === "mute"
                      ? "text-[var(--t-2)]"
                      : ""
              }`}
            >
              {step.title}
            </p>
            {step.sub && <p className="hp-scenario-sub">{step.sub}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ScenarioCompare({
  left,
  right,
}: {
  left: { kicker: string; title: string; items: string[]; muted?: boolean };
  right: { kicker: string; title: string; items: string[]; accent?: boolean };
}) {
  return (
    <div className="hp-compare">
      <article className={`hp-compare-col${left.muted ? " hp-compare-col-muted" : ""}`}>
        <p className="hp-kicker">{left.kicker}</p>
        <h3 className="hp-compare-heading">{left.title}</h3>
        <ul className="hp-compare-list">
          {left.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
      <article className={`hp-compare-col${right.accent ? " hp-compare-col-accent" : ""}`}>
        <p className="hp-kicker">{right.kicker}</p>
        <h3 className="hp-compare-heading">{right.title}</h3>
        <ul className="hp-compare-list">
          {right.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export function ScenarioFlow({
  nodes,
}: {
  nodes: { title: string; sub: string; tag: string; tone: "grn" | "amb" | "mute" }[];
}) {
  return (
    <div className="hp-node-flow">
      {nodes.map((node, i) => (
        <div key={node.title} className="hp-node-flow-item">
          {i > 0 && <div className="hp-node-flow-arrow" aria-hidden="true" />}
          <div className={`hp-node-flow-card hp-node-flow-card-${node.tone}`}>
            <div className="hp-node-flow-head">
              <span className={`hp-dot hp-dot-${node.tone}`} aria-hidden="true" />
              <span className={`tag shrink-0 ${node.tone === "grn" ? "tag-grn" : node.tone === "mute" ? "tag-mute" : ""}`}>
                {node.tag}
              </span>
            </div>
            <p className="hp-node-flow-title">{node.title}</p>
            <p className="hp-node-flow-sub">{node.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ScenarioChips({
  items,
}: {
  items: { label: string; sub: string }[];
}) {
  return (
    <div className="hp-chips">
      {items.map((item, i) => (
        <div key={item.label} className="hp-chip">
          <span className="hp-chip-num">{i + 1}</span>
          <div className="min-w-0">
            <p className="hp-chip-label">{item.label}</p>
            <p className="hp-chip-sub">{item.sub}</p>
          </div>
          {i < items.length - 1 && <span className="hp-chip-arrow" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

export function ScenarioHypothesisCards() {
  return (
    <div className="hp-hypothesis">
      <div className="hp-hypothesis-root">
        <span className="tag">измеримая задача</span>
        <p className="hp-hypothesis-root-sub">Один запрос с понятным baseline</p>
      </div>
      <div className="hp-hypothesis-branches">
        <article className="hp-hypothesis-card">
          <p className="hp-hypothesis-q">Запрос сложный?</p>
          <p className="hp-hypothesis-a">Ограничение может быть в задаче — не в инструменте</p>
        </article>
        <article className="hp-hypothesis-card hp-hypothesis-card-accent">
          <p className="hp-hypothesis-q">Инструмент не дал динамику?</p>
          <p className="hp-hypothesis-a">Проверьте второй ПФ-сценарий на том же запросе</p>
        </article>
      </div>
    </div>
  );
}

export function ScenarioMetricsStory() {
  return (
    <div className="hp-metrics-story">
      <div className="hp-metrics-story-row">
        <div className="hp-metrics-story-cell">
          <p className="hp-metric-label">клики</p>
          <p className="hp-metric-value hp-metric-value-grn">растут</p>
        </div>
        <div className="hp-metrics-story-cell">
          <p className="hp-metric-label">позиция</p>
          <p className="hp-metric-value">12 → 12</p>
        </div>
        <div className="hp-metrics-story-cell hp-metrics-story-cell-accent">
          <p className="hp-metric-label">что проверить</p>
          <p className="hp-metric-value hp-metric-value-amb">инструмент</p>
        </div>
      </div>
      <p className="hp-metrics-story-note">
        Клики идут, позиция стоит — возможно, дело не в стратегии, а в переменной «какой ПФ-сценарий вы используете».
      </p>
    </div>
  );
}

export function ScenarioStackLayers({
  layers,
}: {
  layers: { title: string; note: string; accent?: boolean }[];
}) {
  return (
    <div className="hp-stack-layers">
      {layers.map((layer) => (
        <div key={layer.title} className={`hp-stack-layer${layer.accent ? " hp-stack-layer-accent" : ""}`}>
          <p className="hp-stack-layer-title">{layer.title}</p>
          <p className="hp-stack-layer-note">{layer.note}</p>
        </div>
      ))}
    </div>
  );
}

export function ScenarioReadiness() {
  return (
    <ScenarioCompare
      left={{
        kicker: "сейчас",
        title: "Спокойный тест",
        items: [
          "Primary ПФ в рабочих задачах",
          "Reserve проверяется на одном запросе",
          "Есть время зафиксировать baseline",
        ],
      }}
      right={{
        kicker: "если отложить",
        title: "Срочный поиск",
        accent: true,
        items: [
          "Нужен запасной сценарий уже сегодня",
          "Reserve ещё не проверен на ваших данных",
          "Решение принимается вслепую",
        ],
      }}
    />
  );
}
