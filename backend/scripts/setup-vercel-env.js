#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// Environment variables to set in Vercel
const envVars = ["GEMINI_API_KEY", "QUESTIONS_SECRET_CODE"];

console.log("Setting up Vercel environment variables...");

// Always set NODE_ENV to production for Vercel deployment
try {
  console.log(`Setting NODE_ENV to production for Vercel...`);
  execSync(`vercel env add NODE_ENV production`, {
    input: "production",
    stdio: ["pipe", "pipe", "pipe"]
  });
  console.log(`✅ NODE_ENV set to production successfully`);
} catch (error) {
  console.log(
    `⚠️  NODE_ENV might already be set or there was an error:`,
    error.message
  );
}

envVars.forEach((envVar) => {
  const value = process.env[envVar];
  if (value) {
    try {
      console.log(`Setting ${envVar}...`);
      execSync(`vercel env add ${envVar} production`, {
        input: value,
        stdio: ["pipe", "pipe", "pipe"]
      });
      console.log(`✅ ${envVar} set successfully`);
    } catch (error) {
      console.log(
        `⚠️  ${envVar} might already be set or there was an error:`,
        error.message
      );
    }
  } else {
    console.log(`⚠️  ${envVar} not found in .env file`);
  }
});

console.log("Environment setup complete!");
