import SideNav from "@/app/ui/Nav/sidenav";
import Link from "next/link";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white">
      <div className="w-full flex-none md:w-64 border-r border-gray-100">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:px-12 md:py-10">
       <div className="flex justify-left">
         <Link href="/" className="text-md font-bold mb-6 hover:text-blue-600 transition-colors">
          ← Back to Store Front
        </Link>
       </div>
        {children}
      </div>
    </div>
  );
}