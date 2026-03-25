"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import ParticleBG from "@/components/common/particle-bg";
import Link from "next/link";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // 🔥 Auto redirect if logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/dashboard");
      }
    });
  }, [router]);

  return (
    <main className="relative bg-neutral-950 text-white min-h-screen overflow-hidden">
      <ParticleBG />

      <div className="relative z-10">
        <Navbar />

        {/* HERO */}
        <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 sm:py-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl leading-tight"
          >
            Query your data.
            <br />
            <span className="text-neutral-400">No SQL required.</span>
          </motion.h1>

          <p className="mt-4 sm:mt-6 text-neutral-400 max-w-xl text-sm sm:text-base">
            QueryMind v2 converts natural language into accurate SQL using AI +
            business rules. Get insights, charts, and answers instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto">
            <Link
              href="/login"
              className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Get Started
            </Link>

            <button className="w-full sm:w-auto border border-neutral-700 px-6 py-3 rounded-xl hover:bg-neutral-800 transition">
              View Demo
            </button>
          </div>
        </section>

        {/* FEATURES */}
        <section className="px-4 sm:px-6 py-16 sm:py-20 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="border border-neutral-800 rounded-2xl p-5 sm:p-6 bg-neutral-900/50 backdrop-blur hover:bg-neutral-900 transition"
            >
              <h3 className="text-base sm:text-lg font-semibold">
                {f.title}
              </h3>
              <p className="text-neutral-400 mt-2 text-sm">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* PRODUCT PREVIEW */}
        <section className="px-4 sm:px-6 py-16 sm:py-20 flex justify-center">
          <div className="w-full max-w-5xl border border-neutral-800 rounded-2xl p-4 sm:p-6 bg-neutral-900">
            <p className="text-xs sm:text-sm text-neutral-400 mb-3 sm:mb-4">
              Example Query
            </p>

            <div className="bg-black rounded-xl p-3 sm:p-4 font-mono text-xs sm:text-sm text-green-400 overflow-x-auto">
              SELECT SUM(revenue) FROM orders WHERE created_at &gt;=
              '2024-01-01';
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-semibold text-sm sm:text-base">
                  Insight
                </h4>
                <p className="text-neutral-400 text-xs sm:text-sm mt-2">
                  Revenue increased by 18% compared to the previous
                  quarter.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm sm:text-base">
                  Confidence
                </h4>
                <span className="inline-block mt-2 px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                  HIGH
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-20 sm:py-24 px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Start querying your data today
          </h2>

          <Link
            href="/login"
            className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Try QueryMind
          </Link>
        </section>
      </div>
    </main>
  );
}

const features = [
  {
    title: "Natural Language to SQL",
    desc: "Ask questions in plain English and get production-ready SQL instantly.",
  },
  {
    title: "RAG-Powered Accuracy",
    desc: "Uses business rules and schema context to avoid wrong joins.",
  },
  {
    title: "AI Insights",
    desc: "Clear explanations, charts, and confidence scoring for every query.",
  },
];