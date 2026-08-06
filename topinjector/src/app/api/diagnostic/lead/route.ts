/*
  Приём контакта с экрана результата диагностики.

  ТОЧКА ИНТЕГРАЦИИ С CRM. Сейчас обработчик валидирует полезную нагрузку и
  пишет запись в лог — отправку в CRM подключать в `deliver` ниже. Поля лида
  перечислены в п.25 ТЗ, и они уже приходят в нужном виде, так что интеграция
  сводится к одному вызову.

  Лид создаётся только при наличии контакта (п.25). Пройденная без контакта
  диагностика лидом не считается: пользователь согласия не давал.
*/

type LeadPayload = {
  contact: string;
  index: number;
  segment: string;
  risk: string;
  goals: string[];
  source: string;
};

const SEGMENTS = new Set(["low", "medium", "high", "critical"]);
const RISKS = new Set(["distrust", "visibility", "control"]);

function parse(body: unknown): LeadPayload | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  const contact = typeof b.contact === "string" ? b.contact.trim() : "";
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact);
  const isTelegram = /^@?[a-zA-Z0-9_]{4,32}$/.test(contact);
  if (!isEmail && !isTelegram) return null;

  const index = typeof b.index === "number" ? Math.round(b.index) : NaN;
  if (!Number.isFinite(index) || index < 0 || index > 100) return null;

  const segment = String(b.segment ?? "");
  const risk = String(b.risk ?? "");
  if (!SEGMENTS.has(segment) || !RISKS.has(risk)) return null;

  return {
    contact,
    index,
    segment,
    risk,
    goals: Array.isArray(b.goals) ? b.goals.filter((g): g is string => typeof g === "string") : [],
    /* Обрезаем: строка запроса приходит от клиента и в лог идёт как есть. */
    source: typeof b.source === "string" ? b.source.slice(0, 500) : "",
  };
}

async function deliver(lead: LeadPayload) {
  /*
    Здесь подключается CRM. Теги из п.25 ТЗ собираются из сегмента и желания:
    diagnostic_<segment> и goal_<goal>.
  */
  const tags = [
    `diagnostic_${lead.segment}`,
    ...lead.goals.map((g) => `goal_${g}`),
  ];

  console.info("[diagnostic] lead", {
    contact: lead.contact,
    index: lead.index,
    segment: lead.segment,
    risk: lead.risk,
    tags,
    source: lead.source,
    at: new Date().toISOString(),
  });
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
    /*
      Отдаём 502, а не 200: форма показывает пользователю «не удалось
      сохранить» и даёт повторить. Молчаливый успех при упавшей доставке — это
      потерянный лид, о котором никто не узнает.
    */
    return Response.json({ error: "delivery" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
