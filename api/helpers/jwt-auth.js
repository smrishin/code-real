"use strict";

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../data/user.json");
const { AUTH_TOKEN_EXPIRY } = require("../constants");

const generateHashedPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const createUser = (user) => {
  const existingUser = users.find((u) => u.email === user.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = generateHashedPassword(user.password);
  const newUser = { id: users.length + 1, email: user.email, name: user.name };

  users.push({ ...newUser, password: hashedPassword });

  fs.writeFileSync(
    path.join(__dirname, "../data/user.json"),
    JSON.stringify(users, null, 2)
  );

  return newUser;
};

const validateUserSignIn = (email, password) => {
  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new Error("Invalid email");
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  delete user.password;

  return user;
};

const generateToken = (email, password) => {
  try {
    const user = validateUserSignIn(email, password);

    const token = jwt.sign({ sub: user.id, ...user }, process.env.JWT_SECRET, {
      expiresIn: AUTH_TOKEN_EXPIRY
    });

    return { user, token };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const verifyLogin = (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      throw new Error("Unauthorized");
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    res.status(401).json({ message: error.message });
  }
};

module.exports = { createUser, generateToken, verifyLogin };
