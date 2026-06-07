// Bilingual question bank — topic: animals
// Each entry: { correctIndex, en:{question,answers,explanation}, he:{question,answers,explanation} }
// Add more questions by appending entries to easy/medium/hard (keep correct answer at index 0).
const animals = {
  "easy": [
    {
      "correctIndex": 0,
      "en": {
        "question": "What is the largest animal on Earth?",
        "answers": [
          "Blue Whale",
          "Elephant",
          "Giraffe",
          "Great White Shark"
        ],
        "explanation": "Blue whales can be over 100 feet long!"
      },
      "he": {
        "question": "מהו בעל החיים הגדול ביותר עלי אדמות?",
        "answers": [
          "לווייתן כחול",
          "פיל",
          "ג'ירפה",
          "כריש לבן גדול"
        ],
        "explanation": "לווייתנים כחולים יכולים להיות באורך של יותר מ-30 מטר!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "How many legs does a spider have?",
        "answers": [
          "8",
          "6",
          "10",
          "4"
        ],
        "explanation": "All spiders have 8 legs — that's how you tell them apart from insects."
      },
      "he": {
        "question": "כמה רגליים יש לעכביש?",
        "answers": [
          "8",
          "6",
          "10",
          "4"
        ],
        "explanation": "לכל העכבישים יש 8 רגליים — כך מבדילים אותם מחרקים."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What do you call a baby dog?",
        "answers": [
          "Puppy",
          "Kitten",
          "Cub",
          "Foal"
        ],
        "explanation": "Baby dogs are called puppies!"
      },
      "he": {
        "question": "איך קוראים לגור של כלב?",
        "answers": [
          "גור",
          "חתלתול",
          "גור (של אריה)",
          "סייח"
        ],
        "explanation": "לגורי כלבים קוראים גורים!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which animal says 'moo'?",
        "answers": [
          "Cow",
          "Pig",
          "Horse",
          "Sheep"
        ],
        "explanation": "Cows are known for their 'moo' sound."
      },
      "he": {
        "question": "איזו חיה אומרת 'מוּ'?",
        "answers": [
          "פרה",
          "חזיר",
          "סוס",
          "כבשה"
        ],
        "explanation": "פרות ידועות בקול ה'מוּ' שלהן."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What is the tallest animal in the world?",
        "answers": [
          "Giraffe",
          "Elephant",
          "Horse",
          "Camel"
        ],
        "explanation": "Giraffes can be up to 18 feet tall!"
      },
      "he": {
        "question": "מהי החיה הגבוהה ביותר בעולם?",
        "answers": [
          "ג'ירפה",
          "פיל",
          "סוס",
          "גמל"
        ],
        "explanation": "ג'ירפות יכולות להגיע לגובה של עד 5.5 מטר!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Where do penguins live?",
        "answers": [
          "Antarctica",
          "Arctic",
          "Africa",
          "Australia"
        ],
        "explanation": "Most penguins live in Antarctica and the Southern Hemisphere."
      },
      "he": {
        "question": "היכן חיים פינגווינים?",
        "answers": [
          "אנטארקטיקה",
          "הארקטי",
          "אפריקה",
          "אוסטרליה"
        ],
        "explanation": "רוב הפינגווינים חיים באנטארקטיקה ובחצי הכדור הדרומי."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What do butterflies start life as?",
        "answers": [
          "Caterpillars",
          "Worms",
          "Beetles",
          "Flies"
        ],
        "explanation": "Butterflies go through metamorphosis — starting as caterpillars!"
      },
      "he": {
        "question": "כמה הם פרפרים בתחילת חייהם?",
        "answers": [
          "זחלים",
          "תולעים",
          "חיפושיות",
          "זבובים"
        ],
        "explanation": "פרפרים עוברים גלגול (מטמורפוזה) — ומתחילים כזחלים!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "How many legs does an insect have?",
        "answers": [
          "6",
          "8",
          "4",
          "10"
        ],
        "explanation": "All insects have exactly 6 legs."
      },
      "he": {
        "question": "כמה רגליים יש לחרק?",
        "answers": [
          "6",
          "8",
          "4",
          "10"
        ],
        "explanation": "לכל החרקים יש בדיוק 6 רגליים."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which animal is known as man's best friend?",
        "answers": [
          "Dog",
          "Cat",
          "Horse",
          "Parrot"
        ],
        "explanation": "Dogs have been loyal companions to humans for thousands of years."
      },
      "he": {
        "question": "איזו חיה מכונה ידידו הטוב של האדם?",
        "answers": [
          "כלב",
          "חתול",
          "סוס",
          "תוכי"
        ],
        "explanation": "כלבים הם בני לוויה נאמנים לבני אדם כבר אלפי שנים."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What does a caterpillar turn into?",
        "answers": [
          "Butterfly or moth",
          "Beetle",
          "Spider",
          "Dragonfly"
        ],
        "explanation": "Caterpillars transform into butterflies or moths through metamorphosis!"
      },
      "he": {
        "question": "למה הופך זחל?",
        "answers": [
          "פרפר או עש",
          "חיפושית",
          "עכביש",
          "שפירית"
        ],
        "explanation": "זחלים הופכים לפרפרים או לעשים דרך גלגול (מטמורפוזה)!"
      }
    }
  ],
  "medium": [
    {
      "correctIndex": 0,
      "en": {
        "question": "Which animal can change its color to match its surroundings?",
        "answers": [
          "Chameleon",
          "Dolphin",
          "Eagle",
          "Whale"
        ],
        "explanation": "Chameleons change color for camouflage and communication."
      },
      "he": {
        "question": "איזו חיה יכולה לשנות את צבעה כדי להתמזג עם הסביבה?",
        "answers": [
          "זיקית",
          "דולפין",
          "נשר",
          "לווייתן"
        ],
        "explanation": "זיקיות משנות צבע להסוואה ולתקשורת."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What do you call a group of lions?",
        "answers": [
          "Pride",
          "Pack",
          "Herd",
          "Flock"
        ],
        "explanation": "A group of lions is called a pride."
      },
      "he": {
        "question": "איך קוראים לקבוצת אריות?",
        "answers": [
          "להקה (גאווה)",
          "חבורה",
          "עדר",
          "נחיל"
        ],
        "explanation": "קבוצת אריות נקראת להקה."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which is the fastest land animal?",
        "answers": [
          "Cheetah",
          "Lion",
          "Horse",
          "Greyhound"
        ],
        "explanation": "Cheetahs can run up to 70 mph!"
      },
      "he": {
        "question": "מהי החיה היבשתית המהירה ביותר?",
        "answers": [
          "צ'יטה (ברדלס)",
          "אריה",
          "סוס",
          "כלב גרייהאונד"
        ],
        "explanation": "צ'יטות יכולות לרוץ במהירות של עד 110 קמ\"ש!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "How many hearts does an octopus have?",
        "answers": [
          "3",
          "1",
          "2",
          "4"
        ],
        "explanation": "Octopuses have 3 hearts — 2 pump blood to the gills, 1 to the body."
      },
      "he": {
        "question": "כמה לבבות יש לתמנון?",
        "answers": [
          "3",
          "1",
          "2",
          "4"
        ],
        "explanation": "לתמנונים יש 3 לבבות — 2 שואבים דם לזימים, ואחד לגוף."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which bird can fly backwards?",
        "answers": [
          "Hummingbird",
          "Eagle",
          "Sparrow",
          "Penguin"
        ],
        "explanation": "Hummingbirds are the only birds that can fly backwards!"
      },
      "he": {
        "question": "איזו ציפור יכולה לעוף לאחור?",
        "answers": [
          "יונק הדבש",
          "נשר",
          "דרור",
          "פינגווין"
        ],
        "explanation": "יונקי הדבש הם הציפורים היחידות שיכולות לעוף לאחור!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What is the largest species of shark?",
        "answers": [
          "Whale Shark",
          "Great White",
          "Hammerhead",
          "Tiger Shark"
        ],
        "explanation": "Whale sharks can be over 40 feet long but they eat tiny plankton!"
      },
      "he": {
        "question": "מהו מין הכריש הגדול ביותר?",
        "answers": [
          "כריש לווייתני",
          "לבן גדול",
          "פטישן",
          "כריש טיגריס"
        ],
        "explanation": "כרישים לווייתניים יכולים להיות באורך של יותר מ-12 מטר אך הם אוכלים פלנקטון זעיר!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which mammal can fly?",
        "answers": [
          "Bat",
          "Flying squirrel",
          "Sugar glider",
          "Flying fish"
        ],
        "explanation": "Bats are the only mammals capable of true flight."
      },
      "he": {
        "question": "איזה יונק יכול לעוף?",
        "answers": [
          "עטלף",
          "סנאי מעופף",
          "פלאנגר מעופף",
          "דג מעופף"
        ],
        "explanation": "עטלפים הם היונקים היחידים המסוגלים לתעופה אמיתית."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What is a group of wolves called?",
        "answers": [
          "Pack",
          "Flock",
          "Herd",
          "Colony"
        ],
        "explanation": "Wolves live and hunt in packs led by an alpha pair."
      },
      "he": {
        "question": "איך נקראת קבוצת זאבים?",
        "answers": [
          "להקה",
          "נחיל",
          "עדר",
          "מושבה"
        ],
        "explanation": "זאבים חיים וצדים בלהקות בהנהגת זוג אלפא."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "How long can a crocodile hold its breath underwater?",
        "answers": [
          "Up to 2 hours",
          "10 minutes",
          "30 seconds",
          "5 minutes"
        ],
        "explanation": "Crocodiles can hold their breath for up to 2 hours!"
      },
      "he": {
        "question": "כמה זמן יכול תנין לעצור את נשימתו מתחת למים?",
        "answers": [
          "עד שעתיים",
          "10 דקות",
          "30 שניות",
          "5 דקות"
        ],
        "explanation": "תנינים יכולים לעצור את נשימתם עד שעתיים!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which animal has the longest lifespan?",
        "answers": [
          "Tortoise",
          "Elephant",
          "Whale",
          "Parrot"
        ],
        "explanation": "Some tortoises have lived over 180 years!"
      },
      "he": {
        "question": "לאיזו חיה יש תוחלת החיים הארוכה ביותר?",
        "answers": [
          "צב יבשה",
          "פיל",
          "לווייתן",
          "תוכי"
        ],
        "explanation": "כמה צבים חיו יותר מ-180 שנה!"
      }
    }
  ],
  "hard": [
    {
      "correctIndex": 0,
      "en": {
        "question": "What is the fastest bird in a dive?",
        "answers": [
          "Peregrine Falcon",
          "Bald Eagle",
          "Golden Eagle",
          "Swift"
        ],
        "explanation": "Peregrine falcons can reach 240+ mph in a hunting dive!"
      },
      "he": {
        "question": "מהי הציפור המהירה ביותר בצלילה?",
        "answers": [
          "בז נודד",
          "עיט קירח",
          "עיט זהוב",
          "סיס"
        ],
        "explanation": "בזים נודדים יכולים להגיע ליותר מ-380 קמ\"ש בצלילת ציד!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which animal has blue blood?",
        "answers": [
          "Horseshoe Crab",
          "Blue Whale",
          "Blue Jay",
          "Bluebird"
        ],
        "explanation": "Horseshoe crabs have copper-based blood that appears blue."
      },
      "he": {
        "question": "לאיזו חיה יש דם כחול?",
        "answers": [
          "סרטן פרסה",
          "לווייתן כחול",
          "עורבני כחול",
          "ציפור כחולה"
        ],
        "explanation": "לסרטני פרסה יש דם מבוסס נחושת שנראה כחול."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What percentage of ocean species are estimated to be undiscovered?",
        "answers": [
          "Over 80%",
          "About 50%",
          "About 30%",
          "Less than 10%"
        ],
        "explanation": "Scientists estimate over 80% of ocean life remains undiscovered!"
      },
      "he": {
        "question": "כמה אחוזים ממיני האוקיינוס מוערכים כבלתי מתגלים?",
        "answers": [
          "יותר מ-80%",
          "בערך 50%",
          "בערך 30%",
          "פחות מ-10%"
        ],
        "explanation": "מדענים מעריכים שיותר מ-80% מהחיים באוקיינוס עדיין לא התגלו!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which animal sleeps standing up?",
        "answers": [
          "Horse",
          "Cow",
          "Dog",
          "Bear"
        ],
        "explanation": "Horses can lock their legs and sleep standing to escape predators quickly."
      },
      "he": {
        "question": "איזו חיה ישנה בעמידה?",
        "answers": [
          "סוס",
          "פרה",
          "כלב",
          "דוב"
        ],
        "explanation": "סוסים יכולים לנעול את רגליהם ולישון בעמידה כדי לברוח מטורפים במהירות."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What is the only continent with no native reptiles?",
        "answers": [
          "Antarctica",
          "Europe",
          "Australia",
          "Arctic"
        ],
        "explanation": "Antarctica is too cold for any reptiles to survive."
      },
      "he": {
        "question": "מהי היבשת היחידה ללא זוחלים מקומיים?",
        "answers": [
          "אנטארקטיקה",
          "אירופה",
          "אוסטרליה",
          "הארקטי"
        ],
        "explanation": "אנטארקטיקה קרה מדי מכדי שזוחלים ישרדו בה."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "How many species of insects have been discovered?",
        "answers": [
          "Over 1 million",
          "About 500,000",
          "About 100,000",
          "About 10,000"
        ],
        "explanation": "Over 1 million insect species have been identified!"
      },
      "he": {
        "question": "כמה מיני חרקים התגלו?",
        "answers": [
          "יותר ממיליון",
          "בערך 500,000",
          "בערך 100,000",
          "בערך 10,000"
        ],
        "explanation": "יותר ממיליון מיני חרקים זוהו!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which sea creature has the largest brain relative to body size?",
        "answers": [
          "Dolphin",
          "Whale",
          "Octopus",
          "Jellyfish"
        ],
        "explanation": "Dolphins have remarkably large brains for their body size."
      },
      "he": {
        "question": "לאיזה יצור ים יש המוח הגדול ביותר ביחס לגודל גופו?",
        "answers": [
          "דולפין",
          "לווייתן",
          "תמנון",
          "מדוזה"
        ],
        "explanation": "לדולפינים יש מוח גדול במיוחד ביחס לגודל גופם."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What animal produces the loudest sound?",
        "answers": [
          "Sperm Whale",
          "Blue Whale",
          "Howler Monkey",
          "Lion"
        ],
        "explanation": "Sperm whale clicks can reach 230 decibels!"
      },
      "he": {
        "question": "איזו חיה מפיקה את הקול הרם ביותר?",
        "answers": [
          "לווייתן הזרע",
          "לווייתן כחול",
          "קוף מיילל",
          "אריה"
        ],
        "explanation": "נקישות של לווייתן הזרע יכולות להגיע ל-230 דציבל!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which venomous animal kills the most humans annually?",
        "answers": [
          "Mosquito",
          "Snake",
          "Scorpion",
          "Spider"
        ],
        "explanation": "Mosquitoes kill ~700,000 people per year by transmitting diseases like malaria."
      },
      "he": {
        "question": "איזו חיה ארסית הורגת הכי הרבה בני אדם בשנה?",
        "answers": [
          "יתוש",
          "נחש",
          "עקרב",
          "עכביש"
        ],
        "explanation": "יתושים הורגים כ-700,000 בני אדם בשנה בכך שהם מעבירים מחלות כמו מלריה."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What is the smallest mammal in the world?",
        "answers": [
          "Bumblebee Bat",
          "Pygmy Shrew",
          "Mouse Lemur",
          "Hamster"
        ],
        "explanation": "The bumblebee bat weighs about 2 grams!"
      },
      "he": {
        "question": "מהו היונק הקטן ביותר בעולם?",
        "answers": [
          "עטלף הדבורה",
          "חדף ננסי",
          "למור עכבר",
          "אוגר"
        ],
        "explanation": "עטלף הדבורה שוקל בערך 2 גרם!"
      }
    }
  ]
};

export default animals;
