// Additional questions for topic: movies (same shape as the base files)
const movies = {
  easy: [
    {
      correctIndex: 0,
      en: { question: "What kind of animal is Dumbo?", answers: ["An elephant", "A mouse", "A bird", "A dog"], explanation: "Dumbo is a baby elephant with very big ears who learns to fly!" },
      he: { question: "איזה סוג של חיה הוא דמבו?", answers: ["פיל", "עכבר", "ציפור", "כלב"], explanation: "דמבו הוא פיל תינוק עם אוזניים גדולות מאוד שלומד לעוף!" },
    },
    {
      correctIndex: 0,
      en: { question: "In Frozen, who is Elsa's sister?", answers: ["Anna", "Moana", "Belle", "Aurora"], explanation: "Anna is the brave younger sister who goes to find Elsa." },
      he: { question: "בפרוזן, מי האחות של אלסה?", answers: ["אנה", "מואנה", "בל", "אורורה"], explanation: "אנה היא האחות הצעירה והאמיצה שיוצאת לחפש את אלסה." },
    },
    {
      correctIndex: 0,
      en: { question: "What color is Sulley in Monsters, Inc.?", answers: ["Blue", "Green", "Red", "Yellow"], explanation: "Sulley is a big, furry blue monster with purple spots." },
      he: { question: "באיזה צבע סאלי מהסרט 'מפלצות בע\"מ'?", answers: ["כחול", "ירוק", "אדום", "צהוב"], explanation: "סאלי הוא מפלצת כחולה גדולה ושעירה עם נקודות סגולות." },
    },
    {
      correctIndex: 0,
      en: { question: "What is the name of the puppet who wants to be a real boy?", answers: ["Pinocchio", "Peter Pan", "Aladdin", "Mowgli"], explanation: "Pinocchio's nose grows longer whenever he tells a lie!" },
      he: { question: "מה שמה של הבובה שרוצה להיות ילד אמיתי?", answers: ["פינוקיו", "פיטר פן", "אלאדין", "מוגלי"], explanation: "האף של פינוקיו מתארך בכל פעם שהוא משקר!" },
    },
    {
      correctIndex: 0,
      en: { question: "In Finding Nemo, what is Dory's problem?", answers: ["She forgets things", "She can't swim", "She is afraid of water", "She is too big"], explanation: "Dory has short-term memory loss, so she forgets things quickly." },
      he: { question: "בסרט 'מחפשים את נמו', מה הבעיה של דורי?", answers: ["היא שוכחת דברים", "היא לא יודעת לשחות", "היא מפחדת ממים", "היא גדולה מדי"], explanation: "לדורי יש בעיה בזיכרון לטווח קצר, אז היא שוכחת דברים מהר." },
    },
    {
      correctIndex: 0,
      en: { question: "What animal is Bambi?", answers: ["A deer", "A rabbit", "A skunk", "A fox"], explanation: "Bambi is a young deer who grows up in the forest." },
      he: { question: "איזו חיה הוא במבי?", answers: ["אייל (צבי)", "ארנב", "בואש", "שועל"], explanation: "במבי הוא אייל צעיר שגדל ביער." },
    },
    {
      correctIndex: 0,
      en: { question: "In Aladdin, who lives inside the magic lamp?", answers: ["The Genie", "Jafar", "Abu", "The Sultan"], explanation: "The Genie grants three wishes to whoever rubs the lamp!" },
      he: { question: "באלאדין, מי גר בתוך מנורת הקסמים?", answers: ["הג'יני (השד)", "ג'אפר", "אבו", "הסולטן"], explanation: "הג'יני מגשים שלוש משאלות למי שמשפשף את המנורה!" },
    },
    {
      correctIndex: 0,
      en: { question: "What does Buzz Lightyear say he can do?", answers: ["Fly", "Swim", "Cook", "Sing"], explanation: "Buzz famously says 'To infinity and beyond!' as he tries to fly." },
      he: { question: "מה באז שנת אור אומר שהוא יכול לעשות?", answers: ["לעוף", "לשחות", "לבשל", "לשיר"], explanation: "באז אומר את המשפט המפורסם 'אל האינסוף ומעבר!' כשהוא מנסה לעוף." },
    },
    {
      correctIndex: 0,
      en: { question: "What kind of car is Lightning McQueen?", answers: ["A race car", "A truck", "A bus", "A taxi"], explanation: "Lightning McQueen is a fast red race car in the movie Cars." },
      he: { question: "איזה סוג של מכונית הוא מקווין הבזק?", answers: ["מכונית מירוץ", "משאית", "אוטובוס", "מונית"], explanation: "מקווין הבזק הוא מכונית מירוץ אדומה ומהירה בסרט 'מכוניות'." },
    },
    {
      correctIndex: 0,
      en: { question: "In The Jungle Book, what kind of animal is Baloo?", answers: ["A bear", "A tiger", "A snake", "A monkey"], explanation: "Baloo is a friendly, fun-loving bear who teaches Mowgli." },
      he: { question: "בספר הג'ונגל, איזה סוג של חיה הוא באלו?", answers: ["דוב", "נמר", "נחש", "קוף"], explanation: "באלו הוא דוב ידידותי ושמח שמלמד את מוגלי." },
    },
    {
      correctIndex: 0,
      en: { question: "Who is the cowgirl in Toy Story?", answers: ["Jessie", "Bo Peep", "Dolly", "Barbie"], explanation: "Jessie is the yodeling cowgirl doll and Woody's friend." },
      he: { question: "מי הבוקרת בצעצוע של סיפור?", answers: ["ג'סי", "בו פיפ", "דולי", "ברבי"], explanation: "ג'סי היא בובת הבוקרת שעושה יודל וחברה של וודי." },
    },
    {
      correctIndex: 0,
      en: { question: "What is the name of the ogre's talking donkey friend in Shrek?", answers: ["Donkey", "Puss", "Dragon", "Pinocchio"], explanation: "Donkey is Shrek's loud and funny best friend." },
      he: { question: "מה שמו של חבר החמור המדבר של האוגר בשרק?", answers: ["חמור (דונקי)", "חתול", "דרקון", "פינוקיו"], explanation: "חמור הוא החבר הטוב, הרועש והמצחיק של שרק." },
    },
    {
      correctIndex: 0,
      en: { question: "In Moana, who is the demigod with a magic fishhook?", answers: ["Maui", "Tamatoa", "Chief Tui", "Heihei"], explanation: "Maui is the boastful demigod who joins Moana on her journey." },
      he: { question: "במואנה, מי חצי-האל עם החכה הקסומה?", answers: ["מאווי", "טמטואה", "צ'יף טווי", "הייהיי"], explanation: "מאווי הוא חצי-האל היהיר שמצטרף למואנה במסע שלה." },
    },
  ],
  medium: [
    {
      correctIndex: 0,
      en: { question: "Who directed the movie Titanic?", answers: ["James Cameron", "Steven Spielberg", "Christopher Nolan", "Martin Scorsese"], explanation: "James Cameron directed Titanic (1997) and later Avatar." },
      he: { question: "מי ביים את הסרט טיטניק?", answers: ["ג'יימס קמרון", "סטיבן שפילברג", "כריסטופר נולאן", "מרטין סקורסזה"], explanation: "ג'יימס קמרון ביים את טיטניק (1997) ומאוחר יותר את אווטאר." },
    },
    {
      correctIndex: 0,
      en: { question: "In Harry Potter, what is the name of Harry's pet owl?", answers: ["Hedwig", "Errol", "Crookshanks", "Scabbers"], explanation: "Hedwig is Harry's loyal snowy owl who delivers his mail." },
      he: { question: "בהארי פוטר, מה שם הינשוף של הארי?", answers: ["הדוויג", "אירול", "קרוקשנקס", "סקאברס"], explanation: "הדוויג הוא ינשוף השלג הנאמן של הארי שמביא לו את הדואר." },
    },
    {
      correctIndex: 0,
      en: { question: "Which movie features a young lion named Simba and the song 'Hakuna Matata'?", answers: ["The Lion King", "Madagascar", "Jungle Book", "Tarzan"], explanation: "'Hakuna Matata' means 'no worries' in The Lion King." },
      he: { question: "באיזה סרט מופיע אריה צעיר בשם סימבה והשיר 'הקונה מטטה'?", answers: ["מלך האריות", "מדגסקר", "ספר הג'ונגל", "טרזן"], explanation: "'הקונה מטטה' פירושו 'בלי דאגות' ב'מלך האריות'." },
    },
    {
      correctIndex: 0,
      en: { question: "Who plays Captain Jack Sparrow in Pirates of the Caribbean?", answers: ["Johnny Depp", "Orlando Bloom", "Brad Pitt", "Tom Cruise"], explanation: "Johnny Depp made Captain Jack Sparrow one of cinema's most iconic pirates." },
      he: { question: "מי מגלם את קפטן ג'ק ספארו בשודדי הקריביים?", answers: ["ג'וני דפ", "אורלנדו בלום", "בראד פיט", "טום קרוז"], explanation: "ג'וני דפ הפך את קפטן ג'ק ספארו לאחד השודדים האייקוניים בקולנוע." },
    },
    {
      correctIndex: 0,
      en: { question: "What is the name of the wizard school in Harry Potter?", answers: ["Hogwarts", "Beauxbatons", "Durmstrang", "Ilvermorny"], explanation: "Hogwarts School of Witchcraft and Wizardry is where Harry studies magic." },
      he: { question: "מה שם בית הספר לקוסמים בהארי פוטר?", answers: ["הוגוורטס", "בובאטון", "דורמסטראנג", "אילברמורני"], explanation: "בית הספר הוגוורטס לכישוף ולקוסמות הוא המקום שבו הארי לומד קסמים." },
    },
    {
      correctIndex: 0,
      en: { question: "Which animated movie features a rat who wants to be a chef?", answers: ["Ratatouille", "Ratating", "Up", "Cars"], explanation: "In Ratatouille, Remy the rat dreams of cooking in a Paris restaurant." },
      he: { question: "איזה סרט אנימציה מציג עכברוש שרוצה להיות שף?", answers: ["רטטוי", "ראטינג", "למעלה", "מכוניות"], explanation: "ב'רטטוי', העכברוש רמי חולם לבשל במסעדה בפריז." },
    },
    {
      correctIndex: 0,
      en: { question: "Who is the main villain in the original Star Wars trilogy?", answers: ["Darth Vader", "Yoda", "Han Solo", "Chewbacca"], explanation: "Darth Vader is the dark-armored villain who is revealed to be Luke's father." },
      he: { question: "מי הנבל הראשי בטרילוגיית מלחמת הכוכבים המקורית?", answers: ["דארת' ויידר", "יודה", "האן סולו", "צ'ובאקה"], explanation: "דארת' ויידר הוא הנבל בשריון השחור שמתגלה כאביו של לוק." },
    },
    {
      correctIndex: 0,
      en: { question: "In which movie does a boy get left 'Home Alone' during Christmas?", answers: ["Home Alone", "Elf", "The Grinch", "Jingle All the Way"], explanation: "In Home Alone (1990), Kevin defends his house from two burglars." },
      he: { question: "באיזה סרט ילד נשאר 'לבד בבית' בחג המולד?", answers: ["לבד בבית", "אלף", "הגרינץ'", "מתנה ברגע האחרון"], explanation: "ב'לבד בבית' (1990), קווין מגן על הבית שלו משני פורצים." },
    },
    {
      correctIndex: 0,
      en: { question: "Who voices the donkey in the Shrek movies?", answers: ["Eddie Murphy", "Mike Myers", "Antonio Banderas", "Chris Rock"], explanation: "Eddie Murphy gave Donkey his fast-talking, funny personality." },
      he: { question: "מי מדבב את החמור בסרטי שרק?", answers: ["אדי מרפי", "מייק מאיירס", "אנטוניו בנדרס", "כריס רוק"], explanation: "אדי מרפי העניק לחמור את האישיות המצחיקה והמדברת-מהר שלו." },
    },
    {
      correctIndex: 0,
      en: { question: "What is the name of the fictional African country in Black Panther?", answers: ["Wakanda", "Zamunda", "Genovia", "Sokovia"], explanation: "Wakanda is the technologically advanced nation hidden in Africa." },
      he: { question: "מה שם המדינה האפריקאית הבדיונית בסרט 'הפנתר השחור'?", answers: ["וואקנדה", "זמונדה", "ג'נוביה", "סוקוביה"], explanation: "וואקנדה היא אומה מתקדמת טכנולוגית שמוסתרת באפריקה." },
    },
    {
      correctIndex: 0,
      en: { question: "Which movie series features a young wizard battling Lord Voldemort?", answers: ["Harry Potter", "The Hobbit", "Narnia", "Percy Jackson"], explanation: "Harry Potter spends the series fighting the dark wizard Voldemort." },
      he: { question: "איזו סדרת סרטים מציגה קוסם צעיר שנלחם בלורד וולדמורט?", answers: ["הארי פוטר", "ההוביט", "נרניה", "פרסי ג'קסון"], explanation: "הארי פוטר נלחם לאורך הסדרה בקוסם האפל וולדמורט." },
    },
    {
      correctIndex: 0,
      en: { question: "Who directed the 1994 film The Lion King's reboot in 2019 (photorealistic version)?", answers: ["Jon Favreau", "Tim Burton", "Guy Ritchie", "Niki Caro"], explanation: "Jon Favreau directed the 2019 photorealistic remake of The Lion King." },
      he: { question: "מי ביים את גרסת 2019 (הפוטו-ריאליסטית) של מלך האריות?", answers: ["ג'ון פברו", "טים ברטון", "גאי ריצ'י", "ניקי קארו"], explanation: "ג'ון פברו ביים את הרימייק הפוטו-ריאליסטי של מלך האריות מ-2019." },
    },
    {
      correctIndex: 0,
      en: { question: "In the movie Up, what lifts the house into the sky?", answers: ["Balloons", "A helicopter", "A rocket", "A crane"], explanation: "Thousands of colorful helium balloons lift Carl's house into the air." },
      he: { question: "בסרט 'למעלה', מה מרים את הבית לשמיים?", answers: ["בלונים", "מסוק", "טיל", "מנוף"], explanation: "אלפי בלוני הליום צבעוניים מרימים את הבית של קארל לאוויר." },
    },
  ],
  hard: [
    {
      correctIndex: 0,
      en: { question: "Who directed the 1972 film The Godfather?", answers: ["Francis Ford Coppola", "Martin Scorsese", "Stanley Kubrick", "Sidney Lumet"], explanation: "Francis Ford Coppola directed The Godfather, widely seen as one of the greatest films ever." },
      he: { question: "מי ביים את הסרט 'הסנדק' מ-1972?", answers: ["פרנסיס פורד קופולה", "מרטין סקורסזה", "סטנלי קובריק", "סידני לומט"], explanation: "פרנסיס פורד קופולה ביים את 'הסנדק', שנחשב לאחד הסרטים הגדולים בכל הזמנים." },
    },
    {
      correctIndex: 0,
      en: { question: "Which film won the Academy Award for Best Picture in 2023 (for the year 2022)?", answers: ["Everything Everywhere All at Once", "The Banshees of Inisherin", "Top Gun: Maverick", "The Fabelmans"], explanation: "Everything Everywhere All at Once won 7 Oscars including Best Picture." },
      he: { question: "איזה סרט זכה בפרס האוסקר לסרט הטוב ביותר ב-2023 (עבור שנת 2022)?", answers: ["הכול בכל מקום בבת אחת", "הבנשי של אינישרין", "טופ גאן: מאבריק", "הפבלמנים"], explanation: "'הכול בכל מקום בבת אחת' זכה ב-7 פרסי אוסקר כולל הסרט הטוב ביותר." },
    },
    {
      correctIndex: 0,
      en: { question: "Who directed Pulp Fiction (1994)?", answers: ["Quentin Tarantino", "Robert Rodriguez", "David Fincher", "Joel Coen"], explanation: "Quentin Tarantino's Pulp Fiction won the Palme d'Or at Cannes." },
      he: { question: "מי ביים את 'ספרות זולה' (פאלפ פיקשן) מ-1994?", answers: ["קוונטין טרנטינו", "רוברט רודריגז", "דייוויד פינצ'ר", "ג'ואל כהן"], explanation: "'ספרות זולה' של קוונטין טרנטינו זכה בדקל הזהב בקאן." },
    },
    {
      correctIndex: 0,
      en: { question: "Which actress has won the most competitive Academy Awards for acting (4 wins)?", answers: ["Katharine Hepburn", "Meryl Streep", "Bette Davis", "Frances McDormand"], explanation: "Katharine Hepburn won four Best Actress Oscars, the most for an actor." },
      he: { question: "איזו שחקנית זכתה במספר הגדול ביותר של פרסי אוסקר תחרותיים על משחק (4 זכיות)?", answers: ["קתרין הפבורן", "מריל סטריפ", "בט דייוויס", "פרנסס מקדורמנד"], explanation: "קתרין הפבורן זכתה בארבעה פרסי אוסקר לשחקנית הראשית, המספר הגבוה ביותר לשחקן." },
    },
    {
      correctIndex: 0,
      en: { question: "In the movie The Matrix, which pill does Neo take?", answers: ["The red pill", "The blue pill", "The green pill", "The white pill"], explanation: "Neo takes the red pill to learn the truth about the Matrix." },
      he: { question: "בסרט 'מטריקס', איזו גלולה ניאו לוקח?", answers: ["הגלולה האדומה", "הגלולה הכחולה", "הגלולה הירוקה", "הגלולה הלבנה"], explanation: "ניאו לוקח את הגלולה האדומה כדי ללמוד את האמת על המטריקס." },
    },
    {
      correctIndex: 0,
      en: { question: "Who composed the iconic two-note theme for the movie Jaws?", answers: ["John Williams", "Ennio Morricone", "Bernard Herrmann", "Jerry Goldsmith"], explanation: "John Williams's simple, suspenseful Jaws theme won an Academy Award." },
      he: { question: "מי הלחין את נושא שני התווים האייקוני של הסרט 'מלתעות'?", answers: ["ג'ון וויליאמס", "אניו מוריקונה", "ברנרד הרמן", "ג'רי גולדסמית'"], explanation: "הנושא הפשוט והמותח של 'מלתעות' מאת ג'ון וויליאמס זכה בפרס אוסקר." },
    },
    {
      correctIndex: 0,
      en: { question: "Which 1939 film is famous for transitioning from black-and-white to color?", answers: ["The Wizard of Oz", "Gone with the Wind", "Stagecoach", "Wuthering Heights"], explanation: "The Wizard of Oz shifts to Technicolor when Dorothy reaches the Land of Oz." },
      he: { question: "איזה סרט מ-1939 מפורסם במעבר משחור-לבן לצבע?", answers: ["הקוסם מארץ עוץ", "חלף עם הרוח", "כרכרת הדואר", "אנקת גבהים"], explanation: "'הקוסם מארץ עוץ' עובר לטכניקולור כשדורותי מגיעה לארץ עוץ." },
    },
    {
      correctIndex: 0,
      en: { question: "Who directed Inception (2010)?", answers: ["Christopher Nolan", "Denis Villeneuve", "Darren Aronofsky", "Alfonso Cuarón"], explanation: "Christopher Nolan wrote and directed the dream-within-a-dream thriller Inception." },
      he: { question: "מי ביים את 'התחלה' (אינספשן) מ-2010?", answers: ["כריסטופר נולאן", "דני וילנב", "דארן ארונופסקי", "אלפונסו קוארון"], explanation: "כריסטופר נולאן כתב וביים את המותחן 'התחלה' על חלום בתוך חלום." },
    },
    {
      correctIndex: 0,
      en: { question: "What was the first feature-length animated film ever released?", answers: ["Snow White and the Seven Dwarfs", "Pinocchio", "Fantasia", "Bambi"], explanation: "Disney's Snow White (1937) was the first full-length cel-animated feature." },
      he: { question: "מהו סרט האנימציה הראשון באורך מלא שיצא אי פעם?", answers: ["שלגייה ושבעת הגמדים", "פינוקיו", "פנטזיה", "במבי"], explanation: "'שלגייה' של דיסני (1937) היה סרט האנימציה המצוירת הראשון באורך מלא." },
    },
    {
      correctIndex: 0,
      en: { question: "Which director is known for cameo appearances in nearly all of his own suspense films?", answers: ["Alfred Hitchcock", "Stanley Kubrick", "Orson Welles", "Billy Wilder"], explanation: "Alfred Hitchcock famously made brief cameo appearances in most of his films." },
      he: { question: "איזה במאי ידוע בהופעות אורח כמעט בכל סרטי המתח שלו?", answers: ["אלפרד היצ'קוק", "סטנלי קובריק", "אורסון וולס", "בילי ויילדר"], explanation: "אלפרד היצ'קוק ידוע בהופעות אורח קצרות ברוב סרטיו." },
    },
    {
      correctIndex: 0,
      en: { question: "Which film features the character Hannibal Lecter and won Best Picture?", answers: ["The Silence of the Lambs", "Se7en", "Zodiac", "Psycho"], explanation: "The Silence of the Lambs (1991) won all five major Oscar categories." },
      he: { question: "איזה סרט מציג את הדמות האניבל לקטר וזכה בפרס הסרט הטוב ביותר?", answers: ["שתיקת הכבשים", "שבע", "זודיאק", "פסיכו"], explanation: "'שתיקת הכבשים' (1991) זכה בכל חמש קטגוריות האוסקר המרכזיות." },
    },
    {
      correctIndex: 0,
      en: { question: "Who directed the 1968 science-fiction classic 2001: A Space Odyssey?", answers: ["Stanley Kubrick", "Ridley Scott", "George Lucas", "Andrei Tarkovsky"], explanation: "Stanley Kubrick co-wrote and directed 2001: A Space Odyssey with Arthur C. Clarke." },
      he: { question: "מי ביים את קלאסיקת המדע הבדיוני מ-1968 '2001: אודיסיאה בחלל'?", answers: ["סטנלי קובריק", "רידלי סקוט", "ג'ורג' לוקאס", "אנדריי טרקובסקי"], explanation: "סטנלי קובריק כתב יחד עם ארתור סי קלארק וביים את '2001: אודיסיאה בחלל'." },
    },
    {
      correctIndex: 0,
      en: { question: "Which actor played the Joker in 2008's The Dark Knight, winning a posthumous Oscar?", answers: ["Heath Ledger", "Jack Nicholson", "Joaquin Phoenix", "Jared Leto"], explanation: "Heath Ledger won a posthumous Best Supporting Actor Oscar for his Joker." },
      he: { question: "איזה שחקן גילם את הג'וקר ב'האביר האפל' מ-2008 וזכה באוסקר לאחר מותו?", answers: ["הית' לדג'ר", "ג'ק ניקולסון", "ווקין פיניקס", "ג'ארד לטו"], explanation: "הית' לדג'ר זכה בפרס אוסקר לשחקן המשנה הטוב ביותר לאחר מותו על תפקיד הג'וקר." },
    },
  ],
};

export default movies;
