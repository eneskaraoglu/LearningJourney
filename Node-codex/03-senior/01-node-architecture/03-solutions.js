"use strict";

// Layered Architecture in Node.js - Reference Solution

class DomainError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

function createUserService(userRepo) {
  return {
    async register(input) {
      const email = String(input.email || "").trim().toLowerCase();
      const name = String(input.name || "").trim();

      if (!email.includes("@")) throw new DomainError("INVALID_EMAIL", "email is invalid");
      if (!name) throw new DomainError("INVALID_NAME", "name is required");

      const exists = await userRepo.findByEmail(email);
      if (exists) throw new DomainError("EMAIL_EXISTS", "email already exists");

      return userRepo.create({ name, email });
    }
  };
}

function mapDomainError(error) {
  if (!(error instanceof DomainError)) {
    return { status: 500, body: { message: "internal server error", code: "INTERNAL" } };
  }

  const table = {
    INVALID_EMAIL: 400,
    INVALID_NAME: 400,
    EMAIL_EXISTS: 409
  };

  return {
    status: table[error.code] || 400,
    body: { message: error.message, code: error.code }
  };
}

function createUserController(userService) {
  return async function register(req, res) {
    try {
      const user = await userService.register(req.body);
      return res.status(201).json({ data: user });
    } catch (error) {
      const mapped = mapDomainError(error);
      return res.status(mapped.status).json(mapped.body);
    }
  };
}

// In-memory repository for learning/demo
const userRepo = {
  _rows: [],
  async findByEmail(email) {
    return this._rows.find((u) => u.email === email) || null;
  },
  async create(payload) {
    const user = { id: this._rows.length + 1, ...payload };
    this._rows.push(user);
    return user;
  }
};

module.exports = {
  DomainError,
  createUserService,
  mapDomainError,
  createUserController,
  userRepo
};
