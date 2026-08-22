import { HERO_OFFER, HERO_OFFER_NOTE } from "@/stack/hero-variants";

import { HeroReadout } from "./hero-readout";

/**
 * Общий оффер Hero — не меняется по angle (разд. «Блок 1. Hero» ТЗ).
 *
 * Глазами оффер читается парой показаний: объём слева, цена справа. Ухом —
 * нет: скринридер произнёс бы «на первый тест 3000 кликов стоимость теста 0
 * рублей», четыре несвязанных числа подряд. Поэтому у пары есть общее имя —
 * та самая формулировка оффера из ТЗ, дословно.
 */
export function HeroOfferFooter() {
  return (
    <>
      <div className="grid grid-cols-2 gap-6" role="group" aria-label={HERO_OFFER}>
        <HeroReadout cap="на первый тест" n="3000" u="кликов" />
        <HeroReadout cap="стоимость теста" n="0" u="₽" tone="var(--grn)" right />
      </div>
      <p className="caveat mt-6">{HERO_OFFER_NOTE}</p>
    </>
  );
}
