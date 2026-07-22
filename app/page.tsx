// Welcome page

import Header from './components/Header';
import ProductGrid from '@/app/components/ProductGrid';


export default function HavenWelcome() {
  return (

    
    <main className="min-h-screen bg-white flex flex-col justify-start py-16 px-8 text-center">
      
      {/* 1. Header Area */}
      <Header />

      {/* 2. ProductGrid */}
      <ProductGrid />
      {/* 2. Visual Center (Mockup of a craft) */}
      

    </main>
  );
}