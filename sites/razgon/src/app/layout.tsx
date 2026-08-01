import type { Metadata, Viewport } from "next";
import { Sofia_Sans, Sofia_Sans_Extra_Condensed } from "next/font/google";

import { SITE } from "@/lib/site";
import "./globals.css";

/*
  Две гарнитуры одного семейства: сверхузкая кричит, обычная объясняет.

  Sofia Sans Extra Condensed даёт ощущение скорости самой пропорцией буквы,
  без единой полоски движения и без курсива - именно поэтому здесь не
  понадобились ни бегущие строки, ни параллакс. Родство начертаний держит
  страницу единой: сверхузкий заголовок и обычный текст рисовал один человек.

  Обе проверены на кириллицу. Это оказалось решающим: почти все шрифты, которые
  шрифтовые базы предлагают для кинетической типографики - Syncopate, Space
  Mono, Bebas Neue, Anton - кириллицы не имеют вовсе, и на русском тексте
  подменяются системным шрифтом.
*/
const sofia = Sofia_Sans({
  variable: "--font-sofia",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const sofiaXc = Sofia_Sans_Extra_Condensed({
  variable: "--font-sofia-xc",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.brand}: что произойдёт с позициями по суткам`,
    template: `%s · ${SITE.brand}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.brandFull,
    title: `${SITE.brand}: расписание роста позиций по суткам`,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbfbfb",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${sofia.variable} ${sofiaXc.variable}`}>
      <body className="min-h-dvh antialiased">
        {/* Расписание длинное. Без этой ссылки клавиатурный посетитель проходит
            всю навигацию прежде, чем доберётся до первых суток. */}
        <a
          href="#main"
          className="sr-only z-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3
            focus:bg-[var(--color-blaze)] focus:px-4 focus:py-3 focus:text-[15px]
            focus:font-bold focus:text-[var(--color-field)]"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
