// Welcome page

import Link from 'next/link';
import HavenLogo from './ui/handLogo'; // Adjust path as needed

export default function HavenWelcome() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-between py-16 px-8 text-center">
      
      {/* 1. Header Area */}
      <div className="mt-10 animate-fade-in">
        <HavenLogo />
        <p className="text-blue-900 mt-6 font-medium max-w-[280px] mx-auto leading-relaxed">
          Connecting you to the world’s most talented artisans. 
          Every item has a story.
        </p>
      </div>

      {/* 2. Visual Center (Mockup of a craft) */}
      <div className="w-64 h-64 bg-blue-600 rounded-[3rem] opacity-50 relative flex items-center justify-center">
         {/* You can put a high-quality photo of pottery or woodwork here later */}
         <span className="text-6xl italic text-blue-700">✨</span>
      </div>

      {/* 3. Startup Actions */}
      <div className="w-full max-w-sm space-y-4">
        <h2 className="text-blue-700 font-serif text-2xl mb-6">Start your journey</h2>
        
        <Link 
          href="../haven/signup" 
          className="block w-full bg-blue-600 text-[#FAF9F6] font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
         Sign Up
        </Link>
        
        <Link 
          href="/haven/browse" 
          className="block w-full border-2 border-blue-500 text-black font-bold py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all active:scale-95"
        >
          EXPLORE THE HAVEN
        </Link>

        <Link
          href="/login"
          className="text-blue-500 text-sm mt-4 underline decoration-dotted underline-offset-4 hover:text-blue-700"
        >
          Already a member? Sign in
        </Link>
      </div>

    </main>
  );
}