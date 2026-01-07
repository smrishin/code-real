"use strict";

const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function compareFlashVersion(a, b) {
  const parse = (name) => {
    const match = name.match(/^gemini-(\d+)(?:\.(\d+))?-flash/);
    console.log(match);
    return [Number(match[1]), Number(match[2] ?? 0)];
  };

  const [aMaj, aMin] = parse(a);
  const [bMaj, bMin] = parse(b);

  if (aMaj !== bMaj) return bMaj - aMaj;
  return bMin - aMin;
}

module.exports = {
  async getLatestFlashModel() {
    const models = await genAI.models.list();

    const flashModels = [];

    for await (const model of models) {
      // console.log(`- ID: ${model.name.replace("models/", "")}`);
      // console.log(`  Display Name: ${model.displayName}`);
      // console.log(`  Description: ${model.description}`);
      // console.log(`  Supported Actions: ${model.supportedActions.join(", ")}`);
      // console.log("---");

      if (model.supportedActions.includes("generateContent")) {
        const modelName = model.name.replace("models/", "");
        const match = modelName.match(/^gemini-(\d+)(?:\.(\d+))?-flash/);
        if (match) flashModels.push(modelName);
      }
    }

    if (flashModels.length === 0) {
      return "gemini-2.5-flash";
    }

    flashModels.sort(compareFlashVersion);

    return flashModels[0];
  },

  async generateContent(prompt) {
    const model = await this.getLatestFlashModel();
    const aiResponse = await genAI.models.generateContent({
      model,
      contents: prompt
    });
    return aiResponse;
  }
};
