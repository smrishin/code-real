"use strict";

const getQuestionsRandom = async (exludeList) => {
  try {
    const allQuestions = require("../data/questions.json");
    const nothard = allQuestions.filter((q) => q.difficulty !== "Hard");
    const hard = allQuestions.filter((q) => q.difficulty === "Hard");

    if (hard.length > 0 && Math.random() < 0.5) {
      // Pick one hard question
      const idx = Math.floor(Math.random() * hard.length);
      return [hard[idx]];
    } else {
      // Pick two easy/medium questions
      const shuffled = nothard.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 2);
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getQuestionsRandom
};
