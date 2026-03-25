"use client";

import Navbar from "@/components/layout/navbar";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <Navbar />

      {/* HEADER */}
      <section className="px-4 sm:px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-5xl font-semibold tracking-tight"
        >
          Everything you need to query data with AI
        </motion.h1>

        <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
          QueryMind v2 combines natural language, SQL generation, and business
          intelligence into one seamless experience.
        </p>
      </section>

      {/* FEATURE GROUPS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 pb-20">

        {/* GROUP 1 */}
        <FeatureGroup
          title="AI Query Engine"
          features={[
            {
              title: "Natural Language to SQL",
              desc: "Convert plain English into optimized PostgreSQL queries instantly.",
            },
            {
              title: "RAG-Powered Context",
              desc: "Uses business rules and schema to ensure accurate joins and filters.",
            },
            {
              title: "SQL Validation Layer",
              desc: "Prevents invalid queries before execution.",
            },
          ]}
        />

        {/* GROUP 2 */}
        <FeatureGroup
          title="Visualization & Insights"
          features={[
            {
              title: "AI Chart Recommendation",
              desc: "Automatically selects the best chart type based on your data.",
            },
            {
              title: "Interactive Dashboard",
              desc: "Pick columns and generate real-time charts.",
            },
            {
              title: "Multi-Table Auto Join",
              desc: "Automatically joins tables based on predefined relationships.",
            },
          ]}
        />

        {/* GROUP 3 */}
        <FeatureGroup
          title="Intelligence Layer"
          features={[
            {
              title: "4-Tab Response Card",
              desc: "Insight, SQL, reasoning, and raw data in one clean interface.",
            },
            {
              title: "Confidence Scoring",
              desc: "Each query is rated based on accuracy and context matching.",
            },
            {
              title: "Session Memory",
              desc: "Follow-up queries refine previous results intelligently.",
            },
          ]}
        />

        {/* GROUP 4 */}
        <FeatureGroup
          title="Platform Features"
          features={[
            {
              title: "Anomaly Alerts",
              desc: "Detect unusual trends like revenue drops or spikes.",
            },
            {
              title: "YAML Rule Engine",
              desc: "Define business logic without changing code.",
            },
          ]}
        />

      </div>

      {/* CTA */}
      <section className="text-center py-20 px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Ready to explore your data?
        </h2>

        <button className="mt-6 bg-white text-black px-6 py-3 rounded-xl hover:opacity-90 transition">
          Get Started
        </button>
      </section>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function FeatureGroup({ title, features }: any) {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">{title}</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((f: any, i: number) => (
          <div
            key={i}
            className="border border-neutral-800 rounded-2xl p-5 bg-neutral-900/50 hover:bg-neutral-900 transition"
          >
            <h3 className="font-medium">{f.title}</h3>
            <p className="text-sm text-neutral-400 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}