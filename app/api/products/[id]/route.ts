import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  deleteProductBySeller,
  getProductById,
  updateProductBySeller,
  type ProductInput,
} from "@/lib/server/product-store";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function validatePatch(payload: Partial<ProductInput>) {
  const errors: string[] = [];

  if (payload.product_name !== undefined && payload.product_name.trim() === "") {
    errors.push("product_name cannot be empty.");
  }

  if (payload.product_image !== undefined && payload.product_image.trim() === "") {
    errors.push("product_image cannot be empty.");
  }

  if (payload.category !== undefined && payload.category.trim() === "") {
    errors.push("category cannot be empty.");
  }

  if (payload.price !== undefined) {
    if (typeof payload.price !== "number" || !Number.isFinite(payload.price) || payload.price < 0) {
      errors.push("price must be a non-negative number.");
    }
  }

  return errors;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ data: product });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const sellerId = sessionCookie.value;

  const existing = await getProductById(id);
  if (!existing) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (existing.seller_id !== sellerId) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  let payload: Partial<ProductInput>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const errors = validatePatch(payload);
  if (errors.length > 0) {
    return NextResponse.json({ error: "Validation failed.", details: errors }, { status: 400 });
  }

  const updated = await updateProductBySeller(id, sellerId, {
    product_name: payload.product_name?.trim(),
    product_image: payload.product_image?.trim(),
    product_description: payload.product_description?.trim(),
    price: payload.price,
    category: payload.category?.trim(),
  });

  if (!updated) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ data: updated });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const sellerId = sessionCookie.value;
  const existing = await getProductById(id);

  if (!existing) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (existing.seller_id !== sellerId) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const deleted = await deleteProductBySeller(id, sellerId);

  if (!deleted) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
