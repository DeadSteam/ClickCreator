/*
  Приём заявки с формы основного лендинга /universal (п.21 ТЗ основного
  лендинга).

  ТОЧКА ИНТЕГРАЦИИ С CRM. Обработчик валидирует полезную нагрузку и пишет
  запись в лог — отправку в CRM подключать в `deliver` ниже, аналогично
  `api/diagnostic/lead`.

  Первый шаг формы (сайт, регион, количество запросов, контакт) достаточен
  для лида сам по себе: п.21 ТЗ запрещает запрашивать до регистрации доступ к
  Вебмастеру, пароли и объёмные технические анкеты, поэтому второй шаг
  (тип проекта, стек, цель, сценарий, бюджет) необязателен и приходит только
  если пользователь его заполнил.
*/

type LeadPayload = {
  site: string;
  region: string;
  queries: number;
  contact: string;
  projectType: string;
  currentStack: string;
  goal: string;
  scenario: string;
  budget: string;
  hypothesis: string;
};

function parse(body: unknown): LeadPayload | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  const site = typeof b.site === "string" ? b.site.trim() : "";
  if (!site) return null;

  const region = typeof b.region === "string" ? b.region.trim() : "";
  if (!region) return null;

  const queries = typeof b.queries === "number" ? Math.round(b.queries) : NaN;
  if (!Number.isFinite(queries) || queries < 1 || queries > 100000) return null;

  const contact = typeof b.contact === "string" ? b.contact.trim() : "";
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact);
  const isTelegram = /^@?[a-zA-Z0-9_]{4,32}$/.test(contact);
  if (!isEmail && !isTelegram) return null;

  const text = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

  return {
    site: site.slice(0, 300),
    region: region.slice(0, 200),
    queries,
    contact,
    projectType: text(b.projectType),
    currentStack: text(b.currentStack),
    goal: text(b.goal),
    scenario: text(b.scenario),
    budget: text(b.budget, 100),
    hypothesis: text(b.hypothesis, 50),
  };
}

async function deliver(lead: LeadPayload) {
  console.info("[universal] lead", { ...lead, at: new Date().toISOString() });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "malformed" }, { status: 400 });
  }

  const lead = parse(body);
  if (!lead) return Response.json({ error: "invalid" }, { status: 422 });

  try {
    await deliver(lead);
  } catch {
    return Response.json({ error: "delivery" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
