"use client";

import { useState, useEffect, useCallback } from "react";
import { ProductWithStatus } from "@/lib/types";

export function useShoppingList() {
  const [items, setItems] = useState<ProductWithStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchList = useCallback(async () => {
    try {
      const res = await fetch("/api/shopping-list");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch shopping list:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const restockItem = useCallback(async (id: number, quantity = 2) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error("Failed to restock item");
    await fetchList();
  }, [fetchList]);

  return { items, loading, refresh: fetchList, restockItem };
}
