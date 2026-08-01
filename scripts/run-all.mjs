/*
  Запуск всех шести сайтов сразу - в разработке или в продакшне.

  Зачем свой скрипт, а не concurrently: зависимость ради сотни строк не нужна,
  а три вещи, которые здесь важнее всего, готовые обёртки делают неправильно
  либо не делают вовсе.

  Первое - остановка. На Windows child.kill() убивает только запущенный cmd,
  а сам процесс next остаётся жить и держать порт. Здесь дерево процессов
  гасится через taskkill /T, а на POSIX - сигналом всей группе.

  Второе - порты берутся из package.json каждого сайта, а не переписываются
  здесь руками. Список в двух местах однажды разъедется, и разъедется молча.

  Третье - режим. Один и тот же раннер поднимает и next dev, и next start,
  потому что разница между ними ровно в имени npm-скрипта и в том, что
  продакшну нужна предварительная сборка. Два почти одинаковых файла
  разъехались бы на первой правке.

  Оговорка про сирот: обработчик Ctrl+C гасит дерево процессов, но при жёстком
  снятии самого раннера (закрытая вкладка, диспетчер задач, падение редактора)
  сработать он не успевает, и next остаётся держать порт. На этот случай есть
  npm run stop и флаг --force, который делает то же самое перед запуском.

  Запуск:
    node scripts/run-all.mjs                        разработка, localhost
    node scripts/run-all.mjs --mode start           продакшн, нужна сборка
    node scripts/run-all.mjs --host 0.0.0.0         принимать извне
    node scripts/run-all.mjs reestr klik            только названные
    node scripts/run-all.mjs --force                освободить порты и запустить
*/

import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { freePorts, isBusy, isWin } from "./ports.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* Папки сайтов относительно корня. Порядок задаёт порядок в выводе. */
const DIRS = [
  "topinjector",
  "sites/reestr",
  "sites/porog",
  "sites/klik",
  "sites/rech",
  "sites/razgon",
];

/*
  Цвета для префиксов. Восьмицветной палитры хватает: различать нужно шесть
  потоков, а не раскрашивать. Если вывод уходит не в терминал (перенаправлен
  в файл, в systemd или в CI), коды отключаются - иначе журнал засоряется
  escape-последовательностями.
*/
const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const COLORS = [36, 33, 32, 35, 34, 31];

/*
  Управляющий символ задан кодом, а не вставлен в файл сырым байтом: сырой ESC
  в исходнике невидим глазом и теряется при копировании и правке.
*/
const ESC = String.fromCharCode(27);
const paint = (i, s) =>
  useColor ? `${ESC}[${COLORS[i % COLORS.length]}m${s}${ESC}[0m` : s;
const dim = (s) => (useColor ? `${ESC}[2m${s}${ESC}[0m` : s);

/* ------------------------------ аргументы ------------------------------ */

const args = process.argv.slice(2);

const flagValue = (name, fallback) => {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const mode = flagValue("--mode", "dev");
if (mode !== "dev" && mode !== "start") {
  console.error(`Неизвестный режим: ${mode}. Допустимо: dev, start.`);
  process.exit(1);
}

/*
  Хост по умолчанию localhost, а не 0.0.0.0, намеренно. Значение по умолчанию,
  открывающее сервер разработки всей локальной сети, - неприятный сюрприз;
  выставлять его наружу нужно осознанно, флагом.
*/
const host = flagValue("--host", "localhost");
const force = args.includes("--force") || args.includes("-f");

/** Читает имя пакета и порт из скрипта нужного режима. */
function readSite(dir) {
  const pkg = JSON.parse(readFileSync(join(ROOT, dir, "package.json"), "utf8"));
  const script = pkg.scripts?.[mode] ?? "";
  /* "next start -p 3001" либо просто "next start" - тогда порт по умолчанию. */
  const m = script.match(/-p\s+(\d+)/);
  return {
    dir,
    name: pkg.name,
    short: dir.split("/").pop(),
    port: m ? Number(m[1]) : 3000,
    hasScript: Boolean(script),
  };
}

const all = DIRS.map(readSite);

/*
  Фильтр из аргументов. Сверяем и с коротким именем папки, и с именем пакета.

  Значения флагов ("start", "0.0.0.0") в фильтр попадать не должны, поэтому
  их позиции считаются заранее. Считаем именно позиции, а не значения: раньше
  здесь было args[args.indexOf(flag) + 1], и при отсутствующем флаге indexOf
  возвращал -1, а args[0] - то есть первое же имя сайта - молча уезжало в
  список "значений флагов". Фильтр после этого оказывался пустым, и вместо
  одного названного сайта поднимались все шесть.
*/
const valuePositions = new Set();
for (const flag of ["--mode", "--host"]) {
  const i = args.indexOf(flag);
  if (i !== -1 && args[i + 1] !== undefined) valuePositions.add(i + 1);
}

const wanted = args.filter(
  (a, i) => !a.startsWith("-") && !valuePositions.has(i),
);

const sites = wanted.length
  ? all.filter((s) => wanted.includes(s.short) || wanted.includes(s.name))
  : all;

if (!sites.length) {
  console.error(`Не найдено ни одного сайта по фильтру: ${wanted.join(", ")}`);
  console.error(`Доступны: ${all.map((s) => s.short).join(", ")}`);
  process.exit(1);
}

const noScript = sites.filter((s) => !s.hasScript);
if (noScript.length) {
  console.error(`Нет скрипта "${mode}" у: ${noScript.map((s) => s.short).join(", ")}`);
  process.exit(1);
}

/* --------------------------- проверка сборки --------------------------- */

/*
  В продакшне next start падает, если сборки нет, и падает невнятно. Проверяем
  заранее по BUILD_ID: он появляется только после next build, тогда как папка
  .next существует и после одного лишь запуска разработки.
*/
if (mode === "start") {
  const unbuilt = sites.filter(
    (s) => !existsSync(join(ROOT, s.dir, ".next", "BUILD_ID")),
  );
  if (unbuilt.length) {
    console.error("");
    console.error("Нет продакшн-сборки у:");
    for (const s of unbuilt) console.error(`  ${s.short}`);
    console.error("");
    console.error("Собрать всё:  npm run build:all");
    console.error("");
    process.exit(1);
  }
}

/* ----------------------------- порты ----------------------------------- */

async function busyPorts(list) {
  const flags = await Promise.all(list.map((s) => isBusy(s.port)));
  return list.filter((_, i) => flags[i]);
}

let busy = await busyPorts(sites);

if (busy.length && force) {
  const { killed, alien } = freePorts(ROOT);
  for (const { pid, port } of killed) {
    console.log(dim(`  освобождён ${port} (pid ${pid})`));
  }
  if (alien.length) {
    console.error("");
    console.error("Не трогаю - это не процессы этого репозитория:");
    for (const a of alien) console.error(`  ${a.port}  pid ${a.pid}`);
  }
  /* Порт освобождается не мгновенно: даём системе закрыть сокеты. */
  await new Promise((r) => setTimeout(r, 1200));
  busy = await busyPorts(sites);
}

if (busy.length) {
  console.error("");
  console.error("Порты уже заняты:");
  console.error("");
  for (const s of busy) console.error(`  ${s.port}  ${s.short}`);
  console.error("");
  console.error("Освободить:  npm run stop");
  console.error("Либо сразу:  добавить --force");
  console.error("");
  process.exit(1);
}

/* ----------------------------- запуск ---------------------------------- */

const width = Math.max(...sites.map((s) => s.short.length));
const children = [];
let stopping = false;

for (const [i, site] of sites.entries()) {
  const label = paint(i, site.short.padEnd(width));

  /*
    Аргументы после -- npm передаёт самому next. Так хост задаётся, не трогая
    package.json каждого сайта: -H нужен только при запуске наружу, и хранить
    его в скриптах было бы неверно.
  */
  const extra = host === "localhost" ? "" : ` -- -H ${host}`;

  /*
    shell: true обязателен на Windows: npm - это npm.cmd, а Node с версии
    18.20 отказывается запускать .cmd напрямую. Имена рабочих пространств
    без пробелов и кавычек, поэтому склейка строки здесь безопасна.

    detached на POSIX создаёт группу процессов, чтобы её можно было погасить
    целиком одним сигналом.
  */
  const child = spawn(`npm run ${mode} -w ${site.name}${extra}`, {
    cwd: ROOT,
    shell: true,
    detached: !isWin,
    stdio: ["ignore", "pipe", "pipe"],
  });

  children.push({ child, site });

  /* Построчная префиксация. Хвост без перевода строки копится до следующего
     куска, иначе длинный вывод рвётся посреди строки и префиксы съезжают. */
  const prefix = (stream) => {
    let tail = "";
    stream.setEncoding("utf8");
    stream.on("data", (chunk) => {
      const lines = (tail + chunk).split("\n");
      tail = lines.pop() ?? "";
      for (const line of lines) {
        if (line.trim()) console.log(`${label} ${dim("│")} ${line}`);
      }
    });
  };

  prefix(child.stdout);
  prefix(child.stderr);

  child.on("exit", (code) => {
    if (stopping) return;
    console.log(`${label} ${dim("│")} процесс завершился, код ${code}`);
  });
}

/* В ссылках показываем адрес, по которому реально стучаться: при -H 0.0.0.0
   сервер слушает все интерфейсы, но открывать его будут по имени машины. */
const shown = host === "0.0.0.0" ? "localhost" : host;

console.log("");
console.log(dim(`  режим: ${mode === "dev" ? "разработка" : "продакшн"}`));
if (host !== "localhost") console.log(dim(`  слушает: ${host}`));
console.log("");
for (const [i, s] of sites.entries()) {
  console.log(`  ${paint(i, s.short.padEnd(width))}  http://${shown}:${s.port}`);
}
console.log(dim("\n  Ctrl+C останавливает все сразу\n"));

/*
  Остановка. На Windows child.kill() гасит только оболочку, а next остаётся
  держать порт, поэтому дерево убивается через taskkill с ключом /T.
  На POSIX сигнал уходит всей группе процессов - отсюда минус перед pid.
*/
function stopAll() {
  if (stopping) return;
  stopping = true;
  console.log(dim("\n  Останавливаю...\n"));

  for (const { child } of children) {
    if (child.exitCode !== null || !child.pid) continue;
    if (isWin) {
      spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
        stdio: "ignore",
      });
    } else {
      try {
        process.kill(-child.pid, "SIGTERM");
      } catch {
        /* группа уже умерла */
      }
    }
  }

  /* Даём процессам секунду на нормальный выход и уходим сами. */
  setTimeout(() => process.exit(0), 1000).unref();
}

process.on("SIGINT", stopAll);
process.on("SIGTERM", stopAll);
