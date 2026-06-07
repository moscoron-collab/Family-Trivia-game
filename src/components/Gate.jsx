import React, { useState } from "react";
import { useT } from "../i18n.jsx";
import LanguageToggle from "./LanguageToggle";

// Passcode screen shown before anyone can use the app. Once the correct code is
// entered it's remembered on that device (until the code changes).
export default function Gate({ code, onUnlock }) {
  const tr = useT();
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (val.trim() === code) {
      try { localStorage.setItem("gateUnlocked", code); } catch {}
      onUnlock();
    } else {
      setErr(true);
    }
  };

  return (
    <div className="app-container">
      <div className="bg-glow" />
      <LanguageToggle style={{ position: "absolute", top: 12, insetInlineEnd: 12, zIndex: 3 }} />
      <div className="page-center animate-fade-in" style={{ zIndex: 1, position: "relative", gap: "1.25rem" }}>
        <div className="logo">
          <div className="logo-icon">🏆</div>
        </div>
        <div className="card" style={{ maxWidth: 360, width: "100%", textAlign: "center" }}>
          <h3 className="mb-sm">{tr("gateTitle")}</h3>
          <p className="text-sm text-muted mb-md">{tr("gatePrompt")}</p>
          <form onSubmit={submit} className="stack stack-sm">
            <input
              className="input"
              type="password"
              placeholder={tr("gatePlaceholder")}
              value={val}
              onChange={(e) => { setVal(e.target.value); setErr(false); }}
              autoFocus
              style={{ textAlign: "center", letterSpacing: "2px" }}
            />
            {err && (
              <p className="text-sm" style={{ color: "var(--accent-red)" }}>⚠️ {tr("gateWrong")}</p>
            )}
            <button type="submit" className="btn btn-primary btn-full">{tr("gateEnter")}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
