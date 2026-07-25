import Button from "@/app/ui/button";
import Link from "next/link";
import HavenLogo from "../ui/handLogo";

export default function Header() {
    return (
        <header className="w-full text-black py-4 flex justify-between items-center mb-10">
            <div className="flex gap-2">
               {/* Handcraft <span className='text-blue-500'>Haven</span> */}
               < HavenLogo />
            </div>
            <nav>
              <ul className="flex gap-4 items-center">
                <li><Button variant="login" href="/login">Login</Button></li>
              </ul>
            </nav>
        </header>
    )
}