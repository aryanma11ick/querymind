"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "@/lib/auth";
import AppBackground from "@/components/ui/AppBackground";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    name: "Chat",
    href: "/chat",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    name: "Alerts",
    href: "/alerts",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    badge: "3",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // derive page title from pathname
  const pageTitle = NAV_ITEMS.find((i) => pathname.startsWith(i.href))?.name ?? "Dashboard";

  return (
    <div className="h-screen bg-neutral-950 p-4 overflow-hidden">
      <AppBackground />

      <div className="
        flex h-full rounded-3xl overflow-hidden
        border border-white/10
        bg-white/5 backdrop-blur-xl
        shadow-[0_20px_80px_rgba(0,0,0,0.6)]
        transition-all duration-300
      ">

        {/* ── Sidebar ── */}
        <aside className="
          w-56 hidden md:flex flex-col
          border-r border-white/10
          bg-white/[0.03]
        ">

          {/* Logo */}
          <div className="px-5 py-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              {/* logo mark */}
              <div className="
                w-7 h-7 rounded-lg flex items-center justify-center text-sm
                bg-blue-500/20 border border-blue-500/30 text-blue-400
              ">
                ✦
              </div>
              <span className="text-sm font-semibold text-white tracking-tight">
                QueryMind
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-neutral-600 px-3 mb-3">
              Menu
            </p>

            {NAV_ITEMS.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center justify-between
                    px-3 py-2.5 rounded-xl text-sm
                    transition-all duration-200
                    ${active
                      ? "bg-blue-500/15 text-white border border-blue-500/20"
                      : "text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* icon */}
                    <span className={`transition-colors duration-200 ${active ? "text-blue-400" : "text-neutral-600 group-hover:text-neutral-400"}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </div>

                  {/* badge */}
                  {item.badge && (
                    <span className={`
                      text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center
                      ${active ? "bg-blue-500/30 text-blue-300" : "bg-white/10 text-neutral-400"}
                    `}>
                      {item.badge}
                    </span>
                  )}

                  {/* active indicator dot */}
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 ml-1" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom: logout */}
          <div className="px-3 py-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="
                w-full flex items-center gap-3
                px-3 py-2.5 rounded-xl text-sm
                text-neutral-500 hover:text-red-400
                hover:bg-red-500/10 border border-transparent
                hover:border-red-500/20
                transition-all duration-200
              "
            >
              {/* logout icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="font-medium">Logout</span>
            </button>
          </div>

        </aside>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 min-w-0">

          {/* Header */}
          <header className="
            flex items-center justify-between
            px-6 py-4
            border-b border-white/10
            bg-white/[0.02] backdrop-blur-md
          ">
            <h2 className="text-sm font-semibold text-white tracking-tight">
              {pageTitle}
            </h2>

            {/* right side — extend as needed */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Live
              </span>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}