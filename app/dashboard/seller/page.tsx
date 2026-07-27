// Seller Dashboard Page - Boiketlo
import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { geistMono } from "@/app/ui/fonts";
import { Card } from "@/app/ui/dashboard/cards";
import RecentActivity from '@/app/ui/dashboard/recent-activity';

export default async function SellerDashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    redirect('/login');
  }

  const userId = sessionCookie.value;

  const { rows } = await sql`
    SELECT username FROM users WHERE id = ${userId}
  `;
  const user = rows[0] as { username: string } | undefined;

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-10">
        <h1 className={`${geistMono.className} text-2xl font-black text-blue-600 uppercase tracking-tighter mb-2`}>
          Seller Dashboard
        </h1>
        <p className={`${geistMono.className} text-blue-600 text-xl font-bold`}>
          Welcome back, <span className="text-black">{user.username}</span>
        </p>
      </div>

      <section className="mb-8 grid gap-6 sm:grid-cols-2">
        <Card title="Avg. Rating" value="—" type="rating" />
        <Card title="Total Customers" value="—" type="customers" />
      </section>

      <section className="mb-8">
        <RecentActivity />
      </section>
    </div>
  );
}

