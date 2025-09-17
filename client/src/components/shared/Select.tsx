import { SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  required?: boolean;
}

export default function Select({
  label,
  options,
  error,
  required,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        className={`
          w-full px-3 py-2 border border-slate-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
          ${error ? "border-red-500" : ""}
          ${className}
        `.trim()}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
