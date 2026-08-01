import type { Metadata, Viewport } from "next";
import { Geologica, Cousine } from "next/font/google";

import { SITE } from "@/lib/site";
import "./globals.css";

/*
  Две гарнитуры, две работы: Geologica говорит, Cousine измеряет.

  Geologica - переменный гротеск с узкими прямыми формами: рядом с ним текст
  читается как технический документ, а не как маркетинговая страница. Cousine
  метрически совпадает с Courier New и добавляет странице оттенок машинописи -
  того самого, каким набирают технические условия.

  Обе проверены на кириллицу: у половины шрифтов, которые рекомендуют базы
  шрифтовых пар, её нет, и подмена системным шрифтом на русском тексте видна
  сразу.

  Вес у Geologica не указываем: это переменный шрифт, и перечисление
  начертаний заставило бы Next тянуть несколько статических файлов вместо
  одного переменного.
*/
const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const cousine = Cousine({
  variable: "--font-cousine",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.brand}: технические условия на поведенческие сигналы`,
    template: `%s · ${SITE.brand}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.brandFull,
    title: `${SITE.brand}: проверяем допуск до оплаты`,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f7f8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${geologica.variable} ${cousine.variable}`}>
      <body className="min-h-dvh antialiased">
        {/* Без этой ссылки клавиатурный посетитель проходит всю навигацию и
            три поля анкеты прежде, чем доберётся до первого слова текста. */}
        <a
          href="#main"
          className="sr-only z-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3
            focus:bg-[var(--color-graphite)] focus:px-4 focus:py-3 focus:text-[14px]
            focus:font-medium focus:text-[var(--color-sheet)]"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
