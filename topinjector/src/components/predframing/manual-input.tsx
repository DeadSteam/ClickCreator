import type { ReactNode } from "react";

/*
  Технический маркер «требует ручной замены» — п.53A нового мастер-промпта.

  До этого пункта неподтверждённые факты (кейсы, тарифы, формула калькулятора,
  часть FAQ) были помечены тихой сноской `PENDING && <p>{DISCLAIMER}</p>` —
  тем же способом, что и на /service, /universal. Новая версия ТЗ прямо
  запрещает это для психологических спец-лендингов: неподтверждённые данные не
  должны выглядеть как обычный контент, их обязана выдавать отдельная заметная
  техническая карточка (п.53A.2), которую нельзя перепутать с production-текстом.

  Поэтому цвет — единственный на весь сайт янтарный (`--pending-*`), не токен
  бренда: это намеренно. Карточка обязана визуально выпадать из дизайн-системы
  продукта, а не встраиваться в неё, — иначе её никто не заметит и не заменит
  перед публикацией.
*/

const PENDING_INK = "#F0B429";
const PENDING_BORDER = "rgba(240, 180, 41, 0.4)";
const PENDING_BG = "rgba(240, 180, 41, 0.08)";

function WarningIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 shrink-0">
      <path
        d="M10 2.2 L18.3 17 H1.7 Z"
        fill="none"
        stroke={PENDING_INK}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M10 8 V11.6" stroke={PENDING_INK} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="10" cy="14.2" r="0.9" fill={PENDING_INK} />
    </svg>
  );
}

/**
 * Карточка формата п.53A.2:
 * ⚠ ТРЕБУЕТ РУЧНОЙ ЗАМЕНЫ / Тип материала / Что нужно вставить / Источник /
 * Критерий готовности. Не сгенерированная ошибка сборки — сознательно
 * промаркированный технический блок production-ТЗ.
 */
export function ManualInputPlaceholder({
  materialType,
  need,
  source,
  readyWhen,
  mobile,
  minHeight,
  className = "",
}: {
  /** [СКРИНШОТ / ТАРИФ / КЕЙС / ЦЕНА / БЕЗОПАСНОСТЬ / ДАННЫЕ] — п.53A.2. */
  materialType: string;
  need: ReactNode;
  source?: string;
  readyWhen?: string;
  /**
   * Мобильное представление будущего материала — п.56B.9: правила раздела
   * 53A действуют и на mobile, но реальный скриншот там нельзя просто
   * уменьшить, поэтому у карточки-заглушки скриншота есть отдельное поле для
   * того, как именно он покажется на телефоне (full screen / crop / carousel
   * / lightbox), а не только «что вставить».
   */
  mobile?: string;
  /** Для варианта «под размер будущего скриншота» — п.53A.10. */
  minHeight?: string;
  className?: string;
}) {
  return (
    <div
      role="note"
      aria-label="Требует ручной замены перед публикацией"
      className={`flex flex-col justify-center border p-6 sm:p-7 ${className}`}
      style={{ borderStyle: "dashed", borderColor: PENDING_BORDER, backgroundColor: PENDING_BG, minHeight }}
    >
      <div className="flex items-center gap-2.5">
        <WarningIcon />
        <span className="label" style={{ color: PENDING_INK, letterSpacing: "0.08em" }}>
          Требует ручной замены
        </span>
      </div>

      <p className="mt-4 text-[12px] font-semibold tracking-[0.06em] uppercase" style={{ color: PENDING_INK }}>
        {materialType}
      </p>

      <div className="mt-2.5 max-w-[54ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">{need}</div>

      {(source || readyWhen || mobile) && (
        <dl className="mt-4 flex flex-col gap-1.5 border-t pt-4" style={{ borderColor: PENDING_BORDER }}>
          {source && (
            <div className="flex gap-2 text-[12px] leading-relaxed text-[var(--ink-faint)]">
              <dt className="shrink-0 font-medium">Источник:</dt>
              <dd>{source}</dd>
            </div>
          )}
          {mobile && (
            <div className="flex gap-2 text-[12px] leading-relaxed text-[var(--ink-faint)]">
              <dt className="shrink-0 font-medium">Mobile presentation:</dt>
              <dd>{mobile}</dd>
            </div>
          )}
          {readyWhen && (
            <div className="flex gap-2 text-[12px] leading-relaxed text-[var(--ink-faint)]">
              <dt className="shrink-0 font-medium">Критерий готовности:</dt>
              <dd>{readyWhen}</dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}

/** Компактный инлайн-маркер — для одной строки внутри готовой сетки (например, одной ячейки Cards). */
export function ManualInputInline({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-full items-start gap-2.5 border p-6 sm:p-7"
      style={{ borderStyle: "dashed", borderColor: PENDING_BORDER, backgroundColor: PENDING_BG }}
    >
      <WarningIcon />
      <p className="text-[13px] leading-relaxed" style={{ color: PENDING_INK }}>
        {children}
      </p>
    </div>
  );
}

/**
 * Кейс-заглушка (п.56A.10): вместо правдоподобно выглядящей демо-карточки —
 * явная маркировка «здесь будет реальный кейс». Ни ниша, ни позиции, ни
 * период не подставляются даже для вида.
 */
export function CasePlaceholder({ index }: { index: number }) {
  return (
    <ManualInputPlaceholder
      materialType="Кейс"
      need={
        <>
          <span className="font-semibold" style={{ color: PENDING_INK }}>
            Здесь будет реальный кейс №{index}.
          </span>{" "}
          Проект или честно обезличенное описание, тематика, регион, запросы,
          исходная точка, период, динамика, результат, ограничения и
          цитата специалиста — если разрешено.
        </>
      }
      source="Подтверждённые кейсы Topinjector (клиент/поддержка)"
      readyWhen="Все поля заполнены реальными данными, цитата согласована"
      className="h-full"
    />
  );
}

/** Тариф-заглушка (п.53A.4): три опубликованных тарифа ждут подтверждения — не показываем их как готовую цену. */
export function TariffPlaceholder({ slot }: { slot: string }) {
  return (
    <ManualInputPlaceholder
      materialType="Тариф"
      need={
        <>
          Тариф «{slot}»: название, стоимость, период, количество проектов,
          количество запросов / лимитов, дополнительные условия.
        </>
      }
      source="Прайсинг Topinjector"
      readyWhen="Цена и лимиты подтверждены владельцем продукта"
      className="h-full"
    />
  );
}
