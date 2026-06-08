import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signInAsGuest } from "../firebase/auth";
import { createRoom, joinRoom } from "../firebase/room";
import { useT } from "../i18n.jsx";
import LanguageToggle from "../components/LanguageToggle";

const PRESET_NAMES = ["Daniel", "Lea", "Aba", "Ima"];
const PLAYER_COLORS = ["#7c3aed", "#3b82f6", "#06b6d4", "#ec4899", "#f97316", "#22c55e", "#eab308", "#ef4444"];
const AVATARS = ["🦊", "🐼", "🐵", "🦁", "🐯", "🐸", "🐙", "🦄", "🐧", "🐶", "🐱", "🐨", "🐰", "🐮", "🦖", "🐲"];

export default function Home() {
  const navigate = useNavigate();
  const tr = useT();
  const [mode, setMode] = useState(null); // null | 'create' | 'join'
  const [authStep, setAuthStep] = useState(false);
  const [authMode, setAuthMode] = useState(null); // 'google' | 'guest'
  const [playerName, setPlayerName] = useState("");
  const [customName, setCustomName] = useState("");
  const [avatar, setAvatar] = useState(() => AVATARS[Math.floor(Math.random() * AVATARS.length)]);
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingAction, setPendingAction] = useState(null);

  const handleSelectPresetName = (name) => setPlayerName(name);

  const getFinalName = () => customName.trim() || playerName;

  const handleProceed = (action) => {
    if (!getFinalName()) {
      setError(tr("errNoName"));
      return;
    }
    if (action === "join" && joinCode.trim().length !== 4) {
      setError(tr("errNoCode"));
      return;
    }
    setError("");
    setPendingAction(action);
    setAuthStep(true);
  };

  const handleAuth = async (method) => {
    setLoading(true);
    setError("");
    try {
      let user;
      if (method === "google") {
        user = await signInWithGoogle();
      } else {
        user = await signInAsGuest();
      }

      const colorIndex = Math.floor(Math.random() * PLAYER_COLORS.length);
      const playerData = {
        uid: user.uid,
        name: getFinalName(),
        avatar,
        isGuest: method === "guest",
        photoURL: user.photoURL || null,
        color: PLAYER_COLORS[colorIndex],
        email: user.email || null,
      };

      // Store player in session
      sessionStorage.setItem("player", JSON.stringify(playerData));

      if (pendingAction === "create") {
        const code = await createRoom(playerData);
        navigate(`/room/${code}`);
      } else {
        await joinRoom(joinCode.trim(), playerData);
        navigate(`/room/${joinCode.trim()}`);
      }
    } catch (err) {
      setError(err.message || tr("errGeneric"));
      setAuthStep(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="bg-glow" />
      <LanguageToggle style={{ position: "absolute", top: 12, insetInlineEnd: 12, zIndex: 3 }} />
      <div className="page-center animate-fade-in" style={{ position: "relative", zIndex: 1, gap: "1.5rem" }}>

        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">🏆</div>
          <div className="logo-title">{tr("logoTitle")}</div>
          <div className="logo-subtitle" style={{ color: "var(--accent-purple-light)", fontWeight: 700 }}>{tr("battle")}</div>
        </div>

        {/* Auth Step */}
        {authStep ? (
          <div className="card animate-scale-in" style={{ width: "100%", maxWidth: 380 }}>
            <div className="stack stack-md">
              <div className="text-center">
                <h3>{tr("signInTitle")}</h3>
                <p className="text-sm text-muted mt-sm">
                  {tr("signInSubtitle")}
                </p>
              </div>

              <button id="btn-google-signin" className="btn btn-google btn-full btn-lg" onClick={() => handleAuth("google")} disabled={loading}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {tr("continueGoogle")}
              </button>

              <div className="row row-center gap-sm" style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
                {tr("or")}
                <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
              </div>

              <button id="btn-guest-signin" className="btn btn-secondary btn-full" onClick={() => handleAuth("guest")} disabled={loading}>
                {tr("playGuest")}
              </button>

              <p className="text-xs text-muted text-center">
                {tr("guestNote")}
              </p>

              {error && (
                <div style={{ padding: "0.625rem 0.875rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "var(--radius-md)", fontSize: "0.85rem", color: "var(--accent-red)" }}>
                  ⚠️ {error}
                </div>
              )}

              <button className="btn btn-secondary btn-sm" onClick={() => setAuthStep(false)}>{tr("back")}</button>
            </div>
          </div>
        ) : mode === null ? (
          /* Main Menu */
          <div className="stack stack-md animate-scale-in" style={{ width: "100%", maxWidth: 380 }}>
            <button id="btn-create-room" className="btn btn-primary btn-full btn-lg" onClick={() => setMode("create")}>
              {tr("createRoom")}
            </button>
            <button id="btn-join-room" className="btn btn-secondary btn-full btn-lg" onClick={() => setMode("join")}>
              {tr("joinRoom")}
            </button>
            <p className="text-xs text-muted text-center">
              {tr("tagline")}
            </p>
          </div>
        ) : (
          /* Name + Room Setup */
          <div className="card animate-scale-in" style={{ width: "100%", maxWidth: 380 }}>
            <div className="stack stack-md">
              <div>
                <h3>{mode === "create" ? tr("createTitle") : tr("joinTitle")}</h3>
                <p className="text-sm text-muted mt-sm">{tr("chooseName")}</p>
              </div>

              {/* Preset Names */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                {PRESET_NAMES.map((name) => (
                  <button
                    key={name}
                    id={`btn-name-${name.toLowerCase()}`}
                    className="btn btn-secondary btn-sm"
                    style={playerName === name && !customName ? {
                      background: "rgba(124,58,237,0.2)",
                      borderColor: "var(--accent-purple)",
                      color: "white"
                    } : {}}
                    onClick={() => { setPlayerName(name); setCustomName(""); setError(""); }}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <div className="row gap-sm" style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
                {tr("orTypeName")}
                <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
              </div>

              <input
                id="input-custom-name"
                className="input"
                placeholder={tr("yourName")}
                value={customName}
                onChange={(e) => { setCustomName(e.target.value); setPlayerName(""); setError(""); }}
                maxLength={20}
              />

              {/* Avatar picker */}
              <div>
                <p className="text-xs text-muted mb-sm">{tr("chooseAvatar")}</p>
                <div className="avatar-grid">
                  {AVATARS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      className={`avatar-option ${avatar === a ? "selected" : ""}`}
                      onClick={() => setAvatar(a)}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {mode === "join" && (
                <input
                  id="input-room-code"
                  className="input"
                  placeholder={tr("roomCodePlaceholder")}
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  maxLength={4}
                  inputMode="numeric"
                  style={{ textAlign: "center", fontSize: "1.5rem", fontFamily: "var(--font-mono)", letterSpacing: "4px", fontWeight: 700 }}
                />
              )}

              {error && (
                <div style={{ padding: "0.625rem 0.875rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "var(--radius-md)", fontSize: "0.85rem", color: "var(--accent-red)" }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                id="btn-proceed"
                className="btn btn-primary btn-full"
                onClick={() => handleProceed(mode)}
                disabled={loading}
              >
                {mode === "create" ? tr("createRoomGo") : tr("joinRoomGo")}
              </button>

              <button className="btn btn-secondary btn-sm" onClick={() => { setMode(null); setError(""); }}>
                {tr("back")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
