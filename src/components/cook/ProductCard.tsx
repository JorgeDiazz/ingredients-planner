"use client";

import { ProductWithStatus } from "@/lib/types";

interface ProductCardProps {
  product: ProductWithStatus;
  onIncrement: () => void;
  onDecrement: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const statusColor = {
  missing: "bg-ios-red",
  low: "bg-ios-yellow",
  full: "bg-ios-green",
} as const;

const statusTrack = {
  missing: "bg-ios-red/12",
  low: "bg-ios-yellow/12",
  full: "bg-ios-green/12",
} as const;

const statusLabel = {
  missing: "Agotado",
  low: "Poco",
  full: "Suficiente",
} as const;

const statusTextColor = {
  missing: "text-ios-red",
  low: "text-ios-yellow",
  full: "text-ios-green",
} as const;

export default function ProductCard({
  product,
  onIncrement,
  onDecrement,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const pct = product.minQuantity > 0 ? Math.min(100, (product.quantity / product.minQuantity) * 100) : 100;

  return (
    <div className="px-5 py-4 bg-ios-card active:bg-ios-gray-6/40 transition-colors">
      {/* Row 1: Name + status badge */}
      <div className="flex items-center justify-between mb-3" onClick={onEdit}>
        <span className="font-semibold text-[16px] truncate text-ios-label mr-3">{product.name}</span>
        <span className={`text-[11px] font-bold uppercase tracking-wide shrink-0 ${statusTextColor[product.status]}`}>{statusLabel[product.status]}</span>
      </div>

      {/* Row 2: Progress bar */}
      <div className="flex items-center gap-3 mb-3.5" onClick={onEdit}>
        <div className={`flex-1 h-[5px] rounded-full ${statusTrack[product.status]} overflow-hidden`}>
          <div className={`h-full rounded-full ${statusColor[product.status]} transition-all duration-300`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-[11px] text-ios-gray-1 tabular-nums shrink-0 font-medium">{product.quantity} / {product.minQuantity}</span>
      </div>

      {/* Row 3: Stepper + delete */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center bg-ios-gray-6/80 rounded-xl">
          <button onClick={onDecrement} disabled={product.quantity <= 0} className="flex-1 h-12 rounded-l-xl flex items-center justify-center text-ios-label text-[18px] active:bg-ios-gray-5 disabled:opacity-25 disabled:pointer-events-none transition-colors">
            −
          </button>
          <span className="w-20 text-center text-[15px] font-bold tabular-nums text-ios-label">{product.quantity} <span className="text-ios-gray-2 font-medium">/ {product.minQuantity}</span></span>
          <button onClick={onIncrement} className="flex-1 h-12 rounded-r-xl flex items-center justify-center text-ios-blue text-[18px] font-semibold active:bg-ios-blue/10 transition-colors">
            +
          </button>
        </div>

        <button onClick={onDelete} className="w-12 h-12 rounded-xl flex items-center justify-center text-ios-gray-3 active:text-ios-red active:bg-ios-red/8 shrink-0 transition-colors">
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  );
}
