import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categorize } from "@/lib/categorize";
import { computeStatus } from "@/lib/types";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const withStatus = products.map((p) => ({
    ...p,
    status: computeStatus(p.quantity, p.minQuantity),
  }));

  return NextResponse.json(withStatus);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, quantity, minQuantity, unit } = body;

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const category = categorize(name);

  const product = await prisma.product.create({
    data: {
      name: name.trim(),
      category,
      quantity: quantity ?? 0,
      minQuantity: minQuantity ?? 1,
      unit: unit ?? "units",
    },
  });

  return NextResponse.json(
    { ...product, status: computeStatus(product.quantity, product.minQuantity) },
    { status: 201 }
  );
}
