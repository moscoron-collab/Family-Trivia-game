// Bilingual question bank — topic: movies
// Each entry: { correctIndex, en:{question,answers,explanation}, he:{question,answers,explanation} }
// Add more questions by appending entries to easy/medium/hard (keep correct answer at index 0).
const movies = {
  "easy": [
    {
      "correctIndex": 0,
      "en": {
        "question": "Which movie features the character 'Simba'?",
        "answers": [
          "The Lion King",
          "Moana",
          "Frozen",
          "Tarzan"
        ],
        "explanation": "Simba is the lion cub who becomes king in The Lion King!"
      },
      "he": {
        "question": "באיזה סרט מופיעה הדמות 'סימבה'?",
        "answers": [
          "מלך האריות",
          "מואנה",
          "פרוזן",
          "טרזן"
        ],
        "explanation": "סימבה הוא גור האריות שהופך למלך ב'מלך האריות'!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What color is the Hulk?",
        "answers": [
          "Green",
          "Blue",
          "Red",
          "Purple"
        ],
        "explanation": "The Hulk turns green when Bruce Banner gets angry."
      },
      "he": {
        "question": "באיזה צבע ההאלק?",
        "answers": [
          "ירוק",
          "כחול",
          "אדום",
          "סגול"
        ],
        "explanation": "ההאלק הופך לירוק כשברוס באנר כועס."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Who is Mickey Mouse's girlfriend?",
        "answers": [
          "Minnie Mouse",
          "Daisy Duck",
          "Pluto",
          "Goofy"
        ],
        "explanation": "Minnie Mouse has been Mickey's sweetheart since 1928!"
      },
      "he": {
        "question": "מי החברה של מיקי מאוס?",
        "answers": [
          "מיני מאוס",
          "דייזי דאק",
          "פלוטו",
          "גופי"
        ],
        "explanation": "מיני מאוס היא אהובתו של מיקי מאז 1928!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What kind of fish is Nemo?",
        "answers": [
          "Clownfish",
          "Goldfish",
          "Shark",
          "Tuna"
        ],
        "explanation": "Nemo is an orange and white clownfish!"
      },
      "he": {
        "question": "איזה סוג של דג הוא נמו?",
        "answers": [
          "דג ליצן",
          "דג זהב",
          "כריש",
          "טונה"
        ],
        "explanation": "נמו הוא דג ליצן כתום ולבן!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which princess has a glass slipper?",
        "answers": [
          "Cinderella",
          "Snow White",
          "Rapunzel",
          "Ariel"
        ],
        "explanation": "Cinderella leaves her glass slipper at the ball."
      },
      "he": {
        "question": "לאיזו נסיכה יש נעל זכוכית?",
        "answers": [
          "סינדרלה",
          "שלגייה",
          "רפונזל",
          "אריאל"
        ],
        "explanation": "סינדרלה משאירה את נעל הזכוכית שלה בנשף."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What is Shrek?",
        "answers": [
          "An ogre",
          "A dragon",
          "A donkey",
          "A prince"
        ],
        "explanation": "Shrek is a grumpy but lovable green ogre!"
      },
      "he": {
        "question": "מה זה שרק?",
        "answers": [
          "ענק (אוֹגר)",
          "דרקון",
          "חמור",
          "נסיך"
        ],
        "explanation": "שרק הוא אוֹגר ירוק רגזן אך מקסים!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "In Toy Story, what kind of toy is Woody?",
        "answers": [
          "Cowboy",
          "Astronaut",
          "Soldier",
          "Robot"
        ],
        "explanation": "Woody is a pull-string cowboy doll!"
      },
      "he": {
        "question": "בצעצוע של סיפור, איזה סוג של צעצוע הוא וודי?",
        "answers": [
          "בוקר",
          "אסטרונאוט",
          "חייל",
          "רובוט"
        ],
        "explanation": "וודי הוא בובת בוקר עם חוט משיכה!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What is the name of the snowman in Frozen?",
        "answers": [
          "Olaf",
          "Sven",
          "Kristoff",
          "Hans"
        ],
        "explanation": "Olaf is the friendly snowman who loves summer!"
      },
      "he": {
        "question": "מה שמו של איש השלג בפרוזן?",
        "answers": [
          "אולף",
          "סוון",
          "כריסטוף",
          "הנס"
        ],
        "explanation": "אולף הוא איש השלג הידידותי שאוהב את הקיץ!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Who lives in a pineapple under the sea?",
        "answers": [
          "SpongeBob",
          "Patrick",
          "Squidward",
          "Sandy"
        ],
        "explanation": "SpongeBob SquarePants lives in a pineapple in Bikini Bottom!"
      },
      "he": {
        "question": "מי גר באננס מתחת לים?",
        "answers": [
          "בובספוג",
          "פטריק",
          "סקווידוורד",
          "סנדי"
        ],
        "explanation": "בובספוג מכנסמרובע גר באננס בקרקעית ביקיני!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What is the name of the Disney movie about a girl with very long hair?",
        "answers": [
          "Tangled",
          "Frozen",
          "Brave",
          "Moana"
        ],
        "explanation": "Rapunzel has magical long golden hair in Tangled."
      },
      "he": {
        "question": "מה שם סרט דיסני על נערה עם שיער ארוך מאוד?",
        "answers": [
          "מסובך (טאנגלד)",
          "פרוזן",
          "אמיצה",
          "מואנה"
        ],
        "explanation": "לרפונזל יש שיער זהוב ארוך וקסום ב'מסובך'."
      }
    }
  ],
  "medium": [
    {
      "correctIndex": 0,
      "en": {
        "question": "What is the highest-grossing movie of all time?",
        "answers": [
          "Avatar",
          "Avengers: Endgame",
          "Titanic",
          "Star Wars"
        ],
        "explanation": "Avatar (2009) holds the record at over $2.9 billion worldwide."
      },
      "he": {
        "question": "מהו הסרט הכי רווחי בכל הזמנים?",
        "answers": [
          "אווטאר",
          "הנוקמים: סוף המשחק",
          "טיטניק",
          "מלחמת הכוכבים"
        ],
        "explanation": "אווטאר (2009) מחזיק בשיא עם יותר מ-2.9 מיליארד דולר ברחבי העולם."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Who plays Iron Man in the MCU?",
        "answers": [
          "Robert Downey Jr.",
          "Chris Evans",
          "Chris Hemsworth",
          "Mark Ruffalo"
        ],
        "explanation": "RDJ made Iron Man iconic from 2008 to 2019."
      },
      "he": {
        "question": "מי מגלם את איירון מן ביקום הקולנועי של מארוול?",
        "answers": [
          "רוברט דאוני ג'וניור",
          "כריס אוונס",
          "כריס המסוורת'",
          "מארק רופלו"
        ],
        "explanation": "רוברט דאוני ג'וניור הפך את איירון מן לאייקוני מ-2008 עד 2019."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which studio created Toy Story?",
        "answers": [
          "Pixar",
          "DreamWorks",
          "Walt Disney Animation",
          "Illumination"
        ],
        "explanation": "Pixar released Toy Story in 1995 — the first fully CGI movie!"
      },
      "he": {
        "question": "איזה אולפן יצר את 'צעצוע של סיפור'?",
        "answers": [
          "פיקסאר",
          "דרימוורקס",
          "אנימציה של וולט דיסני",
          "אילומיניישן"
        ],
        "explanation": "פיקסאר הוציאה את 'צעצוע של סיפור' ב-1995 — הסרט הראשון שכולו ממוחשב!"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What year was the first Harry Potter movie released?",
        "answers": [
          "2001",
          "1999",
          "2003",
          "2000"
        ],
        "explanation": "Harry Potter and the Philosopher's Stone came out in 2001."
      },
      "he": {
        "question": "באיזו שנה יצא הסרט הראשון של הארי פוטר?",
        "answers": [
          "2001",
          "1999",
          "2003",
          "2000"
        ],
        "explanation": "'הארי פוטר ואבן החכמים' יצא ב-2001."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which movie has the quote 'I'll be back'?",
        "answers": [
          "The Terminator",
          "Rocky",
          "Die Hard",
          "RoboCop"
        ],
        "explanation": "Arnold Schwarzenegger's iconic line from The Terminator (1984)."
      },
      "he": {
        "question": "באיזה סרט נאמר המשפט 'I'll be back' (אני אחזור)?",
        "answers": [
          "שליחות קטלנית (הטרמינטור)",
          "רוקי",
          "מת לחיות",
          "שוטר רובוט"
        ],
        "explanation": "המשפט האייקוני של ארנולד שוורצנגר מ'שליחות קטלנית' (1984)."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Who voices Elsa in Frozen?",
        "answers": [
          "Idina Menzel",
          "Kristen Bell",
          "Demi Lovato",
          "Amy Adams"
        ],
        "explanation": "Idina Menzel also sings 'Let It Go' as Elsa."
      },
      "he": {
        "question": "מי מדבבת את אלסה בפרוזן?",
        "answers": [
          "אידינה מנזל",
          "קריסטן בל",
          "דמי לבאטו",
          "איימי אדמס"
        ],
        "explanation": "אידינה מנזל גם שרה את 'Let It Go' בתפקיד אלסה."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "In which movie does a boy befriend an alien named E.T.?",
        "answers": [
          "E.T. the Extra-Terrestrial",
          "Close Encounters",
          "Star Wars",
          "Alien"
        ],
        "explanation": "Steven Spielberg's E.T. (1982) is a beloved classic."
      },
      "he": {
        "question": "באיזה סרט ילד מתיידד עם חייזר בשם E.T.?",
        "answers": [
          "E.T. החוצן",
          "מפגשים מהסוג השלישי",
          "מלחמת הכוכבים",
          "הנוסע השמיני"
        ],
        "explanation": "'E.T.' של סטיבן שפילברג (1982) הוא קלאסיקה אהובה."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What is the name of Batman's butler?",
        "answers": [
          "Alfred",
          "James",
          "Arthur",
          "Edward"
        ],
        "explanation": "Alfred Pennyworth has been Batman's loyal butler for decades."
      },
      "he": {
        "question": "מה שמו של המשרת של באטמן?",
        "answers": [
          "אלפרד",
          "ג'יימס",
          "ארתור",
          "אדוארד"
        ],
        "explanation": "אלפרד פניוורת' הוא המשרת הנאמן של באטמן כבר עשרות שנים."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which Pixar movie features emotions as characters?",
        "answers": [
          "Inside Out",
          "Soul",
          "Coco",
          "Up"
        ],
        "explanation": "Inside Out features Joy, Sadness, Anger, Fear, and Disgust."
      },
      "he": {
        "question": "איזה סרט של פיקסאר מציג רגשות כדמויות?",
        "answers": [
          "הקול בראש (Inside Out)",
          "נשמה (סול)",
          "קוקו",
          "למעלה (אפ)"
        ],
        "explanation": "'הקול בראש' מציג את שמחה, עצב, כעס, פחד וגועל."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Who directed Jurassic Park?",
        "answers": [
          "Steven Spielberg",
          "James Cameron",
          "George Lucas",
          "Ridley Scott"
        ],
        "explanation": "Spielberg brought dinosaurs to life in the 1993 blockbuster."
      },
      "he": {
        "question": "מי ביים את פארק היורה?",
        "answers": [
          "סטיבן שפילברג",
          "ג'יימס קמרון",
          "ג'ורג' לוקאס",
          "רידלי סקוט"
        ],
        "explanation": "שפילברג הביא את הדינוזאורים לחיים בלהיט מ-1993."
      }
    }
  ],
  "hard": [
    {
      "correctIndex": 0,
      "en": {
        "question": "Who won the first Academy Award for Best Picture?",
        "answers": [
          "Wings (1927)",
          "Sunrise (1927)",
          "The Jazz Singer (1927)",
          "Metropolis (1927)"
        ],
        "explanation": "Wings won the first ever Best Picture at the 1st Academy Awards."
      },
      "he": {
        "question": "מי זכה בפרס האוסקר הראשון לסרט הטוב ביותר?",
        "answers": [
          "כנפיים (1927)",
          "זריחה (1927)",
          "זמר הג'אז (1927)",
          "מטרופוליס (1927)"
        ],
        "explanation": "'כנפיים' זכה בפרס הסרט הטוב ביותר הראשון אי פעם בטקס האוסקר הראשון."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which actor has won the most Oscars?",
        "answers": [
          "Walt Disney (honorary/special)",
          "Katharine Hepburn",
          "Jack Nicholson",
          "Meryl Streep"
        ],
        "explanation": "Walt Disney received 22 competitive Academy Awards."
      },
      "he": {
        "question": "איזה אדם זכה במספר הגדול ביותר של פרסי אוסקר?",
        "answers": [
          "וולט דיסני (כבוד/מיוחד)",
          "קתרין הפבורן",
          "ג'ק ניקולסון",
          "מריל סטריפ"
        ],
        "explanation": "וולט דיסני קיבל 22 פרסי אוסקר תחרותיים."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What was the first movie to gross over $1 billion worldwide?",
        "answers": [
          "Titanic",
          "Jurassic Park",
          "Star Wars",
          "The Lord of the Rings"
        ],
        "explanation": "Titanic (1997) was the first film to cross $1 billion globally."
      },
      "he": {
        "question": "מהו הסרט הראשון שהכניס יותר ממיליארד דולר ברחבי העולם?",
        "answers": [
          "טיטניק",
          "פארק היורה",
          "מלחמת הכוכבים",
          "שר הטבעות"
        ],
        "explanation": "'טיטניק' (1997) היה הסרט הראשון שחצה מיליארד דולר ברחבי העולם."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which horror movie franchise has the most sequels?",
        "answers": [
          "Friday the 13th",
          "Nightmare on Elm Street",
          "Halloween",
          "Saw"
        ],
        "explanation": "Friday the 13th has 12 films in the franchise."
      },
      "he": {
        "question": "לאיזו זיכיון סרטי אימה יש הכי הרבה סרטי המשך?",
        "answers": [
          "יום שישי ה-13",
          "סיוט ברחוב אלם",
          "האלווין",
          "מסור"
        ],
        "explanation": "ל'יום שישי ה-13' יש 12 סרטים בזיכיון."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Who composed the score for Star Wars?",
        "answers": [
          "John Williams",
          "Hans Zimmer",
          "Howard Shore",
          "Danny Elfman"
        ],
        "explanation": "John Williams created one of the most iconic film scores ever."
      },
      "he": {
        "question": "מי הלחין את הפסקול של מלחמת הכוכבים?",
        "answers": [
          "ג'ון וויליאמס",
          "הנס צימר",
          "האוורד שור",
          "דני אלפמן"
        ],
        "explanation": "ג'ון וויליאמס יצר את אחד הפסקולים האייקוניים ביותר אי פעם."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What is the longest mainstream movie ever made?",
        "answers": [
          "Logistics (857 hours)",
          "Gone with the Wind",
          "The Lord of the Rings",
          "Titanic"
        ],
        "explanation": "Logistics (2012) is 857 hours long! (Traditional films: Cleopatra at 4 hrs)"
      },
      "he": {
        "question": "מהו הסרט המסחרי הארוך ביותר שנוצר אי פעם?",
        "answers": [
          "לוגיסטיקה (857 שעות)",
          "חלף עם הרוח",
          "שר הטבעות",
          "טיטניק"
        ],
        "explanation": "'לוגיסטיקה' (2012) אורך 857 שעות! (סרטים מסורתיים: 'קלאופטרה' באורך 4 שעות)"
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "Which 2019 movie won Best Picture despite being in Korean?",
        "answers": [
          "Parasite",
          "Shoplifters",
          "Roma",
          "The Handmaiden"
        ],
        "explanation": "Bong Joon-ho's Parasite made Oscar history as the first non-English Best Picture."
      },
      "he": {
        "question": "איזה סרט מ-2019 זכה בפרס הסרט הטוב ביותר למרות שהוא בקוריאנית?",
        "answers": [
          "פרזיט (טפיל)",
          "גנבי החנויות",
          "רומא",
          "המשרתת"
        ],
        "explanation": "'פרזיט' של בונג ג'ון-הו עשה היסטוריה באוסקר כסרט הזר הראשון שזכה בפרס הסרט הטוב ביותר."
      }
    },
    {
      "correctIndex": 0,
      "en": {
        "question": "What does 'MCU' stand for?",
        "answers": [
          "Marvel Cinematic Universe",
          "Marvel Comics Universe",
          "Marvel Character Universe",
          "Movie Comics Universe"
        ],
        "explanation": "The MCU is the shared universe of Marvel superhero films."
      },
      "he": {
        "question": "מה המשמעות של 'MCU'?",
        "answers": [
          "היקום הקולנועי של מארוול",
          "יקום הקומיקס של מארוול",
          "יקום הדמויות של מארוול",
          "יקום קומיקס הסרטים"
        ],
        "explanation": "ה-MCU הוא היקום המשותף של סרטי גיבורי העל של מארוול."
      }
    }
  ]
};

export default movies;
