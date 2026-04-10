"use client";

export default function AppBackground() {
  return (
    <>
      {/* Base */}
      <div className="fixed inset-0 bg-black -z-10" />

      {/* Soft blue glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.12),transparent_60%)] -z-10" />

      {/* Vignette */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/20 to-black -z-10" />
    </>
  );
}