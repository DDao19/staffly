export function Alert({ variant = "error", message }) {
  const baseClasses = "text-sm font-bold p-3 rounded-md";
  const variantClasses = {
    success: "text-(--success) bg-(--success-bg)",
    warning: "text-(--warning) bg-(--warning-bg)",
    error: "text-(--error) bg-(--error-bg)",
  };

  const variantClass = variantClasses[variant] ?? variantClasses.error;

  return <p className={`${baseClasses} ${variantClass}`}>{message}</p>;
}
