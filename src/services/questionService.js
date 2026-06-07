// ============================================================
// Question Service
// Pulls trivia questions from the local question bank (src/data).
// - Instant & offline: no network call, so the game ALWAYS starts.
// - No repeats within a game (questions are de-duplicated).
// - Answers are shuffled, so the correct answer isn't always "A".
// ============================================================

import questionBank from "../data/questionBank";

export const TOPICS = [
  { id: "random", label: "🎲 Random Topic", emoji: "🎲" },
  { id: "soccer", label: "⚽ Soccer Trivia", emoji: "⚽" },
  { id: "animals", label: "🐬 Animals & Ocean", emoji: "🐬" },
  { id: "beauty", label: "💅 Beauty & Style", emoji: "💅" },
  { id: "movies", label: "🎬 Movies & Shows", emoji: "🎬" },
  { id: "money", label: "💰 Money & Business", emoji: "💰" },
  { id: "science", label: "🔬 Science Wow Facts", emoji: "🔬" },
  { id: "family", label: "😂 Family & Funny Moments", emoji: "😂" },
  { id: "geography", label: "🗺️ Countries & Famous Places", emoji: "🗺️" },
  { id: "survival", label: "🏕️ Survival Trivia", emoji: "🏕️" },
  { id: "logic", label: "🧠 Logic & Brain Teasers", emoji: "🧠" },
  { id: "usa", label: "🇺🇸 USA Trivia", emoji: "🇺🇸" },
  { id: "math", label: "➗ Math", emoji: "➗" },
  { id: "mexico", label: "🇲🇽 Mexico / Spanish Trivia", emoji: "🇲🇽" },
  { id: "dance", label: "🎵 Dance & Music", emoji: "🎵" },
  { id: "fortnite", label: "🎮 Fortnite Trivia", emoji: "🎮" },
];

const DIFFICULTIES = ["easy", "medium", "hard"];

// Fisher–Yates shuffle (returns a new array, doesn't mutate the original)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRandomTopicId() {
  const real = TOPICS.filter((t) => t.id !== "random");
  return real[Math.floor(Math.random() * real.length)].id;
}

// Turn a raw bank entry into a game-ready question with shuffled answers.
function prepareQuestion(raw, topicId, difficulty) {
  const label = TOPICS.find((t) => t.id === topicId)?.label || topicId;
  const correctAnswer = raw.answers[raw.correctIndex];
  const answers = shuffle(raw.answers);
  return {
    question: raw.question,
    answers,
    correctIndex: answers.indexOf(correctAnswer),
    explanation: raw.explanation || "",
    topic: label,
    topicId,
    difficulty,
  };
}

// generateQuestions stays async so callers (Lobby) don't need to change.
export async function generateQuestions(selectedTopicIds, difficulty, count = 20) {
  // Resolve "random" picks into real topics, keep only topics we actually have.
  let topics = (selectedTopicIds || []).map((id) =>
    id === "random" ? getRandomTopicId() : id
  );
  topics = [...new Set(topics)].filter((t) => questionBank[t]);
  if (topics.length === 0) topics = [getRandomTopicId()];

  const diff = DIFFICULTIES.includes(difficulty) ? difficulty : "medium";

  // Collect candidate questions, de-duplicated by question text.
  const seen = new Set();
  const pool = [];
  const addPool = (topicId, d) => {
    const arr = questionBank[topicId]?.[d] || [];
    for (const q of arr) {
      if (seen.has(q.question)) continue;
      seen.add(q.question);
      pool.push({ raw: q, topicId, difficulty: d });
    }
  };

  // Priority 1: selected topics at the chosen difficulty.
  topics.forEach((t) => addPool(t, diff));
  // Priority 2: selected topics at other difficulties (if we need more).
  if (pool.length < count) {
    DIFFICULTIES.filter((d) => d !== diff).forEach((d) =>
      topics.forEach((t) => addPool(t, d))
    );
  }
  // Priority 3: any topic at the chosen difficulty, then anything at all.
  if (pool.length < count) {
    Object.keys(questionBank).forEach((t) => addPool(t, diff));
  }
  if (pool.length < count) {
    Object.keys(questionBank).forEach((t) =>
      DIFFICULTIES.forEach((d) => addPool(t, d))
    );
  }

  const chosen = shuffle(pool).slice(0, count);
  return chosen.map((item) => prepareQuestion(item.raw, item.topicId, item.difficulty));
}
