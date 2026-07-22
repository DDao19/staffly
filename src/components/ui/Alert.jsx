export function Alert({ variant = "error", message }) {
  const baseClasses = "text-sm font-medium p-3 rounded-md leading-relaxed";
  const variantClasses = {
    success: "text-(--success) bg-(--success-bg)",
    warning: "text-(--warning) bg-(--warning-bg)",
    error: "text-(--error) bg-(--error-bg)",
  };

  const variantClass = variantClasses[variant] ?? variantClasses.error;

  return <p className={`${baseClasses} ${variantClass}`}>{message}</p>;
}
