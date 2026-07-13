// Welcome page

import Header from './components/Header';
import ProductGrid from '@/app/components/ProductGrid';
import { products } from '@/lib/dummyProducts';

export default function HavenWelcome() {
  return (

    
    <main className="min-h-screen bg-white flex flex-col justify-start py-16 px-8 text-center">
      
      {/* 1. Header Area */}
      <Header />

      {/* 2. ProductGrid */}
      <ProductGrid products={products} />

    </main>
  );
}