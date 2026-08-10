"use client";

import { useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { track } from "@/diagnostic/analytics";

/*
  Форма заявки основного лендинга (п.21 ТЗ). Два шага, а не одна длинная
  анкета: первый запрашивает минимум (сайт, регион, количество запросов,
  контакт) и уже достаточен для лида, второй — необязательное уточнение
  сценария. П.21 прямо запрещает запрашивать до регистрации доступ к
  Вебмастеру, пароли и объёмные технические анкеты — их здесь нет.
*/

const SCENARIO_OPTIONS = [
  "Проверка отдельного запроса",
  "Проверка группы запросов",
  "Дополнение текущего SaaS",
  "Сравнение рабочего цикла",
] as const;

type Status = "idle" | "submitting" | "done" | "error";

export function RegistrationForm({ hypothesis }: { hypothesis?: string }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [step1, setStep1] = useState({ site: "", region: "", queries: "", contact: "" });
  const [step2, setStep2] = useState({ projectType: "", currentStack: "", goal: "", scenario: "", budget: "" });
  const started = useRef(false);

  function onFirstFocus() {
    if (started.current) return;
    started.current = true;
    track("universal_form_start");
  }

  const step1Valid = step1.site.trim() && step1.region.trim() && step1.queries.trim() && step1.contact.trim();

  function goToStep2() {
    track("universal_form_step_1_complete");
    setStep(2);
  }

  async function submit(skippedStep2: boolean) {
    setStatus("submitting");
    if (!skippedStep2) track("universal_form_step_2_complete");
    track("universal_form_submit", { skipped_step_2: skippedStep2 });

    try {
      const res = await fetch("/api/universal/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: step1.site,
          region: step1.region,
          queries: Number(step1.queries),
          contact: step1.contact,
          ...(skippedStep2 ? {} : step2),
          hypothesis,
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  function onSubmitStep2(e: FormEvent) {
    e.preventDefault();
    void submit(false);
  }

  if (status === "done") {
    return (
      <div className="mt-14 border border-[var(--rule-soft)] bg-[var(--inset)] p-7 sm:p-9">
        <p className="label text-[var(--accent)]">заявка принята</p>
        <p className="mt-4 max-w-[48ch] text-[18px] leading-snug font-semibold tracking-[-0.02em] sm:text-[20px]">
          Мы свяжемся с вами, чтобы зафиксировать исходные данные и запустить проверку.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-14 border border-[var(--rule-soft)] p-7 sm:p-9">
      <p className="label text-[var(--ink-faint)]">
        {step === 1 ? "шаг 1 из 2 · для запуска проверки" : "шаг 2 из 2 · необязательно"}
      </p>

      {step === 1 ? (
        <div className="mt-6 flex flex-col gap-5">
          <Field label="Сайт" value={step1.site} onChange={(v) => setStep1((s) => ({ ...s, site: v }))} placeholder="example.ru" onFocus={onFirstFocus} />
          <Field label="Регион продвижения" value={step1.region} onChange={(v) => setStep1((s) => ({ ...s, region: v }))} placeholder="Москва" />
          <Field
            label="Количество запросов"
            value={step1.queries}
            onChange={(v) => setStep1((s) => ({ ...s, queries: v.replace(/\D/g, "") }))}
            placeholder="10"
            inputMode="numeric"
          />
          <Field label="Контакт" value={step1.contact} onChange={(v) => setStep1((s) => ({ ...s, contact: v }))} placeholder="email или @telegram" />

          <div className="mt-2 flex flex-wrap gap-3">
            <Button type="button" disabled={!step1Valid} onClick={goToStep2}>
              Продолжить
            </Button>
            <Button type="button" variant="quiet" disabled={!step1Valid || status === "submitting"} onClick={() => void submit(true)}>
              Отправить без уточнений
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmitStep2} className="mt-6 flex flex-col gap-5">
          <Field label="Тип проекта" value={step2.projectType} onChange={(v) => setStep2((s) => ({ ...s, projectType: v }))} placeholder="интернет-магазин, услуги, инфосайт…" />
          <Field label="Текущий рабочий стек" value={step2.currentStack} onChange={(v) => setStep2((s) => ({ ...s, currentStack: v }))} placeholder="какие SaaS уже используете" />
          <Field label="Цель проверки" value={step2.goal} onChange={(v) => setStep2((s) => ({ ...s, goal: v }))} placeholder="что хотите сравнить или подтвердить" />

          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-[var(--ink-faint)]">Желаемый сценарий</span>
            <select
              value={step2.scenario}
              onChange={(e) => setStep2((s) => ({ ...s, scenario: e.target.value }))}
              className="border border-[var(--rule)] bg-[var(--reading-bg)] px-3 py-2.5 text-[15px] text-[var(--ink)]"
            >
              <option value="">Не выбрано</option>
              {SCENARIO_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <Field label="Допустимый бюджет" value={step2.budget} onChange={(v) => setStep2((s) => ({ ...s, budget: v }))} placeholder="ориентировочно, необязательно" />

          <div className="mt-2 flex flex-wrap gap-3">
            <Button type="submit" loading={status === "submitting"}>
              Отправить заявку
            </Button>
            <Button type="button" variant="quiet" disabled={status === "submitting"} onClick={() => void submit(true)}>
              Пропустить и отправить
            </Button>
          </div>
        </form>
      )}

      {status === "error" && (
        <p className="mt-5 text-[14px] text-[var(--ink-soft)]">
          Не удалось отправить заявку. Попробуйте ещё раз.
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
  onFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: "numeric";
  onFocus?: () => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] text-[var(--ink-faint)]">{label}</span>
      <input
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className="border border-[var(--rule)] bg-[var(--reading-bg)] px-3 py-2.5 text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-faint)]"
      />
    </label>
  );
}
