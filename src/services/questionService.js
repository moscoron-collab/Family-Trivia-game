// ============================================================
// Question Service — Gemini API Integration
// Generates fresh trivia questions for each game session
// ============================================================

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

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

const TOPIC_PROMPTS = {
  soccer: "soccer trivia: Messi, Barcelona, Argentina, World Cup, Premier League, Brazil players and teams",
  animals: "animals and ocean trivia: wildlife, sea creatures, habitats, animal facts",
  beauty: "beauty and style trivia: fashion, makeup, style trends, famous designers",
  movies: "movies and TV shows trivia: popular films, series, actors, directors, animated movies",
  money: "money and business trivia for kids: stock market basics, real estate, famous billionaires",
  science: "science wow facts: space, volcanoes, dinosaurs, black holes, amazing scientific discoveries",
  family: "funny family life trivia: funny relatable family situations, parenting jokes, family dynamics",
  geography: "world geography trivia: countries, capital cities, famous landmarks, maps, famous places",
  survival: "survival trivia: what would you do in the jungle, desert, ocean, extreme situations",
  logic: "logic and brain teasers: riddles, lateral thinking puzzles, logic problems",
  usa: "USA trivia: states, presidents, famous landmarks, US history, sports teams",
  math: "math trivia: arithmetic, geometry, fun math facts, number patterns",
  mexico: "Mexico and Spanish trivia: Spanish words, Mexican culture, Mexican food, geography",
  dance: "dance and music trivia: hip-hop, TikTok dances, famous songs, pop music, artists",
  fortnite: "Fortnite trivia: skins, weapons, maps, seasons, emotes, famous streamers",
};

const DIFFICULTY_DESCRIPTIONS = {
  easy: "very easy questions suitable for young children aged 6-10",
  medium: "medium difficulty questions suitable for teenagers aged 11-16",
  hard: "challenging questions suitable for adults and knowledgeable teens",
};

// Hardcoded fallback questions per topic (used if Gemini API fails)
const FALLBACK_QUESTIONS = {
  soccer: [
    { question: "How many players are on a soccer team on the field?", answers: ["11", "9", "10", "12"], correctIndex: 0 },
    { question: "Which country has won the most FIFA World Cups?", answers: ["Brazil", "Germany", "Argentina", "Italy"], correctIndex: 0 },
    { question: "Who is known as 'La Pulga' (The Flea)?", answers: ["Lionel Messi", "Cristiano Ronaldo", "Neymar", "Mbappé"], correctIndex: 0 },
    { question: "How long is a standard soccer match?", answers: ["90 minutes", "80 minutes", "60 minutes", "120 minutes"], correctIndex: 0 },
    { question: "Which club does Messi play for?", answers: ["Inter Miami", "PSG", "Barcelona", "Real Madrid"], correctIndex: 0 },
    { question: "What shape is a soccer field?", answers: ["Rectangle", "Square", "Circle", "Oval"], correctIndex: 0 },
    { question: "Which country hosts La Liga?", answers: ["Spain", "Italy", "France", "England"], correctIndex: 0 },
  ],
  animals: [
    { question: "What is the largest animal on Earth?", answers: ["Blue Whale", "Elephant", "Giraffe", "Great White Shark"], correctIndex: 0 },
    { question: "How many legs does a spider have?", answers: ["8", "6", "10", "4"], correctIndex: 0 },
    { question: "Which animal can change its color?", answers: ["Chameleon", "Dolphin", "Eagle", "Whale"], correctIndex: 0 },
    { question: "What do you call a group of lions?", answers: ["Pride", "Pack", "Herd", "Flock"], correctIndex: 0 },
    { question: "Which is the fastest land animal?", answers: ["Cheetah", "Lion", "Horse", "Falcon"], correctIndex: 0 },
    { question: "How many hearts does an octopus have?", answers: ["3", "1", "2", "4"], correctIndex: 0 },
    { question: "What is the tallest animal?", answers: ["Giraffe", "Elephant", "Camel", "Horse"], correctIndex: 0 },
  ],
  geography: [
    { question: "What is the capital of France?", answers: ["Paris", "London", "Rome", "Madrid"], correctIndex: 0 },
    { question: "Which is the longest river in the world?", answers: ["Nile", "Amazon", "Mississippi", "Yangtze"], correctIndex: 0 },
    { question: "What country has the most people?", answers: ["India", "China", "USA", "Indonesia"], correctIndex: 0 },
    { question: "Which is the smallest country in the world?", answers: ["Vatican City", "Monaco", "San Marino", "Andorra"], correctIndex: 0 },
    { question: "What is the capital of Japan?", answers: ["Tokyo", "Beijing", "Seoul", "Bangkok"], correctIndex: 0 },
    { question: "What is the largest ocean?", answers: ["Pacific", "Atlantic", "Indian", "Arctic"], correctIndex: 0 },
    { question: "Which continent is Egypt in?", answers: ["Africa", "Asia", "Europe", "Middle East"], correctIndex: 0 },
  ],
  science: [
    { question: "What planet is closest to the Sun?", answers: ["Mercury", "Venus", "Earth", "Mars"], correctIndex: 0 },
    { question: "What is the chemical symbol for water?", answers: ["H2O", "CO2", "O2", "NaCl"], correctIndex: 0 },
    { question: "How many bones are in the adult human body?", answers: ["206", "198", "215", "225"], correctIndex: 0 },
    { question: "What is the speed of light approximately?", answers: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"], correctIndex: 0 },
    { question: "Which planet has rings around it?", answers: ["Saturn", "Jupiter", "Uranus", "Neptune"], correctIndex: 0 },
    { question: "What gas do plants absorb from the air?", answers: ["CO2", "Oxygen", "Nitrogen", "Hydrogen"], correctIndex: 0 },
    { question: "How many planets are in our solar system?", answers: ["8", "9", "7", "10"], correctIndex: 0 },
  ],
  movies: [
    { question: "Which movie features the character 'Simba'?", answers: ["The Lion King", "Moana", "Frozen", "Tarzan"], correctIndex: 0 },
    { question: "What is the highest-grossing movie of all time?", answers: ["Avatar", "Avengers Endgame", "Titanic", "Star Wars"], correctIndex: 0 },
    { question: "Who plays Iron Man in the MCU?", answers: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo"], correctIndex: 0 },
    { question: "Which studio created Toy Story?", answers: ["Pixar", "DreamWorks", "Disney", "Universal"], correctIndex: 0 },
    { question: "What year was the first Harry Potter movie released?", answers: ["2001", "1999", "2003", "2000"], correctIndex: 0 },
    { question: "Which movie has the quote 'I'll be back'?", answers: ["Terminator", "Rocky", "Die Hard", "RoboCop"], correctIndex: 0 },
    { question: "Who voices Elsa in Frozen?", answers: ["Idina Menzel", "Kristen Bell", "Cate Blanchett", "Amy Adams"], correctIndex: 0 },
  ],
  usa: [
    { question: "How many states are in the USA?", answers: ["50", "48", "52", "51"], correctIndex: 0 },
    { question: "Who was the first US President?", answers: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"], correctIndex: 0 },
    { question: "What is the capital of the USA?", answers: ["Washington D.C.", "New York", "Los Angeles", "Chicago"], correctIndex: 0 },
    { question: "What year did the USA declare independence?", answers: ["1776", "1783", "1765", "1789"], correctIndex: 0 },
    { question: "Which state is the largest by area?", answers: ["Alaska", "Texas", "California", "Montana"], correctIndex: 0 },
    { question: "What is the national bird of the USA?", answers: ["Bald Eagle", "Turkey", "Hawk", "Falcon"], correctIndex: 0 },
    { question: "How many stripes are on the US flag?", answers: ["13", "50", "15", "12"], correctIndex: 0 },
  ],
  math: [
    { question: "What is 12 × 12?", answers: ["144", "124", "148", "132"], correctIndex: 0 },
    { question: "What is the square root of 64?", answers: ["8", "6", "7", "9"], correctIndex: 0 },
    { question: "How many sides does a hexagon have?", answers: ["6", "5", "7", "8"], correctIndex: 0 },
    { question: "What is 15% of 200?", answers: ["30", "25", "20", "35"], correctIndex: 0 },
    { question: "What is Pi rounded to 2 decimal places?", answers: ["3.14", "3.12", "3.16", "3.18"], correctIndex: 0 },
    { question: "What is 7 × 8?", answers: ["56", "54", "63", "48"], correctIndex: 0 },
    { question: "What is 100 ÷ 4?", answers: ["25", "20", "30", "40"], correctIndex: 0 },
  ],
  logic: [
    { question: "I have cities but no houses. I have mountains but no trees. What am I?", answers: ["A map", "A painting", "A dream", "A mirror"], correctIndex: 0 },
    { question: "What has hands but cannot clap?", answers: ["A clock", "A glove", "A puppet", "A robot"], correctIndex: 0 },
    { question: "Which is heavier: 1kg of feathers or 1kg of gold?", answers: ["They weigh the same", "Gold", "Feathers", "Depends on size"], correctIndex: 0 },
    { question: "What comes once in a minute, twice in a moment, never in a thousand years?", answers: ["The letter M", "Time", "The letter T", "A second"], correctIndex: 0 },
    { question: "A rooster lays an egg on top of a barn. Which way does it roll?", answers: ["Roosters don't lay eggs", "Left", "Right", "Straight down"], correctIndex: 0 },
    { question: "What gets wetter as it dries?", answers: ["A towel", "A sponge", "Sand", "Ice"], correctIndex: 0 },
    { question: "If you have me, you want to share me. If you share me, you no longer have me. What am I?", answers: ["A secret", "Money", "Food", "A hug"], correctIndex: 0 },
  ],
  beauty: [
    { question: "What is mascara used for?", answers: ["Eyelashes", "Lips", "Cheeks", "Eyebrows"], correctIndex: 0 },
    { question: "Which brand makes the 'Lip Kit'?", answers: ["Kylie Cosmetics", "MAC", "Fenty", "NYX"], correctIndex: 0 },
    { question: "What is the most popular nail shape?", answers: ["Almond", "Square", "Coffin", "Round"], correctIndex: 0 },
    { question: "SPF stands for what?", answers: ["Sun Protection Factor", "Skin Protection Formula", "Sun Proof Factor", "Skin Proof Filter"], correctIndex: 0 },
    { question: "Which country is famous for K-beauty skincare?", answers: ["South Korea", "Japan", "France", "USA"], correctIndex: 0 },
    { question: "What does a toner do in skincare?", answers: ["Balances skin pH", "Adds color", "Removes makeup", "Fills pores"], correctIndex: 0 },
    { question: "What is the purpose of primer in makeup?", answers: ["Makes makeup last longer", "Adds color", "Moisturizes skin", "Removes blemishes"], correctIndex: 0 },
  ],
  money: [
    { question: "What does 'invest' mean?", answers: ["Put money in to earn more", "Spend all your money", "Hide your money", "Give money away"], correctIndex: 0 },
    { question: "Who is the richest person in the world (historically)?", answers: ["Elon Musk", "Jeff Bezos", "Bill Gates", "Warren Buffett"], correctIndex: 0 },
    { question: "What is a stock?", answers: ["A share of ownership in a company", "A type of savings account", "A government bond", "A bank loan"], correctIndex: 0 },
    { question: "What does ATM stand for?", answers: ["Automated Teller Machine", "Automatic Transfer Money", "Account Transfer Method", "Auto Teller Mode"], correctIndex: 0 },
    { question: "If you save $10 a week, how much in a year?", answers: ["$520", "$365", "$1200", "$480"], correctIndex: 0 },
    { question: "What is inflation?", answers: ["Prices going up over time", "Money growing in banks", "Economy getting bigger", "Interest rates rising"], correctIndex: 0 },
    { question: "What does 'budget' mean?", answers: ["A plan for spending money", "A type of bank account", "Saving money fast", "Spending limit on a card"], correctIndex: 0 },
  ],
  family: [
    { question: "What do kids always ask on long car trips?", answers: ["Are we there yet?", "Can we stop?", "I'm hungry!", "I need to pee!"], correctIndex: 0 },
    { question: "Which meal do families most often eat together?", answers: ["Dinner", "Breakfast", "Lunch", "Brunch"], correctIndex: 0 },
    { question: "What is the most common excuse for not doing homework?", answers: ["The dog ate it", "I forgot", "My computer broke", "The teacher didn't assign it"], correctIndex: 0 },
    { question: "What do parents say when kids ask for a pet?", answers: ["We'll see", "Absolutely!", "No way!", "Ask your grandma"], correctIndex: 0 },
    { question: "What is the classic bedtime battle?", answers: ["Just 5 more minutes!", "I'm not tired", "One more story!", "I'm thirsty!"], correctIndex: 0 },
    { question: "What do kids always lose?", answers: ["Socks", "Shoes", "Homework", "Chargers"], correctIndex: 0 },
    { question: "What does dad always do at the BBQ?", answers: ["Claims to be the grill master", "Burns everything", "Orders pizza instead", "Watches others cook"], correctIndex: 0 },
  ],
  survival: [
    { question: "What is the rule of 3 in survival? You can survive 3 minutes without...", answers: ["Air", "Water", "Food", "Shelter"], correctIndex: 0 },
    { question: "If lost in the wilderness, what should you do first?", answers: ["Stay calm and stay put", "Walk in one direction", "Climb a tree", "Build a fire immediately"], correctIndex: 0 },
    { question: "What is the universal distress signal?", answers: ["3 of anything (whistles/fires)", "2 loud shouts", "Waving both arms", "Writing HELP on the ground"], correctIndex: 0 },
    { question: "Which is safer to drink in survival?", answers: ["Boiled water", "River water", "Snow directly", "Sea water"], correctIndex: 0 },
    { question: "What direction does moss usually grow on a tree?", answers: ["North (in Northern Hemisphere)", "South", "East", "West"], correctIndex: 0 },
    { question: "What should you do if you encounter a bear?", answers: ["Stand your ground and make noise", "Run away fast", "Climb a tree", "Play dead immediately"], correctIndex: 0 },
    { question: "In a desert, when should you travel?", answers: ["At night", "At noon", "Early morning only", "Anytime with water"], correctIndex: 0 },
  ],
  mexico: [
    { question: "What is the capital of Mexico?", answers: ["Mexico City", "Guadalajara", "Cancun", "Tijuana"], correctIndex: 0 },
    { question: "How do you say 'thank you' in Spanish?", answers: ["Gracias", "Por favor", "De nada", "Hola"], correctIndex: 0 },
    { question: "What is a taco made with?", answers: ["Tortilla + filling", "Bread + cheese", "Rice + beans", "Pita + meat"], correctIndex: 0 },
    { question: "What holiday celebrates the Day of the Dead?", answers: ["Día de los Muertos", "Cinco de Mayo", "Navidad", "Semana Santa"], correctIndex: 0 },
    { question: "How do you say 'hello' in Spanish?", answers: ["Hola", "Adios", "Gracias", "Buenos"], correctIndex: 0 },
    { question: "What is guacamole made from?", answers: ["Avocado", "Tomato", "Jalapeño", "Lime"], correctIndex: 0 },
    { question: "What is Mexico's national sport?", answers: ["Charreria (rodeo)", "Soccer", "Baseball", "Boxing"], correctIndex: 0 },
  ],
  dance: [
    { question: "Which dance comes from Argentina?", answers: ["Tango", "Salsa", "Flamenco", "Samba"], correctIndex: 0 },
    { question: "What TikTok dance was massively popular in 2020?", answers: ["Renegade", "Floss", "Gangnam Style", "Griddy"], correctIndex: 0 },
    { question: "Who sang 'Shake It Off'?", answers: ["Taylor Swift", "Ariana Grande", "Beyoncé", "Billie Eilish"], correctIndex: 0 },
    { question: "What is the name of Michael Jackson's signature move?", answers: ["Moonwalk", "Slide", "Pop and Lock", "Spin"], correctIndex: 0 },
    { question: "Which country is K-pop from?", answers: ["South Korea", "Japan", "China", "Thailand"], correctIndex: 0 },
    { question: "How many members are in BTS?", answers: ["7", "5", "6", "8"], correctIndex: 0 },
    { question: "What does BPM stand for in music?", answers: ["Beats Per Minute", "Bass Per Measure", "Beats Per Measure", "Bass Per Minute"], correctIndex: 0 },
  ],
  fortnite: [
    { question: "What is the goal in Fortnite Battle Royale?", answers: ["Be the last one standing", "Get 100 kills", "Capture the flag", "Destroy all buildings"], correctIndex: 0 },
    { question: "What do you use to glide down at the start?", answers: ["Glider", "Parachute", "Wings", "Jetpack"], correctIndex: 0 },
    { question: "What is the currency in Fortnite?", answers: ["V-Bucks", "Gold Bars", "Credits", "Coins"], correctIndex: 0 },
    { question: "What is a Victory Royale?", answers: ["Winning the match", "Getting 10 kills", "Completing a quest", "Finding rare loot"], correctIndex: 0 },
    { question: "What does the storm do in Fortnite?", answers: ["Damages players outside the safe zone", "Gives players extra speed", "Hides players", "Destroys buildings"], correctIndex: 0 },
    { question: "What is 'building' used for in Fortnite?", answers: ["Defense and reaching high places", "Healing", "Making weapons", "Earning V-Bucks"], correctIndex: 0 },
    { question: "What is an emote in Fortnite?", answers: ["A dance or expression", "A weapon", "A vehicle", "A special ability"], correctIndex: 0 },
  ],
};

function getFallbackForTopic(topicId, topicLabel, difficulty, count) {
  const base = FALLBACK_QUESTIONS[topicId] || [
    { question: `True or false: the sky is blue?`, answers: ["True", "False", "Sometimes", "Never"], correctIndex: 0 },
  ];
  const result = [];
  for (let i = 0; i < count; i++) {
    const q = { ...base[i % base.length], topic: topicLabel, topicId, difficulty, explanation: "" };
    result.push(q);
  }
  return result;
}

function getRandomTopicId() {
  const realTopics = TOPICS.filter((t) => t.id !== "random");
  return realTopics[Math.floor(Math.random() * realTopics.length)].id;
}

function extractJSON(text) {
  // Try to find and parse JSON from the response
  try {
    // First try direct parse
    return JSON.parse(text);
  } catch {}

  try {
    // Find the outermost { ... } block
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(text.slice(start, end + 1));
    }
  } catch {}

  return null;
}

export async function generateQuestions(selectedTopicIds, difficulty, count = 20) {
  const resolvedTopics = selectedTopicIds.map((id) =>
    id === "random" ? getRandomTopicId() : id
  );

  const uniqueTopics = [...new Set(resolvedTopics)].slice(0, 4);
  if (uniqueTopics.length === 0) uniqueTopics.push("soccer");
  const questionsPerTopic = Math.ceil(count / uniqueTopics.length);

  const allQuestions = [];

  for (const topicId of uniqueTopics) {
    const topicPrompt = TOPIC_PROMPTS[topicId] || topicId;
    const diffDesc = DIFFICULTY_DESCRIPTIONS[difficulty] || DIFFICULTY_DESCRIPTIONS.medium;
    const topicLabel = TOPICS.find((t) => t.id === topicId)?.label || topicId;

    const prompt = `Generate exactly ${questionsPerTopic} unique trivia questions about ${topicPrompt}.
Difficulty: ${diffDesc}.
Rules: unique questions only, plausible wrong answers, shuffle correct answer position.
Return ONLY raw JSON, no markdown, no backticks:
{"questions":[{"question":"?","answers":["A","B","C","D"],"correctIndex":0,"explanation":"...","topic":"${topicLabel}","topicId":"${topicId}","difficulty":"${difficulty}"}]}`;

    let topicQuestions = null;

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 3000 },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const parsed = extractJSON(text);
        if (parsed?.questions?.length > 0) {
          const qs = parsed.questions.map((q) => {
            const correctAnswer = q.answers[q.correctIndex];
            const shuffled = [...q.answers].sort(() => Math.random() - 0.5);
            return { ...q, answers: shuffled, correctIndex: shuffled.indexOf(correctAnswer), topic: topicLabel, topicId, difficulty };
          });
          topicQuestions = qs.slice(0, questionsPerTopic);
        }
      }
    } catch (err) {
      console.error(`Gemini API error for ${topicId}:`, err);
    }

    // Fallback to hardcoded questions if API didn't return valid data
    if (!topicQuestions || topicQuestions.length === 0) {
      topicQuestions = getFallbackForTopic(topicId, topicLabel, difficulty, questionsPerTopic);
    }

    allQuestions.push(...topicQuestions);
  }

  if (allQuestions.length === 0) {
    allQuestions.push(...getFallbackForTopic("soccer", "⚽ Soccer Trivia", difficulty, count));
  }

  return allQuestions.sort(() => Math.random() - 0.5).slice(0, count);
}
