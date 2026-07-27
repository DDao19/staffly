import { twMerge } from "tailwind-merge";

export function SelectInput({
  id,
  label,
  value,
  onChange,
  options = [],
  error,
  className = "",
  placeholder = "Select an option",
  ...props
}) {
  // const baseClass =
  //   "block w-full rounded-md border border-(--border) bg-(--surface-secondary) px-3 py-2 text-sm text-(--text) shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-(--primary-light) focus:border-(--primary)";
  const baseClass = `block w-full rounded-md border ${error ? "border-(--error)" : "border-(--border)"} bg-(--surface-secondary) px-3 py-2 text-sm text-(--text) placeholder:text-(--text-secondary) shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 ${error ? "focus:ring-(--error-bg)" : "focus:ring-(--primary-light) focus:border-(--primary)"}`;
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-(--text) mb-1"
      >
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={onChange}
        className={twMerge(baseClass, className)}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
