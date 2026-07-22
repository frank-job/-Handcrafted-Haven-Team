// Welcome page

import Header from '@/app/components/Header';
import HavenLogo from './ui/handLogo';
import ProductGrid from '@/app/components/ProductGrid';
// import { SparklesIcon } from '@heroicons/react/24/outline';


export default function WelcomePage() {
  return (
    <main className="flex flex-col justify-between min-h-screen bg-white px-8 py-16">
      <HavenLogo />
      <Header />
      {/* 1. TOP: Brand Section */}
      {/* <div className="animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-blue-600 font-bold tracking-widest text-xs uppercase">Premium Market</span>
        </div>
        <h1 className="text-black font-black text-6xl tracking-tighter">
          Handcrafted <span className='text-blue-700'>Haven</span>
        </h1>
        <p className="text-gray-500 mt-4 text-lg font-medium leading-relaxed max-w-[280px]">
          The new standard for <span className="text-black">handcrafted</span> excellence.
        </p>
      </div> */}

      {/* 2. MIDDLE: Visual Element (Clean Placeholder) */}
      {/* <div className="relative flex justify-center py-10"> */}
        {/* <div className="absolute inset-0 bg-blue-50 rounded-full filter blur-3xl opacity-50"></div>
        <div className="relative w-64 h-64 border-2 border-gray-100 rounded-[3rem] flex items-center justify-center bg-white shadow-xl shadow-blue-50">
           <span className="text-8xl">🎨</span>
        </div>
      </div> */}

      {/* 2. ProductGrid */}
      <ProductGrid />
      {/* 2. Visual Center (Mockup of a craft) */}
      

    </main>
  );
}