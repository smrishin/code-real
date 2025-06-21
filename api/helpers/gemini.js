"use strict";

const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

module.exports = {
  async generateContent(prompt) {
    const aiResponse = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });
    return aiResponse;
  }
};
