import React from "react";
import { useLang } from "../i18n.jsx";

// Small EN / עברית switch. Pass onChange to also persist the choice
// somewhere (e.g. the lobby writes it to the shared room).
export default function LanguageToggle({ onChange, style }) {
  const { lang, setLang } = useLang();
  const pick = (l) => {
    setLang(l);
    onChange?.(l);
  };
  return (
    <div className="lang-toggle" style={style}>
      <button
        type="button"
        className={`lang-btn ${lang === "en" ? "active" : ""}`}
        onClick={() => pick("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={`lang-btn ${lang === "he" ? "active" : ""}`}
        onClick={() => pick("he")}
      >
        עברית
      </button>
    </div>
  );
}
