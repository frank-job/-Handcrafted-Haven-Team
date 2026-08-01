// app/ui/footer.tsx
import Link from "next/link";
import HavenLogo from "@/app/ui/handLogo";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 py-8 bg-gray-100">
     <div className="max-w-7xl mx-auto">
       <div className="px-8 mx-auto flex flex-col sm:flex-row justify-between gap-8">
        {/* Brand + tagline */}
        <div className="flex flex-col gap-2">
          <HavenLogo />
          <p className="text-sm text-gray-800 max-w-xs">
            Handmade goods from independent makers, delivered with care.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-black">Shop</h3>
            <Link href="/products" className="text-sm text-gray-500 hover:text-blue-500">Products</Link>
            <Link href="/about" className="text-sm text-gray-500 hover:text-blue-500">About</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-black">Sellers</h3>
            <Link href="/signup" className="text-sm text-gray-500 hover:text-blue-500">Become a seller</Link>
            <Link href="/login" className="text-sm text-gray-500 hover:text-blue-500">Seller login</Link>
          </div>
        </div>

      </div>
      <div className="p-8">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
      </div>
     </div>
    </footer>
  );
}