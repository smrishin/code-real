"use strict";

const questionsService = require("../services/questions");

module.exports = {
  async getQuestions(req, res, next) {
    try {
      const exlude_list = req.body?.exclude || [];

      const questions = await questionsService.getQuestionsRandom(exlude_list);

      return res.json(questions);
    } catch (error) {
      console.error(`Error getting the questions: ${err}`);
      return res.status(400).json({
        error: err.message || "Failed to get questions"
      });
    }
  }
};
