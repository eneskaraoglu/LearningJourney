"use strict";

const fs = require("fs/promises");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const dataFile = path.join(dataDir, "tasks.json");

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify({ nextId: 1, tasks: [] }, null, 2) + "\n", "utf8");
  }
}

async function readStore() {
  await ensureStore();
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw);
}

async function writeStore(store) {
  const temp = dataFile + ".tmp";
  await fs.writeFile(temp, JSON.stringify(store, null, 2) + "\n", "utf8");
  await fs.rename(temp, dataFile);
}

module.exports = { readStore, writeStore };
