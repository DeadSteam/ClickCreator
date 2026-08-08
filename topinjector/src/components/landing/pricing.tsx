"use client";

import { Button } from "@/components/ui/button";
import { track } from "@/diagnostic/analytics";
import { PLANS, TELEGRAM, botLink } from "@/landing/config";
import { Appear } from "./sections";

/*
  Три тарифа. Выделенный отмечен линейкой и подписью, а не свечением и
  увеличенным масштабом: подсвеченная карточка посреди трёх одинаковых — самый
  узнаваемый штамп категории, и мастер-документ прямо требует его избегать.

  Кнопки ведут в бота: бесплатный старт на любом тарифе начинается с проверки
  подписки, и форма регистрации выдать лимиты не может.
*/
export function Pricing() {
  return (
    <>
      <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-3">
        {PLANS.map((p, i) => (
          <Appear key={p.id} delay={i * 0.08} className="bg-[var(--inset)]">
            <div
              className={`flex h-full flex-col p-7 sm:p-8 ${
                p.featured ? "border-t-2 border-[var(--accent)]" : ""
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] sm:text-[22px]">
                  {p.name}
                </h3>
                {p.featured && "badge" in p && (
                  <span className="label text-[var(--accent)]">{p.badge}</span>
                )}
              </div>

              <p className="mt-3 max-w-[32ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">
                {p.who}
              </p>

              {/*
                Цифра идёт моноширинным как показание прибора, а словесная цена
                — обычным текстом. Моноширинный трекинг разгонял «по запросу» в
                разреженную строку, которая читалась как ошибка вёрстки.
              */}
              <p className="mt-7 flex items-baseline gap-2">
                {/^[\d\s]+$/.test(p.price) ? (
                  <>
                    <span className="num text-[34px] leading-none font-semibold sm:text-[40px]">
                      {p.price}
                    </span>
                    <span className="text-[14px] text-[var(--ink-faint)]">₽ в месяц</span>
                  </>
                ) : (
                  <span className="text-[24px] leading-none font-semibold tracking-[-0.02em] sm:text-[28px]">
                    {p.price}
                  </span>
                )}
              </p>

              <ul className="mt-8 flex flex-1 flex-col gap-2.5 border-t border-[var(--rule-soft)] pt-6">
                {p.features.map((f) => (
                  <li key={f} className="text-[15px] leading-snug text-[var(--ink-soft)]">
                    {f}
                  </li>
                ))}
              </ul>

              {/*
                Командный тариф ведёт в поддержку, а не в бота активации: там
                обсуждают лимиты и условия, а не получают бесплатный пакет.
                Отправлять такой запрос в сценарий проверки подписки значит
                оборвать разговор на первом же шаге.
              */}
              <Button
                block
                variant={p.featured ? "primary" : "secondary"}
                href={
                  p.id === "team" ? TELEGRAM.channel : botLink(`pricing_${p.id}`)
                }
                target="_blank"
                rel="noopener"
                onClick={() => {
                  track("pricing_plan_click", { plan: p.id });
                  if (p.id !== "team") {
                    track("tg_cta_click", { place: `pricing_${p.id}` });
                    track("tg_bot_open", { place: `pricing_${p.id}` });
                  }
                }}
                className="mt-9"
              >
                {p.cta}
              </Button>
            </div>
          </Appear>
        ))}
      </div>

      <Appear delay={0.16}>
        <p className="mt-8 max-w-[64ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">
          Результат продвижения не зависит от выбранного тарифа. Тариф
          определяет лимиты и доступные функции.
        </p>
      </Appear>
    </>
  );
}
