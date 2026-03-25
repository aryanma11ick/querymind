"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const isAuthPage =
        pathname === "/login" || pathname === "/register";

      if (data.session && isAuthPage) {
        router.replace("/dashboard");
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_OUT") {
          router.replace("/login");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  return <>{children}</>;
}