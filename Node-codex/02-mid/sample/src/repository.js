"use strict";

const users = [];
const tasks = [];
let nextUserId = 1;
let nextTaskId = 1;

function createUser({ email, passwordHash, role }) {
  const user = { id: nextUserId, email, passwordHash, role };
  nextUserId += 1;
  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find((u) => u.email === email) || null;
}

function findUserById(id) {
  return users.find((u) => u.id === id) || null;
}

function createTask({ userId, title }) {
  const task = { id: nextTaskId, userId, title, done: false, createdAt: new Date().toISOString() };
  nextTaskId += 1;
  tasks.push(task);
  return task;
}

function listTasksByUser(userId) {
  return tasks.filter((t) => t.userId === userId);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  createTask,
  listTasksByUser
};
