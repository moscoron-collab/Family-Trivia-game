// Bilingual question bank — base questions + "more" additions, merged per topic.
import soccer from "./soccer.js";
import animals from "./animals.js";
import beauty from "./beauty.js";
import movies from "./movies.js";
import money from "./money.js";
import science from "./science.js";
import family from "./family.js";
import geography from "./geography.js";
import survival from "./survival.js";
import logic from "./logic.js";
import usa from "./usa.js";
import math from "./math.js";
import mexico from "./mexico.js";
import dance from "./dance.js";
import fortnite from "./fortnite.js";

import soccerMore from "./more/soccer.js";
import animalsMore from "./more/animals.js";
import beautyMore from "./more/beauty.js";
import moviesMore from "./more/movies.js";
import moneyMore from "./more/money.js";
import scienceMore from "./more/science.js";
import familyMore from "./more/family.js";
import geographyMore from "./more/geography.js";
import survivalMore from "./more/survival.js";
import logicMore from "./more/logic.js";
import usaMore from "./more/usa.js";
import mathMore from "./more/math.js";
import mexicoMore from "./more/mexico.js";
import danceMore from "./more/dance.js";
import fortniteMore from "./more/fortnite.js";

const merge = (a, b) => ({
  easy: [...(a.easy || []), ...((b && b.easy) || [])],
  medium: [...(a.medium || []), ...((b && b.medium) || [])],
  hard: [...(a.hard || []), ...((b && b.hard) || [])],
});

const questionBank = {
  soccer: merge(soccer, soccerMore),
  animals: merge(animals, animalsMore),
  beauty: merge(beauty, beautyMore),
  movies: merge(movies, moviesMore),
  money: merge(money, moneyMore),
  science: merge(science, scienceMore),
  family: merge(family, familyMore),
  geography: merge(geography, geographyMore),
  survival: merge(survival, survivalMore),
  logic: merge(logic, logicMore),
  usa: merge(usa, usaMore),
  math: merge(math, mathMore),
  mexico: merge(mexico, mexicoMore),
  dance: merge(dance, danceMore),
  fortnite: merge(fortnite, fortniteMore),
};

export default questionBank;
