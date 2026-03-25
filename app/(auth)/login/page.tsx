"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ParticleBG from "@/components/common/particle-bg";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔐 Email login
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4 overflow-hidden">
      
      <ParticleBG />

      <div className="relative z-10 w-full max-w-md border border-neutral-800 rounded-2xl p-8 bg-neutral-900/60 backdrop-blur-xl">

        <h1 className="text-2xl font-semibold text-center">
          Welcome back
        </h1>

        <p className="text-neutral-400 text-sm text-center mt-2">
          Login to QueryMind
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 bg-white text-black py-3 rounded-xl font-medium"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-neutral-800" />
          <span className="text-xs text-neutral-500">OR</span>
          <div className="flex-1 h-px bg-neutral-800" />
        </div>

        {/* 🔥 Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border border-neutral-700 py-3 rounded-xl hover:bg-neutral-800 transition"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-neutral-400 mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}