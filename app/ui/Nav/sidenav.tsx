// Side navigation for sellers dashboard - Boiketlo

import Link from 'next/link';
import NavLinks from './NavLinks';
import HavenLogo from "@/app/ui/handLogo";
export default function SideNav() {
  return (
    <>
   
      <div className="flex h-full gap-2 bg-white flex-col px-3 py-4 md:px-2">
         <HavenLogo />
      <Link
        href="/"
      >
        <div className="w-32 text-white md:w-40">

        </div>
      </Link>
      <div className="flex grow flex-row text-blue-600 justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
      </div>
      </>
  );
}

