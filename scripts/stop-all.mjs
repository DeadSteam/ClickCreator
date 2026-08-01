/*
  Освобождение портов 3000-3005.

  Нужен потому, что процесс next переживает не всякую остановку: закрытая
  вкладка терминала, снятие задачи, упавший редактор - и порт остаётся
  занятым, а следующий запуск падает с EADDRINUSE. Искать pid руками через
  netstat каждый раз утомительно.

  Скрипт трогает только слушателей на этих шести портах и только процессы,
  в командной строке которых есть путь этого репозитория. Чужой сервер на
  3000, запущенный для другого проекта, останется жив.
*/

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { freePorts } from "./ports.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { killed, alien } = freePorts(ROOT);

if (!killed.length && !alien.length) {
  console.log("Порты 3000-3005 свободны.");
} else {
  for (const { pid, port } of killed) {
    console.log(`  освобождён ${port}  (pid ${pid})`);
  }
  if (!killed.length) console.log("Наших процессов на этих портах нет.");

  if (alien.length) {
    console.log("\nНе тронуты - это не процессы этого репозитория:");
    for (const a of alien) {
      console.log(`  ${a.port}  pid ${a.pid}  ${a.cmd || "команда неизвестна"}`);
    }
  }
}
