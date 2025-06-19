"use strict";

const { GoogleGenAI } = require("@google/genai");

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenAI({ apiKey: apiKey });

module.exports = {
  async generateContent(prompt) {
    const aiResponse = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });
    return aiResponse;
  }
};
