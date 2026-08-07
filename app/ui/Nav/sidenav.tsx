// Side navigation for sellers dashboard - Boiketlo

import Link from 'next/link';
import NavLinks from './NavLinks';
import HavenLogo from "@/app/ui/handLogo";
import Image from 'next/image'

export default function SideNav() {
  return (
    <>   
      <div className="flex h-full gap-2 bg-white flex-col px-3 py-4 md:px-2">
        <div className="flex flex-row items-center gap-2">
           <Image
            src="/images/circle-logo.png"
            width={40}
            height={40}
            alt="Picture of the author"
          />
          <span>Handcrafted Haven</span>
        </div>

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

