import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AuthProvider from "@/components/providers/auth-provider";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QueryMind",
  description: "AI-powered data querying platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        figtree.variable,
        "font-sans"
      )}
    >
      {/* ✅ LOCK viewport */}
      <body className="h-screen w-screen overflow-hidden bg-neutral-950 text-white">
        <AuthProvider>
          {/* ✅ children take full space */}
          <div className="h-full w-full">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}