import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/*
  Одна кнопка на весь сайт.

  До этого их было около двадцати, и каждая была собрана утилитами на месте:
  высоты расходились между 48, 52 и «сколько получится из паддинга», кольца
  фокуса не было у половины, состояния загрузки не было ни у одной, а разметка
  выбиралась по привычке — там `a` на внутренний адрес, здесь `Link` на якорь.

  Здесь всё это решается один раз. Внешность живёт в классах `.btn-*` в
  globals.css, потому что она принадлежит материалу страницы, а не React; этот
  файл отвечает за поведение: какой тег, какая роль, что происходит при
  ожидании и как элемент называется для скринридера.
*/

type Variant = "primary" | "secondary" | "quiet";
type Size = "sm" | "md" | "lg";

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Стрелка перехода. Только для действий, которые уводят со страницы или вниз по ней. */
  arrow?: boolean;
  /** Знак перед подписью: Telegram, галочка, что угодно из вызывающего кода. */
  icon?: ReactNode;
  block?: boolean;
  className?: string;
};

type AsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
    /** Показывает ожидание и запрещает повторное нажатие, не меняя ширину кнопки. */
    loading?: boolean;
  };

type AsLink = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    loading?: undefined;
  };

export type ButtonProps = AsButton | AsLink;

const VARIANT: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  quiet: "btn-quiet",
};

const SIZE: Record<Size, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

function Arrow() {
  return (
    <span aria-hidden="true" className="btn-arrow num text-[0.85em] leading-none">
      →
    </span>
  );
}

function Spinner() {
  return (
    <span className="btn-spinner" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]">
        <circle cx="12" cy="12" r="9" pathLength="90" />
      </svg>
    </span>
  );
}

/**
 * Полиморфная кнопка. Тег выбирается по адресу, а не вызывающим кодом:
 *
 * - нет `href` — это `button` с типом `button`, чтобы кнопка внутри формы не
 *   отправляла её случайно;
 * - `href` на якорь или на внешний адрес — обычный `a`, потому что клиентская
 *   навигация Next ни там, ни там не нужна и на якоре только мешает;
 * - внутренний путь — `Link` с предзагрузкой.
 *
 * Ошибиться в выборе больше нельзя, и это сознательно: расхождение между `a` и
 * `Link` на внутренних переходах было единственной причиной, по которой часть
 * ссылок сайта перезагружала страницу целиком.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    arrow = false,
    icon,
    block = false,
    className = "",
    ...rest
  } = props;

  const classes = [
    "btn",
    VARIANT[variant],
    SIZE[size],
    block ? "btn-block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const body = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );

  if (props.href === undefined) {
    const { loading = false, disabled, type, ...buttonProps } =
      rest as ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };

    return (
      <button
        type={type ?? "button"}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={`${classes}${loading ? " btn-busy" : ""}`}
        {...buttonProps}
      >
        {/*
          Содержимое остаётся в потоке и лишь гаснет. Убрать его значило бы
          отдать ширину кнопки спиннеру: она схлопнулась бы в момент нажатия и
          утащила за собой всё, что стоит рядом.
        */}
        <span className={`contents ${loading ? "opacity-0" : ""}`}>{body}</span>
        {loading && <Spinner />}
      </button>
    );
  }

  const { href, ...linkProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };
  const external = /^(https?:|mailto:|tel:)/.test(href) || href.startsWith("#");

  if (external) {
    return (
      <a href={href} className={classes} {...linkProps}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...linkProps}>
      {body}
    </Link>
  );
}
