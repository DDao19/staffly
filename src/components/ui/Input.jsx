export function Input({ id, label, type = "text", placeholder, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-(--text) mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="block w-full rounded-md border border-(--border) bg-(--surface-secondary) px-3 py-2.5 text-sm text-(--text) placeholder:text-(--text-secondary) shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-(--primary-light) focus:border-(--primary)"
        {...props}
      />
    </div>
  );
}
