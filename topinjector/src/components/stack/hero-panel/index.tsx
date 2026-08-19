import type { ReactNode } from "react";

import type { HeroVariant } from "@/stack/hero-variants";

import {
  BackupToolPanel,
  ControlledTestPanel,
  DefaultPanel,
  OneToolDependencyPanel,
  PositionStuckPanel,
  ProfessionalControlPanel,
  ProveItPanel,
  QueryOrToolPanel,
  SecondMovePanel,
  SecondToolPanel,
  WrittenOffQueriesPanel,
} from "./panels";

const PANELS: Record<string, (props: { variant: HeroVariant }) => ReactNode> = {
  default: DefaultPanel,
  second_move: SecondMovePanel,
  one_tool_dependency: OneToolDependencyPanel,
  position_stuck: PositionStuckPanel,
  query_or_tool: QueryOrToolPanel,
  written_off_queries: WrittenOffQueriesPanel,
  prove_it: ProveItPanel,
  second_tool: SecondToolPanel,
  controlled_test: ControlledTestPanel,
  backup_tool: BackupToolPanel,
  professional_control: ProfessionalControlPanel,
};

/** Правая колонка Hero — уникальная instrument-панель для каждого angle. */
export function HeroPanel({ variant }: { variant: HeroVariant }) {
  const Panel = PANELS[variant.angle] ?? DefaultPanel;
  return <Panel variant={variant} />;
}

export { HeroFrame } from "./primitives";
