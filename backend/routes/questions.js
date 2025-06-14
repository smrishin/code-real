"use strict";

const {
  getQuestionsRandom,
  createQuestionsWithAI
} = require("../services/questions");

module.exports = {
  async getQuestions(req, res, next) {
    try {
      const exclude = req.query["exclude[]"];
      const excludeList = Array.isArray(exclude)
        ? exclude
        : exclude
        ? [exclude]
        : [];

      const companyName = req.query.company || "Amazon";

      const selectedQuestions = await getQuestionsRandom(excludeList);

      await Promise.allSettled(
        selectedQuestions.map(async (q) => {
          const raw = await createQuestionsWithAI(q, companyName);
          const cleanedMarkdown = raw
            .replace(/^```markdown\n/, "")
            .replace(/```$/, "")
            .replace(/\\n/g, "\n")
            .replace(/\\"/g, '"');

          q["question"] = cleanedMarkdown;
        })
      );

      return res.json(selectedQuestions);
    } catch (err) {
      console.error(`Error getting the questions: ${err}`);
      return res.status(400).json({
        error: err.message || "Failed to get questions"
      });
    }
  }
};
