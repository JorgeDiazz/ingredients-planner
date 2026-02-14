"use client";

import { useMemo } from "react";
import { ProductWithStatus } from "@/lib/types";
import ProductCard from "./ProductCard";
import Card from "@/components/ui/Card";

interface ProductListProps {
  products: ProductWithStatus[];
  searchQuery: string;
  onIncrement: (id: number, currentQty: number) => void;
  onDecrement: (id: number, currentQty: number) => void;
  onEdit: (product: ProductWithStatus) => void;
  onDelete: (product: ProductWithStatus) => void;
}

export default function ProductList({
  products,
  searchQuery,
  onIncrement,
  onDecrement,
  onEdit,
  onDelete,
}: ProductListProps) {
  const grouped = useMemo(() => {
    const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const filtered = searchQuery
      ? products.filter((p) => normalize(p.name).includes(normalize(searchQuery)))
      : products;

    const groups: Record<string, ProductWithStatus[]> = {};
    for (const product of filtered) {
      if (!groups[product.category]) {
        groups[product.category] = [];
      }
      groups[product.category].push(product);
    }

    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [products, searchQuery]);

  if (grouped.length === 0) {
    return null;
  }

  return (
    <div className="space-y-7">
      {grouped.map(([category, items]) => (
        <div key={category}>
          <h3 className="text-[11px] font-bold text-ios-gray-1 uppercase tracking-widest px-5 mb-2">
            {category}
          </h3>
          <Card>
            {items.map((product, idx) => (
              <div key={product.id}>
                {idx > 0 && <div className="h-px bg-ios-gray-5/70 ml-5" />}
                <ProductCard
                  product={product}
                  onIncrement={() => onIncrement(product.id, product.quantity)}
                  onDecrement={() => onDecrement(product.id, product.quantity)}
                  onEdit={() => onEdit(product)}
                  onDelete={() => onDelete(product)}
                />
              </div>
            ))}
          </Card>
        </div>
      ))}
    </div>
  );
}
