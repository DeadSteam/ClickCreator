import type { Metadata, Viewport } from "next";
import { Onest, Martian_Mono } from "next/font/google";
import "./globals.css";

/* Two families, two jobs: Onest speaks, Martian Mono measures. */
const onest = Onest({
  variable: "--font-onest",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://topinjector.ru"),
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

export const viewport: Viewport = {
  themeColor: "#dcdee2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${onest.variable} ${martian.variable}`}>
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
            focus:rounded-[var(--radius-btn)] focus:bg-[oklch(0.172_0.014_252)]
            focus:px-5 focus:py-3.5 focus:text-[14px] focus:font-semibold
            focus:text-[oklch(0.962_0.004_250)]
            focus:shadow-[0_2px_0_oklch(0.100_0.012_252)]"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
