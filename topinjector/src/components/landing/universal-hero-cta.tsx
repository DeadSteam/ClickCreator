"use client";

import { Button } from "@/components/ui/button";
import { track } from "@/diagnostic/analytics";

/**
 * Кнопки Hero /universal. Отдельный клиентский компонент, а не onClick прямо
 * в серверной странице: функции не пересекают границу сервер/клиент, поэтому
 * обработчик должен жить там же, где вызывается.
 */
export function UniversalHeroCtas({ hypothesis }: { hypothesis?: string }) {
  return (
    <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-end">
      <Button
        href="#start"
        size="lg"
        arrow
        onClick={() => track("universal_hero_cta_click", { place: "hero", hypothesis })}
      >
        Запустить проверку
      </Button>
      <Button
        href="#how"
        variant="secondary"
        onClick={() => track("universal_how_it_works_click", { place: "hero", hypothesis })}
      >
        Посмотреть, как это работает
      </Button>
    </div>
  );
}
