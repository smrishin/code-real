"use strict";

const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", require("./routes"));

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found"
  });
});

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV === "localhost" || !process.env.VERCEL) {
  app.listen(PORT, () =>
    console.log(`App running on http://localhost:${PORT}`)
  );
}

module.exports = app;
