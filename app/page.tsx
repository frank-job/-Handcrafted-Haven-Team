// Landing Page
import Link from "next/link";
import ProductGrid from '@/app/components/ProductGrid';
import ProductCard from '@/app/components/ProductCard';
import { listProducts } from '@/lib/server/product-store';

export default async function WelcomePage() {
  const { data: featuredProducts } = listProducts({ limit: 4, sort: "newest" });

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-amber-50" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-black mb-6">
            Handcrafted <span className="text-blue-600">with ❤️</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
            Discover unique, handcrafted items made by talented artisans from around the world.
          </p>
          <Link
            href="/products"
            className="inline-block bg-black text-white font-bold px-10 py-4 rounded-2xl text-sm hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
        {/* Decorative dots */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl" />
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
      <section className="px-6 max-w-7xl mx-auto w-full mb-20">
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-black tracking-tighter uppercase text-black">
            All Products
          </h2>
          <div className="h-px flex-grow mx-4 bg-gray-100 hidden sm:block" />
        </div>
        <ProductGrid />
      </section>
    </main>
  );
}

