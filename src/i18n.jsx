import { createContext, useContext, useState, useEffect, useCallback } from "react";

// ============================================================
// Tiny i18n layer — English + Hebrew UI strings.
// Use {var} placeholders; pass values via the second arg to t().
// ============================================================

export const UI = {
  en: {
    // Home
    logoTitle: "Family Trivia",
    battle: "BATTLE",
    createRoom: "✨ Create a Room",
    joinRoom: "🔗 Join a Room",
    tagline: "Free to play • No downloads • Works on any phone",
    signInTitle: "Sign in to continue",
    signInSubtitle: "Sign in with Google to save your stats, or play as a guest.",
    continueGoogle: "Continue with Google",
    or: "or",
    playGuest: "👤 Play as Guest",
    guestNote: "Guest play is available but stats won't be saved long-term.",
    back: "← Back",
    createTitle: "✨ Create a Room",
    joinTitle: "🔗 Join a Room",
    chooseName: "Choose your player name",
    orTypeName: "or type your name",
    yourName: "Your name...",
    roomCodePlaceholder: "Room code (4 digits)",
    createRoomGo: "Create Room →",
    joinRoomGo: "Join Room →",
    errNoName: "Please choose or enter your name!",
    errNoCode: "Please enter the 4-digit room code!",
    errGeneric: "Something went wrong. Please try again.",
    // Lobby
    lobbyTitle: "Family Trivia Battle",
    lobbySubtitle: "Lobby • Waiting to start",
    room: "Room",
    players: "Players",
    live: "● Live",
    you: "(you)",
    roomChat: "💬 Room Chat",
    chatEmpty: "Chat about topics, difficulty, or just say hi! 👋",
    typeMessage: "Type a message...",
    send: "Send",
    topicsTitle: "📚 Topics (pick up to 4)",
    pickAll: "Pick All",
    youSelected: "You selected: {n}/4 topics",
    difficulty: "⚡ Difficulty",
    diffEasy: "Easy",
    diffMedium: "Medium",
    diffHard: "Hard",
    diffEasyDesc: "Ages 6-10",
    diffMediumDesc: "Ages 11-16",
    diffHardDesc: "Adult level",
    roomVote: "Room vote: {v}",
    vote: "vote",
    votes: "votes",
    autoMedium: "Auto-selects Medium in {n}s if no agreement",
    autoMediumNow: "Defaulting to Medium...",
    errPickTopic: "Please select at least one topic first!",
    errNoQuestions: "No questions generated. Please try again.",
    generating: "⏳ Generating questions...",
    startGame: "🚀 Start Game!",
    anyoneStart: "Any player can start the game once topics and difficulty are selected.",
    language: "🌐 Language",
    // Countdown / game intro
    getReady: "Get Ready!",
    gameStartsIn: "Game starts in",
    pointsHint: "🧠 Each correct answer earns up to 6 points based on speed and difficulty.",
    playFair: "play fair!",
    // GameScreen
    question: "Q{n} / {total}",
    quit: "Quit",
    yourScore: "Your Score",
    pts: "pts",
    upToPts: "{diff} • up to {n} pts",
    loadingQuestions: "Loading questions...",
    youreDone: "🎉 You're done!",
    waitingFor: "Waiting for {names}...",
    resultsComing: "Results coming up!",
    liveStatus: "Live Status",
    done: "✅ Done",
    left: "🚪 Left",
    quitTitle: "🚪 Quit Game?",
    quitBody: "You'll leave with your current score. The game continues for everyone else.",
    quitYes: "Yes, quit",
    quitKeep: "Keep playing",
    // Results
    winner: "Winner",
    thatsYou: "🎉 That's you!",
    leaderboard: "🏅 Leaderboard",
    leftEarly: "Left early",
    correctCount: "{n}/{total} correct",
    topicPerf: "📊 Your Topic Performance",
    strong: "💪 Strong: {t}",
    weak: "📚 Weak: {t}",
    showReview: "📖 Show Answer Review",
    hideReview: "🔼 Hide Answer Review",
    yourAnswer: "Your answer:",
    correctAnswer: "✅ Correct:",
    playAgain: "Play Again?",
    playAgainSub: "Same room code, new topics, new questions!",
    imIn: "🎮 I'm in! Play Again",
    imDone: "🚪 I'm done, thanks!",
    thanksPlaying: "👋 Thanks for playing!",
    youreIn: "✅ You're in!",
    waitingOthers: " Waiting for {n} other player{s}…",
    starting: " Starting…",
    startNow: "▶️ Start now (don't wait)",
    autoRound: "New round starts automatically in {n}s",
    playingAgain: "🎮 Playing again",
    leaving: "🚪 Leaving",
    // Room
    connecting: "Connecting to room {code}...",
    roomNotFound: "Room not found or has expired.",
    goHome: "Go Home",
    // Stats
    statsTitle: "📊 My Stats",
    statsGames: "Games",
    statsPoints: "Points",
    statsWins: "Wins",
    statsAvg: "Avg score",
    statsBest: "Best",
    statsAccuracy: "Accuracy",
    statsByDifficulty: "Games by difficulty",
    statsByTopic: "Topics — strongest to weakest",
    statsNotPlayed: "Topics not played yet",
    statsNone: "No games yet — play a round to see your stats!",
    showStats: "📊 Show My Stats",
    hideStats: "🔼 Hide My Stats",
    close: "Close",
    gateTitle: "🔒 Family Access",
    gatePrompt: "Enter the family passcode to play",
    gatePlaceholder: "Passcode",
    gateEnter: "Enter",
    gateWrong: "Wrong passcode — try again",
  },
  he: {
    // Home
    logoTitle: "טריוויה משפחתית",
    battle: "קרב",
    createRoom: "✨ יצירת חדר",
    joinRoom: "🔗 הצטרפות לחדר",
    tagline: "חינם לשחק • ללא הורדות • עובד בכל טלפון",
    signInTitle: "התחברו כדי להמשיך",
    signInSubtitle: "התחברו עם Google כדי לשמור את הנתונים שלכם, או שחקו כאורחים.",
    continueGoogle: "המשך עם Google",
    or: "או",
    playGuest: "👤 משחק כאורח",
    guestNote: "משחק כאורח זמין, אך הנתונים לא יישמרו לטווח ארוך.",
    back: "→ חזרה",
    createTitle: "✨ יצירת חדר",
    joinTitle: "🔗 הצטרפות לחדר",
    chooseName: "בחרו את שם השחקן שלכם",
    orTypeName: "או הקלידו את שמכם",
    yourName: "השם שלכם...",
    roomCodePlaceholder: "קוד חדר (4 ספרות)",
    createRoomGo: "צור חדר →",
    joinRoomGo: "הצטרף →",
    errNoName: "אנא בחרו או הזינו את שמכם!",
    errNoCode: "אנא הזינו קוד חדר בן 4 ספרות!",
    errGeneric: "משהו השתבש. נסו שוב.",
    // Lobby
    lobbyTitle: "קרב טריוויה משפחתי",
    lobbySubtitle: "חדר המתנה • ממתינים להתחלה",
    room: "חדר",
    players: "שחקנים",
    live: "● חי",
    you: "(אתם)",
    roomChat: "💬 צ'אט החדר",
    chatEmpty: "דברו על נושאים, רמת קושי, או פשוט תגידו שלום! 👋",
    typeMessage: "הקלידו הודעה...",
    send: "שלח",
    topicsTitle: "📚 נושאים (עד 4)",
    pickAll: "בחר הכל",
    youSelected: "בחרתם: {n}/4 נושאים",
    difficulty: "⚡ רמת קושי",
    diffEasy: "קל",
    diffMedium: "בינוני",
    diffHard: "קשה",
    diffEasyDesc: "גילאי 6-10",
    diffMediumDesc: "גילאי 11-16",
    diffHardDesc: "רמת מבוגרים",
    roomVote: "הצבעת החדר: {v}",
    vote: "הצבעה",
    votes: "הצבעות",
    autoMedium: "ייבחר 'בינוני' אוטומטית בעוד {n} שניות אם אין הסכמה",
    autoMediumNow: "בורר 'בינוני'...",
    errPickTopic: "אנא בחרו לפחות נושא אחד!",
    errNoQuestions: "לא נוצרו שאלות. נסו שוב.",
    generating: "⏳ מכין שאלות...",
    startGame: "🚀 התחל משחק!",
    anyoneStart: "כל שחקן יכול להתחיל את המשחק לאחר בחירת נושאים ורמת קושי.",
    language: "🌐 שפה",
    // Countdown / game intro
    getReady: "התכוננו!",
    gameStartsIn: "המשחק מתחיל בעוד",
    pointsHint: "🧠 כל תשובה נכונה מזכה עד 6 נקודות, לפי מהירות ורמת קושי.",
    playFair: "שחקו ביושר!",
    // GameScreen
    question: "שאלה {n} / {total}",
    quit: "יציאה",
    yourScore: "הניקוד שלך",
    pts: "נק׳",
    upToPts: "{diff} • עד {n} נק׳",
    loadingQuestions: "טוען שאלות...",
    youreDone: "🎉 סיימת!",
    waitingFor: "ממתינים ל-{names}...",
    resultsComing: "התוצאות בדרך!",
    liveStatus: "סטטוס חי",
    done: "✅ סיים",
    left: "🚪 עזב",
    quitTitle: "🚪 לצאת מהמשחק?",
    quitBody: "תצאו עם הניקוד הנוכחי שלכם. המשחק ימשיך עבור כל השאר.",
    quitYes: "כן, צא",
    quitKeep: "המשך לשחק",
    // Results
    winner: "המנצח/ת",
    thatsYou: "🎉 זה אתם!",
    leaderboard: "🏅 טבלת המובילים",
    leftEarly: "עזב מוקדם",
    correctCount: "{n}/{total} נכונות",
    topicPerf: "📊 הביצועים שלך לפי נושא",
    strong: "💪 חזק: {t}",
    weak: "📚 חלש: {t}",
    showReview: "📖 הצג סקירת תשובות",
    hideReview: "🔼 הסתר סקירת תשובות",
    yourAnswer: "התשובה שלך:",
    correctAnswer: "✅ התשובה הנכונה:",
    playAgain: "לשחק שוב?",
    playAgainSub: "אותו קוד חדר, נושאים חדשים, שאלות חדשות!",
    imIn: "🎮 אני בפנים! שחק שוב",
    imDone: "🚪 סיימתי, תודה!",
    thanksPlaying: "👋 תודה ששיחקתם!",
    youreIn: "✅ אתם בפנים!",
    waitingOthers: " ממתינים ל-{n} שחקנים נוספים…",
    starting: " מתחיל…",
    startNow: "▶️ התחל עכשיו (בלי לחכות)",
    autoRound: "סבב חדש מתחיל אוטומטית בעוד {n} שניות",
    playingAgain: "🎮 משחק שוב",
    leaving: "🚪 עוזב",
    // Room
    connecting: "מתחבר לחדר {code}...",
    roomNotFound: "החדר לא נמצא או שפג תוקפו.",
    goHome: "חזרה לבית",
    // Stats
    statsTitle: "📊 הסטטיסטיקות שלי",
    statsGames: "משחקים",
    statsPoints: "נקודות",
    statsWins: "ניצחונות",
    statsAvg: "ממוצע",
    statsBest: "שיא",
    statsAccuracy: "דיוק",
    statsByDifficulty: "משחקים לפי רמת קושי",
    statsByTopic: "נושאים — מהחזק לחלש",
    statsNotPlayed: "נושאים שטרם שוחקו",
    statsNone: "עדיין אין משחקים — שחקו סבב כדי לראות סטטיסטיקות!",
    showStats: "📊 הצג סטטיסטיקות",
    hideStats: "🔼 הסתר סטטיסטיקות",
    close: "סגור",
    gateTitle: "🔒 כניסה למשפחה",
    gatePrompt: "הזינו את הסיסמה המשפחתית כדי לשחק",
    gatePlaceholder: "סיסמה",
    gateEnter: "כניסה",
    gateWrong: "סיסמה שגויה — נסו שוב",
  },
};

export function t(lang, key, vars) {
  let s = (UI[lang] && UI[lang][key]) ?? UI.en[key] ?? key;
  if (vars) {
    for (const k in vars) s = s.split(`{${k}}`).join(vars[k]);
  }
  return s;
}

const LanguageContext = createContext({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem("lang") || "en"; } catch { return "en"; }
  });
  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

// Returns a translate function bound to the current language: tr("key", {vars})
export function useT() {
  const { lang } = useLang();
  return useCallback((key, vars) => t(lang, key, vars), [lang]);
}
