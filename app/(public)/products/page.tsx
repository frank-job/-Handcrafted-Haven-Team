import ProductGrid from "@/app/components/ProductGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Products',
};

export default function ProductsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section className="px-6 max-w-7xl mx-auto w-full mb-20 mt-16">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-black tracking-tighter uppercase text-black">
            All Products
          </h1>
          <div className="h-px flex-grow mx-4 bg-gray-100 hidden sm:block" />
        </div>

        <ProductGrid />
      </section>
    </main>
  );
}