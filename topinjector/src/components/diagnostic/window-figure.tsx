/*
  Окно сомнения, нарисованное один раз и целиком. По оси — время проекта, по
  вертикали — доверие клиента. Кривая падает с момента, когда клиент начинает
  оценивать работу, и разворачивается там, где появляется первое убедительное
  доказательство. Заштрихованный участок между этими точками и есть окно.

  Схема, а не украшение: ТЗ требует, чтобы страница читалась как
  профессиональный аудит. Одна точная диаграмма объясняет предмет диагностики
  быстрее любого абзаца, и она же задаёт форму, к которой возвращается шкала
  результата.
*/
export function WindowFigure({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 420 260"
        className="h-auto w-full"
        role="img"
        aria-label="Схема: доверие клиента снижается с момента старта проекта до появления первого убедительного результата. Этот промежуток называется окном сомнения."
      >
        <defs>
          <pattern
            id="wf-hatch"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="7"
              stroke="var(--accent)"
              strokeWidth="1"
              opacity="0.42"
            />
          </pattern>
        </defs>

        {/* Оси. Волосяные, как вся остальная структура страницы. */}
        <line x1="46" y1="24" x2="46" y2="210" stroke="var(--rule)" strokeWidth="1" />
        <line x1="46" y1="210" x2="404" y2="210" stroke="var(--rule)" strokeWidth="1" />

        {/* Окно сомнения: от первой оценки до первого доказательства. */}
        <rect x="120" y="24" width="168" height="186" fill="url(#wf-hatch)" />
        <line
          x1="120"
          y1="24"
          x2="120"
          y2="210"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <line
          x1="288"
          y1="24"
          x2="288"
          y2="210"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/*
          Доверие. Держится ровно, пока клиент не начал оценивать, проседает в
          окне и восстанавливается только после доказательства.
        */}
        <path
          d="M46 62 L120 62 C 168 62, 210 108, 288 156 C 330 176, 360 120, 404 84"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2"
        />

        <circle cx="120" cy="62" r="3.5" fill="var(--ink)" />
        <circle cx="288" cy="156" r="3.5" fill="var(--ink)" />

        <text
          x="52"
          y="18"
          className="label"
          fill="var(--ink-faint)"
          style={{ fontSize: 9 }}
        >
          доверие клиента
        </text>

        {/*
          Выключка влево от самой линии, а не по центру под ней: по центру
          подпись первой точки заезжала на подпись начала оси.
        */}
        <text
          x="126"
          y="228"
          className="label"
          fill="var(--ink-soft)"
          style={{ fontSize: 9 }}
        >
          клиент оценивает
        </text>

        <text
          x="294"
          y="228"
          className="label"
          fill="var(--ink-soft)"
          style={{ fontSize: 9 }}
        >
          первый результат
        </text>

        <text
          x="204"
          y="250"
          className="label"
          textAnchor="middle"
          fill="var(--accent)"
          style={{ fontSize: 10 }}
        >
          окно сомнения
        </text>

        <text
          x="46"
          y="228"
          className="label"
          fill="var(--ink-faint)"
          style={{ fontSize: 9 }}
        >
          старт
        </text>
      </svg>
    </figure>
  );
}
