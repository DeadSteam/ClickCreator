import type { HeroVariant } from "@/stack/hero-variants";

import {
  HeroFrame,
  HeroFootnote,
  HeroInsight,
  MetricGrid,
  MetricTile,
  ProtocolRail,
  QueryTable,
  SpecBlock,
  StackRow,
  StackRows,
} from "./primitives";
import {
  ScenarioChips,
  ScenarioCompare,
  ScenarioFlow,
  ScenarioHypothesisCards,
  ScenarioMetricsStory,
  ScenarioRail,
  ScenarioReadiness,
  ScenarioStackLayers,
} from "./scenarios";

type PanelProps = { variant: HeroVariant };

export function DefaultPanel(_props: PanelProps) {
  return (
    <HeroFrame kicker="рабочий стек" title="Второй сценарий — без смены первого" tag="схема">
      <ScenarioChips
        items={[
          { label: "Специалист", sub: "управляет стеком" },
          { label: "Инструменты", sub: "несколько, не один" },
          { label: "Задача", sub: "одна измеримая" },
          { label: "Данные", sub: "ваш вывод" },
        ]}
      />

      <StackRows>
        <StackRow
          title="Текущий ПФ-инструмент"
          sub="остаётся в рабочих задачах"
          tag="работает"
          tone="grn"
        />
        <StackRow
          title="TopInjector"
          sub="ограниченный контрольный тест"
          tag="на проверке"
          tone="amb"
        />
      </StackRows>
    </HeroFrame>
  );
}

export function SecondMovePanel(_props: PanelProps) {
  return (
    <HeroFrame kicker="запасной ход" title="Когда первый ПФ не даёт динамику" tag="сценарий">
      <ScenarioRail
        steps={[
          {
            label: "ситуация",
            title: "Текущий ПФ перестал давать нужную динамику",
            sub: "Это не повод менять весь стек",
            tone: "mute",
          },
          {
            label: "действие",
            title: "ПФ #1 остаётся в рабочих задачах",
            sub: "Добавляете ПФ #2 — TopInjector",
            tone: "grn",
          },
          {
            label: "тест",
            title: "Один запрос · baseline · 3000 кликов",
            sub: "Измеримая задача, не «самый сложный» запрос",
          },
          {
            label: "вывод",
            title: "Победителя заранее не выбирают",
            sub: "Сравнивают фактическую динамику на ваших данных",
            tone: "amb",
          },
        ]}
      />
    </HeroFrame>
  );
}

export function OneToolDependencyPanel(_props: PanelProps) {
  return (
    <HeroFrame kicker="профессиональный стек" title="Зависимость от одного инструмента" tag="сравнение">
      <ScenarioCompare
        left={{
          kicker: "1 пф",
          title: "Один сценарий",
          muted: true,
          items: [
            "Работает — используете как раньше",
            "Не работает — ищете альтернативу срочно",
            "Нет запасного проверенного варианта",
          ],
        }}
        right={{
          kicker: "2 пф",
          title: "Выбор под задачу",
          accent: true,
          items: [
            "Первый инструмент — основные задачи",
            "Второй — проверен на ваших данных",
            "Решаете сами, когда какой полезнее",
          ],
        }}
      />

      <HeroFootnote>Иллюстративный тезис: 1 ПФ = 1 сценарий · 2 ПФ = выбор. Не формула.</HeroFootnote>
    </HeroFrame>
  );
}

export function PositionStuckPanel(_props: PanelProps) {
  return (
    <HeroFrame kicker="когда динамика остановилась" title="Клики растут — позиция стоит" tag="диагностика">
      <ScenarioMetricsStory />

      <HeroInsight>
        Проверьте переменную «инструмент» на измеримой задаче — без смены всей стратегии.
      </HeroInsight>
    </HeroFrame>
  );
}

export function QueryOrToolPanel(_props: PanelProps) {
  return (
    <HeroFrame kicker="проверка гипотезы" title="Две разные причины — два разных вывода" tag="развилка">
      <ScenarioHypothesisCards />

      <HeroInsight>
        Не решайте заранее — запустите второй ПФ-сценарий на том же запросе и посмотрите на данные.
      </HeroInsight>
    </HeroFrame>
  );
}

export function WrittenOffQueriesPanel(_props: PanelProps) {
  return (
    <HeroFrame kicker="ещё одна проверка" title="Вернитесь к одному «списанному» запросу" tag="запрос">
      <HeroInsight>
        Не ко всем сразу — выберите задачу с понятной историей позиций и проверьте второй сценарий.
      </HeroInsight>

      <QueryTable
        rows={[
          { q: "стяжка пола под ключ", baseline: "—", status: "ожидает", state: "muted" },
          { q: "полусухая стяжка цена", baseline: "18", status: "для теста", state: "active" },
          { q: "наливной пол монтаж", baseline: "24", status: "ожидает", state: "muted" },
          { q: "стяжка пола стоимость", baseline: "—", status: "списан", state: "crossed" },
        ]}
      />
    </HeroFrame>
  );
}

export function ProveItPanel(_props: PanelProps) {
  return (
    <HeroFrame kicker="не верить. проверить." title="Сначала baseline — потом вывод" tag="протокол">
      <ProtocolRail
        steps={[
          {
            n: 1,
            title: "Baseline",
            sub: "Зафиксируйте позицию до теста — например, 18-е место",
          },
          {
            n: 2,
            title: "Test",
            sub: "Запустите TopInjector на том же запросе, 3000 кликов",
          },
          {
            n: 3,
            title: "Ваш вывод",
            sub: "Сравнили динамику — решение принимаете вы, не реклама",
            pending: true,
          },
        ]}
      />

      <MetricGrid>
        <MetricTile label="ваш запрос" value="18" note="baseline до теста" />
        <MetricTile label="после теста" value="?" note="ваши данные" tone="amb" />
      </MetricGrid>
    </HeroFrame>
  );
}

export function SecondToolPanel(_props: PanelProps) {
  return (
    <HeroFrame kicker="не миграция" title="Два инструмента в одном стеке" tag="дополнение">
      <ScenarioFlow
        nodes={[
          {
            title: "Текущий ПФ",
            sub: "Все проекты и процессы остаются как есть",
            tag: "работает",
            tone: "grn",
          },
          {
            title: "TopInjector",
            sub: "Отдельный тест на одной ограниченной задаче",
            tag: "на проверке",
            tone: "amb",
          },
        ]}
      />

      <HeroInsight>Не переносите проекты — новый инструмент доказывает себя на одной задаче.</HeroInsight>
    </HeroFrame>
  );
}

export function ControlledTestPanel(_props: PanelProps) {
  return (
    <HeroFrame kicker="controlled test" title="Четыре условия честного теста" tag="baseline">
      <SpecBlock
        rows={[
          { k: "Задача", v: "одна, с понятной историей" },
          { k: "Baseline", v: "зафиксирован до запуска" },
          { k: "Инструмент", v: "TopInjector — второй в стеке" },
          { k: "Вывод", v: "только по фактической динамике" },
        ]}
      />

      <div className="hp-callout">
        Хороший тест начинается не с обещания «ТОП-3» — он начинается с исходной точки.
      </div>
    </HeroFrame>
  );
}

export function BackupToolPanel(_props: PanelProps) {
  return (
    <HeroFrame kicker="проверенная альтернатива" title="Reserve лучше проверить заранее" tag="готовность">
      <ScenarioReadiness />
    </HeroFrame>
  );
}

export function ProfessionalControlPanel(_props: PanelProps) {
  return (
    <HeroFrame kicker="управление стеком" title="Вы выбираете инструмент под задачу" tag="контроль">
      <ScenarioStackLayers
        layers={[
          { title: "Аналитика и мониторинг", note: "несколько источников данных" },
          { title: "Ссылки и контент", note: "разные поставщики и форматы" },
          { title: "ПФ-инструмент #1", note: "основной рабочий сценарий" },
          {
            title: "ПФ-инструмент #2 — TopInjector",
            note: "проверенный запасной сценарий",
            accent: true,
          },
        ]}
      />
    </HeroFrame>
  );
}
