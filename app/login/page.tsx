import HavenLogo from "@/app/ui/handLogo";
import LoginForm from "../ui/login_form";
import Link from "next/link";
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-[#FAF9F6] px-4">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-4">
        
        {/* Header / Logo */}
        <div className="flex h-32 w-full items-center justify-center rounded-3xl p-6 shadow-lg">
           <HavenLogo />
        </div>

        {/* Here is where we import your component! */}
        <LoginForm />

        <div className="text-center">
            <p className="text-xs text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-blue-950 font-bold hover:underline">
                    Sign up
                </Link>
            </p>
        </div>
      </div>
    </main>
  );
}