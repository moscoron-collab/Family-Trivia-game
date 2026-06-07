// ============================================================
// Question Service
// Pulls trivia questions from the local question bank (src/data).
// - Instant & offline: no network call, so the game ALWAYS starts.
// - No repeats within a game (questions are de-duplicated).
// - Answers are shuffled, so the correct answer isn't always "A".
// - Supports English ("en") and Hebrew ("he").
// ============================================================

import questionBank from "../data/questionBank";
import questionBankHe from "../data/questionBankHe";

const BANKS = {
  en: questionBank,
  he: questionBankHe,
};

function getBank(lang) {
  return BANKS[lang] || BANKS.en;
}

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

// Just the topic name in the given language (no emoji).
export function topicName(topic, lang = "en") {
  return (topic.name && (topic.name[lang] || topic.name.en)) || topic.id;
}

// Emoji + name, e.g. "⚽ Soccer Trivia" / "⚽ כדורגל".
export function topicLabel(topic, lang = "en") {
  return `${topic.emoji} ${topicName(topic, lang)}`;
}

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
function prepareQuestion(raw, topicId, difficulty, lang) {
  const topic = TOPICS.find((t) => t.id === topicId);
  const label = topic ? topicLabel(topic, lang) : topicId;
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
export async function generateQuestions(selectedTopicIds, difficulty, count = 20, lang = "en") {
  const bank = getBank(lang);

  // Resolve "random" picks into real topics, keep only topics we actually have.
  let topics = (selectedTopicIds || []).map((id) =>
    id === "random" ? getRandomTopicId() : id
  );
  topics = [...new Set(topics)].filter((t) => bank[t]);
  if (topics.length === 0) topics = [getRandomTopicId()];

  const diff = DIFFICULTIES.includes(difficulty) ? difficulty : "medium";

  // Collect candidate questions, de-duplicated by question text.
  const seen = new Set();
  const pool = [];
  const addPool = (topicId, d) => {
    const arr = bank[topicId]?.[d] || [];
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
    Object.keys(bank).forEach((t) => addPool(t, diff));
  }
  if (pool.length < count) {
    Object.keys(bank).forEach((t) =>
      DIFFICULTIES.forEach((d) => addPool(t, d))
    );
  }

  const chosen = shuffle(pool).slice(0, count);
  return chosen.map((item) => prepareQuestion(item.raw, item.topicId, item.difficulty, lang));
}
