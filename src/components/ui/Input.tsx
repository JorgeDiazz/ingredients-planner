"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

export default function Input({ label, helperText, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[13px] font-semibold text-ios-secondary-label tracking-wide">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3.5 bg-ios-gray-6/80 rounded-xl text-ios-label placeholder:text-ios-gray-2 focus:outline-none focus:ring-2 focus:ring-ios-blue/20 transition-shadow ${className}`}
        {...props}
      />
      {helperText && (
        <p className="text-[12px] text-ios-gray-1 mt-1">{helperText}</p>
      )}
    </div>
  );
}
