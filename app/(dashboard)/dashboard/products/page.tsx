
import ProductGrid from '@/app/components/ProductGrid';
import { products } from '@/lib/dummyProducts';

export default function ProductsPage() {
  return (
    <>
      {/* <div className="mb-10 text-left">
        <Header />
      </div> */}

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
    </>
  );
}