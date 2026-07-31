/*
  Placeholder mark approximating the supplied flame (cold core, hot tongue).
  Swap for the real asset per README-BRAND.md.
*/
export function Flame({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ti-cold" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.34 0.09 250)" />
          <stop offset="100%" stopColor="oklch(0.58 0.13 246)" />
        </linearGradient>
        <linearGradient id="ti-hot" x1="0.2" y1="1" x2="0.8" y2="0">
          <stop offset="0%" stopColor="oklch(0.58 0.19 32)" />
          <stop offset="100%" stopColor="oklch(0.79 0.17 66)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ti-cold)"
        d="M31 3c3 9-4 13-9 19S13 34 15 43c2 9 9 16 18 17-11-7-13-16-9-24 3-6 9-8 11-15 2-6 0-13-4-18Z"
      />
      <path
        fill="url(#ti-hot)"
        d="M40 15c1 8-5 11-8 17s-2 12 3 17c-8-2-13-9-12-17 1-9 9-12 11-19 1-4 1-8 0-11 3 3 5 8 6 13Z"
      />
      <path
        fill="url(#ti-hot)"
        d="M47 27c4 6 5 14 2 21-4 8-12 12-21 12 8-3 13-9 13-17 0-6-3-10-3-16 3 0 7 0 9 0Z"
        opacity="0.92"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <Flame />
      <span className="text-[16px] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
        Top<span className="font-semibold text-[var(--ink-soft)]">Injector</span>
      </span>
    </span>
  );
}
