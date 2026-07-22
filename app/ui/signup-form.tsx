'use client';

import { 
  AtSymbolIcon, 
  KeyIcon, 
  UserIcon,
  ArrowRightIcon 
} from "@heroicons/react/24/outline";

export default function SignupForm() {
  return (
    <form className="space-y-3">
      <div className="flex-1 rounded-3xl bg-white px-6 pb-8 pt-8 shadow-sm border border-gray-100">
        <h1 className="mb-3 font-serif text-2xl text-blue-700 font-bold">
          Join the Haven
        </h1>
        <p className="text-sm text-gray-500 mb-6 italic">Create your artisan storefront today.</p>
        
        <div className="w-full">
          {/* Full Name Field */}
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-blue-500" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full text-black rounded-xl border border-gray-200 py-[12px] pl-10 text-sm outline-none focus:ring-2 focus:ring-[#5F7161] transition-all"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-[#5F7161]" />
            </div>
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-blue-500" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <input
                className="peer block w-full text-shadow-black rounded-xl border border-gray-200 py-[12px] pl-10 text-sm outline-none focus:ring-2 focus:ring-[#5F7161] transition-all"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-[#5F7161]" />
            </div>
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-blue-500" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full text-black rounded-xl border border-gray-200 py-[12px] pl-10 text-sm outline-none focus:ring-2 focus:ring-black transition-all"
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-[#5F7161]" />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-blue-500 px-4 text-sm font-bold text-white transition-all hover:bg-blue-700 active:scale-95 shadow-md">
          Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-blue-950" />
        </button>
      </div>
    </form>
  );
}