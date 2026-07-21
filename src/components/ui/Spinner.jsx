export function Spinner({ className = "" }) {
  return (
    <div
      className={`h-4 w-4 animate-spin rounded-full border-2 border-(--primary-light) border-t-(--primary) ${className}`}
    ></div>
  );
}
