"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AppError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function createService(repo, jwtSecret) {
  async function register(emailInput, passwordInput) {
    const email = String(emailInput || "").trim().toLowerCase();
    const password = String(passwordInput || "");

    if (!email.includes("@")) throw new AppError(400, "INVALID_EMAIL", "email is invalid");
    if (password.length < 8 || !/[^A-Za-z0-9]/.test(password)) {
      throw new AppError(400, "INVALID_PASSWORD", "password must be 8+ chars and include a symbol");
    }

    if (repo.findUserByEmail(email)) {
      throw new AppError(409, "EMAIL_EXISTS", "email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = repo.createUser({ email, passwordHash, role: "user" });
    return { id: user.id, email: user.email, role: user.role };
  }

  async function login(emailInput, passwordInput) {
    const email = String(emailInput || "").trim().toLowerCase();
    const user = repo.findUserByEmail(email);
    const ok = user ? await bcrypt.compare(String(passwordInput || ""), user.passwordHash) : false;
    if (!ok) throw new AppError(401, "AUTH_FAILED", "invalid credentials");

    const token = jwt.sign({ sub: user.id, role: user.role }, jwtSecret, { expiresIn: "1h" });
    return token;
  }

  function verifyToken(token) {
    try {
      return jwt.verify(token, jwtSecret);
    } catch {
      throw new AppError(401, "AUTH_INVALID", "invalid or expired token");
    }
  }

  function me(userId) {
    const user = repo.findUserById(userId);
    if (!user) throw new AppError(404, "USER_NOT_FOUND", "user not found");
    return { id: user.id, email: user.email, role: user.role };
  }

  function createTask(userId, titleInput) {
    const title = String(titleInput || "").trim();
    if (title.length < 3) throw new AppError(400, "INVALID_TITLE", "title must be at least 3 characters");
    return repo.createTask({ userId, title });
  }

  function listTasks(userId) {
    return repo.listTasksByUser(userId);
  }

  return { register, login, verifyToken, me, createTask, listTasks, AppError };
}

module.exports = { createService, AppError };
