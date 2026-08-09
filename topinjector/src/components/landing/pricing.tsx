"use client";

import { track } from "@/diagnostic/analytics";
import { PLANS, TELEGRAM, botLink } from "@/landing/config";
import { Button } from "@/components/ui/button";
import { Appear } from "./sections";
import { groupDigits } from "@/format";

/*
  Три тарифа.

  Выделенный план инвертирован: графитовая карточка среди светлых. Раньше он был
  отмечен только линейкой сверху и подписью, и на общем светлом поле это
  читалось как случайная деталь — глаз находил рекомендованный тариф последним,
  хотя он должен находиться первым.

  Свечение и увеличенный масштаб для этой роли не берём: подсвеченная карточка
  посреди трёх одинаковых — самый узнаваемый штамп категории. Инверсия делает ту
  же работу материалом, а не эффектом, и в системе с зонами она уже есть.

  Кнопки ведут в бота: бесплатный старт на любом тарифе начинается с проверки
  подписки, и форма регистрации выдать лимиты не может.
*/

export function Pricing() {
  return (
    <>
      <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-3">
        {PLANS.map((p, i) => {
          const numeric = /^[\d\s ]+$/.test(p.price);

          return (
            <Appear
              key={p.id}
              delay={i * 0.08}
              className={p.featured ? "zone-settled cell" : "cell"}
            >
              {/*
                Сетка строк вместо потока: шапка, цена, список и кнопка встают
                на одни и те же высоты во всех трёх карточках. При обычном
                потоке описание из двух строк сдвигало цену соседа, и ряд
                разъезжался по диагонали.
              */}
              <div className="grid h-full grid-rows-[auto_auto_1fr_auto] p-7 sm:p-8">
                {/*
                  Шапке задана высота под две строки описания: у одного тарифа
                  оно короче, и без резерва его карточка поднимала разделитель
                  выше соседних — ряд разъезжался по диагонали.
                */}
                <div className="lg:min-h-[6.25rem]">
                  <div className="flex min-h-[1.5rem] items-baseline justify-between gap-4">
                    <h3 className="text-[20px] font-semibold tracking-[-0.02em] sm:text-[22px]">
                      {p.name}
                    </h3>
                    {p.featured && "badge" in p && (
                      <span className="label shrink-0 text-[var(--accent)]">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 max-w-[32ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">
                    {p.who}
                  </p>
                </div>

                {/*
                  Цифра идёт моноширинным как показание прибора, словесная цена
                  — обычным текстом: моноширинный трекинг разгонял «по запросу»
                  в разреженную строку, которая читалась как ошибка вёрстки.
                */}
                <p className="mt-8 flex min-h-[2.5rem] items-baseline gap-2">
                  {numeric ? (
                    <>
                      <span className="num text-[34px] leading-none font-semibold sm:text-[40px]">
                        {groupDigits(p.price)}
                      </span>
                      <span className="text-[14px] text-[var(--ink-faint)]">
                        ₽ в месяц
                      </span>
                    </>
                  ) : (
                    <span className="text-[24px] leading-none font-semibold tracking-[-0.02em] sm:text-[28px]">
                      {p.price}
                    </span>
                  )}
                </p>

                <ul className="mt-8 flex flex-col gap-2.5 border-t border-[var(--rule-soft)] pt-6">
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
                  variant={p.featured ? "primary" : "secondary"}
                  block
                  href={p.id === "team" ? TELEGRAM.channel : botLink(`pricing_${p.id}`)}
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
          );
        })}
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
