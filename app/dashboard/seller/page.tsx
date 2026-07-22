//Seller dashboard page - Boiketlo
import SideNav from "@/app/ui/Nav/sidenav";
import { geistMono, geistSans } from "@/app/ui/fonts";
import { Card } from "@/app/ui/dashboard/cards";
import RecentActivity from '@/app/ui/dashboard/recent-activity'


export default function SellerDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full flex-none md:w-64">
        <SideNav />
      </aside>

      <main className="flex-1 p-6 md:p-12">
        <div className="mb-8">
          <h1 className={`${geistMono.className} mb-2 text-xl font-bold md:text-2xl`}>
            Seller Dashboard
          </h1>
          <p className={geistSans.className}>Welcome back,</p>
        </div>

        <section className="mb-8 grid gap-6 sm:grid-cols-2">
          <Card title="Avg. Rating" value="" type="rating" />
          <Card title="Total Customers" value="" type="customers" />
        </section>

        <section className="mb-8">
          <RecentActivity />
        </section>
      </main>
    </div>
  );
}

