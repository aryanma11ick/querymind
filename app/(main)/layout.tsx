"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 p-6 hidden md:flex flex-col justify-between">
        
        <div>
          <h1 className="text-lg font-semibold mb-8">QueryMind</h1>

          <nav className="space-y-4">
            <Link href="/dashboard" className="block text-neutral-400 hover:text-white">
              Dashboard
            </Link>
            <Link href="/chat" className="block text-neutral-400 hover:text-white">
              Chat
            </Link>
            <Link href="/alerts" className="block text-neutral-400 hover:text-white">
              Alerts
            </Link>
            <Link href="/settings" className="block text-neutral-400 hover:text-white">
              Settings
            </Link>
          </nav>
        </div>

        
        <button
          onClick={handleLogout}
          className="text-sm text-neutral-400 hover:text-white"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b border-neutral-800 px-6 py-4">
          <h2 className="text-lg font-medium">Dashboard</h2>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}