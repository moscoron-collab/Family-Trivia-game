import React, { useState, useEffect, useRef } from "react";
import { useLang, useT } from "../i18n.jsx";
import { topicLabelById } from "../services/questionService";
import { recordGameResult } from "../firebase/room";
import StatsTable from "./StatsTable";

const FIREWORK_COLORS = ["#7c3aed", "#3b82f6", "#06b6d4", "#ec4899", "#f97316", "#22c55e", "#eab308", "#ef4444"];

// Firebase may hand arrays back as objects — normalize to an ordered array.
function toArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return Object.keys(val).sort((a, b) => Number(a) - Number(b)).map((k) => val[k]);
}

function getTopicStats(answers, questions, lang) {
  const topicMap = {};
  Object.entries(answers || {}).forEach(([idx, ans]) => {
    const q = questions[parseInt(idx)];
    const tid = (q && q.topicId) || ans.topicId || "unknown";
    if (!topicMap[tid]) topicMap[tid] = { tid, correct: 0, total: 0 };
    topicMap[tid].total++;
    if (ans.isCorrect) topicMap[tid].correct++;
  });
  return Object.values(topicMap).map((t) => ({
    ...t,
    label: topicLabelById(t.tid, lang),
    pct: t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0,
  })).sort((a, b) => b.pct - a.pct);
}

// Longest run of consecutive correct answers (computed at the end).
function longestStreak(answers) {
  const entries = Object.entries(answers || {}).sort((a, b) => Number(a[0]) - Number(b[0]));
  let best = 0, cur = 0;
  for (const [, a] of entries) {
    if (a.isCorrect) { cur++; best = Math.max(best, cur); } else { cur = 0; }
  }
  return best;
}

// Animated number that counts up to `value`.
function CountUp({ value, duration = 900 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.round((value || 0) * (1 - Math.pow(1 - p, 3)))); // easeOutCubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <>{n}</>;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Convert a data URL to a File synchronously (keeps the user-gesture alive for
// navigator.share on iOS — async toBlob can drop the gesture token there).
function dataURLtoFile(dataUrl, name) {
  const [head, b64] = dataUrl.split(",");
  const mime = (head.match(/:(.*?);/) || [])[1] || "image/png";
  const bin = atob(b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return new File([u8], name, { type: mime });
}

const RANK_EMOJIS = ["🥇", "🥈", "🥉"];

export default function ResultsScreen({ room, code, player, onPlayAgain, onResetRoom }) {
  const tr = useT();
  const { lang } = useLang();
  const [showReview, setShowReview] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [playAgainVoted, setPlayAgainVoted] = useState(false);
  const [myVote, setMyVote] = useState(null);
  const [playAgainCountdown, setPlayAgainCountdown] = useState(20);
  const [showFireworks, setShowFireworks] = useState(true);
  const fireworksRef = useRef(null);

  const players = Object.values(room.players || {}).filter((p) => p.status !== "quit" || p.score > 0);
  const sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
  const winner = sortedPlayers[0];
  const questions = toArray(room.questions);
  const myData = room.players?.[player.uid];
  const myAnswers = myData?.answers || {};
  const isWinner = winner?.uid === player.uid;
  const myTopicStats = getTopicStats(myAnswers, questions, lang);
  const myStreak = longestStreak(myAnswers);

  // Build a shareable result card (PNG) and share it via the OS share sheet,
  // falling back to a download where Web Share with files isn't supported.
  const handleShare = () => {
    const W = 540, H = 675, scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = W * scale;
    canvas.height = H * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#1a1033");
    g.addColorStop(1, "#0a0a16");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "rgba(124,58,237,0.22)";
    ctx.beginPath();
    ctx.arc(W / 2, 110, 210, 0, Math.PI * 2);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.fillStyle = "#a78bfa";
    ctx.font = "700 22px system-ui, -apple-system, sans-serif";
    ctx.fillText("🏆 " + tr("shareCardTitle"), W / 2, 48);

    ctx.font = "78px system-ui, sans-serif";
    ctx.fillText(winner?.avatar || "🏆", W / 2, 168);

    ctx.fillStyle = "#eab308";
    ctx.font = "700 15px system-ui, sans-serif";
    ctx.fillText(tr("shareWinnerLabel"), W / 2, 205);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 38px system-ui, sans-serif";
    ctx.fillText(winner?.name || "", W / 2, 250);

    ctx.fillStyle = "#22d3ee";
    ctx.font = "900 54px ui-monospace, monospace";
    ctx.fillText(String(winner?.score || 0), W / 2, 318);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "600 17px system-ui, sans-serif";
    ctx.fillText(tr("sharePoints"), W / 2, 344);

    let y = 408;
    sortedPlayers.slice(0, 5).forEach((p, i) => {
      const medal = RANK_EMOJIS[i] || `#${i + 1}`;
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      roundRect(ctx, 56, y - 27, W - 112, 42, 12);
      ctx.fill();
      ctx.textAlign = "left";
      ctx.fillStyle = "#ffffff";
      ctx.font = "600 21px system-ui, sans-serif";
      ctx.fillText(`${medal}  ${p.avatar || "•"}  ${p.name}`, 78, y + 1);
      ctx.textAlign = "right";
      ctx.fillStyle = "#22d3ee";
      ctx.font = "700 21px ui-monospace, monospace";
      ctx.fillText(String(p.score || 0), W - 78, y + 1);
      y += 52;
    });

    ctx.textAlign = "center";
    ctx.fillStyle = "#64748b";
    ctx.font = "600 15px system-ui, sans-serif";
    ctx.fillText(window.location.origin.replace(/^https?:\/\//, ""), W / 2, H - 26);

    const dataUrl = canvas.toDataURL("image/png");
    const file = dataURLtoFile(dataUrl, "family-trivia-result.png");
    const text = tr("shareWonText", { name: winner?.name || "" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: tr("shareCardTitle"), text }).catch(() => {});
    } else {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "family-trivia-result.png";
      a.click();
    }
  };
  const playAgainVotes = room.playAgainVotes || {};
  const activeForVote = Object.values(room.players || {}).filter((p) => p.status !== "quit");
  const otherWaiting = activeForVote.filter(
    (p) => p.uid !== player.uid && !playAgainVotes[p.uid]
  ).length;

  // Fireworks
  useEffect(() => {
    if (!isWinner || !showFireworks) return;
    const container = fireworksRef.current;
    if (!container) return;

    let animFrame;
    const createFirework = () => {
      const el = document.createElement("div");
      el.className = "firework";
      const size = 20 + Math.random() * 60;
      el.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%; top: ${Math.random() * 70}%;
        background: ${FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]};
        opacity: 0.8;
        box-shadow: 0 0 ${size}px ${FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]};
      `;
      container.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    };

    const interval = setInterval(createFirework, 150);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setShowFireworks(false);
    }, 5000);

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [isWinner]);

  // Play again countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayAgainCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check if all voted and reset
  useEffect(() => {
    const activePlayers = Object.values(room.players || {}).filter((p) => p.status !== "quit");
    const allVoted = activePlayers.every((p) => playAgainVotes[p.uid]);
    const anyJoin = Object.values(playAgainVotes).some((v) => v === "join");
    if (allVoted && anyJoin) {
      onResetRoom();
    }
  }, [playAgainVotes]);

  // Don't get stuck waiting: if you chose to play again, start the new round
  // automatically once the countdown ends (even if others never respond).
  useEffect(() => {
    if (playAgainCountdown === 0 && myVote === "join") {
      onResetRoom();
    }
  }, [playAgainCountdown, myVote]);

  // Record this game into the player's all-time stats (once per game).
  useEffect(() => {
    if (!myData) return;
    const key = `statsRecorded:${code}:${room.gameStartedAt || ""}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {}
    recordGameResult(player.uid, {
      score: myData.score || 0,
      isWin: isWinner,
      difficulty: room.settings?.difficulty,
      answers: myData.answers || {},
      qids: questions.map((q) => q && q.qid).filter(Boolean),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayAgain = async (vote) => {
    setPlayAgainVoted(true);
    setMyVote(vote);
    await onPlayAgain(vote);
  };

  return (
    <div className="app-container" style={{ overflowY: "auto" }}>
      {showFireworks && isWinner && <div className="fireworks-container" ref={fireworksRef} />}
      <div className="bg-glow" />
      <div className="page animate-slide-up" style={{ zIndex: 1, position: "relative", paddingTop: "1rem" }}>

        {/* Winner Banner */}
        <div className="card text-center mb-md" style={{
          background: "linear-gradient(135deg, rgba(234,179,8,0.15), rgba(124,58,237,0.1))",
          border: "1px solid rgba(234,179,8,0.4)",
        }}>
          <div style={{ fontSize: "2.5rem" }}>🏆</div>
          <div className="text-gold" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginTop: "0.25rem" }}>
            {tr("winner")}
          </div>
          <h2 style={{ color: "var(--accent-yellow)", marginTop: "0.25rem" }}>{winner?.avatar ? `${winner.avatar} ` : ""}{winner?.name}</h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "2rem", fontWeight: 900, color: "var(--text-primary)", marginTop: "0.25rem" }}>
            <CountUp value={winner?.score || 0} /> {tr("pts")}
          </p>
          {isWinner && (
            <div className="badge badge-yellow" style={{ margin: "0.5rem auto 0" }}>{tr("thatsYou")}</div>
          )}
        </div>

        {/* Leaderboard */}
        <h4 className="mb-sm">{tr("leaderboard")}</h4>
        <div className="leaderboard mb-md">
          {sortedPlayers.map((p, i) => (
            <div key={p.uid} className={`leaderboard-item rank-${i + 1}`}>
              <span className="rank-badge">{RANK_EMOJIS[i] || `#${i + 1}`}</span>
              <div className="player-avatar" style={{ background: (p.color || "#7c3aed") + "30", color: p.color || "#7c3aed" }}>
                {p.avatar || p.name[0].toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  {p.name} {p.uid === player.uid ? <span className="badge badge-purple" style={{ fontSize: "0.6rem" }}>you</span> : ""}
                </div>
                <div className="text-xs text-muted">
                  {p.status === "quit" ? tr("leftEarly") : tr("correctCount", { n: Object.values(p.answers || {}).filter((a) => a.isCorrect).length, total: questions.length })}
                </div>
              </div>
              <span className="leaderboard-score"><CountUp value={p.score || 0} /></span>
            </div>
          ))}
        </div>

        {/* Share result */}
        <button id="btn-share" className="btn btn-secondary btn-full mb-md" onClick={handleShare}>
          {tr("shareResult")}
        </button>

        {/* My Topic Stats */}
        {myTopicStats.length > 0 && (
          <div className="card mb-md">
            <h4 className="mb-sm">{tr("topicPerf")}</h4>
            <div className="topic-strength-bar stack stack-sm">
              {myTopicStats.map((t) => (
                <div key={t.label} className="topic-strength-row">
                  <span className="topic-strength-label">{t.label}</span>
                  <div className="topic-bar-bg">
                    <div
                      className={`topic-bar-fill ${t.pct >= 70 ? "strong" : t.pct >= 40 ? "medium" : "weak"}`}
                      style={{ width: `${t.pct}%` }}
                    />
                  </div>
                  <span className={`topic-bar-pct ${t.pct >= 70 ? "text-green" : t.pct >= 40 ? "text-yellow" : "text-red"}`}>
                    {t.pct}%
                  </span>
                </div>
              ))}
            </div>
            <div className="row gap-sm mt-md" style={{ flexWrap: "wrap" }}>
              {myStreak > 1 && <span className="badge badge-yellow">{tr("bestStreak", { n: myStreak })}</span>}
              {myTopicStats[0] && <span className="badge badge-green">{tr("strong", { t: myTopicStats[0].label })}</span>}
              {myTopicStats[myTopicStats.length - 1] && myTopicStats.length > 1 && (
                <span className="badge badge-red">{tr("weak", { t: myTopicStats[myTopicStats.length - 1].label })}</span>
              )}
            </div>
          </div>
        )}

        {/* Answer Review Toggle */}
        <button
          id="btn-toggle-review"
          className="btn btn-secondary btn-full mb-md"
          onClick={() => setShowReview((r) => !r)}
        >
          {showReview ? tr("hideReview") : tr("showReview")}
        </button>

        {showReview && (
          <div className="mb-md animate-fade-in">
            {questions.map((q, idx) => {
              const myAns = myAnswers[idx];
              const isCorrect = myAns?.isCorrect;
              const didAnswer = myAns !== undefined && myAns.answerIndex !== -1;
              const locQ = q[lang] || q.en || q;
              const ans = toArray(locQ.answers);
              return (
                <div key={idx} className={`review-item ${isCorrect ? "correct-review" : "wrong-review"}`}>
                  <div className="review-question">
                    <span className={`badge ${isCorrect ? "badge-green" : "badge-red"}`} style={{ marginRight: "0.375rem" }}>
                      {isCorrect ? "✓" : "✗"}
                    </span>
                    {locQ.question}
                  </div>
                  {didAnswer && (
                    <div className="review-your-answer text-muted">
                      {tr("yourAnswer")} <strong style={{ color: isCorrect ? "var(--accent-green)" : "var(--accent-red)" }}>
                        {ans[myAns.answerIndex]}
                      </strong>
                    </div>
                  )}
                  {!isCorrect && (
                    <div className="review-correct-answer">
                      {tr("correctAnswer")} {ans[q.correctIndex]}
                    </div>
                  )}
                  {locQ.explanation && (
                    <div className="review-explanation">💡 {locQ.explanation}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* All-time stats */}
        <button
          id="btn-toggle-stats"
          className="btn btn-secondary btn-full mb-md"
          onClick={() => setShowStats((v) => !v)}
        >
          {showStats ? tr("hideStats") : tr("showStats")}
        </button>
        {showStats && (
          <div className="card mb-md animate-fade-in">
            <h4 className="mb-md">{tr("statsTitle")}</h4>
            <StatsTable uid={player.uid} />
          </div>
        )}

        {/* Play Again */}
        <div className="card mb-lg" style={{ textAlign: "center" }}>
          <h3 className="mb-sm">{tr("playAgain")}</h3>
          {!playAgainVoted ? (
            <>
              <p className="text-sm text-muted mb-md">
                {tr("playAgainSub")}
              </p>
              <div className="stack stack-sm">
                <button id="btn-play-again-join" className="btn btn-primary btn-full" onClick={() => handlePlayAgain("join")}>
                  {tr("imIn")}
                </button>
                <button id="btn-play-again-leave" className="btn btn-secondary btn-full" onClick={() => handlePlayAgain("leave")}>
                  {tr("imDone")}
                </button>
              </div>
            </>
          ) : myVote === "leave" ? (
            <p className="text-secondary">{tr("thanksPlaying")}</p>
          ) : (
            <>
              <p className="text-secondary mb-md">
                {tr("youreIn")}{otherWaiting > 0 ? tr("waitingOthers", { n: otherWaiting, s: otherWaiting > 1 ? "s" : "" }) : tr("starting")}
              </p>
              <button id="btn-start-now" className="btn btn-primary btn-full" onClick={onResetRoom}>
                {tr("startNow")}
              </button>
              <p className="text-xs text-muted mt-sm">
                {tr("autoRound", { n: playAgainCountdown })}
              </p>
            </>
          )}

          {/* Vote status */}
          {Object.keys(playAgainVotes).length > 0 && (
            <div className="stack stack-sm mt-md">
              {Object.entries(playAgainVotes).map(([uid, vote]) => {
                const p = room.players?.[uid];
                if (!p) return null;
                return (
                  <div key={uid} className="row gap-sm" style={{ fontSize: "0.8rem" }}>
                    <span style={{ color: p.color }}>{p.name}:</span>
                    <span className={vote === "join" ? "text-green" : "text-red"}>
                      {vote === "join" ? tr("playingAgain") : tr("leaving")}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
