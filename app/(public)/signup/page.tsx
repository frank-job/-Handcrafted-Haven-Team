import Image from "next/image";
import SignupForm from "@/app/ui/signup-form";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignupPage() {
  return (
  <main className="relative flex items-center justify-center min-h-screen px-4 py-12 overflow-hidden">
    <Image
      src="/images/bg-pottery.jpg"
      alt="Handcrafted item"
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

    <div className="relative mx-auto flex w-full max-w-100 flex-col space-y-4">
      {/* Import the Signup Component */}
      <SignupForm />

      <div className="text-center">
          <p className="text-xs text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-[#E7AB79] font-bold hover:underline">
                  Log in here
              </Link>
          </p>
      </div>
    </div>      
  </main>
  );
}