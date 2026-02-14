import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categorize } from "@/lib/categorize";
import { computeStatus } from "@/lib/types";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await request.json();
  const data: Record<string, unknown> = {};

  if (body.name !== undefined) {
    data.name = body.name.trim();
    data.category = categorize(body.name);
  }
  if (body.quantity !== undefined) data.quantity = body.quantity;
  if (body.minQuantity !== undefined) data.minQuantity = body.minQuantity;
  if (body.unit !== undefined) data.unit = body.unit;

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data,
    });

    return NextResponse.json({
      ...product,
      status: computeStatus(product.quantity, product.minQuantity),
    });
  } catch {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}
