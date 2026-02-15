const { describe, it, expect } = require('vitest');
const request = require('supertest');
const express = require('express');

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

describe('calculateTotal', () => {
  it('sums line totals', () => {
    expect(calculateTotal([{ price: 10, qty: 2 }, { price: 5, qty: 1 }])).toBe(25);
  });
});

const app = express();
app.use(express.json());
app.get('/ping', (req, res) => res.json({ message: 'pong' }));

app.post('/items', (req, res) => {
  if (!req.body.name) return res.status(400).json({ message: 'name required' });
  return res.status(201).json({ id: 1, name: req.body.name });
});

describe('api', () => {
  it('GET /ping works', async () => {
    const res = await request(app).get('/ping');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('pong');
  });
});
