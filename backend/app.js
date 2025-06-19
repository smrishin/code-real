"use strict";

const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", require("./routes"));

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found"
  });
});

if (process.env.NODE_ENV === "localhost") {
  const port = process.env.PORT || 5000;

  app.listen(port);

  console.log(`listening on http://localhost:${port}`);
}

module.exports = app;
