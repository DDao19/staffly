export function Badge({ children, variant = "default" }) {
  const variants = {
    success: "bg-(--dashboard-green-bg) text-(--dashboard-green)",
    warning: "bg-(--dashboard-yellow-bg) text-(--dashboard-yellow)",
    error: "bg-(--error-bg) text-(--error)",
    default: "bg-(--surface-secondary) text-(--text-secondary)",
  };

  const badgeStyle = variants[variant] ?? variants.default;

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyle}`}
    >
      {children}
    </span>
  );
}
