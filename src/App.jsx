import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import { LanguageProvider } from "./i18n.jsx";
import ErrorBoundary from "./components/ErrorBoundary";
import Gate from "./components/Gate";
import "./index.css";

// Family passcode. Change it by setting VITE_GATE_CODE, or just tell me a new one.
const GATE_CODE = import.meta.env.VITE_GATE_CODE || "1948";

export default function App() {
  const [unlocked, setUnlocked] = useState(() => {
    try { return localStorage.getItem("gateUnlocked") === GATE_CODE; } catch { return false; }
  });

  return (
    <LanguageProvider>
      <ErrorBoundary>
        {unlocked ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/room/:code" element={<Room />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <Gate code={GATE_CODE} onUnlock={() => setUnlocked(true)} />
        )}
      </ErrorBoundary>
    </LanguageProvider>
  );
}
