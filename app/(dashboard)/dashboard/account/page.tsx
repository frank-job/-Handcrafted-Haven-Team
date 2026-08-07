// Account Details Page
import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { geistMono } from "@/app/ui/fonts";
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account',
};


export default async function AccountPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    redirect('/login');
  }

  const userId = sessionCookie.value;

  const { rows } = await sql`
    SELECT users.id, users.username, users.email, users.created_at, profiles.image_url
    FROM users
    LEFT JOIN profiles ON users.id = profiles.user_id
    WHERE users.id = ${userId}
  `;
  const user = rows[0] as { id: string; username: string; email: string; created_at: Date; image_url: string | null } | undefined;

  if (!user) {
    redirect('/login');
  }

  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-10">
        <h1 className={`${geistMono.className} text-2xl font-black text-black uppercase tracking-tighter mb-2`}>
          Account
        </h1>
        <p className="text-gray-600">
          Manage your account details and settings.
        </p>
      </div>

      {/* Account Info Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
          <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-4 overflow-hidden">
            {user.image_url ? (
              <img src={user.image_url} alt="Profile photo" className="w-full h-full object-cover rounded-[4rem] transition-transform duration-600 ease-in-out hover:scale-110 hover:rotate-5 hover:shadow-xl"  />
            ) : (
              <span className="text-white font-black">{user.username.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <h2 className="text-xl font-bold text-white">{user.username}</h2>
          <p className="text-blue-200 text-sm">{user.email}</p>
        </div>

        {/* Details */}
        <div className="px-6 py-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Username
            </label>
            <p className="text-gray-900 font-medium">{user.username}</p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <p className="text-gray-900 font-medium">{user.email}</p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Member Since
            </label>
            <p className="text-gray-900 font-medium">{memberSince}</p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              User ID
            </label>
            <p className="text-gray-500 text-sm font-mono">{user.id}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-200 p-5 hover:bg-gray-100 transition-colors group"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-black">Edit Profile</h3>
            <p className="text-xs text-gray-500">Update bio, photo & location</p>
          </div>
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-200 p-5 hover:bg-gray-100 transition-colors group"
        >
          <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-black">Dashboard</h3>
            <p className="text-xs text-gray-500">Go back to home</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

