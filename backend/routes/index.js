"use strict";

const express = require("express");
const router = express.Router();

router.get("/status", async (req, res) => {
  return res.json("SUCCESS");
});

router.get("/questions", require("./questions").getQuestions);

module.exports = router;
