"use client";

import { motion, useReducedMotion } from "motion/react";
import { RISK_VERDICTS, SEGMENTS, type RiskId, type SegmentId } from "@/diagnostic/scoring";
import { EASE_OUT } from "@/motion/tokens";

/*
  Привязка к результату диагностики (п.19 ТЗ на диагностику: параметры приходят
  в URL и персонализируют первый блок).

  Врезка намеренно короткая и без выводов: статья должна читаться как
  редакционный материал, а не как продолжение отчёта. Её работа — за одну
  строку связать «я только что получил свой индекс» с «сейчас мне объяснят, что
  он означает».

  Приходят параметры не всегда: на статью попадают и напрямую, и по ссылке из
  рассылки. Тогда врезки просто нет, и первый экран остаётся чисто текстовым,
  как требует [VISUAL].
*/
export function PersonalNote({
  score,
  segment,
  risk,
}: {
  score?: string;
  segment?: string;
  risk?: string;
}) {
  const reduce = useReducedMotion();

  const index = Number(score);
  const seg = segment && segment in SEGMENTS ? (segment as SegmentId) : null;
  const riskId = risk && risk in RISK_VERDICTS ? (risk as RiskId) : null;

  if (!Number.isFinite(index) || index < 0 || index > 100 || !seg) return null;

  return (
    <motion.aside
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3, ease: EASE_OUT }}
      className="mt-10 border-l-2 border-[var(--accent)] py-1 pl-5"
    >
      <p className="label text-[var(--accent)]">ваш результат диагностики</p>
      <p className="mt-3 text-[16px] leading-snug text-[var(--ink-soft)]">
        Индекс окна сомнения{" "}
        <span className="num font-semibold text-[var(--ink)]">{index}%</span>,{" "}
        {SEGMENTS[seg].risk.toLowerCase()} риск
        {riskId ? `, ведущий — ${RISK_VERDICTS[riskId].label.toLowerCase()}` : ""}.
        Ниже — что за этим стоит.
      </p>
    </motion.aside>
  );
}
