import type { Metadata, Viewport } from "next";
import { Bona_Nova, Wix_Madefor_Text } from "next/font/google";

import { SITE } from "@/lib/site";
import "./globals.css";

/*
  Две гарнитуры с перевёрнутыми ролями: сериф в заголовках, гротеск в тексте.

  Привычная пара для длинного чтения устроена наоборот, и именно поэтому здесь
  сделано так: сериф Bona Nova даёт заголовкам голос, а Wix Madefor Text
  держит основной текст современным. Обратный порядок превратил бы письмо в
  оцифрованную книгу.

  Обе проверены на кириллицу: у половины шрифтов, которые рекомендуют базы
  шрифтовых пар, её нет, и подмена системным шрифтом на русском видна сразу.
*/
/*
  Начертания перечислены поимённо, иначе next/font тянет всё семейство и вес
  шрифтов уходит за бюджет: было 262 кБ и 26 файлов при потолке 200.

  Bona Nova нужна только полужирной - заголовками и репликами диалога. Прямое
  начертание 400 держалось на одном курсивном абзаце в вопросах, и ради него
  грузилась вдвое большая четвёрка комбинаций. Абзац стал полужирным.

  Wix Madefor Text набирает основной текст (400) и редкие выделения (600).
*/
const bona = Bona_Nova({
  variable: "--font-bona",
  subsets: ["cyrillic", "latin"],
  weight: ["700"],
  style: ["normal", "italic"],
  display: "swap",
});

const madefor = Wix_Madefor_Text({
  variable: "--font-madefor",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.author}: продвижение сайтов поведенческими сигналами`,
    template: `%s · ${SITE.brand}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.brandFull,
    title: `${SITE.author}: письмо о продвижении поведенческими сигналами`,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f2e6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${bona.variable} ${madefor.variable}`}>
      <body className="min-h-dvh antialiased">
        {/* Письмо длинное. Без этой ссылки клавиатурный посетитель проходит
            всю навигацию прежде, чем доберётся до первой строки. */}
        <a
          href="#main"
          className="sr-only z-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3
            focus:bg-[var(--color-ink)] focus:px-4 focus:py-3 focus:text-[15px]
            focus:text-[var(--color-leaf)]"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
