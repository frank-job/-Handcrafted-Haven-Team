// Dashboard Home Page
import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { geistMono } from "@/app/ui/fonts";
import { CubeIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    redirect('/login');
  }

  const userId = sessionCookie.value;

  const { rows } = await sql`
    SELECT users.username, profiles.image_url
    FROM users
    LEFT JOIN profiles ON users.id = profiles.user_id
    WHERE users.id = ${userId}
  `;
  const user = rows[0] as { username: string; image_url: string | null } | undefined;

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-10">
        <h1 className={`${geistMono.className} text-2xl font-black text-black uppercase tracking-tighter mb-2`}>
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, <span className="font-bold text-black">{user.username}</span>
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/dashboard/profiles"
          className="group rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
        >
          {user.image_url ? (
            <div className="h-8 w-8 mb-4 overflow-hidden rounded-xl">
              <img src={user.image_url} alt="Profile photo" className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110" />
            </div>
          ) : (
            <UserIcon className="h-8 w-8 text-white/80 mb-4" />
          )}
          <h2 className="text-xl font-bold text-white mb-2">Seller Profile</h2>
          <p className="text-sm text-blue-200">Edit your story, location & more →</p>
        </Link>

        <Link
          href="/dashboard/products"
          className="group rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
        >
          <CubeIcon className="h-8 w-8 text-white/80 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Products</h2>
          <p className="text-sm text-gray-400">Browse and manage your product listings →</p>
        </Link>
      </div>
    </div>
  );
}
