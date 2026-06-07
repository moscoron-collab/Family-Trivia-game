import React, { useState, useEffect } from "react";

export default function Countdown({ onDone }) {
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count <= 0) { onDone?.(); return; }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onDone]);

  return (
    <div className="app-container">
      <div className="bg-glow" />
      <div className="page-center animate-fade-in" style={{ zIndex: 1, position: "relative", textAlign: "center", gap: "1.5rem" }}>
        <div>
          <p className="text-secondary" style={{ fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontSize: "0.9rem" }}>
            Get Ready!
          </p>
          <h2 className="text-gradient" style={{ marginTop: "0.25rem" }}>Game starts in</h2>
        </div>

        <div className="countdown-display">{count}</div>

        <div className="card-glass" style={{ maxWidth: 320, padding: "1rem 1.5rem" }}>
          <p className="text-sm text-secondary">
            🧠 Remember: <strong style={{ color: "var(--text-primary)" }}>play fair!</strong>
          </p>
          <p className="text-xs text-muted mt-sm">
            Each correct answer earns up to <strong style={{ color: "var(--accent-yellow)" }}>6 points</strong> based on speed and difficulty.
          </p>
        </div>

        <AntiCheatMessage />
      </div>
    </div>
  );
}

function AntiCheatMessage() {
  return (
    <div className="anticheat-card" style={{ maxWidth: 360 }}>
      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🏆</div>
      <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
        This game tracks your progress over time. Using AI or looking up answers means your stats won't reflect the real you — your weak topics will stay weak, and you'll never know what you're actually great at.
      </p>
      <p style={{ marginTop: "0.625rem", fontWeight: 700, fontSize: "0.875rem", color: "var(--accent-yellow)" }}>
        Play honest. The data will prove you right. ✨
      </p>
    </div>
  );
}
