import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import { LanguageProvider } from "./i18n.jsx";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

export default function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:code" element={<Room />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </LanguageProvider>
  );
}
