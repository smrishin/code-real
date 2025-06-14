"use strict";

const gemini = require("../helpers/gemini");

const getQuestionsRandom = async (excludeList) => {
  try {
    return require("../data/questions.json").slice(0, 2);
    const allQuestions = require("../data/questions.json").filter(
      (q) => !excludeList.includes(q.topic)
    );
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

const createQuestionsWithAI = async (selectedQuestion, companyName) => {
  try {
    let questionInfo = "";

    for (const [key, value] of Object.entries(selectedQuestion)) {
      questionInfo += `\n\t${key}: ${value}`;
    }

    const prompt = `
    Rewrite the following LeetCode question into an ${companyName}-style software engineer interview coding question.
    The core problem, its logic, and its solution MUST remain exactly the same.
    Focus on rephrasing the problem statement to fit typical ${companyName} interview scenarios
    (e.g., related to e-commerce, logistics, data processing for large scale systems, cloud services).
    
    Ensure the rewritten question includes:
    1. A clear, engaging problem statement with a real-world ${companyName}-esque context.
    2. Give the function name and the list of parameters with their types in python and well formatted
    3. At least two concrete **examples** (input and expected output, with a brief explanation in separate lines).
    4. Brief constraints just stating the limitations of input size and if only 1 valid answer exists.
    5. A detailed **explanation** of the problem, including edge cases, clarifying assumptions,
       and any specific considerations for a production environment.
    6. Explicit **constraints** on input size, data types, and typical time/space complexity
       requirements expected in a coding interview (e.g., O(N), O(N log N)).

    Here is the original LeetCode question information:${questionInfo}

    Point 5 and 6 from the above list should be dropdowns

    Please present the output clearly in a markdown format avoiding unnecessary tabs, separating each section with appropriate headings.
    `;

    const response = await gemini.generateContent(prompt);

    return response.text;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getQuestionsRandom,
  createQuestionsWithAI
};
