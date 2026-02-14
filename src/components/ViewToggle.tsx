"use client";

type View = "cook" | "shopper";

interface ViewToggleProps {
  view: View;
  onChange: (view: View) => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex bg-ios-gray-5/70 rounded-xl p-1 w-full max-w-[280px] mx-auto">
      <button onClick={() => onChange("cook")} className={`flex-1 py-2.5 text-[13px] font-semibold rounded-[10px] transition-all min-h-[38px] ${view === "cook" ? "bg-white text-ios-label shadow-sm" : "text-ios-gray-1"}`}>
        Cocina
      </button>
      <button onClick={() => onChange("shopper")} className={`flex-1 py-2.5 text-[13px] font-semibold rounded-[10px] transition-all min-h-[38px] ${view === "shopper" ? "bg-white text-ios-label shadow-sm" : "text-ios-gray-1"}`}>
        Compras
      </button>
    </div>
  );
}
