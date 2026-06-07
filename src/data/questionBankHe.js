// ============================================================
// Hebrew Question Bank — full translation of questionBank.js
// Assembled from three translated parts (same structure as the
// English bank): topic → difficulty → questions array.
// ============================================================

import part1 from "./he/part1"; // soccer, animals, beauty, movies, money
import part2 from "./he/part2"; // science, family, geography, survival, logic
import part3 from "./he/part3"; // usa, math, mexico, dance, fortnite

const questionBankHe = { ...part1, ...part2, ...part3 };

export default questionBankHe;
