"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary: "bg-ios-blue text-white active:bg-ios-blue/80",
  secondary: "bg-ios-gray-5 text-ios-label active:bg-ios-gray-4",
  danger: "bg-ios-red text-white active:bg-ios-red/80",
  ghost: "bg-transparent text-ios-blue active:bg-ios-gray-6",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-xl font-semibold
        transition-colors min-h-[44px]
        disabled:opacity-40 disabled:pointer-events-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
