"use client";

import { useState } from "react";
import ViewToggle from "./ViewToggle";
import CookView from "./cook/CookView";
import ShopperView from "./shopper/ShopperView";

export default function AppShell() {
  const [view, setView] = useState<"cook" | "shopper">("cook");

  return (
    <div className="max-w-lg mx-auto pb-28">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-ios-bg/80 backdrop-blur-xl border-b border-ios-gray-5/40">
        <div className="px-5 pt-5 pb-4 space-y-4">
          <h1 className="text-[22px] font-bold text-center tracking-tight text-ios-label">Ingredientes</h1>
          <ViewToggle view={view} onChange={setView} />
        </div>
      </header>

      {/* Content */}
      <main className="pt-5">
        {view === "cook" ? <CookView /> : <ShopperView />}
      </main>
    </div>
  );
}
