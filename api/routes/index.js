"use strict";

const express = require("express");
const router = express.Router();

router.get("/status", (req, res) => {
  return res.json("SUCCESS");
});

router.post("/questions", require("./questions").getQuestions);

module.exports = router;
