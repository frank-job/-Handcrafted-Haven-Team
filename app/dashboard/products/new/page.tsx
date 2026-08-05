import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { geistMono } from '@/app/ui/fonts';
import ProductCreateForm from './product-create-form';

export default async function NewSellerProductPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    redirect('/login');
  }

  const userId = sessionCookie.value;

  const { rows } = await sql`
    SELECT id FROM users WHERE id = ${userId}
  `;

  if (rows.length === 0) {
    redirect('/login');
  }

  return (
    <main className="p-6 md:p-8 max-w-3xl">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className={`${geistMono.className} text-2xl font-black uppercase tracking-tighter text-blue-600`}>
            Add New Product
          </h1>
          <p className="mt-2 text-sm text-gray-600">Create a new listing for your handcrafted item.</p>
        </div>

        <Link
          href="/dashboard/products"
          className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-bold uppercase tracking-wide text-gray-700 transition-colors hover:bg-gray-100"
        >
          Back to Products
        </Link>
      </div>

      <ProductCreateForm />
    </main>
  );
}
