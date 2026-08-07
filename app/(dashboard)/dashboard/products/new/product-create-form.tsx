'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ApiProduct {
  _id: string;
  product_name: string;
}

interface ApiResponse {
  data?: ApiProduct;
  error?: string;
  details?: string[];
}

const INITIAL_FORM = {
  product_name: '',
  product_image: '',
  category: '',
  price: '',
  product_description: '',
};

export default function ProductCreateForm() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const payload = {
      product_name: form.product_name.trim(),
      product_image: form.product_image.trim(),
      category: form.category.trim(),
      product_description: form.product_description.trim(),
      price: Number(form.price),
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ApiResponse;

      if (!response.ok) {
        const details = result.details?.join(' ') ?? '';
        const message = [result.error, details].filter(Boolean).join(' ');
        throw new Error(message || 'Could not create product.');
      }

      setForm(INITIAL_FORM);
      setSuccessMessage(`Product \"${result.data?.product_name ?? 'New product'}\" created successfully.`);

      // Refresh server-rendered product views that read from the database.
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not create product.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="product_name" className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-600">
          Product Name
        </label>
        <input
          id="product_name"
          value={form.product_name}
          onChange={(event) => setForm((previous) => ({ ...previous, product_name: event.target.value }))}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black focus:border-blue-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="product_image" className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-600">
          Product Image URL
        </label>
        <input
          id="product_image"
          type="url"
          value={form.product_image}
          onChange={(event) => setForm((previous) => ({ ...previous, product_image: event.target.value }))}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black focus:border-blue-500 focus:outline-none"
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-600">
            Category
          </label>
          <input
            id="category"
            value={form.category}
            onChange={(event) => setForm((previous) => ({ ...previous, category: event.target.value }))}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-600">
            Price
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(event) => setForm((previous) => ({ ...previous, price: event.target.value }))}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="product_description" className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-600">
          Description
        </label>
        <textarea
          id="product_description"
          rows={4}
          value={form.product_description}
          onChange={(event) => setForm((previous) => ({ ...previous, product_description: event.target.value }))}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black focus:border-blue-500 focus:outline-none"
          placeholder="Describe the materials, dimensions, and style."
        />
      </div>

      {errorMessage ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
      ) : null}

      {successMessage ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          <p>{successMessage}</p>
          <button
            type="button"
            onClick={() => router.push('/dashboard/products/manage')}
            className="mt-2 inline-flex rounded-lg border border-green-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-700 hover:bg-green-100"
          >
            View my products
          </button>
        </div>
      ) : null}

      <button
        type="submit"
        className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding Product...' : 'Add Product'}
      </button>
    </form>
  );
}