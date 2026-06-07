// Additional questions for topic: animals (same shape as the base files)
// Each entry: { correctIndex, en:{question,answers,explanation}, he:{question,answers,explanation} }
// Correct answer is always at index 0 and correctIndex is always 0.
const animals = {
  easy: [
    {
      correctIndex: 0,
      en: { question: "Which animal is famous for its black and white stripes?", answers: ["Zebra", "Lion", "Bear", "Frog"], explanation: "Zebras have unique black and white striped coats." },
      he: { question: "איזו חיה מפורסמת בפסים השחור-לבן שלה?", answers: ["זברה", "אריה", "דוב", "צפרדע"], explanation: "לזברות יש פרווה בפסים שחורים ולבנים ייחודיים." },
    },
    {
      correctIndex: 0,
      en: { question: "What sound does a cat make?", answers: ["Meow", "Woof", "Moo", "Quack"], explanation: "Cats say 'meow' to communicate with people." },
      he: { question: "איזה קול חתול משמיע?", answers: ["מיאו", "האו", "מו", "גע-גע"], explanation: "חתולים אומרים 'מיאו' כדי לתקשר עם אנשים." },
    },
    {
      correctIndex: 0,
      en: { question: "Which animal has a long trunk?", answers: ["Elephant", "Lion", "Rabbit", "Duck"], explanation: "Elephants use their long trunk to grab food and drink water." },
      he: { question: "לאיזו חיה יש חדק ארוך?", answers: ["פיל", "אריה", "ארנב", "ברווז"], explanation: "פילים משתמשים בחדק הארוך שלהם כדי לתפוס אוכל ולשתות מים." },
    },
    {
      correctIndex: 0,
      en: { question: "What do bees make that we can eat?", answers: ["Honey", "Milk", "Cheese", "Bread"], explanation: "Bees collect nectar from flowers to make sweet honey." },
      he: { question: "מה דבורים מייצרות שאנחנו יכולים לאכול?", answers: ["דבש", "חלב", "גבינה", "לחם"], explanation: "דבורים אוספות צוף מפרחים כדי לייצר דבש מתוק." },
    },
    {
      correctIndex: 0,
      en: { question: "Which animal hops and carries its baby in a pouch?", answers: ["Kangaroo", "Cow", "Tiger", "Owl"], explanation: "Kangaroos hop on strong legs and carry their joey in a pouch." },
      he: { question: "איזו חיה מקפצת ונושאת את התינוק שלה בכיס?", answers: ["קנגורו", "פרה", "נמר", "ינשוף"], explanation: "קנגורו מקפץ על רגליים חזקות ונושא את גורו בכיס." },
    },
    {
      correctIndex: 0,
      en: { question: "Where do fish live?", answers: ["In water", "In trees", "Underground", "In the sky"], explanation: "Fish live in water and breathe using their gills." },
      he: { question: "היכן חיים דגים?", answers: ["במים", "על עצים", "מתחת לאדמה", "בשמיים"], explanation: "דגים חיים במים ונושמים באמצעות הזימים שלהם." },
    },
    {
      correctIndex: 0,
      en: { question: "Which bird is known for saying 'hoot' at night?", answers: ["Owl", "Chicken", "Duck", "Turkey"], explanation: "Owls are night birds famous for their 'hoot' sound." },
      he: { question: "איזו ציפור ידועה בכך שהיא 'מייללת' בלילה?", answers: ["ינשוף", "תרנגולת", "ברווז", "תרנגול הודו"], explanation: "ינשופים הם ציפורי לילה המפורסמות בקול ההמיה שלהן." },
    },
    {
      correctIndex: 0,
      en: { question: "What do rabbits especially love to eat?", answers: ["Carrots", "Meat", "Fish", "Candy"], explanation: "Rabbits enjoy munching on carrots and other vegetables." },
      he: { question: "מה ארנבים אוהבים לאכול במיוחד?", answers: ["גזר", "בשר", "דגים", "ממתקים"], explanation: "ארנבים נהנים לכרסם גזר וירקות אחרים." },
    },
    {
      correctIndex: 0,
      en: { question: "Which animal is the 'king of the jungle'?", answers: ["Lion", "Mouse", "Pig", "Sheep"], explanation: "The lion is often called the king of the jungle." },
      he: { question: "איזו חיה היא 'מלך החיות'?", answers: ["אריה", "עכבר", "חזיר", "כבשה"], explanation: "האריה מכונה לעיתים קרובות מלך החיות." },
    },
    {
      correctIndex: 0,
      en: { question: "What covers most of a bird's body?", answers: ["Feathers", "Scales", "Fur", "Shells"], explanation: "Birds are covered in feathers, which help them fly and stay warm." },
      he: { question: "מה מכסה את רוב גופה של ציפור?", answers: ["נוצות", "קשקשים", "פרווה", "צדפים"], explanation: "ציפורים מכוסות בנוצות, שעוזרות להן לעוף ולהישאר חמות." },
    },
    {
      correctIndex: 0,
      en: { question: "Which animal is known for being very slow?", answers: ["Snail", "Cheetah", "Rabbit", "Horse"], explanation: "Snails move very slowly, carrying their shell on their back." },
      he: { question: "איזו חיה ידועה בכך שהיא איטית מאוד?", answers: ["חילזון", "צ'יטה", "ארנב", "סוס"], explanation: "חלזונות נעים לאט מאוד, ונושאים את הקונכייה שלהם על הגב." },
    },
    {
      correctIndex: 0,
      en: { question: "What do you call a baby cat?", answers: ["Kitten", "Puppy", "Calf", "Chick"], explanation: "A baby cat is called a kitten." },
      he: { question: "איך קוראים לגור של חתול?", answers: ["חתלתול", "גור כלבים", "עגל", "אפרוח"], explanation: "לגור של חתול קוראים חתלתול." },
    },
    {
      correctIndex: 0,
      en: { question: "Which farm animal gives us wool?", answers: ["Sheep", "Cow", "Chicken", "Horse"], explanation: "Sheep grow thick wool that is sheared to make warm clothes." },
      he: { question: "איזו חיית משק נותנת לנו צמר?", answers: ["כבשה", "פרה", "תרנגולת", "סוס"], explanation: "כבשים מגדלות צמר עבה שנגזז כדי לייצר בגדים חמים." },
    },
  ],
  medium: [
    {
      correctIndex: 0,
      en: { question: "Which is the largest land animal alive today?", answers: ["African elephant", "Hippopotamus", "Rhinoceros", "Giraffe"], explanation: "The African elephant is the biggest living land animal." },
      he: { question: "מהי החיה היבשתית הגדולה ביותר החיה כיום?", answers: ["פיל אפריקני", "היפופוטם", "קרנף", "ג'ירפה"], explanation: "הפיל האפריקני הוא החיה היבשתית החיה הגדולה ביותר." },
    },
    {
      correctIndex: 0,
      en: { question: "What is a group of crows called?", answers: ["A murder", "A pride", "A pod", "A swarm"], explanation: "A group of crows is famously called a 'murder'." },
      he: { question: "איך נקראת קבוצת עורבים?", answers: ["להקה (murder)", "גאווה", "להקת לווייתנים", "נחיל"], explanation: "קבוצת עורבים נקראת באנגלית 'murder'." },
    },
    {
      correctIndex: 0,
      en: { question: "Which animal is famous for its excellent memory?", answers: ["Elephant", "Goldfish", "Chicken", "Frog"], explanation: "Elephants are known for remarkable long-term memory." },
      he: { question: "איזו חיה מפורסמת בזיכרון המצוין שלה?", answers: ["פיל", "דג זהב", "תרנגולת", "צפרדע"], explanation: "פילים ידועים בזיכרון ארוך טווח יוצא דופן." },
    },
    {
      correctIndex: 0,
      en: { question: "How do dolphins mainly find food in murky water?", answers: ["Echolocation", "Smell", "Taste", "Touch"], explanation: "Dolphins use echolocation, sending out clicks to locate prey." },
      he: { question: "כיצד דולפינים מאתרים מזון בעיקר במים עכורים?", answers: ["איכון הד (אקולוקציה)", "ריח", "טעם", "מגע"], explanation: "דולפינים משתמשים באיכון הד, ושולחים נקישות כדי לאתר טרף." },
    },
    {
      correctIndex: 0,
      en: { question: "Which animal can regrow a lost tail or limb?", answers: ["Lizard", "Dog", "Horse", "Eagle"], explanation: "Many lizards can regrow their tail after losing it to a predator." },
      he: { question: "איזו חיה יכולה לגדל מחדש זנב או גף שאיבדה?", answers: ["לטאה", "כלב", "סוס", "נשר"], explanation: "לטאות רבות יכולות לגדל מחדש את זנבן לאחר שאיבדו אותו לטורף." },
    },
    {
      correctIndex: 0,
      en: { question: "What is the largest big cat in the world?", answers: ["Tiger", "Lion", "Leopard", "Jaguar"], explanation: "Tigers are the biggest of all the big cats." },
      he: { question: "מהו החתול הגדול הגדול ביותר בעולם?", answers: ["נמר (טיגריס)", "אריה", "ברדלס נקוד", "יגואר"], explanation: "טיגריסים הם הגדולים מבין כל החתולים הגדולים." },
    },
    {
      correctIndex: 0,
      en: { question: "Which animal sleeps hanging upside down?", answers: ["Bat", "Owl", "Squirrel", "Mouse"], explanation: "Bats roost and sleep hanging upside down by their feet." },
      he: { question: "איזו חיה ישנה תלויה הפוך?", answers: ["עטלף", "ינשוף", "סנאי", "עכבר"], explanation: "עטלפים נחים וישנים תלויים הפוך על רגליהם." },
    },
    {
      correctIndex: 0,
      en: { question: "What do you call an animal that eats only plants?", answers: ["Herbivore", "Carnivore", "Predator", "Scavenger"], explanation: "A herbivore is an animal that eats only plants." },
      he: { question: "איך קוראים לחיה שאוכלת רק צמחים?", answers: ["אוכל עשב (צמחוני)", "טורף בשר", "טורף", "אוכל נבלות"], explanation: "אוכל עשב הוא בעל חיים שאוכל רק צמחים." },
    },
    {
      correctIndex: 0,
      en: { question: "Which sea animal is known for having eight arms?", answers: ["Octopus", "Starfish", "Crab", "Seahorse"], explanation: "An octopus has eight flexible arms covered with suckers." },
      he: { question: "איזו חיית ים ידועה בכך שיש לה שמונה זרועות?", answers: ["תמנון", "כוכב ים", "סרטן", "סוסון ים"], explanation: "לתמנון יש שמונה זרועות גמישות מכוסות בפיות יניקה." },
    },
    {
      correctIndex: 0,
      en: { question: "What is the main food of a giant panda?", answers: ["Bamboo", "Fish", "Meat", "Insects"], explanation: "Giant pandas eat mostly bamboo for many hours each day." },
      he: { question: "מהו המזון העיקרי של פנדה ענקית?", answers: ["במבוק", "דגים", "בשר", "חרקים"], explanation: "פנדות ענקיות אוכלות בעיקר במבוק במשך שעות רבות בכל יום." },
    },
    {
      correctIndex: 0,
      en: { question: "Which bird famously cannot fly but can swim very well?", answers: ["Penguin", "Robin", "Parrot", "Crow"], explanation: "Penguins cannot fly but are excellent swimmers underwater." },
      he: { question: "איזו ציפור ידועה בכך שאינה יכולה לעוף אך שוחה היטב?", answers: ["פינגווין", "אדום החזה", "תוכי", "עורב"], explanation: "פינגווינים אינם יכולים לעוף אך הם שחיינים מצוינים מתחת למים." },
    },
    {
      correctIndex: 0,
      en: { question: "What do we call animals that are awake at night and sleep during the day?", answers: ["Nocturnal", "Diurnal", "Migratory", "Aquatic"], explanation: "Nocturnal animals are active at night and rest in the daytime." },
      he: { question: "איך אנחנו קוראים לחיות שערות בלילה וישנות ביום?", answers: ["ליליות", "יומיות", "נודדות", "מימיות"], explanation: "חיות ליליות פעילות בלילה ונחות בשעות היום." },
    },
    {
      correctIndex: 0,
      en: { question: "Which animal is the tallest in Africa and eats leaves from tall trees?", answers: ["Giraffe", "Lion", "Zebra", "Hyena"], explanation: "Giraffes use their long necks to reach leaves high in the trees." },
      he: { question: "איזו חיה היא הגבוהה ביותר באפריקה ואוכלת עלים מעצים גבוהים?", answers: ["ג'ירפה", "אריה", "זברה", "צבוע"], explanation: "ג'ירפות משתמשות בצוואר הארוך שלהן כדי להגיע לעלים גבוהים בעצים." },
    },
  ],
  hard: [
    {
      correctIndex: 0,
      en: { question: "Which mammal lays eggs instead of giving birth to live young?", answers: ["Platypus", "Kangaroo", "Bat", "Dolphin"], explanation: "The platypus is one of the few egg-laying mammals (monotremes)." },
      he: { question: "איזה יונק מטיל ביצים במקום ללדת ולדות חיים?", answers: ["ברווזן (פלטיפוס)", "קנגורו", "עטלף", "דולפין"], explanation: "הברווזן הוא אחד היונקים הבודדים שמטילים ביצים (חדכי-נקב)." },
    },
    {
      correctIndex: 0,
      en: { question: "What is the only big cat that genuinely loves to swim?", answers: ["Tiger", "Lion", "Cheetah", "Leopard"], explanation: "Tigers are strong swimmers and often cool off in water." },
      he: { question: "מהו החתול הגדול היחיד שבאמת אוהב לשחות?", answers: ["נמר (טיגריס)", "אריה", "ברדלס", "נמר נקוד"], explanation: "טיגריסים הם שחיינים חזקים ולעיתים קרובות מתקררים במים." },
    },
    {
      correctIndex: 0,
      en: { question: "Which creature has three hearts and blue blood, and changes color and texture?", answers: ["Octopus", "Squid", "Jellyfish", "Eel"], explanation: "Octopuses have three hearts, copper-based blue blood, and remarkable camouflage." },
      he: { question: "לאיזה יצור יש שלושה לבבות ודם כחול, והוא משנה צבע ומרקם?", answers: ["תמנון", "דיונון", "מדוזה", "צלופח"], explanation: "לתמנונים יש שלושה לבבות, דם כחול מבוסס נחושת והסוואה מרשימה." },
    },
    {
      correctIndex: 0,
      en: { question: "What is the largest living species of lizard?", answers: ["Komodo dragon", "Iguana", "Gila monster", "Monitor gecko"], explanation: "The Komodo dragon can grow over 3 meters long." },
      he: { question: "מהו מין הלטאה החי הגדול ביותר?", answers: ["דרקון קומודו", "איגואנה", "מפלצת גילה", "גקו ענק"], explanation: "דרקון קומודו יכול לגדול לאורך של יותר מ-3 מטרים." },
    },
    {
      correctIndex: 0,
      en: { question: "Which animal has the longest migration of any mammal?", answers: ["Gray whale", "Caribou", "Wildebeest", "Elephant"], explanation: "Gray whales migrate up to about 20,000 km round-trip each year." },
      he: { question: "לאיזה יונק יש ההגירה הארוכה ביותר?", answers: ["לווייתן אפור", "איל הצפון", "גנו", "פיל"], explanation: "לווייתנים אפורים נודדים עד כ-20,000 ק\"מ הלוך ושוב בכל שנה." },
    },
    {
      correctIndex: 0,
      en: { question: "Which insect can lift many times its own body weight?", answers: ["Ant", "Butterfly", "Mosquito", "Moth"], explanation: "Ants are famously strong and can carry many times their own weight." },
      he: { question: "איזה חרק יכול להרים פי כמה ממשקל גופו?", answers: ["נמלה", "פרפר", "יתוש", "עש"], explanation: "נמלים מפורסמות בכוחן ויכולות לשאת פי כמה ממשקל גופן." },
    },
    {
      correctIndex: 0,
      en: { question: "What is a baby kangaroo called?", answers: ["Joey", "Cub", "Calf", "Kit"], explanation: "A baby kangaroo is called a joey and lives in its mother's pouch." },
      he: { question: "איך קוראים לגור של קנגורו?", answers: ["ג'ואי", "גור אריות", "עגל", "גור (kit)"], explanation: "גור של קנגורו נקרא ג'ואי וחי בכיס של אמו." },
    },
    {
      correctIndex: 0,
      en: { question: "Which animal is famous for being able to survive in space-like conditions?", answers: ["Tardigrade", "Cockroach", "Scorpion", "Ant"], explanation: "Tardigrades (water bears) can survive extreme cold, heat, and even the vacuum of space." },
      he: { question: "איזו חיה מפורסמת ביכולת לשרוד בתנאים דמויי חלל?", answers: ["דובון מים (טרדיגרד)", "ג'וק", "עקרב", "נמלה"], explanation: "דובוני מים (טרדיגרדים) יכולים לשרוד קור וחום קיצוניים ואפילו את הריק של החלל." },
    },
    {
      correctIndex: 0,
      en: { question: "Which bird builds the largest nest of any bird?", answers: ["Bald eagle", "Sparrow", "Robin", "Hummingbird"], explanation: "Bald eagles build enormous nests that can weigh over a ton." },
      he: { question: "איזו ציפור בונה את הקן הגדול ביותר מכל הציפורים?", answers: ["עיט קירח", "דרור", "אדום החזה", "יונק הדבש"], explanation: "עיטים קירחים בונים קנים ענקיים שיכולים לשקול יותר מטון." },
    },
    {
      correctIndex: 0,
      en: { question: "What is the term for an animal active at dawn and dusk?", answers: ["Crepuscular", "Nocturnal", "Diurnal", "Hibernating"], explanation: "Crepuscular animals are most active during twilight, at dawn and dusk." },
      he: { question: "מהו המונח לחיה הפעילה עם שחר ובין הערביים?", answers: ["דמדומית", "לילית", "יומית", "מתרדמת"], explanation: "חיות דמדומיות פעילות בעיקר בשעת בין הערביים, עם שחר ועם רדת הלילה." },
    },
    {
      correctIndex: 0,
      en: { question: "Which mammal has the longest gestation (pregnancy) period?", answers: ["Elephant", "Whale", "Horse", "Giraffe"], explanation: "Elephants are pregnant for nearly 22 months, the longest of any land mammal." },
      he: { question: "לאיזה יונק יש תקופת ההיריון הארוכה ביותר?", answers: ["פיל", "לווייתן", "סוס", "ג'ירפה"], explanation: "פילים בהיריון במשך כמעט 22 חודשים, הארוך ביותר מכל יונק יבשתי." },
    },
    {
      correctIndex: 0,
      en: { question: "Which animal produces a venom strong enough to make it one of the deadliest in the sea?", answers: ["Box jellyfish", "Clownfish", "Sea turtle", "Dolphin"], explanation: "The box jellyfish has extremely potent venom and is among the deadliest sea creatures." },
      he: { question: "איזו חיה מייצרת ארס חזק מספיק כדי להפוך אותה לאחת הקטלניות בים?", answers: ["מדוזת קופסה", "דג ליצן", "צב ים", "דולפין"], explanation: "למדוזת הקופסה ארס חזק במיוחד והיא מבין יצורי הים הקטלניים ביותר." },
    },
  ],
};

export default animals;
