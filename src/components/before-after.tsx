"use client";

import { useCallback, useRef, useState } from "react";

/* Queries distributed across position bands. Demo figures. */
const BANDS = [
  { label: "ТОП-3", before: 12, after: 148 },
  { label: "4 до 10", before: 41, after: 203 },
  { label: "11 до 30", before: 186, after: 174 },
  { label: "31 до 50", before: 224, after: 92 },
  { label: "ниже 50", before: 204, after: 50 },
];

const MAX = 224;
const WEEKS = 6;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/*
  A time scrubber, not a wipe. An earlier version clipped an "after" layer over a
  "before" layer, but bars grow from the left, so the clip only ever revealed the
  tips of the longer bars and the comparison was unreadable. Interpolating the
  bars against drag position says the same thing far more directly: the handle is
  the six weeks, and the distribution moves as you pull it.
*/
export function BeforeAfter() {
  const [t, setT] = useState(1);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    setT(Math.min(1, Math.max(0, (clientX - box.left) / box.width)));
  }, []);

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    move(e.clientX);
  };
  const onMove = (e: React.PointerEvent) => dragging.current && move(e.clientX);
  const onUp = (e: React.PointerEvent) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const week = Math.round(t * WEEKS);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-6">
        <span className="label text-[var(--ink-faint)]">
          {week === 0 ? "до подключения" : `неделя ${week}`}
        </span>
        <span className="label text-[var(--ink-faint)]">потяните шкалу</span>
      </div>

      <div
        ref={frame}
        className="relative mt-4 touch-none overflow-hidden border border-[var(--rule)] bg-[var(--inset)] px-4 py-2 select-none sm:px-6"
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
              className="grid grid-cols-[5rem_1fr_3rem] items-center gap-4 border-b border-[var(--rule-soft)] py-4 last:border-b-0 sm:grid-cols-[7rem_1fr_4rem] sm:gap-6"
            >
              <span className="label text-[var(--ink-faint)]">{b.label}</span>
              <span className="block h-5 bg-[var(--rule-soft)]">
                <span
                  className="block h-full"
                  style={{
                    width: `${(v / MAX) * 100}%`,
                    backgroundColor: gain ? "var(--hot)" : "var(--ink)",
                    opacity: gain ? 1 : 0.3,
                  }}
                />
              </span>
              <span className="num text-right text-[15px] tabular-nums sm:text-[17px]">
                {Math.round(v)}
              </span>
            </div>
          );
        })}

        {/* The handle reads as a slider on a machined track. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-[var(--ink)]"
          style={{ left: `${t * 100}%` }}
          aria-hidden="true"
        >
          <span className="absolute top-1/2 left-1/2 flex h-10 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[var(--ink)]">
            <span className="block h-3 w-px bg-[var(--btn-ink)]" />
            <span className="ml-1 block h-3 w-px bg-[var(--btn-ink)]" />
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(t * 100)}
          onChange={(e) => setT(Number(e.target.value) / 100)}
          aria-label="Прокрутка недель: распределение запросов по позициям"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <div className="mt-3 flex justify-between">
        <span className="num text-[11px] text-[var(--ink-faint)]">старт</span>
        <span className="num text-[11px] text-[var(--hot)]">6 недель</span>
      </div>
    </div>
  );
}
