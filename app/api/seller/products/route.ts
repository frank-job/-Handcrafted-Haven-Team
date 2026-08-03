import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { listProductsBySeller } from "@/lib/server/product-store";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const sellerId = sessionCookie.value;
  const products = await listProductsBySeller(sellerId);

  return NextResponse.json({ data: products });
}
