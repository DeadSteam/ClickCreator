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
  title: {
    default: "TopInjector: продвижение сайта в ТОП-1 Яндекса",
    template: "%s · TopInjector",
  },
  description:
    "Поднимаем позиции сайта в Яндексе за счёт поведенческих сигналов. Оплата за фактические переходы, тест 7 дней, возврат остатка при отсутствии роста.",
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
        <a
          href="#main"
          className="sr-only z-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3
            focus:rounded-[var(--radius-pill)] focus:bg-[oklch(0.155_0.038_32)]
            focus:px-4 focus:py-3 focus:text-[14px] focus:font-semibold
            focus:text-[oklch(0.965_0.010_60)]"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
