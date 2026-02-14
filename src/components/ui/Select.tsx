"use client";

import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export default function Select({ label, options, className = "", ...props }: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-ios-secondary-label">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3 bg-ios-gray-6 rounded-xl text-ios-label
          focus:outline-none focus:ring-2 focus:ring-ios-blue/30
          appearance-none
          ${className}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
