import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { WipeReveal } from "@/components/wipe-reveal";
import { BeforeAfter } from "@/components/before-after";
import { Voices } from "@/components/voices";
import { VolumeScale } from "@/components/volume-scale";
import { Schema } from "@/components/schema";
import { RankClimb } from "@/components/rank-climb";
import { Calculator } from "@/components/calculator";
import { DoubtRail } from "@/components/doubt-rail";
import { CLAIM, MECHANISM } from "@/brand/brand";
import { ordinal } from "@/format";

/*
  ГЛАВНАЯ СТРАНИЦА. Разметка написана заново под систему `instrument.css`.

  Что сохранено дословно: весь текст, все величины и порядок блоков. Что
  переделано полностью: подача каждого блока.

  Три правила, вынесенные из разбора девяти референсов и действующие здесь
  без исключений.

  ПЕРВОЕ: ни одной карточки. Секция — полоса во всю ширину, отделённая
  волосяной линией; внутренняя структура рисуется решёткой, где сам зазор и
  есть линейка. Подложек под блоками нет: плашка внутри полосы возвращает ту
  самую карточку, ради ухода от которой всё и затевалось.

  ВТОРОЕ: ни одной равной раскладки. `repeat(3, 1fr)` и `grid-cols-2` рядом с
  первым экраном — то, по чему шаблон опознаётся мгновенно. Здесь все доли
  неравны и каждая пропорция что-то значит: семь против пяти, когда слово
  ведёт прибор; пять против семи, когда блок написан ради правой стороны.

  ТРЕТЬЕ: числа — главный житель страницы. Продукт продаёт измеримость,
  поэтому величина всегда набрана как величина: подпись сверху, число, единица
  на его базовой линии.
*/

const NAV_LINKS = [
  { label: "Как работает", href: "#how" },
  { label: "Расчёт", href: "#calc" },
  { label: "Результаты", href: "#cases" },
  { label: "Отзывы", href: "#voices" },
  { label: "Вопросы", href: "#faq" },
];

/*
  Показания, а не достижения. Прежние «1430 проектов» и «92% продлевают»
  выглядели убедительнее, но подтвердить их нечем, а п.23 мастер-документа
  запрещает неподтверждённые цифры прямо.

  Подпись стоит НАД числом: она называет измеренное, и без неё «100» и «%»
  читаются первыми, а «чего именно сто» — третьей строкой.
*/
const METRICS = [
  { cap: "первые сдвиги", v: "2–3", u: "дня", n: "по подходящим запросам" },
  { cap: "тест", v: "7", u: "дней", n: "идёт без единого списания" },
  { cap: "нужно от вас", v: "0", u: "доступов", n: "к сайту и хостингу" },
  { cap: "возврат остатка", v: "100", u: "%", n: "если сдвигов нет за неделю" },
];

const NOW = [
  "Подрядчик просит полгода и присылает отчёты вместо позиций",
  "Бюджет на Директ растёт, а стоимость заявки вместе с ним",
  "Конкуренты стоят выше по вашим же коммерческим запросам",
  "Непонятно, за что именно списываются деньги",
];

const WITH_SERVICE = [
  "Движение по позициям видно на третий день, а не в конце квартала",
  "Платите за переходы, остаток всегда можно забрать",
  "Запускается за 10 минут, доступ к сайту не требуется",
  "Каждая фраза с ценой и динамикой на одном экране",
];

/*
  Кейсы даны в структуре п.25: ниша, регион, исходная позиция, срок наблюдения.
  Голого процента недостаточно — именно отсутствие контекста делает чужие
  скриншоты в этой категории бесполезными.
*/
const CASES = [
  {
    niche: "Полусухая стяжка пола",
    city: "Казань",
    top: 51,
    was: 4,
    scope: "667 запросов",
    watch: "6 недель наблюдения",
  },
  {
    niche: "Ремонт техники Apple",
    city: "Москва",
    top: 74,
    was: 11,
    scope: "перегретая ниша",
    watch: "9 недель наблюдения",
  },
  {
    niche: "Аренда спецтехники",
    city: "Екатеринбург",
    top: 63,
    was: 9,
    scope: "ВЧ-запрос вышел с 41 на 4",
    watch: "5 недель наблюдения",
  },
  {
    niche: "Оптовые поставки крепежа",
    city: "Новосибирск",
    top: 88,
    was: 23,
    scope: "заявка дешевле Директа в 5 раз",
    watch: "11 недель наблюдения",
  },
];

const RATES = [
  { plan: "Экономный", rate: "4", win: "14 до 30 дней", who: "Региональные ниши без конкуренции" },
  { plan: "Стандарт", rate: "12", win: "7 до 14 дней", who: "Большинство коммерческих сайтов" },
  { plan: "Ускоренный", rate: "28", win: "2 до 3 дней", who: "Перегретые ниши и сезонный спрос" },
];

/*
  Правило работы со страхом (п.18): сначала признать его рациональность, затем
  показать условия, границы и ответственность. Отрицание страха читается как
  продажа, а не как ответ.
*/
const FAQ = [
  {
    q: "Это безопасно для сайта?",
    a: "Полностью безрисковых методов быстрого продвижения не существует, и обещать обратное было бы нечестно. Что мы делаем с риском: распределяем сессии по регионам и времени, подбираем скорость под возраст и трафик сайта, показываем ограничения до запуска, а не после. Что мы не делаем: не заявляем, что реакция поисковика исключена, и не советуем строить весь прогноз только на этом инструменте.",
  },
  {
    q: "Через сколько будет результат?",
    a: "Сначала проводится оценка применимости: без неё срок назвать нельзя. Для подходящих проектов первые сдвиги обычно видны через 2-3 дня на ускоренном тарифе и через 1-2 недели на экономном, закрепление занимает от трёх недель. Это наблюдаемые средние, а не обязательство: в перегретых нишах дольше, в региональных быстрее.",
  },
  {
    q: "Подойдёт ли сервису мой сайт?",
    a: "Нужно, чтобы сайт уже находился в ТОП-50 по продвигаемым запросам. Если его там нет, поведенческие сигналы не помогут: сначала нужна базовая оптимизация. Проверить позиции можно бесплатно в кабинете до первого пополнения — это и есть предварительная оценка.",
  },
  {
    q: "Что будет, если отключить сервис?",
    a: "Позиции держатся, пока сайт продолжает получать нормальный трафик и работает классическое SEO. Если продвижение держалось только на нас, часть позиций постепенно откатится. Мы дополнительный слой к системной работе, а не её замена, и это стоит учитывать в планировании заранее.",
  },
  {
    q: "Как устроена оплата?",
    a: "Пополняете баланс, деньги списываются за фактические переходы. Абонентской платы нет, неизрасходованное не сгорает. Если за первую неделю позиции по вашим запросам не сдвинулись, возвращаем остаток.",
  },
];

/** Подпись раздела. Стоит над заголовком и всегда с чертой — отметка на полях. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inst-label flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-8 bg-[var(--amber)]" />
      {children}
    </span>
  );
}

/**
 * Шапка раздела: заголовок ведёт семь колонок, пояснение занимает пять.
 *
 * Раньше заголовок и подводка шли стопкой, и между ними и содержимым
 * оставалось по 64 пикселя пустоты — блок распадался на три несвязанных
 * куска. Рядом они читаются одним высказыванием.
 */
function Head({
  eyebrow,
  title,
  lede,
  aside,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
        <div className="col-span-12 lg:col-span-7">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className={`inst-d2 ${eyebrow ? "mt-5" : ""}`}>{title}</h2>
        </div>
        {lede ? (
          <p className="inst-body col-span-12 max-w-[46ch] lg:col-span-5">{lede}</p>
        ) : null}
        {aside}
      </div>
    </Reveal>
  );
}

export default function BusinessLanding() {
  return (
    <div className="inst inst-ground">
      <Schema
        faq={FAQ}
        service={{
          name: "Быстрое продвижение целевых запросов в Яндексе",
          description:
            "Сервис раннего результата по целевым запросам в Яндексе. Оценка применимости до запуска, оплата за фактические переходы, тест семь дней, возврат остатка при отсутствии роста.",
          url: "https://topinjector.ru/",
        }}
      />

      <DoubtRail ctaHref="#start" ctaLabel="Проверить применимость" />

      <Nav
        links={NAV_LINKS}
        crossLink={{ label: "Для агентств", href: "/pro" }}
        ctaLabel="Проверить применимость"
        ctaHref="#start"
      />

      <main id="main" tabIndex={-1}>
        {/*
          ПЕРВЫЙ ЭКРАН — классическая раскладка референсов: слово слева,
          продукт справа.

          Схема выбрана намеренно, а не по инерции. Attio, Linear, Modal и
          Increase используют её все четверо, и работает она по причине, а не
          по традиции: обещание и его доказательство должны быть видны
          одновременно, без прокрутки.

          Что здесь было сделано неправильно раньше: доказательство занимало
          триста пикселей высоты при заголовке в девяносто. Панель продукта на
          референсах — половина первого экрана и главный визуальный объект
          страницы. Ниже она набрана именно так.
        */}
        <section className="inst-band relative isolate overflow-hidden">
          <div className="inst-sheet inst-pad-tight relative">
            <div className="grid grid-cols-12 items-center gap-x-8 gap-y-12">
              <div className="col-span-12 lg:col-span-6">
                <Reveal>
                  <Eyebrow>дополнительный слой к системному SEO</Eyebrow>
                </Reveal>

                <WipeReveal delay={0.08}>
                  <h1 className="inst-d1 mt-7">
                    Не ждите квартал, чтобы понять,{" "}
                    <span className="text-[var(--amber)]">работает ли SEO</span>
                  </h1>
                </WipeReveal>

                <Reveal delay={0.12}>
                  <p className="inst-lead mt-7 max-w-[44ch]">
                    Целевые запросы начинают двигаться в первые дни. Применимость
                    проверяется до первого списания, динамика видна по каждой фразе.
                  </p>
                </Reveal>

                <Reveal delay={0.16}>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <a href="#start" className="inst-btn inst-btn-primary">
                      Проверить применимость
                      <span aria-hidden="true">→</span>
                    </a>
                    <a href="#calc" className="inst-btn inst-btn-ghost">
                      Рассчитать бюджет
                    </a>
                  </div>
                </Reveal>

                {/* Снятие возражений строкой, а не отдельным блоком ниже. */}
                <Reveal delay={0.2}>
                  <p className="inst-label mt-7 flex flex-wrap gap-x-5 gap-y-2">
                    <span>тест 7 дней без списаний</span>
                    <span aria-hidden="true" className="text-[var(--line-strong)]">/</span>
                    <span>без доступа к сайту</span>
                    <span aria-hidden="true" className="text-[var(--line-strong)]">/</span>
                    <span>возврат остатка</span>
                  </p>
                </Reveal>
              </div>

              {/*
                ПАНЕЛЬ ПРОДУКТА. Рамка, шапка с именем проекта и строка
                состояния — вокруг графика собран интерфейс, а не картинка.

                Приём общий у всех разобранных работ: продукт показывают
                снимком собственного интерфейса, а не иллюстрацией. Панель
                получает единственное скругление на странице — шесть пикселей,
                ровно столько, сколько у Vercel: она изображает окно программы,
                а окна на этой земле скруглены.
              */}
              <Reveal delay={0.24} className="col-span-12 lg:col-span-6">
                <figure className="overflow-hidden rounded-[6px] border border-[var(--line-strong)] bg-[var(--ink-1)] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
                  <figcaption className="flex items-center justify-between gap-4 border-b border-[var(--line)] px-5 py-3.5">
                    <span className="inst-label text-[var(--paper-2)]">
                      кабинет · проект «стяжка-казань»
                    </span>
                    <span className="inst-label flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="block h-1.5 w-1.5 rounded-full bg-[var(--signal)]"
                      />
                      идёт
                    </span>
                  </figcaption>

                  <div className="px-5 pt-6 pb-5 sm:px-7">
                    <RankClimb />
                  </div>

                  <div className="grid grid-cols-3 border-t border-[var(--line)]">
                    {[
                      { k: "фраз в работе", v: "667" },
                      { k: "в ТОП-10", v: "51", u: "%" },
                      { k: "списано вчера", v: "412", u: "₽" },
                    ].map((x, i) => (
                      <div
                        key={x.k}
                        className={`px-5 py-4 sm:px-7 ${i > 0 ? "border-l border-[var(--line)]" : ""}`}
                      >
                        <span className="inst-label">{x.k}</span>
                        <p className="inst-metric-body mt-2 [--metric:26px]">
                          <span className="inst-metric-n">{x.v}</span>
                          {x.u ? <span className="inst-metric-u">{x.u}</span> : null}
                        </p>
                      </div>
                    ))}
                  </div>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/*
          ПОКАЗАНИЯ. Одно число главенствует, три уходят на поля.

          Четыре равные ячейки в ряд — самый частый блок сгенерированного
          лендинга и ровно то, что было здесь раньше. Но величины не равны по
          весу: возврат остатка снимает главное возражение, остальные три
          уточняют условия. Композиция обязана это показывать, иначе читатель
          распределяет внимание поровну между важным и второстепенным.
        */}
        <section className="inst-band">
          <div className="inst-sheet inst-pad">
            <div className="grid grid-cols-12 gap-x-6 gap-y-12">
              <Reveal className="col-span-12 lg:col-span-7">
                <span className="inst-label">{METRICS[3].cap}</span>
                <p className="inst-figure mt-6 flex items-start text-[var(--paper)]">
                  {METRICS[3].v}
                  <span className="inst-metric-u mt-[0.18em] text-[clamp(16px,2vw,28px)]">
                    {METRICS[3].u}
                  </span>
                </p>
                <p className="inst-lead mt-6 max-w-[34ch]">{METRICS[3].n}</p>
              </Reveal>

              <div className="col-span-12 lg:col-span-5 lg:pl-10">
                {METRICS.slice(0, 3).map((m, i) => (
                  <Reveal
                    key={m.cap}
                    delay={0.06 + i * 0.05}
                    className="inst-row flex items-baseline justify-between gap-6 border-t border-[var(--line)] py-6 last:border-b"
                  >
                    <span className="inst-label max-w-[16ch]">{m.cap}</span>
                    <span className="inst-metric-body inst-metric-s shrink-0">
                      <span className="inst-metric-n">{m.v}</span>
                      <span className="inst-metric-u">{m.u}</span>
                    </span>
                  </Reveal>
                ))}
                <p className="inst-body mt-6 text-[13px]">
                  {METRICS.slice(0, 3).map((m) => m.n).join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/*
          ПРОБЛЕМА И ОТВЕТ. Не две колонки рядом, а превращение в одной строке.

          Две колонки списков заставляют читателя сопоставлять пункты глазами:
          он должен догадаться, что третий слева отвечает третьему справа.
          Здесь пара стоит на одной строке — зачёркнутое слева, ответ справа,
          стрелка между ними. Отношение показано формой, а не подписью
          «сейчас» и «с сервисом» над колонками.
        */}
        <section className="inst-band">
          <div className="inst-sheet inst-pad">
            <Reveal>
              <h2 className="inst-d2 max-w-[20ch]">Сайт есть, а заявок из поиска нет</h2>
              <p className="inst-body mt-6 max-w-[62ch]">
                Классическая оптимизация делает сайт технически правильным. Но
                Яндекс ранжирует не правильность, а то, как люди на сайте себя
                ведут. Нет сигналов, нет движения.
              </p>
            </Reveal>

            <div className="inst-edge-to-edge mt-14 border-t border-[var(--line)]">
              {NOW.map((was, i) => (
                <Reveal key={was} delay={i * 0.05}>
                  <div className="inst-row inst-swap border-b border-[var(--line)] px-6 py-6 sm:px-10">
                    <span className="inst-swap-from text-[15px] leading-snug">{was}</span>
                    <span aria-hidden="true" className="inst-swap-arrow hidden text-[15px] lg:block">
                      →
                    </span>
                    <span className="text-[15px] leading-snug font-medium text-[var(--paper)]">
                      {WITH_SERVICE[i]}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/*
          МЕХАНИКА. Номер такта набран как графика и стоит вне текстовой
          колонки.

          Прежде это были четыре одинаковые ячейки с подписью «01» кеглем
          одиннадцать — номер существовал формально и ничего не держал. Здесь
          он размером с заголовок и цветом линии: работает разделителем и
          отметкой порядка одновременно, а текст идёт рядом с ним, а не под.
        */}
        <section id="how" className="inst-band scroll-mt-8">
          <div className="inst-sheet inst-pad">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
                <h2 className="inst-d2 max-w-[16ch]">{MECHANISM.name}</h2>
                <p className="inst-body max-w-[34ch]">
                  Четыре шага, десять минут на запуск. Остановить и возобновить
                  можно на любом из них.
                </p>
              </div>
            </Reveal>

            <div className="inst-edge-to-edge mt-16 border-t border-[var(--line)]">
              {MECHANISM.steps.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.06}>
                  <div className="inst-row grid grid-cols-12 items-start gap-x-8 gap-y-4 border-b border-[var(--line)] px-6 py-10 sm:px-10">
                    <span className="inst-step-n col-span-12 lg:col-span-2">{ordinal(i)}</span>
                    <h3 className="inst-d3 col-span-12 lg:col-span-4">{p.t}</h3>
                    <p className="inst-body col-span-12 max-w-[58ch] lg:col-span-6">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="calc" className="inst-band scroll-mt-8">
          <div className="inst-sheet inst-pad">
            <Head
              eyebrow="прозрачная цена"
              title="Посчитайте бюджет под свой сайт"
            />
            <Reveal delay={0.1} className="mt-12 block">
              <Calculator />
            </Reveal>
          </div>
        </section>

        {/*
          Развёртка «до и после». Аудит категории показал, что явное сравнение
          бьёт абстрактные проценты, поэтому блок получает самую широкую рамку
          на странице и ломает ритм стопки, которому подчинено всё остальное.
        */}
        <section className="inst-band">
          <div className="inst-sheet inst-pad">
            <Head
              eyebrow="один проект, шесть недель"
              title="667 запросов, до и после"
              lede="Сколько запросов стояло в каждом диапазоне позиций до подключения и что стало через шесть недель."
            />
            <Reveal delay={0.1} className="mt-14 block">
              <BeforeAfter />
            </Reveal>
          </div>
        </section>

        {/*
          РЕЗУЛЬТАТЫ читаются как банк показаний: строка на проект, величина
          справа, полоса роста посередине. Не карточки — таблица, потому что
          сравнивать здесь важнее, чем разглядывать по отдельности.
        */}
        <section id="cases" className="inst-band scroll-mt-8">
          <div className="inst-sheet inst-pad">
            <Head
              title="Что получилось у других"
              aside={
                <span className="inst-label col-span-12 border border-[var(--line-strong)] px-3 py-1.5 lg:col-span-5 lg:justify-self-end lg:self-end">
                  демо-данные
                </span>
              }
            />

            <div className="inst-edge-to-edge mt-14 border-t border-[var(--line)]">
              <div className="hidden grid-cols-12 gap-x-6 border-b border-[var(--line)] px-6 py-4 sm:px-10 lg:grid">
                <span className="inst-label col-span-5">ниша и регион</span>
                <span className="inst-label col-span-4">доля запросов в ТОП-10</span>
                <span className="inst-label col-span-3 text-right">стало</span>
              </div>

              {CASES.map((c, i) => (
                <Reveal key={c.niche} delay={i * 0.05}>
                  <article className="inst-row grid grid-cols-12 items-center gap-x-6 gap-y-5 border-b border-[var(--line)] px-6 py-7 sm:px-10">
                    <div className="col-span-12 lg:col-span-5">
                      <h3 className="text-[18px] leading-tight font-medium tracking-[-0.02em]">
                        {c.niche}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-[var(--paper-3)]">
                        {c.city}, {c.scope}
                      </p>
                      <p className="inst-label mt-2">{c.watch}</p>
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                      {/*
                        Тёмный отрезок — исходное положение, янтарный — то, что
                        добавилось. Пока прирост был тем же цветом на трети
                        прозрачности, полоса читалась одной выцветающей линией,
                        и главную величину блока приходилось вычитать глазом.
                      */}
                      <div className="flex h-1.5 w-full overflow-hidden bg-[var(--ink-2)]">
                        <span
                          className="block bg-[var(--paper-4)]"
                          style={{ width: `${c.was}%` }}
                          title={`было ${c.was} процентов`}
                        />
                        <span
                          className="block bg-[var(--amber)]"
                          style={{ width: `${c.top - c.was}%` }}
                          title={`прирост ${c.top - c.was} процентных пунктов`}
                        />
                      </div>
                      <p className="inst-label mt-3">
                        было {c.was}, стало {c.top} процентов
                      </p>
                    </div>

                    <p className="inst-metric-body inst-metric-s col-span-12 justify-start lg:col-span-3 lg:justify-end">
                      <span className="inst-metric-n">{c.top}</span>
                      <span className="inst-metric-u">%</span>
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="voices" className="inst-band scroll-mt-8">
          <div className="inst-sheet inst-pad">
            <Head title="Говорят те, кто платит" />
            <div className="mt-14">
              <Voices />
            </div>
          </div>
        </section>

        {/*
          ТАРИФЫ. Шапка колонок обязательна: без неё «4 ₽» — четыре рубля за
          неизвестно что, а единица измерения объяснялась сноской ПОД таблицей,
          то есть после того, как читатель прошёл все три строки.
        */}
        <section id="pricing" className="inst-band scroll-mt-8">
          <div className="inst-sheet inst-pad">
            <Head title="Тарифы отличаются только скоростью" />

            <div className="inst-edge-to-edge mt-14 border-t border-[var(--line)]">
              <div className="hidden grid-cols-12 gap-x-6 border-b border-[var(--line)] px-6 py-4 sm:px-10 lg:grid">
                <span className="inst-label col-span-2">₽ за фразу в день</span>
                <span className="inst-label col-span-3">тариф</span>
                <span className="inst-label col-span-3">срок выхода</span>
                <span className="inst-label col-span-4">кому подходит</span>
              </div>

              {RATES.map((r, i) => (
                <Reveal key={r.plan} delay={i * 0.05}>
                  <div className="inst-row grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-b border-[var(--line)] px-6 py-7 sm:px-10">
                    <p className="inst-metric-body inst-metric-s col-span-12 lg:col-span-2">
                      <span className="inst-metric-n">{r.rate}</span>
                      <span className="inst-metric-u">₽</span>
                    </p>
                    <span className="col-span-12 text-[18px] font-medium tracking-[-0.02em] lg:col-span-3">
                      {r.plan}
                    </span>
                    <span className="col-span-12 text-[14px] text-[var(--paper-2)] lg:col-span-3">
                      сдвиги от {r.win}
                    </span>
                    <span className="col-span-12 text-[14px] text-[var(--paper-3)] lg:col-span-4">
                      {r.who}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <p className="inst-body mt-6 max-w-[62ch]">
                Цена указана за одну фразу в день. Абонентской платы нет, баланс не
                сгорает, тест на семь дней идёт без привязки карты. Срок выхода
                зависит от исходных условий проекта и определяется на оценке
                применимости.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-20 block">
              <h3 className="inst-d3 max-w-[24ch]">
                Чем больше объём, тем дешевле переход
              </h3>
              <div className="mt-10">
                <VolumeScale />
              </div>
            </Reveal>

            {/* Два рычага, найденных аудитом работающими у других и отсутствующими здесь. */}
            <Reveal delay={0.2}>
              <div className="inst-grid inst-edge-to-edge mt-16 grid-cols-1 lg:grid-cols-[4fr_3fr]">
                <div>
                  <span className="inst-label">переход от конкурента</span>
                  <p className="mt-5 max-w-[34ch] text-[17px] leading-snug font-medium tracking-[-0.02em]">
                    Удвоим первое пополнение, если приходите от другого сервиса
                  </p>
                  <p className="inst-body mt-3 max-w-[42ch] text-[14px]">
                    Достаточно скриншота кабинета с расходом за последний месяц.
                    Семантику переносим сами.
                  </p>
                </div>
                <div>
                  <span className="inst-label">реферальная программа</span>
                  <p className="mt-5 max-w-[34ch] text-[17px] leading-snug font-medium tracking-[-0.02em]">
                    10 процентов с пополнений тех, кого привели
                  </p>
                  <p className="inst-body mt-3 max-w-[42ch] text-[14px]">
                    Начисляется постоянно, не разово. Выводится на баланс или на
                    расчётный счёт.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/*
          Одно обещание, одно действие. Обещание скорости стоит здесь вместе с
          условиями применения, а не отдельно: п.24 разрешает эту формулировку
          только в такой паре.
        */}
        <section id="start" className="settle-in inst-band scroll-mt-8">
          <div className="inst-sheet inst-pad">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="col-span-12 lg:col-span-7">
                <Reveal>
                  <Eyebrow>что мы обещаем и на каких условиях</Eyebrow>
                  <h2 className="inst-d1 mt-6">Не сдвинулись за неделю, вернём остаток</h2>
                  <p className="inst-lead mt-7 max-w-[52ch]">
                    {CLAIM.headline}. Если за первые семь дней позиции по вашим
                    запросам не изменились, возвращаем неизрасходованный баланс —
                    одной кнопкой в кабинете, без переписки и объяснений.
                  </p>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="https://lk.topinjector.ru/register"
                      className="inst-btn inst-btn-primary"
                    >
                      Проверить применимость
                      <span aria-hidden="true">→</span>
                    </a>
                    <a href="https://t.me/topinjector" className="inst-btn inst-btn-ghost">
                      Задать вопрос в Telegram
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.08} className="col-span-12 lg:col-span-5">
                <span className="inst-label">условия</span>
                <ul className="mt-6">
                  {CLAIM.conditions.map((c, i) => (
                    <li
                      key={c}
                      className="flex gap-5 border-t border-[var(--line)] py-4 first:border-t-0 first:pt-0"
                    >
                      <span className="inst-idx shrink-0">{ordinal(i)}</span>
                      <span className="text-[14px] leading-snug text-[var(--paper-2)]">{c}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="faq" className="inst-band scroll-mt-8">
          <div className="inst-sheet inst-pad">
            <Head title="Честные ответы" />

            <div className="inst-edge-to-edge mt-14 border-t border-[var(--line)]">
              {FAQ.map((item, i) => (
                <Reveal key={item.q} delay={i * 0.04}>
                  <details className="group inst-row border-b border-[var(--line)]">
                    <summary className="grid cursor-pointer list-none grid-cols-12 items-baseline gap-x-6 px-6 py-6 sm:px-10">
                      <span className="inst-idx col-span-1 hidden lg:block">{ordinal(i)}</span>
                      <span className="col-span-11 text-[17px] leading-snug font-medium tracking-[-0.02em] transition-colors group-hover:text-[var(--amber)] sm:text-[19px] lg:col-span-10">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="col-span-1 justify-self-end text-[18px] text-[var(--paper-3)] transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="grid grid-cols-12 gap-x-6 px-6 pb-7 sm:px-10">
                      <p className="inst-body col-span-12 max-w-[68ch] lg:col-span-10 lg:col-start-2">
                        {item.a}
                      </p>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer
        links={NAV_LINKS}
        cross={[
          { label: "Для агентств", href: "/pro" },
          { label: "База знаний", href: "/docs" },
          { label: "Ограничения и риски", href: "/limits" },
        ]}
      />
    </div>
  );
}
