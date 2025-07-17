"use strict";

const { generateToken, createUser } = require("../helpers/jwt-auth");

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = createUser({ email, password, name });
    res.status(201).json({ user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = generateToken(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };
