import { cn } from "@/lib/utils";

export function H1({ children, className }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold capitalize tracking-tight lg:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }) {
  return (
    <h2
      className={cn(
        `scroll-m-20 border-b pb-2 text-3xl font-semibold capitalize tracking-tight first:mt-0`,
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }) {
  return (
    <h3
      className={cn(
        `scroll-m-20 text-2xl font-semibold capitalize tracking-tight`,
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className }) {
  return (
    <h4
      className={cn(
        `scroll-m-20 text-xl font-semibold capitalize tracking-tight`,
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function H5({ children, className }) {
  return (
    <h4
      className={cn(
        `scroll-m-20 text-lg font-semibold capitalize tracking-tight`,
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function H6({ children, className }) {
  return (
    <h4
      className={cn(
        `text-normal scroll-m-20 font-semibold capitalize tracking-tight`,
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function P({ children, className }) {
  return (
    <p className={cn(`leading-7 [&:not(:first-child)]:mt-6`, className)}>
      {children}
    </p>
  );
}

export function Blockquote({ children, className }) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
}

export function Large({ children, className }) {
  return (
    <div className={cn("text-lg font-semibold", className)}>{children}</div>
  );
}

export function Small({ children, className }) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
}

export function Muted({ children, className }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
