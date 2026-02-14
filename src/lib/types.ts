export type ProductStatus = "missing" | "low" | "full";

export interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithStatus extends Product {
  status: ProductStatus;
}

export function computeStatus(quantity: number, minQuantity: number): ProductStatus {
  if (quantity === 0) return "missing";
  if (quantity < minQuantity) return "low";
  return "full";
}

export interface ShoppingItem extends ProductWithStatus {
  checked?: boolean;
}
