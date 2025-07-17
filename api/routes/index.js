"use strict";

const express = require("express");
const router = express.Router();
const { verifyLogin } = require("../helpers/jwt-auth");

/**
 * Status
 */
router.get("/status", (req, res) => {
  return res.json("SUCCESS");
});

/**
 * Auth
 */
router.post("/auth/login", require("./auth").login);
router.post("/auth/register", require("./auth").register);

/**
 * Questions
 */
router.post("/questions", verifyLogin, require("./questions").getQuestions);

module.exports = router;
