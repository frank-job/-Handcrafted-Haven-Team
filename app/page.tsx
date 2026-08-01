// Landing Page
import Link from "next/link";
import Hero from "@/app/components/Hero";
import ProductGrid from '@/app/components/ProductGrid';
import ProductCard from '@/app/components/ProductCard';
import { listProducts } from '@/lib/server/product-store';

export default async function WelcomePage() {
  const { data: featuredProducts } = listProducts({ limit: 4, sort: "newest" });

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden mt-4">
        <Hero />
      </section>

      {/* Featured Products Section */}
      <section className="px-6 max-w-7xl mx-auto w-full mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black tracking-tighter uppercase text-black">
            Featured
          </h2>
          <div className="h-px flex-grow mx-4 bg-gray-100 hidden sm:block" />
          <Link
            href="/products"
            className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
          >
            VIEW ALL →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Full Product Grid */}
      {/* ~ */}
    </main>
  );
}

