import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SITE } from "@/lib/site";
import "./globals.css";

/*
  Две гарнитуры, две работы: Geist подписывает, Geist Mono показывает.

  Geist предельно нейтрален - у него нет собственной интонации, и рядом с
  огромным показанием он не спорит за внимание. Geist Mono держит цифры в
  колонку: при пересчёте число не должно менять ширину, иначе вместо прибора
  получается мигалка.

  Обе проверены на кириллицу: у половины шрифтов, которые рекомендуют базы
  шрифтовых пар, её нет, и подмена системным шрифтом на русском видна сразу.
*/
const geist = Geist({
  variable: "--font-geist",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.brand}: сколько стоит продвижение вашего сайта`,
    template: `%s · ${SITE.brand}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.brandFull,
    title: `${SITE.brand}: считаем цену до регистрации`,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1a1c1f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh antialiased">
        {/* Без этой ссылки клавиатурный посетитель проходит навигацию и все
            органы управления счётчиком прежде, чем доберётся до текста. */}
        <a
          href="#main"
          className="sr-only z-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3
            focus:bg-[var(--color-read)] focus:px-4 focus:py-3 focus:text-[14px]
            focus:font-medium focus:text-[var(--color-case)]"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
