import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { computeStatus } from "@/lib/types";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: [{ quantity: "asc" }, { name: "asc" }],
  });

  const shoppingList = products
    .map((p) => ({
      ...p,
      status: computeStatus(p.quantity, p.minQuantity),
    }))
    .filter((p) => p.status === "missing" || p.status === "low");

  return NextResponse.json(shoppingList);
}
