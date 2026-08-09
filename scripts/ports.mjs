/*
  Общие операции с портами разработки.

  Вынесено из dev-all и dev-stop, потому что нужно обоим: запуск сначала
  проверяет занятость, а с флагом --force ещё и освобождает. Две копии этой
  логики разъехались бы на первой же правке.
*/

import { execFileSync } from "node:child_process";
import { connect } from "node:net";

/* Порт остался один: лендинги-гипотезы на 3001-3005 удалены вместе с sites/. */
export const PORTS = [3000];
export const isWin = process.platform === "win32";

const run = (cmd, args) => {
  try {
    return execFileSync(cmd, args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    /* Ненулевой код здесь означает "ничего не найдено", а не сбой. */
    return "";
  }
};

/**
 * Занят ли порт. Проверяем подключением, а не попыткой занять.
 *
 * Занять не годится: next слушает на IPv6-адресе (::), а на Windows двойной
 * стек по умолчанию выключен, поэтому проба на 0.0.0.0 спокойно встаёт на
 * тот же номер и рапортует "свободно". Сервер после этого стартует и падает
 * с EADDRINUSE - ровно на этом проверка и промахивалась.
 *
 * Подключение честнее: если по адресу отвечают, порт занят, независимо от
 * того, на каком стеке слушают. Пробуем оба адреса.
 */
export function isBusy(port) {
  const reaches = (host) =>
    new Promise((done) => {
      const sock = connect({ port, host });
      const finish = (busy) => {
        sock.destroy();
        done(busy);
      };
      sock.setTimeout(600);
      sock.once("connect", () => finish(true));
      sock.once("timeout", () => finish(false));
      sock.once("error", () => finish(false));
    });

  return Promise.all([reaches("127.0.0.1"), reaches("::1")]).then((h) =>
    h.some(Boolean),
  );
}

/** Карта pid -> порт для всех слушателей на наших портах. */
export function listeners() {
  const found = new Map();

  if (isWin) {
    /* netstat -ano: последняя колонка - pid, состояние LISTENING. */
    for (const line of run("netstat", ["-ano"]).split("\n")) {
      const m = line.match(/^\s*TCP\s+\S+:(\d+)\s+\S+\s+LISTENING\s+(\d+)/);
      if (!m) continue;
      const port = Number(m[1]);
      if (PORTS.includes(port)) found.set(Number(m[2]), port);
    }
  } else {
    /*
      Сначала ss, потом lsof. На минимальных серверных образах lsof обычно не
      установлен, а ss входит в iproute2 и есть практически везде. Обратный
      порядок означал бы, что на голом сервере очистка молча ничего не находит.
    */
    const ss = run("ss", ["-ltnpH"]);
    if (ss) {
      for (const line of ss.split("\n")) {
        /* Строка вида:  LISTEN 0 511 *:3001 *:* users:(("next-server",pid=123,fd=20)) */
        const port = line.match(/:(\d+)\s+\S+\s+users:/);
        const pid = line.match(/pid=(\d+)/);
        if (!port || !pid) continue;
        if (PORTS.includes(Number(port[1]))) {
          found.set(Number(pid[1]), Number(port[1]));
        }
      }
    } else {
      for (const port of PORTS) {
        const out = run("lsof", ["-nP", `-iTCP:${port}`, "-sTCP:LISTEN", "-t"]);
        for (const pid of out.split("\n").filter(Boolean)) {
          found.set(Number(pid), port);
        }
      }
    }
  }

  return found;
}

/** Командная строка процесса. Нужна, чтобы не убить чужой сервер. */
export function cmdline(pid) {
  if (isWin) {
    return run("powershell", [
      "-NoProfile",
      "-Command",
      `(Get-CimInstance Win32_Process -Filter "ProcessId=${pid}").CommandLine`,
    ]).trim();
  }
  return run("ps", ["-o", "command=", "-p", String(pid)]).trim();
}

/**
 * Гасит слушателей наших портов, принадлежащих этому репозиторию.
 *
 * Чужие процессы не трогаем: убитый молча сервер соседнего проекта - куда
 * более неприятный сюрприз, чем несработавшая очистка. Возвращает, что было
 * погашено и что осталось.
 */
export function freePorts(root) {
  const mine = [];
  const alien = [];

  for (const [pid, port] of listeners()) {
    const cmd = cmdline(pid);
    /* Сравнение без учёта регистра: на Windows один и тот же путь
       встречается и как C:\, и как c:\. */
    if (cmd.toLowerCase().includes(root.toLowerCase())) mine.push({ pid, port });
    else alien.push({ pid, port, cmd: cmd.slice(0, 70) });
  }

  for (const { pid } of mine) {
    /* /T обязателен: гасим дерево. Без него next переживает смерть
       запустившей его оболочки и продолжает держать порт. */
    if (isWin) run("taskkill", ["/pid", String(pid), "/T", "/F"]);
    else {
      try {
        process.kill(pid, "SIGKILL");
      } catch {
        /* уже умер */
      }
    }
  }

  return { killed: mine, alien };
}
