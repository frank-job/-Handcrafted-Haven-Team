"use client";
import { useState } from "react";
import Link from "next/link";
import HavenLogo from "@/app/ui/handLogo";
import Button from "@/app/ui/button";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto w-full text-black py-6 flex justify-between items-center px-6 relative">
        <Link href="/" className="flex gap-2">
        <HavenLogo />
      </Link>

      {/* Desktop nav: hidden on mobile, shown from sm up */}
      <nav className="hidden sm:block">
        <ul className="flex gap-4 items-center">
          <li><Link href="/products" className="hover:text-blue-500">Products</Link></li>
          <li><Button variant="secondary" href="/signup">Become a seller</Button></li>
          <li><Button variant="login" href="/login">Seller login</Button></li>
        </ul>
      </nav>

      {/* Hamburger button: mobile only */}
      <button
        className="sm:hidden p-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {open ? (
            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {/* Mobile dropdown */}
      {open && (
        <nav className="sm:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-md z-50">
          <ul className="flex flex-col gap-2 p-4">
            <li><Link href="/products" onClick={() => setOpen(false)} className="block py-2">Products</Link></li>
            <li><Button variant="secondary" href="/signup" onClick={() => setOpen(false)}>Become a seller</Button></li>
            <li><Button variant="login" href="/login" onClick={() => setOpen(false)}>Seller login</Button></li>
          </ul>
        </nav>
      )}
      </div>
    </header>
  );
}