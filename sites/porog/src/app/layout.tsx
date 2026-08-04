import type { Metadata, Viewport } from "next";
import { Geologica } from "next/font/google";

import { SITE } from "@/lib/site";
import "./globals.css";

/*
  Одна гарнитура на весь сайт.

  Geologica - переменный гротеск с узкими прямыми формами и сильным
  характером: на крупном кегле он звучит как заявление, а не как заголовок
  лендинга. Вторую гарнитуру (машинописную Cousine) убрали вместе с таблицами
  и служебными подписями, ради которых её и заводили. Заодно исчезла вечная
  морока со знаком рубля, которого в Cousine просто нет: внутри моноширинного
  класса браузер подменял его системным шрифтом, и строка выглядела собранной
  из двух разных гарнитур.

  Кириллица проверена: у половины шрифтов, которые рекомендуют базы шрифтовых
  пар, её нет, и подмена системным шрифтом на русском тексте видна сразу.

  Про начертания. Просим ровно три, которые используются стилями: 400 читает,
  500 ведёт, 700 заявляет.

  Заодно осторожность с измерением веса шрифтов: на диске сборки Geologica
  занимает 256 кБ в 22 файлах, и это не то число, которое видит посетитель.
  Переменный шрифт разбит по unicode-range, браузер тянет только диапазоны
  под фактические символы страницы, поэтому русскоязычный посетитель качает
  заметно меньше. Мерить нужно переданные байты в браузере, а не размер папки.
*/
const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "700"],
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
  /* Совпадает с --color-sheet: адресная строка продолжает страницу. */
  themeColor: "#f8f9fa",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={geologica.variable}>
      <body className="min-h-dvh antialiased">
        {/* Без этой ссылки клавиатурный посетитель проходит всю навигацию и
            три вопроса анкеты прежде, чем доберётся до первого слова текста. */}
        <a
          href="#main"
          className="sr-only z-50 focus:not-sr-only focus:fixed focus:top-4 focus:left-4
            focus:bg-[var(--color-graphite)] focus:px-6 focus:py-3 focus:text-[17px]
            focus:font-medium focus:text-[var(--color-sheet)]"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
