"use strict";

// File System and Path Operations - Reference Solution

const fs = require("fs/promises");
const path = require("path");

const dataDir = path.join(__dirname, "data");
const notesFile = path.join(dataDir, "notes.json");

async function ensureStorage() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(notesFile);
  } catch {
    await fs.writeFile(notesFile, "[]\n", "utf8");
  }
}

async function readNotes() {
  await ensureStorage();
  const raw = await fs.readFile(notesFile, "utf8");
  return JSON.parse(raw);
}

async function writeNotes(notes) {
  const tempFile = notesFile + ".tmp";
  const payload = JSON.stringify(notes, null, 2) + "\n";
  await fs.writeFile(tempFile, payload, "utf8");
  await fs.rename(tempFile, notesFile);
}

function validateText(value, field) {
  if (!value || !value.trim()) throw new Error(`INVALID_${field.toUpperCase()}`);
  return value.trim();
}

async function addNote(title, content) {
  const safeTitle = validateText(title, "title");
  const safeContent = validateText(content, "content");

  const notes = await readNotes();
  const duplicate = notes.find((n) => n.title.toLowerCase() === safeTitle.toLowerCase());
  if (duplicate) throw new Error("DUPLICATE_TITLE");

  notes.push({
    title: safeTitle,
    content: safeContent,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  await writeNotes(notes);
}

async function deleteNote(title) {
  const safeTitle = validateText(title, "title");
  const notes = await readNotes();
  const next = notes.filter((n) => n.title.toLowerCase() !== safeTitle.toLowerCase());
  const deleted = next.length !== notes.length;
  if (deleted) await writeNotes(next);
  return deleted;
}

async function listNotes() {
  const notes = await readNotes();
  return notes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

(async function demo() {
  try {
    console.log("storage:", path.resolve(notesFile));
    await addNote("Node", "Practice modules daily");
    await addNote("Express", "Build one route per day");

    console.log("notes:", await listNotes());
    console.log("deleted Node:", await deleteNote("Node"));
    console.log("notes after delete:", await listNotes());
  } catch (error) {
    console.error("notes-error", error.message);
  }
})();
