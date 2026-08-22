import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./instrument.css";
import "./stack.css";
import { THEME_SCRIPT, ThemeSync } from "@/components/ui/theme-toggle";
import { SITE_ORIGIN } from "@/site";

/*
  ОДНА ГАРНИТУРА НА ВЕСЬ САЙТ — ШВЕЙЦАРСКИЙ ГРОТЕСК.

  Задан Helvetica. Настоящую Helvetica отдать с сервера нельзя: она
  лицензионная и веб-версии в свободной раздаче не существует. Поэтому стек
  в globals.css начинается с системной Helvetica Neue — на macOS и iOS
  пользователь видит именно её, — а сюда подключён Inter как подложка для
  всех остальных платформ.

  Inter выбран не «похожим на глаз»: это неогротеск той же школы, с закрытыми
  апертурами и горизонтальными терминалами, и, в отличие от большинства
  бесплатных гротесков, у него полная кириллица. Arial в хвосте стека —
  последний рубеж, метрически совместимый с Helvetica.

  Второй гарнитуры больше нет. Martian Mono держал подписи и цифры, и именно
  он давал разряженные моноширинные лейблы — самый узнаваемый почерк
  шаблонного лендинга. Табличные цифры теперь берутся у Inter через
  `font-variant-numeric: tabular-nums`, а это ровно то, ради чего моноширинный
  здесь и стоял.
*/
const inter = Inter({
  variable: "--font-grotesk",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  /*
    Обещание в заголовке названо ровно так, как разрешает п.24 мастер-документа:
    возможность, а не гарантия, и рядом с условиями применения. Прежний
    «продвижение сайта в ТОП-1 Яндекса» был обещанием без условий в самом
    заметном месте сайта.
  */
  title: {
    default: "TopInjector: ранний измеримый результат в поиске Яндекса",
    template: "%s · TopInjector",
  },
  description:
    "Сервис быстрого продвижения целевых запросов в Яндексе для частных SEO-специалистов. Оценка применимости до запуска, контроль динамики по дням, ранний результат, который можно показать клиенту.",
  openGraph: { type: "website", locale: "ru_RU", siteName: "TopInjector" },
};

/*
  Цвет системной обводки браузера идёт за темой. Одно фиксированное значение
  оставляло светлую полосу над тёмной страницей на мобильных.
*/
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dcdee2" },
    { media: "(prefers-color-scheme: dark)", color: "#12181f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={inter.variable} suppressHydrationWarning>
      <head>
        {/*
          Тема выставляется до первой отрисовки. Через React это невозможно:
          разметка уходит с сервера, где сохранённого выбора не видно, и любая
          тёмная страница начиналась бы со вспышки светлой.
        */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="dither min-h-dvh antialiased">
        {/*
          The page runs to roughly nine thousand pixels. Without this a keyboard
          user tabs through the entire navigation on every visit before reaching
          a single word of content.
        */}
        {/*
          Пропуск навигации выглядит той же клавишей, что и остальные кнопки, —
          он и есть кнопка, просто показывается одной аудитории. Радиус и высота
          берутся из системы, а не выписываются здесь заново.
        */}
        <a
          href="#main"
          className="sr-only z-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3
            focus:rounded-[var(--radius-btn)] focus:bg-[var(--settled-bg)]
            focus:px-5 focus:py-3.5 focus:text-[14px] focus:font-semibold
            focus:text-[var(--settled-ink)]
            focus:shadow-[0_2px_0_color-mix(in_oklab,var(--settled-bg)_70%,black)]"
        >
          Перейти к содержимому
        </a>
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
