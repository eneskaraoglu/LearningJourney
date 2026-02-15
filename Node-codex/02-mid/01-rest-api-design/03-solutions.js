"use strict";

// REST API Design and Resource Modeling - Reference Solution

const express = require("express");

const app = express();
app.use(express.json());

let nextId = 4;
const products = [
  { id: 1, name: "Keyboard", category: "hardware", price: 59, createdAt: "2026-01-01T00:00:00.000Z" },
  { id: 2, name: "Mouse", category: "hardware", price: 29, createdAt: "2026-01-02T00:00:00.000Z" },
  { id: 3, name: "Node Course", category: "digital", price: 99, createdAt: "2026-01-03T00:00:00.000Z" }
];

function listResponse(data, page, limit, total) {
  return { data, meta: { page, limit, total, pages: Math.ceil(total / limit) } };
}

function errorResponse(res, status, code, message) {
  return res.status(status).json({ error: { code, message } });
}

app.get("/api/v1/products", (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

  let result = [...products];
  if (req.query.category) {
    result = result.filter((p) => p.category === req.query.category);
  }

  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : null;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : null;
  if (minPrice !== null) result = result.filter((p) => p.price >= minPrice);
  if (maxPrice !== null) result = result.filter((p) => p.price <= maxPrice);

  if (req.query.sort === "price_asc") result.sort((a, b) => a.price - b.price);
  else if (req.query.sort === "price_desc") result.sort((a, b) => b.price - a.price);
  else if (req.query.sort === "name_asc") result.sort((a, b) => a.name.localeCompare(b.name));
  else result.sort((a, b) => a.id - b.id);

  const start = (page - 1) * limit;
  const data = result.slice(start, start + limit);
  return res.json(listResponse(data, page, limit, result.length));
});

app.get("/api/v1/products/:id", (req, res) => {
  const item = products.find((p) => p.id === Number(req.params.id));
  if (!item) return errorResponse(res, 404, "PRODUCT_NOT_FOUND", "Product not found");
  return res.json({ data: item });
});

app.post("/api/v1/products", (req, res) => {
  const name = (req.body.name || "").trim();
  const category = (req.body.category || "").trim();
  const price = Number(req.body.price);

  if (!name || !category || !Number.isFinite(price) || price < 0) {
    return errorResponse(res, 400, "INVALID_PAYLOAD", "name, category and positive price are required");
  }

  const product = { id: nextId, name, category, price, createdAt: new Date().toISOString() };
  nextId += 1;
  products.push(product);
  return res.status(201).json({ data: product });
});

app.patch("/api/v1/products/:id", (req, res) => {
  const item = products.find((p) => p.id === Number(req.params.id));
  if (!item) return errorResponse(res, 404, "PRODUCT_NOT_FOUND", "Product not found");

  if (req.body.name !== undefined) {
    const nextName = String(req.body.name).trim();
    if (!nextName) return errorResponse(res, 400, "INVALID_NAME", "name cannot be empty");
    item.name = nextName;
  }

  if (req.body.price !== undefined) {
    const nextPrice = Number(req.body.price);
    if (!Number.isFinite(nextPrice) || nextPrice < 0) {
      return errorResponse(res, 400, "INVALID_PRICE", "price must be a positive number");
    }
    item.price = nextPrice;
  }

  if (req.body.category !== undefined) {
    const nextCategory = String(req.body.category).trim();
    if (!nextCategory) return errorResponse(res, 400, "INVALID_CATEGORY", "category cannot be empty");
    item.category = nextCategory;
  }

  return res.json({ data: item });
});

if (require.main === module) {
  app.listen(3001, () => console.log("REST API example on http://localhost:3001"));
}

module.exports = app;
