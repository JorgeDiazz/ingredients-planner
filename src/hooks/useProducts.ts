"use client";

import { useState, useEffect, useCallback } from "react";
import { ProductWithStatus } from "@/lib/types";

export function useProducts() {
  const [products, setProducts] = useState<ProductWithStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProduct = async (data: {
    name: string;
    quantity?: number;
    minQuantity?: number;
  }) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create product");
    await fetchProducts();
  };

  const updateProduct = async (
    id: number,
    data: Partial<{ name: string; quantity: number; minQuantity: number }>
  ) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update product");
    await fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete product");
    await fetchProducts();
  };

  return { products, loading, fetchProducts, createProduct, updateProduct, deleteProduct };
}
