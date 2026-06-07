import React, { useState, useEffect, useRef, useCallback } from "react";
import { sounds } from "../services/sounds";

const QUESTION_TIME = 15; // seconds

export default function GameScreen({ room, code, player, myData, onSubmitAnswer, onFinish, onQuit }) {
  // Firebase RTDB may return arrays as objects — normalize both questions and answers
  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return Object.keys(val).sort((a, b) => Number(a) - Number(b)).map(k => val[k]);
  };

  const questions = toArray(room.questions).map(q => ({
    ...q,
    answers: toArray(q?.answers),
  }));

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

  const players = Object.values(room.players || {});
  const activePlayers = players.filter((p) => p.status !== "quit");
  const currentQuestion = questions[currentIndex];

  // questionKey drives the timer — increments each time we're ready for a new question
  const [questionKey, setQuestionKey] = useState(0);

  const handleAnswer = useCallback(async (answerIndex) => {
    if (answered || !currentQuestion) return;
    setAnswered(true);
    setSelectedAnswer(answerIndex);
    clearInterval(timerRef.current);

    // Play sound
    if (answerIndex === -1) sounds.wrong();
    else if (answerIndex === currentQuestion.correctIndex) sounds.correct();
    else sounds.wrong();

    const elapsed = Date.now() - startTimeRef.current;
    await onSubmitAnswer(currentIndex, answerIndex, elapsed);

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        onFinish();
      } else {
        setAnswered(false);
        setSelectedAnswer(null);
        setTimeLeft(QUESTION_TIME);
        setQuestionKey(k => k + 1); // ← triggers timer to restart
      }
    }, 600);
  }, [answered, currentQuestion, currentIndex, questions.length, onSubmitAnswer, onFinish]);

  // Keep a ref so the timer callback always calls the latest handleAnswer
  const handleAnswerRef = useRef(handleAnswer);
  useEffect(() => { handleAnswerRef.current = handleAnswer; });

  // Timer resets when questionKey changes (not on every Firebase re-render)
  useEffect(() => {
    if (isFinished) return;
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
  }, [questionKey, isFinished]); // questionKey increments only when truly moving to next Q

  const timerPct = (timeLeft / QUESTION_TIME) * 100;
  const timerClass = timeLeft > 10 ? "safe" : timeLeft > 5 ? "warn" : "danger";

  const LETTERS = ["A", "B", "C", "D"];

  if (isFinished) {
    const stillPlaying = activePlayers.filter((p) => p.status === "playing");
    return (
      <div className="app-container">
        <div className="bg-glow" />
        <div className="page-center animate-fade-in" style={{ zIndex: 1, position: "relative", textAlign: "center", gap: "1.25rem" }}>
          <div style={{ fontSize: "4rem" }}>🎉</div>
          <h2 className="text-gradient">You're done!</h2>
          <p className="text-secondary">
            {stillPlaying.length > 0
              ? `Waiting for ${stillPlaying.map((p) => p.name).join(", ")}...`
              : "Results coming up!"}
          </p>

          {stillPlaying.length > 0 && (
            <div className="card" style={{ width: "100%", maxWidth: 340 }}>
              <h4 className="mb-sm">Live Status</h4>
              <LiveStatus players={players} myUid={player.uid} questions={questions} />
            </div>
          )}

          <div className="card-glass" style={{ maxWidth: 340, padding: "0.875rem 1.25rem" }}>
            <p className="text-sm text-secondary">Your Score</p>
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
          <p style={{ fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Get Ready!</p>
          <h2 className="text-gradient">Game starts in</h2>
          <div className="countdown-display">{countdownLeft}</div>
          <div className="card-glass" style={{ maxWidth: 320, padding: "1rem 1.5rem" }}>
            <p className="text-sm text-secondary">🧠 Each correct answer earns up to <strong style={{ color: "var(--accent-yellow)" }}>6 points</strong> based on speed and difficulty.</p>
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
          <h3>Loading questions...</h3>
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
              Q{currentIndex + 1} / {questions.length}
            </span>
            <span className="question-topic-badge">{currentQuestion.topic}</span>
          </div>
          <button
            id="btn-quit-game"
            className="btn btn-danger btn-sm"
            style={{ marginLeft: "0.5rem" }}
            onClick={() => setShowQuitConfirm(true)}
          >
            Quit
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
          <span className="text-xs text-muted">Your Score</span>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--accent-purple-light)" }}>
            {myData?.score || 0} pts
          </span>
        </div>

        {/* Question */}
        <div className="card mb-md" style={{ background: "linear-gradient(145deg, var(--bg-card), var(--bg-secondary))" }}>
          <p className="question-text">{currentQuestion.question}</p>

          <div className="answer-grid">
            {currentQuestion.answers.map((answer, idx) => {
              let cls = "answer-btn";
              if (answered) {
                if (idx === currentQuestion.correctIndex) cls += " correct";
                else if (idx === selectedAnswer) cls += " wrong";
              } else if (idx === selectedAnswer) {
                cls += " selected";
              }
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
            {currentQuestion.difficulty} • up to {currentQuestion.difficulty === "easy" ? 3 : currentQuestion.difficulty === "medium" ? 5 : 6} pts
          </span>
        </div>
      </div>

      {/* Quit Confirm Modal */}
      {showQuitConfirm && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="card animate-scale-in" style={{ maxWidth: 320, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🚪</div>
            <h3 className="mb-sm">Quit Game?</h3>
            <p className="text-sm text-muted mb-md">
              You'll leave with your current score. The game continues for everyone else.
            </p>
            <div className="stack stack-sm">
              <button id="btn-confirm-quit" className="btn btn-danger btn-full" onClick={onQuit}>Yes, quit</button>
              <button className="btn btn-secondary btn-full" onClick={() => setShowQuitConfirm(false)}>Keep playing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LiveStatus({ players, myUid, questions, mini }) {
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
            <span className="text-xs text-muted" style={{ marginLeft: "auto" }}>
              {p.status === "finished" ? "✅ Done" : p.status === "quit" ? "🚪 Left" : `Q${Math.min((p.questionIndex || 0) + 1, total)}/${total}`}
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
