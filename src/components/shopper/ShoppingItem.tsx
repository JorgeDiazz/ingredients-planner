"use client";

import { ProductWithStatus } from "@/lib/types";

interface ShoppingItemProps {
  item: ProductWithStatus;
  onRestock: (item: ProductWithStatus) => void;
}

export default function ShoppingItem({ item, onRestock }: ShoppingItemProps) {
  return (
    <button
      onClick={() => onRestock(item)}
      className="flex items-center gap-4 px-5 py-4 w-full text-left active:bg-ios-gray-6/50 transition-colors"
    >
      {/* Status dot */}
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${item.status === "missing" ? "border-ios-red" : "border-ios-yellow"}`} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <span className="text-[15px] font-medium text-ios-label">
          {item.name}
        </span>
        <p className="text-[12px] text-ios-gray-1 mt-1">
          {item.status === "missing"
            ? `Sin stock \u00B7 Necesitas ${item.minQuantity}`
            : `Tienes ${item.quantity} \u00B7 Necesitas ${item.minQuantity}`}
        </p>
      </div>

      {/* Category tag */}
      <span className="text-[11px] text-ios-gray-2 shrink-0 font-medium">{item.category}</span>
    </button>
  );
}
