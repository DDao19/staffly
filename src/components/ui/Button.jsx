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
      "text-[var(--text-inverse)] bg-[var(--primary)] hover:bg-[var(--primary-hover)] focus:ring-[var(--primary-light)]",

    destructive:
      "text-[var(--text-inverse)] bg-[var(--destructive)] hover:bg-[var(--destructive-hover)] focus:ring-[var(--destructive-light)]",

    outline:
      "text-[var(--text)] border border-[var(--border)] hover:bg-[var(--primary-light)] focus:ring-[var(--primary-light)]",
  };

  const variantClass = variantClasses[variant] ?? variantClasses.primary;

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
