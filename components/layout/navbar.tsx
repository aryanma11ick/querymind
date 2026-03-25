"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`text-sm transition ${
        pathname === href
          ? "text-white"
          : "text-neutral-400 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-neutral-800">
      {/* Logo */}
      <Link href="/" className="font-semibold text-lg">
        QueryMind
      </Link>

      {/* Desktop Nav */}
      <div className="hidden sm:flex gap-6 items-center">
        {navLink("/features", "Features")}
        {navLink("/docs", "Docs")}

        <Link
        href="/login"
        className="bg-white text-black px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
        >
        Login
        </Link>
      </div>

      {/* Mobile Menu Button (we'll expand later) */}
      <button className="sm:hidden text-sm border border-neutral-700 px-3 py-1 rounded-lg hover:bg-neutral-800 transition">
        Menu
      </button>
    </nav>
  );
}