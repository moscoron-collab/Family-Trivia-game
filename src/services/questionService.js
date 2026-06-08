// ============================================================
// Question Service
// Builds each game's questions from the local banks (src/data).
// - Instant & offline: no network call, so the game ALWAYS starts.
// - No repeats within a game (questions are de-duplicated).
// - Answers are shuffled, so the correct answer isn't always "A".
// - Each question is stored in BOTH English and Hebrew, so every
//   player can read it in their own language in the same game.
// ============================================================

import questionBank from "../data/bank";

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

// Stable short id for a question (used to remember which ones a player has seen).
export function makeQid(text) {
  let h = 0;
  const s = String(text || "");
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0;
  return "q" + (h >>> 0).toString(36);
}

// Build one game-ready question that contains BOTH languages.
// The answer order (and therefore correctIndex) is shared, so scoring is
// identical no matter which language a player is reading.
function buildQuestion(topicId, difficulty, qIndex) {
  const entry = questionBank[topicId][difficulty][qIndex];
  const order = shuffle([0, 1, 2, 3]);
  const localize = (side) => ({
    question: side.question,
    answers: order.map((k) => side.answers[k]),
    explanation: side.explanation || "",
  });
  return {
    topicId,
    difficulty,
    qid: makeQid(entry.en.question),
    correctIndex: order.indexOf(entry.correctIndex ?? 0),
    en: localize(entry.en),
    he: localize(entry.he || entry.en),
  };
}

// Pick the questions for a game. Returns language-neutral, bilingual question
// objects (stays async so callers don't need to change).
// `excludeQids` (a Set of question ids the players have already seen) is used to
// avoid repeats until the pool is exhausted.
export async function generateQuestions(selectedTopicIds, difficulty, count = 20, excludeQids = null) {
  // Resolve "random" picks; keep only topics we have.
  let topics = (selectedTopicIds || []).map((id) =>
    id === "random" ? getRandomTopicId() : id
  );
  topics = [...new Set(topics)].filter((t) => questionBank[t]);
  if (topics.length === 0) topics = [getRandomTopicId()];

  const diff = DIFFICULTIES.includes(difficulty) ? difficulty : "medium";
  const ex = excludeQids instanceof Set ? excludeQids : new Set(excludeQids || []);

  // Build candidate tiers in priority order, de-duplicated across all tiers:
  //   tier1 = chosen topics at the chosen difficulty
  //   tier2 = chosen topics at other difficulties
  //   tier3 = every topic / difficulty (last resort)
  const dedup = new Set();
  const makeTier = (pairs) => {
    const tier = [];
    for (const [topicId, d] of pairs) {
      const arr = questionBank[topicId]?.[d] || [];
      arr.forEach((q, qIndex) => {
        const text = (q.en && q.en.question) || `${topicId}:${d}:${qIndex}`;
        if (dedup.has(text)) return;
        dedup.add(text);
        tier.push({ topicId, difficulty: d, qIndex, qid: makeQid(text) });
      });
    }
    return tier;
  };
  const tier1 = makeTier(topics.map((t) => [t, diff]));
  // If the chosen difficulty runs low, borrow from the CLOSEST difficulty first
  // and avoid dropping to "easy" for a medium/hard game — so e.g. a medium game
  // never fills up with trivially easy questions. Each fallback difficulty is its
  // own tier so the preferred one is exhausted before the next.
  const FALLBACK = {
    easy: ["medium", "hard"],
    medium: ["hard", "easy"],
    hard: ["medium", "easy"],
  };
  const fallbackTiers = (FALLBACK[diff] || []).map((d) => makeTier(topics.map((t) => [t, d])));
  const tier3 = makeTier(Object.keys(questionBank).flatMap((t) => DIFFICULTIES.map((d) => [t, d])));
  const tiers = [tier1, ...fallbackTiers, tier3];

  const chosen = [];
  const taken = new Set();
  // 1) Fresh (unseen) questions, preferring earlier tiers.
  for (const tier of tiers) {
    if (chosen.length >= count) break;
    for (const p of shuffle(tier.filter((x) => !ex.has(x.qid)))) {
      if (chosen.length >= count) break;
      if (taken.has(p.qid)) continue;
      taken.add(p.qid);
      chosen.push(p);
    }
  }
  // 2) Only if everything has been seen, reuse — again preferring earlier tiers.
  if (chosen.length < count) {
    for (const tier of tiers) {
      if (chosen.length >= count) break;
      for (const p of shuffle(tier.filter((x) => !taken.has(x.qid)))) {
        if (chosen.length >= count) break;
        taken.add(p.qid);
        chosen.push(p);
      }
    }
  }

  return chosen.slice(0, count).map((p) => buildQuestion(p.topicId, p.difficulty, p.qIndex));
}
