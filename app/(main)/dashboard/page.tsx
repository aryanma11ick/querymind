"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import ParticleBG from "@/components/common/particle-bg";

export default function DashboardPage() {
  const router = useRouter();

  const cards = [
    {
      title: "Ask a Question",
      desc: "Use natural language to generate SQL queries instantly.",
      path: "/chat",
      icon: "✦",
      tag: "⌘ K",
    },
    {
      title: "Build Dashboard",
      desc: "Visualize your data with AI-powered charts.",
      path: "/dashboard",
      icon: "⬡",
      tag: "New",
    },
    {
      title: "View Alerts",
      desc: "Monitor anomalies and important metrics.",
      path: "/alerts",
      icon: "◎",
      tag: "3 active",
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden flex items-center justify-center">

      {/* Particle BG (disabled on small screens for performance) */}
      <div className="hidden md:block">
        <ParticleBG />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-2">
            QueryMind
          </p>

          <h1 className="text-4xl font-semibold text-white">
            Welcome back 👋
          </h1>

          <p className="text-neutral-400 mt-2 text-sm max-w-sm mx-auto">
            Your data, answered in plain English.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4 md:px-0">
          {cards.map((card, i) => (
            <AnimatedCard
              key={card.title}
              card={card}
              delay={i}
              onClick={() => router.push(card.path)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

function AnimatedCard({ card, delay, onClick }: any) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        onClick={onClick}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="
          group relative cursor-pointer overflow-hidden
          bg-white/5 backdrop-blur-md
          border border-white/10
          rounded-2xl p-6
          transition-all duration-300
          will-change-transform
          hover:bg-white/[0.08]
          hover:border-white/20
        "
      >

        {/* Glow (no re-renders now) */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(250px circle at var(--x) var(--y), rgba(59,130,246,0.15), transparent 60%)`,
          }}
        />

        <CardContent className="relative z-10 p-0">

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl text-blue-400">{card.icon}</span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-500 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
              {card.tag}
            </span>
          </div>

          <h3 className="text-base font-semibold text-white group-hover:text-blue-300 transition mb-1">
            {card.title}
          </h3>

          <p className="text-sm text-neutral-400">
            {card.desc}
          </p>

          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
            transition={{ duration: 0.2 }}
            className="mt-4 text-blue-400 text-xs flex items-center gap-1"
          >
            Open →
          </motion.div>

        </CardContent>
      </Card>
    </motion.div>
  );
}