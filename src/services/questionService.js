// ============================================================
// Question Service
// Builds each game's questions from the local banks (src/data).
// - Instant & offline: no network call, so the game ALWAYS starts.
// - No repeats within a game (questions are de-duplicated).
// - Answers are shuffled, so the correct answer isn't always "A".
// - Each question is stored in BOTH English and Hebrew, so every
//   player can read it in their own language in the same game.
// ============================================================

import questionBank from "../data/questionBank";
import questionBankHe from "../data/questionBankHe";

const BANKS = { en: questionBank, he: questionBankHe };

// Topics carry both an English and a Hebrew name + a shared emoji.
export const TOPICS = [
  { id: "random", emoji: "🎲", name: { en: "Random Topic", he: "נושא אקראי" } },
  { id: "soccer", emoji: "⚽", name: { en: "Soccer Trivia", he: "כדורגל" } },
  { id: "animals", emoji: "🐬", name: { en: "Animals & Ocean", he: "חיות ואוקיינוס" } },
  { id: "beauty", emoji: "💅", name: { en: "Beauty & Style", he: "יופי וסטייל" } },
  { id: "movies", emoji: "🎬", name: { en: "Movies & Shows", he: "סרטים וסדרות" } },
  { id: "money", emoji: "💰", name: { en: "Money & Business", he: "כסף ועסקים" } },
  { id: "science", emoji: "🔬", name: { en: "Science Wow Facts", he: "עובדות מדע מדהימות" } },
  { id: "family", emoji: "😂", name: { en: "Family & Funny Moments", he: "משפחה ורגעים מצחיקים" } },
  { id: "geography", emoji: "🗺️", name: { en: "Countries & Famous Places", he: "מדינות ומקומות מפורסמים" } },
  { id: "survival", emoji: "🏕️", name: { en: "Survival Trivia", he: "הישרדות" } },
  { id: "logic", emoji: "🧠", name: { en: "Logic & Brain Teasers", he: "היגיון וחידות" } },
  { id: "usa", emoji: "🇺🇸", name: { en: "USA Trivia", he: "ארצות הברית" } },
  { id: "math", emoji: "➗", name: { en: "Math", he: "מתמטיקה" } },
  { id: "mexico", emoji: "🇲🇽", name: { en: "Mexico / Spanish Trivia", he: "מקסיקו / ספרדית" } },
  { id: "dance", emoji: "🎵", name: { en: "Dance & Music", he: "ריקוד ומוזיקה" } },
  { id: "fortnite", emoji: "🎮", name: { en: "Fortnite Trivia", he: "פורטנייט" } },
];

export function topicName(topic, lang = "en") {
  return (topic.name && (topic.name[lang] || topic.name.en)) || topic.id;
}

export function topicLabel(topic, lang = "en") {
  return `${topic.emoji} ${topicName(topic, lang)}`;
}

// Look up a topic's label straight from its id (used where we only stored the id).
export function topicLabelById(topicId, lang = "en") {
  const t = TOPICS.find((x) => x.id === topicId);
  return t ? topicLabel(t, lang) : topicId;
}

const DIFFICULTIES = ["easy", "medium", "hard"];

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

// Build one game-ready question that contains BOTH languages.
// The answer order (and therefore correctIndex) is shared, so scoring is
// identical no matter which language a player is reading.
function buildQuestion(topicId, difficulty, qIndex) {
  const enRaw = questionBank[topicId][difficulty][qIndex];
  const heRaw = questionBankHe[topicId]?.[difficulty]?.[qIndex] || enRaw;
  const order = shuffle([0, 1, 2, 3]);
  const localize = (raw) => ({
    question: raw.question,
    answers: order.map((k) => raw.answers[k]),
    explanation: raw.explanation || "",
  });
  return {
    topicId,
    difficulty,
    correctIndex: order.indexOf(enRaw.correctIndex), // correctIndex is 0 in the bank
    en: localize(enRaw),
    he: localize(heRaw),
  };
}

// Pick the questions for a game. Returns language-neutral, bilingual question
// objects (stays async so callers don't need to change).
export async function generateQuestions(selectedTopicIds, difficulty, count = 20) {
  // Resolve "random" picks; keep only topics we have.
  let topics = (selectedTopicIds || []).map((id) =>
    id === "random" ? getRandomTopicId() : id
  );
  topics = [...new Set(topics)].filter((t) => questionBank[t]);
  if (topics.length === 0) topics = [getRandomTopicId()];

  const diff = DIFFICULTIES.includes(difficulty) ? difficulty : "medium";

  // Collect candidate questions (by topic/difficulty/index), de-duplicated.
  const seen = new Set();
  const pool = [];
  const addPool = (topicId, d) => {
    const arr = questionBank[topicId]?.[d] || [];
    arr.forEach((q, qIndex) => {
      if (seen.has(q.question)) return;
      seen.add(q.question);
      pool.push({ topicId, difficulty: d, qIndex });
    });
  };

  topics.forEach((t) => addPool(t, diff));
  if (pool.length < count) {
    DIFFICULTIES.filter((d) => d !== diff).forEach((d) => topics.forEach((t) => addPool(t, d)));
  }
  if (pool.length < count) {
    Object.keys(questionBank).forEach((t) => addPool(t, diff));
  }
  if (pool.length < count) {
    Object.keys(questionBank).forEach((t) => DIFFICULTIES.forEach((d) => addPool(t, d)));
  }

  return shuffle(pool)
    .slice(0, count)
    .map((p) => buildQuestion(p.topicId, p.difficulty, p.qIndex));
}
