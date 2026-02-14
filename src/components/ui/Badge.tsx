"use client";

import { ProductStatus } from "@/lib/types";

const statusConfig: Record<ProductStatus, { label: string; className: string }> = {
  missing: {
    label: "Agotado",
    className: "bg-ios-red/15 text-ios-red",
  },
  low: {
    label: "Poco",
    className: "bg-ios-yellow/15 text-ios-yellow",
  },
  full: {
    label: "Suficiente",
    className: "bg-ios-green/15 text-ios-green",
  },
};

export default function Badge({ status }: { status: ProductStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
