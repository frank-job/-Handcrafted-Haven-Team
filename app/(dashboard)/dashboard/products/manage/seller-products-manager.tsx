'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

interface SellerProduct {
  _id: string;
  product_name: string;
  product_image: string;
  product_description: string;
  price: number;
  category: string;
}

interface SellerProductsManagerProps {
  initialProducts: SellerProduct[];
}

export default function SellerProductsManager({ initialProducts }: SellerProductsManagerProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasProducts = useMemo(() => products.length > 0, [products]);

  async function handleDelete(productId: string) {
    setErrorMessage(null);
    setIsDeletingId(productId);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error || 'Could not delete product.');
      }

      setProducts((previous) => previous.filter((product) => product._id !== productId));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not delete product.';
      setErrorMessage(message);
    } finally {
      setIsDeletingId(null);
    }
  }

  if (!hasProducts) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <p className="text-sm text-gray-600">You have not created any products yet.</p>
        <Link
          href="/dashboard/products/new"
          className="mt-4 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-700"
        >
          Add your first product
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {errorMessage ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <article key={product._id} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-600">{product.category}</p>
            <h3 className="text-base font-bold text-black">{product.product_name}</h3>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {product.product_description || 'No description provided yet.'}
            </p>
            <p className="mt-3 text-lg font-bold text-black">${product.price.toFixed(2)}</p>

            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/products/${product._id}`}
                className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-700 hover:bg-gray-100"
              >
                View
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(product._id)}
                disabled={isDeletingId === product._id}
                className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
              >
                {isDeletingId === product._id ? 'Removing...' : 'Delete'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

