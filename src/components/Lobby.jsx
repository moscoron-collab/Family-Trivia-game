import React, { useState, useEffect, useRef } from "react";
import { generateQuestions, TOPICS } from "../services/questionService";
import {
  sendChatMessage,
  voteTopics,
  voteDifficulty,
  computeMajorityDifficulty,
  computeTopTopics,
} from "../firebase/room";

const MAX_TOPICS = 4;
const DIFFICULTY_OPTIONS = [
  { id: "easy", label: "Easy", emoji: "😊", desc: "Ages 6-10" },
  { id: "medium", label: "Medium", emoji: "🤔", desc: "Ages 11-16" },
  { id: "hard", label: "Hard", emoji: "🔥", desc: "Adult level" },
];

export default function Lobby({ room, code, player, onStartGame }) {
  const [myTopics, setMyTopics] = useState([]);
  const [myDifficulty, setMyDifficulty] = useState(null);
  const [chatMsg, setChatMsg] = useState("");
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");
  const [diffCountdown, setDiffCountdown] = useState(null);
  const chatEndRef = useRef(null);
  const diffTimerRef = useRef(null);

  const players = Object.values(room.players || {}).filter((p) => p.status !== "quit");
  const chat = Object.values(room.chat || {}).sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  const topicVotes = room.settings?.topicVotes || {};
  const diffVotes = room.settings?.difficultyVotes || {};

  const computedTopics = computeTopTopics(topicVotes);
  const computedDifficulty = computeMajorityDifficulty(diffVotes);

  const allVotedDiff = players.length > 0 && players.every((p) => diffVotes[p.uid]);
  const hasEnoughSetup = computedTopics.length > 0 && (computedDifficulty || allVotedDiff);

  // Auto-select medium after 90s if not all voted
  useEffect(() => {
    if (players.length >= 2 && !allVotedDiff && myDifficulty) {
      const timer = setTimeout(() => {}, 90000);
      return () => clearTimeout(timer);
    }
  }, [allVotedDiff, players.length, myDifficulty]);

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
      setError("Please select at least one topic first!");
      return;
    }

    const finalDifficulty = computedDifficulty || myDifficulty || "medium";
    setStarting(true);

    try {
      const questions = await generateQuestions(finalTopics, finalDifficulty, 20);
      console.log(`✅ Generated ${questions.length} questions. First:`, questions[0]?.question);
      if (questions.length === 0) {
        setError("No questions generated. Please try again.");
        setStarting(false);
        return;
      }
      await onStartGame(questions, finalDifficulty, finalTopics);
    } catch (err) {
      console.error("Start game error:", err);
      setError(`Error: ${err.message}. Please try again.`);
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

  return (
    <div className="app-container">
      <div className="bg-glow" />
      <div className="page animate-fade-in" style={{ zIndex: 1, position: "relative", paddingTop: "1rem" }}>

        {/* Header */}
        <div className="row row-between mb-md">
          <div>
            <h3 className="text-gradient">Family Trivia Battle</h3>
            <p className="text-xs text-muted">Lobby • Waiting to start</p>
          </div>
          <div className="room-code" style={{ padding: "0.5rem 1rem" }}>
            <div>
              <div className="room-code-label">Room</div>
              <div className="room-code-value" style={{ fontSize: "1.25rem" }}>{code}</div>
            </div>
          </div>
        </div>

        {/* Players in room */}
        <div className="card mb-md">
          <div className="row row-between mb-sm">
            <h4>Players ({players.length}/10)</h4>
            <span className="badge badge-green">● Live</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {players.map((p) => (
              <div key={p.uid} className="player-chip" style={{ borderColor: p.uid === player.uid ? p.color : undefined }}>
                <div className="player-avatar" style={{ background: p.color + "30", color: p.color }}>
                  {p.name[0].toUpperCase()}
                </div>
                <span style={{ color: p.uid === player.uid ? p.color : "var(--text-primary)" }}>
                  {p.name} {p.uid === player.uid ? "(you)" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="mb-md">
          <h4 className="mb-sm">💬 Room Chat</h4>
          <div className="chat-container">
            <div className="chat-messages">
              {chat.length === 0 && (
                <p className="text-xs text-muted text-center" style={{ marginTop: "0.5rem" }}>
                  Chat about topics, difficulty, or just say hi! 👋
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
                placeholder="Type a message..."
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                maxLength={100}
              />
              <button id="btn-send-chat" type="submit" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>Send</button>
            </form>
          </div>
        </div>

        {/* Topic Selection */}
        <div className="mb-md">
          <div className="row row-between mb-sm">
            <h4>📚 Topics (pick up to 4)</h4>
            <button id="btn-pick-all" className="btn btn-secondary btn-sm" onClick={handlePickAll}>Pick All</button>
          </div>

          {/* Top voted topics display */}
          {computedTopics.length > 0 && (
            <div className="mb-sm" style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {computedTopics.map((tid) => {
                const t = TOPICS.find((x) => x.id === tid);
                return t ? (
                  <span key={tid} className="badge badge-purple">{t.emoji} {t.label.replace(/^[^\s]+ /, "")}</span>
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
                  <span className="topic-label">{topic.label.replace(/^[^\s]+ /, "")}</span>
                  {voteCount > 0 && (
                    <span className="badge badge-purple" style={{ marginTop: "0.25rem", fontSize: "0.6rem" }}>
                      {voteCount} vote{voteCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted mt-sm">
            You selected: {myTopics.length}/4 topics
          </p>
        </div>

        {/* Difficulty */}
        <div className="mb-md">
          <h4 className="mb-sm">⚡ Difficulty</h4>

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
                <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>{d.label}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{d.desc}</div>
                {diffVoteCounts[d.id] > 0 && (
                  <div className="badge badge-yellow mt-sm" style={{ margin: "0.25rem auto 0", fontSize: "0.6rem" }}>
                    {diffVoteCounts[d.id]} vote{diffVoteCounts[d.id] > 1 ? "s" : ""}
                  </div>
                )}
              </button>
            ))}
          </div>

          {computedDifficulty && (
            <p className="text-xs text-muted mt-sm">
              Room vote: <strong style={{ color: "var(--accent-yellow)" }}>{computedDifficulty}</strong>
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
          {starting ? "⏳ Generating questions..." : "🚀 Start Game!"}
        </button>

        <p className="text-xs text-muted text-center mb-lg">
          Any player can start the game once topics and difficulty are selected.
        </p>
      </div>
    </div>
  );
}

function DifficultyCountdown({ seconds, computedDiff }) {
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
        {remaining > 0 ? `Auto-selects Medium in ${remaining}s if no agreement` : "Defaulting to Medium..."}
      </p>
    </div>
  );
}
