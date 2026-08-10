"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { HERO_ID } from "./hero";
import { ordinal } from "@/format";

/*
  Рельс глав и полоса прочитанного.

  Материал идёт на семнадцать тысяч пикселей. Без ориентира читатель не знает
  ни где он находится, ни сколько осталось, и на середине третьего блока
  закрывает вкладку. Рельс отвечает на оба вопроса, не отнимая внимания у
  текста: он живёт в левом поле, которое на широком экране всё равно пустует.

  Рельс закреплён к окну, а не стоит колонкой в сетке страницы. Так колонка
  чтения остаётся центрированной — а значит полноширинные развороты считаются
  от центра и уходят за оба края экрана. Пока рельс был колонкой грида, текст
  был сдвинут влево на его ширину, а развороты умели уходить только вправо.

  Он выровнен по собственному контейнеру той же ширины, что и обложка: рельс
  держится рядом с текстом и не улетает в край на широком мониторе.

  Показывается только там, где для него есть место (от 1280px), и только после
  обложки. На узких экранах его заменяет полоса прочитанного — она ничего не
  занимает.
*/

export type RailItem = { id: string; label: string };

/** Активная глава: та, чей блок пересёк верхнюю треть окна последней. */
function useActiveChapter(items: RailItem[]) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      /*
        Полоса срабатывания — верхняя треть окна. Порог по площади здесь не
        годится: главы разной длины, и длинная никогда не попала бы в кадр
        целиком, а короткая занимала бы его весь.
      */
      { rootMargin: "-10% 0px -70% 0px" },
    );

    for (const i of items) {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  return active;
}

/*
  Рельс не должен появляться, пока видна обложка: она не резервирует под него
  поле слева (это отдельный, более широкий слой — см. комментарий в hero.tsx),
  поэтому фиксированный порог в пикселях рано или поздно наезжал на кнопку
  обложки на любом экране, где она выше этого порога. Наблюдатель следит за
  самой обложкой и включает рельс ровно тогда, когда она полностью ушла
  вверх — независимо от её реальной высоты на конкретном экране.
*/
function useScrolledPastHero() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(HERO_ID);
    if (!hero) {
      setPast(true);
      return;
    }

    const io = new IntersectionObserver(([entry]) => setPast(!entry.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return past;
}

export function ReadingRail({ items }: { items: RailItem[] }) {
  const active = useActiveChapter(items);
  const shown = useScrolledPastHero();

  /*
    Скрытый рельс удаляется из разметки целиком, а не прячется прозрачностью:
    невидимый список ссылок остался бы в порядке обхода клавиатурой, и фокус
    уходил бы в пустоту посреди страницы.
  */
  if (!shown) return null;

  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-full xl:block">
      <div className="mx-auto flex h-full max-w-[88rem] px-5">
        <motion.nav
          aria-label="Разделы разбора"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-auto w-[11rem] self-start pt-[120px]"
        >
          <ol className="flex flex-col gap-4">
            {items.map((i, n) => {
              const on = i.id === active;
              return (
                <li key={i.id}>
                  <a
                    href={`#${i.id}`}
                    className="group flex items-baseline gap-3"
                    aria-current={on ? "true" : undefined}
                  >
                    <span
                      className="num text-[11px] tabular-nums"
                      style={{ color: on ? "var(--accent)" : "var(--ink-faint)" }}
                    >
                      {ordinal(n)}
                    </span>
                    <span
                      className={`max-w-[9rem] text-[13px] leading-snug [transition:color_var(--t-hover)_var(--ease-micro)] ${
                        on
                          ? "font-semibold text-[var(--ink)]"
                          : "text-[var(--ink-faint)] group-hover:text-[var(--ink-soft)]"
                      }`}
                    >
                      {i.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </motion.nav>
      </div>
    </div>
  );
}

/**
 * Полоса прочитанного. Единственная деталь страницы, которая двигается
 * постоянно, поэтому она тонкая и не имеет цвета сама по себе: это шкала
 * прибора, а не индикатор загрузки.
 */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent"
    >
      <div className="h-full bg-[var(--accent)]" style={{ width: `${pct}%` }} />
    </div>
  );
}
