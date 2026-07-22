import { NextRequest, NextResponse } from "next/server";
import { createProduct, listProducts, type ProductInput, type ProductSort } from "@/lib/server/product-store";

function parseNumber(value: string | null): number | undefined {
  if (value === null || value.trim() === "") return undefined;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function parseSort(value: string | null): ProductSort {
  const allowed: ProductSort[] = ["featured", "price-low", "price-high", "name-asc", "name-desc", "newest"];
  if (!value) return "featured";
  return allowed.includes(value as ProductSort) ? (value as ProductSort) : "featured";
}

function validateProductInput(payload: Partial<ProductInput>) {
  const errors: string[] = [];

  if (!payload.product_name?.trim()) errors.push("product_name is required.");
  if (!payload.product_image?.trim()) errors.push("product_image is required.");
  if (!payload.category?.trim()) errors.push("category is required.");

  if (typeof payload.price !== "number" || !Number.isFinite(payload.price) || payload.price < 0) {
    errors.push("price must be a non-negative number.");
  }

  return errors;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = parseNumber(params.get("page"));
  const limit = parseNumber(params.get("limit"));
  const minPrice = parseNumber(params.get("minPrice"));
  const maxPrice = parseNumber(params.get("maxPrice"));

  const result = listProducts({
    category: params.get("category") ?? undefined,
    search: params.get("search") ?? undefined,
    sort: parseSort(params.get("sort")),
    minPrice,
    maxPrice,
    page,
    limit,
  });

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  let payload: Partial<ProductInput>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const errors = validateProductInput(payload);
  if (errors.length > 0) {
    return NextResponse.json({ error: "Validation failed.", details: errors }, { status: 400 });
  }

  const product = createProduct({
    product_name: payload.product_name!.trim(),
    product_image: payload.product_image!.trim(),
    product_description: payload.product_description?.trim(),
    price: payload.price!,
    category: payload.category!.trim(),
  });

  return NextResponse.json({ data: product }, { status: 201 });
}
