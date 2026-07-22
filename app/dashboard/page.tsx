import Header from '@/app/components/Header';
import ProductGrid from '@/app/components/ProductGrid';
import { products } from '@/lib/dummyProducts';
import SideNav from "@/app/ui/Nav/sidenav";

export default function Home() {
  return (
    // OUTER WRAPPER: Flexbox to put Sidebar and Content side-by-side
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white">
      
      {/* 1. SIDEBAR: Fixed width on desktop, full width on mobile */}
      <div className="w-full flex-none md:w-64 border-r border-gray-100">
        <SideNav />
      </div>

      {/* 2. CONTENT AREA: This part scrolls while the Sidebar stays still */}
      <div className="flex-grow p-6 md:overflow-y-auto md:px-12 md:py-10">
        
        {/* Header Section */}
        <div className="mb-10 text-left">
          <Header />
        </div>

        {/* Product Catalog Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-black tracking-tighter uppercase">
              The Collection
            </h2>
            <div className="h-px flex-grow mx-4 bg-gray-100 hidden sm:block"></div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {products.length} ITEMS
            </span>
          </div>

          <ProductGrid />
        </section>

      </div>
    </div>
  );
}