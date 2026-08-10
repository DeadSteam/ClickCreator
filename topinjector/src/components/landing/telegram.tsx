"use client";

import { Button } from "@/components/ui/button";
import { track } from "@/diagnostic/analytics";
import { CHANNEL_VALUE, TELEGRAM, TRIAL, TRIAL_GRANT, botLink } from "@/landing/config";
import { Appear } from "./sections";
import { TrialCta } from "./trial-cta";
import { ordinal } from "@/format";

/*
  Два блока Telegram-связки.

  Порядок между ними не случайный: сначала человек узнаёт, что подписка — это
  условие получения лимитов, и только потом читает, зачем канал нужен ему
  самому. Обратный порядок превращает объяснение ценности в оправдание уже
  выставленного требования.
*/

const STEPS = [
  {
    t: "Запустите Telegram-бота",
    d: "Бот свяжет Telegram с вашим аккаунтом сервиса.",
  },
  {
    t: "Подпишитесь на канал для SEO-специалистов",
    d: "В канале публикуются кейсы, разборы, инструкции и ответы команды.",
  },
  {
    t: "Подтвердите подписку и получите лимиты",
    d: "Бот автоматически проверит подписку и начислит бесплатный пакет.",
  },
];

export function TelegramSteps() {
  return (
    <>
      <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-3">
        {STEPS.map((s, i) => (
          <Appear key={s.t} delay={i * 0.08} className="cell">
            <div className="h-full p-7 sm:p-8">
              <span className="num text-[11px] text-[var(--accent)]">
                Шаг {i + 1}
              </span>
              <h3 className="mt-5 max-w-[22ch] text-[19px] leading-snug font-semibold tracking-[-0.02em] sm:text-[21px]">
                {s.t}
              </h3>
              <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                {s.d}
              </p>
            </div>
          </Appear>
        ))}
      </div>

      {/* Что именно начислит бот. Обещание должно быть счётным. */}
      <Appear delay={0.16}>
        <div className="mt-12 border-t border-[var(--rule)] pt-8">
          <p className="label text-[var(--ink-faint)]">
            после подтверждения подписки бот начислит
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2.5">
            {TRIAL_GRANT.map((g) => (
              <li
                key={g}
                className="flex gap-3 text-[16px] leading-snug text-[var(--ink-soft)]"
              >
                <span
                  aria-hidden="true"
                  className="num shrink-0"
                  style={{ color: "var(--positive)" }}
                >
                  ✓
                </span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </Appear>

      <Appear delay={0.2}>
        <div className="mt-10">
          <TrialCta event="hero_trial_click" place="steps">
            Получить бесплатные лимиты
          </TrialCta>
          <p className="mt-4 max-w-[52ch] text-[13px] leading-relaxed text-[var(--ink-faint)]">
            Банковская карта {TRIAL.cardRequired ? "требуется" : "не требуется"}.{" "}
            {TRIAL.repeatBonusNote}
          </p>
        </div>
      </Appear>
    </>
  );
}

export function ChannelValue() {
  return (
    <div className="mt-14 grid gap-px bg-[var(--rule-soft)] lg:grid-cols-[1.1fr_0.9fr]">
      <Appear className="cell p-7 sm:p-8">
        <p className="label text-[var(--ink-faint)]">в канале вы получаете</p>
        <ul className="mt-6 flex flex-col gap-2.5">
          {CHANNEL_VALUE.map((v) => (
            <li
              key={v}
              className="flex gap-3.5 text-[16px] leading-snug text-[var(--ink-soft)]"
            >
              <span aria-hidden="true" className="num shrink-0 text-[var(--ink-faint)]">
                —
              </span>
              {v}
            </li>
          ))}
        </ul>
      </Appear>

      <Appear delay={0.1} className="cell p-7 sm:p-8">
        <p className="max-w-[26ch] text-[21px] leading-snug font-extrabold tracking-[-0.03em] sm:text-[26px]">
          Сервис даёт инструмент. Канал помогает использовать его
          профессионально.
        </p>

        <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
          Подписку нужно сохранять, пока действуют бесплатные лимиты.{" "}
          {TRIAL.onUnsubscribe}
        </p>

        <Button
          variant="secondary"
          href={TELEGRAM.channel}
          target="_blank"
          rel="noopener"
          onClick={() => track("tg_channel_open", { place: "channel_value" })}
          className="mt-8"
        >
          Посмотреть канал {TELEGRAM.channelName}
        </Button>
      </Appear>
    </div>
  );
}

/**
 * Путь на первом экране. ТЗ требует объяснить его сразу: человек должен видеть,
 * что доступ выдаётся через Telegram, до того как нажмёт кнопку, — иначе
 * переход в мессенджер читается как подмена обещанной регистрации.
 */
export function TelegramPath() {
  const steps = [
    "Перейдите в бота",
    "Подпишитесь на канал",
    "Получите лимиты",
    "Добавьте проект",
  ];

  return (
    <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
      {/*
        Стрелка рисуется перед шагом, а не после него. При переносе строки
        замыкающая стрелка оставалась висеть на конце строки и указывала в
        пустоту; ведущая уезжает на новую строку вместе со своим шагом.
      */}
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2.5">
          {i > 0 && (
            <span aria-hidden="true" className="num text-[var(--ink-faint)]">
              →
            </span>
          )}
          <span className="num text-[11px] text-[var(--ink-faint)]">
            {ordinal(i)}
          </span>
          <span className="text-[13px] leading-snug text-[var(--ink-soft)]">{s}</span>
        </li>
      ))}
    </ol>
  );
}

export { botLink };
