"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBG from "@/components/common/particle-bg";

type Severity = "high" | "medium";

interface Alert {
  id: string;
  name: string;
  metric: string;
  value: number;
  baseline: number;
  direction: "above" | "below";
  ts: string;
  suggested_query: string;
  severity: Severity;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissing, setDismissing] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      const res = await fetch("/api/alerts");
      const data = await res.json();
      setAlerts(data.alerts ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const dismiss = async (id: string) => {
    setDismissing(id);
    await fetch(`/api/alerts/${id}`, { method: "DELETE" });
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    setDismissing(null);
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30_000);
    return () => clearInterval(interval);
  }, []);

  const high   = alerts.filter((a) => a.severity === "high");
  const medium = alerts.filter((a) => a.severity === "medium");

  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      <ParticleBG />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-0" />

      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-10 max-w-4xl mx-auto w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-2">
            QueryMind
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white tracking-tight">Alerts</h1>
              <p className="text-neutral-400 mt-1 text-sm">
                Live anomaly detection across your key metrics.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {alerts.length > 0 && (
                <span className="text-xs font-semibold bg-white/5 border border-white/10 text-neutral-400 rounded-full px-3 py-1">
                  {alerts.length} active
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Live
              </span>
            </div>
          </div>
        </motion.div>

        {/* Loading skeletons */}
        {loading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && alerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <span className="text-5xl mb-4">◎</span>
            <p className="text-white font-medium text-lg">All clear</p>
            <p className="text-neutral-500 text-sm mt-1">
              No anomalies detected. Checks run every 30 seconds.
            </p>
          </motion.div>
        )}

        {!loading && high.length > 0 && (
          <Section label="High severity" count={high.length} delay={0.1}>
            {high.map((alert, i) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                delay={i * 0.06}
                dismissing={dismissing === alert.id}
                onDismiss={() => dismiss(alert.id)}
              />
            ))}
          </Section>
        )}

        {!loading && medium.length > 0 && (
          <Section label="Medium severity" count={medium.length} delay={0.2}>
            {medium.map((alert, i) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                delay={i * 0.06}
                dismissing={dismissing === alert.id}
                onDismiss={() => dismiss(alert.id)}
              />
            ))}
          </Section>
        )}

      </div>
    </div>
  );
}

/* ── section ── */
function Section({ label, count, delay, children }: {
  label: string; count: number; delay: number; children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-3">
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500">{label}</p>
        <span className="text-[10px] bg-white/5 border border-white/10 text-neutral-500 rounded-full px-2 py-0.5">
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <AnimatePresence>{children}</AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── alert card ── */
function AlertCard({ alert, delay, dismissing, onDismiss }: {
  alert: Alert;
  delay: number;
  dismissing: boolean;
  onDismiss: () => void;
}) {
  const router = useRouter();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isHigh      = alert.severity === "high";
  const accentColor = isHigh ? "rgba(248,113,113,0.15)" : "rgba(251,191,36,0.12)";
  const accentGlow  = isHigh ? "rgba(248,113,113,0.35)" : "rgba(251,191,36,0.28)";
  const badgeColor  = isHigh
    ? "text-red-400 bg-red-500/10 border-red-500/20"
    : "text-amber-400 bg-amber-500/10 border-amber-500/20";

  const pctDiff = alert.baseline > 0
    ? Math.round(Math.abs(alert.value - alert.baseline) / alert.baseline * 100)
    : 0;

  const timeAgo = (() => {
    const diff = Math.floor((Date.now() - new Date(alert.ts).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  })();

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── actions ──────────────────────────────────────────────
  const handleRunQuery = () => {
    // Pass the suggested query to the chat page via URL param
    router.push(`/chat?q=${encodeURIComponent(alert.suggested_query)}`);
  };

  const handleCopyQuery = () => {
    navigator.clipboard.writeText(alert.suggested_query);
    setCopied(true);
    setMenuOpen(false);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyValues = () => {
    const text = `Alert: ${alert.name}\nValue: ${alert.value}\nBaseline: ${Math.round(alert.baseline)}\nDeviation: ${pctDiff}%\nTime: ${alert.ts}`;
    navigator.clipboard.writeText(text);
    setMenuOpen(false);
  };

  const handleDismiss = () => {
    setMenuOpen(false);
    onDismiss();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.25 } }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
        className="
          group relative overflow-visible
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl
          transition-all duration-300
          hover:bg-white/[0.08] hover:border-white/20
          hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        "
      >
        {/* spotlight glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none overflow-hidden"
          style={{ background: `radial-gradient(260px circle at ${pos.x}px ${pos.y}px, ${accentColor}, transparent 60%)` }}
        />
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none overflow-hidden"
          style={{
            background: `radial-gradient(130px circle at ${pos.x}px ${pos.y}px, ${accentGlow}, transparent 65%)`,
            filter: "blur(8px)",
          }}
        />
        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />

        <CardContent className="relative z-10 p-5">

          {/* Top row */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-bold tracking-widest uppercase border rounded-full px-2.5 py-0.5 ${badgeColor}`}>
              {isHigh ? "High" : "Medium"}
            </span>
            <span className="text-[11px] text-neutral-500">
              {alert.direction === "above" ? "↑" : "↓"} {pctDiff}% vs baseline
            </span>
            <span className="text-[11px] text-neutral-600 ml-auto">{timeAgo}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-white mb-2">{alert.name}</h3>

          {/* Progress bar */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${isHigh ? "bg-red-400" : "bg-amber-400"}`}
                style={{ width: `${Math.min(100, (alert.value / Math.max(alert.value, alert.baseline)) * 100)}%` }}
              />
            </div>
            <span className="text-xs font-mono text-neutral-400 shrink-0">
              {alert.value.toLocaleString()} / {Math.round(alert.baseline).toLocaleString()}
            </span>
          </div>

          {/* Suggested query */}
          <p className="text-xs text-neutral-500 italic truncate mb-4">
            💡 "{alert.suggested_query}"
          </p>

          {/* ── Action buttons ── */}
          <div className="flex items-center gap-2">

            {/* Run query — primary action */}
            <button
              onClick={handleRunQuery}
              className="
                flex items-center gap-1.5 text-xs font-semibold
                text-white bg-blue-500/20 hover:bg-blue-500/30
                border border-blue-500/30 hover:border-blue-400/50
                rounded-lg px-3 py-1.5
                transition-all duration-200
              "
            >
              <span>▶</span> Run query
            </button>

            {/* Copy query shortcut */}
            <button
              onClick={handleCopyQuery}
              className="
                text-xs font-medium
                text-neutral-400 hover:text-white
                bg-white/5 hover:bg-white/10
                border border-white/10 hover:border-white/20
                rounded-lg px-3 py-1.5
                transition-all duration-200
              "
            >
              {copied ? "✓ Copied" : "Copy query"}
            </button>

            <div className="flex-1" />

            {/* ⋯ kebab menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="
                  text-neutral-500 hover:text-white
                  bg-white/5 hover:bg-white/10
                  border border-white/10 hover:border-white/20
                  rounded-lg w-8 h-8 flex items-center justify-center
                  transition-all duration-200 text-base leading-none
                "
              >
                ⋯
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="
                      absolute right-0 bottom-10 z-50
                      bg-[#0f1623] border border-white/10
                      rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.7)]
                      overflow-hidden min-w-[170px]
                    "
                  >
                    <MenuItem icon="▶" label="Run query"      onClick={handleRunQuery}    />
                    <MenuItem icon="⎘" label="Copy query"     onClick={handleCopyQuery}   />
                    <MenuItem icon="📋" label="Copy values"   onClick={handleCopyValues}  />
                    <div className="h-px bg-white/10 mx-3" />
                    <MenuItem
                      icon="✕"
                      label={dismissing ? "Dismissing…" : "Dismiss alert"}
                      onClick={handleDismiss}
                      danger
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ── menu item ── */
function MenuItem({ icon, label, onClick, danger = false }: {
  icon: string;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2.5 px-4 py-2.5
        text-xs font-medium text-left
        transition-colors duration-150
        ${danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-neutral-300 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      <span className="text-sm">{icon}</span>
      {label}
    </button>
  );
}