import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/server/product-store";
import ProductReviews from "@/app/components/ProductReviews";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">
        &larr; Back to products
      </Link>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square overflow-hidden bg-gray-50 border border-black/10">
          <Image
            src={product.product_image}
            alt={product.product_name}
            width={600}
            height={600}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest text-gray-400">
            {product.category}
          </span>
          <h1 className="text-2xl font-semibold text-gray-900">{product.product_name}</h1>
          <p className="text-2xl font-medium text-gray-900">${product.price.toFixed(2)}</p>

          {product.product_description && (
            <p className="text-sm text-gray-600 leading-relaxed">{product.product_description}</p>
          )}

          <button className="mt-4 w-full border border-black bg-black text-white py-3 text-sm hover:bg-white hover:text-black transition-colors">
            Add to Cart
          </button>
        </div>
      </div>

      <ProductReviews productId={id} />
    </main>
  );
}
