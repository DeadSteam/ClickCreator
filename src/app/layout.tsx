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
      <body className="dither min-h-dvh antialiased">{children}</body>
    </html>
  );
}
