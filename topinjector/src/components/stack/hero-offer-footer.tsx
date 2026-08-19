import { HERO_OFFER_NOTE } from "@/stack/hero-variants";

import { HeroReadout } from "./hero-readout";

/** Общий оффер Hero — не меняется по angle (разд. «Блок 1. Hero» ТЗ). */
export function HeroOfferFooter() {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <HeroReadout cap="на первый тест" n="3000" u="кликов" />
        <HeroReadout cap="стоимость теста" n="0" u="₽" tone="var(--grn)" right />
      </div>
      <p className="caveat mt-6">{HERO_OFFER_NOTE}</p>
    </>
  );
}
