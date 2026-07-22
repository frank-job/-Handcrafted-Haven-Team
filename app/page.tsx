import Link from 'next/link';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function WelcomePage() {
  return (
    <main className="flex flex-col justify-between min-h-screen bg-white px-8 py-16">
      
      {/* 1. TOP: Brand Section */}
      <div className="animate-in fade-in slide-in-from-top-4 duration-700">
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
      </div>

      {/* 2. MIDDLE: Visual Element (Clean Placeholder) */}
      <div className="relative flex justify-center py-10">
        <div className="absolute inset-0 bg-blue-50 rounded-full filter blur-3xl opacity-50"></div>
        <div className="relative w-64 h-64 border-2 border-gray-100 rounded-[3rem] flex items-center justify-center bg-white shadow-xl shadow-blue-50">
           <span className="text-8xl">🎨</span>
        </div>
      </div>

      {/* 3. BOTTOM: Action Section */}
      <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Sign Up (Primary) */}
        <Link 
          href="/signup" 
          className="flex items-center justify-center gap-2 w-full bg-black text-white font-bold py-5 rounded-2xl active:scale-95 transition-all shadow-xl"
        >
          GET STARTED
        </Link>

        {/* Login (Secondary) */}
        <Link 
          href="/login" 
          className="w-full bg-white border-2 border-black text-black text-center font-bold py-5 rounded-2xl active:scale-95 transition-all"
        >
          LOG IN
        </Link>

        {/* THE "SKIP" LINK - This leads to your main dashboard/feed */}
        <Link 
          href="/dashboard" 
          className="group flex items-center justify-center gap-2 mt-4 text-gray-400 font-bold text-sm hover:text-blue-600 transition-colors"
        >
          SKIP FOR NOW 
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        <p className="text-[10px] text-center text-gray-300 mt-4 uppercase tracking-[0.2em]">
          Version 1.0 • Proudly Handcrafted
        </p>
      </div>

    </main>
  );
}