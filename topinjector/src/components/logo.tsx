/*
  Временный знак: пламя в брендовом оранжевом. Настоящий знак ставится по
  инструкции в README-BRAND.md.

  Знак набран в одном тоне с акцентом, а не в цвете кнопки: он размечает сайт,
  а не предлагает действие. Зелёный язык, доставшийся от прежней палитры,
  повторял цвет кнопок — логотип читался как ещё одно нажимаемое место в шапке.

  Оба градиента идут по светлоте, а не по тону: внутренний контур глубокий,
  внешний открытый. Это даёт объём и держит знак читаемым на светлом и на
  тёмном фоне без отдельной версии под тему — крайние точки взяты так, чтобы
  средняя светлота знака оставалась в середине шкалы.
*/
/*
  `idPrefix` обязателен, и это не придирка к API.

  Градиенты живут в `<defs>` и вызываются по `url(#id)`. Знак стоит и в шапке,
  и в подвале — при фиксированных именах на странице оказывались два элемента
  с одним и тем же `id`, что невалидно и разрешается браузером в пользу
  первого попавшегося. Раз тип требует имя экземпляра, второй знак без имени
  просто не соберётся, а не заведёт дубль молча.

  Хук `useId` подошёл бы лучше, но знак рендерится и в серверных подвалах
  (`/privacy`, `not-found`) — ради уникальности `id` тащить их на клиент
  дороже, чем назвать экземпляр в месте вызова.
*/
export function Flame({
  idPrefix,
  className = "h-7 w-7",
}: {
  /** Имя экземпляра: `nav`, `footer` и т.п. Должно быть уникальным в пределах страницы. */
  idPrefix: string;
  className?: string;
}) {
  const cold = `ti-${idPrefix}-cold`;
  const hot = `ti-${idPrefix}-hot`;

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={cold} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.42 0.135 38)" />
          <stop offset="100%" stopColor="oklch(0.58 0.170 46)" />
        </linearGradient>
        <linearGradient id={hot} x1="0.2" y1="1" x2="0.8" y2="0">
          <stop offset="0%" stopColor="oklch(0.62 0.190 48)" />
          <stop offset="100%" stopColor="oklch(0.82 0.150 66)" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${cold})`}
        d="M31 3c3 9-4 13-9 19S13 34 15 43c2 9 9 16 18 17-11-7-13-16-9-24 3-6 9-8 11-15 2-6 0-13-4-18Z"
      />
      <path
        fill={`url(#${hot})`}
        d="M40 15c1 8-5 11-8 17s-2 12 3 17c-8-2-13-9-12-17 1-9 9-12 11-19 1-4 1-8 0-11 3 3 5 8 6 13Z"
      />
      <path
        fill={`url(#${hot})`}
        d="M47 27c4 6 5 14 2 21-4 8-12 12-21 12 8-3 13-9 13-17 0-6-3-10-3-16 3 0 7 0 9 0Z"
        opacity="0.92"
      />
    </svg>
  );
}

export function Logo({ idPrefix }: { idPrefix: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <Flame idPrefix={idPrefix} />
      <span className="text-[16px] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
        Top<span className="font-semibold text-[var(--ink-soft)]">Injector</span>
      </span>
    </span>
  );
}
