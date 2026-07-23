import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/server/product-store";
import {
  createReview,
  getReviewsByProductId,
  validateReviewInput,
  type ReviewInput,
} from "@/lib/server/review-store";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  if (!getProductById(id)) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ data: getReviewsByProductId(id) });
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  if (!getProductById(id)) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  let payload: Partial<ReviewInput>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const errors = validateReviewInput(payload);
  if (errors.length > 0) {
    return NextResponse.json({ error: "Validation failed.", details: errors }, { status: 400 });
  }

  const review = createReview(id, payload as ReviewInput);
  return NextResponse.json({ data: review }, { status: 201 });
}
