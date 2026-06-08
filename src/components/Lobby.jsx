import React, { useState, useEffect, useRef } from "react";
import { generateQuestions, TOPICS, topicName } from "../services/questionService";
import {
  sendChatMessage,
  voteTopics,
  voteDifficulty,
  computeMajorityDifficulty,
  computeTopTopics,
  getSeenUnion,
} from "../firebase/room";
import { useLang, useT } from "../i18n.jsx";
import LanguageToggle from "./LanguageToggle";
import StatsTable from "./StatsTable";

const MAX_TOPICS = 4;
const DIFFICULTY_OPTIONS = [
  { id: "easy", emoji: "😊" },
  { id: "medium", emoji: "🤔" },
  { id: "hard", emoji: "🔥" },
];
const DIFF_LABEL_KEY = { easy: "diffEasy", medium: "diffMedium", hard: "diffHard" };
const DIFF_DESC_KEY = { easy: "diffEasyDesc", medium: "diffMediumDesc", hard: "diffHardDesc" };

export default function Lobby({ room, code, player, onStartGame }) {
  const { lang } = useLang();
  const tr = useT();
  const [myTopics, setMyTopics] = useState([]);
  const [myDifficulty, setMyDifficulty] = useState(null);
  const [chatMsg, setChatMsg] = useState("");
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");
  const [showStats, setShowStats] = useState(false);
  const chatEndRef = useRef(null);

  const players = Object.values(room.players || {}).filter((p) => p.status !== "quit");
  const chat = Object.values(room.chat || {}).sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  const topicVotes = room.settings?.topicVotes || {};
  const diffVotes = room.settings?.difficultyVotes || {};

  const computedTopics = computeTopTopics(topicVotes);
  const computedDifficulty = computeMajorityDifficulty(diffVotes);

  const allVotedDiff = players.length > 0 && players.every((p) => diffVotes[p.uid]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.length]);

  const handleTopicToggle = async (topicId) => {
    if (topicId === "random") {
      const newTopics = ["random"];
      setMyTopics(newTopics);
      await voteTopics(code, player.uid, newTopics);
      return;
    }
    let updated;
    if (myTopics.includes(topicId)) {
      updated = myTopics.filter((t) => t !== topicId);
    } else {
      if (myTopics.length >= MAX_TOPICS) return;
      updated = [...myTopics.filter((t) => t !== "random"), topicId];
    }
    setMyTopics(updated);
    await voteTopics(code, player.uid, updated);
  };

  const handlePickAll = async () => {
    const allIds = TOPICS.filter((t) => t.id !== "random").map((t) => t.id).slice(0, MAX_TOPICS);
    setMyTopics(allIds);
    await voteTopics(code, player.uid, allIds);
  };

  const handleDifficultyVote = async (diff) => {
    setMyDifficulty(diff);
    await voteDifficulty(code, player.uid, diff);
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatMsg.trim()) return;
    await sendChatMessage(code, player, chatMsg.trim());
    setChatMsg("");
  };

  const handleStartGame = async () => {
    if (starting) return;
    setError("");

    const finalTopics = computedTopics.length > 0 ? computedTopics : myTopics;
    if (finalTopics.length === 0) {
      setError(tr("errPickTopic"));
      return;
    }

    const finalDifficulty = computedDifficulty || myDifficulty || "medium";
    setStarting(true);

    try {
      // Skip questions everyone in the room has already seen (until exhausted).
      let excludeQids = new Set();
      try { excludeQids = await getSeenUnion(players.map((p) => p.uid)); } catch {}
      const questions = await generateQuestions(finalTopics, finalDifficulty, 20, excludeQids);
      if (questions.length === 0) {
        setError(tr("errNoQuestions"));
        setStarting(false);
        return;
      }
      await onStartGame(questions, finalDifficulty, finalTopics);
    } catch (err) {
      console.error("Start game error:", err);
      setError(`${err.message}`);
      setStarting(false);
    }
  };

  // Topic vote counts
  const topicVoteCounts = {};
  Object.values(topicVotes).forEach((tList) => {
    (tList || []).forEach((tid) => {
      topicVoteCounts[tid] = (topicVoteCounts[tid] || 0) + 1;
    });
  });

  const diffVoteCounts = { easy: 0, medium: 0, hard: 0 };
  Object.values(diffVotes).forEach((d) => { if (diffVoteCounts[d] !== undefined) diffVoteCounts[d]++; });

  const voteWord = (n) => (n > 1 ? tr("votes") : tr("vote"));

  return (
    <div className="app-container">
      <div className="bg-glow" />
      <div className="page animate-fade-in" style={{ zIndex: 1, position: "relative", paddingTop: "1rem" }}>

        {/* Header */}
        <div className="row row-between mb-md">
          <div>
            <h3 className="text-gradient">{tr("lobbyTitle")}</h3>
            <p className="text-xs text-muted">{tr("lobbySubtitle")}</p>
          </div>
          <div className="row gap-sm">
            <button className="btn btn-secondary btn-sm" onClick={() => setShowStats(true)} title="stats">📊</button>
            <LanguageToggle />
            <div className="room-code" style={{ padding: "0.5rem 1rem" }}>
              <div>
                <div className="room-code-label">{tr("room")}</div>
                <div className="room-code-value" style={{ fontSize: "1.25rem" }}>{code}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Players in room */}
        <div className="card mb-md">
          <div className="row row-between mb-sm">
            <h4>{tr("players")} ({players.length}/10)</h4>
            <span className="badge badge-green">{tr("live")}</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {players.map((p) => (
              <div key={p.uid} className="player-chip" style={{ borderColor: p.uid === player.uid ? p.color : undefined }}>
                <div className="player-avatar" style={{ background: p.color + "30", color: p.color }}>
                  {p.avatar || p.name[0].toUpperCase()}
                </div>
                <span style={{ color: p.uid === player.uid ? p.color : "var(--text-primary)" }}>
                  {p.name} {p.uid === player.uid ? tr("you") : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="mb-md">
          <h4 className="mb-sm">{tr("roomChat")}</h4>
          <div className="chat-container">
            <div className="chat-messages">
              {chat.length === 0 && (
                <p className="text-xs text-muted text-center" style={{ marginTop: "0.5rem" }}>
                  {tr("chatEmpty")}
                </p>
              )}
              {chat.map((msg, i) => (
                <div key={i} className="chat-message">
                  <span className="chat-message-name" style={{ color: players.find((p) => p.uid === msg.uid)?.color || "var(--accent-purple-light)" }}>
                    {msg.name}:
                  </span>
                  <span>{msg.message}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendChat} className="chat-input-row">
              <input
                id="chat-input"
                className="chat-input"
                placeholder={tr("typeMessage")}
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                maxLength={100}
              />
              <button id="btn-send-chat" type="submit" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>{tr("send")}</button>
            </form>
          </div>
        </div>

        {/* Topic Selection */}
        <div className="mb-md">
          <div className="row row-between mb-sm">
            <h4>{tr("topicsTitle")}</h4>
            <button id="btn-pick-all" className="btn btn-secondary btn-sm" onClick={handlePickAll}>{tr("pickAll")}</button>
          </div>

          {/* Top voted topics display */}
          {computedTopics.length > 0 && (
            <div className="mb-sm" style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {computedTopics.map((tid) => {
                const t = TOPICS.find((x) => x.id === tid);
                return t ? (
                  <span key={tid} className="badge badge-purple">{t.emoji} {topicName(t, lang)}</span>
                ) : null;
              })}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
            {TOPICS.map((topic) => {
              const isSelected = myTopics.includes(topic.id);
              const isDisabled = !isSelected && myTopics.length >= MAX_TOPICS && !myTopics.includes("random");
              const voteCount = topicVoteCounts[topic.id] || 0;
              return (
                <div
                  key={topic.id}
                  id={`topic-${topic.id}`}
                  className={`topic-card ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                  onClick={() => !isDisabled && handleTopicToggle(topic.id)}
                >
                  <span className="topic-emoji">{topic.emoji}</span>
                  <span className="topic-label">{topicName(topic, lang)}</span>
                  {voteCount > 0 && (
                    <span className="badge badge-purple" style={{ marginTop: "0.25rem", fontSize: "0.6rem" }}>
                      {voteCount} {voteWord(voteCount)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted mt-sm">
            {tr("youSelected", { n: myTopics.length })}
          </p>
        </div>

        {/* Difficulty */}
        <div className="mb-md">
          <h4 className="mb-sm">{tr("difficulty")}</h4>

          {players.length === 2 && !allVotedDiff && (
            <div className="hourglass-container mb-sm">
              <DifficultyCountdown seconds={90} computedDiff={computedDifficulty} />
            </div>
          )}

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {DIFFICULTY_OPTIONS.map((d) => (
              <button
                key={d.id}
                id={`btn-diff-${d.id}`}
                className={`difficulty-option ${myDifficulty === d.id ? `selected-${d.id}` : ""}`}
                onClick={() => handleDifficultyVote(d.id)}
              >
                <div style={{ fontSize: "1.25rem" }}>{d.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>{tr(DIFF_LABEL_KEY[d.id])}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{tr(DIFF_DESC_KEY[d.id])}</div>
                {diffVoteCounts[d.id] > 0 && (
                  <div className="badge badge-yellow mt-sm" style={{ margin: "0.25rem auto 0", fontSize: "0.6rem" }}>
                    {diffVoteCounts[d.id]} {voteWord(diffVoteCounts[d.id])}
                  </div>
                )}
              </button>
            ))}
          </div>

          {computedDifficulty && (
            <p className="text-xs text-muted mt-sm">
              {tr("roomVote", { v: tr(DIFF_LABEL_KEY[computedDifficulty]) })}
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: "0.625rem 0.875rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "var(--radius-md)", fontSize: "0.85rem", color: "var(--accent-red)", marginBottom: "0.875rem" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Start Button */}
        <button
          id="btn-start-game"
          className="btn btn-primary btn-full btn-lg"
          onClick={handleStartGame}
          disabled={starting || (myTopics.length === 0 && computedTopics.length === 0)}
          style={{ marginBottom: "2rem" }}
        >
          {starting ? tr("generating") : tr("startGame")}
        </button>

        <p className="text-xs text-muted text-center mb-lg">
          {tr("anyoneStart")}
        </p>
      </div>

      {showStats && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
          onClick={() => setShowStats(false)}
        >
          <div
            className="card animate-scale-in"
            style={{ maxWidth: 420, width: "100%", maxHeight: "85vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="row row-between mb-md">
              <h3>{tr("statsTitle")}</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowStats(false)}>{tr("close")}</button>
            </div>
            <StatsTable uid={player.uid} />
          </div>
        </div>
      )}
    </div>
  );
}

function DifficultyCountdown({ seconds, computedDiff }) {
  const tr = useT();
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    if (computedDiff) return;
    const interval = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [computedDiff]);

  if (computedDiff) return null;

  return (
    <div style={{ textAlign: "center", padding: "0.5rem", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: "var(--radius-lg)" }}>
      <div className="hourglass">⏳</div>
      <div className="hourglass-time">{remaining}s</div>
      <p className="text-xs text-muted">
        {remaining > 0 ? tr("autoMedium", { n: remaining }) : tr("autoMediumNow")}
      </p>
    </div>
  );
}
