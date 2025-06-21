"use strict";

const gemini = require("../helpers/gemini");
const {
  MAX_QUESTIONS,
  DIFFICULTY,
  TOPICS,
  COMPANIES,
  QUESTION_PROMPT_TO_AI
} = require("../constants");

const validateInput = (payload) => {
  if (
    payload.noOfQuestions &&
    (payload.noOfQuestions < 1 || payload.noOfQuestions > MAX_QUESTIONS)
  ) {
    throw new Error(`noOfQuestions must be between 1 and ${MAX_QUESTIONS}`);
  }

  if (
    payload.difficulty &&
    (payload.difficulty.length > 3 ||
      !payload.difficulty.every((d) => DIFFICULTY.includes(d)))
  ) {
    throw new Error(`Difficulty must be one of ${DIFFICULTY.join(", ")}`);
  }

  if (
    payload.topics &&
    (payload.topics.length > TOPICS.length ||
      !payload.topics.every((t) => TOPICS.includes(t)))
  ) {
    throw new Error(`Topics must be one of ${TOPICS.join(", ")}`);
  }

  if (payload.company && !COMPANIES.includes(payload.company)) {
    throw new Error(`Company must be one of ${COMPANIES.join(", ")}`);
  }
};

const getQuestionsRandom = async (noOfQuestions, difficulty, topics) => {
  const filteredQuestions = require("../data/questions.json").filter(
    (q) =>
      (difficulty && difficulty.length > 0
        ? difficulty.includes(q.difficulty)
        : true) &&
      (topics && topics.length > 0 ? topics.includes(q.topic) : true)
  );

  const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, noOfQuestions);
};

const createQuestionsWithAI = async (selectedQuestion, companyName) => {
  const questionInfo = Object.entries(selectedQuestion)
    .map(([key, value]) => `\n\t${key}: ${value}`)
    .join("");

  const prompt = QUESTION_PROMPT_TO_AI(companyName, questionInfo);

  const response = await gemini.generateContent(prompt);

  return response.text;
};

module.exports = {
  getQuestionsRandom,
  createQuestionsWithAI,
  validateInput
};
