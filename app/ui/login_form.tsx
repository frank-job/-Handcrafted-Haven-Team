'use client';

import { AtSymbolIcon, KeyIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
  return (
    <form className="space-y-3">
      <div className="flex-1 rounded-3xl bg-white px-6 pb-8 pt-8 shadow-sm border border-gray-100">
        <h1 className="mb-3 font-serif text-2xl text-blue-700 font-bold">
          Welcome back
        </h1>
        <p className="text-sm text-black mb-6 italic">Log in to your artisan account.</p>
        
        <div className="w-full">
          {/* Email Field */}
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <input
                className="peer block w-full text-blue-700 rounded-xl border border-gray-200 py-[12px] pl-10 text-sm outline-none  focus:ring-2 focus:ring-blue-500 transition-all"
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
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-xl border text-black border-gray-200 py-[12px] pl-10 text-sm outline-none focus:ring-2 focus:ring-[#5F7161] transition-all"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-[#5F7161]" />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-blue-400 px-4 text-sm font-bold text-white transition-all hover:bg-blue-800 active:scale-95 shadow-md">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-white" />
        </button>
      </div>
    </form>
  );
}