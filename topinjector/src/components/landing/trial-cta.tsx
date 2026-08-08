"use client";

import type { ReactNode } from "react";

import { track, type DiagnosticEvent } from "@/diagnostic/analytics";
import { botLink } from "@/landing/config";

/*
  Главное действие лендинга. Ведёт в Telegram-бота, а не на форму регистрации:
  бесплатные лимиты выдаются только после проверки подписки на канал, и
  отправлять человека на обычную регистрацию значило бы обещать доступ, который
  там не выдаётся.

  Каждая кнопка передаёт боту собственный `start`-параметр. Он же приезжает в
  событие клика, поэтому цепочка «клик на лендинге → запуск бота → начисление
  лимитов» склеивается по одному ключу, хотя половина её происходит вне сайта.
*/

/*
  Знак Telegram нарисован здесь, а не взят из иконочного набора: в проекте нет
  иконочной библиотеки, а тянуть её ради одного бренд-знака дороже, чем сорок
  строк пути. Фигура декоративная — смысл несёт текст рядом.
*/
function TelegramMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M21.94 4.3a1.2 1.2 0 0 0-1.6-1.2L2.9 9.86c-1.09.42-1.06 1.98.05 2.35l4.3 1.44 1.63 4.9c.32.95 1.55 1.2 2.21.44l2.28-2.6 4.3 3.16c.75.55 1.82.14 2-.78l2.27-14.47ZM8.9 13.2 18.1 6.6l-7.5 7.5-.28 3.06-1.42-3.96Z" />
    </svg>
  );
}

/**
 * Составная кнопка: слева площадка, справа действие.
 *
 * Разделены намеренно. «Получить бесплатные лимиты в Telegram» одной строкой не
 * помещается и переносится на две, из-за чего кнопка вырастает вдвое и
 * перестаёт выглядеть кнопкой. Пара «подпись сверху + короткая кнопка» читается
 * быстрее: сначала что получаешь, потом куда идёшь.
 *
 * Вертикальная волосяная линейка вместо второго фона — тот же язык, которым на
 * этом сайте набрана вся структура: линейки и сетка, а не вложенные плашки.
 */
export function TrialCta({
  children,
  event,
  place,
  above,
}: {
  children: ReactNode;
  event: DiagnosticEvent;
  place: string;
  above?: string;
}) {
  const link = (
    <a
      href={botLink(place)}
      target="_blank"
      rel="noopener"
      /*
        Полный смысл действия — в aria-label. На экране он разложен на подпись и
        кнопку, но скринридер читает элемент целиком, и «Telegram» без контекста
        не сказало бы, что произойдёт по нажатию.
      */
      aria-label={above ? `${above} в Telegram` : undefined}
      onClick={() => {
        track(event, { place });
        track("tg_cta_click", { place });
        track("tg_bot_open", { place });
      }}
      /*
        Классы клавиши те же, что у остальных кнопок сайта: фаска, ореол,
        проседание при нажатии и заезжающая слева заливка приходят из системы.
        Своё здесь только внутреннее устройство — шлюз со знаком и линейка, —
        поэтому боковые поля снимаются, а padding берут на себя половинки.

        Минимальная ширина держит иерархию: без неё короткое «Telegram»
        оказывалось уже вторичной кнопки, и главное действие читалось как
        второстепенное.
      */
      className="btn btn-primary btn-lg group min-w-[18rem] items-stretch gap-0 overflow-hidden px-0"
    >
      <span className="flex w-[3.25rem] shrink-0 items-center justify-center">
        {/*
          Знак слегка приподнимается на курсоре. Смещение в один пиксель — это
          отклик, а не анимация: оно подтверждает, что элемент живой, и не
          отвлекает от чтения.
        */}
        <TelegramMark
          className="h-[19px] w-[19px] [transition:transform_var(--t-hover)_var(--ease-micro)]
            group-hover:-translate-y-px"
        />
      </span>

      {/* Линейка держится на 0.32: ниже она пропадала на заливке. */}
      <span aria-hidden="true" className="w-px shrink-0 bg-[var(--btn-ink)] opacity-[0.32]" />

      <span className="flex flex-1 items-center justify-center gap-3 px-6 whitespace-nowrap">
        {children}
        <span aria-hidden="true" className="btn-arrow num text-[0.85em] leading-none">
          →
        </span>
      </span>
    </a>
  );

  if (!above) return link;

  return (
    <div className="flex flex-col items-start gap-2.5">
      <span className="flex items-center gap-2.5 text-[15px] leading-snug font-semibold tracking-[-0.01em] text-[var(--ink)]">
        <span aria-hidden="true" className="h-px w-5 bg-[var(--accent)]" />
        {above}
      </span>
      {link}
    </div>
  );
}
