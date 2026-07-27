import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ProfileData } from '@/lib/definitions';
import ProfileForm from '@/app/ui/profile-edit-form';

export default async function ProfilePage() {
  // 1. Get the logged-in user's ID from the session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    redirect('/login');
  }

  const userId = sessionCookie.value;

  // 2. Fetch user + profile data (Joining tables)
  const { rows } = await sql`
    SELECT users.id, users.username, users.email, profiles.bio, profiles.location, profiles.image_url
    FROM users
    LEFT JOIN profiles ON users.id = profiles.user_id
    WHERE users.id = ${userId}
  `;
  const user = rows[0] as ProfileData | undefined;

  if (!user) return <p className="p-10 text-center">No user found. Please sign up.</p>;

  return (
    <main className="min-h-screen bg-[#FAF9F6] pb-20">
      <div className="h-40 bg-blue-600"></div>
      <div className="max-w-md mx-auto px-6">
        <div className="relative -mt-16 bg-white rounded-[2.5rem] p-8 shadow-2xl">
          {/* Profile Visual */}
          <div className="flex justify-center mb-6">
            <div className="h-28 w-24 bg-gray-200 rounded-[2rem] flex items-center justify-center text-3xl">
              {user.image_url ? <img src={user.image_url} className="rounded-[2rem]" /> : '🏺'}
            </div>
          </div>

          <h2 className="text-2xl font-black text-center uppercase tracking-tighter">{user.username}</h2>
          <p className="text-blue-600 text-center font-bold text-xs mb-6">{user.email}</p>

          {/* Current Info Display */}
          <div className="bg-blue-50 p-4 rounded-2xl mb-8">
            <p className="text-sm font-medium text-gray-700 italic">&ldquo;{user.bio || 'No bio yet.'}&rdquo;</p>
          </div>

          {/* Edit Form */}
          <h3 className="text-xs font-black text-black border-b pb-2">EDIT STOREFRONT</h3>
          <ProfileForm userId={user.id} data={user} />
        </div>
      </div>
    </main>
  );
}
