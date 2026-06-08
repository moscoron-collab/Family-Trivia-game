import React, { useState, useEffect, useRef, useCallback } from "react";
import { sounds } from "../services/sounds";
import { useLang, useT } from "../i18n.jsx";
import { topicLabelById } from "../services/questionService";
import { sendReaction } from "../firebase/room";

const QUESTION_TIME = 15; // seconds
const DIFF_LABEL_KEY = { easy: "diffEasy", medium: "diffMedium", hard: "diffHard" };
const REACTION_EMOJIS = ["😂", "🔥", "👏", "😱", "❤️", "🎉"];
const vibrate = (ms) => { try { navigator.vibrate && navigator.vibrate(ms); } catch {} };

export default function GameScreen({ room, code, player, myData, onSubmitAnswer, onFinish, onQuit }) {
  const tr = useT();
  const { lang } = useLang();
  // Firebase RTDB may return arrays as objects — normalize both questions and answers
  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return Object.keys(val).sort((a, b) => Number(a) - Number(b)).map(k => val[k]);
  };

  // Questions are stored bilingually; pick the current player's language.
  const questions = toArray(room.questions);

  const currentIndex = myData?.questionIndex || 0;
  const isFinished = myData?.status === "finished";
  const isQuit = myData?.status === "quit";

  // Client-side countdown overlay (10 seconds after game starts)
  const [countdownLeft, setCountdownLeft] = useState(() => {
    const startedAt = room.gameStartedAt;
    if (!startedAt) return 0;
    const elapsed = Date.now() - startedAt;
    return Math.max(0, 10 - Math.floor(elapsed / 1000));
  });

  useEffect(() => {
    if (countdownLeft <= 0) return;
    const t = setTimeout(() => setCountdownLeft(c => Math.max(0, c - 1)), 1000);
    return () => clearTimeout(t);
  }, [countdownLeft]);

  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const finishedRef = useRef(false);

  const players = Object.values(room.players || {});
  const activePlayers = players.filter((p) => p.status !== "quit");
  const currentQuestion = questions[currentIndex];
  // Localized view of the current question (text + answers in the player's language)
  const loc = currentQuestion ? (currentQuestion[lang] || currentQuestion.en) : null;
  const locAnswers = toArray(loc?.answers);

  // questionKey drives the timer — increments each time we're ready for a new question
  const [questionKey, setQuestionKey] = useState(0);

  const handleAnswer = useCallback(async (answerIndex) => {
    if (answered || !currentQuestion) return;
    setAnswered(true);
    setSelectedAnswer(answerIndex);
    clearInterval(timerRef.current);

    // Neutral tap sound + buzz only — whether the answer was right or wrong is
    // NOT revealed during the game; all results are shown at the end.
    sounds.select();
    vibrate(10);

    const elapsed = Date.now() - startTimeRef.current;
    try {
      await onSubmitAnswer(currentIndex, answerIndex, elapsed);
    } catch (e) {
      console.error("submit answer failed", e);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setAnswered(false);
        setSelectedAnswer(null);
        setTimeLeft(QUESTION_TIME);
        setQuestionKey(k => k + 1); // ← triggers timer to restart
      }
      // Last question: finishing is handled by the effect below once we pass the end.
    }, 600);
  }, [answered, currentQuestion, currentIndex, questions.length, onSubmitAnswer]);

  // Safety net: once we've answered past the last question, finish the game
  // exactly once — so we never get stuck on a "Loading questions…" screen.
  useEffect(() => {
    if (!isFinished && questions.length > 0 && currentIndex >= questions.length && !finishedRef.current) {
      finishedRef.current = true;
      onFinish();
    }
  }, [currentIndex, questions.length, isFinished, onFinish]);

  // Keep a ref so the timer callback always calls the latest handleAnswer
  const handleAnswerRef = useRef(handleAnswer);
  useEffect(() => { handleAnswerRef.current = handleAnswer; });

  // Timer resets when questionKey changes (not on every Firebase re-render).
  // Don't run while the 10s countdown overlay is showing, otherwise the
  // question clock ticks down before the player can even see the question.
  useEffect(() => {
    if (isFinished || countdownLeft > 0) return;
    clearInterval(timerRef.current);
    setTimeLeft(QUESTION_TIME);
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 5 && t > 1) sounds.urgentTick();
        else if (t > 5) sounds.tick();
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswerRef.current(-1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [questionKey, isFinished, countdownLeft]); // (re)start the clock only when a question is actually on screen

  const timerPct = (timeLeft / QUESTION_TIME) * 100;
  const timerClass = timeLeft > 10 ? "safe" : timeLeft > 5 ? "warn" : "danger";

  const LETTERS = ["A", "B", "C", "D"];

  const throwReaction = (emoji) => {
    vibrate(8);
    sendReaction(code, player, emoji);
  };

  if (isFinished) {
    const stillPlaying = activePlayers.filter((p) => p.status === "playing");
    return (
      <div className="app-container">
        <div className="bg-glow" />
        <div className="page-center animate-fade-in" style={{ zIndex: 1, position: "relative", textAlign: "center", gap: "1.25rem" }}>
          <div style={{ fontSize: "4rem" }}>🎉</div>
          <h2 className="text-gradient">{tr("youreDone")}</h2>
          <p className="text-secondary">
            {stillPlaying.length > 0
              ? tr("waitingFor", { names: stillPlaying.map((p) => p.name).join(", ") })
              : tr("resultsComing")}
          </p>

          {stillPlaying.length > 0 && (
            <div className="card" style={{ width: "100%", maxWidth: 340 }}>
              <h4 className="mb-sm">{tr("liveStatus")}</h4>
              <LiveStatus players={players} myUid={player.uid} questions={questions} />
            </div>
          )}

          <div className="card-glass" style={{ maxWidth: 340, padding: "0.875rem 1.25rem" }}>
            <p className="text-sm text-secondary">{tr("yourScore")}</p>
            <p style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--accent-purple-light)" }}>
              {myData?.score || 0}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show countdown overlay
  if (countdownLeft > 0) {
    return (
      <div className="app-container">
        <div className="bg-glow" />
        <div className="page-center animate-fade-in" style={{ zIndex: 1, position: "relative", textAlign: "center", gap: "1.5rem" }}>
          <p style={{ fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontSize: "0.9rem", color: "var(--text-secondary)" }}>{tr("getReady")}</p>
          <h2 className="text-gradient">{tr("gameStartsIn")}</h2>
          <div className="countdown-display">{countdownLeft}</div>
          <div className="card-glass" style={{ maxWidth: 320, padding: "1rem 1.5rem" }}>
            <p className="text-sm text-secondary">{tr("pointsHint")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="app-container">
        <div className="bg-glow" />
        <div className="page-center" style={{ zIndex: 1, position: "relative", textAlign: "center", gap: "1rem" }}>
          <div style={{ fontSize: "3rem" }}>⏳</div>
          <h3>{tr("loadingQuestions")}</h3>
          <p className="text-muted text-sm">Questions: {questions.length} | Index: {currentIndex}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="bg-glow" />
      <div className="page animate-fade-in" style={{ zIndex: 1, position: "relative", paddingTop: "0.75rem" }}>

        {/* Header */}
        <div className="row row-between mb-sm">
          <div className="question-header" style={{ flex: 1 }}>
            <span className="question-progress">
              {tr("question", { n: currentIndex + 1, total: questions.length })}
            </span>
            <span className="question-topic-badge">{topicLabelById(currentQuestion.topicId, lang)}</span>
          </div>
          <button
            id="btn-quit-game"
            className="btn btn-danger btn-sm"
            style={{ marginLeft: "0.5rem" }}
            onClick={() => setShowQuitConfirm(true)}
          >
            {tr("quit")}
          </button>
        </div>

        {/* Timer */}
        <div className="row row-between mb-sm" style={{ alignItems: "center", gap: "0.625rem" }}>
          <div className="timer-bar-container" style={{ flex: 1 }}>
            <div className={`timer-bar ${timerClass}`} style={{ width: `${timerPct}%` }} />
          </div>
          <span className={`timer-countdown ${timerClass}`}>{timeLeft}s</span>
        </div>

        {/* Live Status Mini */}
        <LiveStatus players={players} myUid={player.uid} questions={questions} mini />

        {/* Score */}
        <div className="row row-between mb-md" style={{ padding: "0.5rem 0.75rem", background: "var(--bg-glass)", borderRadius: "var(--radius-md)" }}>
          <span className="text-xs text-muted">{tr("yourScore")}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--accent-purple-light)" }}>
            {myData?.score || 0} {tr("pts")}
          </span>
        </div>

        {/* Question */}
        <div className="card mb-md" style={{ background: "linear-gradient(145deg, var(--bg-card), var(--bg-secondary))" }}>
          <p className="question-text">{loc.question}</p>

          <div className="answer-grid">
            {locAnswers.map((answer, idx) => {
              // Only highlight the answer the player picked (neutral) — no
              // green/red right-or-wrong reveal here; results come at the end.
              let cls = "answer-btn";
              if (idx === selectedAnswer) cls += " selected";
              return (
                <button
                  key={idx}
                  id={`answer-${idx}`}
                  className={cls}
                  onClick={() => handleAnswer(idx)}
                  disabled={answered}
                >
                  <span className="answer-letter">{LETTERS[idx]}</span>
                  <span style={{ fontSize: "0.825rem" }}>{answer}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty badge */}
        <div className="text-center mb-md">
          <span className={`badge ${currentQuestion.difficulty === "easy" ? "badge-green" : currentQuestion.difficulty === "medium" ? "badge-yellow" : "badge-red"}`}>
            {tr("upToPts", {
              diff: tr(DIFF_LABEL_KEY[currentQuestion.difficulty] || "diffMedium"),
              n: currentQuestion.difficulty === "easy" ? 3 : currentQuestion.difficulty === "medium" ? 5 : 6,
            })}
          </span>
        </div>

        {/* Live emoji reactions */}
        <div className="reaction-bar">
          {REACTION_EMOJIS.map((e) => (
            <button key={e} type="button" className="reaction-btn" onClick={() => throwReaction(e)}>{e}</button>
          ))}
        </div>
      </div>

      <FloatingReactions reactions={room.reactions} />

      {/* Quit Confirm Modal */}
      {showQuitConfirm && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="card animate-scale-in" style={{ maxWidth: 320, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🚪</div>
            <h3 className="mb-sm">{tr("quitTitle")}</h3>
            <p className="text-sm text-muted mb-md">
              {tr("quitBody")}
            </p>
            <div className="stack stack-sm">
              <button id="btn-confirm-quit" className="btn btn-danger btn-full" onClick={onQuit}>{tr("quitYes")}</button>
              <button className="btn btn-secondary btn-full" onClick={() => setShowQuitConfirm(false)}>{tr("quitKeep")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FloatingReactions({ reactions }) {
  const now = Date.now();
  const list = Object.entries(reactions || {})
    .map(([id, r]) => ({ id, ...r }))
    .filter((r) => r && r.ts && now - r.ts < 3500);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 150, overflow: "hidden" }}>
      {list.map((r) => (
        <div key={r.id} className="reaction-float" style={{ left: `${r.x ?? 50}%` }}>
          <div className="reaction-emoji">{r.emoji}</div>
          <div className="reaction-name">{r.name}</div>
        </div>
      ))}
    </div>
  );
}

function LiveStatus({ players, myUid, questions, mini }) {
  const tr = useT();
  const total = questions.length;
  return (
    <div className={`live-status ${mini ? "mb-sm" : ""}`} style={mini ? { padding: "0.5rem 0.625rem" } : {}}>
      {players.map((p) => {
        const pct = total > 0 ? Math.round(((p.questionIndex || 0) / total) * 100) : 0;
        const statusDot = p.status === "playing" ? "playing" : p.status === "finished" ? "finished" : p.status === "quit" ? "quit" : "lobby";
        return (
          <div key={p.uid} className="live-status-player">
            <div className={`status-dot ${statusDot}`} />
            <span style={{ color: p.uid === myUid ? p.color : "var(--text-secondary)", fontWeight: p.uid === myUid ? 700 : 400 }}>
              {p.name}
            </span>
            <span className="text-xs text-muted" style={{ marginInlineStart: "auto" }}>
              {p.status === "finished" ? tr("done") : p.status === "quit" ? tr("left") : `${Math.min((p.questionIndex || 0) + 1, total)}/${total}`}
            </span>
            {!mini && (
              <div style={{ width: "40px", height: "3px", background: "var(--bg-glass)", borderRadius: "2px", overflow: "hidden", marginLeft: "0.5rem" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: "var(--accent-cyan)", borderRadius: "2px" }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
