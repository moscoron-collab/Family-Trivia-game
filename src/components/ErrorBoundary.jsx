import React from "react";

// Catches any render crash so the app shows a recoverable message instead of
// a frozen/blank screen. Shows the error text to help diagnose issues.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", padding: "2rem", textAlign: "center", color: "#f1f5f9", background: "#0a0b14" }}>
          <div style={{ fontSize: "3rem" }}>😵</div>
          <h2 style={{ margin: 0 }}>Something went wrong</h2>
          <p style={{ color: "#94a3b8", maxWidth: 360 }}>
            The game hit an unexpected error. Tap reload to continue — your saved stats are safe.
          </p>
          <pre style={{ fontSize: "0.7rem", color: "#64748b", maxWidth: 360, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {String((this.state.error && this.state.error.message) || this.state.error)}
          </pre>
          <button
            onClick={() => { window.location.href = "/"; }}
            style={{ padding: "0.75rem 1.5rem", borderRadius: 9999, border: "none", background: "#7c3aed", color: "#fff", fontWeight: 700, cursor: "pointer" }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
