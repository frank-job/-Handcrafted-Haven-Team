import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { geistMono } from '@/app/ui/fonts';
import { listProductsBySeller } from '@/lib/server/product-store';
import SellerProductsManager from './seller-products-manager';

export default async function SellerProductsPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    redirect('/login');
  }

  const sellerId = sessionCookie.value;

  const { rows } = await sql`
    SELECT username FROM users WHERE id = ${sellerId} LIMIT 1
  `;
  const user = rows[0] as { username: string } | undefined;

  if (!user) {
    redirect('/login');
  }

  const sellerProducts = await listProductsBySeller(sellerId);

  return (
    <main className="p-6 md:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className={`${geistMono.className} text-2xl font-black uppercase tracking-tighter text-blue-600`}>
            My Products
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage listings created by <span className="font-bold text-black">{user.username}</span>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/products"
            className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-bold uppercase tracking-wide text-gray-700 hover:bg-gray-100"
          >
            Back to Products
          </Link>
          <Link
            href="/dashboard/products/new"
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-700"
          >
            Add Product
          </Link>
        </div>
      </div>

      <SellerProductsManager initialProducts={sellerProducts} />
    </main>
  );
}
