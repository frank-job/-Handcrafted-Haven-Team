// Welcome page

import Header from '@/app/components/Header';
import HavenLogo from './ui/handLogo';
import ProductGrid from '@/app/components/ProductGrid';
// import { SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <main className="flex flex-col justify-between min-h-screen bg-white bg-gra px-8 py-8">
       {/* <div className="flex items-center gap-2">
        <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg shadow-blue-200">
          Dashboard
        </Link>
      </div> */}
      {/* <HavenLogo /> */}
    
      <Header />

      {/* 2. ProductGrid */}
      <ProductGrid />
     
    </main>
  );
}