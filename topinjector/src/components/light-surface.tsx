"use client";

import { useEffect, useRef } from "react";

/*
  Холодная поверхность за первым экраном. Курсор вносит свет, свет расплывается
  по турбулентности и гаснет примерно за две секунды.

  Обоснованно, а не декоративно: страница построена на окне сомнения, и первый
  экран — его открытый край. Работа специалиста уже идёт, но клиенту она пока
  не видна. Поверхность показывает ровно это: под холодным светом что-то есть,
  но проступает оно только там, где на него посмотрели.

  Прогрессивное улучшение здесь абсолютно. Нет WebGL, включено уменьшенное
  движение или скрыта вкладка — не инициализируется вообще: статичная дуга под
  ним является задуманным запасным вариантом, а не деградацией.
*/

const TRAIL = 12;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;

uniform vec2 uRes;
uniform float uTime;
uniform float uAspect;
uniform vec3 uPoints[${TRAIL}];

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 auv = vec2(uv.x * uAspect, uv.y);

  /* Плотная турбулентность. Без неё пятно читается как радиальный градиент. */
  float n1 = fbm(auv * 2.6 + uTime * 0.05);
  float n2 = fbm(auv * 6.5 - uTime * 0.03);
  vec2 duv = auv + (n1 - 0.5) * 0.16;

  float lum = 0.0;
  for (int i = 0; i < ${TRAIL}; i++) {
    vec3 p = uPoints[i];
    /* Свет ложится чуть выше источника, как отражение на наклонной плоскости. */
    vec2 pp = vec2(p.x * uAspect, p.y - 0.03);
    float d = distance(duv, pp);
    /*
      Затухание держится крутым. При пологом узкий мобильный канвас растягивает
      след в одно пятно во весь экран — то есть именно в кляксу, вместо которой
      здесь и нарисованы изолинии.
    */
    lum += p.z * exp(-d * d * 44.0);
  }

  /*
    Первый экран — холодный край страницы: окно сомнения ещё широко открыто.
    Пылающий герой противоречил бы всей логике, поэтому поверхность доходит
    только до едва тёплого. Насыщенный оранжевый живёт в акценте, а не в фоне
    дуги.
  */
  lum = clamp(lum, 0.0, 1.0);
  lum *= 0.62 + 0.38 * n2;
  lum = min(lum, 0.54);

  /*
    Изолинии, а не свечение. Гладкое радиальное затухание читается как
    mesh-градиентный блоб, то есть как прямой AI-штамп; разбивка поля на
    ступенчатые контуры читается как показание прибора, чем страница и
    является.
  */
  float bands = 5.0;
  float scaled = lum * bands;
  float idx = floor(scaled);
  float frac = fract(scaled);
  float edge = smoothstep(0.0, 0.09, frac) * smoothstep(1.0, 0.91, frac);
  float level = (idx + edge * 0.35) / bands;

  /*
    Палитра исходная: холодная сталь уходит в песок и останавливается на
    тёплом. Поверхность живёт на первом экране, где дуга ещё холодная, поэтому
    греется только до середины шкалы.
  */
  vec3 col = vec3(0.878, 0.886, 0.898);
  col = mix(col, vec3(0.866, 0.806, 0.716), smoothstep(0.02, 0.36, level));
  col = mix(col, vec3(0.860, 0.678, 0.530), smoothstep(0.34, 0.70, level));

  /*
    Контурные линии стоят на границах ступеней. Их вес поднят относительно
    заливки намеренно: при слабой линии поле схлопывается в мягкое пятно, то
    есть ровно в тот mesh-градиентный блоб, ради ухода от которого изолинии и
    рисуются.
  */
  float line = (1.0 - smoothstep(0.0, 0.05, frac)) * step(1.0, idx);
  col -= line * 0.062;

  /* Шлифовальное зерно, чтобы металл никогда не читался плоской заливкой. */
  col += (hash(gl_FragCoord.xy * 0.7 + uTime) - 0.5) * 0.016;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function LightSurface({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = (canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    }) || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uAspect = gl.getUniformLocation(prog, "uAspect");
    /*
      Uniform-массивы на части драйверов надо запрашивать по первому элементу.
      По голому имени там возвращается null, все точки молча читаются нулями, и
      поверхность остаётся ледяной без единой ошибки в консоли.
    */
    const uPoints =
      gl.getUniformLocation(prog, "uPoints[0]") ??
      gl.getUniformLocation(prog, "uPoints");
    if (!uPoints) return;

    /* xy в uv-пространстве, z — остаток силы. */
    const pts = new Float32Array(TRAIL * 3);
    let head = 0;
    const data = { w: 0, h: 0, aspect: 1 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      data.w = Math.max(1, Math.round(r.width * dpr));
      data.h = Math.max(1, Math.round(r.height * dpr));
      data.aspect = r.height > 0 ? r.width / r.height : 1;
      canvas.width = data.w;
      canvas.height = data.h;
      gl.viewport(0, 0, data.w, data.h);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const inject = (clientX: number, clientY: number, strength: number) => {
      const r = canvas.getBoundingClientRect();
      const x = (clientX - r.left) / r.width;
      const y = 1 - (clientY - r.top) / r.height;
      if (x < -0.15 || x > 1.15 || y < -0.15 || y > 1.15) return;
      const i = head * 3;
      pts[i] = x;
      pts[i + 1] = y;
      pts[i + 2] = strength;
      head = (head + 1) % TRAIL;
    };

    let lastInput = -Infinity;
    const onPointer = (e: PointerEvent) => {
      lastInput = performance.now();
      inject(e.clientX, e.clientY, 0.34);
      canvas.style.opacity = "1";
    };
    /*
      Слушаем безусловно, а не по медиазапросу указателя. Гибридные машины и
      ноутбуки с сенсором отвечают на него непоследовательно, а потеря
      слушателя означает, что поверхность вообще не отвечает на реальный курсор.
    */
    window.addEventListener("pointermove", onPointer, { passive: true });

    /*
      Дрейф — только там, где есть чем водить. На телефоне поверхность нечем
      возмущать, поэтому автономное пятно оказывалось не намёком на движение, а
      кляксой поверх абзаца первого экрана. Без точного указателя остаётся
      ровная холодная дуга, и это законченное состояние, а не пустое место.
    */
    const fine = window.matchMedia("(pointer: fine)").matches;

    let raf = 0;
    let running = false;
    let last = performance.now();
    const start = last;
    let drift = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      /* Затухание. Свет гаснет примерно за две секунды. */
      for (let i = 2; i < pts.length; i += 3) {
        pts[i] = Math.max(0, pts[i] - dt * 0.75);
      }

      if (fine && now - lastInput > 1500) {
        /*
          Без курсора поверхность дышит по медленному дрейфу. Держится заметно
          слабее реального указателя: в покое это должно читаться как слабый
          отсвет в металле, а не как фигура, припаркованная за заголовком.
        */
        drift += dt * 0.22;
        const i = head * 3;
        pts[i] = 0.5 + Math.cos(drift) * 0.28;
        pts[i + 1] = 0.55 + Math.sin(drift * 0.8) * 0.22;
        pts[i + 2] = 0.085;
        head = (head + 1) % TRAIL;
      }

      gl.uniform2f(uRes, data.w, data.h);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform1f(uAspect, data.aspect);
      gl.uniform3fv(uPoints, pts);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    /* Никогда не рисуем поверхность, на которую никто не смотрит. */
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? play() : pause()),
      { threshold: 0.01 },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    if (fine) canvas.style.opacity = "1";

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-0
        [transition:opacity_600ms_ease-out] ${className}`}
    />
  );
}
