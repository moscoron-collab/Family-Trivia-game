// ============================================================
// Firebase Room Logic — Real-time multiplayer room management
// ============================================================
import { db } from "./config";
import {
  ref,
  set,
  get,
  update,
  push,
  onValue,
  off,
  serverTimestamp,
  remove,
} from "firebase/database";

// Generate a random 4-digit room code
export function generateRoomCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Create a new room
export async function createRoom(hostPlayer) {
  let code;
  let attempts = 0;
  // Ensure unique room code
  do {
    code = generateRoomCode();
    const existing = await get(ref(db, `rooms/${code}`));
    if (!existing.exists()) break;
    attempts++;
  } while (attempts < 10);

  const roomData = {
    code,
    status: "lobby", // lobby | countdown | playing | results | playAgain
    createdAt: serverTimestamp(),
    settings: {
      topics: [],
      difficulty: null,
      topicVotes: {},
      difficultyVotes: {},
    },
    players: {
      [hostPlayer.uid]: {
        ...hostPlayer,
        status: "lobby", // lobby | playing | finished | quit
        score: 0,
        questionIndex: 0,
        answers: {},
        joinedAt: serverTimestamp(),
      },
    },
    chat: {},
    questions: null,
    gameStartedAt: null,
    playAgainVotes: {},
  };

  await set(ref(db, `rooms/${code}`), roomData);
  return code;
}

// Join an existing room
export async function joinRoom(code, player) {
  const roomRef = ref(db, `rooms/${code}`);
  const snapshot = await get(roomRef);

  if (!snapshot.exists()) {
    throw new Error("Room not found. Check the code and try again.");
  }

  const room = snapshot.val();

  if (room.status !== "lobby" && room.status !== "playAgain") {
    throw new Error("This game is already in progress. Wait for the next round!");
  }

  const players = room.players || {};
  const activePlayers = Object.values(players).filter((p) => p.status !== "quit");

  if (activePlayers.length >= 10) {
    throw new Error("Room is full (max 10 players).");
  }

  await update(ref(db, `rooms/${code}/players/${player.uid}`), {
    ...player,
    status: "lobby",
    score: 0,
    questionIndex: 0,
    answers: {},
    joinedAt: serverTimestamp(),
  });

  return room;
}

// Send a chat message
export async function sendChatMessage(code, player, message) {
  const chatRef = ref(db, `rooms/${code}/chat`);
  await push(chatRef, {
    uid: player.uid,
    name: player.name,
    message,
    timestamp: serverTimestamp(),
  });
}

// Vote for topics
export async function voteTopics(code, uid, topicIds) {
  await update(ref(db, `rooms/${code}/settings/topicVotes`), {
    [uid]: topicIds,
  });
}

// Vote for difficulty
export async function voteDifficulty(code, uid, difficulty) {
  await update(ref(db, `rooms/${code}/settings/difficultyVotes`), {
    [uid]: difficulty,
  });
}

// Compute majority difficulty from votes
export function computeMajorityDifficulty(votes) {
  const counts = { easy: 0, medium: 0, hard: 0 };
  Object.values(votes || {}).forEach((v) => {
    if (counts[v] !== undefined) counts[v]++;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

// Compute top 4 topics from votes
export function computeTopTopics(votes) {
  const counts = {};
  Object.values(votes || {}).forEach((topicList) => {
    (topicList || []).forEach((topicId) => {
      counts[topicId] = (counts[topicId] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([id]) => id);
}

// Start the game — store questions and set status directly to playing
export async function startGame(code, questions, difficulty, topics) {
  await update(ref(db, `rooms/${code}`), {
    status: "playing",
    questions,
    "settings/difficulty": difficulty,
    "settings/topics": topics,
    gameStartedAt: Date.now(),
    playAgainVotes: {},
  });

  // Update all lobby players to "playing"
  const snapshot = await get(ref(db, `rooms/${code}/players`));
  const players = snapshot.val() || {};
  const updates = {};
  Object.entries(players).forEach(([uid, p]) => {
    if (p.status === "lobby") {
      updates[`rooms/${code}/players/${uid}/status`] = "playing";
      updates[`rooms/${code}/players/${uid}/score`] = 0;
      updates[`rooms/${code}/players/${uid}/questionIndex`] = 0;
      updates[`rooms/${code}/players/${uid}/answers`] = {};
    }
  });
  if (Object.keys(updates).length > 0) {
    await update(ref(db), updates);
  }
}

// Submit an answer for a player
export async function submitAnswer(code, uid, questionIndex, answerIndex, timeMs, question) {
  const isCorrect = answerIndex === question.correctIndex;

  // Speed scoring: 3 blocks of 5 seconds
  let speedPoints = 0;
  if (isCorrect) {
    if (timeMs <= 5000) speedPoints = 3;
    else if (timeMs <= 10000) speedPoints = 2;
    else speedPoints = 1;
  }

  // Difficulty multiplier
  const multipliers = { easy: 1, medium: 1.5, hard: 2 };
  const multiplier = multipliers[question.difficulty] || 1;
  const points = Math.round(speedPoints * multiplier);

  const answerData = {
    answerIndex,
    isCorrect,
    timeMs,
    speedPoints,
    points,
    topic: question.topicId,
    topicLabel: question.topic,
  };

  const updates = {
    [`rooms/${code}/players/${uid}/answers/${questionIndex}`]: answerData,
    [`rooms/${code}/players/${uid}/questionIndex`]: questionIndex + 1,
  };

  // Update score
  const snapshot = await get(ref(db, `rooms/${code}/players/${uid}/score`));
  const currentScore = snapshot.val() || 0;
  updates[`rooms/${code}/players/${uid}/score`] = currentScore + points;

  await update(ref(db), updates);

  return { isCorrect, points };
}

// Mark player as finished
export async function finishGame(code, uid) {
  await update(ref(db, `rooms/${code}/players/${uid}`), {
    status: "finished",
    finishedAt: serverTimestamp(),
  });

  // Check if all active players are done
  const snapshot = await get(ref(db, `rooms/${code}/players`));
  const players = snapshot.val() || {};
  const activePlayers = Object.values(players).filter((p) => p.status !== "quit");
  const allDone = activePlayers.every(
    (p) => p.status === "finished"
  );

  if (allDone) {
    await update(ref(db, `rooms/${code}`), { status: "results" });
  }
}

// Quit a player from the game
export async function quitPlayer(code, uid) {
  await update(ref(db, `rooms/${code}/players/${uid}`), {
    status: "quit",
    quitAt: serverTimestamp(),
  });

  // Check if remaining active players are all done
  const snapshot = await get(ref(db, `rooms/${code}/players`));
  const players = snapshot.val() || {};
  const activePlayers = Object.values(players).filter((p) => p.status !== "quit");
  const allDone = activePlayers.length === 0 || activePlayers.every((p) => p.status === "finished");

  if (allDone && activePlayers.length > 0) {
    await update(ref(db, `rooms/${code}`), { status: "results" });
  }
}

// Vote to play again
export async function votePlayAgain(code, uid, vote) {
  await update(ref(db, `rooms/${code}/playAgainVotes`), { [uid]: vote });

  if (vote === "leave") {
    await quitPlayer(code, uid);
  }
}

// Reset room for a new game
export async function resetRoom(code) {
  const snapshot = await get(ref(db, `rooms/${code}/players`));
  const players = snapshot.val() || {};
  const updates = {};

  Object.entries(players).forEach(([uid, p]) => {
    if (p.status !== "quit") {
      updates[`rooms/${code}/players/${uid}/status`] = "lobby";
      updates[`rooms/${code}/players/${uid}/score`] = 0;
      updates[`rooms/${code}/players/${uid}/questionIndex`] = 0;
      updates[`rooms/${code}/players/${uid}/answers`] = {};
    }
  });

  updates[`rooms/${code}/status`] = "lobby";
  updates[`rooms/${code}/questions`] = null;
  updates[`rooms/${code}/settings/topics`] = [];
  updates[`rooms/${code}/settings/difficulty`] = null;
  updates[`rooms/${code}/settings/topicVotes`] = {};
  updates[`rooms/${code}/settings/difficultyVotes`] = {};
  updates[`rooms/${code}/playAgainVotes`] = {};
  updates[`rooms/${code}/chat`] = {};

  await update(ref(db), updates);
}

// Subscribe to room changes (returns unsubscribe function)
export function subscribeToRoom(code, callback) {
  const roomRef = ref(db, `rooms/${code}`);
  onValue(roomRef, (snapshot) => {
    callback(snapshot.val());
  });
  return () => off(roomRef);
}

// Save long-term player stats to Firestore
export { ref, update, get, onValue, off, remove };
