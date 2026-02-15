"use strict";

// Testing Node APIs (Vitest + Supertest) - Reference Solution

const { describe, it, expect, beforeEach } = require("vitest");
const request = require("supertest");
const express = require("express");

function calculateInvoiceTotal(items, taxRate) {
  if (!Array.isArray(items) || !Number.isFinite(taxRate) || taxRate < 0) {
    throw new Error("INVALID_INPUT");
  }

  const subtotal = items.reduce((sum, item) => {
    if (!Number.isFinite(item.price) || !Number.isFinite(item.qty) || item.price < 0 || item.qty < 0) {
      throw new Error("INVALID_ITEM");
    }
    return sum + item.price * item.qty;
  }, 0);

  return Number((subtotal * (1 + taxRate)).toFixed(2));
}

describe("calculateInvoiceTotal", () => {
  it("calculates total with tax", () => {
    const total = calculateInvoiceTotal([{ price: 10, qty: 2 }, { price: 5, qty: 1 }], 0.1);
    expect(total).toBe(27.5);
  });

  it("returns 0 for empty list", () => {
    expect(calculateInvoiceTotal([], 0.2)).toBe(0);
  });

  it("throws for invalid item", () => {
    expect(() => calculateInvoiceTotal([{ price: -1, qty: 1 }], 0.2)).toThrow("INVALID_ITEM");
  });
});

const app = express();
app.use(express.json());

let items = [];

beforeEach(() => {
  items = [];
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.post("/items", (req, res) => {
  const name = String(req.body.name || "").trim();
  if (!name) return res.status(400).json({ message: "name required" });

  const item = { id: items.length + 1, name };
  items.push(item);
  return res.status(201).json(item);
});

describe("api integration", () => {
  it("GET /ping returns pong", async () => {
    const res = await request(app).get("/ping");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "pong" });
  });

  it("POST /items validates input", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("name required");
  });

  it("POST /items creates item", async () => {
    const res = await request(app).post("/items").send({ name: "Keyboard" });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Keyboard");
  });
});

module.exports = { app, calculateInvoiceTotal };
