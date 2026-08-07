import HavenLogo from "@/app/ui/handLogo";
import Image from "next/image";
import LoginForm from "../../ui/login_form";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Login',
};


export default function LoginPage() {
  return (
      <main className="relative flex items-center justify-center min-h-screen px-4 py-12 overflow-hidden">
       <Image
        src="/images/bg-store.jpg"
        alt="Handcrafted item"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
      <div className="relative mx-auto flex w-full max-w-100 flex-col space-y-4">
        {/* Here is where we import your component! */}
        <LoginForm />

        <div className="text-center">
            <p className="text-xs text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-[#E7AB79] font-bold hover:underline">
                    Sign up
                </Link>
            </p>
        </div>
      </div>
    </main>
  );
}