import { twMerge } from "tailwind-merge";

export function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  const baseClasses = `inline-flex items-center justify-center gap-2 text-sm font-bold py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer focus:outline-none
  focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]`;

  const variantClasses = {
    primary:
      "text-(--text-inverse) bg-(--primary) hover:bg-(--primary-hover) focus:ring-(--primary-light)",

    destructive:
      "text-(--text-inverse) bg-(--destructive) hover:bg-(--destructive-hover) focus:ring-(--destructive-light)",

    outline:
      "text-(--text) border border-(--border) hover:bg-(--primary-light) focus:ring-(--primary-light)",

    ghost:
      "text-(--text-secondary) bg-transparent hover:bg-(--surface-secondary) hover:text-(--text)",
  };

  const variantClass = variantClasses[variant] ?? variantClasses.primary;

  return (
    <button
      type={type}
      className={twMerge(baseClasses, variantClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
