"use client";

import { useMemo } from "react";
import { ProductWithStatus } from "@/lib/types";
import ShoppingItem from "./ShoppingItem";
import Card from "@/components/ui/Card";

interface ShoppingListProps {
  items: ProductWithStatus[];
  onRestock: (item: ProductWithStatus) => void;
}

export default function ShoppingList({ items, onRestock }: ShoppingListProps) {
  const { missing, low } = useMemo(() => {
    const missing: ProductWithStatus[] = [];
    const low: ProductWithStatus[] = [];
    for (const item of items) {
      if (item.status === "missing") missing.push(item);
      else if (item.status === "low") low.push(item);
    }
    return { missing, low };
  }, [items]);

  return (
    <div className="space-y-7">
      {missing.length > 0 && (
        <div>
          <h3 className="text-[11px] font-bold text-ios-red uppercase tracking-widest px-5 mb-2">
            Agotados ({missing.length})
          </h3>
          <Card>
            {missing.map((item, idx) => (
              <div key={item.id}>
                {idx > 0 && <div className="h-px bg-ios-gray-5/70 ml-5" />}
                <ShoppingItem item={item} onRestock={onRestock} />
              </div>
            ))}
          </Card>
        </div>
      )}

      {low.length > 0 && (
        <div>
          <h3 className="text-[11px] font-bold text-ios-yellow uppercase tracking-widest px-5 mb-2">
            Quedan pocos ({low.length})
          </h3>
          <Card>
            {low.map((item, idx) => (
              <div key={item.id}>
                {idx > 0 && <div className="h-px bg-ios-gray-5/70 ml-5" />}
                <ShoppingItem item={item} onRestock={onRestock} />
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}
