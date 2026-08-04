import type { Metadata, Viewport } from "next";
import { Literata, Geist_Mono } from "next/font/google";

import { SITE } from "@/lib/site";
import "./globals.css";

/*
  Две гарнитуры, две работы: Literata читает, Geist Mono измеряет.

  Literata нарисована для длинного чтения с экрана и потому не выглядит
  декоративным серифом - страница получает вид документа, а не журнала о моде.
  Обе проверены на кириллицу: половина рекомендаций шрифтовых баз её не имеет,
  и подстановка системного шрифта на русском тексте видна сразу.

  Подключены через next/font, а не ссылкой на fonts.googleapis.com: шрифты
  кладутся рядом со сборкой, отдаются с того же домена и не двигают вёрстку
  при загрузке.
*/
const literata = Literata({
  variable: "--font-literata",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.brandFull}: позиции сайтов до и после, построчно`,
    template: `%s · ${SITE.brand}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.brandFull,
    title: `${SITE.brandFull}: позиции сайтов до и после`,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  /* Совпадает с --color-paper: адресная строка продолжает полосу. */
  themeColor: "#f7f4ee",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${literata.variable} ${geistMono.variable}`}>
      <body className="sheet min-h-dvh antialiased">
        {/*
          Страница длинная, и без этой ссылки клавиатурный посетитель проходит
          всю навигацию и фильтры таблицы прежде, чем доберётся до первого слова.
        */}
        <a
          href="#main"
          className="sr-only z-50 focus:not-sr-only focus:fixed focus:top-4 focus:left-4
            focus:bg-[var(--color-ink)] focus:px-6 focus:py-3 focus:text-[17px]
            focus:font-semibold focus:text-[var(--color-paper)]"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
