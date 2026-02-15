"use strict";

// Authentication: Password Hashing and JWT - Reference Solution

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const users = [];
let nextId = 1;

function validatePassword(password) {
  if (typeof password !== "string" || password.length < 8) return false;
  return /[^A-Za-z0-9]/.test(password);
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function signAccessToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
}

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "missing token", code: "AUTH_REQUIRED" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: "invalid token", code: "AUTH_INVALID" });
  }
}

app.post("/auth/register", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = req.body.password;

  if (!email.includes("@") || !validatePassword(password)) {
    return res.status(400).json({ message: "invalid email or password", code: "INVALID_INPUT" });
  }

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: "email already used", code: "EMAIL_EXISTS" });
  }

  const passwordHash = await hashPassword(password);
  const user = { id: nextId, email, role: "user", passwordHash };
  nextId += 1;
  users.push(user);

  return res.status(201).json({ id: user.id, email: user.email, role: user.role });
});

app.post("/auth/login", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = req.body.password;
  const user = users.find((u) => u.email === email);

  const ok = user ? await verifyPassword(password, user.passwordHash) : false;
  if (!ok) {
    return res.status(401).json({ message: "invalid credentials", code: "AUTH_FAILED" });
  }

  const accessToken = signAccessToken(user);
  return res.json({ accessToken });
});

app.get("/me", auth, (req, res) => {
  const user = users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ message: "user not found", code: "USER_NOT_FOUND" });
  return res.json({ id: user.id, email: user.email, role: user.role });
});

if (require.main === module) {
  app.listen(3002, () => console.log("Auth API example on http://localhost:3002"));
}

module.exports = { app, hashPassword, verifyPassword, auth };
