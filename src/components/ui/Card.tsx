"use client";

import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-ios-card rounded-2xl shadow-sm mx-5 ${className}`}
    >
      {children}
    </div>
  );
}
