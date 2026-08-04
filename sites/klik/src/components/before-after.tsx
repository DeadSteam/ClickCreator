"use client";

import { useCallback, useRef, useState } from "react";

import { BANDS, BAND_MAX, BAND_WEEKS } from "@/lib/content";
import { track, trackOnView } from "@/lib/analytics";

/*
  До и после на одном проекте.

  Это шкала времени, а не шторка. Полосы растут слева, поэтому вырез поверх
  слоя «до» открывал бы только их кончики - сравнивать было бы нечего.
  Интерполяция по положению ручки говорит то же самое прямо: ручка - это
  шесть недель, и распределение движется, пока её тянут.

  Ползунок нативный и лежит поверх рамки прозрачным слоем: так работают и
  мышь, и палец, и клавиатура, и ничего из этого не пришлось писать руками.
*/
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function BeforeAfter() {
  const [t, setT] = useState(1);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);

  const note = () => {
    if (touched.current) return;
    touched.current = true;
    track("calc_interact", { widget: "before_after" });
  };

  const move = useCallback((clientX: number) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    setT(Math.min(1, Math.max(0, (clientX - box.left) / box.width)));
  }, []);

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    move(e.clientX);
    note();
  };
  const onMove = (e: React.PointerEvent) => dragging.current && move(e.clientX);
  const onUp = (e: React.PointerEvent) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const week = Math.round(t * BAND_WEEKS);

  return (
    <div ref={(el) => void trackOnView(el, "proof_view")}>
      <p className="text-[17px] text-[var(--color-text-muted)]">
        {week === 0 ? "До подключения" : `Неделя ${week}`} — потяните шкалу
      </p>

      <div
        ref={frame}
        className="panel relative mt-5 touch-none px-6 py-3 select-none sm:px-9"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {BANDS.map((b) => {
          const v = lerp(b.before, b.after, t);
          const gain = b.after > b.before;
          return (
            <div
              key={b.label}
              className="grid grid-cols-[5rem_1fr_3.5rem] items-center gap-5 border-b border-[var(--color-line-soft)] py-5 last:border-b-0 sm:grid-cols-[7rem_1fr_4rem] sm:gap-8"
            >
              <span className="text-[17px] text-[var(--color-text-muted)]">
                {b.label}
              </span>
              <span className="block h-5 rounded-[var(--radius-control)] bg-[var(--color-surface-2)]">
                <span
                  className="block h-full rounded-[var(--radius-control)]"
                  style={{
                    width: `${(v / BAND_MAX) * 100}%`,
                    backgroundColor: gain
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)",
                    opacity: gain ? 1 : 0.45,
                  }}
                />
              </span>
              <span className="num text-right text-[19px]">{Math.round(v)}</span>
            </div>
          );
        })}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-[var(--color-text-muted)]"
          style={{ left: `${t * 100}%` }}
        >
          <span className="absolute top-1/2 left-1/2 block h-12 w-3 -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-control)] bg-[var(--color-text)]" />
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(t * 100)}
          onChange={(e) => {
            setT(Number(e.target.value) / 100);
            note();
          }}
          aria-label="Недели: распределение запросов по позициям"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <div className="mt-4 flex justify-between text-[17px] text-[var(--color-text-muted)]">
        <span>старт</span>
        <span>{BAND_WEEKS} недель</span>
      </div>
    </div>
  );
}
